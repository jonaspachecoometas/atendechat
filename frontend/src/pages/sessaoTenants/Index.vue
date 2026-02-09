<template>
  <div v-if="userProfile === 'superadmin'">
    <div class="row col full-width q-pa-lg">
      <q-card
        flat
        bordered
        class="full-width"
      >
        <q-card-section class="text-h6 text-bold">
          {{ $t('sessaoTenant.communicationChannels') }}
        </q-card-section>
      </q-card>
    </div>
    <div class="row full-width q-py-lg q-px-md ">
      <template v-for="item in canais" :key="item.id">
        <q-card
          flat
          bordered
          class="col-xs-12 col-sm-5 col-md-4 col-lg-3 q-ma-md"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon
                  size="40px"
                  :name="`img:${item.type}-logo.png`"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-bold">{{ $t('sessaoTenant.tenant') }}: {{ item.tenant.name }}</q-item-label>
              <q-item-label class="text-h6 text-bold"> {{ $t('sessaoTenant.name') }}: {{ item.name }} - ID #{{ item.id }}</q-item-label>
              <q-item-label class="text-h6 text-caption">
                {{ item.type }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                round
                flat
                dense
                icon="edit"
                @click="handleOpenModalWhatsapp(item)"
                v-if="isAdmin"
                >
                <q-tooltip>
                  {{ $t('sessaoTenant.editConnection') }}
                </q-tooltip>
              </q-btn>
              <q-btn
                icon="mdi-delete"
                @click="deleteWhatsapp(item)"
                :disable="!isAdmin"
                dense
                round
                flat
              >
                <q-tooltip>
                  {{ $t('sessaoTenant.deleteConnection') }}
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section>
            <ItemStatusChannel :item="item" />
          </q-card-section>
          <q-card-actions
            class="q-gutter-md q-pa-md q-pt-none"
            align="center"
          >
          </q-card-actions>
        </q-card>
      </template>
    </div>
    <ModalWhatsapp
      v-model:modalWhatsapp="modalWhatsapp"
      v-model:whatsAppEdit="whatsappSelecionado"
      @recarregar-lista="listarWhatsapps"
    />
    <q-inner-loading :showing="loading">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<script>

import { DeletarWhatsappTenant, DeleteWhatsappSession, StartWhatsappSession, ListarWhatsappsTenant, RequestNewQrCode, UpdateWhatsapp } from 'src/service/sessoesWhatsapp.js'
import { SyncOldMessagesWbot } from 'src/service/tickets.js'
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt-BR/index'
import ModalQrCode from './ModalQrCode.vue'
import { mapGetters } from 'vuex'
import ModalWhatsapp from './ModalWhatsapp.vue'
import ItemStatusChannel from './ItemStatusChannel.vue'
import VFacebookLogin from 'src/components/FacebookLogin.vue'
import { FetchFacebookPages, LogoutFacebookPages } from 'src/service/facebook.js'
import { ListarChatFlow } from 'src/service/chatFlow.js'
import { MostrarCores } from 'src/service/empresas.js';

const userLogado = JSON.parse(localStorage.getItem('usuario'))

export default {
  name: 'IndexSessoesWhatsapp',
  components: {
    ModalQrCode,
    ModalWhatsapp,
    ItemStatusChannel,
    VFacebookLogin
  },
  data () {
    return {
      userProfile: "user",
      colors: {},
      loading: false,
      userLogado,
      isAdmin: false,
      abrirModalQR: false,
      modalWhatsapp: false,
      whatsappSelecionado: {},
      listaChatFlow: [],
      whatsAppId: null,
      canais: [],
      objStatus: {
        qrcode: ''
      },
      columns: [
        { name: 'tenantId', label: 'Tenant', field: 'tenantId', align: 'left' },
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left'
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center'
        },
        {
          name: 'session',
          label: 'Sessão',
          field: 'status',
          align: 'center'
        },
        {
          name: 'number',
          label: 'Número',
          field: 'number',
          align: 'center'
        },
        {
          name: 'updatedAt',
          label: 'Última Atualização',
          field: 'updatedAt',
          align: 'center',
          format: d => this.formatarData(d, 'dd/MM/yyyy HH:mm')
        },
        {
          name: 'isDefault',
          label: 'Padrão',
          field: 'isDefault',
          align: 'center'
        },
        {
          name: 'acoes',
          label: 'Ações',
          field: 'acoes',
          align: 'center'
        }
      ],
      FB: {},
      FBscope: {},
      FBLoginOptions: {
        scope:
          'pages_manage_metadata,pages_messaging,instagram_basic,pages_show_list,pages_read_engagement,instagram_manage_messages'
      },
      FBPageList: [],
      fbSelectedPage: { name: null, id: null },
      fbPageName: '',
      fbUserToken: ''
    }
  },
  methods: {
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val;
            return acc;
          }, {});

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    formatarData (data, formato) {
      return format(parseISO(data), formato, { locale: pt })
    },
    handleOpenModalWhatsapp (whatsapp) {
      this.whatsappSelecionado = whatsapp
      this.modalWhatsapp = true
    },
    async listarWhatsapps () {
      const { data } = await ListarWhatsappsTenant()
      this.canais = JSON.parse(JSON.stringify(data))
      this.$store.commit('LOAD_WHATSAPPS', data)
    },
    async deleteWhatsapp (whatsapp) {
      this.$q.dialog({
        title: this.$t('sessaoTenant.deleteAttention'),
        message: this.$t('sessaoTenant.deleteWarning'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        DeletarWhatsappTenant(whatsapp.id).then(r => {
          this.$store.commit('DELETE_WHATSAPPS', whatsapp.id)
        }).finally(f => {
          this.loading = false
          window.location.reload();
        })
      })
      
    },
  },
  mounted () {
    this.userProfile = localStorage.getItem("profile");
    this.isAdmin = localStorage.getItem('profile')
    this.listarWhatsapps()
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val;
        return acc;
      }, {});

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
  }
}
</script>

<style scoped lang="scss">
.full-width {
  width: 100%;
}

.q-card {
  border-radius: 18px;
  background: rgba(255,255,255,0.88);
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  backdrop-filter: blur(8px);
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s;
  border: 1px solid rgba(0,0,0,0.04);
}

.q-card-section {
  padding: 1.2rem 1.5rem 0.7rem 1.5rem;
}

.q-item {
  border-radius: 12px;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 0.5rem;
}

.q-btn {
  border-radius: 8px;
  min-width: 28px;
  min-height: 28px;
  padding: 0.15rem 0.7rem;
  font-size: 0.85rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.13);
    background: rgba(var(--q-primary-rgb), 0.08);
  }
}

body.body--dark {
  .q-card, .q-item {
    background: rgba(30,30,30,0.96);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    border: 1px solid rgba(255,255,255,0.08);
  }
}

@media (max-width: 600px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
  .q-card-section {
    padding: 1rem !important;
  }
}
</style>
