<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <div class="q-my-md">
      <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
        <q-card-section class="text-h6 text-bold">
          {{ $t('listarAvaliacao.title') }}
        </q-card-section>
      </q-card>
    </div>
    <q-table
      style="border-radius: 8px !important;"
      flat
      bordered
      square
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('listarAvaliacao.title')"
      :rows="avaliacoes"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 50, 100]"
      @request="onRequest"
    >
      <template v-slot:top-left>
        <q-input
          :class="{ 'order-last q-mt-md': $q.screen.width < 500 }"
          style="width: 300px"
          filled
          dense
          debounce="500"
          v-model="filter"
          clearable
          :placeholder="$t('listarAvaliacao.searchPlaceholder')"
          @update:model-value="filtrarAvaliacoes"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-input
          filled
          dense
          v-model="startDate"
          clearable
          type="date"
          :placeholder="$t('listarAvaliacao.startDatePlaceholder')"
          @update:model-value="aplicarFiltros"
          style="width: 200px; margin-left: 10px"
        />

        <q-input
          filled
          dense
          v-model="endDate"
          clearable
          type="date"
        />

        <q-select
          filled
          dense
          v-model="evaluationFilter"
          :options="evaluationOptions"
          clearable
          :placeholder="$t('listarAvaliacao.evaluationFilterPlaceholder')"
          @update:model-value="aplicarFiltros"
          style="width: 150px; margin-left: 10px"
        />
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon
            size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'"
          />
        </q-td>
      </template>
      
      <template v-slot:body-cell-ticketId="props">
          <q-td class="text-center">
            {{ props.row.ticketId }}
            <q-btn flat dense color="primary" @click="espiarAtendimentoTicketId(props.row.ticketId)">
              <q-tooltip>
                {{ $t('atendimentoItemTicketPainel.labels.espirar') }}: {{ props.row.ticketId }}
              </q-tooltip>
              <q-icon size="20px"
              name="mdi-eye-outline" />
            </q-btn>
            <q-btn name="arrow_forward" flat dense color="primary" @click="irParaTicket(props.row.ticketId)">
              <q-tooltip>
                {{ $t('atendimentoItemTicketPainel.labels.atender') }}: {{ props.row.ticketId }}
              </q-tooltip>
              <q-icon size="20px"
              name="arrow_forward" />
            </q-btn>
          </q-td>
        </template>
        
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat round icon="edit" @click="editarAvaliacao(props.row)" />
          <q-btn flat round icon="mdi-delete" @click="deletarAvaliacao(props.row)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="isTicketModalOpen" @show="scrollToBottom">
      <q-card :style="cardStyle">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">
            {{ $t('atendimentoItemTicketPainel.labels.espiarAtendimento', {
            idTicket: currentTicket.id
          }) }}
          </div>
          <q-btn icon="close" flat round @click="isTicketModalOpen = false" />
        </q-card-section>
        <q-card-section>
          <MensagemChat :mensagens="currentTicket.messages" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <ModalAvaliacao
      v-model:modalAvaliacao="modalAvaliacao"
      v-model:avaliacaoEdicao="avaliacaoEdicao"
      @modal-avaliacao:criada="avaliacaoCriada"
      @modal-avaliacao:editada="avaliacaoEditada"
    />
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { DeletarAvaliacao, ListarAvaliacoes } from 'src/service/avaliacoes.js'
import ModalAvaliacao from './ModalAvaliacao.vue'
import { ListarUsuarios } from 'src/service/user.js'
import { ConsultarDadosTicket } from 'src/service/tickets.js';
import MensagemChat from 'src/pages/atendimento/MensagemChat.vue'
import Chat from 'src/pages/atendimento/Chat/Chat.vue'
import eventBus from 'src/utils/eventBus.js'
import mixinAtualizarStatusTicket from 'src/pages/atendimento/mixinAtualizarStatusTicket.js'
import whatsBackground from 'src/assets/wa-background.png'
import whatsBackgroundDark from 'src/assets/wa-background-dark.jpg'

