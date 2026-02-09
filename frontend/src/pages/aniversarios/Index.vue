<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-infinite-scroll
      @load="loadMoreAniversarios"
      :offset="100"
      :disable="!hasMore || loading"
    >
      <q-table
        style="border-radius: 8px !important;"
        flat
        bordered
        square
        hide-bottom
        class="my-sticky-dynamic q-ma-lg"
        :rows="aniversarios"
        :columns="columns"
        :loading="loading"
        row-key="id"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top>
          <div class="q-pa-md" style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
            <div>
              <div class="text-h6">{{ $t('aniversarios.title') }}</div>
            </div>
            <div>
              <q-btn @click="openModalAniversario"
                  flat
                  dense
                  icon="mdi-gift-outline"
                  color="primary"
                  class="bg-padrao btn-rounded">
              <q-tooltip content-class="bg-primary text-bold">
                {{ $t('aniversarios.sendManualMessage') }}
              </q-tooltip>
              </q-btn>
            </div>
          </div>
        </template>
        <template v-slot:body-cell-acoes="props">
          <q-td class="text-center">
            <q-btn
              flat
              round
              icon="edit"
              @click="editContact(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-infinite-scroll>

    <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('aniversarios.modalTitle') }}</div>
          <p>{{ $t('aniversarios.modalDescription') }}</p>
          <q-banner class="bg-yellow text-black" inline-actions>
            {{ $t('aniversarios.modalWarning') }}
          </q-banner>
        </q-card-section>

        <q-card-section v-if="loadingBirthday">
          <q-item-section>
            <q-item-label>{{ $t('aniversarios.sendingMessages') }}</q-item-label>
            <q-item-label caption>{{ $t('aniversarios.modalWarning') }}</q-item-label>
            <div v-if="loadingBirthday">{{ $t('aniversarios.sendingMessages') }}</div>
            <div v-if="loadingBirthday" class="loading-bar">
              <div class="bar"></div>
            </div>
          </q-item-section>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="selectedWhatsApp"
            :options="cSessionsOptions"
            :label="$t('aniversarios.whatsappLabel')"
            filled
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('aniversarios.cancel')" v-close-popup />
          <q-btn flat :label="$t('aniversarios.send')" @click="sendBirthdayMessage" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <ContatoModal
      :contactId="selectedContactId"
      v-model:modalContato="modalContato"
    />
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { ListarContatosAniversario } from 'src/service/contatos.js'
import { SendBirthdayMessage } from 'src/service/tickets.js'
import { MostrarCores } from 'src/service/empresas.js';
import ContatoModal from 'src/pages/contatos/ContatoModal.vue'
import { mapGetters } from 'vuex'
// import mixinCommon from './mixinCommon'
export default {
  name: 'Agendamentos',
  components: { ContatoModal },
  // mixins: [mixinCommon],
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => (w.type === 'whatsapp' || w.type === 'waba' || w.type === 'instagram' || w.type === 'baileys' || w.type === 'evo' || w.type === 'meow' || w.type === 'uazapi' || w.type === 'zapi')  && !w.isDeleted && w.status === 'CONNECTED' && w.birthdayDate === 'enabled');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type, tokenAPI: w.tokenAPI || null, fbPageId: w.fbPageId || null }))
    }
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      aniversarios: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      loadingBirthday: false,
      columns: [
        { name: 'id', label: this.$t('aniversarios.columns.id'), field: 'id', align: 'left' },
        { name: 'name', label: this.$t('aniversarios.columns.name'), field: 'name', align: 'center' },
        { name: 'birthdayDate', label: this.$t('aniversarios.columns.birthdayDate'), field: 'birthdayDate', align: 'center' },
        { name: 'acoes', label: this.$t('aniversarios.columns.actions'), field: 'acoes', align: 'center' },
      ],
      selectedContactId: null,
      modalContato: false,
      isModalOpen: false,
      selectedWhatsApp: null,
      aniversarios: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      pageNumber: 1,
      hasMore: true,
      loading: false,
    }
  },
  methods: {
    openModalAniversario() {
      this.isModalOpen = true;
    },
    async sendBirthdayMessage() {
      this.loadingBirthday = true
      if (this.selectedWhatsApp) {
        try {
          await SendBirthdayMessage({
            whatsapp: this.selectedWhatsApp
          });
          this.$q.notify({
            type: 'positive',
            message: 'Mensagens de aniversário enviadas com sucesso!'
          });
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao enviar mensagens de aniversário.'
          });
        }
      }
      this.loadingBirthday = false
      this.isModalOpen = false;
    },
    editContact (contactId) {
      this.selectedContactId = contactId
      this.modalContato = true
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = colorsArray.reduce((acc, colorObj) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val
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
    async listarAniversarios () {
      try {
        this.loading = true;
        const data = await ListarContatosAniversario({ pageNumber: this.pageNumber });
        if (this.pageNumber === 1) {
          this.aniversarios = data.data.contacts;
        } else {
          this.aniversarios = [...this.aniversarios, ...data.data.contacts];
        }
        this.hasMore = data.data.hasMore;
      } catch (error) {
        console.error('Erro ao listar os contatos:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadMoreAniversarios () {
      if (this.loading || !this.hasMore) return;
      this.pageNumber++;
      await this.listarAniversarios();
    }
  },
  mounted () {
    this.listarAniversarios()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.aniversarios === true;
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val
        return acc
      }, {})

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

<style lang="scss" scoped>
.q-table {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-table__top {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }
  }

  thead {
    tr {
      th {
        background: rgba(var(--q-primary-rgb), 0.1);
        color: var(--q-primary);
        font-weight: 600;
        font-size: 0.9rem;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.05);
      }

      td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
}

.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .q-card-section {
      padding: 1.2rem 1.5rem;

      .text-h6 {
        color: var(--q-primary);
        font-weight: 600;
        font-size: 1.2rem;
        margin: 0;
      }

      p {
        color: var(--q-primary);
        opacity: 0.8;
        margin: 0.5rem 0;
        line-height: 1.5;
      }
    }

    .q-select {
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
  }
}

.q-banner {
  border-radius: 12px;
  background: #fffbe6 !important;
  border: 1px solid #ffe58f;
  color: #222;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.bg-red {
    background: rgba(255, 0, 0, 0.1) !important;
    border-color: rgba(255, 0, 0, 0.2);
    color: var(--q-negative);
  }
}

