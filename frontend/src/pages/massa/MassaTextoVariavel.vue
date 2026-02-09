<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          <p>{{ $t('massaTexto.form.bulkSend') }}</p>
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
                label="WhatsApp ID"
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
                v-model="isGroup"
                :label="$t('grupoMassa2.form.groups')"
                dense
              />
            </div>

            <div class="col-9 q-py-md" v-if="!contatosImportar">
              <q-input v-model="dataInput" type="textarea" 
              :label="$t('massaTextoVariavel.form.dataInputLabel')"
              dense outlined autogrow />
            </div>
            <div class="col-3 q-py-md" v-if="!contatosImportar">
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
              <p>
                {{ $t('massaTextoVariavel.form.instructions') }}
              </p>
              <!-- <p>{{ $t('massaTextoVariavel.form.example') }}</p> -->

              <q-input v-model="message" type="textarea" label="Mensagem" style="margin: 1px;" autogrow dense outlined />
            </div>
            
            <div v-if="selectedWhatsapps && selectedWhatsapps.length > 0 && selectedWhatsapps.some(w => w?.type !== 'baileys' && w?.type !== 'meow' && w?.type !== 'evo' && w?.type !== 'zapi' && w?.type !== 'uazapi')" class="row q-px-md">
              <div class="col-12 q-py-md" style="margin: 1px;">
                <q-toggle
                  v-model="media"
                  :label="$t('massaTexto.form.includeMedia')"
                  dense
                />
              </div>
            </div>
            <div v-if="media && whatsappId?.type !== 'baileys' && whatsappId?.type !== 'meow' && whatsappId?.type !== 'evo' && whatsappId?.type !== 'zapi' && whatsappId?.type !== 'uazapi'" class="col-12 q-py-md" style="margin: 1px;">
              <q-input v-model="mediaUrl" :label="$t('massaTexto.form.mediaUrl')" dense outlined />
            </div>
            <div v-if="media && whatsappId?.type !== 'baileys' && whatsappId?.type !== 'meow' && whatsappId?.type !== 'evo' && whatsappId?.type !== 'zapi' && whatsappId?.type !== 'uazapi'" class="col-12 q-py-md" style="margin: 1px;">
              <q-input v-model="mediaDescription" type="textarea":label="$t('massaTexto.form.mediaDescription')" dense outlined autogrow />
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
              <q-btn :label="$t('common.send')" :disable="loading" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
              <q-btn :label="$t('grupoMassa1.actions.clear')" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
            </div>

            <div v-if="loading" class="col-12 q-py-md">
              {{ $t('massaTextoVariavel.notifications.messagesSent', {
                sent: sentCount,
                total: totalMessages
              }) }}
              <br />
              {{ $t('massaTextoVariavel.notifications.uploadingMessages') }}
            </div>
            <div v-if="loading" class="loading-bar" style="margin-bottom: 10px;">
              <div class="bar" :style="{ width: progresso + '%' }"></div>
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
import { TextoVariavel } from 'src/service/massa.js'
import { mapGetters } from 'vuex';
import { uid } from 'quasar'
import { CriarBulkDispatch } from 'src/service/bulkDispatch.js'

