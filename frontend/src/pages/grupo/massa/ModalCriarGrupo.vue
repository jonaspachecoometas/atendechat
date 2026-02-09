<template>
  <q-dialog
    persistent
    :model-value="modalCriarGrupo"
    @update:model-value="$emit('update:modalCriarGrupo', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ $t('grupoMassaModalCriarGrupo.form.createGroups') }}</div>
      </q-card-section>
      <q-card-section>
        <q-select
          class="row col"
          v-model="whatsappId"
          :options="cSessionsOptions"
          :label="$t('grupoMassa2.form.connection')"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="grupo.title"
           :label="$t('grupoMassaModalCriarGrupo.form.groupName')"
          style="margin-bottom: 15px;margin-right: 5px;"
        />
        <div class="col-4 q-py-md" style="margin: 1px;">
          <q-toggle
            style="margin: 1px;"
            v-model="contatosImportar"
            :label="$t('grupoMassaModalCriarGrupo.form.importContacts')"
            dense
          />
        </div>
        <div class="col-12 q-py-md" v-if="contatosImportar">
          <div v-if="loading">{{ $t('grupoMassaUsuarios.loading.fetchingContacts') }}</div>
          <div v-if="loading" class="loading-bar">
            <div class="bar"></div>
          </div>
          <q-select
            v-model="selectedContacts"
            :options="contactOptions"
            :label="$t('grupoMassaModalCriarGrupo.form.selectContact')"
            multiple
            use-chips
            dense
            outlined
            style="margin: 1px;"
          />
        </div>
        <q-input
          v-if="!contatosImportar"
          class="row col"
          square
          outlined
          v-model="grupo.number"
          :label="$t('grupoMassaModalCriarGrupo.form.participantNumber')"
          style="margin-bottom: 15px;margin-right: 5px;"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="quantidade"
          :label="$t('grupoMassaModalCriarGrupo.form.groupQuantity')"
          style="margin-bottom: 15px; margin-right: 5px;"
          type="number"
          min="1"
          step="1"
        />
        <div class="row q-px-md">
          <div class="col-12 q-py-md">
            <div v-if="loading2">{{ $t('grupoMassaModalCriarGrupo.loading.creatingGroups') }}</div>
            <div v-if="loading2" class="loading-bar">
              <div class="bar"></div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          :label="$t('common.cancel')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('common.save')"
          color="primary"
          @click="handleCriarGrupo"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
  import { CriarGrupo } from 'src/service/grupo.js'
  import { mapGetters } from 'vuex';
  import { ListarContatos } from 'src/service/contatos.js'

  export default {
    name: 'ModalCriarGrupo',
    props: {
      modalCriarGrupo: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        whatsappId: null,
        quantidade: '',
        contatosImportar: false,
        selectedContacts: [],
        contactOptions: [],
        loading: false,
        loading2: false,
        params: {
          hasMore: true
        },
        grupo: {
          title: '',
          whatsappId: null,
          number: null,
        },
        // Sistema de gerenciamento de memória
        timers: []
      }
    },
    watch:{
      contatosImportar(newVal, oldVal) {
        this.listarContatos();
      },
    },
    computed: {
      ...mapGetters(['whatsapps']),
      cSessions() {
        // return this.whatsapps.filter(w => w.type === 'whatsapp' && !w.isDeleted)
        return this.whatsapps.filter(w => ["whatsapp", "baileys", "evo", "zapi", "uazapi", "meow"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
      },
      cSessionsOptions() {
        return this.cSessions.map(w => ({ label: w.name, value: w.id }))
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
          console.error(this.$t('grupoMassaModalCriarGrupo.loading.fetchingContacts'), error);
        } finally {
          this.loading = false;
        }
      },
      processarContatos(data) {
        const contatosFiltrados = data.contacts.filter(contato => !contato.isGroup);
        const opcoesContato = contatosFiltrados.map(contato => ({
          label: contato.name,
          value: contato.number
        }));
        this.contactOptions = [...this.contactOptions, ...opcoesContato];
      },
      resetarGrupo () {
        this.grupo = {
          title: '',
          whatsappId  : null,
          number: null,
        }
      },
      fecharModal () {
        this.resetarGrupo()
        this.$emit('update:modalCriarGrupo', false)
      },
      abrirModal () {
        this.resetarGrupo()
      },
      async handleCriarGrupo () {
        if (this.whatsappId === null) {
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
        if (this.grupo.title === '' || this.grupo.title === undefined) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassaModalCriarGrupo.notifications.fillGroupName'),
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
        if (!this.contatosImportar && this.grupo.number === null) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassaModalCriarGrupo.notifications.fillParticipant'),
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
        if (this.contatosImportar && this.selectedContacts.length === 0) {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassaModalCriarGrupo.notifications.selectContact'),
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
        if (this.quantidade === '') {
          this.$q.notify({
            html: true,
            message: this.$t('grupoMassaModalCriarGrupo.notifications.fillQuantity'),
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
        try {
          if (this.contatosImportar){
            this.loading2 = true;
            const titles = [];
            for (let i = 1; i <= this.quantidade; i++) {
              titles.push(`${this.grupo.title} #${String(i).padStart(2, '0')}`);
            }
            // Garantir que selectedContacts seja sempre um array
            const contactsArray = Array.isArray(this.selectedContacts) 
              ? this.selectedContacts 
              : (this.selectedContacts ? [this.selectedContacts] : []);
            // Pegar o primeiro número do array e converter para string
            const firstNumber = contactsArray.length > 0 ? contactsArray[0].value : '';
            const data = {
              whatsappId: this.whatsappId.value,
              titles,
              number: firstNumber,
            };
            await CriarGrupo(data);
            this.loading2 = false;
            this.fecharModal();
          }
          if(!this.contatosImportar){
            this.loading2 = true;
            const titles = [];
            for (let i = 1; i <= this.quantidade; i++) {
              titles.push(`${this.grupo.title} #${String(i).padStart(2, '0')}`);
            }
            const data = {
              whatsappId: this.whatsappId.value,
              titles,
              number: this.grupo.number,
            };
            await CriarGrupo(data);
            this.loading2 = false;
            this.fecharModal();
          }
        } catch (error) {
          console.error(error);
          this.loading2 = false;
          // this.$notificarErro('Ocorreu um erro ao criar os grupos', error);
        }
      }
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
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1px solid rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, background 0.2s;
}
.q-card-section .text-h6 {
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
.q-select, .q-input, .q-toggle {
  border-radius: 12px;
}
body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 8px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
}
</style>