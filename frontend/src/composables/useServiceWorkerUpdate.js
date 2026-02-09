import { ref, onMounted, onUnmounted } from 'vue'
import { APP_VERSION, getStoredVersion, storeVersion } from 'src/utils/version'

export function useServiceWorkerUpdate() {
  const updateAvailable = ref(false)
  const registration = ref(null)

  let checkInterval = null
  let controllerChangeHandler = null

  /**
   * Verifica atualização através da versão do app
   */
  const checkVersionUpdate = () => {
    const storedVersion = getStoredVersion()
    
    // Se não há versão armazenada, armazena a atual
    if (!storedVersion) {
      storeVersion(APP_VERSION)
      return false
    }

    // Se as versões são diferentes, há uma atualização
    if (storedVersion !== APP_VERSION) {
      return true
    }

    return false
  }

  /**
   * Verifica atualização através de hash do index.html
   * Útil para detectar mudanças mesmo com cache persistente
   */
  const checkHashUpdate = async () => {
    try {
      // Adiciona timestamp para evitar cache
      const timestamp = new Date().getTime()
      const response = await fetch(`/?v=${timestamp}&_=${timestamp}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })

      if (response.ok) {
        const text = await response.text()
        // Tenta encontrar um hash ou timestamp no HTML
        // Se o HTML mudou significativamente, pode indicar atualização
        const htmlHash = text.length + (text.match(/version|build|hash/gi) || []).length
        
        // Armazena o hash atual para comparação futura
        const storedHash = localStorage.getItem('app_html_hash')
        if (storedHash && storedHash !== String(htmlHash)) {
          return true
        }
        localStorage.setItem('app_html_hash', String(htmlHash))
      }
    } catch (error) {
      // Silenciar erros de rede, não é crítico
      console.debug('Não foi possível verificar hash do HTML:', error)
    }
    return false
  }

  const checkForUpdates = async () => {
    // Primeiro, verifica atualização de versão
    if (checkVersionUpdate()) {
      updateAvailable.value = true
      return
    }

    // Verifica atualização via hash do HTML
    const hashUpdate = await checkHashUpdate()
    if (hashUpdate) {
      updateAvailable.value = true
      return
    }

    // Depois, verifica Service Worker (se disponível)
    if (!('serviceWorker' in navigator)) {
      return
    }

    try {
      const reg = await navigator.serviceWorker.getRegistration()
      registration.value = reg || null

      if (reg) {
        // Listener para quando um novo service worker é encontrado
        const handleUpdateFound = () => {
          const installingWorker = reg.installing
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Há uma nova versão instalada, mas ainda não ativa
                updateAvailable.value = true
                registration.value = reg
              }
            })
          }
        }

        reg.addEventListener('updatefound', handleUpdateFound)

        // Verificar se há um service worker esperando (nova versão instalada)
        if (reg.waiting) {
          updateAvailable.value = true
          registration.value = reg
        }

        // Verificar periodicamente por atualizações
        await reg.update()
      }
    } catch (error) {
      console.error('Erro ao verificar atualizações do service worker:', error)
    }
  }

  const updateServiceWorker = async () => {
    if (registration.value && registration.value.waiting) {
      // Enviar mensagem para o service worker para pular a espera
      registration.value.waiting.postMessage({ type: 'SKIP_WAITING' })

      // Aguardar um pouco para o service worker processar a mensagem
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  const clearCacheAndReload = async () => {
    console.log('Iniciando atualização...')
    
    // Timeout de segurança - força reload após 2 segundos mesmo se algo travar
    const forceReloadTimeout = setTimeout(() => {
      console.log('Timeout: forçando reload direto...')
      // Usar reload direto que é mais confiável
      window.location.reload()
    }, 2000)

    try {
      // Atualizar a versão armazenada antes de recarregar
      storeVersion(APP_VERSION)
      console.log('Versão atualizada no localStorage')

      // Limpar todos os caches do Cache API (com timeout)
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys()
          console.log('Caches encontrados:', cacheNames)
          
          const deletePromises = cacheNames.map(cacheName => {
            console.log('Deletando cache:', cacheName)
            return caches.delete(cacheName)
          })
          
          // Timeout de 2 segundos para limpeza de cache
          await Promise.race([
            Promise.all(deletePromises),
            new Promise(resolve => setTimeout(resolve, 2000))
          ])
          console.log('Todos os caches da Cache API foram limpos')
        } catch (e) {
          console.warn('Erro ao limpar caches:', e)
        }
      }

      // Limpar localStorage de dados de versão/hash (mas manter dados do usuário)
      localStorage.removeItem('app_html_hash')
      localStorage.removeItem('app_version') // Remove versão antiga para forçar detecção
      console.log('Dados de versão removidos do localStorage')

      // Limpar sessionStorage completamente
      try {
        sessionStorage.clear()
        console.log('SessionStorage completamente limpo')
      } catch (e) {
        console.warn('Erro ao limpar sessionStorage:', e)
      }
      
      // Limpar IndexedDB se existir (alguns caches podem estar lá)
      if ('indexedDB' in window) {
        try {
          // Listar todos os bancos de dados e fechá-los
          const databases = await indexedDB.databases()
          for (const db of databases) {
            if (db.name && db.name.includes('workbox') || db.name.includes('cache')) {
              console.log('Fechando IndexedDB:', db.name)
              const deleteReq = indexedDB.deleteDatabase(db.name)
              await new Promise((resolve, reject) => {
                deleteReq.onsuccess = () => resolve()
                deleteReq.onerror = () => reject(deleteReq.error)
                deleteReq.onblocked = () => resolve() // Continuar mesmo se bloqueado
              })
            }
          }
          console.log('IndexedDB de cache limpo')
        } catch (e) {
          console.warn('Erro ao limpar IndexedDB:', e)
        }
      }

      // Desabilitar service worker ANTES de recarregar (importante!)
      if ('serviceWorker' in navigator) {
        try {
          // Primeiro, desregistrar todos os service workers
          const registrations = await navigator.serviceWorker.getRegistrations()
          await Promise.all(
            registrations.map(reg => reg.unregister())
          )
          console.log('Todos os service workers desregistrados')
          
          // Aguardar um pouco para garantir que foram desregistrados
          await new Promise(resolve => setTimeout(resolve, 300))
          
        } catch (e) {
          console.warn('Erro ao desregistrar service workers:', e)
          // Continuar mesmo com erro
        }
      }

      // Limpar timeout e recarregar
      clearTimeout(forceReloadTimeout)
      
      // Recarregar a página forçando bypass de cache (equivalente a Ctrl+Shift+R)
      console.log('Recarregando página com bypass completo de cache...')
      
      // Forçar reload com bypass de cache do navegador (equivalente a hard refresh)
      // Usar múltiplas estratégias para garantir que o cache seja ignorado
      try {
        // Adicionar um pequeno delay para garantir que tudo foi processado
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // Estratégia 1: Fazer uma requisição fetch com no-cache antes de recarregar
        // Isso força o navegador a invalidar o cache HTTP
        try {
          await fetch(window.location.href, {
            method: 'GET',
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
        } catch (fetchError) {
          // Ignorar erros de fetch, não é crítico
          console.debug('Erro ao invalidar cache via fetch:', fetchError)
        }
        
        // Estratégia 2: Adicionar timestamp único à URL e usar replace
        // Isso força o navegador a tratar como uma nova requisição
        const baseUrl = window.location.origin + window.location.pathname
        const hash = window.location.hash.split('?')[0] || ''
        const timestamp = Date.now()
        const reloadUrl = baseUrl + hash + '?v=' + timestamp + '&_nocache=' + timestamp + '&_hard_refresh=' + timestamp
        
        console.log('Forçando reload com bypass de cache HTTP...')
        
        // Usar replace para evitar histórico e forçar reload completo
        window.location.replace(reloadUrl)
        
        // Estratégia 3: Se após 500ms ainda não recarregou, usar reload() direto
        // (alguns navegadores podem ignorar o replace)
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            console.log('Fallback: usando window.location.reload() com bypass...')
            // Tentar forçar reload ignorando cache
            // Nota: window.location.reload(true) está deprecated, mas ainda funciona em alguns navegadores
            window.location.reload()
          }
        }, 500)
        
      } catch (e) {
        console.error('Erro ao fazer reload:', e)
        // Em caso de erro, tentar reload simples
        window.location.reload()
      }
      
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
      // Limpar timeout e forçar reload mesmo com erro
      clearTimeout(forceReloadTimeout)
      // Em caso de erro, usar reload direto
      console.log('Forçando reload após erro...')
      window.location.reload()
    }
  }

  onMounted(() => {
    // Verificar atualizações ao montar (independente de service worker)
    checkForUpdates()

    // Verificar atualizações periodicamente (a cada 2 minutos - mais frequente)
    checkInterval = setInterval(checkForUpdates, 2 * 60 * 1000)

    if ('serviceWorker' in navigator) {
      // Listener para quando o service worker é atualizado
      controllerChangeHandler = () => {
        // Service worker foi atualizado, recarregar a página
        window.location.reload()
      }

      navigator.serviceWorker.addEventListener('controllerchange', controllerChangeHandler)
    }
  })

  onUnmounted(() => {
    if (checkInterval) {
      clearInterval(checkInterval)
    }
    if ('serviceWorker' in navigator && controllerChangeHandler) {
      navigator.serviceWorker.removeEventListener('controllerchange', controllerChangeHandler)
    }
  })

  return {
    updateAvailable,
    updateServiceWorker,
    clearCacheAndReload
  }
}

