<template>
  <q-dialog
    persistent
    :model-value="modalApi"
    @update:model-value="$emit('update:modalApi', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card style="min-width: 80vw; width: 80vw" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{ apiEdicao.id ? $t('modalApi.titleEdit') : $t('modalApi.titleCreate') }}
        </div>
      </q-card-section>
      <q-card-section>
        <fieldset class="q-pa-md full-width">
          <legend class="q-px-sm">{{ $t('modalApi.fieldsetApiData') }}</legend>
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                square
                outlined
                v-model="api.name"
                :label="$t('modalApi.apiNameLabel')"
                @blur="v$.api.name.$touch"
                :error="v$.api.name.$error"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-select
                square
                outlined
                emit-value
                map-options
                clearable
                :label="$t('modalApi.apiSessionLabel')"
                color="primary"
                v-model="api.sessionId"
                :options="cSessions"
                :input-debounce="700"
                option-value="id"
                option-label="name"
                @blur="v$.api.sessionId.$touch"
                :error="v$.api.sessionId.$error"
                :error-message="$t('modalApi.apiSessionError')"
                :disable="!!api.id"
                :hint="$t('modalApi.apiSessionHint')"
              />
            </div>
          </div>
        </fieldset>

        <div v-if="isWabaSelected" class="q-pa-md full-width q-mt-md">
          <q-banner class="bg-yellow text-black" inline-actions>
            <div class="text-h6">{{ $t('modalApi.wabaBannerTitle') }}</div>
            <br />
            <p>
              {{ $t('modalApi.wabaBannerDescription1') }}
            </p>
            <p>
              {{ $t('modalApi.wabaBannerDescription2') }}
            </p>
            <p>
              {{ $t('modalApi.wabaBannerDescription3') }}
              <a
                href="https://www.postman.com/meta/workspace/whatsapp-business-platform/collection/13382743-84d01ff8-4253-4720-b454-af661f36acc2"
                target="_blank"
              >
                {{ $t('modalApi.wabaBannerLink') }}
              </a>
            </p>
          </q-banner>
        </div>

        <!-- <fieldset class="q-pa-md full-width q-mt-lg">
          <legend class="q-px-sm">{{ $t('modalApi.fieldsetWebhook') }}</legend>
          <div class="row q-col-gutter-md">
            <div class="col-12 q-mt-md">
              <q-input
                square
                outlined
                v-model="api.authToken"
                :label="$t('modalApi.apiAuthTokenLabel')"
                :hint="$t('modalApi.apiAuthTokenHint')"
                @blur="$v.api.authToken.$touch"
                :error="$v.api.authToken.$error"
                :error-message="$t('modalApi.apiAuthTokenError')"
              />
            </div>
          </div>
        </fieldset> -->

        <q-checkbox
          v-if="api.id"
          v-model="api.isActive"
          :label="$t('modalApi.activeLabel')"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-mt-md">
        <q-btn
          :label="$t('modalApi.cancelButton')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          :label="$t('modalApi.saveButton')"
          color="primary"
          @click="handleAPI"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, url } from '@vuelidate/validators'