export default {
  name: 'Avaliacoes',
  components: {
    ModalAvaliacao,
    MensagemChat,
    Chat
  },
  mixins: [mixinAtualizarStatusTicket],
  data () {
    return {
      pageAllowed: true,
      isTicketModalOpen: false,
      currentTicket: {},
      whatsBackground: whatsBackground,
      whatsBackgroundDark: whatsBackgroundDark,
      params: {
        searchParam: null,
      },
      userProfile: 'user',
      filter: null,
      startDate: null,
      endDate: null,
      evaluationFilter: null,
      avaliacaoEdicao: {},
      modalAvaliacao: false,
      avaliacoes: [],
      usuarios: [],
      pagination: {
        sortBy: 'createdAt',
        descending: true,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      evaluationOptions: [
        { label: '1 ⭐', value: '1' },
        { label: '2 ⭐⭐', value: '2' },
        { label: '3 ⭐⭐⭐', value: '3' },
        { label: '4 ⭐⭐⭐⭐', value: '4' },
        { label: '5 ⭐⭐⭐⭐⭐', value: '5' }
      ],
      loading: false,
      columns: [
        { name: "id", label: "#", field: "id", align: "left" },
        { name: "evaluation", label: this.$t("listarAvaliacao.evaluationColumn"), field: "evaluation", align: "left" },
        { name: "userId", label: this.$t("listarAvaliacao.userColumn"), field: "userId", align: "center", format: (val) => this.formatUser(val) },
        { name: 'ticketId', label: this.$t('listarAvaliacao.ticketColumn'), field: 'ticketId', align: 'center', format: (val) => `<a href="#" @click.prevent="irParaTicket(${val})">${val}</a>` },
        { name: "contactName", label: this.$t('listarAvaliacao.contactName'), field: row => row.ticket?.contact?.name || this.$t('listarAvaliacao.empty'), align: "left" },
        { name: "createdAt", label: this.$t("listarAvaliacao.dateColumn"), field: "createdAt", align: "center", format: (val) => this.formatDate(val) },
        { name: "acoes", label: this.$t("listarAvaliacao.actionsColumn"), field: "acoes", align: "center" },
      ],
    }
  },
  watch: {
    filter(newValue) {
      this.aplicarFiltros();
    }
  },
  computed: {
    cardStyle() {
      return {
        backgroundImage: this.$q.dark.isActive ? `url(${this.whatsBackgroundDark})` : `url(${this.whatsBackground})`
      };
    },
  },
  methods: {
    async irParaTicket(ticketId) {
      console.log('ticketId', ticketId);
      try {
        const ticket = await ConsultarDadosTicket({ id: ticketId });

        if (!ticket || ticket.error === 'ERR_NO_TICKET_FOUND') {
          throw new Error(this.$t('protocolos.ticketNotFound'));
        }

        // console.log('ItemTicket - Tentando abrir chat:', {
        //   ticketId: ticket.data.id,
        //   status: ticket.data.status,
        //   ticketFocado: this.$store.getters.ticketFocado.id,
        //   routeName: this.$route.name
        // });
        
        // caso esteja em um tamanho mobile, fechar a drawer dos contatos
        if (this.$q.screen.lt.md && ticket.data.status !== 'pending') {
          eventBus.emit('infor-cabecalo-chat:acao-menu')
        }
        if (!(ticket.data.status !== 'pending' && (ticket.data.id !== this.$store.getters.ticketFocado.id || this.$route.name !== 'chat'))) {
          return;
        }
        this.$store.commit('SET_HAS_MORE', true)
        this.$store.dispatch('AbrirChatMensagens', ticket.data)

        // const timestamp = new Date().getTime();
        // this.$router.push(`/atendimento/${ticketId}?t=${timestamp}`).then(() => {
        //   location.reload();
        // });

      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.message || this.$t('protocolos.ticketNotFound')
        });
      }
    },
    async listarUsuarios(){
      const data = await ListarUsuarios()
      this.usuarios = data.data.users
    },
    formatUser(userId) {
      const user = this.usuarios.find(user => user.id === userId);
      return user ? user.name : this.$t('common.system');
    },
    getTicketUrl(ticketId) {
      const route = this.$router.resolve({ path: `/atendimento/${ticketId}` });
      return route.href;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const day = date.getDate()?.toString().padStart(2, '0');
      const month = (date.getMonth() + 1)?.toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    async onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const { search, startDate, endDate, evaluation } = props.filter || {};
      this.loading = true;

      // Atualizar paginação
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      this.pagination.sortBy = sortBy;
      this.pagination.descending = descending;

      // Preparar parâmetros da requisição
      const params = {
        page,
        limit: rowsPerPage,
        search: search || this.filter,
        startDate: startDate || this.startDate,
        endDate: endDate || this.endDate,
        evaluation: evaluation || (this.evaluationFilter?.value || this.evaluationFilter)
      };

      try {
        const response = await ListarAvaliacoes(params);
        this.avaliacoes = response.data.data;
        this.pagination.rowsNumber = response.data.total;
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar avaliações'
        });
      }
      this.loading = false;
    },
    aplicarFiltros() {
      // Resetar para primeira página quando aplicar filtros
      this.pagination.page = 1;
      this.onRequest({
        pagination: this.pagination,
        filter: {
          search: this.filter,
          startDate: this.startDate,
          endDate: this.endDate,
          evaluation: this.evaluationFilter?.value || this.evaluationFilter
        }
      });
    },
    async listarAvaliacoes() {
      this.loading = true;

      const params = {
        page: this.pagination.page,
        limit: this.pagination.rowsPerPage,
        search: this.filter,
        startDate: this.startDate,
        endDate: this.endDate,
        evaluation: this.evaluationFilter?.value || this.evaluationFilter
      };
      
      try {
        const response = await ListarAvaliacoes(params);
        this.avaliacoes = response.data.data;
        this.pagination.rowsNumber = response.data.total;
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
      }

      this.loading = false;
    },
    avaliacaoCriada(avaliacao) {
       // Recarregar dados após criar
      this.aplicarFiltros();
    },
    avaliacaoEditada(avaliacao) {
      // Recarregar dados após editar
      this.aplicarFiltros();
    },
    editarAvaliacao(avaliacao) {
      this.avaliacaoEdicao = { ...avaliacao }
      this.modalAvaliacao = true
    },
    deletarAvaliacao(avaliacao) {
      this.$q.dialog({
        title: this.$t("listarAvaliacao.deleteConfirmationTitle"),
        message: `${this.$t("listarAvaliacao.deleteConfirmationMessage")} ${avaliacao.id}?`,
        cancel: {
          label: this.$t("listarAvaliacao.dialogCancel"),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t("listarAvaliacao.dialogConfirm"),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        DeletarAvaliacao(avaliacao)
          .then(res => {
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: `${this.$t("listarAvaliacao.deleteSuccess")}: ${avaliacao.id} deletado!`,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            // Recarregar dados após deletar
            this.aplicarFiltros();
          })
        this.loading = false
      })
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const dialogContent = document.querySelector('.q-dialog__inner > div');
        if (dialogContent) {
          dialogContent.scrollTop = dialogContent.scrollHeight;
        }
      });
    }
  },
  mounted() {
    this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.avaliacoes === true;

    this.onRequest({
      pagination: this.pagination,
      filter: {}
    });
  }
}
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: auto;

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
}

