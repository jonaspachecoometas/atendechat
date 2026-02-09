<template>
  <div class="massa-wavoip">

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left Panel - Controls -->
      <div class="left-panel">
        
        <!-- Sessões Disponíveis -->
        <q-card class="card">
          <q-card-section class="card-header">
            <div class="row items-center justify-between">
              <h2 class="card-title">
                <q-icon name="phone" size="12px" class="q-mr-xs" />
                {{ $t('massaWavoip.sections.sessions.title') }}
              </h2>
              <q-btn 
                icon="refresh" 
                size="sm" 
                flat 
                round 
                @click="refreshSessions"
                :loading="isRefreshing"
              />
            </div>
          </q-card-section>

          <q-card-section v-if="cSessions.length > 0">
            <div class="session-list">
              <div 
                v-for="session in cSessions" 
                :key="session.id"
                class="session-item"
                :class="{ 'selected': selectedSessions.includes(session.id) }"
                @click="toggleSession(session.id)"
              >
                <div class="session-info">
                  <div class="session-name">
                    <q-icon 
                      :name="getSessionIcon(session.type)" 
                      size="14px" 
                      class="q-mr-sm"
                    />
                    {{ session.name }}
                  </div>
                  <div class="session-token">
                    {{ session.wavoipToken ? session.wavoipToken.substring(0, 20) + '...' : 'Token não configurado' }}
                    <span v-if="session.tokenIndex" class="token-index">
                      (Token {{ session.tokenIndex }})
                    </span>
                  </div>
                  <div class="session-status">
                    Status: <strong>{{ getSessionStatus(session.id) }}</strong>
                  </div>
                </div>
                <q-checkbox 
                  :model-value="selectedSessions.includes(session.id)"
                  @update:model-value="toggleSession(session.id)"
                  color="primary"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section v-else>
            <div class="text-center text-grey-6 q-py-md">
              {{ $t('massaWavoip.sections.sessions.noSessions') }}
            </div>
          </q-card-section>

          <q-card-actions v-if="selectedSessions.length > 0">
            <q-btn 
              @click="initializeWavoip" 
              color="primary"
              :loading="isConnecting"
              :disable="selectedSessions.length === 0"
              class="full-width"
            >
              <q-icon name="link" class="q-mr-sm" />
              {{ isConnecting ? $t('massaWavoip.sections.sessions.connecting') : $t('massaWavoip.sections.sessions.connectButton') }}
            </q-btn>
          </q-card-actions>
        </q-card>

        <!-- Números de Telefone -->
        <q-card class="card">
          <q-card-section class="card-header">
            <div class="row items-center justify-between">
              <h2 class="card-title">
                <q-icon name="phone" size="12px" class="q-mr-xs" />
                {{ $t('massaWavoip.sections.phoneNumbers.title') }}
              </h2>
              <q-btn 
                icon="add" 
                size="sm" 
                flat 
                round 
                @click="addPhoneNumber"
              />
            </div>
          </q-card-section>

          <q-card-section v-if="phoneNumbers.length > 0">
            <div class="phone-list">
              <div 
                v-for="(number, index) in phoneNumbers" 
                :key="index"
                class="phone-item"
              >
                <span>{{ number }}</span>
                <q-btn 
                  icon="close" 
                  size="sm" 
                  flat 
                  round 
                  @click="removePhoneNumber(index)"
                  color="negative"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section v-else>
            <div class="text-center text-grey-6 q-py-md">
              {{ $t('massaWavoip.sections.phoneNumbers.noNumbers') }}
            </div>
          </q-card-section>
        </q-card>

        <!-- Upload de Arquivo de Áudio -->
        <q-card class="card">
          <q-card-section>
            <h2 class="card-title">
              <q-icon name="upload" size="12px" class="q-mr-xs" />
              {{ $t('massaWavoip.sections.audioFile.title') }}
            </h2>
          </q-card-section>

          <q-card-section>
            <q-file
              v-model="uploadedFile"
              :label="$t('massaWavoip.sections.audioFile.selectFile')"
              accept="audio/*"
              @update:model-value="onFileUpload"
              outlined
              class="full-width"
            >
              <template v-slot:prepend>
                <q-icon name="upload" />
              </template>
            </q-file>

            <div v-if="uploadedFile" class="file-info q-mt-md">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="volume_up" color="primary" class="q-mr-sm" />
                  <span>{{ uploadedFile.name }}</span>
                  <span class="text-grey-6 q-ml-sm">
                    ({{ formatFileSize(uploadedFile.size) }})
                  </span>
                </div>
                <q-btn 
                  icon="close" 
                  size="sm" 
                  flat 
                  round 
                  @click="clearFile"
                  color="negative"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>

      <!-- Right Panel - Status -->
      <div class="right-panel">
        
        <!-- Status das Sessões Conectadas -->
        <q-card v-if="Object.keys(wavoipInstances).length > 0" class="card">
          <q-card-section>
            <h2 class="card-title">
              <q-icon name="check_circle" size="12px" class="q-mr-xs" />
              {{ $t('massaWavoip.sections.status.title') }}
            </h2>
          </q-card-section>

          <q-card-section>
            <div class="device-list">
              <div 
                v-for="(instance, sessionId) in wavoipInstances" 
                :key="sessionId"
                class="device-item"
                :class="getDeviceStatus(sessionId)"
              >
                <div class="device-header">
                  <q-icon 
                    :name="getStatusIcon(getDeviceStatus(sessionId))" 
                    size="14px" 
                    class="q-mr-sm"
                  />
                  <span class="device-name">{{ getSessionName(sessionId) }}</span>
                </div>
                
                <div class="device-token">
                  {{ getSessionToken(sessionId).substring(0, 20) }}...
                </div>
                
                <div class="device-status">
                  Status: <strong>{{ getDeviceStatus(sessionId) }}</strong>
                </div>

                <div v-if="getDeviceStatus(sessionId) === 'Online' && phoneNumbers.length > 0" class="q-mt-sm">
                  <div class="text-caption q-mb-xs">{{ $t('massaWavoip.sections.status.makeCall') }}</div>
                  <div class="phone-buttons">
                    <q-btn
                      v-for="(number, phoneIndex) in phoneNumbers"
                      :key="phoneIndex"
                      @click="makeCall(sessionId, number)"
                      color="positive"
                      size="sm"
                      :disable="!!currentCall"
                      class="q-mr-xs q-mb-xs"
                    >
                      <q-icon name="phone" size="12px" class="q-mr-xs" />
                      {{ number }}
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Controles de Chamada Ativa -->
        <q-card v-if="currentCall" class="card">
          <q-card-section>
            <h2 class="card-title">
              <q-icon name="phone" size="12px" class="q-mr-xs" />
              {{ currentCall.status === 'offer' ? $t('massaWavoip.sections.callControls.incomingCall') : $t('massaWavoip.sections.callControls.activeCall') }}
            </h2>
          </q-card-section>

          <q-card-section>
            <!-- Informações da chamada -->
            <div class="call-info text-center">
              <div class="call-avatar q-mb-md">
                <q-avatar size="50px">
                  <img 
                    :src="currentCall.picture_profile || '/nopicture.png'" 
                    :alt="currentCall.tag"
                    @error="handleImageError"
                  />
                </q-avatar>
              </div>
              
              <div class="call-details">
                <h3 class="call-name">{{ currentCall.tag || 'Desconhecido' }}</h3>
                <p class="call-phone">{{ currentCall.phone }}</p>
                <p class="call-status">Status: {{ currentCall.status }}</p>
                
                <div v-if="isPlayingAudio" class="audio-indicator">
                  <q-icon name="volume_up" size="12px" class="q-mr-xs" />
                  {{ $t('massaWavoip.sections.callControls.transmittingAudio') }}
                </div>
              </div>
            </div>
            
            <!-- Controles da chamada -->
            <div class="call-controls">
              <div v-if="currentCall.status === 'offer'" class="row q-gutter-sm justify-center">
                <q-btn 
                  @click="acceptCall"
                  color="positive"
                  icon="phone"
                  :label="$t('massaWavoip.sections.callControls.accept')"
                />
                <q-btn 
                  @click="rejectCall"
                  color="negative"
                  icon="phone_disabled"
                  :label="$t('massaWavoip.sections.callControls.reject')"
                />
              </div>
              
              <div v-else class="row q-gutter-sm justify-center">
                <q-btn 
                  @click="injectAudio"
                  color="primary"
                  icon="play_arrow"
                  :label="isPlayingAudio ? $t('massaWavoip.sections.callControls.playing') : $t('massaWavoip.sections.callControls.injectAudio')"
                  :disable="isPlayingAudio || !uploadedFile"
                />
                <q-btn 
                  @click="endCall"
                  color="negative"
                  icon="phone_disabled"
                  :label="$t('massaWavoip.sections.callControls.endCall')"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MassaWavoip',
  data() {
    return {
      // Estados principais
      selectedSessions: [],
      phoneNumbers: [],
      uploadedFile: null,
      wavoipInstances: {},
      isConnecting: false,
      isRefreshing: false,
      audioContext: null,
      audioBuffer: null,
      isPlayingAudio: false,
      currentCall: null,
      activeAudioSources: [],
      activeAudioElements: [],
      preparedAudioSource: null,
      preparedGainNode: null,
      
      // Estados de chamada
      callInfo: {
        id: null,
        duration: 0,
        tag: null,
        phone: null,
        picture_profile: null,
        status: null,
        direction: null,
        whatsapp_instance: null,
        active_start_date: null,
        chat_id: null,
        inbox_name: null,
      }
    }
  },
  
  computed: {
    ...mapGetters(['whatsapps']),
    
    cSessions() {
      const sessions = this.whatsapps.filter(w => 
        // ["baileys"].includes(w.type) && 
        !w.isDeleted && 
        w.status === 'CONNECTED' &&
        w.wavoipToken // Apenas sessões com token Wavoip
      )
      
      // Expandir sessões com múltiplos tokens separados por vírgula
      const expandedSessions = []
      sessions.forEach(session => {
        const tokens = session.wavoipToken.split(',').map(token => token.trim()).filter(token => token)
        
        if (tokens.length === 1) {
          // Token único - manter sessão original
          expandedSessions.push(session)
        } else {
          // Múltiplos tokens - criar uma sessão para cada token
          tokens.forEach((token, index) => {
            expandedSessions.push({
              ...session,
              id: `${session.id}_token_${index + 1}`, // ID único para cada token
              name: `${session.name} - Token ${index + 1}`,
              wavoipToken: token,
              originalId: session.id, // Manter referência ao ID original
              tokenIndex: index + 1
            })
          })
        }
      })
      
      return expandedSessions
    }
  },
  
  mounted() {
    this.initializeAudioContext()
    this.setupGlobalAudioInterception()
    
    // Log informativo sobre tokens expandidos (executa apenas uma vez)
    const multiTokenSessions = this.cSessions.filter(s => s.tokenIndex)
    if (multiTokenSessions.length > 0) {
      const originalSessions = [...new Set(multiTokenSessions.map(s => s.originalId))]
      originalSessions.forEach(originalId => {
        const tokens = multiTokenSessions.filter(s => s.originalId === originalId)
      })
    }
  },
  
  watch: {
    // Monitorar mudanças no status da chamada
    'currentCall.status'(newStatus, oldStatus) {
      if (newStatus === 'accept') {
        if (this.uploadedFile && this.currentCall?.whatsapp_instance) {
          // Aguardar um pouco para chamada se estabelecer
          setTimeout(() => {
            this.startAudioPlayback()
          }, 1000)
        }
      } else if (newStatus === 'terminate') {
        this.stopAllAudio()
      }
    }
  },
  
  beforeUnmount() {
    this.cleanup()
  },
  
  methods: {
    // Métodos de sessão
    toggleSession(sessionId) {
      const index = this.selectedSessions.indexOf(sessionId)
      if (index > -1) {
        this.selectedSessions.splice(index, 1)
      } else {
        this.selectedSessions.push(sessionId)
      }
    },
    
    refreshSessions() {
      this.isRefreshing = true
      // Simular refresh - em produção, você pode chamar uma action do Vuex
      setTimeout(() => {
        this.isRefreshing = false
      }, 1000)
    },
    
    getSessionIcon(type) {
      const icons = {
        'whatsapp': 'phone',
        'baileys': 'phone',
        'meow': 'phone',
        'evo': 'phone',
        'zapi': 'phone',
        'uazapi': 'phone'
      }
      return icons[type] || 'phone'
    },
    
    getSessionName(sessionId) {
      const session = this.cSessions.find(s => s.id === sessionId)
      if (session) {
        return session.name
      }
      
      // Fallback: tentar encontrar pelo originalId se for um token expandido
      const originalSession = this.cSessions.find(s => s.originalId === sessionId)
      return originalSession ? originalSession.name : 'Sessão Desconhecida'
    },
    
    getSessionToken(sessionId) {
      const session = this.cSessions.find(s => s.id === sessionId)
      if (session) {
        return session.wavoipToken
      }
      
      // Fallback: tentar encontrar pelo originalId se for um token expandido
      const originalSession = this.cSessions.find(s => s.originalId === sessionId)
      return originalSession ? originalSession.wavoipToken : ''
    },
    
    getSessionStatus(sessionId) {
      return this.wavoipInstances[sessionId] ? this.$t('massaWavoip.sections.sessions.status.connected') : this.$t('massaWavoip.sections.sessions.status.disconnected')
    },
    
    getDeviceStatus(sessionId) {
      // Implementar lógica de status baseada no estado real da conexão
      return this.wavoipInstances[sessionId] ? 'Online' : 'Offline'
    },
    
    getStatusIcon(status) {
      const icons = {
        'online': 'check_circle',
        'offline': 'cancel',
        'connecting': 'schedule'
      }
      return icons[status] || 'help'
    },
    
    // Métodos de telefone
    addPhoneNumber() {
      this.$q.dialog({
        title: this.$t('massaWavoip.sections.phoneNumbers.dialog.title'),
        message: this.$t('massaWavoip.sections.phoneNumbers.dialog.message'),
        prompt: {
          model: '',
          type: 'tel'
        },
        cancel: true,
        persistent: true
      }).onOk(number => {
        if (number && number.trim()) {
          this.phoneNumbers.push(number.trim())
        }
      })
    },
    
    removePhoneNumber(index) {
      const number = this.phoneNumbers[index]
      this.phoneNumbers.splice(index, 1)
    },
    
    // Métodos de arquivo
    onFileUpload(file) {
      if (file) {
        this.uploadedFile = file
        this.loadAudioFile(file)
      }
    },
    
    clearFile() {
      this.uploadedFile = null
      this.audioBuffer = null
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    
    // Métodos de áudio
    async initializeAudioContext() {
      try {
        // Verificar se AudioContext está disponível
        if (window.AudioContext || window.webkitAudioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        } else {
        }
      } catch (error) {
      }
    },
    
    async loadAudioFile(file) {
      try {
        if (!this.audioContext) {
          return
        }
        
        const arrayBuffer = await file.arrayBuffer()
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
        this.audioBuffer = audioBuffer
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar arquivo de áudio'
        })
      }
    },
    
    setupGlobalAudioInterception() {
      try {
        console.log('🔧 Configurando interceptação global do getUserMedia...')
        
        if (!window.originalGetUserMedia) {
          window.originalGetUserMedia = navigator.mediaDevices.getUserMedia
          console.log('✅ getUserMedia original salvo')
        }
        
        navigator.mediaDevices.getUserMedia = async (constraints) => {
          console.log('🎤 getUserMedia chamado pela interceptação')
          console.log('🎤 Constraints:', constraints)
          console.log('🎤 Tem audio:', constraints.audio ? 'SIM' : 'NÃO')
          console.log('🎤 Stream MP3 disponível:', window.currentMP3Stream ? 'SIM' : 'NÃO')
          console.log('🎤 CallInfo status:', this.currentCall?.status)
          
          if (constraints.audio && window.currentMP3Stream) {
            console.log('🎤 ✅ Interceptando getUserMedia - retornando stream do MP3')
            console.log('🎤 Stream ID:', window.currentMP3Stream.getTracks()[0]?.id)
            return window.currentMP3Stream
          }
          
          console.log('🎤 Usando getUserMedia original')
          return window.originalGetUserMedia.call(navigator.mediaDevices, constraints)
        }
        
        window.getUserMediaIntercepted = true
        console.log('✅ Interceptação global configurada e ATIVA')
      } catch (error) {
        console.error('❌ Erro ao configurar interceptação:', error)
      }
    },
    
    // Métodos de conexão Wavoip
    async initializeWavoip() {
      if (this.selectedSessions.length === 0) {
        this.$q.notify({
          type: 'negative',
          message: 'Selecione pelo menos uma sessão'
        })
        return
      }

      this.isConnecting = true

      try {
        // Importar Wavoip dinamicamente
        let Wavoip
        try {
          const wavoipModule = await import('wavoip-api')
          Wavoip = wavoipModule.default || wavoipModule
        } catch (importError) {
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao carregar biblioteca Wavoip'
          })
          return
        }
        
        for (const sessionId of this.selectedSessions) {
          const session = this.cSessions.find(s => s.id === sessionId)
          if (!session || !session.wavoipToken) {
            continue
          }

          try {
            // Verificar se Wavoip está disponível
            if (!Wavoip) {
              throw new Error('Wavoip não foi carregado corretamente')
            }
            
            const WAV = new Wavoip()
            const whatsapp_instance = await WAV.connect(session.wavoipToken)

            if (!whatsapp_instance) {
              throw new Error('Falha ao conectar - instância não criada')
            }

            // Configurar eventos de signaling
            if (whatsapp_instance && whatsapp_instance.socket) {
              whatsapp_instance.socket.on('signaling', (data) => {
                this.handleSignaling(data, sessionId)
              })

              whatsapp_instance.socket.on('connect', () => {
              })

              whatsapp_instance.socket.on('disconnect', () => {
                this.cleanupWavoipInstance(sessionId)
              })
            }

            // Adicionar instância ao estado criando um novo objeto para garantir reatividade
            this.wavoipInstances = {
              ...this.wavoipInstances,
              [sessionId]: {
                whatsapp_instance,
                inbox_name: session.name,
                token: session.wavoipToken
              }
            }


          } catch (error) {
          }
        }

        this.$q.notify({
          type: 'positive',
          message: 'Conexões estabelecidas!'
        })

      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao conectar com Wavoip'
        })
      } finally {
        this.isConnecting = false
      }
    },
    
    handleSignaling(data, sessionId) {

      if (data?.tag === 'offer') {
        const name = data?.content?.from_tag
        const whatsapp_id = data?.content?.phone
        const profile_picture = data?.content?.profile_picture
        
        this.currentCall = {
          id: sessionId,
          duration: 0,
          tag: name,
          phone: whatsapp_id,
          picture_profile: profile_picture,
          status: 'offer',
          direction: 'incoming',
          whatsapp_instance: sessionId,
          inbox_name: this.getSessionName(sessionId),
          chat_id: null,
        }
        
        this.$q.notify({
          type: 'positive',
          message: `Chamada recebida de ${name || whatsapp_id}`
        })
      } else if (data?.tag === 'terminate') {
        this.currentCall = { ...this.currentCall, status: 'terminate' }
        this.stopAllAudio()
        setTimeout(() => {
          this.currentCall = null
        }, 250)
      } else if (data?.tag === 'reject') {
        this.currentCall = { ...this.currentCall, status: 'reject' }
        this.stopAllAudio()
        setTimeout(() => {
          this.currentCall = null
        }, 250)
      } else if (data?.tag === 'accept') {
        this.currentCall = { 
          ...this.currentCall, 
          status: 'accept',
          active_start_date: new Date(),
          whatsapp_instance: sessionId
        }
        // O áudio será injetado automaticamente pelo watcher quando o status mudar para 'accept'
      }
    },
    
    // Métodos de chamada
    async makeCall(sessionId, phoneNumber) {
      
      if (!this.wavoipInstances[sessionId]) {
        this.$q.notify({
          type: 'negative',
          message: 'Sessão não está conectada'
        })
        return
      }

      if (!this.uploadedFile) {
        this.$q.notify({
          type: 'negative',
          message: 'Nenhum arquivo de áudio carregado'
        })
        return
      }

      try {
        const wavoip = this.wavoipInstances[sessionId].whatsapp_instance
        
        if (!wavoip || typeof wavoip.callStart !== 'function') {
          this.$q.notify({
            type: 'negative',
            message: 'Instância Wavoip inválida'
          })
          return
        }
        
        const response = await wavoip.callStart({ whatsappid: phoneNumber })

        if (response.type !== 'success') {
          throw new Error(response?.result || 'Erro desconhecido')
        }

        const profile_picture = response?.result?.profile_picture

        this.currentCall = {
          id: sessionId,
          duration: 0,
          tag: 'Ligação Direta',
          phone: phoneNumber,
          picture_profile: profile_picture,
          status: 'outcoming_calling',
          direction: 'outcoming',
          whatsapp_instance: sessionId,
          inbox_name: this.getSessionName(sessionId),
          chat_id: null,
        }

        this.$q.notify({
          type: 'positive',
          message: 'Chamada iniciada!'
        })

        // Preparar interceptação durante outcoming_calling (sem reproduzir áudio ainda)
        if (this.uploadedFile) {
          setTimeout(() => {
            this.prepareAudioInterception()
          }, 2000) // Aguardar um pouco para getUserMedia ser chamado
        }

      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao iniciar chamada'
        })
      }
    },
    
    async acceptCall() {
      try {
        const sessionId = this.currentCall.whatsapp_instance
        
        if (!sessionId || !this.wavoipInstances[sessionId]) {
          return
        }

        const wavoip = this.wavoipInstances[sessionId].whatsapp_instance
        
        if (!wavoip || typeof wavoip.acceptCall !== 'function') {
          return
        }
        
        await wavoip.acceptCall()
        
        this.currentCall = { 
          ...this.currentCall, 
          status: 'accept',
          active_start_date: new Date()
        }
        
        this.$q.notify({
          type: 'positive',
          message: 'Chamada aceita!'
        })
        
        // O áudio será injetado automaticamente pelo watcher quando o status mudar para 'accept'
        
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao aceitar chamada'
        })
      }
    },
    
    async rejectCall() {
      try {
        const sessionId = this.currentCall.whatsapp_instance
        
        if (!sessionId || !this.wavoipInstances[sessionId]) {
          return
        }

        const wavoip = this.wavoipInstances[sessionId].whatsapp_instance
        
        if (!wavoip || typeof wavoip.rejectCall !== 'function') {
          return
        }
        
        await wavoip.rejectCall()
        
        this.currentCall = null
        this.stopAllAudio()
        
      } catch (error) {
      }
    },
    
    async endCall() {
      try {
        const sessionId = this.currentCall.whatsapp_instance
        
        if (!sessionId || !this.wavoipInstances[sessionId]) {
          return
        }

        const wavoip = this.wavoipInstances[sessionId].whatsapp_instance
        
        if (!wavoip || typeof wavoip.endCall !== 'function') {
          return
        }
        
        await wavoip.endCall()
        
        this.currentCall = null
        this.stopAllAudio()
        this.$q.notify({
          type: 'positive',
          message: 'Chamada finalizada'
        })
        
      } catch (error) {
      }
    },
    
    // Métodos de áudio
    async injectAudio() {
      console.log('🎵 Iniciando injeção de áudio...')
      
      if (!this.uploadedFile || !this.audioContext || !this.audioBuffer) {
        console.warn('⚠️ Arquivo, AudioContext ou AudioBuffer não disponível')
        return
      }

      // Verificar se há uma chamada ativa
      if (!this.currentCall || !this.currentCall.whatsapp_instance) {
        console.warn('⚠️ Nenhuma chamada ativa para injetar áudio')
        return
      }

      // Verificar se a instância Wavoip está disponível
      if (!this.wavoipInstances[this.currentCall.whatsapp_instance]) {
        console.warn('⚠️ Instância Wavoip não encontrada para a chamada ativa')
        return
      }

      try {
        console.log('🔧 Configurando áudio...')
        
        // Garantir que o AudioContext esteja ativo
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume()
          console.log('✅ AudioContext retomado')
        }

        // Criar source de áudio
        console.log('🎵 Criando source de áudio...')
        const source = this.audioContext.createBufferSource()
        source.buffer = this.audioBuffer
        source.loop = false
        console.log('✅ Source criado com buffer:', this.audioBuffer.duration + 's')

        // Criar gain node para controle de volume
        console.log('🎵 Criando gain node...')
        const gainNode = this.audioContext.createGain()
        gainNode.gain.value = 1.0
        console.log('✅ Gain node criado com volume:', gainNode.gain.value)

        // Criar MediaStreamDestination
        console.log('🎵 Criando MediaStreamDestination...')
        const destination = this.audioContext.createMediaStreamDestination()
        console.log('✅ MediaStreamDestination criado')
        
        // Conectar: source -> gain -> destination
        console.log('🎵 Conectando nodes de áudio...')
        source.connect(gainNode)
        gainNode.connect(destination)
        console.log('✅ Nodes conectados')

        const audioStream = destination.stream
        const audioTrack = audioStream.getAudioTracks()[0]
        console.log('🎵 Stream criado com track:', audioTrack ? audioTrack.id : 'NENHUMA')
        console.log('🎵 Track settings:', audioTrack ? audioTrack.getSettings() : 'N/A')

        // Verificar se a interceptação global está ativa
        console.log('🔍 Interceptação global ativa:', window.getUserMediaIntercepted)
        console.log('🔍 Stream anterior:', window.currentMP3Stream ? 'EXISTE' : 'NÃO EXISTE')

        // Definir stream global para interceptação
        window.currentMP3Stream = audioStream
        console.log('✅ Stream global definido:', window.currentMP3Stream ? 'SUCESSO' : 'FALHA')

        // Registrar source
        this.activeAudioSources.push(source)
        console.log('✅ Source registrado. Total ativos:', this.activeAudioSources.length)

        // Verificar se há chamada ativa antes de iniciar
        console.log('🔍 Chamada ativa:', this.currentCall ? 'SIM' : 'NÃO')
        console.log('🔍 Status da chamada:', this.currentCall?.status)
        console.log('🔍 Instância Wavoip:', this.currentCall?.whatsapp_instance)

        // Iniciar reprodução
        console.log('🎵 Iniciando reprodução do source...')
        try {
          source.start()
          this.isPlayingAudio = true
          console.log('✅ Source iniciado com sucesso!')
        } catch (startError) {
          console.error('❌ Erro ao iniciar source:', startError)
          throw startError
        }

        this.$q.notify({
          type: 'positive',
          message: 'Áudio sendo transmitido na chamada!'
        })

        // Parar quando terminar
        source.onended = () => {
          console.log('🎵 Source finalizado naturalmente')
          this.isPlayingAudio = false
          this.activeAudioSources = this.activeAudioSources.filter(s => s !== source)
          
          // Só limpar stream global se não há mais sources ativos
          if (this.activeAudioSources.length === 0) {
            window.currentMP3Stream = null
            console.log('🧹 Limpeza após finalização do último source')
          } else {
            console.log(`🧹 Ainda há ${this.activeAudioSources.length} sources ativos`)
          }
        }

      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao injetar áudio'
        })
      }
    },
    
    stopAllAudio() {
      this.isPlayingAudio = false
      
      // Parar todos os sources ativos de forma segura
      this.activeAudioSources.forEach((source, index) => {
        try {
          if (source && typeof source.stop === 'function') {
            source.stop()
          } else {
          }
        } catch (error) {
        }
      })
      
      this.activeAudioSources = []
      
      // Limpar stream global de forma segura
      if (window.currentMP3Stream) {
        try {
          const tracks = window.currentMP3Stream.getTracks()
          tracks.forEach((track, index) => {
            try {
              track.stop()
            } catch (trackError) {
            }
          })
          window.currentMP3Stream = null
        } catch (streamError) {
          window.currentMP3Stream = null
        }
      }
      
    },
    
    // Método para preparar interceptação durante outcoming_calling (sem reproduzir áudio)
    async prepareAudioInterception() {
      try {
        if (!this.uploadedFile || !this.audioContext || !this.audioBuffer) {
          return
        }
        
        if (!this.currentCall || !this.currentCall.whatsapp_instance) {
          return
        }
        
        if (!this.wavoipInstances[this.currentCall.whatsapp_instance]) {
          return
        }
        
        // Criar source mas não iniciar ainda
        const source = this.audioContext.createBufferSource()
        source.buffer = this.audioBuffer
        source.loop = false
        
        const gainNode = this.audioContext.createGain()
        gainNode.gain.value = 1.0
        
        const destination = this.audioContext.createMediaStreamDestination()
        
        source.connect(gainNode)
        gainNode.connect(destination)
        
        const audioStream = destination.stream
        
        // Definir stream global para interceptação
        window.currentMP3Stream = audioStream
        
        // Armazenar source para iniciar depois
        this.preparedAudioSource = source
        this.preparedGainNode = gainNode
        
      } catch (error) {
        console.error('Erro ao preparar interceptação:', error)
      }
    },
    
    // Método para iniciar reprodução do áudio durante accept
    async startAudioPlayback() {
      try {
        if (!this.preparedAudioSource) {
          await this.prepareAudioInterception()
        }
        
        if (this.preparedAudioSource) {
          // Configurar finalização antes de iniciar
          this.preparedAudioSource.onended = () => {
            this.isPlayingAudio = false
            this.activeAudioSources = this.activeAudioSources.filter(s => s !== this.preparedAudioSource)
            
            if (this.activeAudioSources.length === 0) {
              window.currentMP3Stream = null
            }
          }
          
          try {
            this.preparedAudioSource.start()
            this.isPlayingAudio = true
            this.activeAudioSources.push(this.preparedAudioSource)
            
            this.$q.notify({
              type: 'positive',
              message: 'Áudio sendo transmitido na chamada!'
            })
            
            // Limpar referências
            this.preparedAudioSource = null
            this.preparedGainNode = null
            
          } catch (startError) {
            this.$q.notify({
              type: 'negative',
              message: 'Erro ao iniciar áudio'
            })
          }
        }
        
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao iniciar áudio'
        })
      }
    },
    
    // Método para verificar se o áudio está sendo transmitido
    checkAudioTransmission() {
      if (this.isPlayingAudio && this.activeAudioSources.length > 0) {
        this.$q.notify({
          type: 'positive',
          message: 'Áudio transmitido com sucesso!'
        })
      } else {
        this.$q.notify({
          type: 'warning',
          message: 'Áudio pode não estar sendo transmitido'
        })
      }
    },
    
    
    
    
    // Métodos de limpeza
    cleanupWavoipInstance(sessionId) {
      try {
        
        if (this.wavoipInstances[sessionId]) {
          const instance = this.wavoipInstances[sessionId].whatsapp_instance
          
          if (instance) {
            // Verificar se a instância tem socket antes de tentar limpar
            if (instance.socket && typeof instance.socket.removeAllListeners === 'function') {
              try {
                instance.socket.removeAllListeners()
              } catch (socketError) {
              }
            }
            
            // Verificar se o método disconnect existe e é uma função
            if (typeof instance.disconnect === 'function') {
              try {
                instance.disconnect()
              } catch (disconnectError) {
              }
            }
            
            // Verificar se há método stop e tentar parar de forma segura
            if (typeof instance.stop === 'function') {
              try {
                instance.stop()
              } catch (stopError) {
              }
            }
          } else {
          }
        }
        
        // Remover instância criando um novo objeto sem a propriedade
        const newInstances = { ...this.wavoipInstances }
        delete newInstances[sessionId]
        this.wavoipInstances = newInstances
        
        
      } catch (error) {
      }
    },
    
    cleanup() {
      
      // Parar todos os áudios
      this.stopAllAudio()
      
      // Limpar todas as instâncias Wavoip
      Object.keys(this.wavoipInstances).forEach(sessionId => {
        this.cleanupWavoipInstance(sessionId)
      })
      
      // Limpar interceptação global
      if (window.originalGetUserMedia) {
        navigator.mediaDevices.getUserMedia = window.originalGetUserMedia
        window.getUserMediaIntercepted = false
        window.currentMP3Stream = null
      }
      
    },
    
    
    // Métodos auxiliares
    handleImageError(event) {
      event.target.style.display = 'none'
    }
  }
}
</script>

