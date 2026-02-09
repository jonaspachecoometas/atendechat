<template>
  <div class="opportunity-card" @click="$emit('click', oportunidade)">
    <div class="opportunity-card__header">
      <div class="opportunity-card__header-left">
        <span class="opportunity-card__stage" :style="{ background: oportunidade.stageCor || '#e0e0e0' }">
          {{ oportunidade.stageName }}
        </span>
        <q-badge :color="corStatus(oportunidade.status)">{{ traduzirStatus(oportunidade.status) }}</q-badge>
      </div>
      <div class="opportunity-card__header-actions">
        <q-btn
          flat
          dense
          icon="delete"
          color="negative"
          @click.stop="$emit('deletar', oportunidade)"
          size="sm"
        />
        <q-btn
          v-if="usuarioDados?.restrictedUser !== 'enabled'"
          flat
          dense
          icon="send"
          color="positive"
          @click.stop="abrirModalMensagem"
          size="sm"
        />
        <q-btn
          flat
          dense
          icon="email"
          color="primary"
          @click.stop="abrirModalEmail"
          size="sm"
        />
        <q-btn
          v-if="userProfile === 'admin' && oportunidade.contact && oportunidade.contact.id"
          flat
          dense
          icon="mdi-eye"
          color="info"
          @click.stop="espiarAtendimentoContactId(oportunidade.contact.id)"
          size="sm"
        />
      </div>
    </div>
    <div class="opportunity-card__title">#{{ oportunidade.id }} - {{ oportunidade.name }}</div>
    <div class="opportunity-card__valor">{{ formatarValor(oportunidade.value) }}</div>
    <div class="opportunity-card__info">
      <div class="opportunity-card__contact-info blur-effect" v-if="oportunidade.contact">
        <q-avatar size="40px" v-if="oportunidade.contact.profilePicUrl && oportunidade.contact.profilePicUrl !== 'null' && oportunidade.contact.profilePicUrl !== 'undefined'">
          <img :src="oportunidade.contact.profilePicUrl" alt="Foto do contato">
        </q-avatar>
        <q-avatar size="40px" color="primary" text-color="white" v-else>
          {{ oportunidade.contact.name ? oportunidade.contact.name.charAt(0).toUpperCase() : '?' }}
        </q-avatar>
        <div class="opportunity-card__contact-details">
          <div class="opportunity-card__info-row blur-effect" v-if="oportunidade.contact.name">
            <q-icon name="person" size="xs" />
            <span>{{ oportunidade.contact.name }}</span>
          </div>
          <div class="opportunity-card__info-row blur-effect" v-if="oportunidade.contact.number">
            <q-icon name="phone" size="xs" />
            <span>{{ oportunidade.contact.number }}</span>
          </div>
          <div class="opportunity-card__info-row blur-effect" v-if="oportunidade.contact.email">
            <q-icon name="email" size="xs" />
            <span>{{ oportunidade.contact.email }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="opportunity-card__footer">
      <div v-if="oportunidade.closingForecast" class="opportunity-card__date" :class="{ 'opportunity-card__date--urgent': isDataUrgente(oportunidade.closingForecast) }">
        <q-icon name="event" size="xs" />
        <span>{{ $t('funil.fechamentoPrevisto') }}: {{ formatarDataUTC(oportunidade.closingForecast) }}</span>
        <q-tooltip v-if="isDataUrgente(oportunidade.closingForecast)">
          {{ $t('funil.dataProxima') }}
        </q-tooltip>
      </div>
      <div v-if="oportunidade.createdAt" class="opportunity-card__date">
        <q-icon name="schedule" size="xs" />
        <span>{{ $t('funil.criadoEm') }} {{ formatarDataUTC(oportunidade.createdAt) }}</span>
      </div>
    </div>
    <q-dialog v-model="showModalMensagem" @hide="resetFields">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{$t('generalSupport.startNew')}}</div>
          </q-card-section>

          <q-card-section>
            <q-select
              style="margin: 1px;"
              v-model="whatsappId"
              :options="cSessionsOptions"
              label="WhatsApp ID"
              dense
              outlined
            />
            <c-input
              class="col-12 col-md-6"
              style="margin: 1px; margin-top: 5px"
              outlined
              v-model="numero" 
              mask="+#############"
              :placeholder="$t('generalSupport.placeholderNumber')"
              fill-mask
              unmasked-value
              dense
            
              :label="$t('generalSupport.number')"
            />
            <c-input
              outlined
              style="margin: 1px; margin-top: 5px"
              dense 
              v-model="mensagem" 
              :label="$t('generalSupport.message')"
              :disable="whatsappId && whatsappId.type === 'waba'"
              type="textarea"
            />
            <div v-if="whatsappId && whatsappId.type === 'waba'" class="text-caption text-warning q-mt-xs">
              <q-icon name="info" size="xs" class="q-mr-xs" />
              {{ $t('mainLayout.novo.wabaTemplate') }}
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn :label="$t('common.cancel')" class="q-px-md q-mr-sm" color="negative" @click="showModalMensagem = false" />
            <q-btn :label="$t('common.send')" class="q-px-md q-mr-sm" color="positive" @click="enviarMensagem" :loading="loadingMensagem" :disable="loadingMensagem" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    <q-dialog v-model="modalEmail" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funil.enviarEmail') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="oportunidade.contact.email"
            :label="$t('funil.emailDestinatario')"
            outlined
            dense
            readonly
            disable
          />
          <q-input
            v-model="emailAssunto"
            :label="$t('funil.assuntoEmail')"
            outlined
            dense
            :rules="[val => !!val || $t('funil.assuntoObrigatorio')]"
            class="q-mt-md"
          />
          <q-input
            v-model="emailMensagem"
            :label="$t('funil.mensagemEmail')"
            type="textarea"
            outlined
            dense
            :rules="[val => !!val || $t('funil.mensagemObrigatoria')]"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="negative" v-close-popup />
          <q-btn flat :label="$t('common.send')" color="primary" @click="enviarEmail" :loading="loadingEmail" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
          <MensagemChatEspiarContato :mensagens="currentTicket.messages" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { TextoIndividual } from 'src/service/massa.js' 
