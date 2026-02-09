<template>
  <div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('appWaba.title')"
      :rows="appWabas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      style="border-radius: 8px"
    >
      <template v-slot:top-right>
        <q-btn
          style="margin: 5px"
          color="primary"
          :label="$t('common.add')"
          @click="abrirModalCriar"
        />
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-chip
            :color="props.row.isActive ? 'positive' : 'grey'"
            text-color="white"
            size="sm"
          >
            {{ props.row.isActive ? $t('appWaba.active') : $t('appWaba.inactive') }}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarAppWaba(props.row)"
          >
            <q-tooltip>{{ $t('common.edit') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarAppWaba(props.row)"
          >
            <q-tooltip>{{ $t('common.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Modal para criar/editar -->
    <q-dialog v-model="modalAppWaba" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">
            {{ appWabaEdicao.id ? $t('appWaba.edit') : $t('appWaba.create') }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="appWabaEdicao.tenantId"
            :options="tenantsOptions"
            :label="$t('appWaba.tenant')"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            filled
            :disable="!!appWabaEdicao.id"
          />
          <q-input
            v-model="appWabaEdicao.appId"
            :label="$t('appWaba.appId')"
            filled
            class="q-mt-md"
          />
          <q-input
            v-model="appWabaEdicao.apiVersion"
            :label="$t('appWaba.apiVersion')"
            filled
            class="q-mt-md"
          />
          <q-input
            v-model="appWabaEdicao.description"
            :label="$t('appWaba.description')"
            type="textarea"
            filled
            class="q-mt-md"
          />
          <q-input
            v-model="appWabaEdicao.token"
            :label="$t('appWaba.token')"
            :type="showToken ? 'text' : 'password'"
            filled
            class="q-mt-md"
            :hint="$t('appWaba.tokenHint') || 'Token do Business Manager para criar canais WABA'"
            persistent-hint
          >
            <template v-slot:append>
              <q-icon
                :name="showToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showToken = !showToken"
              />
            </template>
          </q-input>
          <q-input
            v-model="appWabaEdicao.configId"
            :label="$t('appWaba.configId') || 'Config ID (Cadastro Incorporado)'"
            filled
            class="q-mt-md"
            :hint="$t('appWaba.configIdHint') || 'ID de configuração do Cadastro Incorporado do WhatsApp Business'"
            persistent-hint
          />
          <q-input
            v-model="appWabaEdicao.appSecret"
            :label="$t('appWaba.appSecret') || 'App Secret'"
            :type="showAppSecret ? 'text' : 'password'"
            filled
            class="q-mt-md"
            :hint="$t('appWaba.appSecretHint') || 'App Secret do Facebook App para troca de código OAuth'"
            persistent-hint
          >
            <template v-slot:append>
              <q-icon
                :name="showAppSecret ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showAppSecret = !showAppSecret"
              />
            </template>
          </q-input>
          <q-input
            v-model="appWabaEdicao.redirectUri"
            :label="$t('appWaba.redirectUri') || 'Redirect URI'"
            filled
            class="q-mt-md"
            readonly
            :hint="$t('appWaba.redirectUriHint') || 'URI de redirecionamento OAuth (deve ser exatamente o mesmo configurado no Facebook App Dashboard)'"
            persistent-hint
          >
            <template v-slot:append>
              <q-btn
                flat
                round
                dense
                icon="mdi-content-copy"
                @click="copiarRedirectUri"
              >
                <q-tooltip>{{ $t('appWaba.copyTooltip') || 'Copiar para a área de transferência' }}</q-tooltip>
              </q-btn>
            </template>
          </q-input>
          <q-separator class="q-mt-md q-mb-md" />
          <div class="text-h6 q-mb-md">{{ $t('appWaba.instagramSettings') || 'Configurações Instagram' }}</div>
          <q-input
            v-model="appWabaEdicao.appInstagramId"
            :label="$t('appWaba.appInstagramId') || 'Instagram App ID'"
            filled
            class="q-mt-md"
            :hint="$t('appWaba.appInstagramIdHint') || 'ID do aplicativo Instagram (Instagram App ID)'"
            persistent-hint
          />
          <q-input
            v-model="appWabaEdicao.appInstagramSecret"
            :label="$t('appWaba.appInstagramSecret') || 'Instagram App Secret'"
            :type="showAppInstagramSecret ? 'text' : 'password'"
            filled
            class="q-mt-md"
            :hint="$t('appWaba.appInstagramSecretHint') || 'App Secret do Instagram para troca de código OAuth'"
            persistent-hint
          >
            <template v-slot:append>
              <q-icon
                :name="showAppInstagramSecret ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showAppInstagramSecret = !showAppInstagramSecret"
              />
            </template>
          </q-input>
          <q-input
            v-model="appWabaEdicao.redirectUriInstagram"
            :label="$t('appWaba.redirectUriInstagram') || 'Redirect URI Instagram'"
            filled
            class="q-mt-md"
            readonly
            :hint="$t('appWaba.redirectUriInstagramHint') || 'URI de redirecionamento OAuth do Instagram (deve ser exatamente o mesmo configurado no Instagram App Dashboard)'"
            persistent-hint
          >
            <template v-slot:append>
              <q-btn
                flat
                round
                dense
                icon="mdi-content-copy"
                @click="copiarRedirectUriInstagram"
              >
                <q-tooltip>{{ $t('appWaba.copyTooltip') || 'Copiar para a área de transferência' }}</q-tooltip>
              </q-btn>
            </template>
          </q-input>
          <q-separator class="q-mt-md q-mb-md" />
          <div class="text-h6 q-mb-md">{{ $t('appWaba.facebookSettings') || 'Configuração do Facebook' }}</div>
          <q-input
            v-model="appWabaEdicao.redirectUriFacebook"
            :label="$t('appWaba.redirectUriFacebook') || 'Redirect URI Facebook'"
            filled
            class="q-mt-md"
            readonly
            :hint="$t('appWaba.redirectUriFacebookHint') || 'URI de redirecionamento OAuth do Facebook (deve ser exatamente o mesmo configurado no Facebook App Dashboard)'"
            persistent-hint
          >
            <template v-slot:append>
              <q-btn
                flat
                round
                dense
                icon="mdi-content-copy"
                @click="copiarRedirectUriFacebook"
              >
                <q-tooltip>{{ $t('appWaba.copyTooltip') || 'Copiar para a área de transferência' }}</q-tooltip>
              </q-btn>
            </template>
          </q-input>
          <q-toggle
            v-model="appWabaEdicao.isActive"
            :label="$t('appWaba.isActive')"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="negative" v-close-popup />
          <q-btn flat :label="$t('common.save')" color="primary" @click="salvarAppWaba" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ListarAppWaba, CriarAppWaba, AtualizarAppWaba, DeletarAppWaba } from 'src/service/appWaba.js'
import { ListarTenants } from 'src/service/tenants.js'
import { copyToClipboard } from 'quasar'

export default {
  name: 'AppWaba',
  data () {
    return {
      appWabaEdicao: {},
      modalAppWaba: false,
      appWabas: [],
      tenants: [],
      loading: false,
      showToken: false,
      showAppSecret: false,
      showAppInstagramSecret: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'tenant', label: this.$t('appWaba.tenant'), field: 'tenant', align: 'left', format: (val, row) => row.tenant?.name || '-' },
        { name: 'appId', label: this.$t('appWaba.appId'), field: 'appId', align: 'center' },
        { name: 'apiVersion', label: this.$t('appWaba.apiVersion'), field: 'apiVersion', align: 'center' },
        { name: 'description', label: this.$t('appWaba.description'), field: 'description', align: 'center' },
        { name: 'isActive', label: this.$t('appWaba.status'), field: 'isActive', align: 'center' },
        { name: 'acoes', label: this.$t('common.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    tenantsOptions () {
      return this.tenants.map(t => ({
        id: t.id,
        name: t.name
      }))
    },
    redirectUriDefault () {
      return `${window.location.origin}/facebook-embedded-signup.html`
    },
    redirectUriInstagramDefault () {
      return `${window.location.origin}/instagram-oauth-callback.html`
    },
    redirectUriFacebookDefault () {
      return `${window.location.origin}/facebook-oauth-callback.html`
    }
  },
  methods: {
    abrirModalCriar () {
      this.appWabaEdicao = {
        tenantId: null,
        appId: '',
        apiVersion: '',
        description: '',
        token: '',
        configId: '',
        appSecret: '',
        redirectUri: this.redirectUriDefault,
        redirectUriFacebook: this.redirectUriFacebookDefault,
        appInstagramId: '',
        appInstagramSecret: '',
        redirectUriInstagram: this.redirectUriInstagramDefault,
        isActive: true
      }
      this.modalAppWaba = true
    },
    editarAppWaba (row) {
      this.appWabaEdicao = { ...row }
      // Garantir que o redirectUri sempre tenha o valor padrão
      this.appWabaEdicao.redirectUri = this.redirectUriDefault
      // Garantir que o redirectUriFacebook sempre tenha o valor padrão
      if (!this.appWabaEdicao.redirectUriFacebook) {
        this.appWabaEdicao.redirectUriFacebook = this.redirectUriFacebookDefault
      }
      // Garantir que o redirectUriInstagram sempre tenha o valor padrão
      if (!this.appWabaEdicao.redirectUriInstagram) {
        this.appWabaEdicao.redirectUriInstagram = this.redirectUriInstagramDefault
      }
      this.modalAppWaba = true
    },
    async salvarAppWaba () {
      this.loading = true
      try {
        // Garantir que o redirectUri sempre tenha o valor padrão antes de salvar
        this.appWabaEdicao.redirectUri = this.redirectUriDefault
        // Garantir que o redirectUriFacebook sempre tenha o valor padrão antes de salvar
        if (!this.appWabaEdicao.redirectUriFacebook) {
          this.appWabaEdicao.redirectUriFacebook = this.redirectUriFacebookDefault
        }
        // Garantir que o redirectUriInstagram sempre tenha o valor padrão antes de salvar
        if (!this.appWabaEdicao.redirectUriInstagram) {
          this.appWabaEdicao.redirectUriInstagram = this.redirectUriInstagramDefault
        }
        if (this.appWabaEdicao.id) {
          await AtualizarAppWaba(this.appWabaEdicao.id, this.appWabaEdicao)
          this.$q.notify({
            type: 'positive',
            message: this.$t('appWaba.updated')
          })
        } else {
          await CriarAppWaba(this.appWabaEdicao)
          this.$q.notify({
            type: 'positive',
            message: this.$t('appWaba.created')
          })
        }
        this.modalAppWaba = false
        this.listarAppWabas()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || this.$t('appWaba.error')
        })
      } finally {
        this.loading = false
      }
    },
    async deletarAppWaba (row) {
      this.$q.dialog({
        title: this.$t('common.confirm'),
        message: this.$t('appWaba.deleteConfirm', { id: row.id }),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary'
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative'
        },
        persistent: true
      }).onOk(async () => {
        try {
          await DeletarAppWaba(row.id)
          this.$q.notify({
            type: 'positive',
            message: this.$t('appWaba.deleted')
          })
          this.listarAppWabas()
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: error.response?.data?.message || this.$t('appWaba.deleteError')
          })
        }
      })
    },
    async listarAppWabas () {
      this.loading = true
      try {
        const { data } = await ListarAppWaba()
        this.appWabas = data
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('appWaba.listError')
        })
      } finally {
        this.loading = false
      }
    },
    async listarTenants () {
      try {
        const { data } = await ListarTenants()
        this.tenants = data
      } catch (error) {
        console.error('Erro ao listar tenants:', error)
      }
    },
    copiarRedirectUri () {
      const uri = this.redirectUriDefault
      copyToClipboard(uri).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('appWaba.copySuccess') || 'URL de redirecionamento copiada para a área de transferência!'
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: this.$t('appWaba.copyError') || 'Não foi possível copiar para a área de transferência. Copie manualmente!'
        })
      })
    },
    copiarRedirectUriInstagram () {
      const uri = this.redirectUriInstagramDefault
      copyToClipboard(uri).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('appWaba.copySuccess') || 'URL de redirecionamento Instagram copiada para a área de transferência!'
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: this.$t('appWaba.copyError') || 'Não foi possível copiar para a área de transferência. Copie manualmente!'
        })
      })
    },
    copiarRedirectUriFacebook () {
      const uri = this.redirectUriFacebookDefault
      copyToClipboard(uri).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('appWaba.copySuccess') || 'URL de redirecionamento Facebook copiada para a área de transferência!'
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: this.$t('appWaba.copyError') || 'Não foi possível copiar para a área de transferência. Copie manualmente!'
        })
      })
    }
  },
  async mounted () {
    await this.listarTenants()
    await this.listarAppWabas()
  }
}
</script>

<style scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>

