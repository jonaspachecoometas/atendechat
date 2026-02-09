<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-table
      style="border-radius: 16px !important;"
      flat
      bordered
      square
      class="my-sticky-dynamic modern-table q-ma-lg"
      :title="$t('etiquetas.title')"
      :rows="etiquetas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          :label="$t('common.add')"
          @click="abrirModalParaCriar"
        />
      </template>
      <template v-slot:body-cell-color="props">
        <q-td class="text-center">
          <div
            class="q-pa-sm rounded-borders"
            :style="`background: ${props.row.color}`"
          >
            {{ props.row.color }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon
            size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat round icon="edit" @click="editarEtiqueta(props.row)" />
          <q-btn flat round icon="mdi-delete" @click="deletarEtiqueta(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalEtiqueta
      v-model:modalEtiqueta="modalEtiqueta"
      v-model:etiquetaEdicao="etiquetaEdicao"
      @modal-etiqueta:criada="etiquetaCriada"
      @modal-etiqueta:editada="etiquetaEditada"
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
import { DeletarEtiqueta, ListarEtiquetas } from 'src/service/etiquetas.js'
import ModalEtiqueta from './ModalEtiqueta.vue'
import { MostrarCores } from 'src/service/empresas.js';
export default {
  name: 'Etiquetas',
  components: {
    ModalEtiqueta
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      etiquetaEdicao: {},
      modalEtiqueta: false,
      etiquetas: [],
      pagination: {
        sortBy: 'tag',
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: this.$t('etiquetas.columns.id'), field: 'id', align: 'left', sortable: true },
        { name: 'tag', label: this.$t('etiquetas.columns.tag'), field: 'tag', align: 'left', sortable: true },
        { name: 'color', label: this.$t('etiquetas.columns.color'), field: 'color', align: 'center' },
        { name: 'isActive', label: this.$t('etiquetas.columns.isActive'), field: 'isActive', align: 'center', sortable: true },
        { name: 'acoes', label: this.$t('etiquetas.columns.actions'), field: 'acoes', align: 'center' },
      ],
    }
  },
  methods: {
    abrirModalParaCriar () {
      this.etiquetaEdicao = {}
      this.modalEtiqueta = true
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
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
    async listarEtiquetas () {
      const { data } = await ListarEtiquetas()
      this.etiquetas = data
    },
    etiquetaCriada (etiqueta) {
      const newEtiquetas = [...this.etiquetas]
      newEtiquetas.push(etiqueta)
      this.etiquetas = [...newEtiquetas]
    },
    etiquetaEditada (etiqueta) {
      const newEtiquetas = [...this.etiquetas]
      const idx = newEtiquetas.findIndex(f => f.id === etiqueta.id)
      if (idx > -1) {
        newEtiquetas[idx] = etiqueta
      }
      this.etiquetas = [...newEtiquetas]
    },
    editarEtiqueta (etiqueta) {
      this.etiquetaEdicao = { ...etiqueta }
      this.modalEtiqueta = true
    },
    deletarEtiqueta (etiqueta) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('etiquetas.dialog.deleteMessage', { tag: etiqueta.tag }),
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
        DeletarEtiqueta(etiqueta)
          .then(res => {
            let newEtiquetas = [...this.etiquetas]
            newEtiquetas = newEtiquetas.filter(f => f.id !== etiqueta.id)

            this.etiquetas = [...newEtiquetas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('etiquetas.notifications.deleted', { tag: etiqueta.tag }),
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
    this.listarEtiquetas()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.etiquetas === true;
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
.modern-table {
  border-radius: 16px !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  overflow: hidden;

  :deep(.q-table__title) {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--q-primary);
    padding: 1rem 0;
  }

  :deep(.q-table__top),
  :deep(.q-table__bottom) {
    background: transparent;
    border: none;
    padding: 1rem 1.5rem;
  }

  :deep(.q-table thead tr th) {
    background: rgba(var(--q-primary-rgb), 0.08);
    font-weight: 600;
    font-size: 0.95rem;
    color: #2c3e50;
    padding: 1rem;
    border-bottom: 2px solid #e9ecef;
  }

  :deep(.q-table tbody tr td) {
    padding: 1rem;
    font-size: 0.95rem;
    color: #495057;
    border-bottom: 1px solid #e9ecef;
    transition: background-color 0.2s ease;
  }

  :deep(.q-table tbody tr:hover td) {
    background-color: rgba(var(--q-primary-rgb), 0.07);
  }

  :deep(.q-table tbody tr:last-child td) {
    border-bottom: none;
  }
}

body.body--dark {
  .modern-table {
    background: rgba(30,30,30,0.92);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .q-table thead tr {
    background: rgba(var(--q-primary-rgb), 0.18);
  }
}
</style>
