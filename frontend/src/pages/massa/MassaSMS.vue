<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
        <q-card-section class="text-h6 text-bold">
          {{ $t('massaSMS.form.selectService') }}
        </q-card-section>
        <q-list class="text-weight-medium">
          <div class="row q-px-md">
            <!-- Seleção do serviço -->
            <div class="col-12 q-py-md">
              <q-select
                v-model="service"
                :options="services"
                :label="$t('massaSMS.form.selectService')"
                outlined
                dense
                style="margin: 1px;"
              />
            </div>

            <!-- Configurações de envio -->
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-input
                v-model="min"
                :label="$t('massaSMS.form.minSeconds')"
                style="margin: 1px;"
                dense
                outlined
              />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-input
                v-model="max"
                :label="$t('massaSMS.form.maxSeconds')"
                style="margin: 1px;"
                dense
                outlined
              />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="contatosImportar"
                :label="$t('massaSMS.form.contacts')"
                dense
              />
            </div>

            <!-- Se importar contatos -->
            <div class="col-12 q-py-md" v-if="contatosImportar">
              <div v-if="loading">{{ $t('grupoMassaUsuarios.loading.fetchingContacts') }}</div>
              <div v-if="loading" class="loading-bar">
                <div class="bar"></div>
              </div>
              <q-select
                v-model="selectedContacts"
                :options="contactOptions"
                :label="$t('massaSMS.form.selectContacts')"
                use-chips
                multiple
                dense
                outlined
                style="margin: 1px;"
              />
            </div>

            <!-- Input de números -->
            <div class="col-9 q-py-md" v-if="!contatosImportar">
              <q-input
                v-model="numberInput"
                :label="$t('massaSMS.form.numbersCommaSeparated')"
                dense
                outlined
                style="margin: 1px;"
              />
            </div>
            <div class="col-3 q-py-md" v-if="!contatosImportar">
              <q-file
                accept=".csv"
                :label="$t('massaSMS.form.importCSV')"
                @update:model-value="handleFileUpload"
                dense
                outlined
                style="margin: 1px;"
                clearable
              />
            </div>

            <!-- Mensagem -->
            <div class="col-12 q-py-md">
              <q-input
                v-model="message"
                type="textarea"
                :label="$t('massaSMS.form.message')"
                style="margin: 1px;"
                autogrow
                dense
                outlined
              />
            </div>

            <!-- Botões -->
            <div class="col-12">
              <q-btn
                :label="$t('common.send')"
                @click="enviar"
                color="primary"
                style="margin-bottom: 15px;margin-right: 5px;"
              />
              <q-btn
                :label="$t('grupoMassa1.actions.clear')"
                @click="limparCampos"
                color="negative"
                style="margin-bottom: 15px;margin-left: 5px;"
              />
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
import { EnviarSMSMassa, EnviarSMSMassaConecta, EnviarSMSMassaLivson } from 'src/service/sms.js';
import { ListarContatos } from 'src/service/contatos.js';

export default {
  name: 'MassaSms',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      service: '', // Serviço selecionado
      services: [
        { label: 'Comtele', value: 'comtele' },
        { label: 'ConectaStartup', value: 'conecta' },
        { label: 'BHI', value: 'livson' }
      ],
      numberInput: '',
      message: '',
      min: '',
      max: '',
      contatosImportar: false,
      loading: false,
      params: {
        hasMore: true
      },
      selectedContacts: [],
      contactOptions: [],
      // Sistema de gerenciamento de memória
      timers: []
    };
  },
  watch: {
    contatosImportar(newVal, oldVal) {
      this.listarContatos();
    }
  },
  methods: {
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
    async listarContatos() {
      this.loading = true;
      this.contactOptions = [];
      this.params.pageNumber = 1;
      this.params.hasMore = true;
      try {
        while (this.params.hasMore) {
          const { data } = await ListarContatos(this.params);
          this.processarContatos(data);
          this.params.hasMore = data.hasMore;
          if (this.params.hasMore) {
            this.params.pageNumber++;
            await new Promise((resolve) => {
              const timerId = setTimeout(resolve, 1000);
              this.addTimer(timerId);
            });
          }
        }
      } catch (error) {
        console.error('Erro ao obter contatos:', error);
      } finally {
        this.loading = false;
      }
    },
    processarContatos(data) {
      const contatosFiltrados = data.contacts.filter((contato) =>
        this.isGroup ? contato.isGroup : !contato.isGroup
      );
      const opcoesContato = contatosFiltrados.map((contato) => ({
        label: contato.name,
        value: contato.number
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
    async enviar() {
      if (!this.service) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('massaSMS.notifications.selectService'),
          position: 'top'
        });
        return;
      }

      const numbers = this.contatosImportar
        ? this.selectedContacts.map((contact) => contact.value)
        : this.numberInput.split(',').map((num) => num.trim());
      const minInt = parseInt(this.min, 10);
      const maxInt = parseInt(this.max, 10);

      if (isNaN(minInt) || isNaN(maxInt)) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('massaSMS.notifications.validMinMax'),
          position: 'top'
        });
        return;
      }

      if (numbers.length === 0 || this.message.trim() === '') {
        this.$q.notify({
          type: 'warning',
          message: this.$t('massaSMS.notifications.enterNumbersMessage'),
          position: 'top'
        });
        return;
      }

      const data = {
        arrayNumbers: numbers,
        message: this.message,
        min: minInt,
        max: maxInt,
        importContact: this.contatosImportar
      };

      try {
        if (this.service.value === 'comtele') {
          await EnviarSMSMassa(data);
          this.$q.notify({
            type: 'positive',
            message: this.$t('massaSMS.notifications.successComtele'),
            position: 'top'
          });
        } else if (this.service.value === 'conecta') {
          await EnviarSMSMassaConecta(data);
          this.$q.notify({
            type: 'positive',
            message: this.$t('massaSMS.notifications.successConecta'),
            position: 'top'
          });
        } else if (this.service.value === 'livson') {
          await EnviarSMSMassaLivson(data);
          this.$q.notify({
            type: 'positive',
            message: this.$t('massaSMS.notifications.successLivson'),
            position: 'top'
          });
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaSMS.notifications.errorSending', { error: error.message }),
          position: 'top'
        });
      }
    },
    async limparCampos() {
      this.message = '';
      this.numberInput = '';
      this.min = '';
      this.max = '';
      this.service = '';
      this.$q.notify({
        type: 'info',
        message: this.$t('massaSMS.notifications.fieldsCleared'),
        position: 'top'
      });
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile');
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
};

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
.q-card-section.text-h6 {
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
