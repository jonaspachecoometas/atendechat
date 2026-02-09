<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
        <q-card-section class="text-h6 text-bold">
          {{ $t('massaTemplateVariavel.title') }}
        </q-card-section>
        <q-banner style="margin-top: 10px" class="bg-yellow text-black" inline-actions>
           <p>{{ $t('massaTexto.form.availableFunctionsWaba') }}</p>
        </q-banner>
        <q-list class="text-weight-medium">
          <div class="row q-px-md">
            <div class="col-3 q-py-md">
              <q-select
                v-model="whatsappId"
                :options="cSessionsOptions"
                label="WhatsApp ID"
                dense
                outlined
                @update:model-value="buscarTemplateWaba"
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
                v-model="fecharTicket"
                :label="$t('massaTemplate.form.closeTicket')"
                dense
              />
            </div>
            <div class="col-12 q-py-md">
              <q-select
                v-model="selectedTemplate"
                :options="templates.map(template => ({
                  label: `${template.name} (ID: ${template.id}, Lang: ${template.language})`,
                  value: template
                }))"
                :label="$t('massaTemplate.form.chooseTemplate')"
                dense
                outlined
                :loading="loadingTemplates"
                @update:model-value="handleTemplateSelection"
              />
            </div>
            <div class="col-12 q-py-md" v-if="templateVariables.length > 0">
              <q-banner class="bg-grey-2 text-grey-9" inline-actions>
                <div>
                  <p><strong>{{ $t('massaTemplateVariavel.variables.templateVariables') }}:</strong></p>
                  <ul>
                    <li v-for="(variable, index) in templateVariables" :key="index">
                      {{ variable }}
                    </li>
                  </ul>
                  <!-- <p>Formato esperado para cada linha: número,{{ templateVariables.join(',') }}</p> -->
                  <p>{{ $t('massaTemplateVariavel.variables.expectedFormat', { variables: templateVariables.join(',') }) }}</p>
                </div>
              </q-banner>
            </div>
            <div class="col-12 q-py-md">
              <q-input
                v-model="numberInput"
                :label="$t('massaTemplateVariavel.form.numberFormat')"
                dense
                outlined
                autogrow
              />
            </div>
            <div class="col-12 q-py-md">
              <q-btn 
              :disabled="!selectedTemplate || sending"
              :label="$t('common.send')" 
              @click="enviarTemplateSelecionado" 
              color="primary" />
              <q-btn 
              class="q-ml-md"
              :disabled="!selectedTemplate || sending"
              :label="$t('common.sendMarketing')" 
              @click="enviarTemplateSelecionadoMarketing" 
              color="primary" />
            </div>
            <div v-if="sending">
              {{ $t('massaTemplateVariavel.notifications.messagesSent', {
                sent: sentCount,
                total: numberInput.trim().split('\n').filter(line => line.trim() !== '').length
              }) }}
              <br />
              {{ $t('massaTemplateVariavel.notifications.uploadingMessages') }}
            </div>
            <!-- <div v-if="sending">
              Mensagens enviadas: {{ sentCount }} de {{ numberInput.trim().split('\n').filter(line => line.trim() !== '').length }}
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
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { EnviarTemplateComponenteWaba, EnviarTemplateMarketingComponenteWaba, BuscarTemplates } from 'src/service/waba.js';
import { ObterContatoPeloNumero, CriarContato } from 'src/service/contatos.js';
import { VerificarTicketsAbertos, CriarTicket, AtualizarStatusTicket } from 'src/service/tickets.js';
import { mapGetters } from 'vuex';
import { uid } from 'quasar';
import { CriarBulkDispatch } from 'src/service/bulkDispatch.js';