import { ObterContatoPeloNumero, CriarContato } from 'src/service/contatos.js'
import { CriarTicket, VerificarTicketsAbertos } from 'src/service/tickets.js' 
import { mapGetters } from 'vuex'
import { DadosUsuario } from 'src/service/user.js'
import { ListarTenantPorId } from 'src/service/tenants.js'
import { EnviarEmailComConfiguracoes } from 'src/service/email.js'
import mixinAtualizarStatusTicket from 'src/pages/atendimento/mixinAtualizarStatusTicket.js'
import MensagemChatEspiarContato from 'src/pages/atendimento/MensagemChatEspiarContato.vue'
import whatsBackground from 'src/assets/wa-background.png'
import whatsBackgroundDark from 'src/assets/wa-background-dark.jpg'

export default {
  name: 'OpportunityCard',
  components: { MensagemChatEspiarContato },
  mixins: [mixinAtualizarStatusTicket],
  props: {
    oportunidade: { type: Object, required: true }
  },
  data() {
    return {
      showModalMensagem: false,
      whatsappId: null,
      numero: '',
      mensagem: '',
      usuarioDados: null,
      tenantDados: null,
      supervisorAdmin: null,
      usuario: null,
      modalEmail: false,
      emailAssunto: '',
      emailMensagem: '',
      loadingEmail: false,
      loadingMensagem: false,
      userProfile: null,
      isTicketModalOpen: false,
      currentTicket: {},
      whatsBackground: whatsBackground,
      whatsBackgroundDark: whatsBackgroundDark
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => ["whatsapp", "baileys", "meow", "evo", "waba", "zapi", "uazapi"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      if (!this.usuarioDados || !this.tenantDados || !this.cSessions) return [];

      const isAdminOrSuper = this.usuario.profile === 'admin' || 
        (this.usuario.profile === 'super' && this.tenantDados.supervisorAdmin === 'disabled');

      if (isAdminOrSuper) {
        return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type }));
      } else {
        return this.cSessions
          .filter(w => this.usuarioDados.whatsappAllowed.some(wa => wa.id === w.id))
          .map(w => ({ label: w.name, value: w.id, type: w.type }));
      }
    },
    cardStyle() {
      return {
        backgroundImage: this.$q.dark.isActive ? `url(${this.whatsBackgroundDark})` : `url(${this.whatsBackground})`
      };
    }
  },
  methods: {
    async listTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.tenantDados = data[0];
      this.supervisorAdmin = data[0].supervisorAdmin

    },
    async atualizarUsuario() {
      try {
        const { data } = await DadosUsuario(this.usuario.userId)
        localStorage.setItem('filtrosAtendimento', JSON.stringify(data.configs.filtrosAtendimento))
        this.usuarioDados = data;
        this.filasUser = data.queues
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('generalSupportScript.loadUserError'), error);
      }
    },
    closeModal() {
      this.showModalMensagem = false;
      this.resetFields();
    },
    resetFields() {
      this.numero = '';
      this.mensagem = '';
      this.whatsappId = null;
    },
    async enviarMensagem() {
      this.loadingMensagem = true;
      
      try {
        if (this.whatsappId && this.whatsappId.type === 'waba') {
          await this.enviarMensagemWaba();
        } else {
          await this.enviarMensagemNormal();
        }
      } catch (e) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: this.$t('generalSupportScript.messageSendError') + (e.data?.error || e.message),
        });
      } finally {
        this.loadingMensagem = false;
        this.closeModal();
      }
    },

    async enviarMensagemNormal() {
      const data = {
        whatsappId: this.whatsappId.value,
        whatsappType: this.whatsappId.type,
        number: this.numero,
        message: this.mensagem,
      };
      
      const response = await TextoIndividual(data);
      
      let message = this.$t('generalSupportScript.messageSent') + this.numero;
      
      if (response.data && response.data.ticketId) {
        message += `<br><strong>Ticket ID:</strong> ${response.data.ticketId}`;
        if (response.data.status) {
          message += ` | <strong>Status:</strong> ${response.data.status}`;
        }
        if (response.data.userId) {
          const userName = response.data.userName || response.data.userId;
          message += ` | <strong>Usuário:</strong> ${userName} (ID: ${response.data.userId})`;
        }
      }
      
      this.$q.notify({
        color: 'positive',
        position: 'top',
        html: true,
        message: message,
      });
    },

    async enviarMensagemWaba() {
      // Limpar mensagem para WABA
      this.mensagem = '';
      
      // Verificar se temos os dados necessários
      if (!this.usuario || !this.usuario.userId) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: this.$t('mainLayout.novo.userNotFound'),
        });
        return;
      }

      if (!this.whatsappId || !this.whatsappId.value) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: this.$t('mainLayout.novo.whatsappNotFound'),
        });
        return;
      }

      if (!this.numero) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: this.$t('mainLayout.novo.numberNotFound'),
        });
        return;
      }
      
      // 1. Verificar se contato existe
      let contato;
      const numeroLimpo = this.numero.replace(/\D/g, '');
      
      if (!numeroLimpo) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: this.$t('mainLayout.novo.numberInvalid'),
        });
        return;
      }
      
      try {
        const { data } = await ObterContatoPeloNumero(numeroLimpo);
        contato = data;
      } catch (error) {
        // Contato não existe, criar um novo
        const novoContato = {
          name: this.numero,
          number: this.numero,
        };
        const { data } = await CriarContato(novoContato);
        contato = data;
      }

      // 2. Verificar se já tem ticket aberto
      let ticketExistente;
      try {
        if (contato.id && this.whatsappId.value) {
          const response = await VerificarTicketsAbertos(contato.id, this.whatsappId.value);
          
          // Verificar se a resposta contém um ticket válido
          if (response.data && response.data.id && response.data.contactId && response.data.status) {
            ticketExistente = response.data;
          }
        }
      } catch (error) {
        
        // Se o erro for 409 (Conflict), significa que já existe um ticket
        if (error.status === 409 && error.data) {
          
          // Verificar se o ticket está na propriedade 'ticket' ou se precisa fazer parse do 'error'
          if (error.data.ticket) {
            ticketExistente = error.data.ticket;
          } else if (error.data.error) {
            const ticketAtual = JSON.parse(error.data.error);
            ticketExistente = ticketAtual;
          }
        } else {
          ticketExistente = null;
        }
      }

      if (ticketExistente && ticketExistente.id) {
        // Abrir ticket existente
        await this.$store.dispatch('AbrirChatMensagens', ticketExistente);
        this.$router.push({ name: 'chat', params: { ticketId: ticketExistente.id } });
        this.$q.notify({
          color: 'info',
          position: 'top',
          message: this.$t('mainLayout.novo.ticketCreated', { contatoName: contato.name, ticketId: ticketExistente.id }),
        });
      } else {
        // Criar novo ticket
        if (!contato.id || !this.whatsappId.value || !this.usuario.userId) {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: this.$t('mainLayout.novo.invalidData'),
          });
          return;
        }
        
        const ticketData = {
          contactId: contato.id,
          isActiveDemand: true,
          userId: this.usuario.userId,
          channel: this.whatsappId.type, // Usar o tipo do WhatsApp selecionado (waba)
          channelId: this.whatsappId.value,
          status: 'open'
        };
        
        const { data: ticket } = await CriarTicket(ticketData);
        
        if (ticket && ticket.id) {
          await this.$store.dispatch('AbrirChatMensagens', ticket);
          this.$router.push({ name: 'chat', params: { ticketId: ticket.id } });
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: this.$t('mainLayout.novo.ticketCreated', { contatoName: contato.name, ticketId: ticket.id }),
          });
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: this.$t('mainLayout.novo.ticketCreatedError'),
          });
        }
      }
    },
    traduzirStatus(status) {
      if (status === 'open') return this.$t('funil.aberto')
      if (status === 'win') return this.$t('funil.ganho')
      if (status === 'lose') return this.$t('funil.perdido')
      return status
    },
    corStatus(status) {
      if (status === 'open') return 'warning'
      if (status === 'win') return 'positive'
      if (status === 'lose') return 'negative'
      return 'grey'
    },
    formatarDataUTC(data) {
      if (!data) return '';
      const d = new Date(data);
      const dia = String(d.getUTCDate()).padStart(2, '0');
      const mes = String(d.getUTCMonth() + 1).padStart(2, '0');
      const ano = d.getUTCFullYear();
      return `${dia}/${mes}/${ano}`;
    },
    formatarData(data) {
      if (!data) return ''
      const d = new Date(data)
      return d.toLocaleDateString('pt-BR')
    },
    formatarValor(valor) {
      if (!valor) return 'R$ 0,00'
      return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`
    },
    isDataUrgente(data) {
      if (!data) return false
      const dataFechamento = new Date(data)
      const hoje = new Date()
      const diferencaDias = Math.ceil((dataFechamento - hoje) / (1000 * 60 * 60 * 24))
      return diferencaDias <= 7 && diferencaDias >= 0 // Considera urgente se faltar 7 dias ou menos
    },
    abrirModalMensagem() {
      this.showModalMensagem = true;
      if (this.oportunidade.contact && this.oportunidade.contact.number) {
        this.numero = this.oportunidade.contact.number;
      }
    },
    abrirModalEmail() {
      if (!this.oportunidade.contact || !this.oportunidade.contact.email) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.semEmailContato'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        return
      }
      this.modalEmail = true
      this.emailAssunto = ''
      this.emailMensagem = ''
    },
    async enviarEmail() {
      if (!this.emailAssunto || !this.emailMensagem) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.camposObrigatorios'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        return
      }

      if (!this.oportunidade.contact || !this.oportunidade.contact.email) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.semEmailContato'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        return
      }

      this.loadingEmail = true
      try {
        const dadosEmail = {
          to: this.oportunidade.contact.email,
          subject: this.emailAssunto,
          text: this.emailMensagem
        }

        const response = await EnviarEmailComConfiguracoes(dadosEmail)

        if (!response.data || response.data.success !== true) {
          throw {
            response: {
              data: response.data || {
                error: this.$t('funil.emailError'),
                details: this.$t('funil.emailErrorDetails')
              }
            }
          }
        }

        this.$q.notify({
          type: 'positive',
          message: response.data.message,
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        this.modalEmail = false
      } catch (error) {
        console.error('Erro ao enviar email:', error)
        let mensagemErro = this.$t('funil.erroEnvioEmail')
        let detalhes = ''
        
        if (error.response?.data) {
          const data = error.response.data
          mensagemErro = data.error || mensagemErro
          
          if (data.details) {
            if (typeof data.details === 'object') {
              if (data.details.suggestion) {
                detalhes = data.details.suggestion
              } else {
                detalhes = Object.entries(data.details)
                  .filter(([key]) => key !== 'smtp')
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')
              }
            } else {
              detalhes = data.details
            }
          }
        }
        
        this.$q.notify({
          type: 'negative',
          message: detalhes ? `${mensagemErro} - ${detalhes}` : mensagemErro,
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
          timeout: 5000
        })
      } finally {
        this.loadingEmail = false
      }
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
  async mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    this.usuario = usuario
    this.userProfile = localStorage.getItem('profile') || 'user'
    await this.listTenantPorId();
    await this.atualizarUsuario();
  }
}
</script>

<style lang="scss" scoped>
.blur-effect {
  filter: blur(0px)
}

.opportunity-card {

  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    min-height: 32px;
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    flex-shrink: 1;
    justify-content: flex-end;
  }

  &__stage {
    font-size: 0.85rem;
    color: #fff;
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    line-height: 1.4;
    letter-spacing: 0.3px;
  }

  &__valor {
    color: #00a300;
    font-weight: 700;
    font-size: 1.2rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__contact-info {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  &__contact-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;

    .q-icon {
      color: #00a300;
      opacity: 0.8;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #888;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;

    .q-icon {
      color: #00a300;
      opacity: 0.6;
    }

    &--urgent {
      color: #e74c3c;
      font-weight: 600;

      .q-icon {
        color: #e74c3c;
        opacity: 0.8;
      }
    }
  }

  .q-btn {
    opacity: 0.7;
    transition: all 0.3s ease;
    min-width: 32px;
    width: 32px;
    height: 32px;
    padding: 0;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @media (max-width: 600px) {
    &__header {
      flex-direction: column;
      align-items: flex-start;
    }

    &__header-actions {
      width: 100%;
      justify-content: flex-start;
    }
  }
}
</style> 
