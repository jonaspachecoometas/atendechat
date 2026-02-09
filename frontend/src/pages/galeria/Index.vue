<template>
  <div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg modern-table"
      :title="$t('galeria.title')"
      :rows="galerias"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input
          v-model="searchParam"
          :placeholder="$t('galeria.search')"
          dense
          outlined
          class="q-mr-md"
          style="min-width: 200px"
          @keyup.enter="buscarGaleria"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select
          v-model="fileTypeFilter"
          :options="fileTypeOptions"
          :label="$t('galeria.filterByType')"
          dense
          outlined
          clearable
          class="q-mr-md"
          style="min-width: 150px"
          @update:model-value="buscarGaleria"
        />
        <q-btn
          color="primary"
          :label="$t('galeria.upload')"
          icon="mdi-upload"
          @click="abrirModalUpload"
        />
      </template>
      <template v-slot:body-cell-fileType="props">
        <q-td :props="props">
          <q-chip
            :color="getFileTypeColor(props.value)"
            text-color="white"
            size="sm"
          >
            {{ getFileTypeLabel(props.value) }}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-fileSize="props">
        <q-td :props="props">
          {{ formatFileSize(props.value) }}
        </q-td>
      </template>
      <template v-slot:body-cell-mediaUrl="props">
        <q-td :props="props">
          <div v-if="props.row.mediaUrl" class="row items-center q-gutter-sm">
            <q-btn
              v-if="props.row.fileType === 'image'"
              flat
              dense
              round
              icon="mdi-image"
              color="primary"
              @click="visualizarImagem(props.row.mediaUrl)"
            >
              <q-tooltip>{{ $t('galeria.preview') }}</q-tooltip>
            </q-btn>
            <q-btn
              flat
              dense
              round
              icon="mdi-download"
              color="primary"
              :href="props.row.mediaUrl"
              target="_blank"
              download
            >
              <q-tooltip>{{ $t('galeria.download') }}</q-tooltip>
            </q-btn>
            <span class="text-caption text-grey-7">{{ $t('galeria.viewFile') }}</span>
          </div>
          <span v-else class="text-grey-7">-</span>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            v-if="podeDeletar"
            flat
            round
            icon="mdi-delete"
            color="negative"
            @click="deletarArquivo(props.row)"
          >
            <q-tooltip>{{ $t('galeria.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Modal de Upload -->
    <q-dialog v-model="modalUpload" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ $t('galeria.uploadFiles') }}</div>
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="filesToUpload"
            multiple
            :label="$t('galeria.selectFiles')"
            outlined
            :max-file-size="2147483648"
            :max-total-size="21474836480"
            accept=".mkv,.ofx,.cdr,.key,.ai,.eps,.csv,.rar,.kml,.psd,.txt,.xml,.jpg,.png,.pdf,.doc,.docx,.mp4,.xls,.xlsx,.jpeg,.zip,.ppt,.ogg,.mp3,.pptx,.mpeg,.pfx,.p2k,image/*"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-attachment" />
            </template>
          </q-file>
          <q-input
            v-model="description"
            :label="$t('galeria.description')"
            type="textarea"
            outlined
            class="q-mt-md"
            rows="3"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('common.cancel')"
            color="negative"
            @click="fecharModalUpload"
          />
          <q-btn
            flat
            :label="$t('common.send')"
            color="primary"
            @click="enviarArquivos"
            :loading="uploading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Visualização de Imagem -->
    <q-dialog v-model="modalImagem" maximized>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('galeria.imagePreview') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-img
            :src="imagemPreview"
            style="max-height: 90vh"
            fit="contain"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ListarGaleria, CriarGaleria, DeletarGaleria } from 'src/service/galeria.js'
import { MostrarCores } from 'src/service/empresas.js'

