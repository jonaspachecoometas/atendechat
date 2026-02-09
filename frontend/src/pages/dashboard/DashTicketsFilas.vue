<template>
  <div v-if="userProfile === 'admin'">
    <div class="row col q-pa-md justify-between items-center" >
      <h1>{{ $t('dashTickets.panelTitle') }}</h1>
      <q-btn color="primary"
        icon="mdi-filter"
        label="Filtros"
        @click="visualizarFiltros = true" />
      <div class="q-mb-md">
        <q-btn @click="fecharTicketsAbertos"
            style="margin-right:2px"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-forum" />
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('dashTickets.closeOpenTicketsButtonLabel') }}
          </q-tooltip>
        </q-btn>
        <q-btn @click="fecharTicketsPendentes"
            style="margin-right:2px"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-account-clock-outline" />
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('dashTickets.closePendingTicketsButtonLabel') }}
          </q-tooltip>
        </q-btn>
        <q-btn @click="listarUsuarios2"
            style="margin-right:2px"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-transfer" />
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('dashTickets.transferTicketButtonLabel') }}
          </q-tooltip>
        </q-btn>
        <q-btn @click="abrirModalTransferirEntreFilas"
            style="margin-right:2px"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-swap-horizontal" />
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('dashTickets.transferBetweenQueuesButtonLabel') }}
          </q-tooltip>
        </q-btn>
        <q-btn @click="abrirModalTransferirEntreCanais"
            style="margin-right:2px"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-swap-vertical" />
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('dashTickets.transferBetweenChannelsButtonLabel') }}
          </q-tooltip>
        </q-btn>
        <q-btn @click="marcarTodasComoLidas"
            style="margin-right:2px"
            flat
            color="primary"
            class="bg-padrao btn-rounded">
          <q-icon name="mdi-email-open-outline" />
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('dashTickets.markAllAsReadButtonLabel') }}
          </q-tooltip>
        </q-btn>
      </div>
      <q-separator />
    </div>

    <q-dialog full-height
      position="right"
      v-model="visualizarFiltros">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.filtersTitle') }}</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <DatePick dense
            class="row col"
            v-model="pesquisaTickets.dateStart" />
          <DatePick dense
            class="row col"
            v-model="pesquisaTickets.dateEnd" />
          <q-separator v-if="profile === 'admin'" />
          <q-toggle v-if="profile === 'admin'"
            class="q-ml-lg"
            v-model="pesquisaTickets.showAll"
            :label="$t('dashTickets.showAllLabel')" />
          <!-- <q-separator class="q-mb-md"
            v-if="profile === 'admin'" />

          <q-select v-if="!pesquisaTickets.showAll"
            square
            dense
            outlined
            hide-bottom-space
            emit-value
            map-options
            multiple
            options-dense
            use-chips
            label="Filas"
            color="primary"
            v-model="pesquisaTickets.queuesIds"
            :options="filas"
            :input-debounce="700"
            option-value="id"
            option-label="queue"
            input-style="width: 280px; max-width: 280px;" /> -->
          <!-- @update:model-value="debounce(BuscarTicketFiltro(), 700)" -->
        </q-card-section>
        <q-card-section>
          <q-separator />
          <div class="text-h6 q-mt-md">{{ $t('dashTickets.viewTypeLabel') }}</div>
          <q-option-group :options="optionsVisao"
            :label="$t('dashTickets.visionButtonLabel')"
            type="radio"
            v-model="visao" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn outline
            :label="$t('dashTickets.updateButtonLabel')"
            color="primary"
            v-close-popup
            @click="consultarTickets" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div style="height: 85vh"
      class="scroll">
      <template v-for="(items, key) in sets" :key="key">
        <div :style="{ height: 800 }"
          class="row q-pa-md q-col-gutter-md q-mb-sm">
          <div :class="contentClass"
            v-for="(item, index) in items"
            :key="index">
            <q-card bordered
              style="border-radius: 8px !important;"
              square
              flat>
              <q-item v-if="visao === 'U' || visao === 'US'"
                class="text-bold"
                :class="{
                  'bg-negative text-white': definirNomeUsuario(item[0]) === 'Pendente'
                }">
                <q-item-section avatar>
                  <q-avatar size="50px"
                  class="relative-position">
                    <q-icon size="50px"
                      name="mdi-account-circle"
                      color="grey-8" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6">{{ definirNomeUsuario(item[0]) }}</q-item-label>
                  <q-item-label caption
                    :class="{
                      'text-white': definirNomeUsuario(item[0]) === 'Pendente'
                    }">
                    {{ $t('dashTickets.tickets') }}: {{ item.length }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="visao === 'F' || visao === 'FS'"
                class="text-bold"
                :class="{
                  'bg-negative text-white': definirNomeFila(item[0]) === 'Sem Fila'
                }">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ definirNomeFila(item[0]) }}</q-item-label>
                  <q-item-label caption
                    :class="{
                      'text-white': definirNomeFila(item[0]) === 'Sem Fila'
                    }">
                    {{ $t('dashTickets.open') }}: {{ counterStatus(item).open }} | Pendentes: {{ counterStatus(item).pending }} | Total: {{
                        item.length
                    }}
                  </q-item-label>
                </q-item-section>
                <q-btn @click="listarFilas"
                  v-if="definirNomeFila(item[0]).toLowerCase() === 'sem fila'"
                  flat
                  color="primary"
                  class="bg-padrao btn-rounded">
                  <q-icon name="mdi-transfer" />
                  <q-tooltip content-class="bg-primary text-bold">
                    {{ $t('dashTickets.transferWithoutQueueLabel') }}
                  </q-tooltip>
                </q-btn>
              </q-item>
              <q-separator />
              <q-card-section :style="{ height: '320px' }"
                class="scroll"
                v-if="visao === 'U' || visao === 'F'">
                <ItemTicket v-for="(ticket, i) in item"
                  :key="i"
                  :ticket="ticket"
                  :filas="filas" />
              </q-card-section>
            </q-card>
          </div>
          <q-resize-observer @resize="onResize"></q-resize-observer>
        </div>
      </template>
    </div>

    <q-dialog v-model="modalTransferirTicket"
      @hide="modalTransferirTicket = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.transferTicketsConfirmation') }}</div>
          <div class="text-h8">{{ $t('dashTickets.selectDestinationQueueLabel') }}</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="filaSelecionada"
            :options="filas"
            emit-value
            map-options
            option-value="id"
            option-label="queue"
            :label="$t('dashTickets.selectDestinationQueueLabel')" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado"
            :options="usuarios.filter(filterUsers)"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            :label="$t('atendimentoInfoCabecalho.destinationUser')"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.out')"
            color="negative"
            v-close-popup
            />
          <q-btn
            :label="$t('common.save')"
            color="primary"
            @click="confirmarTransferenciaTicket" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket2"
      @hide="modalTransferirTicket2 = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.transferBetweenUsersLabel') }}</div>
          <div class="text-h8">{{ $t('dashTickets.attentionMessage') }}</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado2"
            :options="usuarios2"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            :label="$t('dashTickets.selectSourceUserLabel')" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioSelecionado3"
            :options="usuarios3"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            :label="$t('dashTickets.selectUserLabel')" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.out')"
            color="negative"
            v-close-popup
             />
          <q-btn
            :label="$t('common.save')"
            color="primary"
            @click="confirmarTransferenciaTicket2" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket3"
      @hide="modalTransferirTicket3 = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.resolvePendingTicketsLabel') }}</div>
          <div class="text-h8">{{ $t('dashTickets.actionInMassMessage') }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.out')"
            color="negative"
            v-close-popup
             />
          <q-btn
            :label="$t('common.resolve')"
            color="primary"
            @click="resolverTodosPendentes" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket4"
      @hide="modalTransferirTicket4 = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.resolveOpenTicketsLabel') }}</div>
          <div class="text-h8">{{ $t('dashTickets.actionInMassMessage') }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.out')"
            color="negative"
            v-close-popup
             />
          <q-btn
            :label="$t('common.resolve')"
            color="primary"
            @click="resolverTodosAbertos" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirEntreFilas"
      @hide="modalTransferirEntreFilas = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.transferBetweenQueuesTitle') }}</div>
          <div class="text-h8">{{ $t('dashTickets.transferBetweenQueuesDescription') }}</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="filaOrigemTransferencia"
            :options="filas"
            emit-value
            map-options
            option-value="id"
            option-label="queue"
            :label="$t('dashTickets.sourceQueueLabel')" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="filaDestinoTransferencia"
            :options="filas"
            emit-value
            map-options
            option-value="id"
            option-label="queue"
            :label="$t('dashTickets.destinationQueueLabel')" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="usuarioDestinoTransferenciaFila"
            :options="usuarios.filter(filterUsersForQueueTransfer)"
            emit-value
            map-options
            option-value="id"
            option-label="name"
            :label="$t('dashTickets.destinationUserLabel')" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.out')"
            color="negative"
            v-close-popup
             />
          <q-btn
            :label="$t('common.save')"
            color="primary"
            @click="confirmarTransferenciaEntreFilas" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirEntreCanais"
      @hide="modalTransferirEntreCanais = false"
      persistent>
      <q-card class="q-pa-md"
        style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('dashTickets.transferBetweenChannelsTitle') }}</div>
          <div class="text-h8">{{ $t('dashTickets.transferBetweenChannelsDescription') }}</div>
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="canalOrigemTransferencia"
            :options="canaisDisponiveis"
            emit-value
            map-options
            option-value="id"
            :option-label="(opt) => `${opt.name} (${opt.type})`"
            :label="$t('dashTickets.sourceChannelLabel') + ' *'"
            :rules="[val => !!val || $t('dashTickets.selectSourceChannelError') || 'Selecione o canal de origem!']" />
        </q-card-section>
        <q-card-section>
          <q-select square
            outlined
            v-model="canalDestinoTransferencia"
            :options="canaisDisponiveis"
            emit-value
            map-options
            option-value="id"
            :option-label="(opt) => `${opt.name} (${opt.type})`"
            :label="$t('dashTickets.destinationChannelLabel')" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.out')"
            color="negative"
            v-close-popup
             />
          <q-btn
            :label="$t('common.save')"
            color="primary"
            @click="confirmarTransferenciaEntreCanais" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
