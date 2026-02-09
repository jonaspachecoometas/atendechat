<template>
  <div id="app" class="q-pa-sm" v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card flat bordered class="full-width kanban-container">
        <q-card-section class="text-h6 text-bold">
          <div class="kanban-title"> {{ $t('tagsKanban.title') }}</div>
        </q-card-section>
        <p>{{ $t("tagsKanban.description") }}</p>
        <div v-if="loading">{{ $t("tagsKanban.loading") }}</div>
        <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
        </div>
      </q-card>
    </div>
    <q-card class="q-my-md" flat bordered>
      <div class="q-pa-md">
        <div class="kanban-lanes-container">
          <div class="kanban-lanes">
            <!-- Colunas por Tag -->
            <div
              class="kanban-lane"
              v-for="lane in dropGroups"
              :key="lane.id"
            >
              <div class="dd-drop-container">{{ lane.name }}</div>
              <Draggable
                v-model="lane.children"
                group="tags"
                item-key="id"
                :animation="180"
                ghost-class="drag-ghost"
                drag-class="dragging"
                @end="onDragEnd"
              >
                <template #item="{ element }">
                  <cards 
                    :data="element"
                    @abrirTicket="handleSaveTicket(element, 'whatsapp')"
                    @abrirTicketWaba="handleSaveTicket(element, 'waba')"
                    @abrirTicketBaileys="handleSaveTicket(element, 'baileys')"
                    @abrirTicketMeow="handleSaveTicket(element, 'meow')"
                    @abrirTicketEvo="handleSaveTicket(element, 'evo')"
                    @abrirTicketZapi="handleSaveTicket(element, 'zapi')"
                    @abrirTicketUazapi="handleSaveTicket(element, 'uazapi')"
                    @done="doneMarked"
                  />
                </template>
              </Draggable>
            </div>
          </div>
        </div>
      </div>
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
const userId = +localStorage.getItem('userId')
import Draggable from 'vuedraggable'
import Cards from './CardsTags.vue'
import { ListarContatosKanbanTags, EditarContato } from 'src/service/contatos.js'
import { ListarKanbans } from 'src/service/kanban.js'
import { CriarTicket, AtualizarTicket } from 'src/service/tickets.js'
import DefaultProfile from '../../assets/default-profile.png'
import { MostrarCores } from 'src/service/empresas.js';
import { mapGetters } from 'vuex'
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { ListarConfiguracoes } from 'src/service/configuracoes.js'
import { DadosUsuario } from 'src/service/user.js'
import { ListarTenantPorId } from 'src/service/tenants.js'
import eventBus from 'src/utils/eventBus.js'

