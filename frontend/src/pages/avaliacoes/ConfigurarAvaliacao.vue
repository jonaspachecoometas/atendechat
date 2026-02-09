<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-card class="q-ma-sm" square style="border-radius: 8px !important;">
      <div class="text-h5 q-pa-sm q-ma-sm">
        {{ $t('configurarAvaliacao.title') }}
        <q-icon name="help">
          <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4">
            <span class="text-weight-medium">
              {{ $t('configurarAvaliacao.tooltipTitle') }}
            </span>
            <span class="row col">
              {{ $t('configurarAvaliacao.tooltipEvaluation') }}
            </span>
            <span class="row col">
              {{ $t('configurarAvaliacao.tooltipLabel') }}
            </span>
            <span class="row col q-mt-sm">
              {{ $t('configurarAvaliacao.tooltipMessage') }}
            </span>
          </q-tooltip>
        </q-icon>

        <q-btn
          color="primary"
          :label="$t('configurarAvaliacao.saveButton')"
          class="float-right"
          @click="salvarAvaliacao"
        />
      </div
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            class="col-xs-12 col-sm-4 q-mt-sm"
            v-for="avaliacao in rating"
            :key="avaliacao.rating"
          >
            <q-card square bordered flat>
              <div class="text-body1 text-bold bg-grey-3 q-pa-xs q-pl-sm">
                <q-input
                  v-if="isEditable"
                  v-model="avaliacao.label"
                  dense
                  outlined
                  class="bg-white"
                  :placeholder="$t('configurarAvaliacao.editablePlaceholder')"
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-account-star-outline" /> {{ avaliacao.rating }}
                  </template>
                </q-input>
                <span v-else>{{ avaliacao.label }}</span>
              </div>
              <div class="q-pa-sm">
                <q-input
                  v-if="isEditable"
                  v-model="avaliacao.message"
                  dense
                  outlined
                  type="textarea"
                  :label="$t('configurarAvaliacao.messagePlaceholder')"
                  class="bg-white message-input"
                  :rows="3"
                  counter
                />
                <span v-else>{{ avaliacao.message }}</span>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="ratingStore"
              outlined
              :label="$t('configurarAvaliacao.ratingStore')"
              dense
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="ratingStoreError"
              outlined
              :label="$t('configurarAvaliacao.ratingStoreError')"
              dense
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-input
              v-model="ratingStoreAttemp"
              outlined
              :label="$t('configurarAvaliacao.ratingStoreAttempt')"
              dense
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="ratingStoreTimePreset"
              :options="timeOptions"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              outlined
              :label="$t('configurarAvaliacao.ratingStoreTime')"
              dense
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              v-model="ratingStoreUse"
              :options="useOptions"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              outlined
              :label="$t('configurarAvaliacao.ratingStoreUse')"
              dense
            />
          </div>
          <div class="col-xs-12" v-if="ratingStoreTimePreset === 'custom'">
            <q-input
              v-model="ratingStoreTimeCustomMinutes"
              outlined
              :label="$t('configurarAvaliacao.ratingStoreTimeCustomMinutes')"
              dense
              type="number"
              min="0"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'
import { MostrarAvaliacao, AtualizarAvaliacao } from 'src/service/empresas.js'
import { AlterarDadosAvaliacao } from 'src/service/tenants.js'

