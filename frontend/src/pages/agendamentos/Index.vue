<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-table
      style="border-radius: 8px !important;"
      flat
      bordered
      square
      class="my-sticky-dynamic q-ma-lg"
      :rows="agendadas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :rows-per-page-options="[0]"
      v-model:pagination="pagination"
      @virtual-scroll="onVirtualScroll"
    >
      <template v-slot:top>
        <div class="q-pa-md" style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
          <div>
            <div class="text-h6">{{ $t('generalAgendamento.appointments') }}</div>
          </div>
          <div>
            <q-btn
              @click="onClickOpenAgendamentoMensagem"
              flat
              dense
              icon="mdi-alarm-plus"
              color="primary"
              class="bg-padrao btn-rounded"
            >
              <q-tooltip content-class="bg-primary text-bold">
                {{ $t('generalAgendamento.addAppointment') }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarMensagem(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:pagination="{ pagination }">
        {{ agendadas.length }}/{{ pagination.rowsNumber }}
      </template>
    </q-table>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { ListarAgendadas, DeletarMensagem } from 'src/service/tickets.js';
import { MostrarCores } from 'src/service/empresas.js';
import { format, parseISO } from 'date-fns';
import DialogAgendamentoMensagem from './DialogAgendamentoMensagem.vue'

export default {
  name: 'Agendamentos',
  data() {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      agendadas: [],
      pagination: {
        page: 1,
        rowsPerPage: 40,
        rowsNumber: 0,
      },
      loading: false,
      hasMore: true,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'body', label: this.$t('generalAgendamento.message'), field: row => row.body.substring(0, 20) + '...', align: 'left' },
        { name: 'ticketId', label: 'Ticket', field: 'ticketId', align: 'center' },
        { name: 'ticketStatus', label: this.$t('generalAgendamento.status'), field: row => this.formatTicketStatus(row.ticketStatus), align: 'center' },
        { name: 'mediaType', label: this.$t('generalAgendamento.type'), field: row => this.formatMessageType(row.mediaType), align: 'center' },
        { name: 'contactName', label: this.$t('generalAgendamento.contact'), field: 'contactName', align: 'center' },
        { name: 'scheduleDate', label: this.$t('generalAgendamento.date'), field: row => this.formatarData(row.scheduleDate), align: 'center' },
        { name: 'createdAt', label: this.$t('generalAgendamento.created'), field: row => this.formatarData(row.createdAt), align: 'center' },
        { name: 'acoes', label: this.$t('generalAgendamento.actions'), field: 'acoes', align: 'center' },
      ],
    };
  },
  methods: {
    async onVirtualScroll({ to }) {
      if (!this.loading && to >= this.agendadas.length - 5 && this.hasMore) {
        this.pagination.page++;
        await this.carregarMaisAgendadas();
      }
    },
    async carregarMaisAgendadas() {
      if (this.loading || !this.hasMore) return;
      this.loading = true;
      try {
        const response = await ListarAgendadas({
        page: this.pagination.page,
        rowsPerPage: this.pagination.rowsPerPage,
      });

        const { messages, total, page, totalPages } = response.data;

        const mappedMessages = messages
          .filter(message => !message.isDeleted)
          .map(message => ({
            ...message,
            contactName: message.contact?.name || 'N/A',
            ticketId: message.ticket?.id || 'N/A',
            ticketStatus: message.ticket?.status || 'N/A',
          }));

        this.agendadas = [...this.agendadas, ...mappedMessages];

        this.pagination.rowsNumber = total;

        this.hasMore = page < totalPages;

      } catch (error) {
        console.error("Error loading more data:", error);
      } finally {
        this.loading = false;
      }
    },
    formatarData(data, formato = this.$t('generalAgendamento.dateFormat')) {
      return format(parseISO(data), formato);
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val;
            return acc;
          }, {});

          const root = document.documentElement;
          Object.keys(this.colors).forEach(key => {
            root.style.setProperty(`--q-${key}`, this.colors[key]);
          });
        } else {
          console.error(this.$t('generalAgendamento.errorLoadingColors'));
        }
      } catch (error) {
        console.error(this.$t('generalAgendamento.errorLoadingColors'), error);
      }
    },
    formatTicketStatus(status) {
      return this.$t(`status.${status}`) || status;
    },
    formatMessageType(type) {
      return this.$t(`type.${type}`) || type;
    },
    deletarMensagem(mensagem) {
      this.$q
        .dialog({
          title: this.$t('generalAgendamento.attention'),
          message: this.$t('generalAgendamento.oldMessages'),
          cancel: {
            label: this.$t('generalAgendamento.no'),
            color: 'primary',
            push: true,
          },
          ok: {
            label: this.$t('generalAgendamento.yes'),
            color: 'negative',
            push: true,
          },
          persistent: true,
        })
        .onOk(() => {
          this.loading = true;
          DeletarMensagem(mensagem)
            .then(() => {
              this.loading = false;
              mensagem.isDeleted = true;
              window.location.reload();
            })
            .catch(error => {
              this.loading = false;
              console.error(error);
              this.$notificarErro(this.$t('generalAgendamento.errorDeletingMessage'), error);
            });
        })
        .onCancel(() => {});
    },
    onClickOpenAgendamentoMensagem() {
      this.$q.dialog({
        component: DialogAgendamentoMensagem
      })
    },
  },
  mounted() {
    this.carregarMaisAgendadas();
    this.userProfile = localStorage.getItem('profile');
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.agendamentos === true;
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val;
        return acc;
      }, {});

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn(this.$t('generalAgendamento.noStoredColors'));
    }
  },
};
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  height: 85vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-table__top {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent !important;

    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }
  }

  thead {
    tr {
      th {
        background: rgba(var(--q-primary-rgb), 0.1) !important;
        color: var(--q-primary);
        font-weight: 600;
        font-size: 0.9rem;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        position: sticky;
        z-index: 1;
      }
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.05);
      }

      td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }

  .q-table__bottom {
    background: transparent !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.8rem 1.5rem;
    color: var(--q-primary);
    font-size: 0.9rem;
  }
}

.q-banner {
  border-radius: 12px;
  background: rgba(255, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: var(--q-negative);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .q-icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
}

/* Modo Escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    thead {
      tr {
        th {
          background: rgba(255, 255, 255, 0.05) !important;
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }
    }

    tbody {
      tr {
        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        td {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .q-table__bottom {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
  }

  .q-banner {
    background: rgba(255, 0, 0, 0.15) !important;
    border-color: rgba(255, 0, 0, 0.3);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .my-sticky-dynamic {
    margin: 0.5rem;
    border-radius: 12px !important;

    .q-table__top {
      padding: 1rem;

      .text-h6 {
        font-size: 1.1rem;
      }
    }

    thead {
      tr {
        th {
          padding: 0.8rem;
          font-size: 0.85rem;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.8rem;
          font-size: 0.85rem;
        }
      }
    }

    .q-table__bottom {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
    }
  }
}
</style>
