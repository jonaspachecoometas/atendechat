<template>
  <q-dialog v-model="show" @hide="onHide" persistent>
    <q-card class="opportunity-form__modal">
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>
      <q-card-section>
        <div class="text-h6 text-primary">
          {{ oportunidade && oportunidade.id ? $t('funil.editarOportunidade') : $t('funil.criarOportunidade') }}
          <q-btn round
            class="q-ml-md"
            color="negative"
            icon="mdi-close"
            @click="show = false" />
        </div>
      </q-card-section>
      <q-card-section>
        <form @submit.prevent="salvar">
          <div class="form-group">
            <label>{{ $t('funil.nome') }}</label>
            <q-input v-model="form.name" :label="$t('funil.nome')" outlined dense required />
          </div>
          <div class="form-group">
            <label>{{ $t('funil.funil') }}</label>
            <q-select
              v-model="form.pipelineId"
              :options="pipelinesCombinados.map(pipeline => ({
                label: pipeline.name,
                value: pipeline.id
              }))"
              :label="$t('funil.funil')"
              emit-value
              map-options
              required
              clearable
              @update:model-value="onPipelineChange"
            />
          </div>
          <div class="form-group">
            <label>{{ $t('funil.etapa') }}</label>
              <q-select
                v-model="form.stageId"
                :options="etapasFiltradas.map(stage => ({
                label: stage.name,
                  value: stage.id
                }))"
                :label="$t('funil.etapa')"
                :disable="!form.pipelineId"
                emit-value
                map-options
                required
                clearable
              />
          </div>
          <div class="form-group">
            <label>{{ $t('funil.responsavel') }}</label>
            <q-select v-model="form.responsibleId" :options="responsaveisCombinados" :label="$t('funil.responsavel')" clearable emit-value map-options />
          </div>
          <div class="form-group">
            <label>{{ $t('funil.contato') }}</label>
            <q-select
              v-model="contatoSelecionado"
              :options="contatosCombinados"
              :loading="loading"
              :disable="!!oportunidade?.id"
              :class="{ 'disabled-input': !!oportunidade?.id }"
              input-debounce="700"
              @filter="localizarContato"
              @update:model-value="onContatoSelecionado"
              use-input
              hide-selected
              fill-input
              clearable
              option-label="name"
              option-value="id"
              :label="$t('common.search')"
              :hint="$t('atendimentoChat.forwardHint')"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" v-if="scope.opt.name">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.number }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="form-group">
            <label>{{ $t('funil.previsaoFechamento') }}</label>
            <q-input
              :model-value="form.closingForecastBR"
              readonly
              outlined
              dense
              :rules="cDateRules"
              :hint="$t('funil.selecioneData')"
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.closingForecastBR" mask="DD/MM/YYYY" @update:model-value="onClosingChange" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="form-group">
            <label>{{ $t('funil.valor') }}</label>
            <q-input v-model.number="form.value" type="number" min="0" step="0.01" :label="$t('funil.valor')" outlined dense />
          </div>
          <div class="form-group">
            <label>{{ $t('funil.descricao') }}</label>
            <q-input v-model="form.description" type="textarea" :label="$t('funil.descricao')" outlined dense autogrow />
          </div>
          <div class="form-group">
            <label>{{ $t('funil.status') }}</label>
            <q-select v-model="form.status" :options="statusOptions" :label="$t('funil.status')" emit-value map-options clearable />
          </div>
          <div class="opportunity-form__actions">
            <q-btn flat :label="$t('funil.cancelar')" color="negative" @click="show = false" />
            <q-btn flat :label="$t('funil.salvar')" color="primary" type="submit" />
            <q-btn 
              v-if="hasActiveCalendarConfigs" 
              flat 
              :label="$t('funil.createGoogleCalendarEvent')" 
              color="positive" 
              icon="mdi-calendar-plus"
              @click="openCalendarModal"
              class="calendar-btn"
            >
              <q-tooltip>
                {{ $t('funil.createGoogleCalendarEvent') }}
              </q-tooltip>
              <q-badge 
                v-if="calendarConfigs.length > 1" 
                color="secondary" 
                floating 
                rounded
              >
                {{ calendarConfigs.filter(c => c.isActive && c.googleAccessToken && c.googleRefreshToken).length }}
              </q-badge>
            </q-btn>
          </div>
        </form>
      </q-card-section>
    </q-card>

    <!-- Modal do Google Calendar -->
    <q-dialog v-model="showCalendarModal" persistent>
      <q-card style="min-width: 800px; max-width: 1000px;" class="modal-card">
        <q-card-section class="modal-header">
          <div class="text-h6">{{ $t('funil.createGoogleCalendarEvent') }}</div>
        </q-card-section>
        <q-card-section class="modal-body">
          <q-form @submit="createCalendarEvent" class="modal-form">
            <div class="form-row">
              <div class="form-field">
                <q-select
                  v-model="selectedCalendarConfig"
                  :options="calendarConfigOptions"
                  :label="$t('funil.selectCalendar')"
                  outlined
                  dense
                  emit-value
                  map-options
                  :rules="[val => !!val || 'Selecione uma agenda']"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        {{ $t('funil.noConfig') }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="calendarEvent.summary"
                  :label="$t('funil.eventTitle')"
                  outlined
                  dense
                  :rules="[val => !!val || $t('funil.eventTitleRequired')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="calendarEvent.startDateTime"
                  :label="$t('funil.eventStartDate')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('funil.eventStartDateRequired')]"
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="calendarEvent.endDateTime"
                  :label="$t('funil.eventEndDate')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('funil.eventEndDateRequired')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="calendarEvent.description"
                  :label="$t('funil.eventDescription')"
                  outlined
                  dense
                  type="textarea"
                  rows="3"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="calendarEvent.location"
                  :label="$t('funil.eventLocation')"
                  outlined
                  dense
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="calendarEvent.attendees"
                  :label="$t('funil.eventAttendees')"
                  outlined
                  dense
                  :hint="$t('funil.eventAttendeesHint')"
                />
              </div>
            </div>
            <div class="form-row form-actions">
              <div class="form-field">
                <q-btn
                  type="submit"
                  color="positive"
                  :label="$t('funil.createEvent')"
                  :loading="creatingCalendarEvent"
                />
                <q-btn
                  flat
                  :label="$t('funil.cancelUpdateEvent')"
                  @click="closeCalendarModal"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
import { CriarOpportunity, AlterarOpportunity } from 'src/service/oportunidade.js'
import { ListarPipelines } from 'src/service/funil.js'
import { ListarStages } from 'src/service/estagio.js'
import { ListarUsuarios } from 'src/service/user.js'
import { ListarContatos, ObterContato } from 'src/service/contatos.js'
import { ListarConfiguracoesGoogleCalendar, CriarEventoGoogleCalendar } from 'src/service/googleCalendar.js'

export default {
  name: 'OpportunityForm',
  props: {
    oportunidade: Object,
    pipelines: {
      type: Array,
      default: () => []
    },
    stages: {
      type: Array,
      default: () => []
    },
    responsaveis: {
      type: Array,
      default: () => []
    },
    contatos: {
      type: Array,
      default: () => []
    },
    ticketFocado: Object
  },
  data() {
    return {
      show: true,
      form: {
        name: '',
        pipelineId: '',
        stageId: '',
        responsibleId: '',
        contactId: '',
        closingForecast: '',
        closingForecastBR: '',
        value: 0,
        description: '',
        status: 'open'
      },
      statusOptions: [
        { label: this.$t('funil.aberto'), value: 'open' },
        { label: this.$t('funil.ganho'), value: 'win' },
        { label: this.$t('funil.perdido'), value: 'lose' }
      ],
      pipelinesLocal: [],
      stagesLocal: [],
      responsaveisLocal: [],
      loading: false,
      contatoSelecionado: null,
      contatosLocal: [],
      showCalendarModal: false,
      calendarConfigs: [],
      selectedCalendarConfig: null,
      calendarEvent: {
        summary: '',
        startDateTime: '',
        endDateTime: '',
        description: '',
        location: '',
        attendees: ''
      },
      creatingCalendarEvent: false
    }
  },
  computed: {
    cDateRules() {
      return [
        val => !!val || this.$t('funil.dataObrigatoria'),
        val => {
          if (!val) return this.$t('funil.dataObrigatoria')
          // Normaliza para comparar apenas a data (sem hora)
          const parseLocal = (v) => {
            if (typeof v === 'string') {
              // Formato BR: DD/MM/YYYY
              if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
                const [d, m, y] = v.split('/').map(n => parseInt(n, 10))
                const dt = new Date(y, m - 1, d)
                dt.setHours(0, 0, 0, 0)
                return dt
              }
              // Formato ISO curto: YYYY-MM-DD
              if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
                const [y, m, d] = v.split('-').map(n => parseInt(n, 10))
                const dt = new Date(y, m - 1, d)
                dt.setHours(0, 0, 0, 0)
                return dt
              }
            }
            const dt = new Date(v)
            if (isNaN(dt.getTime())) return null
            dt.setHours(0, 0, 0, 0)
            return dt
          }
          const selectedDate = parseLocal(val)
          if (!selectedDate) return this.$t('funil.dataFutura')
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return selectedDate >= today || this.$t('funil.dataFutura')
        }
      ]
    },
    pipelinesCombinados() {
      return this.pipelines.length ? this.pipelines : this.pipelinesLocal
    },
    stagesCombinados() {
      return this.stages.length ? this.stages : this.stagesLocal
    },
    responsaveisCombinados() {
      return this.responsaveis.length ? this.responsaveis : this.responsaveisLocal
    },
    contatosCombinados() {
      return this.contatos.length ? this.contatos : this.contatosLocal
    },
    calendarConfigOptions() {
      return this.calendarConfigs.map(config => ({
        label: config.name,
        value: config.id
      }));
    },
    hasActiveCalendarConfigs() {
      return this.calendarConfigs.some(config => 
        config.isActive && config.googleAccessToken && config.googleRefreshToken
      )
    },
    etapasFiltradas() {
      if (!this.form.pipelineId) {
        return []
      }
      return this.stagesCombinados.filter(stage => stage.pipelineId === this.form.pipelineId)
    }
  },
  watch: {
    ticketFocado: {
      immediate: true,
      async handler(val) {
        if (val?.contact?.id) {
          this.form.contactId = val.contact.id;
          if (val.contact.name) {
            this.contatoSelecionado = {
              id: val.contact.id,
              name: val.contact.name,
              number: val.contact.number
            };
            this.contatosLocal = [this.contatoSelecionado];
          } else {
            await this.carregarDadosContato(val.contact.id);
          }
        } else if (val?.contact?.name) {
          this.contatoSelecionado = {
            id: val.contact.id,
            name: val.contact.name,
            number: val.contact.number
          };
          this.contatosLocal = [this.contatoSelecionado];
        }
      }
    },
    oportunidade: {
      immediate: true,
      async handler(val) {
        if (val) {
          let closingForecast = val.closingForecast
          if (closingForecast) {
            closingForecast = String(closingForecast).split('T')[0]
          }
          const closingForecastBR = closingForecast ? this.convertISOToBR(closingForecast) : ''
          this.form = { 
            ...val, 
            closingForecast,
            closingForecastBR
          }
          
          if (val.contactId) {
            await this.carregarDadosContato(val.contactId);
          }
        } else {
          this.form = {
            name: '',
            pipelineId: '',
            stageId: '',
            responsibleId: '',
            contactId: this.ticketFocado?.contact?.id || '',
            closingForecast: '',
            closingForecastBR: '',
            value: 0,
            description: '',
            status: 'open'
          }
        }
      }
    }
  },
  methods: {
    onHide () {
      this.$emit('close')
    },
    convertBRToISO (br) {
      if (!br) return ''
      const [d, m, y] = String(br).split('/')
      if (d && m && y) return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
      return ''
    },
    convertISOToBR (iso) {
      if (!iso) return ''
      const [y, m, d] = String(iso).split('-')
      if (y && m && d) return `${d}/${m}/${y}`
      try {
        const dt = new Date(iso)
        const dd = String(dt.getDate()).padStart(2, '0')
        const mm = String(dt.getMonth() + 1).padStart(2, '0')
        const yy = String(dt.getFullYear())
        return `${dd}/${mm}/${yy}`
      } catch (_) { return '' }
    },
    onClosingChange () {
      this.form.closingForecast = this.convertBRToISO(this.form.closingForecastBR)
    },
    async carregarDados() {
      if (this.pipelines.length && this.stages.length && this.responsaveis.length) {
        return;
      }

      this.loading = true;
      try {
        const [resStages, resPipes, resUsers] = await Promise.all([
          ListarStages(),
          ListarPipelines(),
          ListarUsuarios()
        ]);

        this.stagesLocal = resStages.data.data || [];
        this.pipelinesLocal = resPipes.data.data || [];
        this.responsaveisLocal = (resUsers.data.users || [])
          .filter(user => user.profile !== 'superadmin')
          .map(user => ({
            label: user.name,
            value: user.id
          }));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.loadError')
        });
      } finally {
        this.loading = false;
      }
    },
    pipelineNome(pipelineId) {
      const pipeline = this.pipelinesCombinados.find(p => p.id === pipelineId)
      return pipeline ? pipeline.name : ''
    },
    onPipelineChange() {
      // Limpar etapa quando o funil mudar
      this.form.stageId = ''
    },
    async salvar() {
      // const stage = this.stagesCombinados.find(s => s.id === this.form.stageId)
      // const pipelineId = stage ? stage.pipelineId : null

      const isoShort = this.form.closingForecastBR ? this.convertBRToISO(this.form.closingForecastBR) : ''
      const payload = {
        ...this.form,
        // pipelineId,
        closingForecast: isoShort ? new Date(isoShort).toISOString() : null
      }

      try {
        if (this.form.id) {
          await AlterarOpportunity(payload)
          this.$q.notify({
            type: 'positive',
            message: this.$t('funil.oportunidadeAtualizada')
          })
          this.$emit('saved')
          this.show = false
        } else {
          await CriarOpportunity(payload)
          this.$q.notify({
            type: 'positive',
            message: this.$t('funil.oportunidadeCriada')
          })
          
          // Verificar se há configurações ativas do Google Calendar
          const configsAtivas = this.calendarConfigs.filter(config => 
            config.isActive && config.googleAccessToken && config.googleRefreshToken
          )
          
          if (configsAtivas.length > 0) {
            // Perguntar se quer criar evento no Google Calendar
            this.$q.dialog({
              title: 'Criar Evento no Google Calendar?',
              message: 'Deseja criar um evento no Google Calendar para esta oportunidade?',
              cancel: true,
              persistent: true,
              ok: {
                label: 'Sim, criar evento',
                color: 'positive'
              },
              cancel: {
                label: 'Não, apenas salvar',
                color: 'grey'
              }
            }).onOk(() => {
              // Preparar dados do evento baseado na oportunidade
              this.calendarEvent = {
                summary: this.form.name,
                startDateTime: this.form.closingForecast ? new Date(this.form.closingForecast).toISOString().slice(0, 16) : '',
                endDateTime: this.form.closingForecast ? new Date(new Date(this.form.closingForecast).getTime() + 60 * 60 * 1000).toISOString().slice(0, 16) : '', // 1 hora depois
                description: this.form.description || `Oportunidade: ${this.form.name}`,
                location: '',
                attendees: this.contatoSelecionado?.email || ''
              }
              
              // Selecionar primeira configuração ativa
              this.selectedCalendarConfig = configsAtivas[0].id
              
              // Abrir modal do Google Calendar
              this.showCalendarModal = true
              
              // Não fechar o modal da oportunidade ainda
              return
            }).onCancel(() => {
              // Se não quiser criar evento, fechar normalmente
              this.$emit('saved')
              this.show = false
            })
          } else {
            // Se não há configurações ativas, fechar normalmente
            this.$emit('saved')
            this.show = false
          }
        }
      } catch (error) {
        console.error('Erro ao salvar oportunidade:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.erroSalvar')
        })
      }
    },
    async localizarContato(search, update, abort) {
      if (search.length < 2) {
        if (this.contatosLocal.length) {
          update(() => {
            this.contatosLocal = [...this.contatosLocal]
          })
        }
        abort()
        return
      }

      this.loading = true
      try {
        const { data } = await ListarContatos({
          searchParam: search,
        })

        update(() => {
          if (data.contacts.length) {
            this.contatosLocal = data.contacts
          } else {
            this.contatosLocal = []
          }
        })
      } catch (error) {
        console.error('Erro ao buscar contatos:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.contactError')
        })
      } finally {
        this.loading = false
      }
    },
    onContatoSelecionado(contato) {
      if (contato) {
        this.form.contactId = contato.id
      } else {
        this.form.contactId = ''
      }
    },
    async carregarDadosContato(contactId) {
      try {
        const { data } = await ObterContato(contactId);
        if (data) {
          this.contatoSelecionado = data;
          this.contatosLocal = [data];
        }
      } catch (error) {
        console.error('Erro ao carregar dados do contato:', error);
      }
    },
    async carregarConfiguracoesGoogleCalendar() {
      try {
        const response = await ListarConfiguracoesGoogleCalendar();
        this.calendarConfigs = response.data.configs || [];
      } catch (error) {
        console.error('Erro ao carregar configurações do Google Calendar:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.calendarConfigError')
        });
      }
    },
    async createCalendarEvent() {
      if (!this.selectedCalendarConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.selectCalendarConfig')
        })
        return
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.calendarConfigs.find(c => c.id === this.selectedCalendarConfig)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.configNotFound')
        })
        return
      }

      this.creatingCalendarEvent = true;
      try {
        const attendees = this.calendarEvent.attendees
          ? this.calendarEvent.attendees.split(',').map(email => email.trim())
          : []
        
        const response = await CriarEventoGoogleCalendar({
          summary: this.calendarEvent.summary,
          description: this.calendarEvent.description,
          startDateTime: this.calendarEvent.startDateTime,
          endDateTime: this.calendarEvent.endDateTime,
          location: this.calendarEvent.location,
          attendees,
          googleAccessToken: selectedConfig.googleAccessToken,
          googleRefreshToken: selectedConfig.googleRefreshToken,
          googleClientId: selectedConfig.googleClientId,
          googleClientSecret: selectedConfig.googleClientSecret
        })
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('funil.eventCreatedSuccess')
        })
        this.closeCalendarModal();
        // Fechar também o modal da oportunidade
        this.$emit('saved')
        this.show = false
      } catch (error) {
        console.error('Erro ao criar evento no Google Calendar:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.eventError') + ' ' + (error.response?.data?.error || error.message)
        })
      } finally {
        this.creatingCalendarEvent = false;
      }
    },
    openCalendarModal() {
      // Preparar dados do evento baseado na oportunidade
      this.calendarEvent = {
        summary: this.form.name || 'Nova Oportunidade',
        startDateTime: this.form.closingForecast ? new Date(this.form.closingForecast).toISOString().slice(0, 16) : '',
        endDateTime: this.form.closingForecast ? new Date(new Date(this.form.closingForecast).getTime() + 60 * 60 * 1000).toISOString().slice(0, 16) : '', // 1 hora depois
        description: this.form.description || `Oportunidade: ${this.form.name || 'Nova Oportunidade'}`,
        location: '',
        attendees: this.contatoSelecionado?.email || ''
      }
      
      // Selecionar primeira configuração ativa
      const configsAtivas = this.calendarConfigs.filter(config => 
        config.isActive && config.googleAccessToken && config.googleRefreshToken
      )
      if (configsAtivas.length > 0) {
        this.selectedCalendarConfig = configsAtivas[0].id
      }
      
      this.showCalendarModal = true;
    },
    closeCalendarModal() {
      this.showCalendarModal = false;
      this.calendarEvent = {
        summary: '',
        startDateTime: '',
        endDateTime: '',
        description: '',
        location: '',
        attendees: ''
      };
      this.selectedCalendarConfig = null;
    }
  },
  async mounted() {
    await this.carregarDados()
    await this.carregarConfiguracoesGoogleCalendar()
  }
}
</script>