// const userId = +localStorage.getItem('userId')
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { socketIO } from 'src/utils/socket.js'
const socket = socketIO()

import { MostrarCores } from 'src/service/empresas.js';
import ItemTicket from 'src/pages/atendimento/ItemTicketPainel.vue'
import { ConsultarTicketsQueuesService } from 'src/service/estatisticas.js'
import { ListarFilas } from 'src/service/filas.js'
import { ListarUsuarios } from 'src/service/user.js'
import { AtualizarTicket, LerTodasAsMensagens, TransferirTicketsEntreFilas, TransferirTicketsEntreCanais } from 'src/service/tickets.js'
import { ListarWhatsappsByTenant } from 'src/service/sessoesWhatsapp.js'
const UserQueues = localStorage.getItem('queues')
import { groupBy } from 'lodash'
const profile = localStorage.getItem('profile')
import { format, sub } from 'date-fns'
export default {
  name: 'painel-de-controle',
  components: { ItemTicket },
  data () {
    return {
      colors: {},
      userProfile: 'admin',
      profile,
      visualizarFiltros: false,
      slide: 0,
      height: 400,
      optionsVisao: [
        { label: this.$t('dashTickets.viewTypeUser'), value: 'U' },
        { label: this.$t('dashTickets.viewTypeUserSynthetic'), value: 'US' },
        { label: this.$t('dashTickets.viewTypeQueue'), value: 'F' },
        { label: this.$t('dashTickets.viewTypeQueueSynthetic'), value: 'FS' }
      ],
      visao: 'U',
      pesquisaTickets: {
        showAll: true,
        dateStart: format(sub(new Date(), { days: 2 }), 'yyyy-MM-dd'),
        dateEnd: format(new Date(), 'yyyy-MM-dd'),
        queuesIds: []
      },
      tickets: [],
      filas: [],
      usuarios: [],
      modalTransferirTicket: false,
      usuarioSelecionado: null,
      filaSelecionada: null,
      usuarios2: [],
      usuarios3: [],
      modalTransferirTicket2: false,
      modalTransferirTicket3: false,
      modalTransferirTicket4: false,
      usuarioSelecionado2: null,
      usuarioSelecionado3: null,
      modalTransferirEntreFilas: false,
      modalTransferirEntreCanais: false,
      filaOrigemTransferencia: null,
      filaDestinoTransferencia: null,
      usuarioDestinoTransferenciaFila: null,
      canalOrigemTransferencia: null,
      canalDestinoTransferencia: null,
      whatsapps: [],
      sizes: { lg: 3, md: 3, sm: 2, xs: 1 },
      // Sistema de gerenciamento de memória
      timers: [],
    }
  },
  computed: {
    contentClass () {
      let contentClass = 'col'
      const keysLenSize = Object.keys(this.cTicketsUser[0]).length
      for (const size of ['xl', 'lg', 'md', 'sm', 'xs']) {
        if (this.sizes[size]) {
          const sizeExpect = this.sizes[size] > keysLenSize ? keysLenSize : this.sizes[size]
          contentClass += ' col-' + size + '-' + (12 / sizeExpect)
        }
      }
      return contentClass
    },
    sets () {
      const sets = []
      // const items = this.itemsPerSet
      const limit = Math.ceil(this.cTicketsUser.length / this.itemsPerSet)
      for (let index = 0; index < limit; index++) {
        const start = index * this.itemsPerSet
        const end = start + this.itemsPerSet
        sets.push(this.cTicketsUser.slice(start, end))
      }
      return sets[0]
    },
    itemsPerSet () {
      let cond = false
      for (const size of ['xl', 'lg', 'md', 'sm', 'xs']) {
        cond = cond || this.$q.screen[size]
        if (cond && this.sizes[size]) {
          return this.sizes[size]
        }
      }
      return 1
    },
    cUserQueues () {
      try {
        const filasUsuario = JSON.parse(UserQueues).map(q => {
          if (q.isActive) {
            return q.id
          }
        })
        return this.filas.filter(f => filasUsuario.includes(f.id)) || []
      } catch (error) {
        return []
      }
    },
    cTicketsUser () {
      const field = this.visao === 'U' || this.visao === 'US' ? 'userId' : 'queueId'
      return [groupBy(this.tickets, field)]
    },
    canaisDisponiveis () {
      if (!this.whatsapps || !Array.isArray(this.whatsapps)) return []
      return this.whatsapps
        .filter(w => {
          const isConnected = (w.status === 'CONNECTED' || w.status === 'OPENING')
          const isNotDeleted = !w.isDeleted
          return isConnected && isNotDeleted
        })
        .map(w => ({
          id: w.id,
          name: w.name,
          type: w.type,
          channel: w.type
        }))
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
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
    filterUsers (element, index, array) {
      const fila = this.filaSelecionada
      if (fila == null) return true
      const queues_valid = element.queues.filter(function (element, index, array) {
        return (element.id == fila)
      })
      return (queues_valid.length > 0)
    },
    async listarFilas () {
      try {
        const { data } = await ListarFilas()
        this.filas = data
        this.modalTransferirTicket = true
        this.listarUsuarios()
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.loadQueuesError'), error)
      }
    },
    async listarUsuarios () {
      try {
        let usuarios = [];
        let hasMore = true;
        let pageNumber = 1; // Página inicial.

        while (hasMore) {
          const { data } = await ListarUsuarios({ pageNumber });

          const novosUsuarios = data.users.filter(user => user.profile !== 'superadmin');
          usuarios = [...usuarios, ...novosUsuarios];

          hasMore = data.hasMore;
          pageNumber += 1;
        }

        this.usuarios = usuarios;
        this.modalTransferirTicket = true;
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t('dashTickets.loadUsersError'), error);
      }
      // try {
      //   const { data } = await ListarUsuarios()
      //   this.usuarios = data.users
      //   this.modalTransferirTicket = true
      // } catch (error) {
      //   console.error(error)
      //   this.$notificarErro('Problema ao carregar usuários', error)
      // }
    },
    async atualizarTicketPorFila (id, user, fila, status) {
      await AtualizarTicket(id, {
        userId: user,
        queueId: fila,
        status: status,
        isTransference: 1
      })
    },
    async confirmarTransferenciaTicket () {
      if(this.usuarioSelecionado === null) {
        this.$notificarErro('Selecione o usuário e a fila destino para os atendimentos pendentes!')
        return;
      }
      try {
        for (const ticket of this.tickets) {
          if (ticket.queueId === null) {
            await this.atualizarTicketPorFila(ticket.id, this.usuarioSelecionado, this.filaSelecionada, ticket.status)
          }
        }
      } catch (error){
        console.error(error)
        this.$notificarErro('Problema ao realizar transferência', error)
      }
      this.modalTransferirTicket = false
    },
    async listarUsuarios2 () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios2 = data.users
        this.usuarios3 = data.users
        this.modalTransferirTicket2 = true
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.loadUsersError'), error);
      }
    },
    async confirmarTransferenciaTicket2 () {
      if(this.usuarioSelecionado2 === null || this.usuarioSelecionado3 === null) {
        this.$notificarErro(this.$t('dashTickets.selectUserAndQueueError'))
        return;
      }
      try {
        for (const ticket of this.tickets) {
          if (ticket.userId === this.usuarioSelecionado2) {
            await this.atualizarTicketPorFila(ticket.id, this.usuarioSelecionado3, ticket.queueId, ticket.status)
          }
        }
      } catch (error){
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.transferError'), error)
      }
      this.modalTransferirTicket2 = false
    },
    async atualizarTicketPendente (id, user, fila) {
      await AtualizarTicket(id, {
        userId: user,
        queueId: fila,
        status: 'closed',
        isTransference: 1
      })
    },
    async fecharTicketsPendentes () {
      try {
        this.modalTransferirTicket3 = true
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.closeMassTicketsError'), error)
      }
    },
    async marcarTodasComoLidas () {
      try {
      await LerTodasAsMensagens();
      this.$q.notify({
        color: 'warning',
        position: 'top',
        message: this.$t('dashTickets.markAllAsReadMessage'),
      });
      const timerId = setTimeout(() => {
          window.location.reload();
        }, 1000);
      this.addTimer(timerId);
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.markAllAsReadError'), error)
      }
    },
    async fecharTicketsAbertos () {
      try {
        this.modalTransferirTicket4 = true
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.closeMassTicketsError'), error)
      }
    },
    async resolverTodosPendentes() {
      try {
        const pendingTickets = this.tickets.filter(ticket => ticket.status === 'pending');

        for (let i = 0; i < pendingTickets?.length; i += 10) {
          const batch = pendingTickets.slice(i, i + 10);
          const batchPromises = batch.map(ticket => 
            this.atualizarTicketPendente(ticket.id, ticket.userId, ticket.queueId)
              .catch(e => {
                console.log(ticket.id + ' não atualizado: ' + e);
              })
          );
          this.$q.notify({
            color: 'warning',
            position: 'top',
            message: this.$t('dashTickets.resolveTicketsBatchMessage'),
          });
          await Promise.all(batchPromises);
        }

        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: this.$t('dashTickets.reloadPageMessage'),
        });
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.addTimer(timerId);
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t('dashTickets.closeMassTicketsError'), error);
      }
      this.modalTransferirTicket3 = false;
    },
    async resolverTodosAbertos() {
      try {
        const openTickets = this.tickets.filter(ticket => ticket.status === 'open');

        for (let i = 0; i < openTickets?.length; i += 10) {
          const batch = openTickets.slice(i, i + 10);
          const batchPromises = batch.map(ticket => 
            this.atualizarTicketPendente(ticket.id, ticket.userId, ticket.queueId)
              .catch(e => {
                console.log(ticket.id + ' não atualizado: ' + e);
              })
          );
          this.$q.notify({
            color: 'warning',
            position: 'top',
            message: this.$t('dashTickets.resolveTicketsBatchMessage'),
          });
          await Promise.all(batchPromises);
        }

        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: this.$t('dashTickets.reloadPageMessage'),
        });
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.addTimer(timerId);
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t('dashTickets.closeMassTicketsError'), error);
      }
      this.modalTransferirTicket4 = false;
    },
    deleteTicket (ticketId) {
      const newTickets = [...this.tickets]
      const ticketsFilter = newTickets.filter(t => t.id !== ticketId)
      this.tickets = [...ticketsFilter]
    },
    updateTicket (ticket) {
      const newTickets = [...this.tickets]
      const idx = newTickets.findIndex(t => ticket.id)
      if (idx) {
        newTickets[idx] = ticket
        this.tickets = [...newTickets]
      }
    },
    createTicket (ticket) {
      const newTickets = [...this.tickets]
      newTickets.unshift(ticket)
      this.tickets = [...newTickets]
    },
    verifyIsActionSocket (data) {
      if (!data.id) return false

      // mostrar todos
      if (this.pesquisaTickets.showAll) return true

      // não existir filas cadastradas
      if (!this.filas.length) return true

      // verificar se a fila do ticket está filtrada
      const isQueue = this.pesquisaTickets.queuesIds.indexOf(q => data.queueId === q)

      let isValid = false
      if (isQueue !== -1) {
        isValid = true
      }
      return isValid

      // verificar se o usuario possui ecesso a fila do ticket
    },
    conectSocketQueues (tenantId, queueId) {
      // socket.on(`${tenantId}:${queueId}:ticket:queue`, data => {
      //   if (!this.verifyIsActionSocket(data.ticket)) return

      //   if (data.action === 'update') {
      //     this.updateTicket(data.ticket)
      //   }
      //   if (data.action === 'create') {
      //     this.createTicket(data.ticket)
      //   }
      //   if (data.action === 'delete') {
      //     this.deleteTicket(data.ticketId)
      //   }
      // })
    },
    // socketTickets () {
    //   socket.on(`${usuario.tenantId}:ticketList`, async (data) => {
    //     if (data.type === 'ticket:update') {
    //       if(data.payload.channel !== 'waba'){
    //         console.log('socket ON: DASH:UPDATE')
    //         this.$q.notify({
    //           color: 'positive',
    //           position: 'bottom',
    //           message: `Novas interações para o atendimento ${data.payload.id} recebidas. Caso queira acessar as novas informações nesse painel, atualize essa página.`,
    //         });
    //       }
    //     }
    //   })
    // },
    connectSocket () {
      // this.socketTickets()
      this.cUserQueues.forEach(el => {
        this.conectSocketQueues(usuario.tenantId, el.id)
      })
    },
    definirNomeUsuario (item) {
      this.verifyIsActionSocket(item)
      return item?.user?.name || 'Pendente'
    },
    definirNomeFila (f) {
      const fila = this.filas.find(fila => fila.id === f.queueId)
      return fila?.queue || this.$t('dashTickets.noQueue')
    },
    counterStatus (tickets) {
      const status = {
        open: 0,
        pending: 0,
        closed: 0
      }
      const group = groupBy(tickets, 'status')
      status.open = group.open?.length || 0
      status.pending = group.pending?.length || 0
      status.closed = group.closed?.length || 0
      return status
    },
    consultarTickets () {
      ConsultarTicketsQueuesService(this.pesquisaTickets)
        .then(res => {
          this.tickets = res.data
          this.connectSocket()
        })
        .catch(error => {
          console.error(error)
          this.$notificarErro(this.$t('dashTickets.consultTicketsError'), error)
        })
    },
    onResize ({ height }) {
      this.height = height
    },
    filterUsersForQueueTransfer (element, index, array) {
      const fila = this.filaDestinoTransferencia
      if (fila == null) return true
      const queues_valid = element.queues.filter(function (element, index, array) {
        return (element.id == fila)
      })
      return (queues_valid.length > 0)
    },
    async abrirModalTransferirEntreFilas () {
      try {
        if (this.filas.length === 0) {
          const { data } = await ListarFilas()
          this.filas = data
        }
        if (this.usuarios.length === 0) {
          await this.listarUsuarios()
        }
        this.modalTransferirEntreFilas = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Erro ao carregar dados para transferência entre filas', error)
      }
    },
    async abrirModalTransferirEntreCanais () {
      try {
        if (this.whatsapps.length === 0) {
          const { data } = await ListarWhatsappsByTenant()
          this.whatsapps = data || []
        }
        this.modalTransferirEntreCanais = true
      } catch (error) {
        console.error(error)
        this.$notificarErro('Erro ao carregar canais', error)
      }
    },
    async confirmarTransferenciaEntreFilas () {
      if (!this.filaDestinoTransferencia) {
        this.$notificarErro(this.$t('dashTickets.selectDestinationQueueError'))
        return
      }
      try {
        const response = await TransferirTicketsEntreFilas({
          sourceQueueId: this.filaOrigemTransferencia || null,
          destinationQueueId: this.filaDestinoTransferencia,
          userId: this.usuarioDestinoTransferenciaFila || null
        })
        
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: response.data.message || this.$t('dashTickets.transferBetweenQueuesSuccess'),
        })
        
        this.modalTransferirEntreFilas = false
        this.filaOrigemTransferencia = null
        this.filaDestinoTransferencia = null
        this.usuarioDestinoTransferenciaFila = null
        
        // Recarregar tickets após transferência
        const timerId = setTimeout(() => {
          this.consultarTickets()
        }, 1000)
        this.addTimer(timerId)
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.transferBetweenQueuesError'), error)
      }
    },
    async confirmarTransferenciaEntreCanais () {
      if (!this.canalOrigemTransferencia) {
        this.$notificarErro(this.$t('dashTickets.selectSourceChannelError') || 'Selecione o canal de origem!')
        return
      }
      
      if (!this.canalDestinoTransferencia) {
        this.$notificarErro(this.$t('dashTickets.selectDestinationChannelError'))
        return
      }
      
      const canalOrigem = this.canaisDisponiveis.find(c => c.id === this.canalOrigemTransferencia)
      if (!canalOrigem) {
        this.$notificarErro(this.$t('dashTickets.selectSourceChannelError') || 'Canal de origem inválido!')
        return
      }
      
      const canalDestino = this.canaisDisponiveis.find(c => c.id === this.canalDestinoTransferencia)
      if (!canalDestino) {
        this.$notificarErro(this.$t('dashTickets.selectDestinationChannelError'))
        return
      }
      
      try {
        const sourceChannel = canalOrigem.channel
        const sourceWhatsappId = this.canalOrigemTransferencia
        
        const response = await TransferirTicketsEntreCanais({
          sourceChannel,
          sourceWhatsappId,
          destinationChannel: canalDestino.channel,
          destinationWhatsappId: canalDestino.id
        })
        
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: response.data.message || this.$t('dashTickets.transferBetweenChannelsSuccess'),
        })
        
        this.modalTransferirEntreCanais = false
        this.canalOrigemTransferencia = null
        this.canalDestinoTransferencia = null
        
        // Recarregar tickets após transferência
        const timerId = setTimeout(() => {
          this.consultarTickets()
        }, 1000)
        this.addTimer(timerId)
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('dashTickets.transferBetweenChannelsError'), error)
      }
    }
  },

  async mounted () {
    // if (!localStorage.getItem('reloaded')) {
    //   localStorage.setItem('reloaded', 'true');
    //   window.location.reload();
    // } else {
    //   localStorage.removeItem('reloaded');
    // }
    await ListarFilas().then(res => {
      this.filas = res.data
    })
    await ListarWhatsappsByTenant().then(res => {
      this.whatsapps = res.data || []
    }).catch(error => {
      console.error('Erro ao carregar whatsapps:', error)
    })
    await this.consultarTickets()
    this.userProfile = localStorage.getItem('profile')
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
  },
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>
// Cards principais
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.13);
  }

  .q-card-section {
    padding: 1.2rem 1.5rem;
  }
}