// Em Vue 3 / Vuelidate v2 usamos v$ (não $v)
const isValidURL = (value) => !value || url.$validator(value)
import { CriarAPI, EditarAPI } from 'src/service/api.js'
export default {
  name: 'ModalFila',
  props: {
    modalApi: {
      type: Boolean,
      default: false
    },
    apiEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      api: {
        id: null,
        name: null,
        sessionId: null,
        urlServiceStatus: null,
        urlMessageStatus: null,
        // authToken: null,
        isActive: true
      }
    }
  },
  validations: {
    api: {
      name: { required },
      sessionId: {}, // Opcional - não requer validação obrigatória
      // authToken: { required },
      urlServiceStatus: { isValidURL },
      urlMessageStatus: { isValidURL }
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions () {
      return this.whatsapps.filter(w => (w.type === 'whatsapp' || w.type === 'waba' || w.type === 'baileys' || w.type === 'evo' || w.type === 'meow' || w.type === 'uazapi' || w.type === 'zapi') && !w.isDeleted)
    },
    isWabaSelected () {
      return this.api.sessionId && this.whatsapps.some(w => w.id === this.api.sessionId && w.type === 'waba')
    }
  },
  methods: {
    resetarApi () {
      this.api = {
        id: null,
        name: null,
        sessionId: null,
        urlServiceStatus: null,
        urlMessageStatus: null,
        // authToken: null,
        isActive: true
      }
    },
    fecharModal () {
      this.resetarApi()
      this.$emit('update:apiEdicao', { id: null })
      this.$emit('update:modalApi', false)
    },
    abrirModal () {
      if (this.apiEdicao.id) {
        this.api = { ...this.apiEdicao }
      } else {
        this.resetarApi()
      }
    },
    async handleAPI () {
      this.v$.api.$touch()
      if (this.v$.api.$error) {
        this.$notificarErro('Verifique os campos obrigatórios e inconsistências.')
        return
      }
      try {
        this.loading = true
        if (this.api.id) {
          const { data } = await EditarAPI(this.api)
          this.$emit('modal-api:editada', data)
          this.$notificarSucesso('API Editada')
        } else {
          const { data } = await CriarAPI(this.api)
          this.$emit('modal-api:criada', data)
          this.$notificarSucesso('API criada')
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('common.notifications.error'), error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    min-width: 80vw;
    width: 80vw;

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .q-card-section {
      padding: 1.2rem 1.5rem;

      .text-h6 {
        color: var(--q-primary);
        font-weight: 600;
        font-size: 1.2rem;
        margin: 0;
      }
    }

    fieldset {
      border: 1px solid rgba(var(--q-primary-rgb), 0.2);
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(var(--q-primary-rgb), 0.4);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      legend {
        color: var(--q-primary);
        font-weight: 600;
        font-size: 1rem;
        padding: 0 0.5rem;
      }
    }

    .q-input, .q-select {
      .q-field__control {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        .q-field__native {
          padding: 0.5rem;
        }
      }

      &.q-field--focused .q-field__control {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &.q-field--error .q-field__control {
        background: rgba(255, 0, 0, 0.05);
      }
    }

    .q-banner {
      border-radius: 12px;
      background: #fffbe6 !important;
      border: 1px solid #ffe58f;
      color: #222;
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .text-h6 {
        color: #222;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0.5rem 0;
        line-height: 1.5;
      }

      a {
        color: var(--q-primary);
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .q-checkbox {
      margin-top: 1rem;
      
      .q-checkbox__inner {
        color: var(--q-primary);
      }
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      fieldset {
        border-color: rgba(255, 255, 255, 0.1);

        &:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
      }

      .q-input, .q-select {
        .q-field__control {
          background: rgba(255, 255, 255, 0.05);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        &.q-field--focused .q-field__control {
          background: rgba(255, 255, 255, 0.15);
        }

        &.q-field--error .q-field__control {
          background: rgba(255, 0, 0, 0.1);
        }
      }

      .q-banner {
        background: rgba(255, 251, 230, 0.1) !important;
        border-color: rgba(255, 229, 143, 0.3);
        color: rgba(255, 255, 255, 0.9);

        .text-h6 {
          color: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-dialog {
    .q-card {
      width: 95vw !important;
      min-width: 95vw !important;
      margin: 1rem;
      border-radius: 12px;

      .q-card-section {
        padding: 1rem;

        .text-h6 {
          font-size: 1.1rem;
        }
      }

      fieldset {
        padding: 1rem;
        margin: 0.8rem 0;

        legend {
          font-size: 0.9rem;
        }
      }

      .q-banner {
        padding: 1rem;

        .text-h6 {
          font-size: 1rem;
        }

        p {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