.q-table {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  /* Estilização do scroll */
  &::-webkit-scrollbar {
    height: 12px;
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--q-primary);
    border-radius: 6px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: var(--q-secondary);
    }
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--q-primary) rgba(0, 0, 0, 0.05);

  .q-table__top {
    background: transparent;
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  thead tr th {
    position: sticky;
    z-index: 1;
    background: rgba(var(--q-primary-rgb), 0.1);
    color: var(--q-primary);
    font-weight: 600;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  tbody tr {
    transition: all 0.3s ease;

    &:hover {
      background: rgba(var(--q-primary-rgb), 0.05);
    }

    td {
      padding: 0.8rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

  &.filled {
    .q-field__control {
      background: rgba(var(--q-primary-rgb), 0.05);
    }
  }
}

.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    .q-card-section {
      padding: 1.2rem 1.5rem;

      .text-h6 {
        color: var(--q-primary);
        font-weight: 600;
        margin: 0;
      }
    }
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
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .q-table {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar-thumb {
      border-color: rgba(30, 30, 30, 0.8);
    }

    thead tr th {
      background: rgba(255, 255, 255, 0.05);
    }

    tbody tr:hover {
      background: rgba(255, 255, 255, 0.05);
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

    &.filled {
      .q-field__control {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }

  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);
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
  .my-sticky-dynamic {
    margin: 0.5rem;
    border-radius: 12px !important;

    .q-card-section {
      padding: 1rem;
    }
  }

  .q-table {
    margin: 0.5rem;
    border-radius: 12px !important;

    .q-table__top {
      padding: 1rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .q-table__control {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.3rem;
    }
  }

  .q-input {
    width: 100% !important;
    margin-bottom: 0.5rem;
  }

  .q-banner {
    margin: 0.5rem;
    padding: 0.8rem;
  }
}

/* Estilo para o scroll do dialog */
.q-dialog__inner > div::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(0, 0, 0, 0.1);
}

.q-dialog__inner > div::-webkit-scrollbar-thumb {
  background-color: var(--q-primary);
  border-radius: 4px;
}

.q-dialog__inner > div::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
