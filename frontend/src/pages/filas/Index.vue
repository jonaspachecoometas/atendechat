<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super'  && pageAllowed)) ">
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg modern-table"
      :title="$t('filas.title')"
      :rows="filas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          :label="$t('common.add')"
          @click="filaEdicao = {}; modalFila = true"
        />
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
          <q-btn
            flat
            round
            icon="edit"
            @click="editarFila(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarFila(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalFila
      v-model:modalFila="modalFila"
      v-model:filaEdicao="filaEdicao"
      @modal-fila:criada="filaCriada"
      @modal-fila:editada="filaEditada"
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
import { DeletarFila, ListarFilas } from 'src/service/filas.js'
import { MostrarCores } from 'src/service/empresas.js';
import ModalFila from './ModalFila.vue'
export default {
  name: 'Filas',
  components: {
    ModalFila
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      filaEdicao: {},
      modalFila: false,
      filas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'queue', label: this.$t('filas.title'), field: 'queue', align: 'left' },
        { name: 'isActive', label: this.$t('common.active'), field: 'isActive', align: 'center' },
        { name: 'acoes', label: this.$t('common.actions'), field: 'acoes', align: 'center' },
      ],
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
    async listarFilas () {
      const { data } = await ListarFilas()
      this.filas = data
    },
    filaCriada (fila) {
      const newFilas = [...this.filas]
      newFilas.push(fila)
      this.filas = [...newFilas]
    },
    filaEditada (fila) {
      const newFilas = [...this.filas]
      const idx = newFilas.findIndex(f => f.id === fila.id)
      if (idx > -1) {
        newFilas[idx] = fila
      }
      this.filas = [...newFilas]
    },
    editarFila (fila) {
      this.filaEdicao = { ...fila }
      this.modalFila = true
    },
    deletarFila (fila) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('filas.confirmDelete', { name: fila.queue }),
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
        DeletarFila(fila)
          .then(res => {
            let newFilas = [...this.filas]
            newFilas = newFilas.filter(f => f.id !== fila.id)

            this.filas = [...newFilas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('filas.notifications.deleted'),
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
    this.listarFilas()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.filas === true;
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
  border-radius: 12px !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  background: #fff;
  transition: all 0.3s ease;

  :deep(.q-table__title) {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--q-primary);
    padding: 1rem 0;
  }

  :deep(.q-table__top) {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-radius: 12px 12px 0 0;
  }

  :deep(.q-table__bottom) {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-radius: 0 0 12px 12px;
  }

  :deep(.q-table thead tr th) {
    background: #f8f9fa;
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
    background-color: #f8f9fa;
  }

  :deep(.q-table tbody tr:last-child td) {
    border-bottom: none;
  }

  :deep(.q-btn) {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
