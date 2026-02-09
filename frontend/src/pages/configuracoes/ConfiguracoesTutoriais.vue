<template>
  <div v-if="userProfile === 'superadmin'">
    <q-table flat
      bordered
      square
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('configuracaoTutoriais.title')"
      :rows="tutoriais"
      :columns="filteredColumns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[10]"
      @request="onRequestTutoriais">
      <template v-slot:top-right>
        <q-btn color="primary"
          :label="$t('common.add')"
          @click="adicionarTutorial" />
        <q-btn-dropdown color="grey-8" icon="settings" class="q-ml-md">
          <q-list>
            <q-item v-for="col in columns" :key="col.name" v-if="!fixedColumns.includes(col.name)">
              <q-item-section>
                <q-checkbox v-model="visibleColumns[col.name]" :label="col.label" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
      <template v-slot:body-cell-thumbnail="props">
        <q-td class="text-center">
          <q-img
            v-if="props.row.thumbnailUrl"
            :src="props.row.thumbnailUrl"
            style="width: 50px; height: 50px"
            :ratio="1"
          />
          <q-icon v-else name="image" size="24px" color="grey" />
        </q-td>
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon
            :name="props.value ? 'check_circle' : 'cancel'"
            :color="props.value ? 'positive' : 'negative'"
            size="24px"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarTutorial(props.row)" >
            <q-tooltip>{{ $t('common.edit') }}</q-tooltip>
          </q-btn>
          <q-btn flat
            round
            icon="mdi-content-copy"
            @click="duplicarTutorial(props.row)" >
            <q-tooltip>{{ $t('common.duplicate') }}</q-tooltip>
          </q-btn>
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarTutorial(props.row)" >
            <q-tooltip>{{ $t('common.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <!-- Modal de Tutorial Funcional -->
    <q-dialog v-model="modalTutorial" persistent>
      <q-card style="width: 500px" class="q-pa-lg">
        <q-card-section>
          <div class="text-h6">
            {{ tutorialEdicao && tutorialEdicao.id ? $t('configuracaoTutoriais.edit') : $t('configuracaoTutoriais.create') }}
          </div>
        </q-card-section>
        
        <q-card-section>
          <q-input
            v-model="tutorialForm.title"
            :label="$t('configuracaoTutoriais.title')"
            outlined
            dense
          />
        </q-card-section>
        
        <q-card-section>
          <q-input
            v-model="tutorialForm.description"
            :label="$t('configuracaoTutoriais.description')"
            type="textarea"
            outlined
            dense
          />
        </q-card-section>
        
        <q-card-section>
          <q-input
            v-model="tutorialForm.link"
            :label="$t('configuracaoTutoriais.link')"
            outlined
            dense
          />
        </q-card-section>
        
        <q-card-section>
          <q-toggle
            v-model="tutorialForm.isActive"
            :label="$t('configuracaoTutoriais.isActive')"
            color="primary"
          />
        </q-card-section>
        
        <q-card-section>
          <q-file
            v-model="tutorialThumbnail"
            :label="$t('configuracaoTutoriais.thumbnail')"
            outlined
            dense
            accept="image/*"
            @update:model-value="handleThumbnailChange"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-img
            v-if="tutorialThumbnail || tutorialForm.thumbnailUrl"
            :src="thumbnailPreviewUrl"
            style="max-width: 200px; margin-top: 10px"
          />
        </q-card-section>
        
        <q-card-actions align="right" class="q-mt-md">
          <q-btn
            flat
            :label="$t('common.cancel')"
            color="negative"
            @click="fecharModalTutorial"
            class="q-mr-md"
          />
          <q-btn
            flat
            :label="$t('common.save')"
            color="primary"
            @click="handleTutorialSubmit"
            :loading="loadingTutorial"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { DeletarTutorial, ListarTutoriais, CriarTutorial, AtualizarTutorial } from 'src/service/tutorials.js'

export default {
  name: 'Tutoriais',
  data () {
    return {
      userProfile: 'user',
      tutorialEdicao: {},
      modalTutorial: false,
      tutorialForm: {
        id: null,
        title: '',
        description: '',
        link: '',
        thumbnailUrl: '',
        isActive: false
      },
      tutorialThumbnail: null,
      loadingTutorial: false,
      tutoriais: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        lastIndex: 0
      },
      hasMore: true,
      loading: false,
      fixedColumns: ['title', 'link', 'isActive', 'acoes', 'thumbnail'],
      visibleColumns: {
        id: false,
        description: true
      },
      columns: [
        { name: 'id', label: this.$t('configuracaoTutoriais.columns.id'), field: 'id', align: 'left' },
        { name: 'title', label: this.$t('configuracaoTutoriais.columns.title'), field: 'title', align: 'left' },
        { name: 'description', label: this.$t('configuracaoTutoriais.columns.description'), field: 'description', align: 'left' },
        { name: 'link', label: this.$t('configuracaoTutoriais.columns.link'), field: 'link', align: 'left' },
        { name: 'isActive', label: this.$t('configuracaoTutoriais.columns.isActive'), field: 'isActive', align: 'center' },
        { name: 'thumbnail', label: this.$t('configuracaoTutoriais.columns.thumbnail'), field: 'thumbnailUrl', align: 'center' },
        { name: 'acoes', label: this.$t('configuracaoTutoriais.columns.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    filteredColumns() {
      return this.columns.filter(col =>
        this.fixedColumns.includes(col.name) || this.visibleColumns[col.name]
      );
    },
    thumbnailPreviewUrl() {
      if (this.tutorialThumbnail) {
        return URL.createObjectURL(this.tutorialThumbnail);
      }
      return this.tutorialForm.thumbnailUrl || '';
    }
  },
  methods: {
    async listarTutoriais (props = { pagination: this.pagination }) {
      try {
        this.loading = true;
        const pageNumber = props.pagination.page || 1;
        const pageSize = props.pagination.rowsPerPage || 10;
        const { data } = await ListarTutoriais({ pageNumber, pageSize });
        this.tutoriais = Array.isArray(data.tutorials) ? data.tutorials : [];
        this.pagination = {
          ...this.pagination,
          page: pageNumber,
          rowsPerPage: pageSize,
          rowsNumber: data.count || this.tutoriais.length
        };
        this.hasMore = data.hasMore;
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao listar tutoriais:', error);
        }
        this.tutoriais = [];
      } finally {
        this.loading = false;
      }
    },
    tutorialCriada (tutorial) {
      const newTutoriais = [...this.tutoriais]
      newTutoriais.push(tutorial)
      this.tutoriais = [...newTutoriais]
    },
    tutorialEditada (tutorial) {
      const newTutoriais = [...this.tutoriais]
      const idx = newTutoriais.findIndex(f => f.id === tutorial.id)
      if (idx > -1) {
        newTutoriais[idx] = tutorial
      }
      this.tutoriais = [...newTutoriais]
    },
    adicionarTutorial () {
      this.tutorialForm = {
        id: null,
        title: '',
        description: '',
        link: '',
        thumbnailUrl: '',
        isActive: false
      }
      this.tutorialThumbnail = null
      this.tutorialEdicao = {}
      this.modalTutorial = true
    },
    editarTutorial (tutorial) {
      this.tutorialForm = { ...tutorial }
      this.tutorialEdicao = { ...tutorial }
      this.modalTutorial = true
    },
    fecharModalTutorial () {
      this.tutorialForm = {
        id: null,
        title: '',
        description: '',
        link: '',
        thumbnailUrl: '',
        isActive: false
      }
      this.tutorialThumbnail = null
      this.tutorialEdicao = {}
      this.modalTutorial = false
    },
    handleThumbnailChange (file) {
      if (file) {
        this.tutorialThumbnail = file;
        this.tutorialForm.thumbnail = file;
      }
    },
    async handleTutorialSubmit () {
      try {
        this.loadingTutorial = true
        const formData = new FormData()
        formData.append('title', this.tutorialForm.title)
        formData.append('description', this.tutorialForm.description)
        formData.append('link', this.tutorialForm.link)
        formData.append('isActive', this.tutorialForm.isActive)
        if (this.tutorialThumbnail) {
          formData.append('thumbnail', this.tutorialThumbnail)
        }

        if (this.tutorialForm.id) {
          const { data } = await AtualizarTutorial(this.tutorialForm.id, formData)
          this.tutorialEditada(data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('common.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarTutorial(formData)
          this.tutorialCriada(data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('configuracaoTutoriais.notifications.created'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loadingTutorial = false
        this.fecharModalTutorial()
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error(error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
        this.loadingTutorial = false
      }
    },
    deletarTutorial (tutorial) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('configuracaoTutoriais.deleteConfirmation', { tutorial: tutorial.title }),
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
        DeletarTutorial(tutorial.id)
          .then(() => {
            this.tutoriais = this.tutoriais.filter(f => f.id !== tutorial.id)
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('configuracaoTutoriais.tutorialDeleted', { tutorial: tutorial.title }),
              actions: [{ icon: 'close', round: true, color: 'white' }]
            })
          })
          .catch(() => {
            this.$q.notify({
              type: 'negative',
              progress: true,
              position: 'top',
              message: this.$t('configuracaoTutoriais.notifications.errorDelete')
            })
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    async duplicarTutorial (tutorial) {
      try {
        const formData = new FormData();
        formData.append('title', tutorial.title + ' (Cópia)');
        formData.append('description', tutorial.description);
        formData.append('link', tutorial.link);
        formData.append('isActive', tutorial.isActive);
        if (tutorial.thumbnail) {
          formData.append('thumbnail', tutorial.thumbnail);
        }
        const { data } = await CriarTutorial(formData);
        this.tutoriais.push(data);
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoTutoriais.notifications.duplicated') || 'Tutorial duplicado com sucesso!'
        });
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoTutoriais.notifications.errorDuplicate') || 'Erro ao duplicar tutorial.'
          });
        }
      }
    },
    onRequestTutoriais (props) {
      this.listarTutoriais(props)
    }
  },
  mounted () {
    this.listarTutoriais()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  margin-top: 24px;
  margin-bottom: 24px;
  overflow: hidden;
  overflow-x: auto !important;
}

.q-table__top, .q-table__bottom, .q-table__title {
  background: transparent;
  box-shadow: none;
  border: none;
}

.q-table__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--q-primary);
  padding: 16px 24px 0 24px;
}

.q-table thead tr {
  background: rgba(245, 245, 245, 0.85);
  font-weight: 600;
  font-size: 1rem;
  color: #222;
}

.q-table tbody tr {
  transition: background 0.2s;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
}

.q-table th, .q-table td {
  padding: 14px 18px;
  font-size: 0.98rem;
}

/* Modo Escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .q-table thead tr {
    background: rgba(40, 40, 40, 0.85);
    color: #fff;
  }
  .q-table__title {
    color: var(--q-primary);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .my-sticky-dynamic {
    border-radius: 10px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .q-table th, .q-table td {
    padding: 10px 8px;
    font-size: 0.93rem;
  }
  .q-table__title {
    padding: 10px 10px 0 10px;
    font-size: 1.05rem;
  }
}

/* Scrollbar horizontal customizado */
.my-sticky-dynamic::-webkit-scrollbar {
  height: 8px !important;
  background: var(--q-primary) !important;
  border-radius: 8px !important;
}

.my-sticky-dynamic::-webkit-scrollbar-thumb {
  background: var(--q-primary) !important;
  border-radius: 8px !important;
  opacity: 1 !important;
}

.my-sticky-dynamic::-webkit-scrollbar-thumb:hover {
  background: #1565c0 !important;
}
</style> 