export default {
  name: 'Galeria',
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      loading: false,
      uploading: false,
      galerias: [],
      searchParam: '',
      fileTypeFilter: null,
      modalUpload: false,
      modalImagem: false,
      imagemPreview: '',
      filesToUpload: [],
      description: '',
      pagination: {
        rowsPerPage: 20,
        rowsNumber: 0,
        lastIndex: 0,
        page: 1
      },
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'originalName', label: this.$t('galeria.fileName'), field: 'originalName', align: 'left' },
        { name: 'fileType', label: this.$t('galeria.type'), field: 'fileType', align: 'center' },
        { name: 'fileSize', label: this.$t('galeria.size'), field: 'fileSize', align: 'center' },
        { name: 'description', label: this.$t('galeria.description'), field: 'description', align: 'left' },
        { name: 'mediaUrl', label: this.$t('galeria.actions'), field: 'mediaUrl', align: 'center' },
        { name: 'acoes', label: this.$t('common.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    podeDeletar () {
      return ['admin', 'super'].includes(this.userProfile)
    },
    fileTypeOptions () {
      return [
        { label: this.$t('galeria.types.image'), value: 'image' },
        { label: this.$t('galeria.types.pdf'), value: 'pdf' },
        { label: this.$t('galeria.types.video'), value: 'video' },
        { label: this.$t('galeria.types.audio'), value: 'audio' },
        { label: this.$t('galeria.types.document'), value: 'document' },
        { label: this.$t('galeria.types.archive'), value: 'archive' },
        { label: this.$t('galeria.types.other'), value: 'other' }
      ]
    }
  },
  methods: {
    async loadColors () {
      try {
        const response = await MostrarCores()
        if (response.status === 200) {
          const companyData = response.data[0]
          const colorsArray = companyData.systemColors

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim()
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null
            if (key && typeof val === 'string') acc[key] = val
            return acc
          }, {})

          const root = document.documentElement
          root.style.setProperty('--q-neutral', this.colors.neutral)
          root.style.setProperty('--q-primary', this.colors.primary)
          root.style.setProperty('--q-secondary', this.colors.secondary)
          root.style.setProperty('--q-accent', this.colors.accent)
          root.style.setProperty('--q-warning', this.colors.warning)
          root.style.setProperty('--q-negative', this.colors.negative)
          root.style.setProperty('--q-positive', this.colors.positive)
          root.style.setProperty('--q-light', this.colors.light)
        } else {
          console.error('Erro ao carregar as cores')
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error)
      }
    },
    async buscarGaleria () {
      this.loading = true
      try {
        const params = {
          pageNumber: this.pagination.page || 1,
          searchParam: this.searchParam || undefined,
          fileType: this.fileTypeFilter?.value || undefined
        }
        const { data } = await ListarGaleria(params)
        this.galerias = data.galleries || []
        this.pagination.rowsNumber = data.count || 0
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('galeria.loadError')
        })
      } finally {
        this.loading = false
      }
    },
    abrirModalUpload () {
      this.modalUpload = true
      this.filesToUpload = []
      this.description = ''
    },
    fecharModalUpload () {
      this.modalUpload = false
      this.filesToUpload = []
      this.description = ''
    },
    async enviarArquivos () {
      if (!this.filesToUpload || this.filesToUpload.length === 0) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('galeria.selectFilesFirst')
        })
        return
      }

      this.uploading = true
      try {
        const formData = new FormData()
        
        // Adicionar múltiplos arquivos
        for (const file of this.filesToUpload) {
          formData.append('files', file)
        }
        
        if (this.description) {
          formData.append('description', this.description)
        }

        await CriarGaleria(formData)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('galeria.uploadSuccess')
        })
        
        this.fecharModalUpload()
        await this.buscarGaleria()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('galeria.uploadError')
        })
      } finally {
        this.uploading = false
      }
    },
    async deletarArquivo (arquivo) {
      this.$q.dialog({
        title: this.$t('common.confirm'),
        message: this.$t('galeria.deleteConfirm', { fileName: arquivo.originalName }),
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
          await DeletarGaleria(arquivo.id)
          this.$q.notify({
            type: 'positive',
            message: this.$t('galeria.deleteSuccess')
          })
          await this.buscarGaleria()
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('galeria.deleteError')
          })
        }
      })
    },
    visualizarImagem (url) {
      this.imagemPreview = url
      this.modalImagem = true
    },
    getFileTypeColor (type) {
      const colors = {
        image: 'blue',
        pdf: 'red',
        video: 'purple',
        audio: 'orange',
        document: 'green',
        archive: 'grey',
        other: 'grey-7'
      }
      return colors[type] || 'grey-7'
    },
    getFileTypeLabel (type) {
      const labels = {
        image: this.$t('galeria.types.image'),
        pdf: this.$t('galeria.types.pdf'),
        video: this.$t('galeria.types.video'),
        audio: this.$t('galeria.types.audio'),
        document: this.$t('galeria.types.document'),
        archive: this.$t('galeria.types.archive'),
        other: this.$t('galeria.types.other')
      }
      return labels[type] || type
    },
    formatFileSize (bytes) {
      if (!bytes) return '-'
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
      if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
    }
  },
  async mounted () {
    this.userProfile = localStorage.getItem('profile') || 'user'
    await this.loadColors()
    await this.buscarGaleria()
  }
}
</script>

<style scoped>
.modern-table {
  border-radius: 8px;
}
</style>