export default {
  components: {
    Draggable,
    Cards
  },
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      isNotViewAssignedTickets: 'disabled',
      colors: {},
      dropGroups: [],
      loading: false,
      params: {
        pageNumber: 1,
        searchParam: null,
        hasMore: true
      },
    }
  },
  computed: {
    ...mapGetters(['whatsapps'])
  },
  methods: {
    async loadColors () {
      try {
        const empresaId = localStorage.getItem('companyId')
        const { data } = await MostrarCores(empresaId)
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.colors)
            ? data.colors
            : []

        this.colors = list.reduce((acc, colorObj = {}) => {
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

        localStorage.setItem('storedColors', JSON.stringify(list))
      } catch (error) {
        console.error('Erro ao carregar as cores:', error)
        this.colors = {}
      }
    },
    async doneMarked(item) {
      const contato = {
        number: item.description,
        kanban: null
      }

      this.$q.dialog({
        title: this.$t('tagsKanban.removeTitle'),
        message: this.$t('tagsKanban.removeMessage'),
        ok: {
          push: true,
          color: 'positive',
          label: this.$t('common.start')
        },
        cancel: {
          push: true,
          color: 'negative',
          label: this.$t('common.cancel')
        },
        persistent: true
      }).onOk(async () => {
        await EditarContato(contato)
        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: this.$t('tagsKanban.removeSuccess'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      }).onCancel(() => {
        this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t('tagsKanban.unhandledOption'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      })
    },
    async handleSaveTicket(cardData, channel) {
      if (!cardData.id) return
      
      try {
        const itens = []
        let channelId = null
        
        const response = await DadosUsuario(userId)
        const tenant = response.data.tenants && response.data.tenants[0] ? response.data.tenants[0] : null
        const tenantId = tenant?.id || this.usuario?.tenantId
        
        if (!tenantId) {
          this.$q.notify({
            type: 'negative',
            progress: true,
            position: 'top',
            message: this.$t('tagsKanban.tenantNotFound') || 'Tenant não encontrado',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return
        }

        const responseTenant = await ListarTenantPorId({ id: tenantId })
        const tenantData = Array.isArray(responseTenant.data) ? responseTenant.data[0] : responseTenant.data
        
        if (this.usuario.profile === 'admin' || (this.usuario.profile === 'super' && tenantData?.supervisorAdmin === 'disabled')) {
          this.whatsapps.forEach(w => {
            if (w.type === channel && channel !== "hub_instagram") {
              itens.push({ label: w.name, value: w.id })
            } else if (w.type === "hub_facebook" && channel === "hub_instagram") {
              itens.push({ label: w.name, value: w.id })
            }
          })
        } else {
          const filteredWhatsapps = this.whatsapps.filter(w => 
            response.data.whatsappAllowed?.some(wa => wa.id === w.id)
          )
          filteredWhatsapps.forEach(w => {
            if (w.type === channel && channel !== "hub_instagram") {
              itens.push({ label: w.name, value: w.id })
            } else if (w.type === "hub_facebook" && channel === "hub_instagram") {
              itens.push({ label: w.name, value: w.id })
            }
          })
        }

        if (itens.length === 0) {
          this.$q.notify({
            type: 'negative',
            progress: true,
            position: 'top',
            message: this.$t('tagsKanban.noChannelsAvailable') || 'Nenhum canal disponível',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          return
        }

        this.$q.dialog({
          title: `${this.$t("tagsKanban.contactTitle") || "Contato"}: ${cardData.title}`,
          message: this.$t("tagsKanban.selectChannel") || this.$t("kanbans.selectChannel") || "Selecione o canal",
          options: {
            type: 'radio',
            model: channelId,
            isValid: v => !!v,
            items: itens
          },
          ok: {
            push: true,
            color: 'positive',
            label: this.$t('common.start')
          },
          cancel: {
            push: true,
            label: this.$t('common.cancel'),
            color: 'negative'
          },
          persistent: true
        }).onOk(async (selectedChannelId) => {
          if (!selectedChannelId) return
          try {
            const { data: ticket } = await CriarTicket({
              contactId: cardData.id,
              isActiveDemand: true,
              userId: userId,
              channel,
              channelId: selectedChannelId,
              status: 'open'
            })
            await this.$store.dispatch('AbrirChatMensagens', ticket)
            this.$q.notify({
              message: `${this.$t("common.startedAttendance") || "Atendimento iniciado"} - ${ticket.contact?.name || cardData.title} - Ticket: ${ticket.id}`,
              type: 'positive',
              position: 'top',
              progress: true,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
            this.$router.push({ name: 'chat', params: { ticketId: ticket.id } })
          } catch (error) {
            if (error.status === 409) {
              console.log('tkc >>>>>>>>>>>>> 4', error)
              const ticketAtual = JSON.parse(error.data.error)
              
              // Se o status for pending, atualizar para open antes de rotear
              const updateData = {}
              const needsStatusUpdate = ticketAtual.status === 'pending'
              
              if (needsStatusUpdate) {
                updateData.status = 'open'
                updateData.userId = userId
                ticketAtual.status = 'open'
                ticketAtual.userId = userId
              }
              
              if (ticketAtual.whatsappId === null) {
                updateData.whatsapp = selectedChannelId
              }
              
              // Atualizar ticket se houver mudanças
              if (Object.keys(updateData).length > 0) {
                await AtualizarTicket(ticketAtual.id, updateData)
                
                // Aguardar 250ms para dar tempo de salvar no banco
                await new Promise(resolve => setTimeout(resolve, 250))
              }
              
              this.abrirAtendimentoExistente(cardData, ticketAtual)
              return
            }
            this.$notificarErro(this.$t('common.notifications.error') || 'Erro ao criar ticket', error)
          }
        }).onCancel(() => {
          this.$q.notify({
            type: 'warning',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('tagsKanban.canceledTicket') || 'Operação cancelada',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        })
      } catch (error) {
        console.error('Erro ao iniciar conversa:', error)
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          message: this.$t('tagsKanban.errorStartingConversation') || 'Erro ao iniciar conversa',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      }
    },
    abrirAtendimentoExistente(cardData, ticket) {
      if (this.isNotViewAssignedTickets === 'enabled' && this.userProfile === 'user') {
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: this.$t("kanbans.adminOnlyTicket", { title: cardData.title }) || `O contato ${cardData.title} possui um ticket que só pode ser visualizado por administradores`,
          ok: {
            label: this.$t('common.ok'),
            color: 'negative',
            push: true
          },
          persistent: true
        })
        this.loading = false
        return
      }
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t("kanbans.contactHasTicket", {
          title: cardData.title,
          id: ticket.id,
          queue: ticket.queueId || "sem fila",
        }) || `O contato ${cardData.title} já possui um ticket (ID: ${ticket.id}, Fila: ${ticket.queueId || "sem fila"})`,
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
      }).onOk(async () => {
        try {
          this.abrirChatContato(ticket)
        } catch (error) {
          this.$notificarErro(
            this.$t("kanbans.tokenUpdateError") || "Erro ao atualizar token",
            error
          )
        }
      })
    },
    abrirChatContato(ticket) {
      if (this.$q.screen.lt.md && ticket.status !== 'pending') {
        this.$root.$emit('infor-cabecalo-chat:acao-menu')
      }
      if (!(ticket.status !== 'pending' && (ticket.id !== this.$store.getters.ticketFocado?.id || this.$route.name !== 'chat'))) return
      this.$store.commit('SET_HAS_MORE', true)
      this.$store.dispatch('AbrirChatMensagens', ticket)
    },
    async onDragEnd () {
      // opcional: manipular algo ao fim do drag
    },
    async listarKanbans() {
      const { data } = await ListarEtiquetas()
      this.kanbans = data
      this.kanbans.sort((a, b) => a.id - b.id)
      this.kanbans.forEach(kanban => {
        this.dropGroups.push({
          id: kanban.id,
          name: kanban.tag,
          children: []
        })
      })
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes();
      localStorage.setItem('configuracoes', JSON.stringify(data));
      const conf = data.find(c => c.key === 'NotViewAssignedTickets');
      this.isNotViewAssignedTickets = conf?.value;
    },
    async listarContatos () {
      try {
        this.loading = true;
        while (this.params.hasMore) {
          const { data } = await ListarContatosKanbanTags(this.params)

          data.contacts.sort((a, b) => a.id - b.id);
          if (data.contacts && Array.isArray(data.contacts)) {
            data.contacts.forEach(async (contato) => {
              // if(contato.number === null) return
              if(!contato.isGroup || contato.tags !== null){
                const newContact = {
                  title: contato.name || contato.pushname || this.$t("tagsKanban.noName"),
                  description: contato.number,
                  id: contato.id,
                  profilePicUrl: contato.profilePicUrl || DefaultProfile,
                  tags: contato.tags,
                  wallet: contato.wallet,
                  done: false
                }
                if (contato.tags === null) {
                  return null
                } else {
                  for (const tag of contato.tags){
                    const kanbanId = tag.tagid
                    const kanbanLane = this.dropGroups.find(group => group.id === kanbanId)
                    if (kanbanLane) {
                      kanbanLane.children.push(newContact)
                    }
                    else {
                      return null
                    }
                  }
                }
              }
            })
          }

          const { count, hasMore } = data
          if (hasMore) {
            this.params.hasMore = hasMore;
            this.params.pageNumber = (this.params.pageNumber || 1) + 1
          } else {
            this.params.hasMore = false
          }
        }

        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t('tagsKanban.cardsSaved'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      } catch (error) {
        console.error(error);
        this.$notificarErro('Ocorreu um erro ao editar os contatos', error);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted () {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.kanban === true;
    await this.listarConfiguracoes()
    this.listarKanbans()
    this.listarContatos()
    const storedColors = localStorage.getItem('storedColors')
    if (storedColors) {
      try {
        const arr = JSON.parse(storedColors)
        this.colors = (Array.isArray(arr) ? arr : []).reduce((acc, colorObj = {}) => {
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
      } catch (e) {
        await this.loadColors()
      }
    } else {
      await this.loadColors()
    }
    this._onNewTag = (newTag) => {
      this.dropGroups.push({ id: newTag.id, name: newTag.tag, children: [] })
    }
    eventBus.on('newTagCreated', this._onNewTag)
  },
  beforeUnmount() {
    if (this._onNewTag) eventBus.off('newTagCreated', this._onNewTag)
  }
}
</script>

<style lang="sass" scoped>
.dd-drop-actions
  padding: 16px

.dd-save
  color: white
  background: #5c67f2
  margin-right: 8px

.dd-cancel
  color: #5c67f2
  border: 1px solid #5c67f2

.view-title
  color: #5c67f2
  font-weight: bold
  letter-spacing: 1px
  text-transform: uppercase
  margin: 12px 0

.drag-ghost
  opacity: .6

.dragging
  transform: rotate(1deg)

.kanban-lanes-container
  width: 100%
  overflow-x: auto
  overflow-y: hidden
  -webkit-overflow-scrolling: touch

.kanban-lanes
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  gap: 16px
  min-width: fit-content
  padding-bottom: 8px

.kanban-lane
  flex: 0 0 auto
  width: 300px
  min-width: 300px
  border: 1px solid #e0e0e0
  border-radius: 8px
  background: #ffffff
  min-height: 400px
  padding: 12px
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  transition: box-shadow 0.2s ease

.kanban-lane:hover
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15)

.dd-drop-container
  color: white
  background-color: #5c67f2
  border-radius: 8px
  text-align: left
  padding: 8px 12px
  border-bottom: 2px solid #5c67f2
  display: flex
  align-items: center
  margin-bottom: 8px
  font-weight: 600

#app
  text-align: center
  color: $primary
  margin-top: 0px

  h2
    color: $primary

  dd-card
    display: inline-block
    width: 100px
    font-size: 12px
    padding: 12px
    border: 1px solid #cccccc
    margin: 10px
    border-radius: 4px
    background: white

.loading-bar
  position: relative
  background-color: #f0f0f0
  height: 4px
  overflow: hidden

.loading-bar .bar
  position: absolute
  top: 0
  left: 0
  animation: loadingAnimation 1s infinite

@keyframes loadingAnimation
  0%
    width: 0
  100%
    width: 100%

</style>
<!-- .dd-drop-actions .dd-save::before
  content: "Salvar"

.dd-drop-actions .dd-cancel::before
  content: "Cancelado" -->
