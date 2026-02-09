<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
        <q-card-section class="text-h6 text-bold">
          {{ $t('massaTemplate.title') }}
        </q-card-section>
        <q-banner style="margin-top: 10px" class="bg-yellow text-black" inline-actions>
           <p>{{ $t('massaTexto.form.availableFunctionsWaba') }}</p>
        </q-banner>
        <q-list class="text-weight-medium">
          <div class="row q-px-md">
            <div class="col-3 q-py-md">
              <q-select
                style="margin: 1px;"
                v-model="whatsappId"
                :options="cSessionsOptions"
                label="WhatsApp ID"
                dense
                outlined
              />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-input v-model="min" :label="$t('massaTexto.form.minSeconds')" style="margin: 1px;" dense outlined />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-input v-model="max" :label="$t('massaTexto.form.maxSeconds')" style="margin: 1px;" dense outlined />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="contatosImportar"
                :label="$t('massaTexto.form.contacts')"
                dense
              />
            </div>
            <div class="col-3 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="fecharTicket"
                :label="$t('massaTemplate.form.closeTicket')"
                dense
              />
            </div>
            <div class="col-4 q-py-md" style="margin: 1px;">
              <q-toggle
                style="margin: 1px;"
                v-model="useTags"
                :label="$t('massaTexto.form.selectTag')"
                dense
              />
            </div>
            <div class="col-12 q-py-md" v-if="useTags">
              <div v-if="loading">{{ $t('grupoMassaUsuarios.loading.fetchingContacts') }}</div>
              <div v-if="loading" class="loading-bar">
                <div class="bar"></div>
              </div>
              <q-select
                v-model="selectedTag"
                :options="tagOptions"
                :label="$t('massaTemplate.form.selectTag')"
                dense
                outlined
                style="margin: 1px;"
                @update:model-value="filtrarContatosPorEtiqueta"
              />
            </div>
            <div class="col-12 q-py-md" v-if="contatosImportar && !useTags">
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
              />
            </div>
            <div class="col-9 q-py-md" v-if="!contatosImportar && !useTags">
              <q-input
                v-model="numberInput"
                :label="$t('grupoMassaUsuarios.form.numbersCommaSeparated')"
                dense
                outlined
                style="margin: 1px;"
              />
            </div>
            <div class="col-3 q-py-md" v-if="!contatosImportar && !useTags">
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
            <div class="col-12 q-py-md">
              <q-btn :label="$t('massaTemplate.form.selectTemplate')" @click="buscarTemplateWaba()" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
              <!-- <q-btn
                flat
                dense
                class="bg-padrao btn-rounded q-mx-xs"
                :color="$q.dark.isActive ? 'white' : ''"
                @click="buscarTemplateWaba()"
              > Selecionar Template
                <q-tooltip content-class="text-bold"> Templates </q-tooltip>
              </q-btn> -->
            </div>
            <div v-if="sending" class="col-12 q-py-md">
              {{ $t('massaTemplate.notifications.messagesSent', {
                sent: sentCount,
                total: totalMessages
              }) }}
              <br />
              {{ $t('massaTemplate.notifications.uploadingMessages') }}
            </div>
            <!-- <div v-if="sending">
              Mensagens enviadas: {{ sentCount }} de {{ contatosImportar ? selectedContacts.length : numberInput.split(',').length }}
              <br>
              Aguarde, enviando as mensagens... Não feche essa página até a conclusão do envio.
            </div> -->
            <div v-if="sending" class="loading-bar" style="margin-bottom: 10px;">
              <div class="bar"></div>
            </div>
          </div>
        </q-list>
      </q-card>
    </div>

    <q-dialog v-model="modalVisivelTemplate" position="standard" @hide="fecharModalTemplate">
      <q-card style="min-width: 500px">
        <q-card-section class="q-pa-md">
          <div class="q-gutter-sm row items-center">
            <div class="col-12">
              <q-select
                v-model="selectedTemplate"
                :options="templates.map(template => ({ label: `${template.name} (ID: ${template.id}, Lang: ${template.language})`, value: template }))"
                :label="$t('massaTemplate.form.chooseTemplate')"
                filled
                outlined
                dense
                bg-color="grey-2"
                color="grey-7"
                style="margin: 10px;"
                @update:model-value="handleTemplateSelection"
              />
            </div>
            <div class="col-12" v-if="selectedTemplateComponents.length > 0">
              <div v-for="(input, index) in selectedTemplateComponents" :key="index">
                <q-input
                  v-model="input.value"
                  :label="input.label"
                  filled
                  outlined
                  dense
                  bg-color="grey-2"
                  color="grey-7"
                  style="margin: 10px;"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator spaced />
        <q-card-section>
          <q-table
            flat
            :rows="templateDetails"
            :columns="[
              { name: 'label', align: 'left', label: 'Variável', field: 'label' },
              { name: 'value', align: 'left', label: 'Valor', field: 'value' }
            ]"
            row-key="label"
            dense
            separator="horizontal"
            class="q-mb-md"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.send')"
            color="primary"
            :disabled="!selectedTemplate || sending"
            @click="enviarTemplateSelecionado"
          />
          <q-btn
            :label="$t('common.sendMarketing')"
            color="primary"
            :disabled="!selectedTemplate || sending"
            @click="enviarTemplateSelecionadoMarketing"
          />
          <q-btn
            :label="$t('common.cancel')"
            color="negative"
            @click="fecharModalTemplate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { EnviarTemplateComponenteWaba, EnviarTemplateMarketingComponenteWaba, BuscarTemplates } from 'src/service/waba.js'
import { ListarContatos, ListarContatosPorEtiquetaEspecifica, ObterContatoPeloNumero, CriarContato } from 'src/service/contatos.js'
import { VerificarTicketsAbertos, CriarTicket, AtualizarStatusTicket } from 'src/service/tickets.js'
import { mapGetters } from 'vuex';
import { uid } from 'quasar'
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { CriarBulkDispatch } from 'src/service/bulkDispatch.js'

