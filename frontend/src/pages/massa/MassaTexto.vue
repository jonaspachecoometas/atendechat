<template>
  <div  v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          {{ $t('massaTexto.form.bulkSend') }}
        </q-card-section>
        <q-banner style="margin-top: 10px" class="bg-yellow text-black" inline-actions>
          <p>{{ $t('massaTexto.form.availableFunctions') }}</p>
        </q-banner>
        <q-list class="text-weight-medium">
          
          <div class="row q-px-md">
            <div class="col-6 q-py-md">
              <q-select
                style="margin: 1px;"
                v-model="selectedWhatsapps"
                :options="cSessionsOptions"
                :label="$t('massaTexto.form.selectConnection')"
                dense
                outlined
                multiple
                use-chips
              />
            </div>
            <div class="col-3 q-py-md">
              <q-input v-model="min" :label="$t('massaTexto.form.minSeconds')" style="margin: 1px;" dense outlined />
            </div>
            <div class="col-3 q-py-md">
              <q-input v-model="max" :label="$t('massaTexto.form.maxSeconds')" style="margin: 1px;" dense outlined />
            </div>

            <div class="col-4 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="contatosImportar"
                :label="$t('massaTexto.form.contacts')"
                dense
              />
            </div>
            <div class="col-4 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="isGroup"
                :label="$t('grupoMassa2.form.groups')"
                dense
              />
            </div>

            <div class="col-4 q-py-md" style="margin: 1px;" v-if="!useKanban">
              <q-toggle
                style="margin: 1px;"
                v-model="useTags"
                :label="$t('massaTexto.form.selectTag')"
                dense
              />
            </div>
            <div class="col-12 q-py-md" v-if="useTags">
              <div v-if="loadingKanban">{{ $t('massaTexto.form.fetchingContacts') }}</div>
              <div v-if="loadingTag" class="loading-bar">
                <div class="bar"></div>
              </div>
              <q-select
                v-model="selectedTag"
                :options="tagOptions"
                :label="$t('massaTexto.form.selectTag')"
                dense
                outlined
                style="margin: 1px;"
                @update:model-value="filtrarContatosPorEtiqueta"
              />
            </div>

            <div class="col-4 q-py-md" style="margin: 1px;" v-if="!useTags">
              <q-toggle
                style="margin: 1px;"
                v-model="useKanban"
                label="Kanban"
                dense
              />
            </div>
            <div class="col-12 q-py-md" v-if="useKanban">
              <div v-if="loadingKanban">{{ $t('massaTexto.form.fetchingContacts') }}</div>
              <div v-if="loadingKanban" class="loading-bar">
                <div class="bar"></div>
              </div>
              <q-select
                v-model="selectedKanban"
                :options="kanbanOptions"
                :label="$t('massaTexto.form.selectKanban')"
                dense
                outlined
                style="margin: 1px;"
                @update:model-value="filtrarContatosPorKanban"
              />
            </div>
            
            <div class="col-12 q-py-md" v-if="contatosImportar && !useTags && !useKanban">
              <div v-if="loading">{{ $t('grupoMassaUsuarios.loading.fetchingContacts') }}</div>
              <div v-if="loading" class="loading-bar">
                <div class="bar"></div>
              </div>
              <q-select
                v-model="selectedContacts"
                :options="contactOptions"
                :label="$t('grupoMassaUsuarios.form.selectContacts')"
                use-chips
                multiple
                dense
                outlined
                style="margin: 1px;"
              > 
              <!-- <template v-slot:option="scope">
                  <q-item class="blur-effect">
                    <q-item-section>
                      {{ scope.opt.label }}
                    </q-item-section>
                  </q-item>
                </template> -->
              </q-select>
            </div>
            
            <div class="col-9 q-py-md" v-if="!contatosImportar && !useTags && !useKanban">
              <q-input
                v-model="numberInput"
                :label="$t('grupoMassaUsuarios.form.numbersCommaSeparated')"
                dense
                outlined
                style="margin: 1px;"
              />
            </div>
            <div class="col-3 q-py-md" v-if="!contatosImportar && !useTags && !useKanban">
              <q-file
                accept=".csv"
                :label="$t('grupoMassaUsuarios.form.importCSV')"
                @update:model-value="handleFileUpload"
                dense
                outlined
                style="margin: 1px;"
                clearable
              />
            </div>

            <div class="row q-px-md">
              <div class="col-12 q-py-md">
                <q-toggle
                  v-model="text"
                  :label="$t('massaTexto.form.includeText')"
                  dense
                  style="margin: 1px;"
                />
              </div>
            </div>
            <div v-if="text" class="col-12 q-py-md">
              <q-input v-model="message" type="textarea" :label="$t('massaTexto.form.message')" style="margin: 1px;" autogrow dense outlined />
            </div>
            
            <div class="row q-px-md" v-if="selectedWhatsapps && selectedWhatsapps.length > 0 && selectedWhatsapps.some(w => w?.type !== 'baileys' && w?.type !== 'meow' && w?.type !== 'evo' && w?.type !== 'zapi' && w?.type !== 'uazapi')" >
              <div class="col-12 q-py-md" style="margin: 1px;">
                <q-toggle
                  v-model="media"
                  :label="$t('massaTexto.form.includeMedia')"
                  dense
                />
              </div>
            </div>
            <div v-if="media" class="col-12 q-py-md" style="margin: 1px;">
              <q-input v-model="mediaUrl" :label="$t('massaTexto.form.mediaUrl')" dense outlined />
            </div>
            <div v-if="media" class="col-12 q-py-md" style="margin: 1px;">
              <q-input v-model="mediaDescription" type="textarea" :label="$t('massaTexto.form.mediaDescription')" dense outlined autogrow />
            </div>

            <div v-if="selectedWhatsapps && selectedWhatsapps.length > 0 && selectedWhatsapps.some(w => w?.type !== 'baileys' && w?.type !== 'meow' && w?.type !== 'evo' && w?.type !== 'zapi' && w?.type !== 'uazapi')" class="row q-px-md">
              <div class="col-12 q-py-md" style="margin: 1px;">
                <q-toggle
                  v-model="voice"
                  :label="$t('massaTexto.form.includeRecordedAudio')"
                  dense
                />
              </div>
            </div>
            <div v-if="voice && selectedWhatsapps && selectedWhatsapps.length > 0 && selectedWhatsapps.some(w => w?.type !== 'baileys' && w?.type !== 'meow' && w?.type !== 'evo' && w?.type !== 'zapi' && w?.type !== 'uazapi')" class="col-12 q-py-md">
              <q-input v-model="voiceUrl" :label="$t('massaTexto.form.audioUrl')" dense outlined style="margin: 1px;"/>
            </div>

            <div class="row q-px-md">
              <div class="col-12 q-py-md" style="margin: 1px;">
                <q-toggle
                  v-model="mediaLocal"
                  :label="$t('massaTexto.form.includeFile')"
                  dense
                />
              </div>
            </div>
            <div class="row q-px-md" v-if="mediaLocal">
              <div class="col-12 q-py-md" style="margin: 1px;">
                <label>
                  <input type="checkbox" v-model="voiceLocal">
                  {{ $t('massaTexto.form.recordedAudio') }}
                </label>
              </div>
            </div>
            <div v-if="mediaLocal" class="col-12 q-py-md">
              <input type="file" @change="handleFileUploadInput">
            </div>
            <div v-if="mediaLocal && !voiceLocal" class="col-12 q-py-md" style="margin: 1px;">
              <q-input v-model="fileDescription" type="textarea":label="$t('massaTexto.form.mediaDescription')" dense outlined autogrow />
            </div>
            
            <div class="col-12">
              <q-btn :label="$t('common.send')" :disable="sending" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
              <q-btn :label="$t('grupoMassa1.actions.clear')" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
            </div>
            <div v-if="sending" class="col-12 q-py-md">
              {{ $t('massaTexto.notifications.messagesSent', {
                sent: sentCount,
                total: totalMessages
              }) }}
              <br />
              {{ $t('massaTexto.notifications.uploadingMessages') }}
            </div>
            <div v-if="sending" class="loading-bar" style="margin-bottom: 10px;">
              <div class="bar"></div>
            </div>

          </div>
        </q-list>
      </q-card>
    </div>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { TextoFechar } from 'src/service/massa.js'
