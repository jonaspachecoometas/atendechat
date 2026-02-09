<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.WebhookAllField') }}
        </div>
        
        <!-- URL do Webhook -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.webhookUrl"
            :label="$t('nodeForm.webhook.url')"
            outlined
            dense
            :placeholder="$t('nodeForm.webhook.urlPlaceholder')"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.webhook.urlHint')"
          >
            <template v-slot:append>
              <q-btn round flat dense size="sm">
                <q-icon size="1.5em" name="mdi-variable" />
                <q-tooltip>{{ $t('webhookField.tooltip.variables') }}</q-tooltip>
                <q-menu touch-position>
                  <q-list dense style="min-width: 200px">
                    <q-item
                      v-for="variavel in variaveis"
                      :key="variavel.label"
                      clickable
                      @click="onInsertSelectVariable(variavel.value, 'webhookUrl')"
                      v-close-popup
                    >
                      <q-item-section>{{ variavel.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </template>
          </q-input>
        </div>
        
        <!-- Método HTTP -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.httpMethod"
            :options="httpMethods"
            :label="$t('nodeForm.webhook.httpMethod')"
            outlined
            dense
            emit-value
            map-options
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.webhook.httpMethodHint')"
          />
        </div>
        
        <!-- Headers -->
        <div class="q-mb-sm">
          <q-expansion-item
            :label="$t('nodeForm.webhook.headers')"
            icon="mdi-format-header-pound"
            header-class="text-primary"
          >
            <div class="q-pa-md">
              <div v-for="(header, index) in $attrs.element.data.headers" :key="index" class="row q-gutter-sm q-mb-sm">
                <q-input
                  v-model="header.key"
                  :label="$t('nodeForm.webhook.headerKey')"
                  outlined
                  dense
                  class="col-5"
                  :placeholder="$t('nodeForm.webhook.headerKeyPlaceholder')"
                />
                <q-input
                  v-model="header.value"
                  :label="$t('nodeForm.webhook.headerValue')"
                  outlined
                  dense
                  class="col-5"
                  :placeholder="$t('nodeForm.webhook.headerValuePlaceholder')"
                />
                <q-btn
                  round
                  flat
                  dense
                  color="negative"
                  icon="mdi-delete"
                  @click="removeHeader(index)"
                  class="col-2"
                />
              </div>
              <q-btn
                flat
                color="primary"
                icon="mdi-plus"
                :label="$t('nodeForm.webhook.addHeader')"
                @click="addHeader"
                class="q-mt-sm"
              />
            </div>
          </q-expansion-item>
        </div>
        
        <!-- Body (apenas para POST e PUT) -->
        <div v-if="['POST', 'PUT'].includes($attrs.element.data.httpMethod)" class="q-mb-sm">
          <q-expansion-item
            :label="$t('nodeForm.webhook.body')"
            icon="mdi-code-json"
            header-class="text-primary"
          >
            <div class="q-pa-md">
              <q-select
                v-model="$attrs.element.data.bodyType"
                :options="bodyTypes"
                :label="$t('nodeForm.webhook.bodyType')"
                outlined
                dense
                emit-value
                map-options
                class="q-mb-sm"
              />
              
              <q-input
                v-if="$attrs.element.data.bodyType === 'json'"
                v-model="$attrs.element.data.bodyContent"
                :label="$t('nodeForm.webhook.bodyContent')"
                type="textarea"
                outlined
                dense
                autogrow
                rows="6"
                :placeholder="$t('nodeForm.webhook.bodyContentPlaceholder')"
                :hint="$t('nodeForm.webhook.bodyContentHint')"
              >
                <template v-slot:append>
                  <q-btn round flat dense size="sm">
                    <q-icon size="1.5em" name="mdi-variable" />
                    <q-tooltip>{{ $t('webhookField.tooltip.variables') }}</q-tooltip>
                    <q-menu touch-position>
                      <q-list dense style="min-width: 200px">
                        <q-item
                          v-for="variavel in variaveis"
                          :key="variavel.label"
                          clickable
                          @click="onInsertSelectVariable(variavel.value, 'bodyContent')"
                          v-close-popup
                        >
                          <q-item-section>{{ variavel.label }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </template>
              </q-input>
              
              <q-input
                v-if="$attrs.element.data.bodyType === 'form'"
                v-model="$attrs.element.data.bodyContent"
                :label="$t('nodeForm.webhook.bodyContent')"
                type="textarea"
                outlined
                dense
                autogrow
                rows="4"
                :placeholder="$t('nodeForm.webhook.formDataPlaceholder')"
                :hint="$t('nodeForm.webhook.formDataHint')"
              />
            </div>
          </q-expansion-item>
        </div>
        
        <!-- Botão de Teste -->
        <div class="q-mb-sm">
          <q-btn
            :loading="testingWebhook"
            :disable="!canTestWebhook"
            color="positive"
            icon="mdi-play-circle"
            :label="$t('nodeForm.webhook.testWebhook')"
            @click="testWebhook"
            class="full-width"
            :hint="$t('nodeForm.webhook.testWebhookHint')"
          />
          
          <!-- Resultado do Teste -->
          <div v-if="testResult" class="q-mt-sm">
            <q-banner
              :class="testResult.success ? 'bg-positive' : 'bg-negative'"
              class="text-white"
            >
              <template v-slot:avatar>
                <q-icon :name="testResult.success ? 'mdi-check-circle' : 'mdi-alert-circle'" />
              </template>
              <div class="text-subtitle2">
                {{ testResult.success ? $t('nodeForm.webhook.testSuccess') : $t('nodeForm.webhook.testError') }}
              </div>
              <div class="text-caption">
                {{ testResult.message }}
              </div>
              <div v-if="testResult.details" class="text-caption q-mt-xs">
                <strong>{{ $t('nodeForm.webhook.responseDetails') }}:</strong><br>
                <code>{{ testResult.details }}</code>
              </div>
            </q-banner>
          </div>
        </div>
        
        <!-- Configurações Avançadas -->
        <div class="q-mb-sm">
          <q-expansion-item
            :label="$t('nodeForm.webhook.advancedSettings')"
            icon="mdi-cog"
            header-class="text-primary"
          >
            <div class="q-pa-md">
              <!-- Timeout -->
              <div class="q-mb-sm">
                <q-input
                  v-model.number="$attrs.element.data.timeout"
                  :label="$t('nodeForm.webhook.timeout')"
                  type="number"
                  min="1000"
                  max="60000"
                  step="1000"
                  outlined
                  dense
                  :hint="$t('nodeForm.webhook.timeoutHint')"
                />
              </div>
              
              <!-- Retry Attempts -->
              <div class="q-mb-sm">
                <q-input
                  v-model.number="$attrs.element.data.retryAttempts"
                  :label="$t('nodeForm.webhook.retryAttempts')"
                  type="number"
                  min="0"
                  max="5"
                  outlined
                  dense
                  :hint="$t('nodeForm.webhook.retryAttemptsHint')"
                />
              </div>
              
              <!-- Retry Delay -->
              <div class="q-mb-sm">
                <q-input
                  v-model.number="$attrs.element.data.retryDelay"
                  :label="$t('nodeForm.webhook.retryDelay')"
                  type="number"
                  min="1000"
                  max="30000"
                  step="1000"
                  outlined
                  dense
                  :hint="$t('nodeForm.webhook.retryDelayHint')"
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
export default {
  name: 'WebhookAllField',
  data () {
    return {
      httpMethods: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' }
      ],
      bodyTypes: [
        { label: this.$t('nodeForm.webhook.jsonBody'), value: 'json' },
        { label: this.$t('nodeForm.webhook.formBody'), value: 'form' }
      ],
      variaveis: [
        { label: this.$t('webhookField.variables.name'), value: '{{name}}' },
        { label: this.$t('webhookField.variables.greeting'), value: '{{greeting}}' },
        { label: this.$t('webhookField.variables.protocol'), value: '{{protocol}}' },
        { label: this.$t('webhookField.variables.email'), value: '{{email}}' },
        { label: this.$t('webhookField.variables.phoneNumber'), value: '{{phoneNumber}}' },
        { label: this.$t('webhookField.variables.kanban'), value: '{{kanban}}' },
        { label: this.$t('webhookField.variables.user'), value: '{{user}}' },
        { label: this.$t('webhookField.variables.userEmail'), value: '{{userEmail}}' },
        { label: this.$t('webhookField.variables.firstName'), value: '{{firstName}}' },
        { label: this.$t('webhookField.variables.lastName'), value: '{{lastName}}' },
        { label: this.$t('webhookField.variables.businessName'), value: '{{businessName}}' },
      ],
      testingWebhook: false,
      testResult: null
    }
  },
  watch: {
    '$attrs.element.data': {
      handler(newData) {
        if (newData && Object.keys(newData).length > 0) {
          this.initializeData();
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    canTestWebhook() {
      return this.$attrs.element.data.webhookUrl && 
             this.$attrs.element.data.webhookUrl.trim() !== '' &&
             this.$attrs.element.data.httpMethod;
    }
  },
  methods: {
    addHeader() {
      if (!this.$attrs.element.data.headers) {
        this.$attrs.element.data.headers = [];
      }
      this.$attrs.element.data.headers.push({ key: '', value: '' });
    },
    removeHeader(index) {
      this.$attrs.element.data.headers.splice(index, 1);
    },
    onInsertSelectVariable(variable, field) {
      const self = this;
      const currentValue = this.$attrs.element.data[field] || '';
      const newValue = currentValue + variable;
      this.$attrs.element.data[field] = newValue;
    },
    
    async testWebhook() {
      if (!this.canTestWebhook) {
        return;
      }
      
      this.testingWebhook = true;
      this.testResult = null;
      
      try {
        // Preparar dados de teste (simular dados de um ticket)
        const testData = {
          name: 'João Silva',
          greeting: 'Bom dia',
          protocol: 'TKT-001',
          email: 'joao@exemplo.com',
          phoneNumber: '+5511999999999',
          kanban: 'Cliente',
          user: 'Atendente',
          userEmail: 'atendente@empresa.com',
          firstName: 'João',
          lastName: 'Silva',
          businessName: 'Empresa Exemplo Ltda'
        };
        
        // Preparar URL com variáveis substituídas
        let testUrl = this.$attrs.element.data.webhookUrl;
        Object.keys(testData).forEach(key => {
          testUrl = testUrl.replace(new RegExp(`{{${key}}}`, 'g'), testData[key]);
        });
        
        // Preparar headers
        const headers = {};
        if (this.$attrs.element.data.headers && Array.isArray(this.$attrs.element.data.headers)) {
          this.$attrs.element.data.headers.forEach(header => {
            if (header.key && header.value) {
              headers[header.key] = header.value;
            }
          });
        }
        
        // Preparar body para POST/PUT
        let body = undefined;
        if (['POST', 'PUT'].includes(this.$attrs.element.data.httpMethod) && this.$attrs.element.data.bodyContent) {
          if (this.$attrs.element.data.bodyType === 'json') {
            try {
              // Substituir variáveis no body JSON
              let bodyContent = this.$attrs.element.data.bodyContent;
              Object.keys(testData).forEach(key => {
                bodyContent = bodyContent.replace(new RegExp(`{{${key}}}`, 'g'), testData[key]);
              });
              body = JSON.parse(bodyContent);
            } catch (parseError) {
              body = this.$attrs.element.data.bodyContent;
            }
          } else {
            // Substituir variáveis no body form
            let bodyContent = this.$attrs.element.data.bodyContent;
            Object.keys(testData).forEach(key => {
              bodyContent = bodyContent.replace(new RegExp(`{{${key}}}`, 'g'), testData[key]);
            });
            body = bodyContent;
          }
        }
        
        // Configurações da requisição de teste
        const fetchOptions = {
          method: this.$attrs.element.data.httpMethod,
          headers: {
            'Content-Type': this.$attrs.element.data.bodyType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
            ...headers
          },
          // Adicionar credenciais para melhor compatibilidade
          credentials: 'omit'
        };
        
        // Adicionar body apenas para POST/PUT
        if (['POST', 'PUT'].includes(this.$attrs.element.data.httpMethod) && body) {
          fetchOptions.body = this.$attrs.element.data.bodyType === 'json' ? JSON.stringify(body) : body;
        }
        
        // Executar requisição de teste usando fetch nativo com tratamento de CORS
        let response;
        let responseData = {};
        
        try {
          // Primeira tentativa: fetch normal
          response = await fetch(testUrl, fetchOptions);
          
          try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              responseData = await response.json();
            } else {
              responseData = await response.text();
            }
          } catch (parseError) {
            responseData = { error: this.$t('nodeForm.webhook.testError') };
          }
          
          // Sucesso
          this.testResult = {
            success: true,
            message: `${this.$t('nodeForm.webhook.testSuccess')} Status: ${response.status}`,
            details: JSON.stringify(responseData, null, 2)
          };
          
          this.$q.notify({
            type: 'positive',
            message: this.$t('nodeForm.webhook.testSuccess'),
            position: 'top'
          });
          
        } catch (fetchError) {
          // Se falhar, tentar com modo 'no-cors' para verificar se é problema de CORS
          try {
            const noCorsOptions = {
              ...fetchOptions,
              mode: 'no-cors'
            };
            
            const noCorsResponse = await fetch(testUrl, noCorsOptions);
            
            // Com 'no-cors', não conseguimos ler a resposta, mas sabemos que chegou
            this.testResult = {
              success: true,
              message: `${this.$t('nodeForm.webhook.testSuccess')} (Modo no-cors) - Status: ${noCorsResponse.status || 'OK'}`,
              details: this.$t('nodeForm.webhook.testSuccessDetails')
            };
            
            this.$q.notify({
              type: 'positive',
              message: this.$t('nodeForm.webhook.testSuccess'),
              position: 'top'
            });
            
          } catch (noCorsError) {
            // Se ainda falhar, é erro real
            throw fetchError;
          }
        }
        
      } catch (error) {
        // Erro
        let errorMessage = this.$t('nodeForm.webhook.testError');
        let errorDetails = '';
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          // Erro de rede/CORS
          errorMessage = this.$t('nodeForm.webhook.testErrorCors');
          errorDetails = `${this.$t('nodeForm.webhook.testErrorCorsDetails')}\n\n${error.message}`;
        } else {
          // Outro erro
          errorMessage = error.message || this.$t('nodeForm.webhook.testErrorUnknown');
          errorDetails = error.stack || '';
        }
        
        this.testResult = {
          success: false,
          message: errorMessage,
          details: errorDetails
        };
        
        this.$q.notify({
          type: 'negative',
          message: this.$t('nodeForm.webhook.testError'),
          position: 'top'
        });
      } finally {
        this.testingWebhook = false;
      }
    },
    initializeData() {
      // Garantir que $attrs.element.data existe
      if (!this.$attrs.element.data) {
        this.$attrs.element.data = {};
      }
      
      // Inicializar dados padrão se não existirem
      if (this.$attrs.element.data.webhookUrl === undefined) {
        this.$set(this.$attrs.element.data, 'webhookUrl', '');
      }
      if (this.$attrs.element.data.httpMethod === undefined) {
        this.$set(this.$attrs.element.data, 'httpMethod', 'POST');
      }
      if (this.$attrs.element.data.headers === undefined) {
        this.$set(this.$attrs.element.data, 'headers', []);
      }
      if (this.$attrs.element.data.bodyType === undefined) {
        this.$set(this.$attrs.element.data, 'bodyType', 'json');
      }
      if (this.$attrs.element.data.bodyContent === undefined) {
        this.$set(this.$attrs.element.data, 'bodyContent', '');
      }
      if (this.$attrs.element.data.timeout === undefined) {
        this.$set(this.$attrs.element.data, 'timeout', 10000);
      }
      if (this.$attrs.element.data.retryAttempts === undefined) {
        this.$set(this.$attrs.element.data, 'retryAttempts', 0);
      }
      if (this.$attrs.element.data.retryDelay === undefined) {
        this.$set(this.$attrs.element.data, 'retryDelay', 5000);
      }
    }
  },
  mounted() {
    this.initializeData();
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

.q-expansion-item {
  .q-expansion-item__content {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }
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
