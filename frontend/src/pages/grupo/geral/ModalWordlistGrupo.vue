<template>
  <q-dialog
    persistent
    :value="modalWordlistGrupo"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ $t('grupoGeralModalWordlistGrupo.dialog.title') }}</div>
      </q-card-section>
      <q-card-section>
        <q-select
          class="row col"
          v-model="whatsappId"
          :options="cSessionsOptions"
          :label="$t('grupoGeralModalWordlistGrupo.form.connection')"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
        />
        <q-toggle
          style="margin: 1px;"
          v-model="ligarVigia"
          :label="$t('grupoGeralModalWordlistGrupo.form.toggleLabel')"
          dense
        />
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
          @click="handleAtualizarWhatsapp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { UpdateWhatsapp } from 'src/service/sessoesWhatsapp.js'

export default {
  name: 'ModalWordlistGrupo',
  props: {
    modalWordlistGrupo: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      whatsappId: null,
      loading: false,
      params: {
        hasMore: true
      },
      ligarVigia: false,
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  watch: {
    whatsappId(newValue) {
      if (newValue) {
        const selectedConnection = this.whatsapps.find(w => w.id === newValue.value);
        this.ligarVigia = selectedConnection && selectedConnection.wordList === 'enabled';
      } else {
        this.ligarVigia = false;
      }
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => ["whatsapp", "baileys"].includes(w.type) && !w.isDeleted);
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type }))
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
    resetarGrupo () {
      this.whatsappId = null
      this.ligarVigia = false
    },
    fecharModal () {
      this.resetarGrupo()
      this.$emit('update:modalWordlistGrupo', false)
    },
    abrirModal () {
      this.resetarGrupo()
    },
    async handleAtualizarWhatsapp () {
      this.loading = true
      if (this.whatsappId === null) {
        this.$q.notify({
          html: true,
          message: this.$t('grupoGeralModalWordlistGrupo.notifications.selectConnection'),
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
        const wordListStatus = this.ligarVigia ? 'enabled' : 'disabled';
        const dataToUpdate = {
          id: this.whatsappId.value,
          wordList: wordListStatus,
          type: this.whatsappId.type
        };
        await UpdateWhatsapp(this.whatsappId.value, dataToUpdate);
        this.$q.notify({
          type: 'positive',
          message: this.$t('grupoGeralModalWordlistGrupo.notifications.updateSuccess', {
            connection: this.whatsappId.label,
          }),
        });
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('grupoGeralModalWordlistGrupo.notifications.updateError'),
        });
        this.fecharModal()
        this.loading = false
      }
      this.fecharModal()
      this.loading = false
      const timerId = setTimeout(() => {
        window.location.reload();
      }, 300);
      this.addTimer(timerId);
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
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
}

.q-card-section {
  padding: 18px 24px;
}

.q-input {
  .q-field__control {
    background: rgba(255,255,255,0.7);
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(255,255,255,0.9);
    }
  }
  &.q-field--focused .q-field__control {
    background: rgba(255,255,255,0.95);
    box-shadow: 0 4px 12px rgba(0,0,0,0.10);
  }
}

.q-card-actions {
  padding: 16px 24px;
  border-top: 1px solid rgba(0,0,0,0.06);
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
  .q-input {
    .q-field__control {
      background: rgba(255,255,255,0.05);
      &:hover {
        background: rgba(255,255,255,0.10);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.15);
    }
  }
}

@media (max-width: 600px) {
  .q-card {
    width: 98vw !important;
    min-width: unset !important;
    border-radius: 10px;
    padding: 0;
  }
  .q-card-section, .q-card-actions {
    padding: 10px 8px;
  }
}
</style>