export default {
  name: 'Avaliacao',
  components: { VEmojiPicker },
  data () {
    return {
      pageAllowed: true,
      userProfile: 'user',
      isEditable: true,
      ratingStore: "",
      ratingStoreError: "",
      ratingStoreAttemp: "",
      ratingStoreTimePreset: "",
      ratingStoreTimeCustomMinutes: "",
      ratingStoreTime: "",
      ratingStoreUse: "disabled",
      timeOptions: [
        { label: this.$t('configurarAvaliacao.timeOptions.oneMinute'), value: (1 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.fiveMinutes'), value: (5 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.tenMinutes'), value: (10 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.fifteenMinutes'), value: (15 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.thirtyMinutes'), value: (30 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.oneHour'), value: (60 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.twoHours'), value: (120 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.sixHours'), value: (360 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.twelveHours'), value: (720 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.twentyFourHours'), value: (1440 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.fortyEightHours'), value: (2880 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.sevenDays'), value: (10080 * 60000).toString() },
        { label: this.$t('configurarAvaliacao.timeOptions.custom'), value: 'custom' }
      ],
      useOptions: [
        { label: this.$t('configurarAvaliacao.useOptions.enabled'), value: 'enabled' },
        { label: this.$t('configurarAvaliacao.useOptions.disabled'), value: 'disabled' }
      ],
      tenantId: "",
      rating: [
        { label: this.$t("configurarAvaliacao.labels.ruim"), rating: 0, message: "" },
        { label: this.$t("configurarAvaliacao.labels.regular"), rating: 1, message: "" },
        { label: this.$t("configurarAvaliacao.labels.bom"), rating: 2, message: "" },
        { label: this.$t("configurarAvaliacao.labels.muitoBom"), rating: 3, message: "" },
        { label: this.$t("configurarAvaliacao.labels.excelente"), rating: 4, message: "" },
        { label: this.$t("configurarAvaliacao.labels.incrivel"), rating: 5, message: "" },
      ]
    }
  },
  methods: {
    async listarAvaliacao () {
      const { data } = await MostrarAvaliacao()
      this.rating = data[0].rating
      this.ratingStore = data[0].ratingStore
      this.ratingStoreAttemp = data[0].ratingStoreAttemp
      this.ratingStoreError = data[0].ratingStoreError
      this.ratingStoreTime = data[0].ratingStoreTime || ""
      // tenta casar tempo com opções; senão usa personalizado
      const found = this.timeOptions.find(o => o.value === this.ratingStoreTime)
      if (found) {
        this.ratingStoreTimePreset = found.value
        this.ratingStoreTimeCustomMinutes = ""
      } else {
        this.ratingStoreTimePreset = 'custom'
        const ms = parseInt(this.ratingStoreTime || '0', 10)
        this.ratingStoreTimeCustomMinutes = isNaN(ms) ? "" : Math.round(ms / 60000).toString()
      }
      this.ratingStoreUse = data[0].ratingStoreUse || "disabled"
      this.tenantId = data[0].id
    },
    async salvarAvaliacao () {
      try{
        const { data } = await AtualizarAvaliacao(this.rating)
        this.rating = data.rating
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t("configurarAvaliacao.successMessage"),
        });
      } catch(e){
        console.log(this.$t("configurarAvaliacao.errorMessage") + e)
      }
      try {
        // Criar um array de mensagens de avaliação
        const evaluationMessages = this.rating.map(avaliacao => ({
          rating: avaliacao.rating?.toString(),
          message: avaliacao.message
        }));

        // definir tempo em ms a enviar
        let timeToSend = this.ratingStoreTime
        if (this.ratingStoreTimePreset === 'custom') {
          const minutes = parseInt(this.ratingStoreTimeCustomMinutes || '0', 10)
          timeToSend = isNaN(minutes) ? "" : (minutes * 60000).toString()
        } else if (this.ratingStoreTimePreset) {
          timeToSend = this.ratingStoreTimePreset
        }

        const payload = {
          id: this.tenantId,
          rating: this.rating,
          ratingStore: this.ratingStore,
          ratingStoreError: this.ratingStoreError,
          ratingStoreAttemp: this.ratingStoreAttemp,
          ratingStoreTime: timeToSend,
          ratingStoreUse: this.ratingStoreUse,
          evaluationMessage: JSON.stringify(evaluationMessages)
        };

        const { data } = await AlterarDadosAvaliacao(payload);

        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t("configurarAvaliacao.successMessage")
        });
      } catch (e) {
        console.log(this.$t("configurarAvaliacao.errorMessage") + e);
      }
    },
  },
  mounted () {
    this.listarAvaliacao()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.avaliacoes === true;
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .text-h5 {
    color: var(--q-primary);
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .q-icon {
      color: var(--q-primary);
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .q-card-section {
    padding: 1.2rem 1.5rem;

    .q-card {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
      }

      .text-body1 {
        padding: 0.8rem;
        border-radius: 12px;
        background: rgba(var(--q-primary-rgb), 0.05);
        color: var(--q-primary);
        font-weight: 500;
      }
    }
  }
}

.q-input {
  .q-field__control {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  }

  &.q-field--focused .q-field__control {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.bg-white {
    .q-field__control {
      background: white;
    }
  }
}

.q-separator {
  background: rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
}

.q-tooltip {
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .text-weight-medium {
    color: var(--q-primary);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  .row.col {
    color: rgba(0, 0, 0, 0.7);
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }
}

.q-banner {
  border-radius: 12px;
  margin: 1rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.bg-red {
    background: rgba(var(--q-negative-rgb), 0.1) !important;
    color: var(--q-negative) !important;
    border: 1px solid rgba(var(--q-negative-rgb), 0.2) !important;
  }

  .q-icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  span {
    font-weight: 500;
  }
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .q-card-section {
      .q-card {
        background: rgba(255, 255, 255, 0.05);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .text-body1 {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }

  .q-input {
    .q-field__control {
      background: rgba(255, 255, 255, 0.05);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    &.q-field--focused .q-field__control {
      background: rgba(255, 255, 255, 0.15);
    }

    &.bg-white {
      .q-field__control {
        background: rgba(30, 30, 30, 0.95);
      }
    }
  }

  .q-separator {
    background: rgba(255, 255, 255, 0.1);
  }

  .q-tooltip {
    background: rgba(30, 30, 30, 0.95) !important;
    border-color: rgba(255, 255, 255, 0.1);

    .text-weight-medium {
      color: var(--q-primary);
    }

    .row.col {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .q-banner {
    &.bg-red {
      background: rgba(var(--q-negative-rgb), 0.2) !important;
      color: #ff6b6b !important;
      border: 1px solid rgba(var(--q-negative-rgb), 0.3) !important;
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-card {
    margin: 0.5rem;
    border-radius: 12px !important;

    .text-h5 {
      font-size: 1.2rem;
      flex-wrap: wrap;
    }

    .q-card-section {
      padding: 1rem;

      .q-card {
        margin-bottom: 0.5rem;
      }
    }
  }

  .q-input {
    margin-bottom: 0.5rem;
  }

  .q-banner {
    margin: 0.5rem;
    padding: 0.8rem;
  }
}

.message-input {
  .q-field__control {
    min-height: 60px !important;
  }
  
  .q-field__native {
    padding: 4px 8px;
    font-size: 0.9rem;
  }
}
</style>
