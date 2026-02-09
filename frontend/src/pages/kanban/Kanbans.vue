
<template>
  <div id="app" class="q-pa-sm" v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="q-my-md">
      <q-card flat bordered class="full-width kanban-container">
        <q-card-section class="text-h6 text-bold">
          <div class="kanban-title">{{ $t('kanbans.title') }}</div>
        </q-card-section>
        <div v-if="loading">{{ $t('kanbans.loadingMessage') }}</div>
        <div v-if="loading" class="loading-bar"><div class="bar" /></div>
      </q-card>
    </div>

    <q-card class="q-my-md" flat bordered>
      <div class="q-pa-md">
        <div class="kanban-lanes-container">
          <div class="kanban-lanes">
            <!-- Apenas as colunas do Kanban -->
            <div
              class="kanban-lane"
              v-for="lane in dropGroups"
              :key="lane.id"
            >
              <div class="dd-drop-container">
                {{ lane.name }}
              </div>

              <Draggable
                v-model="lane.children"
                group="kanban"
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

        <div class="q-pa-md q-gutter-sm dd-drop-actions">
          <q-btn color="primary" class="dd-save" :label="$t('common.save')" @click="saveState" />
          <q-btn flat class="dd-cancel" :label="$t('common.cancel')" @click="cancel" />
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
import Cards from './Cards.vue'

import { ListarContatosKanban, EditarContato } from 'src/service/contatos.js'
import { ListarKanbans } from 'src/service/kanban.js'
import { CriarTicket, AtualizarTicket } from 'src/service/tickets.js'
import { MostrarCores } from 'src/service/empresas.js'
import { ListarConfiguracoes } from 'src/service/configuracoes.js'
import { DadosUsuario } from 'src/service/user.js'
import { ListarTenantPorId } from 'src/service/tenants.js'

import DefaultProfile from '../../assets/default-profile.png'
import { mapGetters } from 'vuex'

