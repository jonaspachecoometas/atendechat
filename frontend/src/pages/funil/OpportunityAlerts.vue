<template>
  <div class="opportunity-alerts" v-if="alertas.length">
    <q-banner
      v-for="alerta in alertas"
      :key="alerta.id"
      :class="['q-mb-sm', `alert-${alerta.type}`]"
      rounded
      clickable
      @click="alerta.action ? alerta.action.handler() : null"
    >
      <template v-slot:avatar>
        <q-icon :name="alerta.icon" :color="alerta.color" />
      </template>
      <div class="row items-center">
        <div class="col">
          <div class="text-weight-bold">{{ alerta.titulo }}</div>
          <div class="text-caption">{{ alerta.mensagem }}</div>
        </div>
        <div class="col-auto">
          <q-btn
            v-if="alerta.action"
            flat
            dense
            :color="alerta.color"
            :label="alerta.action.label"
            @click.stop="alerta.action.handler"
          />
        </div>
      </div>
    </q-banner>
  </div>
</template>

<script>
export default {
  name: 'OpportunityAlerts',
  props: {
    oportunidades: { type: Array, default: () => [] }
  },
  emits: ['view', 'update', 'advance', 'assign'],
  computed: {
    alertas() {
      const hoje = new Date()
      return this.oportunidades.flatMap(opp => {
        const lista = []
        
        // Alerta de vencendo (previsão de fechamento até 2 dias)
        if (opp.closingForecast) {
          const dataPrev = new Date(opp.closingForecast)
          // Ajusta para o início do dia no fuso horário local
          dataPrev.setHours(0, 0, 0, 0)
          const hoje = new Date()
          hoje.setHours(0, 0, 0, 0)
          const diff = (dataPrev - hoje) / (1000 * 60 * 60 * 24)
          if (diff >= 0 && diff <= 2) {
            lista.push({
              id: opp.id + '-vencendo',
              titulo: this.$t('funil.oportunidadeVencendo'),
              mensagem: `${opp.name} ${this.$t('funil.venceEm')} ${Math.ceil(diff)} ${this.$t('funil.dias')}`,
              color: 'warning',
              icon: 'mdi-alert',
              type: 'warning',
              action: {
                label: this.$t('funil.verDetalhes'),
                handler: () => this.$emit('view', opp)
              }
            })
          }
        }

        // Alerta de sem movimentação (sem histórico nos últimos 5 dias)
        if (opp.historico && opp.historico.length) {
          const ultMov = new Date(opp.historico[opp.historico.length - 1].data)
          const diffMov = (hoje - ultMov) / (1000 * 60 * 60 * 24)
          if (diffMov > 5) {
            lista.push({
              id: opp.id + '-sem-mov',
              titulo: this.$t('funil.semMovimentacao'),
              mensagem: `${opp.name} ${this.$t('funil.estaHa')} ${Math.floor(diffMov)} ${this.$t('funil.diasSemMovimentacao')}`,
              color: 'negative',
              icon: 'mdi-timer-sand',
              type: 'danger',
              action: {
                label: this.$t('funil.atualizar'),
                handler: () => this.$emit('update', opp)
              }
            })
          }
        }

        // Alerta de valor alto
        if (opp.value && opp.value > 10000) {
          lista.push({
            id: opp.id + '-valor-alto',
            titulo: this.$t('funil.valorAlto'),
            mensagem: `${opp.name} ${this.$t('funil.comValorDe')} R$ ${opp.value.toFixed(2)}`,
            color: 'info',
            icon: 'mdi-cash-multiple',
            type: 'info',
            action: {
              label: this.$t('funil.verDetalhes'),
              handler: () => this.$emit('view', opp)
            }
          })
        }

        // Alerta de oportunidade parada na mesma etapa por muito tempo
        if (opp.stageId && opp.historico && opp.historico.length) {
          const etapaAtual = opp.historico.find(h => h.stageId === opp.stageId)
          if (etapaAtual) {
            const tempoNaEtapa = (hoje - new Date(etapaAtual.data)) / (1000 * 60 * 60 * 24)
            if (tempoNaEtapa > 15) {
              lista.push({
                id: opp.id + '-etapa-estagnada',
                titulo: this.$t('funil.etapaEstagnada'),
                mensagem: `${opp.name} ${this.$t('funil.estaHa')} ${Math.floor(tempoNaEtapa)} ${this.$t('funil.diasNaEtapa')} ${opp.stageName}`,
                color: 'warning',
                icon: 'mdi-clock-alert',
                type: 'warning',
                action: {
                  label: this.$t('funil.avancarEtapa'),
                  handler: () => this.$emit('advance', opp)
                }
              })
            }
          }
        }

        // Alerta de oportunidade sem responsável
        if (!opp.responsibleId) {
          lista.push({
            id: opp.id + '-sem-responsavel',
            titulo: this.$t('funil.semResponsavel'),
            mensagem: `${opp.name} ${this.$t('funil.reponsavelAlerta')}`,
            color: 'warning',
            icon: 'mdi-account-alert',
            type: 'warning',
            action: {
              label: this.$t('funil.designar'),
              handler: () => this.$emit('assign', opp)
            }
          })
        }

        return lista
      })
    }
  },
  methods: {
    traduzirStatus(status) {
      if (status === 'open') return this.$t('funil.aberto')
      if (status === 'win') return this.$t('funil.ganho')
      if (status === 'lose') return this.$t('funil.perdido')
      return status
    }
  }
}
</script>

<style lang="scss" scoped>

.opportunity-alerts {
  margin-bottom: 18px;

  .q-banner {
    border-radius: 12px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .q-icon {
      font-size: 24px;
    }

    .text-weight-bold {
      font-size: 1.1rem;
      margin-bottom: 4px;
    }

    .text-caption {
      opacity: 0.8;
    }

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
}

.alert-warning {
  background: rgba(255, 152, 0, 0.1);
  border-left: 4px solid #ff9800;
}

.alert-danger {
  background: rgba(244, 67, 54, 0.1);
  border-left: 4px solid #f44336;
}

.alert-info {
  background: rgba(33, 150, 243, 0.1);
  border-left: 4px solid #2196f3;
}
</style> 