import { mapGetters } from 'vuex';
import { ListarContatos, ListarContatosPorEtiqueta, ListarContatosKanban, ListarContatosPorEtiquetaEspecifica, ListarContatosPorKanbanEspecifico } from 'src/service/contatos.js'
import { ListarKanbans } from 'src/service/kanban.js'
import { uid } from 'quasar'
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { CriarBulkDispatch } from 'src/service/bulkDispatch.js'

export default {
  name: 'MassaTexto',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      sending: false,
      sentCount: 0,
      totalMessages: 0,
      useTags: false,
      useKanban: false,
      selectedTag: null,
      selectedKanban: null,
      tagOptions: [],
      kanbanOptions: [],
      whatsappId: null,
      selectedWhatsapps: [],
      numberInput: '',
      message: '',
      min: '',
      max: '',
      isGroup: false,
      contatosImportar: false,
      media: false,
      mediaUrl: '',
      mediaDescription: '',
      text: false,
      voice: false,
      voiceUrl: '',
      mediaLocal: false,
      file: null,
      fileDescription: '',
      voiceLocal: false,
      loading: false,
      loadingTag: false,
      loadingKanban: false,
      params: {
        hasMore: true
      },
      selectedContacts: [],
      contactOptions: [],
      bulkDispatchId: null,
      // Sistema de gerenciamento de memória
      timers: [],
    }
  },
  watch: {
    isGroup(newVal, oldVal) {
      this.listarContatos();
    },
    contatosImportar(newVal, oldVal) {
      this.listarContatos();
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      // return this.whatsapps.filter(w => w.type === 'whatsapp' && !w.isDeleted)
      return this.whatsapps.filter(w => ["whatsapp", "baileys", "meow", "evo", "zapi", "uazapi"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type }))
    }
  },
  methods: {
    // Função para escolher aleatoriamente uma conexão WhatsApp
    getRandomWhatsapp() {
      if (!this.selectedWhatsapps || this.selectedWhatsapps.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * this.selectedWhatsapps.length);
      return this.selectedWhatsapps[randomIndex];
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
    async listarEtiquetas() {
      try {
        const { data } = await ListarEtiquetas(true);
        // Ordenar etiquetas por ordem alfabética baseada no campo 'tag'
        const sortedData = data.sort((a, b) => {
          const tagA = a.tag ? a.tag.toLowerCase() : ''
          const tagB = b.tag ? b.tag.toLowerCase() : ''
          return tagA.localeCompare(tagB)
        })
        this.tagOptions = sortedData.map(tag => ({ label: tag.tag, value: tag.id }));
      } catch (error) {
        console.error(error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTexto.notifications.errorFetchingTags')
        });
      }
    },
    async listarKanbans() {
      try {
        const { data } = await ListarKanbans();
        // Ordenar kanbans por ordem alfabética baseada no campo 'name'
        const kanbansOrdenados = (data.kanban || []).sort((a, b) => {
          const nameA = a?.name ? a.name.toLowerCase() : ''
          const nameB = b?.name ? b.name.toLowerCase() : ''
          return nameA.localeCompare(nameB)
        })
        this.kanbanOptions = kanbansOrdenados.map(kanban => ({ label: kanban.name, value: kanban.id }));
      } catch (error) {
        console.error(error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTexto.notifications.errorFetchingKanbans')
        });
      }
    },
    async filtrarContatosPorEtiqueta() {
      if (this.selectedTag) {
        this.loadingTag = true;
        try {
          this.contactOptions = [];
          this.params.pageNumber = 1;
          this.params.hasMore = true;
          
          while (this.params.hasMore) {
            const { data } = await ListarContatosPorEtiquetaEspecifica({
              ...this.params,
              tagId: this.selectedTag.value
            });
            this.processarContatos(data);
            this.params.hasMore = data.hasMore;
            if (this.params.hasMore) {
              this.params.pageNumber++;
              const timerId = await new Promise(resolve => setTimeout(resolve, 1000));
              this.addTimer(timerId);
            }
          }
          
          this.selectedContacts = this.contactOptions.map(contact => contact.value);
          console.log('selectedContacts', this.selectedContacts)
        } catch (error) {
          console.error(error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('massaTexto.notifications.errorFilteringContactsByTag')
          });
        } finally {
          this.loadingTag = false;
        }
      }
    },
    async filtrarContatosPorKanban() {
      if (this.selectedKanban) {
        this.loadingKanban = true;
        try {
          this.contactOptions = [];
          this.params.pageNumber = 1;
          this.params.hasMore = true;
          
          while (this.params.hasMore) {
            const { data } = await ListarContatosPorKanbanEspecifico({
              ...this.params,
              kanbanId: this.selectedKanban.value
            });
            this.processarContatos(data);
            this.params.hasMore = data.hasMore;
            if (this.params.hasMore) {
              this.params.pageNumber++;
              const timerId = await new Promise(resolve => setTimeout(resolve, 1000));
              this.addTimer(timerId);
            }
          }
          
          this.selectedContacts = this.contactOptions.map(contact => contact.value);
          console.log('selectedContacts', this.selectedContacts)
        } catch (error) {
          console.error(error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('massaTexto.notifications.errorFilteringContactsByKanban')
          });
        } finally {
          this.loadingKanban = false;
        }
      }
    },
    async listarContatos() {
      this.loading = true;
      this.contactOptions = [];
      this.params.pageNumber = 1;
      this.params.hasMore = true; 
      try {
        while (this.params.hasMore) {
          const { data } = await ListarContatos(this.params);
          this.processarContatos(data)
          this.params.hasMore = data.hasMore;
          if (this.params.hasMore) {
            this.params.pageNumber++;
            const timerId = await new Promise(resolve => setTimeout(resolve, 1000));
            this.addTimer(timerId);
          }
        }
      } catch (error) {
        console.error('Erro ao obter contatos:', error);
      } finally {
        this.loading = false;
      }
    },
    processarContatos(data) {
      const contatosFiltrados = data.contacts.filter(contato => this.isGroup ? contato.isGroup : !contato.isGroup);
      const opcoesContato = contatosFiltrados.map(contato => ({
        label: contato.name,
        value: contato.number,
        tags: contato.tags,
        kanban: contato.kanban
      }));
      this.contactOptions = [...this.contactOptions, ...opcoesContato];
    },
    handleFileUpload(file) {
      try {
        console.log('Arquivo recebido via q-file:', file);
        
        if (!file) {
          console.warn('Nenhum arquivo selecionado');
          return;
        }

        // Verificar se é um arquivo CSV
        if (!file.name.toLowerCase().endsWith('.csv')) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('massaTemplate.notifications.invalidFileType'),
            position: 'top'
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            console.log('Conteúdo do CSV:', content);
            this.processCSV(content);
            this.$q.notify({
              type: 'positive',
              message: this.$t('massaTemplate.notifications.csvUploadedSuccessfully'),
              position: 'top'
            });
          } catch (error) {
            console.error('Erro ao processar arquivo CSV:', error);
            this.$q.notify({
              type: 'negative',
              message: this.$t('massaTemplate.notifications.errorProcessingCSV'),
              position: 'top'
            });
          }
        };
        
        reader.onerror = () => {
          console.error('Erro ao ler arquivo');
          this.$q.notify({
            type: 'negative',
            message: this.$t('massaTemplate.notifications.errorReadingFile'),
            position: 'top'
          });
        };

        reader.readAsText(file, 'UTF-8');
      } catch (error) {
        console.error('Erro no upload de CSV:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTemplate.notifications.errorUploadingCSV'),
          position: 'top'
        });
      }
    },
    handleFileUploadInput(event) {
      this.file = event.target.files[0];
    },
    processCSV(csvContent) {
      try {
        console.log('Processando CSV:', csvContent);
        
        if (!csvContent || typeof csvContent !== 'string') {
          console.error('Conteúdo CSV inválido');
          this.$q.notify({
            type: 'negative',
            message: this.$t('massaTemplate.notifications.invalidCSVContent'),
            position: 'top'
          });
          return;
        }

        const lines = csvContent.split('\n');
        console.log('Linhas do CSV:', lines);
        
        const numbers = [];
        
        lines.forEach((line, index) => {
          const trimmedLine = line.trim();
          if (trimmedLine === '') return;
          
          console.log(`Processando linha ${index + 1}:`, trimmedLine);
          
          // Suportar tanto vírgula quanto ponto e vírgula como separadores
          const separators = [',', ';'];
          let foundSeparator = null;
          
          for (const sep of separators) {
            if (trimmedLine.includes(sep)) {
              foundSeparator = sep;
              break;
            }
          }
          
          if (foundSeparator) {
            // Se tem separador, processar cada parte
            const parts = trimmedLine.split(foundSeparator);
            parts.forEach(part => {
              const cleanPart = part.trim();
              if (cleanPart && this.isValidPhoneNumber(cleanPart)) {
                numbers.push(cleanPart);
                console.log(`Número válido encontrado: ${cleanPart}`);
              }
            });
          } else {
            // Se não tem separador, tratar a linha inteira como um número
            if (this.isValidPhoneNumber(trimmedLine)) {
              numbers.push(trimmedLine);
              console.log(`Número válido encontrado: ${trimmedLine}`);
            }
          }
        });

        console.log('Números extraídos:', numbers);

        if (numbers.length === 0) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('massaTemplate.notifications.noValidNumbersFound'),
            position: 'top'
          });
          return;
        }

        this.numberInput = numbers.join(',');
        console.log('Input atualizado com:', this.numberInput);
        console.log(`CSV processado com sucesso: ${numbers.length} números válidos encontrados`);
      } catch (error) {
        console.error('Erro ao processar CSV:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTemplate.notifications.errorProcessingCSV'),
          position: 'top'
        });
      }
    },
    isValidPhoneNumber(phone) {
      // Validar se é um número de telefone válido
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      const hasDigits = /\d/.test(phone);
      return phoneRegex.test(phone) && hasDigits && phone.length >= 8;
    },
    async limparCampos(){
      this.message = ''
      this.numberInput = ''
      this.min = ''
      this.max = ''
      this.mediaUrl = ''
      this.mediaDescription = ''
      this.voiceUrl = ''
      this.whatsappId = null
      this.selectedWhatsapps = []
      this.sending = false
      this.$q.notify({
        html: true,
        message: this.$t('grupoMassaUsuarios.notifications.clearFields'),
        type: 'warning',
        progress: true,
        position: 'top',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      const timerId = setTimeout(() => {
        window.location.reload();
      }, 500);
      this.addTimer(timerId);
    },
    async enviar(){
      if (this.useTags && !this.useKanban){
        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        const numbers = Array.isArray(this.selectedContacts) 
          ? this.selectedContacts.map(contact => {
              const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
              // Garantir que seja uma string e remover espaços
              return value ? String(value).trim() : null;
            }).filter(Boolean)
          : []
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        const media = this.media
        const text = this.text
        const voice = this.voice
        const mediaLocal = this.mediaLocal
        const voiceLocal = this.voiceLocal
        
        // Criar BulkDispatch antes de enviar
        try {
          const firstWhatsapp = this.selectedWhatsapps && this.selectedWhatsapps.length > 0 ? this.selectedWhatsapps[0] : null;
          const bulkDispatchData = {
            dispatchType: "text",
            totalMessages: numbers.length,
            whatsappId: firstWhatsapp?.value || null,
            message: this.message || null,
            mediaUrl: this.mediaUrl || null,
            mediaDescription: this.mediaDescription || null,
            voiceUrl: this.voiceUrl || null,
            isGroup: this.isGroup,
            minDelay: minInt || null,
            maxDelay: maxInt || null,
            metadata: {
              whatsappType: firstWhatsapp?.type || null,
              media: media || false,
              voice: voice || false,
              mediaLocal: mediaLocal || false,
              voiceLocal: voiceLocal || false,
              contacts: numbers,
              useTags: true,
              tagId: this.selectedTag?.value,
              multipleWhatsapps: this.selectedWhatsapps.map(w => ({ id: w.value, type: w.type }))
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }
        if (!this.selectedWhatsapps || this.selectedWhatsapps.length === 0) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassa2.notifications.selectConnection'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (isNaN(minInt) || isNaN(maxInt)) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.enterValidNumbers'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (!text && !media && !voice && !mediaLocal) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.chooseSendOption'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        // checagens
        if(text){
          if (this.message === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMessage'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (media) {
          if (this.mediaUrl === "" || this.mediaDescription === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMediaDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (voice) {
          if (this.voiceUrl === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterAudioDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (mediaLocal) {
          if(!voiceLocal){
            if (this.file === "" || this.fileDescription === "") {
              this.$q.notify({
                html: true,
                message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          } else if(voiceLocal){
            if (this.file === "") {
              this.$q.notify({
                html: true,
                 message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          }
        }
        // envios
        this.sending = true;
        this.sentCount = 0;
        this.totalMessages = numbers.length;

        const delay = ms => new Promise(resolve => {
          const timerId = setTimeout(resolve, ms);
          this.addTimer(timerId);
        });

        try{
          for (let index = 0; index < numbers.length; index++) {
            const number = numbers[index];
            const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
            const randomWhatsapp = this.getRandomWhatsapp();
            
            if (!randomWhatsapp) {
              console.error('Nenhuma conexão WhatsApp disponível');
              continue;
            }
            
            // Notificar qual mensagem está sendo enviada e por qual WhatsApp
            this.$q.notify({
              message: `Mensagem ${index + 1}/${numbers.length} sendo enviada para ${number} via ${randomWhatsapp.label}`,
              type: 'info',
              position: 'top-right',
              timeout: 2000,
              progress: true
            });
            
            try {
              if(text){
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  message: this.message,
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (media) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  media: this.media,
                  mediaUrl: this.mediaUrl,
                  mediaDescription: this.mediaDescription,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (voice) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  voice: this.voice,
                  voiceUrl: this.voiceUrl,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (mediaLocal) {
                if(!voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('mediaLocal', this.mediaLocal?.toString());
                  formData.append('mediaLocalDescription', this.fileDescription?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                } else if(voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('voiceLocal', this.voiceLocal?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                }
              }
              
              this.sentCount++;
              await this.$nextTick();
              await delay(randomDelay);
            } catch (error) {
              console.error(`Erro ao enviar para o número ${number}:`, error);
            }
          }
          
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.messagesSent'),
            type: 'positive',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } catch(e){
          console.error('Erro no envio em massa:', e);
        }
        this.sentCount = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        await this.limparCampos();
        // return;
      }
      if (!this.useTags && this.useKanban){
        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        const numbers = Array.isArray(this.selectedContacts) 
          ? this.selectedContacts.map(contact => {
              const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
              // Garantir que seja uma string e remover espaços
              return value ? String(value).trim() : null;
            }).filter(Boolean)
          : []
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        const media = this.media
        const text = this.text
        const voice = this.voice
        const mediaLocal = this.mediaLocal
        const voiceLocal = this.voiceLocal
        
        // Criar BulkDispatch antes de enviar
        try {
          const firstWhatsapp = this.selectedWhatsapps && this.selectedWhatsapps.length > 0 ? this.selectedWhatsapps[0] : null;
          const bulkDispatchData = {
            dispatchType: "text",
            totalMessages: numbers.length,
            whatsappId: firstWhatsapp?.value || null,
            message: this.message || null,
            mediaUrl: this.mediaUrl || null,
            mediaDescription: this.mediaDescription || null,
            voiceUrl: this.voiceUrl || null,
            isGroup: this.isGroup,
            minDelay: minInt || null,
            maxDelay: maxInt || null,
            metadata: {
              whatsappType: firstWhatsapp?.type || null,
              media: media || false,
              voice: voice || false,
              mediaLocal: mediaLocal || false,
              voiceLocal: voiceLocal || false,
              contacts: numbers,
              useKanban: true,
              kanbanId: this.selectedKanban?.value,
              multipleWhatsapps: this.selectedWhatsapps.map(w => ({ id: w.value, type: w.type }))
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }
        if (!this.selectedWhatsapps || this.selectedWhatsapps.length === 0) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassa2.notifications.selectConnection'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (isNaN(minInt) || isNaN(maxInt)) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.enterValidNumbers'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (!text && !media && !voice && !mediaLocal) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.chooseSendOption'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        // checagens
        if(text){
          if (this.message === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMessage'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (media) {
          if (this.mediaUrl === "" || this.mediaDescription === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMediaDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (voice) {
          if (this.voiceUrl === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterAudioDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (mediaLocal) {
          if(!voiceLocal){
            if (this.file === "" || this.fileDescription === "") {
              this.$q.notify({
                html: true,
                message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          } else if(voiceLocal){
            if (this.file === "") {
              this.$q.notify({
                html: true,
                 message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          }
        }
        // envios
        this.sending = true;
        this.sentCount = 0;
        this.totalMessages = numbers.length;

        const delay = ms => new Promise(resolve => {
          const timerId = setTimeout(resolve, ms);
          this.addTimer(timerId);
        });

        try{
          for (let index = 0; index < numbers.length; index++) {
            const number = numbers[index];
            const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
            const randomWhatsapp = this.getRandomWhatsapp();
            
            if (!randomWhatsapp) {
              console.error('Nenhuma conexão WhatsApp disponível');
              continue;
            }
            
            // Notificar qual mensagem está sendo enviada e por qual WhatsApp
            this.$q.notify({
              message: `Mensagem ${index + 1}/${numbers.length} sendo enviada para ${number} via ${randomWhatsapp.label}`,
              type: 'info',
              position: 'top-right',
              timeout: 2000,
              progress: true
            });
            
            try {
              if(text){
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  message: this.message,
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (media) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  media: this.media,
                  mediaUrl: this.mediaUrl,
                  mediaDescription: this.mediaDescription,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (voice) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  voice: this.voice,
                  voiceUrl: this.voiceUrl,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (mediaLocal) {
                if(!voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('mediaLocal', this.mediaLocal?.toString());
                  formData.append('mediaLocalDescription', this.fileDescription?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                } else if(voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('voiceLocal', this.voiceLocal?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                }
              }
              
              this.sentCount++;
              await this.$nextTick();
              await delay(randomDelay);
            } catch (error) {
              console.error(`Erro ao enviar para o número ${number}:`, error);
            }
          }
          
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.messagesSent'),
            type: 'positive',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } catch(e){
          console.error('Erro no envio em massa:', e);
        }
        this.sentCount = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        await this.limparCampos();
        // return;
      }
      if (this.contatosImportar && !this.useTags && !this.useKanban){
        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        const numbers = Array.isArray(this.selectedContacts) 
          ? this.selectedContacts.map(contact => {
              const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
              // Garantir que seja uma string e remover espaços
              return value ? String(value).trim() : null;
            }).filter(Boolean)
          : []
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        const media = this.media
        const text = this.text
        const voice = this.voice
        const mediaLocal = this.mediaLocal
        const voiceLocal = this.voiceLocal
        
        // Criar BulkDispatch antes de enviar
        try {
          const firstWhatsapp = this.selectedWhatsapps && this.selectedWhatsapps.length > 0 ? this.selectedWhatsapps[0] : null;
          const bulkDispatchData = {
            dispatchType: "text",
            totalMessages: numbers.length,
            whatsappId: firstWhatsapp?.value || null,
            message: this.message || null,
            mediaUrl: this.mediaUrl || null,
            mediaDescription: this.mediaDescription || null,
            voiceUrl: this.voiceUrl || null,
            isGroup: this.isGroup,
            minDelay: minInt || null,
            maxDelay: maxInt || null,
            metadata: {
              whatsappType: firstWhatsapp?.type || null,
              media: media || false,
              voice: voice || false,
              mediaLocal: mediaLocal || false,
              voiceLocal: voiceLocal || false,
              contacts: numbers,
              contatosImportar: true,
              multipleWhatsapps: this.selectedWhatsapps.map(w => ({ id: w.value, type: w.type }))
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }
        if (!this.selectedWhatsapps || this.selectedWhatsapps.length === 0) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassa2.notifications.selectConnection'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (isNaN(minInt) || isNaN(maxInt)) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.enterValidNumbers'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (!numbers || numbers.length === 0) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.destiny'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (!text && !media && !voice && !mediaLocal) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.chooseSendOption'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        // checagens
        if(text){
          if (this.message === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMessage'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (media) {
          if (this.mediaUrl === "" || this.mediaDescription === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMediaDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (voice) {
          if (this.voiceUrl === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterAudioDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (mediaLocal) {
          if(!voiceLocal){
            if (this.file === "" || this.fileDescription === "") {
              this.$q.notify({
                html: true,
                message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          } else if(voiceLocal){
            if (this.file === "") {
              this.$q.notify({
                html: true,
                 message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          }
        }
        this.$q.notify({
          html: true,
          message: this.$t('massaTexto.notifications.uploadingMessages'),
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        // envios
        this.sending = true;
        this.sentCount = 0;
        this.totalMessages = numbers.length;

        const delay = ms => new Promise(resolve => {
          const timerId = setTimeout(resolve, ms);
          this.addTimer(timerId);
        });

        try{
          for (let index = 0; index < numbers.length; index++) {
            const number = numbers[index];
            const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
            const randomWhatsapp = this.getRandomWhatsapp();
            
            if (!randomWhatsapp) {
              console.error('Nenhuma conexão WhatsApp disponível');
              continue;
            }
            
            // Notificar qual mensagem está sendo enviada e por qual WhatsApp
            this.$q.notify({
              message: `Mensagem ${index + 1}/${numbers.length} sendo enviada para ${number} via ${randomWhatsapp.label}`,
              type: 'info',
              position: 'top-right',
              timeout: 2000,
              progress: true
            });
            
            try {
              if(text){
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  message: this.message,
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (media) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  media: this.media,
                  mediaUrl: this.mediaUrl,
                  mediaDescription: this.mediaDescription,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (voice) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  voice: this.voice,
                  voiceUrl: this.voiceUrl,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (mediaLocal) {
                if(!voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('mediaLocal', this.mediaLocal?.toString());
                  formData.append('mediaLocalDescription', this.fileDescription?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                } else if(voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('voiceLocal', this.voiceLocal?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                }
              }
              
              this.sentCount++;
              await this.$nextTick();
              await delay(randomDelay);
            } catch (error) {
              console.error(`Erro ao enviar para o número ${number}:`, error);
            }
          }
          
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.messagesSent'),
            type: 'positive',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } catch(e){
          console.error('Erro no envio em massa:', e);
        }
        this.sentCount = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        await this.limparCampos();
        // return;
      }
      if (!this.contatosImportar && !this.useTags && !this.useKanban){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        const media = this.media
        const text = this.text
        const voice = this.voice
        const mediaLocal = this.mediaLocal
        const voiceLocal = this.voiceLocal
        
        // Criar BulkDispatch antes de enviar
        try {
          const firstWhatsapp = this.selectedWhatsapps && this.selectedWhatsapps.length > 0 ? this.selectedWhatsapps[0] : null;
          const bulkDispatchData = {
            dispatchType: "text",
            totalMessages: numbers.length,
            whatsappId: firstWhatsapp?.value || null,
            message: this.message || null,
            mediaUrl: this.mediaUrl || null,
            mediaDescription: this.mediaDescription || null,
            voiceUrl: this.voiceUrl || null,
            isGroup: this.isGroup,
            minDelay: minInt || null,
            maxDelay: maxInt || null,
            metadata: {
              whatsappType: firstWhatsapp?.type || null,
              media: media || false,
              voice: voice || false,
              mediaLocal: mediaLocal || false,
              voiceLocal: voiceLocal || false,
              contacts: numbers,
              multipleWhatsapps: this.selectedWhatsapps.map(w => ({ id: w.value, type: w.type }))
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }
        if (!this.selectedWhatsapps || this.selectedWhatsapps.length === 0) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassa2.notifications.selectConnection'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (isNaN(minInt) || isNaN(maxInt)) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.enterValidNumbers'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (this.numberInput === "") {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.destiny'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        if (!text && !media && !voice && !mediaLocal) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.chooseSendOption'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return;
        }
        // checagens
        if(text){
          if (this.message === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMessage'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (media) {
          if (this.mediaUrl === "" || this.mediaDescription === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterMediaDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (voice) {
          if (this.voiceUrl === "") {
            this.$q.notify({
              html: true,
              message: this.$t('massaTexto.notifications.enterAudioDetails'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            return;
          }
        } if (mediaLocal) {
          if(!voiceLocal){
            if (this.file === "" || this.fileDescription === "") {
              this.$q.notify({
                html: true,
                message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          } else if(voiceLocal){
            if (this.file === "") {
              this.$q.notify({
                html: true,
                 message: this.$t('massaTexto.notifications.uploadFile'),
                type: 'warning',
                progress: true,
                position: 'top',
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              return;
            }
          }
        }
        this.$q.notify({
          html: true,
          message: this.$t('massaTexto.notifications.uploadingMessages'),
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        // envios
        this.sending = true;
        this.sentCount = 0;
        this.totalMessages = numbers.length;

        const delay = ms => new Promise(resolve => {
          const timerId = setTimeout(resolve, ms);
          this.addTimer(timerId);
        });

        try{
          for (let index = 0; index < numbers.length; index++) {
            const number = numbers[index];
            const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
            const randomWhatsapp = this.getRandomWhatsapp();
            
            if (!randomWhatsapp) {
              console.error('Nenhuma conexão WhatsApp disponível');
              continue;
            }
            
            // Notificar qual mensagem está sendo enviada e por qual WhatsApp
            this.$q.notify({
              message: `Mensagem ${index + 1}/${numbers.length} sendo enviada para ${number} via ${randomWhatsapp.label}`,
              type: 'info',
              position: 'top-right',
              timeout: 2000,
              progress: true
            });
            
            try {
              if(text){
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  message: this.message,
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (media) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  media: this.media,
                  mediaUrl: this.mediaUrl,
                  mediaDescription: this.mediaDescription,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (voice) {
                const data = {
                  whatsappId: randomWhatsapp.value,
                  whatsappType: randomWhatsapp.type,
                  arrayNumbers: [number],
                  min: minInt,
                  max: maxInt,
                  groups: this.isGroup,
                  idFront: uid(),
                  sendType: 'chat',
                  voice: this.voice,
                  voiceUrl: this.voiceUrl,
                  bulkDispatchId: this.bulkDispatchId
                };
                await TextoFechar(data)
              } if (mediaLocal) {
                if(!voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('mediaLocal', this.mediaLocal?.toString());
                  formData.append('mediaLocalDescription', this.fileDescription?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                } else if(voiceLocal){
                  const formData = new FormData();
                  formData.append('whatsappId', randomWhatsapp.value);
                  formData.append('whatsappType', randomWhatsapp.type);
                  formData.append('arrayNumbers', number);
                  formData.append('min', minInt?.toString());
                  formData.append('max', maxInt?.toString());
                  formData.append('groups', this.isGroup?.toString());
                  formData.append('idFront', uid());
                  formData.append('sendType', 'chat');
                  formData.append('voiceLocal', this.voiceLocal?.toString());
                  if (this.bulkDispatchId) {
                    formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                  }
                  if (this.file) {
                    formData.append('medias', this.file, this.file.name);
                  }
                  await TextoFechar(formData)
                }
              }
              
              this.sentCount++;
              await this.$nextTick();
              await delay(randomDelay);
            } catch (error) {
              console.error(`Erro ao enviar para o número ${number}:`, error);
            }
          }
          
          this.$q.notify({
            html: true,
            message: this.$t('massaTexto.notifications.messagesSent'),
            type: 'positive',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } catch(e){
          console.error('Erro no envio em massa:', e);
        }
        this.sentCount = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        await this.limparCampos();
        // return;
      }
      this.sending = false;
      this.bulkDispatchId = null;
      await this.limparCampos();
    }
  },
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.massa === true;
    await this.listarEtiquetas()
    await this.listarKanbans()
  }
}
</script>

<style lang="scss" scoped>
.loading-bar {
  width: 100%;
  height: 4px;
  background-color: #ccc;
  position: relative;
}
.loading-bar .bar {
  width: 0;
  height: 100%;
  background-color: #007bff;
  position: absolute;
  top: 0;
  left: 0;
  animation: loadingAnimation 1s infinite;
}
@keyframes loadingAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}
.q-card-section .text-h6, .q-card-section .text-bold {
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
.q-list {
  background: transparent;
}
.q-select, .q-input, .q-toggle {
  border-radius: 8px;
}
.q-banner {
  border-radius: 10px;
  margin-bottom: 0.5rem;
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
}
body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
body.body--dark .q-banner {
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
}
</style>