.loading-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  .bar {
    width: 0;
    height: 100%;
    background: var(--q-primary);
    position: absolute;
    top: 0;
    left: 0;
    animation: loadingAnimation 1s infinite;
    border-radius: 2px;
  }
}

@keyframes loadingAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

/* Modo Escuro */
body.body--dark {
  .q-table {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    thead {
      tr {
        th {
          background: rgba(255, 255, 255, 0.05);
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }
    }

    tbody {
      tr {
        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        td {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      .q-select {
        .q-field__control {
          background: rgba(255, 255, 255, 0.05);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        &.q-field--focused .q-field__control {
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }

  .q-banner {
    &.bg-red {
      background: rgba(255, 0, 0, 0.15) !important;
      border-color: rgba(255, 0, 0, 0.3);
    }
  }

  .loading-bar {
    background: rgba(255, 255, 255, 0.05);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-table {
    margin: 0.5rem;
    border-radius: 12px !important;

    .q-table__top {
      padding: 1rem;

      .text-h6 {
        font-size: 1.1rem;
      }
    }

    thead {
      tr {
        th {
          padding: 0.8rem;
          font-size: 0.85rem;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.8rem;
          font-size: 0.85rem;
        }
      }
    }
  }

  .q-dialog {
    .q-card {
      width: 95vw !important;
      margin: 1rem;
      border-radius: 12px;

      .q-card-section {
        padding: 1rem;

        .text-h6 {
          font-size: 1.1rem;
        }

        p {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
