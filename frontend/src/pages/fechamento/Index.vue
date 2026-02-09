<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-table
      style="border-radius: 16px !important;"
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic modern-table q-ma-lg"
      :title="$t('fechamento.title')"
      :rows="despedidas"
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
          @click="despedidaEdicao = {}; modalDespedida = true"
          style="margin-bottom: 15px;margin-right: 5px;"
        />
        <q-btn
          color="negative"
          :label="$t('fechamento.deleteAllButton')"
          @click="deletarTodosDespedida"
          style="margin-bottom: 15px;margin-left: 5px;"
        />
      </template>
      <template v-slot:top-left>
        <q-input
          :class="{ 'order-last q-mt-md': $q.screen.width < 500 }"
          style="width: 300px"
          filled
          dense
          debounce="500"
          v-model="filter"
          clearable
          :placeholder="$t('fechamento.searchPlaceholder')"
          @update:model-value="filtrarDespedidas"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
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
            @click="editarDespedida(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarDespedida(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalDespedida
      v-model:modalDespedida="modalDespedida"
      v-model:despedidaEdicao="despedidaEdicao"
      @modal-despedida:criada="despedidaCriada"
      @modal-despedida:editada="despedidaEditada"
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
import { DeletarDespedidaPrivada, ListarDespedidasPrivada, DeletarTodasDespedidaPrivada } from 'src/service/despedidaprivada.js'
import ModalDespedida from './ModalDespedida.vue'
import { ListarUsuarios } from 'src/service/user.js'
import { MostrarCores } from 'src/service/empresas.js';

export default {
  name: 'Despedidas',
  components: {
    ModalDespedida
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      params: {
        searchParam: null,
      },
      userProfile: 'user',
      filter: null,
      despedidaEdicao: {},
      usuarios: [],
      grupos: [],
      modalDespedida: false,
      despedidas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'name', label: this.$t('fechamento.nameLabel'), field: 'name', align: 'left' },
        { name: 'message', label: this.$t('fechamento.messageLabel'), field: 'message', align: 'left' },
        { name: 'userId', label: this.$t('fechamento.userLabel'), field: 'userId', align: 'center', format: (val) => this.formatUser(val) },
        { name: 'createdAt', label: this.$t('fechamento.dateLabel'), field: 'createdAt', align: 'center', format: (val) => this.formatDate(val) },
        { name: 'acoes', label: this.$t('fechamento.actionsLabel'), field: 'acoes', align: 'center' },
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
    async listarUsuarios(){
      const data = await ListarUsuarios()
      this.usuarios = data.data.users
    },
    formatUser(userId) {
      const user = this.usuarios.find(user => user.id === userId);
      return user ? user.name : this.$t('fechamento.system');
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const day = date.getDate()?.toString().padStart(2, '0');
      const month = (date.getMonth() + 1)?.toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    filtrarDespedidas (data) {
      this.despedidas = []
      this.params.searchParam = data
      this.loading = true
      this.listarDespedidasFiltro()
      this.loading = false
    },
    async listarDespedidasFiltro () {
      this.loading = true
      const response = await ListarDespedidasPrivada();
      const despedidas = response.data;
      try {
        const searchTerm = this.params.searchParam.toLowerCase();
        const despedidasFiltradas = despedidas.filter(despedida => {
          const despedidaString = JSON.stringify(despedida).toLowerCase();
          return despedidaString.includes(searchTerm);
        });
        this.LOAD_DESPEDIDAS(despedidasFiltradas);
      } catch(e){
        this.despedidas = response.data.farewellPrivateMessage
      }
      this.loading = false
    },
    LOAD_DESPEDIDAS(despedidasFiltradas) {
      this.despedidas = despedidasFiltradas;
    },
    async listarDespedidas () {
      const { data } = await ListarDespedidasPrivada()
      this.despedidas = data.farewellPrivateMessage
    },
    despedidaCriada (despedida) {
      const newDespedidas = [...this.despedidas]
      newDespedidas.push(despedida)
      this.despedidas = [...newDespedidas]
    },
    despedidaEditada (despedida) {
      const newDespedidas = [...this.despedidas]
      const idx = newDespedidas.findIndex(f => f.id === despedida.id)
      if (idx > -1) {
        newDespedidas[idx] = despedida
      }
      this.despedidas = [...newDespedidas]
    },
    editarDespedida (despedida) {
      this.despedidaEdicao = { ...despedida }
      this.modalDespedida = true
    },
    deletarDespedida (despedida) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('fechamento.deleteConfirmation', { id: despedida.id }),
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
        DeletarDespedidaPrivada(despedida)
          .then(res => {
            let newDespedidas = [...this.despedidas]
            newDespedidas = newDespedidas.filter(f => f.id !== despedida.id)

            this.despedidas = [...newDespedidas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('fechamento.deleteSuccess'),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
        this.loading = false
      })
    },
    deletarTodosDespedida (despedida) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('fechamento.deleteAllConfirmation'),
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
        DeletarTodasDespedidaPrivada()
          .then(res => {
            let newDespedidas = [...this.despedidas]
            newDespedidas = newDespedidas.filter(f => f.id !== despedida.id)
            this.despedidas = [...newDespedidas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('fechamento.deleteAllSuccess'),
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
    this.listarDespedidas()
    this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.fechamento === true;
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