export default {
  name: 'Kanbans',
  components: { Draggable, Cards },
  // Não usa composer local; usa $t de injeção global
  data () {
    return {
      userProfile: 'user',
      pageAllowed: true,
      isNotViewAssignedTickets: 'disabled',
      colors: {},
      dropGroups: [],
      stories: [],
      loading: false,
      params: {
        pageNumber: 1,
        searchParam: null,
        hasMore: true
      },
      originalSnapshot: null,
      usuario: null
    }
  },

  computed: {
    ...mapGetters(['whatsapps'])
  },

  created () {
    this.bootstrap()
  },

  methods: {
    async bootstrap () {
      try {
        this.loading = true
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
        await this.listarConfiguracoes()
        await this.loadColors()
        await this.listarKanbans()
        await this.listarContatos()
        this.originalSnapshot = this.serializeState()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async listarConfiguracoes () {
      const { data } = await ListarConfiguracoes()
      localStorage.setItem('configuracoes', JSON.stringify(data))
      const conf = data.find(c => c.key === 'NotViewAssignedTickets')
      this.isNotViewAssignedTickets = conf?.value
      // permissões de página
      this.userProfile = localStorage.getItem('profile') || 'user'
      const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
      this.pageAllowed = menuPermissions?.kanban === true
    },

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

    async listarKanbans () {
      // Esperado: data = [{ id, tag/name, position? }, ...] ou data.kanban
      const { data } = await ListarKanbans()
      const lanes = Array.isArray(data?.kanban) ? data.kanban : Array.isArray(data) ? data : []

      lanes.sort((a, b) => {
        const ap = (a.position ?? Number.POSITIVE_INFINITY)
        const bp = (b.position ?? Number.POSITIVE_INFINITY)
        return ap === bp ? (a.id - b.id) : (ap - bp)
      })

      this.dropGroups = lanes.map(l => ({
        id: l.id,
        name: l.name || l.tag || `#${l.id}`,
        children: []
      }))
    },

    async listarContatos () {
      try {
        this.loading = true;
        while (this.params.hasMore) {
          const { data } = await ListarContatosKanban(this.params)
          data.contacts.sort((a, b) => a.id - b.id);
          if (data.contacts && Array.isArray(data.contacts)) {
            data.contacts.forEach(async (contato) => {
              // if(contato.number === null) return
              if(!contato.isGroup || contato.kanban !== null){
                const newContact = {
                  title: contato.name || contato.pushname || this.$t("kanbans.noNameAvailable"),
                  description: contato.number,
                  id: contato.id,
                  profilePicUrl: contato.profilePicUrl || DefaultProfile,
                  tags: contato.tags,
                  wallet: contato.wallet,
                  done: false
                }
                if (contato.kanban === null) {
                  return null
                } else {
                  const kanbanId = contato.kanban
                  const kanbanLane = this.dropGroups.find(group => group.id === kanbanId)
                  if (kanbanLane) {
                    kanbanLane.children.push(newContact)
                  }
                  else{
                    return null
                  }
                }
              }
            })
          }
          this.params.hasMore = data.hasMore;
          this.params.pageNumber++;
        }
      } catch (error) {
        console.error(this.$t("kanbans.fetchingContactsError"), error)
      } finally {
        this.loading = false;
      }
    },

    onDragEnd () {
      // opcional: marcar estado sujo para habilitar salvar
    },

    serializeState () {
      return {
        stories: JSON.parse(JSON.stringify(this.stories)),
        dropGroups: JSON.parse(JSON.stringify(this.dropGroups))
      }
    },

    restoreState (snap) {
      this.stories = JSON.parse(JSON.stringify(snap.stories))
      this.dropGroups = JSON.parse(JSON.stringify(snap.dropGroups))
    },

    async saveState () {
      this.$q.notify({
        type: 'warning',
        progress: true,
        position: 'top',
        textColor: 'black',
        message: this.$t("kanbans.loadingKanban"),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      });

      const contatos = [];

      // Contatos que voltaram para o bucket original (sem kanban)
      if (this.stories.length > 0) {
        for (const bucket of this.stories) {
          const contato = {
            number: bucket.description,
            kanban: null
          };
          contatos.push({ id: bucket.id, contato });
        }
      }

      // Contatos que foram movidos para as lanes do kanban
      if (this.dropGroups.length > 0) {
        for (const dropzone of this.dropGroups) {
          for (const child of dropzone.children) {
            const contato = {
              number: child.description,
              kanban: dropzone.id
            };
            contatos.push({ id: child.id, contato });
          }
        }
      }

      try {
        const promessas = contatos.map(async (contatoInfo) => {
          if (contatoInfo.id) {
            const { data } = await EditarContato(contatoInfo.id, contatoInfo.contato);
          }
        });

        await Promise.all(promessas);

        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t("kanbans.successEditCards"),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t("kanbans.contactEditError"), error);
      }

      this.originalSnapshot = this.serializeState()
    },

    cancel () {
      if (this.originalSnapshot) this.restoreState(this.originalSnapshot)
    },

    async doneMarked(item) {
      const contato = {
        number: item.description,
        kanban: null
      }

      this.$q.dialog({
        title: this.$t("kanbans.removeAttendanceTitle"),
        message: this.$t("kanbans.removeAttendanceMessage"),
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
      }).onOk(async () => {
        try {
          if (item.id) {
            const { data } = await EditarContato(item.id, contato)
            this.$q.notify({
              type: 'info',
              progress: true,
              position: 'top',
              textColor: 'black',
              message: this.$t("kanbans.contactEdited"),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          }
          window.location.reload();
        } catch (error) {
          console.error(error)
          this.$notificarErro(this.$t("kanbans.contactEditError"), error)
        }
      })
    },

    async handleSaveTicket (card, channel) {
      if (!card.id) return
      
      const itens = []
      const channelId = null
      const response = await DadosUsuario(this.usuario.userId);
      const responseTenant = await ListarTenantPorId(this.usuario.tenantId)
      if(this.usuario.profile === 'admin' || (this.usuario.profile === 'super' && responseTenant.data[0].supervisorAdmin === 'disabled')){
        this.whatsapps.forEach(w => {
        if (w.type === channel && channel !== "hub_instagram") {
          itens.push({ label: w.name, value: w.id })
        } else if (w.type === "hub_facebook" && channel === "hub_instagram") {
          itens.push({ label: w.name, value: w.id })
        }
      })
      } else {
        const filteredWhatsapps = this.whatsapps.filter(w => 
        response.data.whatsappAllowed.some(wa => wa.id === w.id)
      );
      filteredWhatsapps.forEach(w => {
        if (w.type === channel && channel !== "hub_instagram") {
          itens.push({ label: w.name, value: w.id })
        } else if (w.type === "hub_facebook" && channel === "hub_instagram") {
          itens.push({ label: w.name, value: w.id })
        }
      })
      }

      this.$q.dialog({
        title: `${this.$t("kanbans.contactTitle")}: ${card.title}`,
        message: this.$t("kanbans.selectChannel"),
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
      }).onOk(async channelId => {
        if (!channelId) return
        try {
          const { data: ticket } = await CriarTicket({
            contactId: card.id,
            isActiveDemand: true,
            userId: userId,
            channel,
            channelId,
            status: 'open'
          })
          await this.$store.dispatch('AbrirChatMensagens', ticket)
          this.$q.notify({
            message: `${this.$t("common.startedAttendance")} || ${
              ticket.contact.name
            } - Ticket: ${ticket.id}`,
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
            console.log('tkc >>>>>>>>>>>>> 2', error)
            if(this.isNotViewAssignedTickets === 'enabled' && this.userProfile === 'user'){
              this.$q.dialog({
                title: this.$t('common.attention'),
                message: this.$t("kanbans.adminOnlyTicket", { title: card.title }),
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
            this.abrirAtendimentoExistente(card, ticketAtual)
            return
          }
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      })
    },
    abrirAtendimentoExistente (card, ticket) {
      if(this.isNotViewAssignedTickets === 'enabled' && this.userProfile === 'user'){
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: this.$t("kanbans.adminOnlyTicket", { title: card.title }),
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
          title: card.title,
          id: ticket.id,
          queue: ticket.queueId || "sem fila",
        }),
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
            this.$t("kanbans.tokenUpdateError"),
            error
          )
        }
      })
    },
    abrirChatContato (ticket) {
      if (this.$q.screen.lt.md && ticket.status !== 'pending') {
        this.$root.$emit('infor-cabecalo-chat:acao-menu')
      }
      if (!(ticket.status !== 'pending' && (ticket.id !== this.$store.getters.ticketFocado.id || this.$route.name !== 'chat'))) return
      this.$store.commit('SET_HAS_MORE', true)
      this.$store.dispatch('AbrirChatMensagens', ticket)
    }
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

.kanban-container
  background: #f8f9fc
  border-radius: 12px
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
  padding: 12px

.dd-drop-container
  font-weight: 600
  margin-bottom: 8px
  padding: 8px 12px
  border-radius: 6px
  background: #f8f9fc
  border-bottom: 2px solid #5c67f2
  color: #5c67f2

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

.loading-bar
  background-color: #f0f0f0
  height: 4px
  overflow: hidden
  border-radius: 2px
  .bar
    height: 100%
    animation: loadingAnimation 1s infinite

@keyframes loadingAnimation
  0%
    width: 0
  100%
    width: 100%
</style>