export default {
  name: 'MassaTexto',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      progresso: 0,
      sentCount: 0,
      totalMessages: 0,
      whatsappId: null,
      selectedWhatsapps: [],
      dataInput: '',
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
      params: {
        hasMore: true
      },
      selectedContacts: [],
      contactOptions: [],
      bulkDispatchId: null,
      // Sistema de gerenciamento de memória
      timers: []
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
        
        const validLines = [];
        
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
            const cleanParts = parts.map(part => part.trim()).filter(part => part !== '');
            if (cleanParts.length > 0) {
              validLines.push(cleanParts.join(','));
              console.log(`Linha válida encontrada: ${cleanParts.join(',')}`);
            }
          } else {
            // Se não tem separador, tratar a linha inteira como válida
            validLines.push(trimmedLine);
            console.log(`Linha válida encontrada: ${trimmedLine}`);
          }
        });

        console.log('Linhas válidas extraídas:', validLines);

        if (validLines.length === 0) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('massaTemplate.notifications.noValidNumbersFound'),
            position: 'top'
          });
          return;
        }

        this.dataInput = validLines.join('\n');
        console.log('Input atualizado com:', this.dataInput);
        console.log(`CSV processado com sucesso: ${validLines.length} linhas válidas encontradas`);
      } catch (error) {
        console.error('Erro ao processar CSV:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTemplate.notifications.errorProcessingCSV'),
          position: 'top'
        });
      }
    },
    handleFileUploadInput(event) {
      this.file = event.target.files[0];
    },
    async limparCampos(){
      this.message = ''
      this.dataInput = ''
      this.min = ''
      this.max = ''
      this.mediaUrl = ''
      this.mediaDescription = ''
      this.voiceUrl = ''
      this.whatsappId = null
      this.selectedWhatsapps = []
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
      if (!this.contatosImportar){
        const lines = this.dataInput.split('\n').filter(line => line.trim() !== '');
        this.sentCount = 0;
        this.totalMessages = lines.length;
        this.progresso = 0;
        await this.$nextTick();
        this.loading = true; 
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)
        const media = this.media
        const text = this.text
        const voice = this.voice
        const mediaLocal = this.mediaLocal
        const voiceLocal = this.voiceLocal
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
          this.loading = false; 
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
          this.loading = false; 
          return;
        }
        if (this.dataInput === "") {
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
          this.loading = false; 
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
          this.loading = false; 
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
            this.loading = false; 
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
            this.loading = false; 
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
            this.loading = false; 
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
              this.loading = false; 
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
              this.loading = false; 
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
        
        // Criar BulkDispatch antes de iniciar o disparo
        try {
          const firstWhatsapp = this.selectedWhatsapps && this.selectedWhatsapps.length > 0 ? this.selectedWhatsapps[0] : null;
          const bulkDispatchData = {
            dispatchType: "text_variable",
            totalMessages: this.totalMessages,
            whatsappId: firstWhatsapp?.value || null,
            message: this.message,
            mediaUrl: this.mediaUrl,
            mediaDescription: this.mediaDescription,
            voiceUrl: this.voiceUrl,
            isGroup: this.isGroup,
            minDelay: minInt,
            maxDelay: maxInt,
            metadata: {
              whatsappType: firstWhatsapp?.type || null,
              media: media === true || media === "true",
              voice: voice === true || voice === "true",
              mediaLocal: mediaLocal === true || mediaLocal === "true",
              voiceLocal: voiceLocal === true || voiceLocal === "true",
              multipleWhatsapps: this.selectedWhatsapps.map(w => ({ id: w.value, type: w.type }))
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }
        
        for (let index = 0; index < lines.length; index++) {
          const line = lines[index];
          const parts = line.split(',').map(item => item.trim());
          const number = parts.shift();
          const formattedMessage = this.message.replace(/{{var\d+}}/g, match => {
            const varIndex = parseInt(match.match(/\d+/)[0]) - 1;
            return parts[varIndex] || '';
          });
          const formattedDescription = this.mediaDescription.replace(/{{var\d+}}/g, match => {
            const varIndex = parseInt(match.match(/\d+/)[0]) - 1;
            return parts[varIndex] || '';
          });
          const formattedFileDescription = this.fileDescription.replace(/{{var\d+}}/g, match => {
            const varIndex = parseInt(match.match(/\d+/)[0]) - 1;
            return parts[varIndex] || '';
          });

          // Função de delay
          const delay = ms => new Promise(resolve => {
            const timerId = setTimeout(resolve, ms);
            this.addTimer(timerId);
          });
          const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
          const randomWhatsapp = this.getRandomWhatsapp();
          
          if (!randomWhatsapp) {
            console.error('Nenhuma conexão WhatsApp disponível');
            continue;
          }

          // Notificar qual mensagem está sendo enviada e por qual WhatsApp
          this.$q.notify({
            message: `Mensagem ${index + 1}/${lines.length} sendo enviada para ${number} via ${randomWhatsapp.label}`,
            type: 'info',
            position: 'top-right',
            timeout: 2000,
            progress: true
          });

          // envios
          try {
            if(text){
              const data = {
                whatsappId: randomWhatsapp.value,
                whatsappType: randomWhatsapp.type,
                // number: parseInt(number, 10),
                number: number,
                message: formattedMessage,
                min: minInt,
                max: maxInt,
                groups: this.isGroup,
                idFront: uid(),
                sendType: 'chat',
                bulkDispatchId: this.bulkDispatchId
              };
              await TextoVariavel(data)
            } if (media) {
              const data = {
                whatsappId: randomWhatsapp.value,
                whatsappType: randomWhatsapp.type,
                // number: parseInt(number, 10),
                number: number,
                // message: formattedMessage,
                min: minInt,
                max: maxInt,
                groups: this.isGroup,
                idFront: uid(),
                sendType: 'chat',
                media: this.media,
                mediaUrl: this.mediaUrl,
                mediaDescription: formattedDescription,
                bulkDispatchId: this.bulkDispatchId
              };
              await TextoVariavel(data)
            } if (voice) {
              const data = {
                whatsappId: randomWhatsapp.value,
                whatsappType: randomWhatsapp.type,
                // number: parseInt(number, 10),
                number: number,
                min: minInt,
                max: maxInt,
                groups: this.isGroup,
                idFront: uid(),
                sendType: 'chat',
                voice: this.voice,
                voiceUrl: this.voiceUrl,
                bulkDispatchId: this.bulkDispatchId
              };
              await TextoVariavel(data)
            } if (mediaLocal) {
              if(!voiceLocal){
                const formData = new FormData();
                formData.append('whatsappId', randomWhatsapp.value);
                formData.append('whatsappType', randomWhatsapp.type);
                // formData.append('number', parseInt(number, 10));
                formData.append('number', number);
                formData.append('min', minInt?.toString());
                formData.append('max', maxInt?.toString());
                formData.append('groups', this.isGroup?.toString());
                formData.append('idFront', uid());
                formData.append('sendType', 'chat');
                formData.append('mediaLocal', this.mediaLocal?.toString());
                formData.append('mediaLocalDescription', formattedFileDescription?.toString());
                if (this.bulkDispatchId) {
                  formData.append('bulkDispatchId', this.bulkDispatchId.toString());
                }
                if (this.file) {
                  formData.append('medias', this.file, this.file.name);
                }
                await TextoVariavel(formData)
              } else if(voiceLocal){
                const formData = new FormData();
                formData.append('whatsappId', randomWhatsapp.value);
                formData.append('whatsappType', randomWhatsapp.type);
                // formData.append('number', parseInt(number, 10));
                formData.append('number', number);
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
                await TextoVariavel(formData)
              }
            }
            
            this.sentCount++;
            this.progresso = (this.sentCount / this.totalMessages) * 100;
            await this.$nextTick();
          } catch (error) {
            console.error(`Erro ao enviar para o número ${number}:`, error);
          }
          
          await delay(randomDelay);
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
        
        this.sentCount = 0;
        this.totalMessages = 0;
        this.loading = false; 
        this.bulkDispatchId = null;
        await this.limparCampos();
        return;
      }
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.massa === true;
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="sass">
.loading-bar
  width: 100%
  height: 4px
  background-color: #ccc
  position: relative
  
  .bar
    width: 0
    height: 100%
    background-color: #007bff
    position: absolute
    top: 0
    left: 0
    animation: loadingAnimation 1s infinite
  
@keyframes loadingAnimation
  0%
    width: 0
  100%
    width: 100%

.blur-effect 
  filter: blur(0px)
</style>

<style lang="scss" scoped>
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
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.11);
    background: rgba(var(--q-primary-rgb), 0.09);
  }
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
