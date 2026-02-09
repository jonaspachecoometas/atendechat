<template>
  <q-dialog
    persistent
    :model-value="showEditor"
    @update:model-value="$emit('update:showEditor', $event)"
  >
    <q-card
      style="width: 700px"
      class="q-pa-lg modern-modal"
    >
      <q-card-section class="modal-header">
        <div class="text-h6">
          {{ pipeline && pipeline.id ? $t('funil.editarPipe') : $t('funil.novoPipe') }}
        </div>
      </q-card-section>
      <q-card-section class="modal-body">
        <q-input
          class="row col q-mb-md"
          square
          outlined
          v-model="form.nome"
          :label="$t('funil.nomePipe')"
          :rules="[val => !!val || $t('funil.campoObrigatorio')]"
          lazy-rules
        />
        <div class="pipeline-editor__stages">
          <h3>{{ $t('funil.etapas') }}</h3>
          <div class="pipeline-editor__stages-list">
            <div v-for="(stage, idx) in stages" :key="stage.id || idx" class="pipeline-editor__stage-item">
              <p>ID: #{{ stage.id }}</p>
              <q-input
                class="row col q-mb-md"
                square
                outlined
                v-model="stage.nome"
                :label="$t('funil.etapa')"
                :rules="[val => !!val || $t('funil.campoObrigatorio')]"
                lazy-rules
              />
              <q-input
                filled
                hide-bottom-space
                :style="`background: ${stage.cor}`"
                v-model="stage.cor"
                :rules="['anyColor']"
                class="q-my-md color-input"
              >
                <template v-slot:append>
                  <q-icon
                    name="colorize"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-color
                        format-model="hex"
                        square
                        default-view="palette"
                        no-header
                        bordered
                        v-model="stage.cor"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-btn
                flat
                color="negative"
                icon="mdi-delete"
                @click="removerStage(idx)"
                class="q-ml-sm"
              />
            </div>
          </div>
          <q-btn
            color="primary"
            :label="$t('common.add')"
            icon="add"
            @click="adicionarStage"
            class="q-mt-md"
          />
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
          @click="salvarPipeline"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarPipeline, AlterarPipeline } from 'src/service/funil.js'
import { CriarStage, AlterarStage, DeletarStage, ListarStages } from 'src/service/estagio.js'

export default {
  name: 'PipelineEditor',
  props: {
    pipeline: Object,
    showEditor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        nome: ''
      },
      stages: [],
      deletedStages: []
    }
  },
  watch: {
    pipeline: {
      immediate: true,
      async handler(val) {
        if (val && val.id) {
          this.form = { nome: val.nome || val.name, id: val.id }
          const res = await ListarStages({ pipelineId: val.id })
          this.stages = (res.data.data || []).map(s => ({
            ...s,
            nome: s.nome || s.name || '',
            cor: s.cor || s.color || '#000000'
          }))
        } else {
          this.form = { nome: '' }
          this.stages = []
        }
      }
    }
  },
  methods: {
    adicionarStage() {
      this.stages.push({ nome: '', cor: '#00a300' })
    },
    removerStage(idx) {
      if (this.stages[idx].id) {
        this.deletedStages.push(this.stages[idx])
        this.stages.splice(idx, 1)
      } else {
        this.stages.splice(idx, 1)
      }
    },
    async salvarPipeline() {
      let pipelineId = this.form.id
      if (pipelineId) {
        await AlterarPipeline({ ...this.form, name: this.form.nome })
      } else {
        const res = await CriarPipeline({ name: this.form.nome })
        pipelineId = res.data.id
      }

      for (const stage of this.deletedStages) {
        try {
          await DeletarStage(stage.id)
        } catch (error) {
          console.error('Erro ao excluir etapa:', error.data.error)
          this.$q.notify({
              type: 'negative',
              message: this.$t('funil.erroAoDeletarFunil') + ': ' + error.data.error
            });
        }
      }
      this.deletedStages = []

      for (const [idx, stage] of this.stages.entries()) {
        try {
          if (stage.id) {
            await AlterarStage({ ...stage, name: stage.nome, color: stage.cor, order: idx, pipelineId })
          } else {
            await CriarStage({ ...stage, name: stage.nome, color: stage.cor, order: idx, pipelineId })
          }
        } catch (error) {
          console.error('Erro ao salvar etapa:', error)
        }
      }
      
      this.$emit('saved')
    }
  }
}
</script>

<style lang="scss" scoped>
.modern-modal {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: #fff;
  transition: all 0.3s ease;

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e9ecef;

    .text-h6 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--q-primary);
    }
  }

  .modal-body {
    padding: 1.5rem;

    :deep(.q-field) {
      .q-field__control {
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--q-primary);
        }
      }

      &.q-field--focused .q-field__control {
        border-color: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.1);
      }
    }
    :deep(.color-input) {
      input {
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
  }
}

.pipeline-editor__stages {
  margin: 32px 0 20px 0;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 16px 0;
  }
}

.pipeline-editor__stages-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.pipeline-editor__stage-item {
  background: #f8f9fa;
  border: 1px solid #ececec;
  border-radius: 12px;
  padding: 16px;
  min-width: 220px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

:deep(.q-dialog__backdrop) {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.4);
}

@media (max-width: 600px) {
  .pipeline-editor__stages-list {
    gap: 12px;
  }
  .pipeline-editor__stage-item {
    min-width: 100%;
  }
}

.body--dark .modern-modal {
  background: #23272f !important;
}

.body--dark .pipeline-editor__stage-item {
  background: #181a20 !important;
  color: #fff;
}
</style> 
