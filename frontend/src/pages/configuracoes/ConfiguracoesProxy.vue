<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesProxy.title') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesProxy.description') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesProxy.descriptionDetail') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesProxy.descriptionDetail2') }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-info text-bold">
          {{ $t('configuracoesProxy.tooltip') }}
        </q-tooltip>
      </q-item>

      <!-- Estatísticas dos Proxies -->
      <div class="row q-px-md q-mb-md">
        <div class="col-12">
          <q-card flat bordered class="q-pa-md">
            <div class="text-h6 q-mb-sm">{{ $t('configuracoesProxy.statistics.title') }}</div>
            <div class="row">
              <div class="col-4 text-center">
                <div class="text-h4 text-primary">{{ stats.totalProxies || 0 }}</div>
                <div class="text-caption">{{ $t('configuracoesProxy.statistics.totalProxies') }}</div>
              </div>
              <div class="col-4 text-center">
                <div class="text-h4 text-positive">{{ stats.activeProxies || 0 }}</div>
                <div class="text-caption">{{ $t('configuracoesProxy.statistics.activeProxies') }}</div>
              </div>
              <div class="col-4 text-center">
                <div class="text-h4 text-negative">{{ stats.failedProxies || 0 }}</div>
                <div class="text-caption">{{ $t('configuracoesProxy.statistics.failedProxies') }}</div>
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <!-- Geração de Proxies -->
      <div class="row q-px-md q-mb-md">
        <div class="col-12">
          <q-card flat bordered class="q-pa-md">
            <div class="text-h6 q-mb-sm">{{ $t('configuracoesProxy.generation.title') }}</div>
            
            <div class="row q-gutter-sm">
              <div class="col-6">
                <q-input
                  v-model="proxyCount"
                  type="number"
                  :label="$t('configuracoesProxy.generation.numberOfProxies')"
                  outlined
                  dense
                  :min="1"
                  :max="20"
                />
              </div>
              <div class="col-6">
                <q-select
                  v-model="proxyType"
                  :options="proxyTypes"
                  :label="$t('configuracoesProxy.generation.proxyType')"
                  outlined
                  dense
                />
              </div>
            </div>

            <div class="row q-gutter-sm q-mt-sm">
              <div class="col-6">
                <q-btn
                  color="primary"
                  :label="$t('configuracoesProxy.generation.generateProxies')"
                  @click="gerarProxies"
                  :loading="loading"
                  class="full-width"
                />
              </div>
              <div class="col-6">
                <q-btn
                  color="secondary"
                  :label="$t('configuracoesProxy.generation.generateGlobal')"
                  @click="gerarProxiesGlobais"
                  :loading="loading"
                  class="full-width"
                />
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <!-- Lista de Proxies -->
      <div class="row q-px-md q-mb-md">
        <div class="col-12">
          <q-card flat bordered class="q-pa-md">
            <div class="text-h6 q-mb-sm">{{ $t('configuracoesProxy.list.title') }}</div>
            
            <div class="row q-mb-sm">
              <div class="col-6">
                <q-btn
                  color="info"
                  :label="$t('configuracoesProxy.list.refreshList')"
                  @click="carregarProxies"
                  :loading="loading"
                  icon="refresh"
                  size="sm"
                />
              </div>
              <div class="col-6 text-right">
                <span class="text-caption text-grey-6">
                  {{ $t('configuracoesProxy.list.total') }}: {{ proxies.length }} {{ $t('configuracoesProxy.list.proxies') }}
                </span>
              </div>
            </div>
            
            <div v-if="proxies.length === 0" class="text-center q-pa-lg">
              <q-icon name="network_check" size="48px" color="grey-5" />
              <div class="text-grey-6 q-mt-sm">{{ $t('configuracoesProxy.list.noProxiesConfigured') }}</div>
              <div class="text-caption text-grey-5">{{ $t('configuracoesProxy.list.noProxiesMessage') }}</div>
            </div>

            <q-list v-else>
              <q-item v-for="(proxy, index) in proxies" :key="index" class="q-mb-sm">
                <q-item-section>
                  <q-item-label>{{ proxy.host }}:{{ proxy.port }}</q-item-label>
                  <q-item-label caption>
                    {{ $t('configuracoesProxy.proxyItem.type') }}: {{ proxy.type }} | 
                    {{ $t('configuracoesProxy.proxyItem.status') }}: {{ proxy.isActive ? $t('configuracoesProxy.proxyItem.active') : $t('configuracoesProxy.proxyItem.inactive') }}
                    <span v-if="proxy.username"> | {{ $t('configuracoesProxy.proxyItem.user') }}: {{ proxy.username }}</span>
                  </q-item-label>
                </q-item-section>
                
                <q-item-section side>
                  <div class="row q-gutter-xs">
                    <q-btn
                      size="sm"
                      color="info"
                      @click="testarProxy(proxy)"
                      icon="network_check"
                      :loading="testingProxy === index"
                    >
                      <q-tooltip>{{ $t('configuracoesProxy.proxyItem.testProxy') }}</q-tooltip>
                    </q-btn>
                    
                    <q-btn
                      size="sm"
                      color="warning"
                      @click="editarProxy(proxy, index)"
                      icon="edit"
                    >
                      <q-tooltip>{{ $t('configuracoesProxy.proxyItem.editProxy') }}</q-tooltip>
                    </q-btn>
                    
                    <q-btn
                      size="sm"
                      color="negative"
                      @click="deletarProxy(proxy, index)"
                      icon="delete"
                    >
                      <q-tooltip>{{ $t('configuracoesProxy.proxyItem.deleteProxy') }}</q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <div v-if="proxies.length > 0" class="q-mt-md">
              <q-btn
                color="negative"
                :label="$t('configuracoesProxy.list.removeAllProxies')"
                @click="removerProxies"
                :loading="loading"
                class="full-width"
              />
            </div>
          </q-card>
        </div>
      </div>

      <!-- Configuração Manual de Proxy -->
      <div class="row q-px-md q-mb-md">
        <div class="col-12">
          <q-card flat bordered class="q-pa-md">
            <div class="text-h6 q-mb-sm">{{ $t('configuracoesProxy.manualConfig.title') }}</div>
            
            <div class="row q-gutter-sm">
              <div class="col-6">
                <q-input
                  v-model="novoProxy.host"
                  :label="$t('configuracoesProxy.manualConfig.host')"
                  outlined
                  dense
                  :placeholder="$t('configuracoesProxy.manualConfig.hostPlaceholder')"
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="novoProxy.port"
                  type="number"
                  :label="$t('configuracoesProxy.manualConfig.port')"
                  outlined
                  dense
                  :placeholder="$t('configuracoesProxy.manualConfig.portPlaceholder')"
                />
              </div>
            </div>

            <div class="row q-gutter-sm q-mt-sm">
              <div class="col-6">
                <q-input
                  v-model="novoProxy.username"
                  :label="$t('configuracoesProxy.manualConfig.username')"
                  outlined
                  dense
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="novoProxy.password"
                  :type="showPassword ? 'text' : 'password'"
                  :label="$t('configuracoesProxy.manualConfig.password')"
                  outlined
                  dense
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-gutter-sm q-mt-sm">
              <div class="col-12">
                <q-select
                  v-model="novoProxy.type"
                  :options="proxyTypes"
                  :label="$t('configuracoesProxy.manualConfig.proxyType')"
                  outlined
                  dense
                />
              </div>
            </div>

            <div class="q-mt-sm">
              <q-btn
                color="positive"
                :label="$t('configuracoesProxy.manualConfig.addProxy')"
                @click="adicionarProxy"
                :loading="loading"
                :disable="!novoProxy.host || !novoProxy.port"
                class="full-width"
              />
            </div>
          </q-card>
        </div>
      </div>
    </q-list>

    <!-- Modal de Edição de Proxy -->
    <q-dialog v-model="showEditModal" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ $t('configuracoesProxy.editModal.title') }}</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="proxyEditando.host"
                :label="$t('configuracoesProxy.editModal.host')"
                outlined
                dense
                :placeholder="$t('configuracoesProxy.editModal.hostPlaceholder')"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="proxyEditando.port"
                type="number"
                :label="$t('configuracoesProxy.editModal.port')"
                outlined
                dense
                :placeholder="$t('configuracoesProxy.editModal.portPlaceholder')"
              />
            </div>
          </div>

          <div class="row q-gutter-sm q-mt-sm">
            <div class="col-6">
              <q-input
                v-model="proxyEditando.username"
                :label="$t('configuracoesProxy.editModal.username')"
                outlined
                dense
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="proxyEditando.password"
                :type="showEditPassword ? 'text' : 'password'"
                :label="$t('configuracoesProxy.editModal.password')"
                outlined
                dense
              >
                <template v-slot:append>
                  <q-icon
                    :name="showEditPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showEditPassword = !showEditPassword"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div class="row q-gutter-sm q-mt-sm">
            <div class="col-6">
              <q-select
                v-model="proxyEditando.type"
                :options="proxyTypes"
                :label="$t('configuracoesProxy.editModal.proxyType')"
                outlined
                dense
              />
            </div>
            <div class="col-6">
              <q-toggle
                v-model="proxyEditando.isActive"
                :label="$t('configuracoesProxy.editModal.active')"
                color="positive"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('configuracoesProxy.editModal.cancel')" color="primary" @click="cancelarEdicao" />
          <q-btn 
            flat 
            :label="$t('configuracoesProxy.editModal.save')" 
            color="positive" 
            @click="salvarEdicao"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { 
  ListarProxies, 
  SalvarProxies, 
  RemoverProxies, 
  TestarProxy, 
  ObterEstatisticasProxies,
  GerarProxiesLocais,
  GerarProxiesLocaisGlobais
} from 'src/service/proxy.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfiguracoesProxy',
  data() {
    return {
      usuario,
      proxies: [],
      stats: {
        totalProxies: 0,
        activeProxies: 0,
        failedProxies: 0
      },
      loading: false,
      testingProxy: null,
      userProfile: 'user',
      proxyCount: 5,
      proxyType: { label: this.$t('configuracoesProxy.proxyTypes.socks'), value: 'socks' },
      proxyTypes: [
        // { label: 'Mixed (HTTP + SOCKS)', value: 'mixed' },
        // { label: 'HTTP Only', value: 'http' },
        { label: this.$t('configuracoesProxy.proxyTypes.socks'), value: 'socks' }
      ],
      novoProxy: {
        host: '',
        port: '',
        username: '',
        password: '',
        type: 'socks'
      },
      showPassword: false,
      showEditModal: false,
      showEditPassword: false,
      proxyEditando: {
        host: '',
        port: '',
        username: '',
        password: '',
        type: 'socks',
        isActive: true
      },
      indiceEditando: -1
    }
  },
  methods: {
    // Carregar proxies
    async carregarProxies() {
      try {
        this.loading = true
        const { data } = await ListarProxies()
        this.proxies = data.data || []
      } catch (error) {
        console.error('Erro ao carregar proxies:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorLoadingProxies')
        })
      } finally {
        this.loading = false
      }
    },

    // Carregar estatísticas
    async carregarEstatisticas() {
      try {
        const { data } = await ObterEstatisticasProxies()
        
        // Usa estatísticas do banco de dados
        const dbStats = data.data.database
        const tenantId = this.$store.getters['auth/getTenantId'] || this.usuario?.tenantId || 1
        const tenantStats = dbStats.tenants[tenantId] || { total: 0, active: 0, inactive: 0 }
        
        this.stats = {
          totalProxies: tenantStats.total,
          activeProxies: tenantStats.active,
          failedProxies: tenantStats.inactive
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      }
    },

    // Gerar proxies locais
    async gerarProxies() {
      try {
        this.loading = true
        const { data } = await GerarProxiesLocais(this.proxyCount, this.proxyType.value)
        
        this.$q.notify({
          type: 'positive',
          message: data.message || this.$t('configuracoesProxy.messages.proxiesGeneratedSuccess')
        })
        
        await this.carregarProxies()
        await this.carregarEstatisticas()
      } catch (error) {
        console.error('Erro ao gerar proxies:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorGeneratingProxies')
        })
      } finally {
        this.loading = false
      }
    },

    // Gerar proxies globais
    async gerarProxiesGlobais() {
      try {
        this.loading = true
        const { data } = await GerarProxiesLocaisGlobais(this.proxyCount, this.proxyType.value)
        
        this.$q.notify({
          type: 'positive',
          message: data.message || this.$t('configuracoesProxy.messages.globalProxiesGeneratedSuccess')
        })
        
        await this.carregarProxies()
        await this.carregarEstatisticas()
      } catch (error) {
        console.error('Erro ao gerar proxies globais:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorGeneratingGlobalProxies')
        })
      } finally {
        this.loading = false
      }
    },

    // Testar proxy
    async testarProxy(proxy) {
      try {
        this.testingProxy = this.proxies.indexOf(proxy)
        const { data } = await TestarProxy(proxy)
        
        if (data.success) {
          this.$q.notify({
            type: 'positive',
            message: this.$t('configuracoesProxy.messages.proxyWorking', { host: proxy.host, port: proxy.port })
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracoesProxy.messages.proxyFailed', { host: proxy.host, port: proxy.port, error: data.data?.error || 'Unknown error' })
          })
        }
      } catch (error) {
        console.error('Erro ao testar proxy:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorTestingProxy')
        })
      } finally {
        this.testingProxy = null
      }
    },

    // Adicionar proxy manual
    async adicionarProxy() {
      try {
        this.loading = true
        
        const proxy = {
          host: this.novoProxy.host,
          port: Number(this.novoProxy.port),
          username: this.novoProxy.username || undefined,
          password: this.novoProxy.password || undefined,
          type: this.novoProxy.type,
          isActive: true
        }

        await SalvarProxies([...this.proxies, proxy])
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracoesProxy.messages.proxyAddedSuccess')
        })
        
        // Limpar formulário
        this.novoProxy = {
          host: '',
          port: '',
          username: '',
          password: '',
          type: 'socks'
        }
        
        await this.carregarProxies()
        await this.carregarEstatisticas()
      } catch (error) {
        console.error('Erro ao adicionar proxy:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorAddingProxy')
        })
      } finally {
        this.loading = false
      }
    },

    // Remover todos os proxies
    async removerProxies() {
      try {
        this.$q.dialog({
          title: this.$t('configuracoesProxy.confirmations.removeAllTitle'),
          message: this.$t('configuracoesProxy.confirmations.removeAllMessage'),
          cancel: true,
          persistent: true
        }).onOk(async () => {
          this.loading = true
          await RemoverProxies()
          
          this.$q.notify({
            type: 'positive',
            message: this.$t('configuracoesProxy.messages.allProxiesRemovedSuccess')
          })
          
          await this.carregarProxies()
          await this.carregarEstatisticas()
          this.loading = false
        })
      } catch (error) {
        console.error('Erro ao remover proxies:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorRemovingProxies')
        })
        this.loading = false
      }
    },

    // Editar proxy
    editarProxy(proxy, index) {
      this.proxyEditando = {
        host: proxy.host,
        port: proxy.port,
        username: proxy.username || '',
        password: proxy.password || '',
        type: proxy.type,
        isActive: proxy.isActive
      }
      this.indiceEditando = index
      this.showEditModal = true
    },

    // Cancelar edição
    cancelarEdicao() {
      this.showEditModal = false
      this.proxyEditando = {
        host: '',
        port: '',
        username: '',
        password: '',
        type: 'socks',
        isActive: true
      }
      this.indiceEditando = -1
    },

    // Salvar edição
    async salvarEdicao() {
      try {
        this.loading = true
        
        const proxyAtualizado = {
          host: this.proxyEditando.host,
          port: Number(this.proxyEditando.port),
          username: this.proxyEditando.username || undefined,
          password: this.proxyEditando.password || undefined,
          type: this.proxyEditando.type,
          isActive: this.proxyEditando.isActive
        }

        // Atualizar o array de proxies
        const proxiesAtualizados = [...this.proxies]
        proxiesAtualizados[this.indiceEditando] = proxyAtualizado

        await SalvarProxies(proxiesAtualizados)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracoesProxy.messages.proxyUpdatedSuccess')
        })
        
        this.cancelarEdicao()
        await this.carregarProxies()
        await this.carregarEstatisticas()
      } catch (error) {
        console.error('Erro ao editar proxy:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorUpdatingProxy')
        })
      } finally {
        this.loading = false
      }
    },

    // Deletar proxy individual
    async deletarProxy(proxy, index) {
      try {
        this.$q.dialog({
          title: this.$t('configuracoesProxy.confirmations.deleteTitle'),
          message: this.$t('configuracoesProxy.confirmations.deleteMessage', { host: proxy.host, port: proxy.port }),
          cancel: true,
          persistent: true
        }).onOk(async () => {
          this.loading = true
          
          // Remover o proxy do array
          const proxiesAtualizados = this.proxies.filter((_, i) => i !== index)
          
          await SalvarProxies(proxiesAtualizados)
          
          this.$q.notify({
            type: 'positive',
            message: this.$t('configuracoesProxy.messages.proxyDeletedSuccess')
          })
          
          await this.carregarProxies()
          await this.carregarEstatisticas()
          this.loading = false
        })
      } catch (error) {
        console.error('Erro ao deletar proxy:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesProxy.messages.errorDeletingProxy')
        })
        this.loading = false
      }
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    await this.carregarProxies()
    await this.carregarEstatisticas()
  }
})
</script>

<style lang="scss" scoped>
.q-list {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  padding: 18px 18px 10px 18px;
  margin-top: 18px;
  margin-bottom: 18px;
}

.q-item {
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
  .q-item__label {
    font-weight: 500;
  }
  .q-item__label--caption {
    opacity: 0.7;
  }
}

.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
}

.row.q-px-md {
  margin-bottom: 18px;
  &:last-of-type {
    margin-bottom: 0;
  }
  .col-12 {
    margin-bottom: 0;
  }
}

.q-input {
  .q-field__control {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  }
  &.q-field--focused .q-field__control {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

/* Modo Escuro */
body.body--dark {
  .q-list {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .q-item {
    &:hover {
      background: rgba(255,255,255,0.07);
    }
  }
  .q-card {
    background: rgba(40, 40, 40, 0.8);
    border-color: rgba(255,255,255,0.1);
  }
  .q-input {
    .q-field__control {
      background: rgba(255,255,255,0.05);
      &:hover {
        background: rgba(255,255,255,0.1);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.15);
    }
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .q-list {
    padding: 10px 6px 6px 6px;
    border-radius: 10px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .q-item {
    margin-bottom: 10px;
  }
  .row.q-px-md {
    margin-bottom: 10px;
  }
}
</style>
