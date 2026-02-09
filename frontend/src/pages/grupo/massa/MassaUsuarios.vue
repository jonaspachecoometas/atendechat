<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">

      <q-card
        flat
        bordered
        class="my-sticky-dynamic q-ma-lg"
      >
        <q-card-section class="text-h6 text-bold">
          {{ $t('grupoMassaUsuarios.title') }}
        </q-card-section>
        <q-list class="text-weight-medium">
          
          <div class="row q-px-md">
            <div class="col-6 q-py-md">
              <q-select
                style="margin: 1px;"
                v-model="whatsappId"
                :options="cSessionsOptions"
                :label="$t('grupoMassa2.form.connection')"
                dense
                outlined
                @update:model-value="popularGrupos()"
              />
            </div>
            <div class="col-6 q-py-md">
              <q-select
                style="margin: 1px;"
                v-model="groupIds"
                :options="groupOptions"
                :label="$t('grupoMassa2.form.groups')"
                dense
                multiple
                use-chips
                outlined
                option-value="id"
                option-label="name"
                :loading="loadingGroups"
              />
              <div v-if="loadingGroups" class="q-mt-sm">
                <div class="text-caption text-primary">{{ $t('grupoMassa1.notifications.loadingGroups') }}</div>
                <div class="loading-bar">
                  <div class="bar"></div>
                </div>
              </div>
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="promover"
                 :label="$t('grupoMassaUsuarios.form.promoteAdmins')"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="demover"
                :label="$t('grupoMassaUsuarios.form.demoteAdmins')"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div v-if="whatsappId?.type !== 'baileys'" class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="adicionar"
                :label="$t('grupoMassaUsuarios.form.addUsers')"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div class="row q-px-md">
            <div class="col-12 q-py-md">
              <q-toggle
                v-model="remover"
                :label="$t('grupoMassaUsuarios.form.removeUsers')"
                dense
                style="margin: 1px;"
              />
            </div>
          </div>

          <div v-if="promover || demover || adicionar || remover" class="col-4 q-py-md" style="margin: 1px;">
            <q-toggle
              style="margin: 1px;"
              color="green"
              v-model="contatosImportar"
              :label="$t('grupoMassaUsuarios.form.importContacts')"
              dense
            />
          </div>

          <div class="col-12 q-py-md" v-if="(promover && contatosImportar) || (demover && contatosImportar) || (adicionar && contatosImportar) || (remover && contatosImportar)">
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
              </q-select>
          </div>
            
          <div class="col-9 q-py-md" v-if="(promover && !contatosImportar) || (demover && !contatosImportar) || (adicionar && !contatosImportar) || (remover && !contatosImportar)">
            <q-input
              v-model="numberInput"
              :label="$t('grupoMassaUsuarios.form.numbersCommaSeparated')"
              dense
              outlined
              style="margin: 1px;"
            />
          </div>
          <div class="col-3 q-py-md" v-if="(promover && !contatosImportar) || (demover && !contatosImportar) || (adicionar && !contatosImportar) || (remover && !contatosImportar)">
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

          <div class="col-12">
            <div class="col-12 q-py-md">
              <div v-if="loading2">{{ $t('grupoMassaUsuarios.loading.executingActions') }}<</div>
              <div v-if="loading2" class="loading-bar">
                <div class="bar"></div>
              </div>
            </div>
            <q-btn :label="$t('grupoMassaUsuarios.actions.execute')" @click="enviar" color="primary" style="margin-bottom: 15px;margin-right: 5px;"/>
            <q-btn :label="$t('grupoMassa1.actions.clear')" @click="limparCampos" color="negative" style="margin-bottom: 15px;margin-left: 5px;"/>
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
import { mapGetters } from 'vuex';
import { ListarGrupo, PromoverUsuario, DemoverUsuario, AdicionarUsuario, RemoverUsuario } from 'src/service/grupo.js'
import { ListarContatos } from 'src/service/contatos.js'

