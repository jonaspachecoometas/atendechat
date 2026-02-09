<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      :style="{
        fontFamily: 'Inter, sans-serif',
        width: '900px',
        minWidth: '400px',
        maxWidth: '85vw',
        borderRadius: '8px',
      }"
      class="q-pa-lg"
    >
      <div class="column q-gutter-sm no-wrap">
        <div>
          <div class="row">
            <div class="col-xs-12 text-primary text-weight-bold text-20">
              {{ $t('dialog.title') }}
            </div>
            <div class="col-xs-12 text-primary text-weight-bold text-20">
              <q-banner style="margin-top: 10px" class="bg-yellow text-black" inline-actions>
                <p>{{ $t('massaTexto.form.availableFunctions') }}</p>
              </q-banner>
            </div>
            <q-btn
              class="close-btn absolute"
              icon="close"
              color="primary"
              flat
              round
              @click="onDialogCancel"
              aria-label="Fechar"
            />
          </div>
        </div>

        <div class="q-mt-md">
          <q-select
            v-model="selectedWhatsapp"
            :options="cSessionsOptions"
            :label="$t('dialog.selectWhatsapp')"
          />
        </div>

        <div class="q-mt-md">
          <q-select
            ref="selectAutoCompleteContato"
            v-model="selectedContact"
            :options="contacts"
            option-label="name"
            option-value="id"
            :label="$t('dialog.selectContact')"
            use-input
            hide-dropdown-icon
            :loading="loading"
            input-debounce="700"
            @filter="localizarContato"
            hide-selected
            fill-input
            clearable
            menu-anchor="bottom left"
            menu-self="top left"
          />
        </div>
        <p>{{ $t('dialog.searchTip') }}</p>

        <div v-if="selectedWhatsapp && selectedContact">
          <InputMensagem
            :selectedWhatsapp="selectedWhatsapp"
            :selectedContact="selectedContact"
            isScheduleDate
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar'
import { mapGetters } from 'vuex';
import { ListarContatos } from 'src/service/contatos.js';

export default defineComponent({
  emits: [ ...useDialogPluginComponent.emits ],
  components: {
    InputMensagem: defineAsyncComponent(() => import('./InputMensagem.vue')),
  },
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    return { dialogRef, onDialogHide, onDialogOK, onDialogCancel }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(
        (w) =>
          (w.type === 'whatsapp' || w.type === 'baileys' || w.type === 'evo' || w.type === 'meow' || w.type === 'uazapi' || w.type === 'zapi') &&
          !w.isDeleted &&
          w.status === 'CONNECTED'
      );
    },
    cSessionsOptions() {
      return this.cSessions.map((w) => ({
        label: w.name,
        value: w.id,
        type: w.type,
        tokenAPI: w.tokenAPI || null,
      }));
    },
  },
  data() {
    return {
      selectedWhatsapp: null,
      selectedContact: null,
      contacts: [],
      loading: false,
    };
  },
  methods: {
    async localizarContato(search, update, abort) {
      if (search.length < 2) {
        if (this.contacts.length) {
          update(() => {
            this.contacts = [...this.contacts];
          });
        }
        abort();
        return;
      }

      this.loading = true;
      try {
        const { data } = await ListarContatos({
          searchParam: search,
        });

        update(() => {
          this.contacts = Array.isArray(data.contacts) && data.contacts.length ? data.contacts : [];
        });
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
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

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .text-primary {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }

    .q-banner {
      border-radius: 12px;
      background: #fffbe6 !important;
      border: 1px solid #ffe58f;
      color: #222;
      transition: all 0.3s ease;
      margin-top: 1rem;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      p {
        margin: 0;
        line-height: 1.5;
      }
    }

    .q-select {
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
    }

    p {
      color: var(--q-primary);
      opacity: 0.8;
      margin: 0.5rem 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    .close-btn {
      width: 22px !important;
      height: 22px !important;
      min-height: 22px !important;
      top: 14px !important;
      right: 18px !important;
      z-index: 10;
      font-size: 0.8rem;
      background: transparent !important;
      color: var(--q-primary);
      opacity: 0.7;
      transition: opacity 0.2s, background 0.2s;
      box-shadow: none;
      &:hover {
        opacity: 1;
        background: rgba(var(--q-primary-rgb), 0.08) !important;
      }
      .q-icon {
        font-size: 1.1rem;
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

      .q-banner {
        background: rgba(255, 251, 230, 0.1) !important;
        border-color: rgba(255, 229, 143, 0.2);
        color: #fff;
      }

      .q-select {
        .q-field__control {
          background: rgba(255, 255, 255, 0.05);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        &.q-field--focused .q-field__control {
          background: rgba(255, 255, 255, 0.15);
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
      margin: 1rem;
      border-radius: 12px;
      padding: 1rem;

      .text-primary {
        font-size: 1.1rem;
      }

      .q-banner {
        margin-top: 0.8rem;
        padding: 0.8rem;

        p {
          font-size: 0.9rem;
        }
      }

      p {
        font-size: 0.85rem;
      }

      .close-btn {
        width: 18px !important;
        height: 18px !important;
        min-height: 18px !important;
        top: 10px !important;
        right: 12px !important;
        font-size: 0.7rem;
        .q-icon {
          font-size: 0.95rem;
        }
      }
    }
  }
}
</style>