<style scoped>
.massa-wavoip {
  padding: 12px;
  max-width: 1400px;
  margin: 0 auto;
}


.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 2px solid #f0f0f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.session-item:hover {
  border-color: #1976d2;
  background: #f8f9ff;
}

.session-item.selected {
  border-color: #1976d2;
  background: #e3f2fd;
}

.session-info {
  flex: 1;
}

.session-name {
  font-weight: 600;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  font-size: 13px;
}

.session-token {
  font-family: monospace;
  font-size: 10px;
  color: #666;
  margin-bottom: 2px;
}

.token-index {
  color: #1976d2;
  font-weight: 600;
  font-size: 10px;
}

.session-status {
  font-size: 11px;
  color: #666;
}

.phone-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.phone-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: #f9f9f9;
  border-radius: 4px;
  font-size: 13px;
}

.file-info {
  padding: 8px 10px;
  background: #f0f8ff;
  border-radius: 4px;
  border: 1px solid #e3f2fd;
  font-size: 13px;
}

.device-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.device-item {
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fafafa;
}

.device-item.online {
  border-color: #4caf50;
  background: #f1f8e9;
}

.device-item.offline {
  border-color: #f44336;
  background: #ffebee;
}

.device-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 13px;
}

.device-token {
  font-family: monospace;
  font-size: 10px;
  color: #666;
  margin-bottom: 2px;
}

.device-status {
  font-size: 11px;
  margin-bottom: 6px;
}

.phone-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.call-info {
  margin-bottom: 20px;
}

.call-avatar {
  margin-bottom: 16px;
}

.call-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
}

.call-phone {
  margin: 0 0 4px 0;
  color: #666;
  font-size: 14px;
}

.call-status {
  margin: 0 0 8px 0;
  color: #1976d2;
  font-weight: 600;
  font-size: 12px;
}

.audio-indicator {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background: #4caf50;
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.call-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
}

/* Responsividade */
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .right-panel {
    order: -1;
  }
}

@media (max-width: 768px) {
  .massa-wavoip {
    padding: 10px;
  }
}
</style>