export default {
  name: 'MassaGrupo',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      groupOptions: [],
      groupIds: [],
      whatsappId: null,
      promover: false,
      demover: false,
      adicionar: false,
      remover: false,
      contatosImportar: false,
      numberInput: '',
      file: null,
      loading: false,
      loading2: false,
      loadingGroups: false,
      params: {
        hasMore: true
      },
      selectedContacts: [],
      contactOptions: [],
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  watch: {
    contatosImportar(newVal, oldVal) {
      this.listarContatos();
    },
    promover(newValue) {
      if (newValue) {
        this.demover = false;
        this.adicionar = false;
        this.remover = false;
      }
    },
    demover(newValue) {
      if (newValue) {
        this.promover = false;
        this.adicionar = false;
        this.remover = false;
      }
    },
    adicionar(newValue) {
      if (newValue) {
        this.promover = false;
        this.demover = false;
        this.remover = false;
      }
    },
    remover(newValue) {
      if (newValue) {
        this.promover = false;
        this.demover = false;
        this.adicionar = false;
      }
    },
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      // return this.whatsapps.filter(w => w.type === 'whatsapp' && !w.isDeleted)
      return this.whatsapps.filter(w => ["whatsapp", "baileys", "evo", "zapi", "uazapi", "meow"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type  }))
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
    async limparCampos(){
      this.groupIds = []
      this.groupOptions = []
      this.whatsappId = null
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
            await new Promise(resolve => {
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
      const contatosFiltrados = data.contacts.filter(contato => this.isGroup ? contato.isGroup : !contato.isGroup);
      const opcoesContato = contatosFiltrados.map(contato => ({
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
    async popularGrupos() {
      // Limpar arrays antes de popular novamente
      this.groupIds = [];
      this.groupOptions = [];
      
      if (!this.whatsappId) return;
      
      this.loadingGroups = true;
      try {
        const data = {
          whatsappId: this.whatsappId.value
        }
        const reponse = await ListarGrupo(data);
        this.groupOptions = reponse.data.groups.map(group => ({
          id: group.id,
          name: group.name
        }));
      } catch (error) {
        console.error('Erro ao listar grupos:', error);
        this.groupOptions = [];
      } finally {
        this.loadingGroups = false;
      }
    },
    async promoverUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await PromoverUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await PromoverUsuario(data)
      }
    },
    async demoverUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await DemoverUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await DemoverUsuario(data)
      }
    },
    async adicionarUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await AdicionarUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await AdicionarUsuario(data)
      }
    },
    async removerUsuario(){
      const grupos = this.groupIds.map(group => group.id);
      if (this.contatosImportar){
        const numbers = this.selectedContacts.map(contact => contact.value);
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await RemoverUsuario(data)
      }
      if (!this.contatosImportar){
        const numbers = this.numberInput.split(',').map(num => num.trim())
        const data = {
          whatsappId: this.whatsappId.value,
          groupIds: grupos,
          participants: numbers,
        };
        await RemoverUsuario(data)
      }
    },
    async enviar(){
      this.loading2 = true
      if(this.whatsappId === null) {
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
        this.loading2 = false
        return;
      }
      if(this.groupIds.length === 0) {
        this.$q.notify({
          html: true,
          message: this.$t('grupoMassa2.notifications.selectGroups'),
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading2 = false
        return;
      }
      if (!this.contatosImportar && this.numberInput === '') {
        this.$q.notify({
          html: true,
          message: this.$t('grupoMassa2.notifications.fillContacts'),
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading2 = false
        return;
      }
      if (this.contatosImportar && this.selectedContacts.length === 0) {
        this.$q.notify({
          html: true,
          message: this.$t('grupoMassa2.notifications.fillContacts'),
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.loading2 = false
        return;
      }
      if(this.promover){
        try{
          await this.promoverUsuario()
        } catch(e){
          this.loading2 = false
        } 
      }
      if(this.demover){
        try{
          await this.demoverUsuario()
        } catch(e){
          this.loading2 = false
        } 
      }
      if(this.adicionar){
        try{
          await this.adicionarUsuario()
        } catch(e){
          this.loading2 = false
        }
      }
      if(this.remover){
        try{
          await this.removerUsuario()
        } catch(e){
          this.loading2 = false
        }
      }
      this.loading2 = false
      this.limparCampos()
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.grupo === true;
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
  .bar {
    width: 0;
    height: 100%;
    background-color: #007bff;
    position: absolute;
    top: 0;
    left: 0;
    animation: loadingAnimation 1s infinite;
  }
}
@keyframes loadingAnimation {
  0% { width: 0; }
  100% { width: 100%; }
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
body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
}
</style>
