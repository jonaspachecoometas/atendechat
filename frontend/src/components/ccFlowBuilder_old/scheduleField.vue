<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.ScheduleField') }}
        </div>
        
        <!-- Tipo de Agendamento -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.scheduleType"
            :options="scheduleOptions"
            :label="$t('nodeForm.schedule.scheduleType')"
            outlined
            dense
            emit-value
            map-options
            @update:model-value="onScheduleTypeChange"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.schedule.scheduleTypeHint')"
          />
        </div>
        
        <!-- Data e Hora Personalizada -->
        <div v-if="$attrs.element.data.scheduleType === 'custom'" class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.scheduleDate"
            :label="$t('nodeForm.schedule.scheduleDate')"
            outlined
            dense
            type="datetime-local"
            :rules="[val => !!val || $t('nodeForm.schedule.scheduleDateRequired')]"
            :hint="$t('nodeForm.schedule.scheduleDateHint')"
          />
        </div>
        
        <!-- Upload de Imagem -->
        <div class="q-mb-sm">
          <div class="text-caption q-mb-xs text-weight-medium">
            {{ $t('nodeForm.schedule.uploadImage') }}
          </div>
          
          <!-- Campo de arquivo oculto -->
          <q-file
            style="display: none"
            :loading="loading"
            :label="$t('mediaField.labels.uploadFile')"
            ref="PickerFileMessage"
            v-model="file"
            class="col-grow"
            bg-color="blue-grey-1"
            input-style="max-height: 30vh"
            outlined
            clearable
            autogrow
            append
            :max-files="1"
            counter
            :max-file-size="52428800"
            :max-total-size="52428800"
            accept=".txt, .jpg, .png, image/jpeg, .jpeg, image/*, .pdf, .doc, .docx, .xls, .xlsx, .zip, .ppt, .pptx, .mp4, .mp3, .ogg"
            @rejected="onRejectedFiles"
            @update:model-value="getMediaUrl"
          />
          
          <!-- Botão para selecionar arquivo -->
          <div class="media-button-container">
            <q-btn
              v-if="!$attrs.element.data.media && !$attrs.element.data.mediaUrl"
              icon="mdi-file-plus-outline"
              @click="$refs.PickerFileMessage.pickFiles()"
              round
              flat
              size="sm"
              class="bg-grey-3 z-max q-pa-lg"
              :label="$t('nodeForm.schedule.selectImage')"
              style="position: relative; display: block; margin: 0 auto;"
            />
          </div>
          
          <!-- Preview da imagem -->
          <div v-if="$attrs.element.data.media || $attrs.element.data.mediaUrl" class="q-mt-sm">
            <q-img
              @click="abrirModalImagem = true"
              :src="$attrs.element.data.media || $attrs.element.data.mediaUrl"
              spinner-color="primary"
              height="120px"
              width="100%"
              style="cursor: pointer; border-radius: 8px;"
            />
            
            <!-- Nome do arquivo e botões -->
            <div class="q-mt-sm flex items-center justify-between">
              <div class="text-caption ellipsis" style="max-width: 150px;">
                {{ $attrs.element.data.name || 'Arquivo selecionado' }}
              </div>
              <div class="flex items-center">
                <q-btn
                  flat
                  round
                  size="sm"
                  color="primary"
                  icon="mdi-image-edit-outline"
                  @click="$refs.PickerFileMessage.pickFiles()"
                >
                  <q-tooltip>
                    {{ $t('mediaField.labels.replaceFile') }}
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  size="sm"
                  color="negative"
                  icon="mdi-delete"
                  @click="deleteMedia"
                >
                  <q-tooltip>
                    {{ $t('nodeForm.schedule.deleteImage') }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
          
          <!-- Modal de preview da imagem -->
          <VueEasyLightbox
            v-if="($attrs.element.data.media || $attrs.element.data.mediaUrl) && $attrs.element.data.type && $attrs.element.data.type.indexOf('image') !== -1"
            :visible="abrirModalImagem"
            :imgs="$attrs.element.data.media || $attrs.element.data.mediaUrl"
            :index="1"
            @hide="abrirModalImagem = false"
          />
        </div>
        
        <!-- Mensagem -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.scheduleMessage"
            :label="$t('nodeForm.schedule.message')"
            type="textarea"
            outlined
            dense
            autogrow
            rows="3"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.schedule.messageHint')"
          />
        </div>
        
        <!-- Opções de Envio -->
        <!-- <div class="row q-col-gutter-sm q-mb-sm">
          <div class="col-12 col-md-6">
            <q-toggle
              v-model="$attrs.element.data.sendSignature"
              :label="$t('nodeForm.schedule.sendSignature')"
              color="primary"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-toggle
              v-model="$attrs.element.data.includeContactInfo"
              :label="$t('nodeForm.schedule.includeContactInfo')"
              color="primary"
            />
          </div>
        </div> -->
        
        <!-- Configurações Avançadas -->
        <div class="q-mb-sm">
          <q-expansion-item
            :label="$t('nodeForm.schedule.advancedSettings')"
            icon="mdi-cog"
            header-class="text-primary"
          >
            <div class="q-pa-md">
              <!-- Delay antes do envio -->
              <div class="q-mb-sm">
                <q-input
                  v-model.number="$attrs.element.data.delayBeforeSend"
                  :label="$t('nodeForm.schedule.delayBeforeSend')"
                  type="number"
                  min="0"
                  max="1440"
                  outlined
                  dense
                  :hint="$t('nodeForm.schedule.delayBeforeSendHint')"
                />
              </div>
            </div>
          </q-expansion-item>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  name: 'ScheduleField',
  components: { VueEasyLightbox },
  data () {
    return {
      scheduleOptions: [
        { label: this.$t('nodeForm.schedule.customSchedule'), value: 'custom' },
        { label: this.$t('nodeForm.schedule.thirtyMinutes'), value: '30_mins' },
        { label: this.$t('nodeForm.schedule.oneHour'), value: '1_hour' },
        { label: this.$t('nodeForm.schedule.tomorrow'), value: 'tomorrow' },
        { label: this.$t('nodeForm.schedule.nextWeek'), value: 'next_week' },
        { label: this.$t('nodeForm.schedule.nextMonth'), value: 'next_month' }
      ],
      file: [],
      abrirModalImagem: false,
      loading: false
    }
  },
  methods: {
    onScheduleTypeChange(value) {
      if (value !== 'custom') {
        // Calcular data baseada no tipo selecionado
        const now = new Date()
        let targetDate = new Date()
        
        switch (value) {
          case '30_mins':
            targetDate.setMinutes(now.getMinutes() + 30)
            break
          case '1_hour':
            targetDate.setHours(now.getHours() + 1)
            break
          case 'tomorrow':
            targetDate.setDate(now.getDate() + 1)
            targetDate.setHours(9, 0, 0, 0) // 9:00 AM
            break
          case 'next_week':
            targetDate.setDate(now.getDate() + 7)
            targetDate.setHours(9, 0, 0, 0) // 9:00 AM
            break
          case 'next_month':
            targetDate.setMonth(now.getMonth() + 1)
            targetDate.setHours(9, 0, 0, 0) // 9:00 AM
            break
        }
        
        this.$attrs.element.data.scheduleDate = targetDate.toISOString().slice(0, 16)
      }
    },
    
    async getMediaUrl () {
      if (this.file && this.file.type && this.file.name) {
        try {
          // Salvar referência do arquivo antes de processar
          const currentFile = this.file
          
          // Converter arquivo para base64
          const base64Data = await this.getBase64(currentFile)
          
          // Atualizar todos os dados de mídia de uma vez
          this.$attrs.element.data.mediaUrl = base64Data
          this.$attrs.element.data.media = base64Data
          this.$attrs.element.data.ext = this.getFileExtension(currentFile.name)
          this.$attrs.element.data.type = currentFile.type
          this.$attrs.element.data.name = currentFile.name
          
          // Limpar o arquivo para permitir nova seleção (após processar)
          this.file = null
        } catch (error) {
          console.error('Erro ao processar arquivo:', error)
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao processar o arquivo selecionado',
            position: 'top'
          })
          // Limpar arquivo em caso de erro também
          this.file = null
        }
      }
    },
    
    deleteMedia() {
      // Limpar todos os dados de mídia
      this.$attrs.element.data.mediaUrl = ''
      this.$attrs.element.data.media = ''
      this.$attrs.element.data.type = ''
      this.$attrs.element.data.name = ''
      this.$attrs.element.data.ext = ''
      
      // Limpar variáveis locais
      this.file = null
      this.abrirModalImagem = false
    },
    
    getFileExtension (name) {
      if (!name) return ''
      const split = name.split('.')
      const ext = split[split.length - 1]
      return ext
    },
    
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    
    onRejectedFiles (rejectedEntries) {
      this.$q.notify({
        html: true,
        message: `${this.$t('inputMensagemAgendamento.error')} <br>
        <ul>
          <li>${this.$t('inputMensagemAgendamento.checkFiles')} </li>
        </ul>`,
        type: 'negative',
        progress: true,
        position: 'top',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
    },
    
    initializeData() {
      // Inicializar dados padrão se não existirem
      if (this.$attrs.element.data.scheduleType === undefined) {
        this.$attrs.element.data.scheduleType = 'custom'
      }
      if (this.$attrs.element.data.scheduleDate === undefined) {
        // Data atual + 1 hora como padrão
        const now = new Date()
        now.setHours(now.getHours() + 1)
        this.$attrs.element.data.scheduleDate = now.toISOString().slice(0, 16)
      }
      if (this.$attrs.element.data.scheduleMessage === undefined) {
        this.$attrs.element.data.scheduleMessage = ''
      }
      if (this.$attrs.element.data.sendSignature === undefined) {
        this.$attrs.element.data.sendSignature = true
      }
      if (this.$attrs.element.data.includeContactInfo === undefined) {
        this.$attrs.element.data.includeContactInfo = false
      }
      if (this.$attrs.element.data.delayBeforeSend === undefined) {
        this.$attrs.element.data.delayBeforeSend = 0
      }
      
      // Inicializar dados de mídia
      if (this.$attrs.element.data.mediaUrl === undefined) {
        this.$attrs.element.data.mediaUrl = ''
      }
      if (this.$attrs.element.data.media === undefined) {
        this.$attrs.element.data.media = ''
      }
      if (this.$attrs.element.data.type === undefined) {
        this.$attrs.element.data.type = ''
      }
      if (this.$attrs.element.data.name === undefined) {
        this.$attrs.element.data.name = ''
      }
      if (this.$attrs.element.data.ext === undefined) {
        this.$attrs.element.data.ext = ''
      }
    }
  },
  watch: {
    file: {
      handler(newFile, oldFile) {
        // Só processar se realmente há um arquivo novo e válido
        if (newFile && newFile.type && newFile.name && newFile !== oldFile) {
          this.getMediaUrl()
        }
      },
      immediate: false
    }
  },
  mounted() {
    this.initializeData()
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.text-subtitle2 {
  color: #2c3e50;
  font-weight: 600;
}

.q-input, .q-select {
  .q-field__control {
    background: rgba(255, 255, 255, 0.7);
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
    
    &:focus-within {
      background: #fff;
    }
  }
}

.q-toggle {
  .q-toggle__inner {
    color: var(--q-primary);
  }
}

.q-expansion-item {
  .q-expansion-item__content {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }
}

// Estilos para os botões de mídia
.q-btn {
  transition: none !important;
  
  &:hover {
    transform: none !important;
    position: relative !important;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
  }
}

// Container dos botões de mídia
.media-button-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}

body.body--dark {
  .text-subtitle2 {
    color: #fff;
  }
  
  .q-input, .q-select {
    .q-field__control {
      background: rgba(40, 40, 40, 0.85);
      color: #fff;
      
      &:hover {
        background: rgba(40, 40, 40, 0.95);
      }
      
      &:focus-within {
        background: #222;
      }
    }
  }
  
  .q-expansion-item {
    .q-expansion-item__content {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