<style lang="scss" scoped>
.opportunity-form__modal {
  min-width: 400px;
  max-width: 95vw;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.3s ease;
}

.text-h6.text-primary {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 24px;
  letter-spacing: 0.3px;
}

.form-group {
  margin-bottom: 20px;

  label {
    font-weight: 500;
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-size: 0.95rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(0, 163, 0, 0.2);
    }

    &:focus {
      outline: none;
      border-color: #00a300;
      box-shadow: 0 0 0 3px rgba(0, 163, 0, 0.1);
      background: #fff;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
}

.opportunity-form__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  .q-btn {
    min-width: 140px;
    height: 44px;
    border-radius: 8px;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0.3px;
    flex-shrink: 0;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &.calendar-btn {
      min-width: 220px;
      padding: 0 20px;
      
      .q-btn__content {
        gap: 8px;
      }
    }
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

body.body--dark .opportunity-form__modal {
  background: rgba(30, 30, 30, 0.98);
  border: 1px solid rgba(255,255,255,0.08);
  color: #fff;
}

body.body--dark .text-h6.text-primary {
  color: #fff;
}

body.body--dark .form-group label {
  color: #eee;
}

body.body--dark .form-group input,
body.body--dark .form-group select,
body.body--dark .form-group textarea {
  background: rgba(40, 40, 40, 0.85);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.08);
}

body.body--dark .form-group input:focus,
body.body--dark .form-group select:focus,
body.body--dark .form-group textarea:focus {
  border-color: var(--q-primary, #00a300);
  background: #222;
}

body.body--dark .form-group input::placeholder,
body.body--dark .form-group textarea::placeholder {
  color: #bbb;
}

body.body--dark .opportunity-form__modal .q-input .q-field__control,
body.body--dark .opportunity-form__modal .q-select .q-field__control {
  background: rgba(255, 255, 255, 0.05);
}

body.body--dark .opportunity-form__modal .q-input .q-field__control:hover,
body.body--dark .opportunity-form__modal .q-select .q-field__control:hover {
  background: rgba(255, 255, 255, 0.1);
}

body.body--dark .opportunity-form__modal .q-input.q-field--focused .q-field__control,
body.body--dark .opportunity-form__modal .q-select.q-field--focused .q-field__control {
  background: rgba(255, 255, 255, 0.15);
}

body.body--dark :deep(.q-menu__content),
body.body--dark :deep(.q-select__dropdown-content),
body.body--dark :deep(.q-virtual-scroll__content),
body.body--dark :deep(.q-item) {
  background: #222 !important;
  color: #fff !important;
}

body.body--dark :deep(.q-item--active),
body.body--dark :deep(.q-item--highlighted) {
  background: #fff !important;
  color: #222 !important;
}

@media (max-width: 600px) {
  .opportunity-form__modal {
    min-width: 90vw;
    padding: 0.5rem;
    border-radius: 12px;
  }
  
  .q-card-section {
    padding: 0.7rem !important;
  }
  
  .opportunity-form__actions {
    flex-direction: column;
    gap: 12px;
    
    .q-btn {
      min-width: 100%;
      width: 100%;
      max-width: 300px;
      
      &.calendar-btn {
        min-width: 100%;
        width: 100%;
        max-width: 300px;
      }
    }
  }
}

.disabled-input {
  opacity: 0.7;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.05) !important;
}

body.body--dark .disabled-input {
  background: rgba(255, 255, 255, 0.05) !important;
}

.q-select.disabled-input :deep(.q-field__control) {
  background: rgba(0, 0, 0, 0.05) !important;
  cursor: not-allowed;
}

body.body--dark .q-select.disabled-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05) !important;
}

body.body--dark .opportunity-form__actions {
  border-top-color: rgba(255, 255, 255, 0.1);
  
  .q-btn {
    &:hover {
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
    }
  }
}

/* Estilos do Modal do Google Calendar */
.modal-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

.modal-header {
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .text-h6 {
    color: var(--q-primary);
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0;
  }
}

.modal-body {
  padding: 1.5rem 2rem 2rem 2rem;
}

.modal-form {
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    .form-field {
      flex: 1;
      min-width: 0;
    }
  }

  .form-actions {
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .form-field {
      flex: none;
    }
  }
}

/* Modo Escuro para o Modal */
body.body--dark {
  .modal-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .modal-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .modal-form {
    .form-actions {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