export default {
  name: 'MassaSms',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      sentCount: 0,
      sending: false,
      whatsappId: null,
      min: '',
      max: '',
      fecharTicket: true,
      numberInput: '',
      templates: [],
      cacheStatus: {
        ultimaAtualizacao: null,
        tempoRestante: 0,
        usandoCache: false
      },
      selectedTemplate: null,
      templateVariables: [],
      loadingTemplates: false,
      bulkDispatchId: null,
      // Sistema de gerenciamento de memória
      timers: []
    };
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
            name: String(numeroLimpo), // Usar apenas o número limpo como nome
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
    async buscarTemplateWaba() {
      if (!this.whatsappId) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTemplateVariavel.notifications.chooseConnection'),
        });
        return;
      }

      this.loadingTemplates = true;

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
          this.loadingTemplates = false
          return
        }
      }
      
      // Se não há cache válido, fazer chamada à API
      console.log('Buscando templates da API')
      try {
        const response = await BuscarTemplates(tokenApi);
        
        if (response?.data?.data) {
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
        } else {
          this.$q.notify({
            type: 'warning',
            message: this.$t('massaTemplateVariavel.notifications.errorFetchingTemplates'),
          });
        }
      } catch (error) {
        console.error('Erro ao buscar templates:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('massaTemplateVariavel.notifications.errorFetchingTemplates'),
        });
      } finally {
        this.loadingTemplates = false;
      }
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
    
    handleTemplateSelection(templateWrapper) {
      this.templateVariables = [];
      const template = templateWrapper.value;

      if (template && template.components) {
        template.components.forEach(component => {
          if (component.type === 'HEADER') {
            if (component.format === 'IMAGE' || component.format === 'VIDEO' || component.format === 'DOCUMENT') {
              this.templateVariables.push(`URL Header (${component.format.toLowerCase()})`);
            } 
          }
          if (component.type === 'BODY') {
            const variableMatches = component.text.match(/{{\d+}}/g);
            if (variableMatches) {
              const bodyVariables = variableMatches.map(variable =>
                `variavel${variable.replace(/{{|}}/g, '')}`
              );
              this.templateVariables.push(...bodyVariables);
            }
          }
          if (component.type === 'BUTTONS' && component.buttons) {
                component.buttons.forEach((button, index) => {
                    if (button.type === 'COPY_CODE') {
                        this.templateVariables.push(`botao${index + 1}`);
                    } 
                    // else {
                    //   this.templateVariables.push({
                    //     label: `Button ${index + 1}: ${button.text}`,
                    //     value: button.text,
                    //     key: `button_${index + 1}`
                    //   });
                    // }
                });
            }
        });
      }
    },
    async enviarTemplateSelecionado() {
      if (!this.selectedTemplate || !this.numberInput || !this.min || !this.max) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('massaTemplateVariavel.notifications.completeFields'),
        });
        return;
      }
      console.log('selectedTemplate', this.selectedTemplate);

      const contatos = this.numberInput.split('\n').map(line => {
        const partes = line.split(',');
        return {
          numero: partes[0]?.trim(),
          variaveis: partes.slice(1).map(v => v.trim()),
        };
      });

      this.sending = true;

      this.$q.notify({
        html: true,
        message: this.$t('massaTemplateVariavel.notifications.uploadingMessages'),
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
        const bulkDispatchData = {
          dispatchType: "template_variable",
          totalMessages: contatos.length,
          whatsappId: this.whatsappId.value,
          templateName: this.selectedTemplate.value.name,
          templateLanguage: this.selectedTemplate.value.language,
          isMarketing: false,
          minDelay: parseInt(this.min, 10),
          maxDelay: parseInt(this.max, 10),
          metadata: {
            contacts: contatos.map(c => c.numero),
            templateVariables: this.templateVariables
          }
        };
        const { data } = await CriarBulkDispatch(bulkDispatchData);
        this.bulkDispatchId = data.id;
      } catch (error) {
        console.error('Erro ao criar BulkDispatch:', error);
        // Continuar mesmo se falhar ao criar o BulkDispatch
      } 

      for (const contato of contatos) {

        const minInt = parseInt(this.min, 10);
        const maxInt = parseInt(this.max, 10);
        const delay = ms => new Promise(resolve => {
          const timerId = setTimeout(resolve, ms);
          this.addTimer(timerId);
        });
        const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;

        try {
          // Buscar ou criar contato e ticket
          const { ticket } = await this.buscarOuCriarContatoETicket(contato.numero);

          const components = [];

          // HEADER COMPONENT
          const header = this.selectedTemplate.value.components.find(c => c.type === 'HEADER');
          const offsetInicial = header && (header.format === 'IMAGE' || header.format === 'VIDEO' || header.format === 'DOCUMENT') ? 1 : 0;
          
          if (header && offsetInicial > 0) {
            const headerVariable = contato.variaveis[0]; // Primeira variável para o HEADER
            // Garantir que a variável do header não esteja vazia
            if (headerVariable && headerVariable.trim() !== '') {
              components.push({
                type: 'HEADER',
                format: header.format,
                value: headerVariable.trim(), // Assume que é uma URL para HEADER
              });
            }
          }

          // BODY COMPONENT
          // Contar quantas variáveis o body precisa
          const bodyComponent = this.selectedTemplate.value.components.find(c => c.type === 'BODY');
          const bodyVariableCount = bodyComponent ? (bodyComponent.text.match(/{{\d+}}/g) || []).length : 0;
          
          // Pegar apenas as variáveis necessárias para o body
          // Filtrar e substituir valores vazios por espaço (WhatsApp não aceita strings vazias)
          const bodyVariables = contato.variaveis
            .slice(offsetInicial, offsetInicial + bodyVariableCount)
            .map(v => v && v.trim() !== '' ? v.trim() : ' '); // Substituir vazios por espaço
          
          if (bodyVariables.length > 0) {
              components.push({
                type: 'BODY',
                variables: bodyVariables,
              });
          }

          // BUTTONS COMPONENT
          const buttons = this.selectedTemplate.value.components.find(c => c.type === 'BUTTONS');
          if (buttons && buttons.buttons.length > 0) {
            const buttonsComponent = {
              type: 'BUTTONS',
              buttons: []
            };

            // Contador para variáveis de botão (apenas para botões que precisam)
            let buttonVariableIndex = 0;

            // Filtrar apenas botões que não são URL e criar um mapeamento de índices
            const nonUrlButtons = [];
            buttons.buttons.forEach((button, originalIndex) => {
              if (button.type !== 'URL') {
                nonUrlButtons.push({
                  button,
                  originalIndex,
                  arrayIndex: nonUrlButtons.length // Índice no array filtrado (0, 1, 2...)
                });
              }
            });

            // Agora processar apenas os botões não-URL
            nonUrlButtons.forEach(({ button, originalIndex }) => {
              // Calcular índice da variável do botão
              // Ordem: [header(1)] + [body(N)] + [buttons...]
              const variableIndex = offsetInicial + bodyVariableCount + buttonVariableIndex;
              let buttonVariable = contato.variaveis[variableIndex] || '';
              
              const subType = button.type === 'COPY_CODE' ? 'copy_code' : 
                            button.type === 'FLOW' ? 'flow' :
                            button.type === 'CATALOG' ? 'catalog' : 'quick_reply';

              if (button.type === 'FLOW') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'flow',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: []
                });
              } else if (button.type === 'CATALOG') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'catalog',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: []
                });
              } else if (button.type === 'COPY_CODE') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'copy_code',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: [
                    {
                      type: 'text',
                      text: buttonVariable && buttonVariable.trim() !== '' ? buttonVariable.trim() : ' ' // Substituir vazios por espaço
                    }
                  ]
                });
                // Incrementar apenas para botões que precisam de variável
                buttonVariableIndex++;
              } else if (button.type === 'QUICK_REPLY') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'quick_reply',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: [
                    {
                      type: 'text',
                      text: (buttonVariable && buttonVariable.trim() !== '' ? buttonVariable.trim() : button.text) || ' ' // Substituir vazios por espaço
                    }
                  ]
                });
                // Incrementar apenas para botões que precisam de variável
                buttonVariableIndex++;
              }
            });

            if (buttonsComponent.buttons.length > 0) {
              components.push(buttonsComponent);
            }
          }

          // Filtrar botões URL dos components antes de enviar (segurança adicional)
          const filteredComponents = components.map(component => {
            if (component.type === 'BUTTONS' && component.buttons) {
              const filteredButtons = component.buttons.filter(button => {
                // Filtrar botões URL (case-insensitive)
                const isUrl = button.type === 'URL' || 
                             button.type === 'url' || 
                             button.sub_type === 'url' || 
                             button.sub_type === 'URL';
                if (isUrl) {
                  console.log('Botão URL removido dos components:', button);
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

          const payload = {
            from: contato.numero || "",
            phone_number_id: this.whatsappId.tokenAPI,
            ticketId: ticket.id,
            idFront: uid(),
            language: this.selectedTemplate.value.language,
            templateName: this.selectedTemplate.value.name,
            components: filteredComponents,
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

          console.log('payload', payload)
          const response = await EnviarTemplateComponenteWaba({ 
            ...payload, 
            dataJson: JSON.stringify(payload.components),
            isBulkDispatch: true,
            contacts: contatos.map(c => ({ number: c.numero })),
            bulkDispatchId: this.bulkDispatchId
          });
          
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
          console.log('Template enviado com sucesso para:', contato.numero, response.data);
          await delay(randomDelay);
        } catch (error) {
          console.error(`Erro ao enviar para o número ${contato.numero}:`, error);
        }
      }

      this.sentCount = 0;
      this.sending = false;
      // O backend atualiza automaticamente o status quando todas as mensagens são processadas
      this.bulkDispatchId = null;
      this.$q.notify({
        type: 'positive',
        message: this.$t('massaTemplateVariavel.notifications.sendingCompleted'),
      });
      const timerId = setTimeout(() => {
        window.location.reload();
      }, 500);
      this.addTimer(timerId);
    },
    async enviarTemplateSelecionadoMarketing() {
      if (!this.selectedTemplate || !this.numberInput || !this.min || !this.max) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('massaTemplateVariavel.notifications.completeFields'),
        });
        return;
      }
      console.log('selectedTemplate', this.selectedTemplate);

      const contatos = this.numberInput.split('\n').map(line => {
        const partes = line.split(',');
        return {
          numero: partes[0]?.trim(),
          variaveis: partes.slice(1).map(v => v.trim()),
        };
      });

      this.sending = true; 

      // Criar BulkDispatch antes de iniciar o disparo
      try {
        const bulkDispatchData = {
          dispatchType: "template_variable",
          totalMessages: contatos.length,
          whatsappId: this.whatsappId.value,
          templateName: this.selectedTemplate.value.name,
          templateLanguage: this.selectedTemplate.value.language,
          isMarketing: true,
          minDelay: parseInt(this.min, 10),
          maxDelay: parseInt(this.max, 10),
          metadata: {
            contacts: contatos.map(c => c.numero),
            templateVariables: this.templateVariables
          }
        };
        const { data } = await CriarBulkDispatch(bulkDispatchData);
        this.bulkDispatchId = data.id;
      } catch (error) {
        console.error('Erro ao criar BulkDispatch:', error);
        // Continuar mesmo se falhar ao criar o BulkDispatch
      }

      for (const contato of contatos) {

        const minInt = parseInt(this.min, 10);
        const maxInt = parseInt(this.max, 10);
        const delay = ms => new Promise(resolve => {
          const timerId = setTimeout(resolve, ms);
          this.addTimer(timerId);
        });
        const randomDelay = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt) * 1000;

        try {
          // Buscar ou criar contato e ticket
          const { ticket } = await this.buscarOuCriarContatoETicket(contato.numero);

          const components = [];

          // HEADER COMPONENT
          const header = this.selectedTemplate.value.components.find(c => c.type === 'HEADER');
          const offsetInicial = header && (header.format === 'IMAGE' || header.format === 'VIDEO' || header.format === 'DOCUMENT') ? 1 : 0;
          
          if (header && offsetInicial > 0) {
            const headerVariable = contato.variaveis[0]; // Primeira variável para o HEADER
            // Garantir que a variável do header não esteja vazia
            if (headerVariable && headerVariable.trim() !== '') {
              components.push({
                type: 'HEADER',
                format: header.format,
                value: headerVariable.trim(), // Assume que é uma URL para HEADER
              });
            }
          }

          // BODY COMPONENT
          // Contar quantas variáveis o body precisa
          const bodyComponent = this.selectedTemplate.value.components.find(c => c.type === 'BODY');
          const bodyVariableCount = bodyComponent ? (bodyComponent.text.match(/{{\d+}}/g) || []).length : 0;
          
          // Pegar apenas as variáveis necessárias para o body
          // Filtrar e substituir valores vazios por espaço (WhatsApp não aceita strings vazias)
          const bodyVariables = contato.variaveis
            .slice(offsetInicial, offsetInicial + bodyVariableCount)
            .map(v => v && v.trim() !== '' ? v.trim() : ' '); // Substituir vazios por espaço
          
          if (bodyVariables.length > 0) {
              components.push({
                type: 'BODY',
                variables: bodyVariables,
              });
          }

          // BUTTONS COMPONENT
          const buttons = this.selectedTemplate.value.components.find(c => c.type === 'BUTTONS');
          if (buttons && buttons.buttons.length > 0) {
            const buttonsComponent = {
              type: 'BUTTONS',
              buttons: []
            };

            // Contador para variáveis de botão (apenas para botões que precisam)
            let buttonVariableIndex = 0;

            // Filtrar apenas botões que não são URL e criar um mapeamento de índices
            const nonUrlButtons = [];
            buttons.buttons.forEach((button, originalIndex) => {
              if (button.type !== 'URL') {
                nonUrlButtons.push({
                  button,
                  originalIndex,
                  arrayIndex: nonUrlButtons.length // Índice no array filtrado (0, 1, 2...)
                });
              }
            });

            // Agora processar apenas os botões não-URL
            nonUrlButtons.forEach(({ button, originalIndex }) => {
              // Calcular índice da variável do botão
              // Ordem: [header(1)] + [body(N)] + [buttons...]
              const variableIndex = offsetInicial + bodyVariableCount + buttonVariableIndex;
              let buttonVariable = contato.variaveis[variableIndex] || '';
              
              const subType = button.type === 'COPY_CODE' ? 'copy_code' : 
                            button.type === 'FLOW' ? 'flow' :
                            button.type === 'CATALOG' ? 'catalog' : 'quick_reply';

              if (button.type === 'FLOW') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'flow',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: []
                });
              } else if (button.type === 'CATALOG') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'catalog',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: []
                });
              } else if (button.type === 'COPY_CODE') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'copy_code',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: [
                    {
                      type: 'text',
                      text: buttonVariable && buttonVariable.trim() !== '' ? buttonVariable.trim() : ' ' // Substituir vazios por espaço
                    }
                  ]
                });
                // Incrementar apenas para botões que precisam de variável
                buttonVariableIndex++;
              } else if (button.type === 'QUICK_REPLY') {
                buttonsComponent.buttons.push({
                  type: 'button',
                  sub_type: 'quick_reply',
                  index: originalIndex.toString(), // Usar índice original do template
                  parameters: [
                    {
                      type: 'text',
                      text: (buttonVariable && buttonVariable.trim() !== '' ? buttonVariable.trim() : button.text) || ' ' // Substituir vazios por espaço
                    }
                  ]
                });
                // Incrementar apenas para botões que precisam de variável
                buttonVariableIndex++;
              }
            });

            if (buttonsComponent.buttons.length > 0) {
              components.push(buttonsComponent);
            }
          }

          // Filtrar botões URL dos components antes de enviar (segurança adicional)
          const filteredComponents = components.map(component => {
            if (component.type === 'BUTTONS' && component.buttons) {
              const filteredButtons = component.buttons.filter(button => {
                // Filtrar botões URL (case-insensitive)
                const isUrl = button.type === 'URL' || 
                             button.type === 'url' || 
                             button.sub_type === 'url' || 
                             button.sub_type === 'URL';
                if (isUrl) {
                  console.log('Botão URL removido dos components:', button);
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

          const payload = {
            from: contato.numero || "",
            phone_number_id: this.whatsappId.tokenAPI,
            ticketId: ticket.id,
            idFront: uid(),
            language: this.selectedTemplate.value.language,
            templateName: this.selectedTemplate.value.name,
            components: filteredComponents,
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

          console.log('payload', payload)
          const response = await EnviarTemplateMarketingComponenteWaba({ 
            ...payload, 
            dataJson: JSON.stringify(payload.components),
            isBulkDispatch: true,
            contacts: contatos.map(c => ({ number: c.numero })),
            bulkDispatchId: this.bulkDispatchId
          });
          
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
          console.log('Template enviado com sucesso para:', contato.numero, response.data);
          await delay(randomDelay);
        } catch (error) {
          console.error(`Erro ao enviar para o número ${contato.numero}:`, error);
        }
      }

      this.sentCount = 0;
      this.sending = false;
      // O backend atualiza automaticamente o status quando todas as mensagens são processadas
      this.bulkDispatchId = null;
      this.$q.notify({
        type: 'positive',
        message: this.$t('massaTemplateVariavel.notifications.sendingCompleted'),
      });
      const timerId = setTimeout(() => {
        window.location.reload();
      }, 500);
      this.addTimer(timerId);
    },
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

<style lang="scss" scoped>
.loading-bar {
  width: 100%;
  height: 4px;
  background-color: #ccc;
  position: relative;
}

.bar {
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
