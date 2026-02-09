<template>
  <q-dialog
    persistent
    :model-value="modalCampanha"
    @update:model-value="val => $emit('update:modalCampanha', val)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      class="q-pa-sm"
      style="min-width: 70vw;"
    >
      <q-card-section class="q-pa-none q-px-md">
        <div class="text-h6 text-bold">
          {{ campanhaEdicao.id ? $t("modalCampanha.title.edit") : $t("modalCampanha.title.create") }}
        </div>
        <!-- <div class="row">
          As mensagens sempre serão enviadas em horário comercial e dias úteis.
        </div> -->
      </q-card-section>
      <q-card-section class="q-pb-none">
        <div class="row q-gutter-sm">
          <q-input
            class="required"
            outlined
            dense
            style="width: 500px"
            v-model="campanha.name"
            :label="$t('modalCampanha.labels.campaignName')"
            @blur="v$.campanha.name.$touch"
            :error="v$.campanha.name.$error"
            :error-message="$t('modalCampanha.validations.required')"
          />
           <!-- Início da campanha (QDate + QTime, Quasar 2) -->
            <q-input
              v-model="startDisplay"
              :label="$t('campanhas.inicio')"
              outlined
              dense
              style="width: 200px"
              format24h
              readonly
              class="q-mb-md"
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="startPopup" cover transition-show="scale" transition-hide="scale">
                    <div class="q-pa-md">
                      <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                          <q-date v-model="startDate" mask="YYYY-MM-DD" />
                        </div>
                        <div class="col-12 col-md-6">
                          <q-time v-model="startTime" format24h />
                        </div>
                      </div>
                      <div class="q-mt-md text-right">
                        <q-btn flat :label="$t('common.cancel')" @click="$refs.startPopup.hide()" class="q-mr-sm" />
                        <q-btn color="primary" :label="$t('common.ok')" @click="applyStart" />
                      </div>
                    </div>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!-- Fim da campanha (QDate + QTime, Quasar 2) -->
            
          <q-select
            class="required"
            dense
            outlined
            emit-value
            map-options
            :label="$t('modalCampanha.labels.session')"
            color="primary"
            v-model="campanha.sessionId"
            :options="cSessions"
            :input-debounce="700"
            option-value="id"
            option-label="name"
            input-style="width: 280px; max-width: 280px;"
            @blur="v$.campanha.sessionId.$touch"
            :error="v$.campanha.sessionId.$error"
            :error-message="$t('modalCampanha.validations.required')"
            style="width: 250px"
          />
          <q-input
            class="required"
            outlined
            dense
            style="width: 160px"
            v-model="campanha.delay"
            input-class="text-right"
            :suffix="$t('modalCampanha.labels.seconds')"
            :label="$t('modalCampanha.labels.delay')"
            error-message="Obrigatório"
          />
          <q-file
            dense
            v-if="!campanha.mediaUrl"
            :loading="loading"
            :label="$t('modalCampanha.labels.media')"
            ref="PickerFileMessage"
            v-model="arquivos"
            class="col-grow"
            bg-color="blue-grey-1"
            input-style="max-height: 30vh"
            outlined
            clearable
            autogrow
            append
            :max-files="1"
            counter
            :max-file-size="15728640"
            :max-total-size="31457280"
            accept=".mp3, .mp4, .ogg, .jpg, .png, image/jpeg, .pdf, .doc, .docx, .xls, .xlsx, .jpeg, .zip, .ppt, .pptx, image/*"
            @rejected="onRejectedFiles"
            style="width: 350px"
          />
          <q-input
            v-if="campanha.mediaUrl"
            readonly
            :label="$t('modalCampanha.labels.media')"
            :model-value="cArquivoName"
            class=" col-grow "
            bg-color="blue-grey-1"
            input-style="max-height: 30vh"
            outlined
            autogrow
            append
            counter
            style="width: 350px"
          >
            <template v-slot:append>
              <q-btn
                round
                dense
                flat
                icon="close"
                @click="campanha.mediaUrl = null; arquivos = []"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section class="row q-pt-sm q-gutter-sm justify-center">
        <div>
          <div class="row items-center q-pt-none">
            <label class="text-heading text-bold">{{ $t('modalCampanha.labels.firstMessage') }}</label>
            <div class="col-xs-3 col-sm-2 col-md-1">
              <q-btn
                round
                flat
                class="q-ml-sm"
              >
                <q-icon
                  size="2em"
                  name="mdi-emoticon-happy-outline"
                />
                <q-tooltip>
                  {{ $t('modalCampanha.labels.emoji') }}
                </q-tooltip>
                <q-menu
                  anchor="top right"
                  self="bottom middle"
                  :offset="[5, 40]"
                >
                  <VEmojiPicker
                    style="width: 40vw"
                    :showSearch="false"
                    :emojisByRow="20"
                    :labelSearch="$t('common.search')"
                    lang="pt-BR"
                    @select="(v) => onInsertSelectEmoji(v, 'message1')"
                  />
                </q-menu>
              </q-btn>
            </div>
            <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
              <textarea
                ref="message1"
                style="min-height: 12.5vh; max-height: 12.5vh;"
                class="q-pa-sm bg-white full-width rounded-borders"
                :class="{
                  'bg-red-1': v$.campanha.message1.$error
                }"
                @blur="v$.campanha.message1.$touch"
                :placeholder="$t('modalCampanha.placeholders.message')"
                autogrow
                dense
                outlined
                v-model="campanha.message1"
              />
              <q-btn round
                flat
                dense>
                <q-icon size="2em"
                  name="mdi-variable" />
                <q-tooltip>
                  {{ $t('modalCampanha.labels.variables') }}
                </q-tooltip>
                <q-menu touch-position>
                  <q-list dense
                    style="min-width: 100px">
                    <q-item v-for="variavel in variaveis"
                      :key="variavel.label"
                      clickable
                      @click="onInsertSelectVariable(variavel.value, 'message1', 'message1')"
                      v-close-popup>
                      <q-item-section>{{ variavel.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-separator class="q-my-md" />
            </div>
          </div>
          <div class="row items-center q-pt-none">
            <label class="text-heading text-bold">{{ $t('modalCampanha.labels.secondMessage') }}</label>
            <div class="col-xs-3 col-sm-2 col-md-1">
              <q-btn
                round
                flat
                class="q-ml-sm"
              >
                <q-icon
                  size="2em"
                  name="mdi-emoticon-happy-outline"
                />
                <q-tooltip>
                  {{ $t('modalCampanha.labels.emoji') }}
                </q-tooltip>
                <q-menu
                  anchor="top right"
                  self="bottom middle"
                  :offset="[5, 40]"
                >
                  <VEmojiPicker
                    style="width: 40vw"
                    :showSearch="false"
                    :emojisByRow="20"
                    :labelSearch="$t('common.search')"
                    lang="pt-BR"
                    @select="(v) => onInsertSelectEmoji(v, 'message2')"
                  />
                </q-menu>
              </q-btn>
            </div>
            <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
              <textarea
                ref="message2"
                style="min-height: 12.5vh; max-height: 12.5vh;"
                class="q-pa-sm bg-white full-width rounded-borders"
                :placeholder="$t('modalCampanha.placeholders.message')"
                autogrow
                dense
                outlined
                :class="{
                  'bg-red-1': v$.campanha.message2.$error
                }"
                @blur="v$.campanha.message2.$touch"
                v-model="campanha.message2"
              />
              <q-btn round
                flat
                dense>
                <q-icon size="2em"
                  name="mdi-variable" />
                <q-tooltip>
                  {{ $t('modalCampanha.labels.variables') }}
                </q-tooltip>
                <q-menu touch-position>
                  <q-list dense
                    style="min-width: 100px">
                    <q-item v-for="variavel in variaveis"
                      :key="variavel.label"
                      clickable
                      @click="onInsertSelectVariable(variavel.value, 'message2', 'message2')"
                      v-close-popup>
                      <q-item-section>{{ variavel.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-separator class="q-my-md" />
            </div>
          </div>
          <div class="row items-center q-pt-none">
            <label class="text-heading text-bold">{{ $t('modalCampanha.labels.thirdMessage') }}</label>
            <div class="col-xs-3 col-sm-2 col-md-1">
              <q-btn
                round
                flat
                class="q-ml-sm"
              >
                <q-icon
                  size="2em"
                  name="mdi-emoticon-happy-outline"
                />
                <q-tooltip>
                  {{ $t('modalCampanha.labels.emoji') }}
                </q-tooltip>
                <q-menu
                  anchor="top right"
                  self="bottom middle"
                  :offset="[5, 40]"
                >
                  <VEmojiPicker
                    style="width: 40vw"
                    :showSearch="false"
                    :emojisByRow="20"
                    :labelSearch="$t('common.search')"
                    lang="pt-BR"
                    @select="(v) => onInsertSelectEmoji(v, 'message3')"
                  />
                </q-menu>
              </q-btn>
            </div>
            <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
              <textarea
                ref="message3"
                style="min-height: 12.5vh; max-height: 12.5vh;"
                class="q-pa-sm bg-white full-width rounded-borders"
                :placeholder="$t('modalCampanha.placeholders.message')"
                autogrow
                dense
                outlined
                :class="{
                  'bg-red-1': v$.campanha.message3.$error
                }"
                @blur="v$.campanha.message3.$touch"
                v-model="campanha.message3"
              />
              <q-btn round
                flat
                dense>
                <q-icon size="2em"
                  name="mdi-variable" />
                <q-tooltip>
                  {{ $t('modalCampanha.labels.variables') }}
                </q-tooltip>
                <q-menu touch-position>
                  <q-list dense
                    style="min-width: 100px">
                    <q-item v-for="variavel in variaveis"
                      :key="variavel.label"
                      clickable
                      @click="onInsertSelectVariable(variavel.value, 'message3', 'message3')"
                      v-close-popup>
                      <q-item-section>{{ variavel.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </div>
        <div style="max-width: 400px;">
          <q-card
            bordered
            flat
            class="full-width"
          >
            <div class="text-body1 text-bold q-pa-sm full-width text-center bg-grey-3">
              {{ $t('modalCampanha.labels.messagePreview') }}
            </div>
            <q-card-section class="row justify-center">
              <q-option-group
                class="q-mb-sm"
                inline
                dense
                v-model="messagemPreview"
                :options="optRadio"
                color="primary"
              />
              <cMolduraCelular
                class="row justify-center"
                :key="cKey"
              >
                <MensagemChat
                  :isLineDate="false"
                  size="8"
                  class="full-width"
                  :mensagens="cMessages"
                />
              </cMolduraCelular>
            </q-card-section>
          </q-card>
        </div>

      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <q-btn
            :label="$t('common.cancel')"
            color="negative"
            class="q-mr-md"
            @click="$emit('update:modalCampanha', false)"
          />
          <q-btn
            :label="$t('common.save')"
            color="positive"
            icon="save"
            @click="handleCampanha"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'
import axios from 'axios'
import cMolduraCelular from 'src/components/cMolduraCelular.vue'
import MensagemChat from 'src/pages/atendimento/MensagemChat.vue'
import { mapGetters } from 'vuex'
import { CriarCampanha, AlterarCampanha } from 'src/service/campanhas.js'
import { parseISO, startOfDay, format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
const isValidDate = (v) => {
  if (!v) return false
  try {
    // Se já está no formato ISO, usa parseISO
    if (v.includes('T') || v.includes('Z')) {
      return startOfDay(new Date(parseISO(v))).getTime() >= startOfDay(new Date()).getTime()
    }
    // Se está no formato "YYYY-MM-DD HH:mm", converte para ISO
    if (v.includes(' ')) {
      const [date, time] = v.split(' ')
      const isoString = `${date}T${time}:00.000Z`
      return startOfDay(new Date(parseISO(isoString))).getTime() >= startOfDay(new Date()).getTime()
    }
    // Se está no formato "YYYY-MM-DD", adiciona horário padrão
    const isoString = `${v}T00:00:00.000Z`
    return startOfDay(new Date(parseISO(isoString))).getTime() >= startOfDay(new Date()).getTime()
  } catch (error) {
    console.error('Erro na validação de data:', error, 'Valor:', v)
    return false
  }
}

const downloadImageCors = axios.create({
  baseURL: process.env.URL_API,
  timeout: 20000,
  headers: {
    responseType: 'blob'
  }
})

export default {
  
  mounted () {
    try {
      this.parseCampanhaStart()
    } catch (e) {}
  },
name: 'ModalCampanha',
  setup () {
    return { v$: useVuelidate() }
  },
  components: { VEmojiPicker, cMolduraCelular, MensagemChat },
  props: {
    modalCampanha: {
      type: Boolean,
      default: false
    },
    campanhaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      startDate: null,
        startTime: null,
variaveis: [
        { label: this.$t("common.variables.name"), value: '{{name}}' },
        { label: this.$t('common.variables.email'), value: '{{email}}' },
        { label: this.$t('common.variables.phoneNumber'), value: '{{phoneNumber}}' },
        { label: this.$t('common.variables.kanban'), value: '{{kanban}}' },
        { label: this.$t('common.variables.firstName'), value: '{{firstName}}' },
        { label: this.$t('common.variables.lastName'), value: '{{lastName}}' },
        { label: this.$t('common.variables.businessName'), value: '{{businessName}}' },
      ],
      optRadio: [
        { label: this.$t('modalCampanha.optRadio.msg1'), value: 'message1' },
        { label: this.$t('modalCampanha.optRadio.msg2'), value: 'message2' },
        { label: this.$t('modalCampanha.optRadio.msg3'), value: 'message3' }
      ],
      messagemPreview: 'message1',
      loading: false,
      abrirModalImagem: false,
      urlMedia: '',
      campanha: {
        name: null,
        start: null,
        mediaUrl: null,
        message1: null,
        message2: null,
        message3: null,
        sessionId: null,
        delay: 20
      },
      messageTemplate: {
        mediaUrl: null,
        id: null,
        ack: 3,
        read: true,
        fromMe: true,
        body: null,
        mediaType: 'chat',
        isDeleted: false,
        createdAt: '2021-02-20T20:09:04.736Z',
        updatedAt: '2021-02-20T23:26:24.311Z',
        quotedMsgId: null,
        delay: 20,
        ticketId: 0,
        contactId: null,
        userId: null,
        contact: null,
        quotedMsg: null
      },
      arquivos: [],
      // Sistema de gerenciamento de memória
      timers: [],
      // Cache de blob URLs para evitar CORS
      mediaBlobUrl: null,
      proxiedMediaUrl: null
    }
  },
  watch: {
    'campanha.mediaUrl': {
      async handler (newUrl, oldUrl) {
        // Limpar blob URL anterior apenas se a URL mudou
        if (oldUrl && oldUrl !== newUrl && this.mediaBlobUrl) {
          window.URL.revokeObjectURL(this.mediaBlobUrl)
          this.mediaBlobUrl = null
        }
        this.proxiedMediaUrl = null

        // Se há nova URL e não há arquivo novo, carregar via proxy
        if (newUrl && !this.arquivos?.type) {
          try {
            this.proxiedMediaUrl = await this.getProxiedMediaUrl(newUrl)
          } catch (error) {
            console.error('Erro ao carregar mídia via proxy:', error)
            this.proxiedMediaUrl = null
          }
        }
      },
      immediate: true
    },
    arquivos: {
      handler () {
        // Quando arquivo novo é selecionado, limpar proxied URL
        if (this.mediaBlobUrl) {
          window.URL.revokeObjectURL(this.mediaBlobUrl)
          this.mediaBlobUrl = null
        }
        this.proxiedMediaUrl = null
      }
    }
  },
  validations () { return {
    campanha: {
      name: { required },
      start: { required, isValidDate },
      message1: { required },
      message2: { required },
      message3: { required },
      sessionId: { required }
    }
  } },
  computed: {
    startDisplay () {
      if (!this.startDate) return ''
      try {
        const [y,m,d] = String(this.startDate).split('-')
        const dateStr = (y && m && d) ? `${d.padStart(2,'0')}/${m.padStart(2,'0')}/${y}` : this.startDate
        return dateStr
      } catch (_) { return String(this.startDate) }
    },

    ...mapGetters(['whatsapps']),
    cSessions () {
      return this.whatsapps.filter(w => ["whatsapp", "baileys", "meow", "evo", "zapi", "uazapi"].includes(w.type) && !w.isDeleted)
    },
    cKey () {
      return this.campanha.message1 + this.campanha.message2 + this.campanha.message3
    },
    cArquivoName () {
      if (!this.campanha.mediaUrl) return ''
      
      try {
        // Tenta extrair o nome do arquivo da URL
        const url = this.campanha.mediaUrl
        const split = url.split('/')
        let name = split[split.length - 1]
        
        // Se o nome estiver vazio ou for muito curto, tenta uma abordagem diferente
        if (!name || name.length < 3) {
          // Tenta extrair de query parameters ou usar um nome padrão
          const urlObj = new URL(url)
          const pathname = urlObj.pathname
          const pathSplit = pathname.split('/')
          name = pathSplit[pathSplit.length - 1] || 'arquivo'
        }
        
        // Se ainda não tiver nome, usa um nome baseado no tipo de mídia
        if (!name || name.length < 3) {
          const mediaType = this.campanha.mediaType || 'arquivo'
          const extension = this.getFileExtension(url) || this.getExtensionFromMediaType(mediaType)
          name = `${mediaType}.${extension}`
        }
        return name
      } catch (error) {
        console.error('Erro ao extrair nome do arquivo:', error)
        return 'arquivo'
      }
    },
    cMessages () {
      const messages = []
      const msgArray = ['message1', 'message2', 'message3']
      if (this.arquivos?.type) {
        const blob = new Blob([this.arquivos], { type: this.arquivos.type })
        messages.push({
          ...this.messageTemplate,
          id: 'mediaUrl',
          mediaUrl: window.URL.createObjectURL(blob),
          body: this.arquivos.name,
          mediaType: this.arquivos.type.substr(0, this.arquivos.type.indexOf('/'))
        })
      } else if (this.campanha.mediaUrl && this.proxiedMediaUrl) {
        // Só adiciona mídia se a URL proxied estiver disponível (evita CORS)
        messages.push({
          ...this.messageTemplate,
          id: 'mediaUrl',
          mediaUrl: this.proxiedMediaUrl,
          body: '',
          mediaType: this.campanha.mediaType
        })
      }
      msgArray.forEach(el => {
        if (this.messagemPreview === el) {
          const body = this.campanha[el]
          const msg = {
            ...this.messageTemplate,
            id: el,
            body
          }
          messages.push(msg)
        }
      })
      return messages
    }
  },
  methods: {
    parseCampanhaStart () {
      const raw = (this.campanha && this.campanha.start) ? String(this.campanha.start) : ''
      if (!raw) {
        this.startDate = null
        this.startTime = null
        return
      }
      
      try {
        // Se a data vem do banco em formato ISO/UTC, converte para o timezone local do navegador
        let dateObj
        if (raw.includes('T') || raw.includes('Z')) {
          // Data em formato ISO (UTC)
          dateObj = parseISO(raw)
          // Converte de UTC para o timezone local do navegador
          // Detecta automaticamente o timezone do navegador
          const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo'
          dateObj = utcToZonedTime(dateObj, userTimezone)
        } else if (raw.includes(' ')) {
          // Formato "YYYY-MM-DD HH:mm" (já está em horário local)
          const [date, time] = raw.split(' ')
          this.startDate = date
          this.startTime = time.slice(0, 5)
          return
        } else {
          // Apenas data, sem hora
          this.startDate = raw
          this.startTime = null
          return
        }
        
        // Extrai data e hora do objeto Date convertido
        this.startDate = format(dateObj, 'yyyy-MM-dd')
        this.startTime = format(dateObj, 'HH:mm')
      } catch (error) {
        console.error('Erro ao parsear data da campanha:', error, 'Valor:', raw)
        // Fallback: tenta o método antigo
        const cleaned = raw.replace('T', ' ')
        const parts = cleaned.split(' ')
        const d = parts[0] || ''
        const t = (parts[1] || '').slice(0, 5)
        if (d) this.startDate = d
        if (t) this.startTime = t
      }
    },
    applyStart () { 
      if (this.startDate && this.startTime) { 
        this.campanha = this.campanha || {}
        // Cria uma data no timezone local do navegador e converte para ISO
        // Isso garante que o horário seja interpretado corretamente independente do timezone
        const localDate = new Date(`${this.startDate}T${this.startTime}:00`)
        // Envia como ISO string com timezone do navegador
        this.campanha.start = localDate.toISOString()
      } 
      if (this.$refs.startPopup && this.$refs.startPopup.hide) { 
        this.$refs.startPopup.hide() 
      } 
    },

    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
    },
    onInsertSelectVariable(variable, ref, messageField) {
      var tArea = this.$refs[ref];
      if (!tArea) {
        return;
      }

      var startPos = tArea.selectionStart;
      var endPos = tArea.selectionEnd;
      var originalText = tArea.value;

      if (!variable) {
        return;
      }
      var newText = originalText.substring(0, startPos) + variable + originalText.substring(endPos);
      this.campanha[messageField] = newText;
      var newCursorPos = startPos + variable.length;
      tArea.setSelectionRange(newCursorPos, newCursorPos);
    },
    onInsertSelectEmoji (emoji, ref) {
      const self = this
      var tArea = this.$refs[ref]
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value
      // filter:
      if (!emoji.data) {
        return
      }
      // insert:
      self.txtContent = this.campanha[ref]
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.campanha[ref] = self.txtContent
      // move cursor:
      const timerId = setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
      this.addTimer(timerId);
    },
    resetarCampanha () {
      this.campanha = {
        id: null,
        name: null,
        start: null,
        message1: null,
        message2: null,
        message3: null,
        message4: null,
        mediaUrl: null,
        userId: null,
        delay: 20,
        sessionId: null
      }
    },
    fecharModal () {
      this.resetarCampanha()
      this.$emit('update:campanhaEdicao', { id: null })
      this.$emit('update:modalCampanha', false)
    },
    async abrirModal () {
      if (this.campanhaEdicao.id) {
        this.campanha = { ...this.campanhaEdicao }
        // hidratar campos de data/hora ao abrir para edição
        this.parseCampanhaStart()
        // Carregar mídia via proxy se houver
        if (this.campanha.mediaUrl && !this.arquivos?.type) {
          this.proxiedMediaUrl = await this.getProxiedMediaUrl(this.campanha.mediaUrl)
        }
      } else {
        this.resetarCampanha()
        this.startDate = null
        this.startTime = null
      }
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
    async buscarImageCors (imageUrl) {
      this.loading = true
      try {
        const { data, headers } = await downloadImageCors.get(imageUrl, {
          responseType: 'blob'
        })
        const url = window.URL.createObjectURL(
          new Blob([data], { type: headers['content-type'] })
        )
        this.urlMedia = url
        this.abrirModalImagem = true
      } catch (error) {
        this.$notificarErro(this.$t('modalCampanha.notifications.errorImage'), error)
      }
      this.loading = false
    },
    async handleCampanha () {
      this.v$.campanha.$touch()
      
      // Debug: verificar quais campos estão com erro
      console.log('Validação da campanha:', {
        campanha: this.campanha,
        errors: this.v$.campanha.$error,
        invalidFields: this.v$.campanha.$invalid
      })
      
      if (this.v$.campanha.$error) {
        console.log('Erros de validação:', this.v$.campanha.$errors)
        
        // Mostrar campos específicos com erro
        const camposComErro = []
        if (this.v$.campanha.name.$error) camposComErro.push('Nome da campanha')
        if (this.v$.campanha.start.$error) camposComErro.push('Data de início')
        if (this.v$.campanha.message1.$error) camposComErro.push('Primeira mensagem')
        if (this.v$.campanha.message2.$error) camposComErro.push('Segunda mensagem')
        if (this.v$.campanha.message3.$error) camposComErro.push('Terceira mensagem')
        if (this.v$.campanha.sessionId.$error) camposComErro.push('Sessão')
        
        this.$q.notify({
          type: 'negative',
          message: `Campos obrigatórios: ${camposComErro.join(', ')}`
        })
        return
      }
      try {
        this.loading = true
        const campanha = { ...this.campanha }
        const medias = new FormData()
        
        // Tratamento especial para mediaUrl
        if (this.campanha.id) {
          // Edição: se mediaUrl é null e não há arquivos novos, indica remoção de mídia
          if (campanha.mediaUrl === null && (!this.arquivos || (Array.isArray(this.arquivos) && this.arquivos.length === 0))) {
            campanha.mediaUrl = 'null'
            campanha.mediaType = ''
          }
        } else {
          // Criação: se não há mídia, remove o campo mediaUrl para não enviar
          if (campanha.mediaUrl === null && (!this.arquivos || (Array.isArray(this.arquivos) && this.arquivos.length === 0))) {
            delete campanha.mediaUrl
            delete campanha.mediaType
          }
        }
        
        Object.keys(campanha).forEach((key) => {
          const value = campanha[key]
          // FormData não aceita null, então convertemos para string vazia
          // Mas não enviamos campos undefined
          if (value === null || value === undefined) {
            // Não adiciona campos null/undefined ao FormData
            return
          } else {
            medias.append(key, value)
          }
        })
        
        // Só adiciona medias se houver arquivo
        if (this.arquivos && (!Array.isArray(this.arquivos) || this.arquivos.length > 0)) {
        medias.append('medias', this.arquivos)
        }
        if (this.campanha.id) {
          const { data } = await AlterarCampanha(medias, campanha.id)
          this.$emit('modal-campanha:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalCampanha.notifications.successEdit'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarCampanha(medias)
          this.$emit('modal-campanha:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalCampanha.notifications.successCreate'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('modalCampanha.notifications.error'), error)
      }
    },
    getFileExtension (url) {
      try {
        const urlObj = new URL(url)
        const pathname = urlObj.pathname
        const lastDot = pathname.lastIndexOf('.')
        if (lastDot > 0) {
          return pathname.substring(lastDot + 1)
        }
        return null
      } catch (error) {
        return null
      }
    },
    getExtensionFromMediaType (mediaType) {
      const extensions = {
        'image': 'jpg',
        'video': 'mp4',
        'audio': 'mp3',
        'application': 'pdf',
        'text': 'txt'
      }
      return extensions[mediaType] || 'bin'
    },
    async getProxiedMediaUrl (fileUrl) {
      // Se já temos um blob URL em cache, retorna ele
      if (this.mediaBlobUrl) {
        return this.mediaBlobUrl
      }

      // Se não há URL, retorna null
      if (!fileUrl) {
        return null
      }

      try {
        // Em dev, roteia via proxy para evitar CORS
        const buildProxiedUrl = (u) => {
          try {
            const parsed = new URL(u)
            const path = parsed.pathname + (parsed.search || '')
            
            // Se a URL contém localhost ou 127.0.0.1, sempre usa proxy via URL_API
            if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
              // Extrai apenas o path e usa URL_API como proxy
              const apiUrl = process.env.URL_API || ''
              if (apiUrl) {
                // Se URL_API é relativa, concatena diretamente
                if (apiUrl.startsWith('/')) {
                  return `${apiUrl}${path}`
                }
                // Se URL_API é absoluta, usa a origem dela
                try {
                  const apiParsed = new URL(apiUrl)
                  return `${apiParsed.origin}${path}`
                } catch (e) {
                  // Se falhar, usa como está
                  return `${apiUrl}${path}`
                }
              }
              // Se não tem URL_API, usa a origem atual
              return `${window.location.origin}${path}`
            }
            
            // Se estivermos usando proxy (URL_API relativa), prefixa com URL_API
            const apiUrl = process.env.URL_API || ''
            if (apiUrl.startsWith('/')) {
              return `${apiUrl}${path}`
            }
            
            // Se URL_API é absoluta e diferente da origem, usa como proxy
            if (apiUrl && !apiUrl.startsWith('/')) {
              try {
                const apiParsed = new URL(apiUrl)
                if (apiParsed.origin !== window.location.origin) {
                  return `${apiUrl}${path}`
                }
              } catch (e) {
                // Ignora erro de parsing
              }
            }
            
            return u
          } catch (e) {
            // Se já for relativo
            if (u.startsWith('/public/') || u.startsWith('/')) {
              const apiUrl = process.env.URL_API || ''
              if (apiUrl) {
                return apiUrl.startsWith('/') ? `${apiUrl}${u}` : `${apiUrl}${u}`
              }
              return `${window.location.origin}${u}`
            }
            return u
          }
        }
        const url = buildProxiedUrl(fileUrl)

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Origin': window.location.origin,
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Obter o blob do arquivo
        const blob = await response.blob()
        
        // Criar URL do blob e armazenar
        const blobUrl = window.URL.createObjectURL(blob)
        this.mediaBlobUrl = blobUrl
        
        return blobUrl
      } catch (error) {
        console.error('Erro ao carregar mídia:', error)
        // Em caso de erro, retorna a URL original como fallback
        return fileUrl
      }
    }
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
    // Limpar blob URL da mídia
    if (this.mediaBlobUrl) {
      window.URL.revokeObjectURL(this.mediaBlobUrl);
      this.mediaBlobUrl = null;
    }
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
    // Limpar blob URL da mídia
    if (this.mediaBlobUrl) {
      window.URL.revokeObjectURL(this.mediaBlobUrl);
      this.mediaBlobUrl = null;
    }
  }
}
</script>

<style lang="scss" >
border-error {
  border: 3px solid red;
  background: red !important;
}
</style>