// Títulos
h1, .text-h6 {
  color: var(--q-primary);
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 0.5rem;
}

// Banners e avisos
.q-banner {
  border-radius: 12px;
  background: #fffbe6 !important;
  border: 1px solid #ffe58f;
  color: #222;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

// Separadores
.q-separator {
  margin: 1rem 0;
  border-radius: 2px;
}

// Listas e cards de tickets
.q-item {
  border-radius: 12px;
  margin-bottom: 0.5rem;
  transition: box-shadow 0.2s, background 0.2s;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  &:hover {
    background: rgba(var(--q-primary-rgb), 0.07);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
}

// Avatares
.q-avatar {
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  border-radius: 50%;
}

// Scroll principal
.scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--q-primary) #f0f0f0;
}
.scroll::-webkit-scrollbar {
  width: 8px;
}
.scroll::-webkit-scrollbar-thumb {
  background: var(--q-primary);
  border-radius: 8px;
}
.scroll::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 8px;
}

// Diálogos
.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.13);
    border: 1px solid rgba(255,255,255,0.18);
    .q-card-section {
      padding: 1.2rem 1.5rem;
    }
  }
}

// Selects
.q-select, .q-option-group {
  .q-field__control {
    background: rgba(255,255,255,0.7);
    border-radius: 8px;
    transition: all 0.3s;
    &:hover {
      background: rgba(255,255,255,0.9);
    }
  }
  &.q-field--focused .q-field__control {
    background: rgba(255,255,255,0.95);
    box-shadow: 0 4px 12px rgba(0,0,0,0.09);
  }
}

