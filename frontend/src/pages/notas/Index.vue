<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <div class="q-my-md">
      <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
        <q-card-section class="text-h6 text-bold">
          {{ $t('notas.title') }}
        </q-card-section>
      </q-card>
    </div>
    <q-table
      style="border-radius: 8px !important;"
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('notas.title')"
      :rows="notas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-left>
        <q-input
          :class="{
            'order-last q-mt-md': $q.screen.width < 500
          }"
          style="width: 300px"
          filled
          dense
          debounce="500"
          v-model="filter"
          clearable
          :placeholder="$t('notas.searchPlaceholder')"
          @update:model-value="filtrarNotas"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-input
          filled
          dense
          v-model="dateFilter"
          clearable
          type="date"
          :placeholder="$t('notas.dateFilterPlaceholder')"
          @update:model-value="filtrarNotasPorData"
          style="width: 200px; margin-left: 10px"
        />
      </template>
      <template v-slot:body-cell-notes="props">
        <q-td class="nota-limitada">
          {{ props.row.notes }}
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
          <q-btn flat round icon="edit" @click="editarNota(props.row)" />
          <q-btn flat round icon="mdi-delete" @click="deletarNota(props.row)" />
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
    <ModalNota
      v-model:modalNota="modalNota"
      v-model:notaEdicao="notaEdicao"
      @modal-nota:criada="notaCriada"
      @modal-nota:editada="notaEditada"
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
import { DeletarNota, ListarNotas } from 'src/service/notas.js'
import { ListarUsuarios } from 'src/service/user.js'
import ModalNota from './ModalNota.vue'
import { MostrarCores } from 'src/service/empresas.js';
import { ConsultarDadosTicket } from 'src/service/tickets.js';
import MensagemChat from 'src/pages/atendimento/MensagemChat.vue'
import Chat from 'src/pages/atendimento/Chat/Chat.vue'
import mixinAtualizarStatusTicket from 'src/pages/atendimento/mixinAtualizarStatusTicket.js'
import whatsBackground from 'src/assets/wa-background.png'
import whatsBackgroundDark from 'src/assets/wa-background-dark.jpg'
import eventBus from 'src/utils/eventBus.js'

