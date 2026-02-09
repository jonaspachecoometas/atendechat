<template>
  <div>
    <q-table flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('lanes.title')"
      :rows="kanbans"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]">
      <template v-slot:top-right>
        <q-btn color="primary"
          :label="$t('lanes.add')"
          @click="kanbanEdicao = {}; modalKanban = true" />
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'" />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarKanban(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarKanban(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalKanban v-model:modalKanban="modalKanban"
      v-model:kanbanEdicao="kanbanEdicao"
      @modal-kanban:criada="kanbanCriada"
      @modal-kanban:editada="kanbanEditada" />
  </div>
</template>

<script>
import { DeletarKanban, ListarKanbans } from 'src/service/kanban.js'
import { MostrarCores } from 'src/service/empresas.js';
import ModalKanban from './ModalKanban.vue'
export default {
  name: 'Kanbans',
  components: {
    ModalKanban
  },
  data () {
    return {
      colors: {},
      kanbanEdicao: {},
      modalKanban: false,
      kanbans: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: "id", label: this.$t("lanes.columns.id"), field: "id", align: "left" },
        { name: "name", label: this.$t("lanes.columns.name"), field: "name", align: "left" },
        { name: "acoes", label: this.$t("lanes.columns.actions"), field: "acoes", align: "center" },
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
    async listarKanbans () {
      try {
        const { data } = await ListarKanbans();
        data.kanban.sort((a, b) => a.id - b.id);
        this.kanbans = data.kanban;
      } catch (error) {
        console.error(this.$t("lanes.notifications.loadError"), error);
      }
    },
    kanbanCriada (kanban) {
      const newKanbans = [...this.kanbans]
      newKanbans.push(kanban)
      this.kanbans = [...newKanbans]
    },
    kanbanEditada (kanban) {
      const newKanbans = [...this.kanbans]
      const idx = newKanbans.findIndex(f => f.id === kanban.id)
      if (idx > -1) {
        newKanbans[idx] = kanban
      }
      this.kanbans = [...newKanbans]
    },
    editarKanban (kanban) {
      this.kanbanEdicao = { ...kanban }
      this.modalKanban = true
    },
    deletarKanban (kanban) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t("lanes.deleteConfirm", { name: kanban.name }),
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
        DeletarKanban(kanban)
          .then(res => {
            let newKanbans = [...this.kanbans]
            newKanbans = newKanbans.filter(f => f.id !== kanban.id)

            this.kanbans = [...newKanbans]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t("lanes.deleteSuccess", { name: kanban.name }),
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
    this.listarKanbans()
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
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}

.q-table__title {
  font-weight: 700;
  color: var(--q-primary);
}

.q-btn {
  border-radius: 4px;
  min-width: 20px;
  min-height: 20px;
  padding: 0.08rem 0.4rem;
  font-size: 0.78rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}

.q-btn:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.11);
  background: rgba(var(--q-primary-rgb), 0.09);
}

body.body--dark .q-table {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}

@media (max-width: 900px) {
  .q-table {
    border-radius: 12px;
    padding: 0.5rem;
  }
}
</style>