// Corrigir botão negativo para manter padrão Quasar
.q-btn[color="negative"] {
  background: var(--q-negative) !important;
  color: #fff !important;
  box-shadow: none !important;
  border-radius: 8px !important;
  font-weight: 700;
  transition: background 0.2s;
}
.q-btn[color="negative"]:hover {
  background: #ff7875 !important;
}

// Título e texto pendente branco (força para todos os elementos)
.bg-negative.text-white, .bg-negative.text-white * {
  color: #fff !important;
}

// Modo escuro
body.body--dark {
  .q-card, .q-dialog .q-card {
    background: rgba(30, 30, 30, 0.97);
    border-color: rgba(255,255,255,0.10);
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  }
  .q-item {
    background: rgba(30,30,30,0.7);
    &:hover {
      background: rgba(255,255,255,0.05);
    }
  }
  .q-banner {
    background: rgba(255,251,230,0.10) !important;
    border-color: rgba(255,229,143,0.18);
    color: #fff;
  }
  .scroll::-webkit-scrollbar-thumb {
    background: var(--q-primary);
  }
  .scroll::-webkit-scrollbar-track {
    background: #222;
  }
  .q-select, .q-option-group {
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

// Responsividade
@media (max-width: 900px) {
  .q-card {
    border-radius: 14px !important;
    .q-card-section {
      padding: 1rem;
    }
  }
  h1, .text-h6 {
    font-size: 1.1rem;
  }
}
@media (max-width: 600px) {
  .q-card {
    border-radius: 10px !important;
    .q-card-section {
      padding: 0.7rem;
    }
  }
  h1, .text-h6 {
    font-size: 1rem;
  }
  .q-item {
    font-size: 0.95rem;
    padding: 0.5rem 0.3rem;
  }
}
</style>
