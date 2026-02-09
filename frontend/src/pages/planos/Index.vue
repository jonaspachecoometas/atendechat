<template>
  <div v-if="userProfile === 'superadmin' ">
    <q-table
      flat
      bordered
      square
      hide-bottom
      style="border-radius: 8px"
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('planos.title')"
      :rows="planos"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]">
      <template v-slot:top-right>
        <q-btn color="primary"
          style="margin: 5px"
          :label="$t('planos.buttons.add')"
          @click="planoEdicao = {}; modalPlano = true" />
        <q-btn
          style="margin: 5px"
          color="primary"
          :label="$t('planos.buttons.tokenAsaas')"
          @click="openAsaasModal"
        />
        <q-btn
          style="margin: 5px"
          color="negative"
          :label="$t('planos.buttons.viewToken')"
          :disable="true"
        >
          <q-tooltip anchor="bottom middle" self="top middle">
            <p class='blur-effect'>{{ showToken }}</p>
          </q-tooltip>
        </q-btn>
      </template>
      <template v-slot:body-cell-trial="props">
        <q-td :props="props">
          {{ props.row.trial === 'enabled' ? $t('planos.status.enabled') : $t('planos.status.disabled') }}
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarPlano(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarPlano(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalPlano v-model:modalPlano="modalPlano"
      v-model:planoEdicao="planoEdicao"
      @modal-plano:criada="planoCriada"
      @modal-plano:editada="planoEditada" />
    <q-dialog v-model="isAsaasModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('planos.buttons.tokenAsaas') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input class='blur-effect' v-model="asaasToken" :label="$t('planos.buttons.tokenAsaas')" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="negative" @click="closeAsaasModal" />
          <q-btn flat :label="$t('common.save')" color="primary" @click="saveAsaasToken" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { DeletarPlano, ListarPlanos } from 'src/service/planos.js'
import { ListarTenants, AlterarTenantAsaasToken } from 'src/service/tenants.js'
import { MostrarCores } from 'src/service/empresas.js';
import ModalPlano from './ModalPlano.vue'
export default {
  name: 'Planos',
  components: {
    ModalPlano
  },
  data () {
    return {
      isAsaasModalOpen: false,
      asaasToken: '',
      showToken: '',
      colors: {},
      userProfile: 'user',
      planoEdicao: {},
      modalPlano: false,
      planos: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: this.$t('planos.columns.id'), field: 'id', align: 'left' },
        { name: 'name', label: this.$t('planos.columns.name'), field: 'name', align: 'left' },
        { name: 'value', label: this.$t('planos.columns.value'), field: 'value', align: 'left', format: val => ('R$ ' + val) },
        { name: 'connections', label: this.$t('planos.columns.connections'), field: 'connections', align: 'center' },
        { name: 'users', label: this.$t('planos.columns.users'), field: 'users', align: 'center' },
        { name: 'trial', label: this.$t('planos.columns.trial'), field: 'trial', align: 'center' },
        { name: 'trialPeriod', label: this.$t('planos.columns.trialPeriod'), field: 'trialPeriod', align: 'center' },
        { name: 'acoes', label: this.$t('planos.columns.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  methods: {
    async listarTenants () {
      const { data } = await ListarTenants()
      this.tenants = data
      this.showToken = this.tenants[0].asaasToken
      this.asaasToken = this.tenants[0].asaasToken
    },
    openAsaasModal() {
      this.isAsaasModalOpen = true;
    },
    closeAsaasModal() {
      this.isAsaasModalOpen = false;
    },
    async saveAsaasToken() {
      try {
        await AlterarTenantAsaasToken({ token: this.asaasToken });
        this.$q.notify({ type: 'positive', message: this.$t('planos.messages.tokenUpdated') });
        this.closeAsaasModal();
        this.listarTenants()
      } catch (error) {
        this.$q.notify({ type: 'negative', message: this.$t('planos.messages.tokenUpdateError') });
      }
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const rawLabel =
              (typeof colorObj.label === 'string' && colorObj.label) ||
              (typeof colorObj.name === 'string' && colorObj.name) ||
              (typeof colorObj.key === 'string' && colorObj.key) ||
              ''

            if (!rawLabel) return acc
            const key = rawLabel.toLowerCase().trim()
            const value =
              colorObj.value ??
              (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
              colorObj.hex ??
              colorObj.color ??
              null

            if (typeof value === 'string' && value) {
              acc[key] = value
            }
            return acc
          }, {})

          

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
    async listarPlanos () {
      const { data } = await ListarPlanos()
      this.planos = data.plan
    },
    planoCriada (plano) {
      const newPlanos = [...this.planos]
      newPlanos.push(plano)
      this.planos = [...newPlanos]
    },
    planoEditada (plano) {
      const newPlanos = [...this.planos]
      const idx = newPlanos.findIndex(f => f.id === plano.id)
      if (idx > -1) {
        newPlanos[idx] = plano
      }
      this.planos = [...newPlanos]
    },
    editarPlano (plano) {
      this.planoEdicao = { ...plano }
      this.modalPlano = true
    },
    deletarPlano (plano) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('planos.messages.deleteConfirmation', { id: plano.id }),
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
        DeletarPlano(plano)
          .then(res => {
            let newPlanos = [...this.planos]
            newPlanos = newPlanos.filter(f => f.id !== plano.id)

            this.planos = [...newPlanos]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('planos.messages.deleteSuccess', { id: plano.id }),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
        this.loading = false
      })
    }

  },
  mounted () {
    this.listarTenants()
    this.listarPlanos()
    this.userProfile = localStorage.getItem('profile')
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : [])
      } catch (_) { list = [] }

      const colors = list.reduce((acc, colorObj = {}) => {
        const rawLabel =
          (typeof colorObj.label === 'string' && colorObj.label) ||
          (typeof colorObj.name === 'string' && colorObj.name) ||
          (typeof colorObj.key === 'string' && colorObj.key) ||
          ''

        if (!rawLabel) return acc
        const key = rawLabel.toLowerCase().trim()
        const value =
          colorObj.value ??
          (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
          colorObj.hex ??
          colorObj.color ??
          null

        if (typeof value === 'string' && value) acc[key] = value
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

<style scoped lang="scss">
.my-sticky-dynamic {
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  overflow: hidden;

  .q-table__top,
  .q-table__bottom,
  .q-table__title {
    background: transparent;
    border: none;
  }

  thead tr {
    background: rgba(var(--q-primary-rgb), 0.08);
    font-weight: 600;
  }

  tbody tr {
    transition: background 0.2s;
    &:hover {
      background: rgba(var(--q-primary-rgb), 0.07);
    }
  }

  .q-btn {
    border-radius: 8px;
    min-width: 32px;
    min-height: 32px;
    padding: 0.2rem 0.7rem;
    font-size: 0.9rem;
    transition: box-shadow 0.2s, background 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    &:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.13);
      background: rgba(var(--q-primary-rgb), 0.08);
    }
  }
}

.q-card {
  border-radius: 16px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
  margin-bottom: 1.5rem;
}

body.body--dark {
  .my-sticky-dynamic,
  .q-card {
    background: rgba(30,30,30,0.92);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .q-table thead tr {
    background: rgba(var(--q-primary-rgb), 0.18);
  }
}
.blur-effect {
  filter: blur(0px)
}
</style>
