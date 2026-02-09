<template>
  <div class="pipeline-list" v-if="(userProfile === 'admin' || pageAllowed)">
    <q-table
      flat
      bordered
      square
      class="my-sticky-dynamic q-ma-lg modern-table"
      :rows="pipelines"
      :columns="columns"
      :title="$t('funil.pipeTitle')"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 50, 100]"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          :label="$t('common.add')"
          @click="abrirEditor()"
        />
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="mdi-pencil"
            @click="abrirEditor(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarPipeline(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <PipelineEditor
      v-if="showEditor"
      :pipeline="pipelineSelecionado"
      v-model:showEditor="showEditor"
      @saved="onPipelineSalvo"
    />
  </div>
</template>

<script>
import { ListarPipelines, DeletarPipeline } from 'src/service/funil.js'
import PipelineEditor from './PipelineEditor.vue'

export default {
  name: 'PipelineList',
  components: { PipelineEditor },
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      pipelines: [],
      showEditor: false,
      pipelineSelecionado: null,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'name', label: this.$t('funil.nome'), field: 'name', align: 'left' },
        { name: 'acoes', label: this.$t('funil.acoes'), field: 'acoes', align: 'center' },
      ],
    }
  },
  created() {
    this.carregarPipelines()
  },
  methods: {
    async carregarPipelines() {
      try {
        const response = await ListarPipelines({
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage
        })
        this.pipelines = response.data.data
        this.pagination.rowsNumber = response.data.pagination.total
      } catch (error) {
        console.error('Erro ao carregar pipelines:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.erroAoCarregar')
        })
      }
    },
    onRequest(props) {
      const { page, rowsPerPage } = props.pagination
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.carregarPipelines()
    },
    abrirEditor(pipeline = null) {
      this.pipelineSelecionado = pipeline
      this.showEditor = true
    },
    fecharEditor() {
      this.showEditor = false
      this.pipelineSelecionado = null
    },
    async deletarPipeline(pipeline) {
      this.$q
        .dialog({
          title: this.$t('funil.atencao'),
          message: this.$t('funil.excluirPipeline'),
          cancel: {
            label: this.$t('funil.nao'),
            color: 'primary',
            push: true,
          },
          ok: {
            label: this.$t('funil.sim'),
            color: 'negative',
            push: true,
          },
          persistent: true,
        })
        .onOk(async () => {
          try {
            await DeletarPipeline(pipeline.id);
            await this.carregarPipelines();
            this.$q.notify({
              type: 'positive',
              message: this.$t('funil.funilDeletado')
            });
          } catch (error) {
            console.error('Erro ao excluir funil:', error.data.error)
            this.$q.notify({
              type: 'negative',
              message: this.$t('funil.erroAoDeletarFunil') + ': ' + error.data.error
            });
          }
        })
        .onCancel(() => {});
    },
    onPipelineSalvo() {
      this.fecharEditor()
      this.carregarPipelines()
    }
  },
  async mounted() {
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed?.colors)
            ? parsed.colors
            : []
      } catch (_) {
        list = []
      }

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

        if (typeof value === 'string' && value) {
          acc[key] = value
        }
        return acc
      }, {})

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.kanban === true;
  }
}
</script>

<style lang="scss" scoped>
.pipeline-list {
  padding: 24px;
}

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
    display: flex;
    justify-content: space-between;
    align-items: center;
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

@media (max-width: 600px) {
  .pipeline-list {
    padding: 16px;
  }
}
</style> 