export default {
  name: 'Notas',
  components: {
    ModalNota,
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
      colors: {},
      params: {
        searchParam: null,
      },
      userProfile: 'user',
      usuarios: [],
      filter: null,
      dateFilter: null,
      notaEdicao: {},
      modalNota: false,
      notas: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'notes', label: this.$t('notas.note'), field: 'notes', align: 'left' },
        { name: 'usuerId', label: this.$t('notas.user'), field: 'userId', align: 'center', format: (val) => this.formatUser(val) },
        { name: 'ticketId', label: this.$t('notas.ticket'), field: 'ticketId', align: 'center', format: (val) => `<a href="#" @click.prevent="irParaTicket(${val})">${val}</a>` },
        { name: 'createdAt', label: this.$t('notas.date'), field: 'createdAt', align: 'center', format: (val) => this.formatDate(val) },
        { name: 'acoes', label: this.$t('notas.actions'), field: 'acoes', align: 'center' },
      ],
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
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const rawLabel =
              (typeof colorObj.label === 'string' && colorObj.label) ||
              (typeof colorObj.name === 'string' && colorObj.name) ||
              (typeof colorObj.key === 'string' && colorObj.key) ||
              ''

            if (!rawLabel) return acc
            const key = rawLabel.toLowerCase().trim()
            const value =
              colorObj.value ??
              (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
              colorObj.hex ??
              colorObj.color ??
              null

            if (typeof value === 'string' && value) {
              acc[key] = value
            }
            return acc
          }, {})

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    async listarUsuarios(){
      const data = await ListarUsuarios()
      this.usuarios = data.data.users
    },
    formatUser(userId) {
      const user = this.usuarios.find(user => user.id === userId);
      return user ? user.name : this.$t('notas.system');
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
    filtrarNotas (data) {
      this.notas = []
      this.params.searchParam = data
      this.loading = true
      this.listarNotasFiltro()
      this.loading = false
    },
    async listarNotasFiltro () {
      this.loading = true
      const response = await ListarNotas();
      const notas = response.data;
      try {
        const searchTerm = this.params.searchParam.toLowerCase();
        const notasFiltradas = notas.filter(nota => {
          const notaString = JSON.stringify(nota).toLowerCase();
          return notaString.includes(searchTerm);
        });
        this.LOAD_NOTAS(notasFiltradas);
      } catch(e){
        this.notas = response.data
      }
      this.loading = false
    },
    filtrarNotasPorData() {
      this.loading = true;
      const dataFiltrada = this.dateFilter ? new Date(this.dateFilter) : null;

      if (dataFiltrada) {
        const dataFiltradaStr = dataFiltrada.toISOString().split('T')[0];

        this.notas = this.notas.filter(nota => {
          const notaData = new Date(nota.createdAt);
          const notaDataStr = notaData.toISOString().split('T')[0];

          return notaDataStr === dataFiltradaStr;
        });

        if (this.notas.length === 0) {
          this.listarNotas();
        }
      } else {
        this.listarNotas();
      }
      this.loading = false;
    },
    LOAD_NOTAS(notasFiltradas) {
      this.notas = notasFiltradas;
    },
    async listarNotas () {
      const { data } = await ListarNotas()
      this.notas = data
    },
    notaCriada (nota) {
      const newNotas = [...this.notas]
      newNotas.push(nota)
      this.notas = [...newNotas]
    },
    notaEditada (nota) {
      const newNotas = [...this.notas]
      const idx = newNotas.findIndex(f => f.id === nota.id)
      if (idx > -1) {
        newNotas[idx] = nota
      }
      this.notas = [...newNotas]
    },
    editarNota (nota) {
      this.notaEdicao = { ...nota }
      this.modalNota = true
    },
    deletarNota (nota) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('notas.deleteConfirmation', { note: nota.notes }),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        DeletarNota(nota)
          .then(res => {
            let newNotas = [...this.notas]
            newNotas = newNotas.filter(f => f.id !== nota.id)

            this.notas = [...newNotas]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('notas.deleteSuccess'),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
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
  mounted () {
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.notas === true;
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : [])
      } catch (_) { list = [] }

      const colors = list.reduce((acc, colorObj = {}) => {
        const rawLabel =
          (typeof colorObj.label === 'string' && colorObj.label) ||
          (typeof colorObj.name === 'string' && colorObj.name) ||
          (typeof colorObj.key === 'string' && colorObj.key) ||
          ''

        if (!rawLabel) return acc
        const key = rawLabel.toLowerCase().trim()
        const value =
          colorObj.value ??
          (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
          colorObj.hex ??
          colorObj.color ??
          null

        if (typeof value === 'string' && value) acc[key] = value
        return acc
      }, {})

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
    this.listarNotas()
    this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style scoped lang="scss">
.nota-limitada {
  max-width: 300px;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}

.my-sticky-dynamic {
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  overflow: hidden;

  .q-table__top,
  .q-table__bottom,
  .q-table__title {
    background: transparent;
    border: none;
  }

  thead tr {
    background: rgba(var(--q-primary-rgb), 0.08);
    font-weight: 600;
  }

  tbody tr {
    transition: background 0.2s;
    &:hover {
      background: rgba(var(--q-primary-rgb), 0.07);
    }
  }

  .q-btn {
    border-radius: 8px;
    min-width: 32px;
    min-height: 32px;
    padding: 0.2rem 0.7rem;
    font-size: 0.9rem;
    transition: box-shadow 0.2s, background 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    &:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.13);
      background: rgba(var(--q-primary-rgb), 0.08);
    }
  }
}

.q-card {
  border-radius: 16px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
  margin-bottom: 1.5rem;
}

body.body--dark {
  .my-sticky-dynamic,
  .q-card {
    background: rgba(30,30,30,0.92);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .q-table thead tr {
    background: rgba(var(--q-primary-rgb), 0.18);
  }
}

// Estilo para o scroll do dialog
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
