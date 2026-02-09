<template>
  <q-dialog
    persistent
    :model-value="modalSaudacao"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ saudacaoEdicao.id ? $t('grupoGeralModalSaudacao.dialog.titleEdit') : $t('grupoGeralModalSaudacao.dialog.titleCreate') }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          style="margin-bottom: 15px;margin-right: 5px;"
          v-model="saudacao.message"
          :label="$t('grupoGeralModalSaudacao.form.message')"
          autogrow
        />
        <q-select
          class="row col"
          square
          outlined
          v-model="whatsappId"
          :options="cSessionsOptions"
          :label="$t('grupoGeralModalSaudacao.form.whatsappId')"
          @update:model-value="popularGrupos()"
          style="margin-bottom: 15px;margin-right: 5px;"
        />
        <q-select
          class="row col"
          square
          outlined
          v-model="saudacao.groupId"
          :options="groupOptions"
          :label="$t('grupoGeralModalSaudacao.form.group')"
          option-value="id"
          option-label="name"
          multiple
          use-chips
          style="margin-bottom: 15px;margin-right: 5px;"
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
          @click="handleSaudacao"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarSaudacao, AlterarSaudacao } from 'src/service/saudacao.js'
import { ListarGrupo } from 'src/service/grupo.js'
import { mapGetters } from 'vuex';

export default {
  name: 'ModalSaudacao',
  props: {
    modalSaudacao: {
      type: Boolean,
      default: false
    },
    saudacaoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      groupOptions: [],
      whatsappId: null,
      saudacao: {
        id: null,
        whatsappId: null,
        groupId: null,
      }
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      // return this.whatsapps.filter(w => w.type === 'whatsapp' && !w.isDeleted)
      return this.whatsapps.filter(w => ["whatsapp", "baileys", "evo", "zapi", "uazapi"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id }))
    }
  },
  methods: {
    resetarSaudacao () {
      this.saudacao = {
        id: null,
        whatsappId  : null,
        groupId: null,
      }
    },
    fecharModal () {
      this.resetarSaudacao()
      this.$emit('update:saudacaoEdicao', { id: null })
      this.$emit('update:modalSaudacao', false)
    },
    abrirModal () {
      if (this.saudacaoEdicao.id) {
        this.saudacao = { ...this.saudacaoEdicao }
      } else {
        this.resetarSaudacao()
      }
    },
    async popularGrupos() {
      if (!this.whatsappId) return;

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
        console.error(this.$t('grupoGeralModalSaudacao.notifications.errorFetchingGroups'), error);
        this.groupOptions = [];
      }
    },
    async handleSaudacao () {
      try {
        this.loading = true
        if (this.saudacao.id) {
          const { data } = await AlterarSaudacao(this.saudacao)
          this.$emit('modal-saudacao:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('grupoGeralModalSaudacao.notifications.editSuccess'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarSaudacao(this.saudacao)
          this.$emit('modal-saudacao:criada', data[0])
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('grupoGeralModalSaudacao.notifications.createSuccess'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300);
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('grupoGeralModalSaudacao.notifications.errorSaving'), error);
      }
    }
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
