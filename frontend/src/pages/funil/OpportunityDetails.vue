<template>
  <q-dialog :model-value="show" @update:model-value="onDialogUpdate" persistent>
    <q-card class="opportunity-details__modal">
      <q-card-section>
        <div class="row items-center q-mb-md">
          <div class="col">
            <div class="text-h6">{{ $t('funil.detalhesOportunidade') }}</div>
          </div>
          <div class="col-auto">
            <q-btn flat round icon="close" @click="$emit('close')" />
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('funil.basicas') }}</div>
              <div class="opportunity-details__info-row">
                <q-icon name="label" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.nome') }}</div>
                  <div class="text-body1">{{ oportunidade.name }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row">
                <q-icon name="account_tree" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.pipeline') }}</div>
                  <div class="text-body1">{{ nomePipeline }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row">
                <q-icon name="flag" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.etapa') }}</div>
                  <div class="text-body1">{{ nomeEtapa }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row">
                <q-icon name="info" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.status') }}</div>
                  <q-badge :color="corStatus(oportunidade.status)">{{ traduzirStatus(oportunidade.status) }}</q-badge>
                </div>
              </div>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('funil.valoresData') }}</div>
              <div class="opportunity-details__info-row">
                <q-icon name="payments" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.valor') }}</div>
                  <div class="text-body1 text-primary">{{ formatarValor(oportunidade.value) }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row">
                <q-icon name="event" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.previsao') }}</div>
                  <div class="text-body1">{{ formatarData(oportunidade.closingForecast) }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row">
                <q-icon name="schedule" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.criadoEm') }}</div>
                  <div class="text-body1">{{ formatarData(oportunidade.createdAt) }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row">
                <q-icon name="update" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.ultimaUpdate') }}</div>
                  <div class="text-body1">{{ formatarData(oportunidade.updatedAt) }}</div>
                </div>
              </div>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('funil.responsaveis') }}</div>
              <div class="opportunity-details__info-row">
                <q-icon name="person" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.responsavel') }}</div>
                  <div class="text-body1">{{ nomeResponsavel }}</div>
                </div>
              </div>
              <div class="opportunity-details__info-row" v-if="oportunidade.leadName">
                <q-icon name="business" size="sm" class="text-primary" />
                <div>
                  <div class="text-caption">{{ $t('funil.lead') }}</div>
                  <div class="text-body1">{{ oportunidade.leadName }}</div>
                </div>
              </div>
            </q-card>
          </div>

          <!-- Nova seção de Contato -->
          <div class="col-12 col-md-6" v-if="oportunidade.contact">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">Contato</div>
              <div class="opportunity-details__info-row blur-effect">
                <q-avatar size="40px" v-if="oportunidade.contact.profilePicUrl && oportunidade.contact.profilePicUrl !== 'null' && oportunidade.contact.profilePicUrl !== 'undefined'">
                  <img :src="oportunidade.contact.profilePicUrl" alt="Foto de perfil" />
                </q-avatar>
                <div>
                  <div class="text-caption blur-effect">{{ $t('funil.nome') }}</div>
                  <div class="text-body1 blur-effect">{{ oportunidade.contact.name }}</div>
                  <div class="text-caption blur-effect">{{ $t('funil.numero') }}</div>
                  <div class="text-body1 blur-effect">{{ oportunidade.contact.number }}</div>
                  <div class="text-caption blur-effect">{{ $t('funil.email') }}</div>
                  <div class="text-body1 blur-effect">{{ oportunidade.contact.email }}</div>
                </div>
              </div>
            </q-card>
          </div>

          <div class="col-12">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('funil.descricao') }}</div>
              <div class="text-body1">{{ oportunidade.description || $t('funil.semDescricao') }}</div>
            </q-card>
          </div>

          <div class="col-12" v-if="oportunidade.produtos && oportunidade.produtos.length">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('funil.produtos') }}</div>
              <q-list>
                <q-item v-for="produto in oportunidade.produtos" :key="produto.id">
                  <q-item-section>
                    <q-item-label>{{ produto.nome }}</q-item-label>
                    <q-item-label caption>R$ {{ produto.valor.toFixed(2) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>

          <div class="col-12" v-if="oportunidade.historico && oportunidade.historico.length">
            <q-card flat bordered class="q-pa-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('funil.historicoAtividades') }}</div>
              <q-timeline color="primary">
                <q-timeline-entry
                  v-for="item in oportunidade.historico"
                  :key="item.id"
                  :title="item.descricao"
                  :subtitle="formatarData(item.data)"
                  icon="event"
                />
              </q-timeline>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="negative" @click="$emit('close')" />
        <q-btn flat label="Editar" color="primary" @click="editarOportunidade" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'OpportunityDetails',
  props: {
    show: { type: Boolean, default: false },
    oportunidade: { type: Object, required: true },
    pipelines: { type: Array, default: () => [] },
    stages: { type: Array, default: () => [] },
    responsaveis: { type: Array, default: () => [] }
  },
  computed: {
    nomePipeline() {
      const s = this.stages.find(e => String(e.id) === String(this.oportunidade.stageId))
      if (!s) return ''
      const p = this.pipelines.find(p => String(p.id) === String(s.pipelineId))
      return p ? p.name : ''
    },
    nomeEtapa() {
      const s = this.stages.find(e => String(e.id) === String(this.oportunidade.stageId))
      return s ? s.name : ''
    },
    nomeResponsavel() {
      const r = this.responsaveis.find(u => String(u.value) === String(this.oportunidade.responsibleId))
      return r ? r.label : this.$t('funil.semResponsavel')
    }
  },
  methods: {
    onDialogUpdate (val) {
      if (val === false) this.$emit('close')
    },
    traduzirStatus(status) {
      if (status === 'open') return this.$t('funil.aberto')
      if (status === 'win') return this.$t('funil.ganho')
      if (status === 'lose') return this.$t('funil.perdido')
      return status
    },
    corStatus(status) {
      if (status === 'open') return 'warning'
      if (status === 'win') return 'positive'
      if (status === 'lose') return 'negative'
      return 'grey'
    },
    formatarData(data) {
      if (!data) return '-'
      const d = new Date(data)
      const offset = d.getTimezoneOffset()
      d.setMinutes(d.getMinutes() + offset)
      return d.toLocaleDateString('pt-BR')
    },
    formatarValor(valor) {
      if (!valor) return 'R$ 0,00'
      return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`
    },
    editarOportunidade() {
      this.$emit('edit', this.oportunidade)
      this.$emit('close')
    }
  },

}
</script>

<style lang="scss" scoped>
.blur-effect {
  filter: blur(0px)
}

body.body--dark .opportunity-details__modal {
  background: rgba(30, 30, 30, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

body.body--dark .opportunity-details__modal .q-card {
  background: rgba(40, 40, 40, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
}

body.body--dark .opportunity-details__modal .text-h6,
body.body--dark .opportunity-details__modal .text-subtitle2 {
  color: #fff;
}

body.body--dark .opportunity-details__info-row {
  background: rgba(50, 50, 50, 0.7);
}

body.body--dark .opportunity-details__info-row .text-caption {
  color: #bbb;
}

body.body--dark .opportunity-details__info-row .text-body1 {
  color: #fff;
}

body.body--dark .opportunity-details__modal .q-card-actions {
  border-top: 1px solid rgba(255,255,255,0.05);
}

.opportunity-details__modal {
  min-width: 800px;
  max-width: 95vw;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .q-card-section {
    padding: 24px;
  }

  .text-h6 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: 0.3px;
  }

  .q-card {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  }

  .text-subtitle2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: var(--q-primary);
      border-radius: 2px;
    }
  }
}

.opportunity-details__info-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  .q-icon {
    color: var(--q-primary);
    opacity: 0.8;
  }

  .text-caption {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 4px;
  }

  .text-body1 {
    font-size: 1rem;
    color: #2c3e50;
    font-weight: 500;
  }
}

.text-green,
.text-primary {
  color: var(--q-primary) !important;
  font-weight: 600;
}

.q-card-actions {
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  .q-btn {
    border-radius: 8px;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
</style> 