export default {
  name: 'MassaSms',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      sentCount: 0,
      totalMessages: 0, 
      templateDetails: [
        { label: 'Nome', value: '{{name}}' },
        { label: 'Saudação', value: '{{greeting}}' },
        { label: 'Protocolo', value: '{{protocol}}' },
        { label: 'E-mail (se existir)', value: '{{email}}' },
        { label: 'Telefone', value: '{{phoneNumber}}' },
        { label: 'Kanban (se existir)', value: '{{kanban}}' },
        { label: 'Atendente (se em atendimento)', value: '{{user}}' },
        { label: 'E-mail Atendente (se em atendimento)', value: '{{userEmail}}' },
        { label: 'Primeiro Nome (se existir)', value: '{{firstName}}' },
        { label: 'Sobrenome (se existir)', value: '{{lastName}}' },
        { label: 'Empresa (se existir)', value: '{{businessName}}' }
      ],
      useTags: false,
      selectedTag: null,
      tagOptions: [],
      loading: false,
      whatsappId: null,
      whatsapp: null,
      numberInput: '',
      min: '',
      max: '',
      contatosImportar: false,
      fecharTicket: true,
      sending: false,
      params: {
        hasMore: true
      },
      selectedContacts: [],
      contactOptions: [],
      modalVisivelTemplate: false,
      templates: [],
      cacheStatus: {
        ultimaAtualizacao: null,
        tempoRestante: 0,
        usandoCache: false
      },
      selectedTemplate: null,
      selectedTemplateComponents: [],
      bulkDispatchId: null,
      // Sistema de gerenciamento de memória
      timers: [],
    }
  },
  watch: {
    contatosImportar(newVal, oldVal) {
      this.listarContatos();
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => w.type === 'waba' && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, tokenAPI: w.tokenAPI, phone_number_id: w.wabaId, bmToken: w.bmToken, wabaVersion: w.wabaVersion }))
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
    // Função auxiliar para buscar ou criar contato e ticket
    async buscarOuCriarContatoETicket(phoneNumber) {
      try {
        // Limpar número de telefone
        const numeroLimpo = phoneNumber.replace(/\D/g, '');
        
        if (!numeroLimpo || numeroLimpo.length < 8) {
          throw new Error(`Número de telefone inválido: ${phoneNumber}`);
        }
        
        // 1. Buscar ou criar contato
        let contact;
        try {
          const { data } = await ObterContatoPeloNumero(numeroLimpo);
          contact = data;
          console.log('Contato encontrado:', contact);
        } catch (error) {
          // Contato não existe, criar um novo
          console.log('Contato não encontrado, criando novo contato para:', numeroLimpo);
          const novoContato = {
            name: phoneNumber || `Contato ${numeroLimpo}`,
            number: String(numeroLimpo), // Garantir que é string
            email: '',
            extraInfo: [],
            wallets: [],
            tags: [],
            cpf: '',
            birthdayDate: '',
            firstName: '',
            lastName: '',
            businessName: '',
          };
          
          try {
            const { data } = await CriarContato(novoContato);
            contact = data;
            console.log('Contato criado com sucesso:', contact);
          } catch (createError) {
            console.error('Erro ao criar contato:', createError);
            // Se o erro for 409, pode ser que o contato foi criado em outra requisição
            const errorStatus = createError.response?.status || createError.status;
            const errorData = createError.response?.data || createError.data;
            
            if (errorStatus === 409 && errorData) {
              // Tentar buscar novamente
              try {
                const { data } = await ObterContatoPeloNumero(numeroLimpo);
                contact = data;
                console.log('Contato encontrado após erro 409:', contact);
              } catch (retryError) {
                throw new Error(`Não foi possível criar ou buscar contato: ${retryError.message}`);
              }
            } else {
              throw new Error(`Erro ao criar contato: ${createError.message || 'Erro desconhecido'}`);
            }
          }
        }
        
        // Validar que o contato foi criado/buscado corretamente
        if (!contact || !contact.id) {
          throw new Error('Contato criado/buscado não possui ID válido');
        }

        // 2. Buscar userId de múltiplas fontes
        let userId = null;
        try {
          userId = this.$store.getters.user?.id || 
                   this.$store.getters.user?.userId ||
                   (JSON.parse(localStorage.getItem('usuario') || '{}'))?.userId ||
                   (JSON.parse(localStorage.getItem('usuario') || '{}'))?.id;
        } catch (e) {
          console.warn('Não foi possível obter userId:', e);
        }

        // 3. Buscar ou criar ticket
        let ticket;
        try {
          // Verificar se os IDs são válidos
          if (!contact.id) {
            throw new Error(`Contato sem ID válido. Contato: ${JSON.stringify(contact)}`);
          }
          
          if (!this.whatsappId || !this.whatsappId.value) {
            throw new Error('WhatsApp ID não selecionado ou inválido');
          }
          
          console.log('Buscando ticket para contato:', contact.id, 'whatsapp:', this.whatsappId.value);
          const response = await VerificarTicketsAbertos(contact.id, this.whatsappId.value);
          console.log('Resposta VerificarTicketsAbertos:', response);
          
          // Verificar se a resposta contém um ticket válido
          // Pode ser um objeto direto ou um array
          if (response && response.data) {
            if (Array.isArray(response.data) && response.data.length > 0) {
              // Se for array, pegar o primeiro ticket aberto
              ticket = response.data.find(t => t.status === 'open') || response.data[0];
              console.log('Ticket encontrado (array):', ticket);
            } else if (response.data.id && response.data.contactId && response.data.status) {
              // Se for um objeto direto com as propriedades necessárias
              ticket = response.data;
              console.log('Ticket encontrado (objeto):', ticket);
            } else {
              console.log('Resposta não contém ticket válido:', response.data);
            }
          } else {
            console.log('Resposta vazia ou sem data:', response);
          }
        } catch (error) {
          console.log('Erro ao buscar ticket:', error);
          // Axios retorna erros em error.response
          const errorStatus = error.response?.status || error.status;
          const errorData = error.response?.data || error.data;
          
          console.log('Status do erro:', errorStatus, 'Data:', errorData);
          
          // Se o erro for 409 (Conflict), significa que já existe um ticket
          if (errorStatus === 409 && errorData) {
            console.log('Erro 409 detectado, tentando extrair ticket...');
            // Verificar se o ticket está na propriedade 'ticket' ou se precisa fazer parse do 'error'
            if (errorData.ticket) {
              ticket = errorData.ticket;
              console.log('Ticket extraído de errorData.ticket:', ticket);
            } else if (errorData.error) {
              try {
                const ticketAtual = typeof errorData.error === 'string' 
                  ? JSON.parse(errorData.error) 
                  : errorData.error;
                ticket = ticketAtual;
                console.log('Ticket extraído de errorData.error:', ticket);
              } catch (parseError) {
                console.warn('Erro ao fazer parse do ticket do erro:', parseError);
                // Se não conseguir fazer parse, tentar usar o erro como está
                if (errorData.error && typeof errorData.error === 'object') {
                  ticket = errorData.error;
                  console.log('Ticket usado diretamente de errorData.error:', ticket);
                }
              }
            }
          } else {
            console.log('Erro não é 409, continuando para criar ticket...');
          }
        }
        
        // Se ainda não encontrou um ticket, criar um novo
        if (!ticket || !ticket.id) {
          console.log('Ticket não encontrado, criando novo ticket...');
          try {
            const ticketData = {
              contactId: contact.id,
              isActiveDemand: true,
              userId: userId,
              channel: 'waba',
              channelId: this.whatsappId.value,
              status: 'open'
            };
            console.log('Dados do ticket a criar:', ticketData);
            const responseTicket = await CriarTicket(ticketData);
            console.log('Resposta completa CriarTicket:', responseTicket);
            
            // Verificar diferentes formatos de resposta
            if (responseTicket.data) {
              ticket = responseTicket.data;
            } else if (responseTicket) {
              ticket = responseTicket;
            } else {
              throw new Error('Resposta de CriarTicket não contém dados válidos');
            }
            
            console.log('Ticket criado com sucesso:', ticket);
            
            // Validar que o ticket foi criado corretamente
            if (!ticket || !ticket.id) {
              console.error('Ticket criado mas sem ID válido:', ticket);
              throw new Error('Ticket criado mas não possui ID válido');
            }
          } catch (createError) {
            console.error('Erro ao criar ticket:', createError);
            // Axios retorna erros em error.response
            const errorStatus = createError.response?.status || createError.status;
            const errorData = createError.response?.data || createError.data;
            
            console.log('Status do erro ao criar:', errorStatus, 'Data:', errorData);
            
            // Se falhar ao criar, pode ser que já existe (erro 409)
            if (errorStatus === 409 && errorData) {
              console.log('Erro 409 ao criar ticket, tentando extrair ticket existente...');
              if (errorData.ticket) {
                ticket = errorData.ticket;
                console.log('Ticket extraído de errorData.ticket:', ticket);
              } else if (errorData.error) {
                try {
                  const ticketAtual = typeof errorData.error === 'string' 
                    ? JSON.parse(errorData.error) 
                    : errorData.error;
                  ticket = ticketAtual;
                  console.log('Ticket extraído de errorData.error:', ticket);
                } catch (parseError) {
                  console.error('Erro ao fazer parse do ticket do erro 409:', parseError);
                  // Se não conseguir fazer parse, tentar usar o erro como está
                  if (errorData.error && typeof errorData.error === 'object') {
                    ticket = errorData.error;
                    console.log('Ticket usado diretamente de errorData.error:', ticket);
                  } else {
                    throw createError;
                  }
                }
              }
            } else {
              console.error('Erro ao criar ticket (não é 409):', createError);
              throw createError;
            }
          }
        }
        
        // Garantir que temos um ticket válido
        if (!ticket || !ticket.id) {
          console.error('Ticket inválido:', ticket);
          console.error('Contato:', contact);
          throw new Error(`Não foi possível obter ou criar um ticket válido. Contato ID: ${contact?.id}, Ticket: ${JSON.stringify(ticket)}`);
        }

        console.log('Retornando contato e ticket:', { contactId: contact.id, ticketId: ticket.id });
        return { contact, ticket };
      } catch (error) {
        console.error('Erro ao buscar/criar contato e ticket:', error);
        throw error;
      }
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
    async filtrarContatosPorEtiqueta() {
      if (this.selectedTag) {
        this.loading = true;
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
            message: this.$t('massaTemplate.notifications.errorFetchingTags'),
          });
        } finally {
          this.loading = false;
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
        tags: contato.tags
      }));
      this.contactOptions = [...this.contactOptions, ...opcoesContato];
    },
    handleCSVUpload(event) {
      try {
        console.log('Evento recebido:', event);
        
        let file = null;
        
        // Tentar obter o arquivo do evento
        if (event && event.target && event.target.files && event.target.files[0]) {
          file = event.target.files[0];
        } else if (event && event.files && event.files[0]) {
          // Para eventos do Quasar
          file = event.files[0];
        } else if (this.$refs.csvInput && this.$refs.csvInput.$el) {
          // Fallback usando ref
          const inputElement = this.$refs.csvInput.$el.querySelector('input[type="file"]');
          if (inputElement && inputElement.files && inputElement.files[0]) {
            file = inputElement.files[0];
          }
        }

        if (!file) {
          console.warn('Nenhum arquivo selecionado ou evento inválido');
          return;
        }

        console.log('Arquivo selecionado:', file);

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
    handleTemplateSelection(templateWrapper) {
      this.selectedTemplateComponents = [];

      const template = templateWrapper.value;

      if (template && template.components) {
        template.components.forEach(component => {
          if (component.type === 'HEADER') {
            if (component.format === 'VIDEO' || component.format === 'IMAGE' || component.format === 'DOCUMENT') {
              this.selectedTemplateComponents.push({
                label: this.$t('massaTemplate.form.headerFormat', { format: component.format.toLowerCase() }),
                // label: `URL do Header (${component.format.toLowerCase()})`,
                value: '',
                key: `header_${component.format.toLowerCase()}`
              });
            }
          }

          if (component.type === 'BODY') {
            if (template.parameter_format === 'NAMED' && component.example?.body_text_named_params) {
              return
              // Novo formato NAMED
              component.example.body_text_named_params.forEach(param => {
                this.selectedTemplateComponents.push({
                  // label: `Valor da variável ${param.param_name}`,
                  label: this.$t('massaTemplate.form.variableNumber', { number }),
                  value: '',
                  key: `named_variable_${param.param_name}`
                });
              });
            } else {
              const variableMatches = component.text.match(/{{\d+}}/g);
              if (variableMatches) {
                variableMatches.forEach(variable => {
                  const variableNumber = variable.replace(/{{|}}/g, '');
                  this.selectedTemplateComponents.push({
                    label: this.$t('massaTemplate.form.variableNumber', { variableNumber }),
                    // label: `Valor da variável ${variableNumber}`,
                    value: '',
                    key: `variable_${variableNumber}`
                  });
                });
              }
            }
          }

          if (component.type === 'BUTTONS' && component.buttons) {
            component.buttons.forEach((button, index) => {
              this.selectedTemplateComponents.push({
                label: `Button ${index + 1}: ${button.text}`,
                value: button.text,
                key: `button_${index + 1}`
              });

              // Se houver um exemplo para o botão, adicionamos também
              // if (button.example && button.example.length > 0) {
              //   button.example.forEach((exampleValue, exampleIndex) => {
              //     this.selectedTemplateComponents.push({
              //       label: `Exemplo Botão ${index + 1} - Opção ${exampleIndex + 1}`,
              //       value: exampleValue,
              //       key: `button_example_${index + 1}_${exampleIndex + 1}`
              //     });
              //   });
              // }
            });
          }
        });
      }
    },
    // handleTemplateSelection(templateWrapper) {
    //   this.selectedTemplateComponents = [];
      
    //   const template = templateWrapper.value;
    //   console.log('template >>>>>>>>>', template)

    //   if (template && template.components) {
    //     template.components.forEach(component => {
    //       if (component.type === 'HEADER') {
    //         if (component.format === 'VIDEO' || component.format === 'IMAGE' || component.format === 'DOCUMENT') {
    //           this.selectedTemplateComponents.push({
    //             label: `URL do Header (${component.format.toLowerCase()})`,
    //             value: '',
    //             key: `header_${component.format.toLowerCase()}`
    //           });
    //         } 
    //       }

    //       if (component.type === 'BODY') {
    //         const variableMatches = component.text.match(/{{\d+}}/g);
    //         if (variableMatches) {
    //           variableMatches.forEach(variable => {
    //             const variableNumber = variable.replace(/{{|}}/g, '');
    //             this.selectedTemplateComponents.push({
    //               label: `Valor da variável ${variableNumber}`,
    //               value: '',
    //               key: `variable_${variableNumber}`
    //             });
    //           });
    //         }
    //       }
    //     });
    //   }
    // },
    async enviarTemplateSelecionado() {
      if (!this.selectedTemplate || !this.selectedTemplate.value) {
        console.error(this.$t('massaTemplate.notifications.errorSendingTemplate'));
        return;
      }

      console.log('selectedTemplate', this.selectedTemplate);

      if(!this.useTags){
        if (!this.min) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMinTime'),
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
        if (!this.max) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMaxTime'),
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

        this.sending = true; 
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)

        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        let contacts = this.contatosImportar 
          ? (Array.isArray(this.selectedContacts) 
              ? this.selectedContacts.map(contact => {
                  const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
                  // Garantir que seja uma string e remover espaços
                  return value ? String(value).trim() : null;
                }).filter(Boolean)
              : [])
          : this.numberInput.split(',').map(contact => contact.trim()).filter(contact => contact !== '');

        if (contacts.length <= 0) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseContact'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.sending = false; 
          return;
        }

        this.totalMessages = contacts.length;
        this.sentCount = 0;

        this.$q.notify({
          html: true,
          message: this.$t('massaTemplate.notifications.uploadingMessages'),
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
          const hasVariables = this.selectedTemplateComponents && this.selectedTemplateComponents.some(c => c.key && c.key.startsWith('variable'));
          const bulkDispatchData = {
            dispatchType: hasVariables ? "template_variable" : "template",
            totalMessages: contacts.length,
            whatsappId: this.whatsappId.value,
            templateName: this.selectedTemplate.value.name,
            templateLanguage: this.selectedTemplate.value.language,
            isMarketing: false,
            minDelay: minInt,
            maxDelay: maxInt,
            metadata: {
              contacts: contacts,
              components: this.selectedTemplateComponents
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }

        for (const phoneNumber of contacts) {

          const delay = ms => new Promise(resolve => {
            const timerId = setTimeout(resolve, ms);
            this.addTimer(timerId);
          });
          const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
          
          try {
            // Buscar ou criar contato e ticket
            const { ticket } = await this.buscarOuCriarContatoETicket(phoneNumber);
            
            const payload = {
              from: phoneNumber,
              phone_number_id: this.whatsappId.tokenAPI,
              ticketId: ticket.id,
              idFront: uid(),
              language: this.selectedTemplate.value.language,
              templateName: this.selectedTemplate.value.name,
              components: [],
              read: 1,
              fromMe: true,
              mediaUrl: '',
              body: JSON.stringify(this.selectedTemplate.value.components),
              scheduleDate: null,
              quotedMsg: null,
              tokenApi: this.whatsappId.tokenAPI,
              mediaType: 'templates',
              sendType: 'templates',
            };

            if (this.selectedTemplateComponents && this.selectedTemplateComponents.length) {
              this.selectedTemplateComponents.forEach(input => {
                if (input.value == null) {
                  console.error(`O valor do componente ${input.key} é nulo ou indefinido. Pulando esse componente.`);
                  return;
                }
                
                if (input.key.startsWith('header')) {
                  let format = '';
                  if (input.key === 'header_video') format = 'VIDEO';
                  if (input.key === 'header_image') format = 'IMAGE';
                  if (input.key === 'header_document') format = 'DOCUMENT';
                  if (input.key === 'header_text') format = 'TEXT';

                  payload.components.push({
                    type: 'HEADER',
                    format: format,
                    value: input.value
                  });
                } else if (input.key.startsWith('variable')) {
                  const variableNumber = input.key.replace('variable_', '');
                  if (!payload.components.some(component => component.type === 'BODY')) {
                    payload.components.push({
                      type: 'BODY',
                      variables: []
                    });
                  }
                  const bodyComponent = payload.components.find(component => component.type === 'BODY');
                  // Garante que o array tenha o tamanho adequado
                  while (bodyComponent.variables.length < variableNumber) {
                    bodyComponent.variables.push('');
                  }
                  bodyComponent.variables[variableNumber - 1] = input.value;
                } else if (input.key.startsWith('named_variable')) {
                  const variableName = input.key.replace('named_variable_', '');
                  const bodyComponent = payload.components.find(c => c.type === 'BODY') || { type: 'BODY', parameters: [] };
                  if(variableName === 'nome'){
                    bodyComponent.parameters.push({
                      type: 'text',
                      text: input.value || '',
                      name: 'name'
                  })
                  } if(variableName === 'texto'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'text'
                    })
                  } if(variableName === 'number'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'number'
                    })
                  }

                  if (!payload.components.some(c => c.type === 'BODY')) {
                      payload.components.push(bodyComponent);
                  }
                } else if (input.key.startsWith('button_') || input.key.includes('button_')) {
                  // Obtendo o índice do botão
                  const buttonIndex = parseInt(input.key.replace('button_url_', '').replace('button_', '')) - 1;

                  // Obtendo o tipo do botão dinamicamente do template selecionado
                  const selectedButton = this.selectedTemplate.value.components
                    .find(c => c.type === 'BUTTONS')?.buttons?.[buttonIndex];

                  if (selectedButton) {
                    // Botões URL e PHONE_NUMBER não devem ser incluídos nos components pois já estão definidos no template
                    // e não aceitam parâmetros dinâmicos
                    if (selectedButton.type === 'URL' || selectedButton.type === 'PHONE_NUMBER') {
                      // Não adicionar botões URL ou PHONE_NUMBER aos components
                      return;
                    }

                    const subType = selectedButton.type === 'COPY_CODE' ? 'copy_code' : 
                                  selectedButton.type === 'FLOW' ? 'flow' :
                                  selectedButton.type === 'CATALOG' ? 'catalog' : 'quick_reply';

                    if (!payload.components.some(c => c.type === 'BUTTONS')) {
                      payload.components.push({
                        type: 'BUTTONS',
                        buttons: []
                      });
                    }

                    const buttonsComponent = payload.components.find(c => c.type === 'BUTTONS');

                    if (selectedButton.type === 'FLOW') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'flow',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else if (selectedButton.type === 'CATALOG') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'catalog',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else {
                      buttonsComponent.buttons.push({
                        type: selectedButton.type,
                        sub_type: subType,
                        index: buttonIndex,
                        parameters: [
                          {
                            type: 'text',
                            text: input.value || ''
                          }
                        ]
                      });
                    }
                  }
                }
              });
            } else {
              console.log("selectedTemplateComponents warn 0");
            }

            // Filtrar botões URL e PHONE_NUMBER dos components antes de enviar
            // Botões URL e PHONE_NUMBER não devem ser incluídos pois já estão definidos no template
            payload.components = payload.components.map(component => {
              if (component.type === 'BUTTONS' && component.buttons) {
                const filteredButtons = component.buttons.filter(button => {
                  // Filtrar botões URL e PHONE_NUMBER (case-insensitive)
                  const isUrl = button.type === 'URL' || 
                               button.type === 'url' || 
                               button.sub_type === 'url' || 
                               button.sub_type === 'URL';
                  const isPhoneNumber = button.type === 'PHONE_NUMBER' || 
                                       button.type === 'phone_number' ||
                                       button.sub_type === 'phone_number' ||
                                       button.sub_type === 'PHONE_NUMBER';
                  if (isUrl) {
                    console.log('Botão URL removido dos components:', button);
                    return false;
                  }
                  if (isPhoneNumber) {
                    console.log('Botão PHONE_NUMBER removido dos components:', button);
                    return false;
                  }
                  return true;
                });
                
                // Se não há mais botões, remover o componente BUTTONS
                if (filteredButtons.length === 0) {
                  return null;
                }
                
                return {
                  ...component,
                  buttons: filteredButtons
                };
              }
              return component;
            }).filter(component => component !== null); // Remover componentes nulos

            console.log('payload', payload)
            const response = await EnviarTemplateComponenteWaba({ 
              ...payload, 
              dataJson: JSON.stringify(payload.components),
              isBulkDispatch: true,
              contacts: contacts,
              bulkDispatchId: this.bulkDispatchId
            });
            console.log('Template enviado com sucesso para:', phoneNumber, response.data);
            
            // Atualizar status do ticket para fechado e userId para null (se a opção estiver marcada)
            if (this.fecharTicket) {
              try {
                await AtualizarStatusTicket(ticket.id, 'closed', null);
                console.log('Ticket fechado com sucesso:', ticket.id);
              } catch (updateError) {
                console.error('Erro ao atualizar status do ticket:', updateError);
              }
            }
            
            this.sentCount++;
            await delay(randomDelay);
          } catch (error) {
            console.error('Erro ao enviar template para:', phoneNumber, error);
          }
        }

        this.sentCount = 0;
        this.totalMessages = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        this.fecharModalTemplate();
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 500);
        this.addTimer(timerId);
      }

      if(this.useTags){
        console.log('2', this.selectedContacts)
        if (!this.min) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMinTime'),
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
        if (!this.max) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMaxTime'),
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

        this.sending = true; 
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)

        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        let contacts = Array.isArray(this.selectedContacts) 
          ? this.selectedContacts.map(contact => {
              const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
              // Garantir que seja uma string e remover espaços
              return value ? String(value).trim() : null;
            }).filter(Boolean)
          : [];
        console.log('3', this.selectedContacts)

        if (contacts.length <= 0) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseContact'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.sending = false; 
          return;
        }

        this.totalMessages = contacts.length;
        this.sentCount = 0;

        this.$q.notify({
          html: true,
          message: this.$t('massaTemplate.notifications.uploadingMessages'),
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
          const hasVariables = this.selectedTemplateComponents && this.selectedTemplateComponents.some(c => c.key && c.key.startsWith('variable'));
          const bulkDispatchData = {
            dispatchType: hasVariables ? "template_variable" : "template",
            totalMessages: contacts.length,
            whatsappId: this.whatsappId.value,
            templateName: this.selectedTemplate.value.name,
            templateLanguage: this.selectedTemplate.value.language,
            isMarketing: false,
            minDelay: minInt,
            maxDelay: maxInt,
            metadata: {
              contacts: contacts,
              components: this.selectedTemplateComponents
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }

        for (const phoneNumber of contacts) {

          const delay = ms => new Promise(resolve => {
            const timerId = setTimeout(resolve, ms);
            this.addTimer(timerId);
          });
          const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
          
          try {
            // Buscar ou criar contato e ticket
            const { ticket } = await this.buscarOuCriarContatoETicket(phoneNumber);
            
            const payload = {
              from: phoneNumber,
              phone_number_id: this.whatsappId.tokenAPI,
              ticketId: ticket.id,
              idFront: uid(),
              language: this.selectedTemplate.value.language,
              templateName: this.selectedTemplate.value.name,
              components: [],
              read: 1,
              fromMe: true,
              mediaUrl: '',
              body: JSON.stringify(this.selectedTemplate.value.components),
              scheduleDate: null,
              quotedMsg: null,
              tokenApi: this.whatsappId.tokenAPI,
              mediaType: 'templates',
              sendType: 'templates',
            };

            if (this.selectedTemplateComponents && this.selectedTemplateComponents.length) {
              this.selectedTemplateComponents.forEach(input => {
                if (input.value == null) {
                  console.error(`O valor do componente ${input.key} é nulo ou indefinido. Pulando esse componente.`);
                  return;
                }
                
                if (input.key.startsWith('header')) {
                  let format = '';
                  if (input.key === 'header_video') format = 'VIDEO';
                  if (input.key === 'header_image') format = 'IMAGE';
                  if (input.key === 'header_document') format = 'DOCUMENT';
                  if (input.key === 'header_text') format = 'TEXT';

                  payload.components.push({
                    type: 'HEADER',
                    format: format,
                    value: input.value
                  });
                } else if (input.key.startsWith('variable')) {
                  const variableNumber = input.key.replace('variable_', '');
                  if (!payload.components.some(component => component.type === 'BODY')) {
                    payload.components.push({
                      type: 'BODY',
                      variables: []
                    });
                  }
                  const bodyComponent = payload.components.find(component => component.type === 'BODY');
                  // Garante que o array tenha o tamanho adequado
                  while (bodyComponent.variables.length < variableNumber) {
                    bodyComponent.variables.push('');
                  }
                  bodyComponent.variables[variableNumber - 1] = input.value;
                } else if (input.key.startsWith('named_variable')) {
                  const variableName = input.key.replace('named_variable_', '');
                  const bodyComponent = payload.components.find(c => c.type === 'BODY') || { type: 'BODY', parameters: [] };
                  if(variableName === 'nome'){
                    bodyComponent.parameters.push({
                      type: 'text',
                      text: input.value || '',
                      name: 'name'
                  })
                  } if(variableName === 'texto'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'text'
                    })
                  } if(variableName === 'number'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'number'
                    })
                  }                

                  if (!payload.components.some(c => c.type === 'BODY')) {
                      payload.components.push(bodyComponent);
                  }
                } else if (input.key.startsWith('button_') || input.key.includes('button_')) {
                  // Obtendo o índice do botão
                  const buttonIndex = parseInt(input.key.replace('button_url_', '').replace('button_', '')) - 1;

                  // Obtendo o tipo do botão dinamicamente do template selecionado
                  const selectedButton = this.selectedTemplate.value.components
                    .find(c => c.type === 'BUTTONS')?.buttons?.[buttonIndex];

                  if (selectedButton) {
                    // Botões URL e PHONE_NUMBER não devem ser incluídos nos components pois já estão definidos no template
                    // e não aceitam parâmetros dinâmicos
                    if (selectedButton.type === 'URL' || selectedButton.type === 'PHONE_NUMBER') {
                      // Não adicionar botões URL ou PHONE_NUMBER aos components
                      return;
                    }

                    const subType = selectedButton.type === 'COPY_CODE' ? 'copy_code' : 
                                  selectedButton.type === 'FLOW' ? 'flow' :
                                  selectedButton.type === 'CATALOG' ? 'catalog' : 'quick_reply';

                    if (!payload.components.some(c => c.type === 'BUTTONS')) {
                      payload.components.push({
                        type: 'BUTTONS',
                        buttons: []
                      });
                    }

                    const buttonsComponent = payload.components.find(c => c.type === 'BUTTONS');

                    if (selectedButton.type === 'FLOW') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'flow',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else if (selectedButton.type === 'CATALOG') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'catalog',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else {
                      buttonsComponent.buttons.push({
                        type: selectedButton.type,
                        sub_type: subType,
                        index: buttonIndex,
                        parameters: [
                          {
                            type: 'text',
                            text: input.value || ''
                          }
                        ]
                      });
                    }
                  }
                }
              });
            } else {
              console.log("selectedTemplateComponents warn");
            }
            
            // Filtrar botões URL e PHONE_NUMBER dos components antes de enviar
            // Botões URL e PHONE_NUMBER não devem ser incluídos pois já estão definidos no template
            payload.components = payload.components.map(component => {
              if (component.type === 'BUTTONS' && component.buttons) {
                const filteredButtons = component.buttons.filter(button => {
                  // Filtrar botões URL e PHONE_NUMBER (case-insensitive)
                  const isUrl = button.type === 'URL' || 
                               button.type === 'url' || 
                               button.sub_type === 'url' || 
                               button.sub_type === 'URL';
                  const isPhoneNumber = button.type === 'PHONE_NUMBER' || 
                                       button.type === 'phone_number' ||
                                       button.sub_type === 'phone_number' ||
                                       button.sub_type === 'PHONE_NUMBER';
                  if (isUrl) {
                    console.log('Botão URL removido dos components:', button);
                    return false;
                  }
                  if (isPhoneNumber) {
                    console.log('Botão PHONE_NUMBER removido dos components:', button);
                    return false;
                  }
                  return true;
                });
                
                // Se não há mais botões, remover o componente BUTTONS
                if (filteredButtons.length === 0) {
                  return null;
                }
                
                return {
                  ...component,
                  buttons: filteredButtons
                };
              }
              return component;
            }).filter(component => component !== null); // Remover componentes nulos

            console.log('payload', payload)
            const response = await EnviarTemplateComponenteWaba({ 
              ...payload, 
              dataJson: JSON.stringify(payload.components),
              isBulkDispatch: true,
              contacts: contacts,
              bulkDispatchId: this.bulkDispatchId
            });
            console.log('Template enviado com sucesso para:', phoneNumber, response.data);
            
            // Atualizar status do ticket para fechado e userId para null (se a opção estiver marcada)
            if (this.fecharTicket) {
              try {
                await AtualizarStatusTicket(ticket.id, 'closed', null);
                console.log('Ticket fechado com sucesso:', ticket.id);
              } catch (updateError) {
                console.error('Erro ao atualizar status do ticket:', updateError);
              }
            }
            
            this.sentCount++;
            await delay(randomDelay);
          } catch (error) {
            console.error('Erro ao enviar template para:', phoneNumber, error);
          }
        }

        this.sentCount = 0;
        this.totalMessages = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        this.fecharModalTemplate();
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 500);
        this.addTimer(timerId);
      }
      
    },
    async enviarTemplateSelecionadoMarketing() {
      if (!this.selectedTemplate || !this.selectedTemplate.value) {
        console.error(this.$t('massaTemplate.notifications.errorSendingTemplate'));
        return;
      }

      console.log('selectedTemplate', this.selectedTemplate);

      if(!this.useTags){
        if (!this.min) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMinTime'),
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
        if (!this.max) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMaxTime'),
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

        this.sending = true; 
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)

        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        let contacts = this.contatosImportar 
          ? (Array.isArray(this.selectedContacts) 
              ? this.selectedContacts.map(contact => {
                  const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
                  // Garantir que seja uma string e remover espaços
                  return value ? String(value).trim() : null;
                }).filter(Boolean)
              : [])
          : this.numberInput.split(',').map(contact => contact.trim()).filter(contact => contact !== '');

        if (contacts.length <= 0) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseContact'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.sending = false; 
          return;
        }

        this.totalMessages = contacts.length;
        this.sentCount = 0;

        this.$q.notify({
          html: true,
          message: this.$t('massaTemplate.notifications.uploadingMessages'),
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
          const hasVariables = this.selectedTemplateComponents && this.selectedTemplateComponents.some(c => c.key && c.key.startsWith('variable'));
          const bulkDispatchData = {
            dispatchType: hasVariables ? "template_variable" : "template",
            totalMessages: contacts.length,
            whatsappId: this.whatsappId.value,
            templateName: this.selectedTemplate.value.name,
            templateLanguage: this.selectedTemplate.value.language,
            isMarketing: true,
            minDelay: minInt,
            maxDelay: maxInt,
            metadata: {
              contacts: contacts,
              components: this.selectedTemplateComponents
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }

        for (const phoneNumber of contacts) {

          const delay = ms => new Promise(resolve => {
            const timerId = setTimeout(resolve, ms);
            this.addTimer(timerId);
          });
          const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
          
          try {
            // Buscar ou criar contato e ticket
            const { ticket } = await this.buscarOuCriarContatoETicket(phoneNumber);
            
            const payload = {
              from: phoneNumber,
              phone_number_id: this.whatsappId.tokenAPI,
              ticketId: ticket.id,
              idFront: uid(),
              language: this.selectedTemplate.value.language,
              templateName: this.selectedTemplate.value.name,
              components: [],
              read: 1,
              fromMe: true,
              mediaUrl: '',
              body: JSON.stringify(this.selectedTemplate.value.components),
              scheduleDate: null,
              quotedMsg: null,
              tokenApi: this.whatsappId.tokenAPI,
              mediaType: 'templates',
              sendType: 'templates',
            };

            if (this.selectedTemplateComponents && this.selectedTemplateComponents.length) {
              this.selectedTemplateComponents.forEach(input => {
                if (input.value == null) {
                  console.error(`O valor do componente ${input.key} é nulo ou indefinido. Pulando esse componente.`);
                  return;
                }
                
                if (input.key.startsWith('header')) {
                  let format = '';
                  if (input.key === 'header_video') format = 'VIDEO';
                  if (input.key === 'header_image') format = 'IMAGE';
                  if (input.key === 'header_document') format = 'DOCUMENT';
                  if (input.key === 'header_text') format = 'TEXT';

                  payload.components.push({
                    type: 'HEADER',
                    format: format,
                    value: input.value
                  });
                } else if (input.key.startsWith('variable')) {
                  const variableNumber = input.key.replace('variable_', '');
                  if (!payload.components.some(component => component.type === 'BODY')) {
                    payload.components.push({
                      type: 'BODY',
                      variables: []
                    });
                  }
                  const bodyComponent = payload.components.find(component => component.type === 'BODY');
                  // Garante que o array tenha o tamanho adequado
                  while (bodyComponent.variables.length < variableNumber) {
                    bodyComponent.variables.push('');
                  }
                  bodyComponent.variables[variableNumber - 1] = input.value;
                } else if (input.key.startsWith('named_variable')) {
                  const variableName = input.key.replace('named_variable_', '');
                  const bodyComponent = payload.components.find(c => c.type === 'BODY') || { type: 'BODY', parameters: [] };
                  if(variableName === 'nome'){
                    bodyComponent.parameters.push({
                      type: 'text',
                      text: input.value || '',
                      name: 'name'
                  })
                  } if(variableName === 'texto'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'text'
                    })
                  } if(variableName === 'number'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'number'
                    })
                  }

                  if (!payload.components.some(c => c.type === 'BODY')) {
                      payload.components.push(bodyComponent);
                  }
                } else if (input.key.startsWith('button_') || input.key.includes('button_')) {
                  // Obtendo o índice do botão
                  const buttonIndex = parseInt(input.key.replace('button_url_', '').replace('button_', '')) - 1;

                  // Obtendo o tipo do botão dinamicamente do template selecionado
                  const selectedButton = this.selectedTemplate.value.components
                    .find(c => c.type === 'BUTTONS')?.buttons?.[buttonIndex];

                  if (selectedButton) {
                    // Botões URL e PHONE_NUMBER não devem ser incluídos nos components pois já estão definidos no template
                    // e não aceitam parâmetros dinâmicos
                    if (selectedButton.type === 'URL' || selectedButton.type === 'PHONE_NUMBER') {
                      // Não adicionar botões URL ou PHONE_NUMBER aos components
                      return;
                    }

                    const subType = selectedButton.type === 'COPY_CODE' ? 'copy_code' : 
                                  selectedButton.type === 'FLOW' ? 'flow' :
                                  selectedButton.type === 'CATALOG' ? 'catalog' : 'quick_reply';

                    if (!payload.components.some(c => c.type === 'BUTTONS')) {
                      payload.components.push({
                        type: 'BUTTONS',
                        buttons: []
                      });
                    }

                    const buttonsComponent = payload.components.find(c => c.type === 'BUTTONS');

                    if (selectedButton.type === 'FLOW') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'flow',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else if (selectedButton.type === 'CATALOG') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'catalog',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else {
                      buttonsComponent.buttons.push({
                        type: selectedButton.type,
                        sub_type: subType,
                        index: buttonIndex,
                        parameters: [
                          {
                            type: 'text',
                            text: input.value || ''
                          }
                        ]
                      });
                    }
                  }
                }
              });
            } else {
              console.log("selectedTemplateComponents warn 0");
            }

            // Filtrar botões URL e PHONE_NUMBER dos components antes de enviar
            // Botões URL e PHONE_NUMBER não devem ser incluídos pois já estão definidos no template
            payload.components = payload.components.map(component => {
              if (component.type === 'BUTTONS' && component.buttons) {
                const filteredButtons = component.buttons.filter(button => {
                  // Filtrar botões URL e PHONE_NUMBER (case-insensitive)
                  const isUrl = button.type === 'URL' || 
                               button.type === 'url' || 
                               button.sub_type === 'url' || 
                               button.sub_type === 'URL';
                  const isPhoneNumber = button.type === 'PHONE_NUMBER' || 
                                       button.type === 'phone_number' ||
                                       button.sub_type === 'phone_number' ||
                                       button.sub_type === 'PHONE_NUMBER';
                  if (isUrl) {
                    console.log('Botão URL removido dos components:', button);
                    return false;
                  }
                  if (isPhoneNumber) {
                    console.log('Botão PHONE_NUMBER removido dos components:', button);
                    return false;
                  }
                  return true;
                });
                
                // Se não há mais botões, remover o componente BUTTONS
                if (filteredButtons.length === 0) {
                  return null;
                }
                
                return {
                  ...component,
                  buttons: filteredButtons
                };
              }
              return component;
            }).filter(component => component !== null); // Remover componentes nulos

            console.log('payload', payload)
            const response = await EnviarTemplateMarketingComponenteWaba({ 
              ...payload, 
              dataJson: JSON.stringify(payload.components),
              isBulkDispatch: true,
              contacts: contacts,
              bulkDispatchId: this.bulkDispatchId
            });
            console.log('Template enviado com sucesso para:', phoneNumber, response.data);
            
            // Atualizar status do ticket para fechado e userId para null (se a opção estiver marcada)
            if (this.fecharTicket) {
              try {
                await AtualizarStatusTicket(ticket.id, 'closed', null);
                console.log('Ticket fechado com sucesso:', ticket.id);
              } catch (updateError) {
                console.error('Erro ao atualizar status do ticket:', updateError);
              }
            }
            
            this.sentCount++;
            await delay(randomDelay);
          } catch (error) {
            console.error('Erro ao enviar template para:', phoneNumber, error);
          }
        }

        this.sentCount = 0;
        this.totalMessages = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        this.fecharModalTemplate();
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 500);
        this.addTimer(timerId);
      }

      if(this.useTags){
        console.log('2', this.selectedContacts)
        if (!this.min) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMinTime'),
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
        if (!this.max) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseMaxTime'),
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

        this.sending = true; 
        const minInt = parseInt(this.min, 10)
        const maxInt = parseInt(this.max, 10)

        // Normalizar selectedContacts para garantir que seja um array de valores (strings)
        let contacts = Array.isArray(this.selectedContacts) 
          ? this.selectedContacts.map(contact => {
              const value = typeof contact === 'object' && contact !== null ? contact.value : contact;
              // Garantir que seja uma string e remover espaços
              return value ? String(value).trim() : null;
            }).filter(Boolean)
          : [];
        console.log('3', this.selectedContacts)

        if (contacts.length <= 0) {
          this.$q.notify({
            html: true,
            message: this.$t('massaTemplate.notifications.chooseContact'),
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.sending = false; 
          return;
        }

        this.totalMessages = contacts.length;
        this.sentCount = 0;

        this.$q.notify({
          html: true,
          message: this.$t('massaTemplate.notifications.uploadingMessages'),
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
          const hasVariables = this.selectedTemplateComponents && this.selectedTemplateComponents.some(c => c.key && c.key.startsWith('variable'));
          const bulkDispatchData = {
            dispatchType: hasVariables ? "template_variable" : "template",
            totalMessages: contacts.length,
            whatsappId: this.whatsappId.value,
            templateName: this.selectedTemplate.value.name,
            templateLanguage: this.selectedTemplate.value.language,
            isMarketing: true,
            minDelay: minInt,
            maxDelay: maxInt,
            metadata: {
              contacts: contacts,
              components: this.selectedTemplateComponents
            }
          };
          const { data } = await CriarBulkDispatch(bulkDispatchData);
          this.bulkDispatchId = data.id;
        } catch (error) {
          console.error('Erro ao criar BulkDispatch:', error);
          // Continuar mesmo se falhar ao criar o BulkDispatch
        }

        for (const phoneNumber of contacts) {

          const delay = ms => new Promise(resolve => {
            const timerId = setTimeout(resolve, ms);
            this.addTimer(timerId);
          });
          const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;
          
          try {
            // Buscar ou criar contato e ticket
            const { ticket } = await this.buscarOuCriarContatoETicket(phoneNumber);
            
            const payload = {
              from: phoneNumber,
              phone_number_id: this.whatsappId.tokenAPI,
              ticketId: ticket.id,
              idFront: uid(),
              language: this.selectedTemplate.value.language,
              templateName: this.selectedTemplate.value.name,
              components: [],
              read: 1,
              fromMe: true,
              mediaUrl: '',
              body: JSON.stringify(this.selectedTemplate.value.components),
              scheduleDate: null,
              quotedMsg: null,
              tokenApi: this.whatsappId.tokenAPI,
              mediaType: 'templates',
              sendType: 'templates',
            };

            if (this.selectedTemplateComponents && this.selectedTemplateComponents.length) {
              this.selectedTemplateComponents.forEach(input => {
                if (input.value == null) {
                  console.error(`O valor do componente ${input.key} é nulo ou indefinido. Pulando esse componente.`);
                  return;
                }
                
                if (input.key.startsWith('header')) {
                  let format = '';
                  if (input.key === 'header_video') format = 'VIDEO';
                  if (input.key === 'header_image') format = 'IMAGE';
                  if (input.key === 'header_document') format = 'DOCUMENT';
                  if (input.key === 'header_text') format = 'TEXT';

                  payload.components.push({
                    type: 'HEADER',
                    format: format,
                    value: input.value
                  });
                } else if (input.key.startsWith('variable')) {
                  const variableNumber = input.key.replace('variable_', '');
                  if (!payload.components.some(component => component.type === 'BODY')) {
                    payload.components.push({
                      type: 'BODY',
                      variables: []
                    });
                  }
                  const bodyComponent = payload.components.find(component => component.type === 'BODY');
                  // Garante que o array tenha o tamanho adequado
                  while (bodyComponent.variables.length < variableNumber) {
                    bodyComponent.variables.push('');
                  }
                  bodyComponent.variables[variableNumber - 1] = input.value;
                } else if (input.key.startsWith('named_variable')) {
                  const variableName = input.key.replace('named_variable_', '');
                  const bodyComponent = payload.components.find(c => c.type === 'BODY') || { type: 'BODY', parameters: [] };
                  if(variableName === 'nome'){
                    bodyComponent.parameters.push({
                      type: 'text',
                      text: input.value || '',
                      name: 'name'
                  })
                  } if(variableName === 'texto'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'text'
                    })
                  } if(variableName === 'number'){
                      bodyComponent.parameters.push({
                        type: 'text',
                        text: input.value || '',
                        name: 'number'
                    })
                  }

                  if (!payload.components.some(c => c.type === 'BODY')) {
                      payload.components.push(bodyComponent);
                  }
                } else if (input.key.startsWith('button_') || input.key.includes('button_')) {
                  // Obtendo o índice do botão
                  const buttonIndex = parseInt(input.key.replace('button_url_', '').replace('button_', '')) - 1;

                  // Obtendo o tipo do botão dinamicamente do template selecionado
                  const selectedButton = this.selectedTemplate.value.components
                    .find(c => c.type === 'BUTTONS')?.buttons?.[buttonIndex];

                  if (selectedButton) {
                    // Botões URL e PHONE_NUMBER não devem ser incluídos nos components pois já estão definidos no template
                    // e não aceitam parâmetros dinâmicos
                    if (selectedButton.type === 'URL' || selectedButton.type === 'PHONE_NUMBER') {
                      // Não adicionar botões URL ou PHONE_NUMBER aos components
                      return;
                    }

                    const subType = selectedButton.type === 'COPY_CODE' ? 'copy_code' : 
                                  selectedButton.type === 'FLOW' ? 'flow' :
                                  selectedButton.type === 'CATALOG' ? 'catalog' : 'quick_reply';

                    if (!payload.components.some(c => c.type === 'BUTTONS')) {
                      payload.components.push({
                        type: 'BUTTONS',
                        buttons: []
                      });
                    }

                    const buttonsComponent = payload.components.find(c => c.type === 'BUTTONS');

                    if (selectedButton.type === 'FLOW') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'flow',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else if (selectedButton.type === 'CATALOG') {
                      buttonsComponent.buttons.push({
                        type: 'button',
                        sub_type: 'catalog',
                        index: buttonIndex?.toString(),
                        parameters: []
                      });
                    } else {
                      buttonsComponent.buttons.push({
                        type: selectedButton.type,
                        sub_type: subType,
                        index: buttonIndex,
                        parameters: [
                          {
                            type: 'text',
                            text: input.value || ''
                          }
                        ]
                      });
                    }
                  }
                }
              });
            } else {
              console.log("selectedTemplateComponents warn");
            }
            
            // Filtrar botões URL e PHONE_NUMBER dos components antes de enviar
            // Botões URL e PHONE_NUMBER não devem ser incluídos pois já estão definidos no template
            payload.components = payload.components.map(component => {
              if (component.type === 'BUTTONS' && component.buttons) {
                const filteredButtons = component.buttons.filter(button => {
                  // Filtrar botões URL e PHONE_NUMBER (case-insensitive)
                  const isUrl = button.type === 'URL' || 
                               button.type === 'url' || 
                               button.sub_type === 'url' || 
                               button.sub_type === 'URL';
                  const isPhoneNumber = button.type === 'PHONE_NUMBER' || 
                                       button.type === 'phone_number' ||
                                       button.sub_type === 'phone_number' ||
                                       button.sub_type === 'PHONE_NUMBER';
                  if (isUrl) {
                    console.log('Botão URL removido dos components:', button);
                    return false;
                  }
                  if (isPhoneNumber) {
                    console.log('Botão PHONE_NUMBER removido dos components:', button);
                    return false;
                  }
                  return true;
                });
                
                // Se não há mais botões, remover o componente BUTTONS
                if (filteredButtons.length === 0) {
                  return null;
                }
                
                return {
                  ...component,
                  buttons: filteredButtons
                };
              }
              return component;
            }).filter(component => component !== null); // Remover componentes nulos

            console.log('payload', payload)
            const response = await EnviarTemplateMarketingComponenteWaba({ 
              ...payload, 
              dataJson: JSON.stringify(payload.components),
              isBulkDispatch: true,
              contacts: contacts,
              bulkDispatchId: this.bulkDispatchId
            });
            console.log('Template enviado com sucesso para:', phoneNumber, response.data);
            
            // Atualizar status do ticket para fechado e userId para null (se a opção estiver marcada)
            if (this.fecharTicket) {
              try {
                await AtualizarStatusTicket(ticket.id, 'closed', null);
                console.log('Ticket fechado com sucesso:', ticket.id);
              } catch (updateError) {
                console.error('Erro ao atualizar status do ticket:', updateError);
              }
            }
            
            this.sentCount++;
            await delay(randomDelay);
          } catch (error) {
            console.error('Erro ao enviar template para:', phoneNumber, error);
          }
        }

        this.sentCount = 0;
        this.totalMessages = 0;
        this.sending = false;
        // O backend atualiza automaticamente o status quando todas as mensagens são processadas
        this.bulkDispatchId = null;
        this.fecharModalTemplate();
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 500);
        this.addTimer(timerId);
      }
      
    },
    async buscarTemplateWaba() {
      if (!this.whatsappId) {
        this.$q.notify({
          html: true,
          message: this.$t('massaTemplate.notifications.chooseConnection'),
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
      
      const tokenApi = this.whatsappId.tokenAPI;
      
      // Verificar cache no localStorage
      const cacheKey = `templates_cache_${tokenApi}`
      const cachedData = localStorage.getItem(cacheKey)
      
      if (cachedData) {
        const { templates, timestamp } = JSON.parse(cachedData)
        const now = Date.now()
        const fiveMinutes = 5 * 60 * 1000 // 5 minutos em millisegundos
        
        // Se o cache ainda é válido (menos de 5 minutos), usar dados em cache
        if (now - timestamp < fiveMinutes) {
          console.log('Usando templates do cache')
          // Ordenar templates por ordem alfabética
          const templatesOrdenados = templates.sort((a, b) => {
            const nameA = a.name ? a.name.toLowerCase() : '';
            const nameB = b.name ? b.name.toLowerCase() : '';
            return nameA.localeCompare(nameB);
          });
          this.templates = templatesOrdenados
          this.cacheStatus = {
            ultimaAtualizacao: new Date(timestamp).toLocaleString('pt-BR'),
            tempoRestante: Math.ceil((fiveMinutes - (now - timestamp)) / 1000),
            usandoCache: true
          }
          this.abrirModalTemplate()
          return
        }
      }
      
      // Se não há cache válido, fazer chamada à API
      console.log('Buscando templates da API')
      const response = await BuscarTemplates(tokenApi);
      
      // Filtrar templates aprovados e ordenar por ordem alfabética
      const templatesAprovados = response.data.data
        .filter(template => template.status === 'APPROVED')
        .sort((a, b) => {
          const nameA = a.name ? a.name.toLowerCase() : '';
          const nameB = b.name ? b.name.toLowerCase() : '';
          return nameA.localeCompare(nameB);
        });
      
      // Salvar no cache com timestamp
      const cacheData = {
        templates: templatesAprovados,
        timestamp: Date.now()
      }
      localStorage.setItem(cacheKey, JSON.stringify(cacheData))
      
      this.templates = templatesAprovados
      this.cacheStatus = {
        ultimaAtualizacao: new Date().toLocaleString('pt-BR'),
        tempoRestante: 300, // 5 minutos em segundos
        usandoCache: false
      }
      this.abrirModalTemplate();
    },
    
    // Métodos para gerenciar cache de templates
    limparCacheTemplates() {
      // Limpar todos os caches de templates
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('templates_cache_')) {
          localStorage.removeItem(key)
        }
      })
      console.log('Cache de templates limpo')
    },
    
    limparCacheTemplateEspecifico(tokenApi) {
      // Limpar cache de um token específico
      const cacheKey = `templates_cache_${tokenApi}`
      localStorage.removeItem(cacheKey)
      console.log(`Cache de templates limpo para token: ${tokenApi}`)
    },
    
    verificarStatusCache(tokenApi) {
      // Verificar status do cache para um token específico
      const cacheKey = `templates_cache_${tokenApi}`
      const cachedData = localStorage.getItem(cacheKey)
      
      if (!cachedData) {
        return { existe: false, valido: false, tempoRestante: 0 }
      }
      
      const { timestamp } = JSON.parse(cachedData)
      const now = Date.now()
      const fiveMinutes = 5 * 60 * 1000
      const tempoRestante = Math.max(0, fiveMinutes - (now - timestamp))
      const valido = tempoRestante > 0
      
      return {
        existe: true,
        valido,
        tempoRestante: Math.ceil(tempoRestante / 1000) // em segundos
      }
    },
    
    async forcarAtualizacaoTemplates() {
      // Força atualização ignorando o cache
      const tokenApi = this.whatsappId.tokenAPI
      this.limparCacheTemplateEspecifico(tokenApi)
      await this.buscarTemplateWaba()
    },
    
    abrirModalTemplate() {
      this.modalVisivelTemplate = true;
    },
    fecharModalTemplate() {
      this.modalVisivelTemplate = false;
      this.selectedTemplate = null;
      this.selectedTemplateComponents = [];
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile');
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.massa === true;
    await this.listarEtiquetas();
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
.blur-effect {
  filter: blur(0px);
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
  border-radius: 6px;
  min-width: 24px;
  min-height: 24px;
  padding: 0.12rem 0.5rem;
  font-size: 0.85rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}
.q-btn:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.11);
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
.q-dialog .q-card {
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1px solid rgba(0,0,0,0.08);
}
.q-table {
  background: rgba(255,255,255,0.85);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  margin-bottom: 1rem;
  backdrop-filter: blur(6px);
}
body.body--dark .q-card, body.body--dark .q-dialog .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
body.body--dark .q-banner {
  background: #23234a !important;
  color: #e0e0e0 !important;
}
body.body--dark .q-table {
  background: rgba(40,40,40,0.92);
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
}
</style>
