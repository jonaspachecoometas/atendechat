<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <q-card
      bordered
      flat
      class="q-ma-sm"
      style="border-bottom: 4px solid black"
    >
      <q-card-section>
        <div class="row text-h6">
          {{ $t("contatosCampanha.campaign") }}: {{ campanha?.name }}
        </div>
        <div class="row text-caption">
          {{ $t("contatosCampanha.start") }}: {{ campanha?.start ? formatDate(campanha.start) : 'N/A' }} - {{ $t("contatosCampanha.status") }}: {{ campanha?.status || 'N/A' }}
        </div>
        <q-btn
          class="absolute-top-right q-ma-md"
          icon="mdi-arrow-left"
          text-color="primary"
          :label="$t('contatosCampanha.backToCampaigns')"
          @click="$router.push({ name: 'campanhas' })"
        />
      </q-card-section>
    </q-card>
    <q-table
      class="my-sticky-dynamic q-ma-sm"
      :title="$t('contatosCampanha.contactsTitle')"
      id="tabela-contatos-campanha"
      :rows="contatosCampanha"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      separator="cell"
    >
      <template v-slot:top>
        <div class="row col-4 q-table__title items-center ">
          {{ $t('contatosCampanha.contacts') }}
          <q-btn
            class="q-ml-md"
            color="primary"
            icon="refresh"
            outline
            @click="listarContatosCampanha"
          >
            <q-tooltip>
              {{ $t('contatosCampanha.refreshTooltip') }}
            </q-tooltip>
          </q-btn>
        </div>
        <q-space />
        <q-btn
          class="q-ml-md"
          color="negative"
          icon="close"
          outline
          :label="$t('contatosCampanha.clearCampaign')"
          @click="deletarTodosContatosCampanha"
          v-if="campanha?.status === 'pending' ||
            campanha?.status === 'canceled'"
        />
        <q-btn
          class="q-ml-md"
          color="primary"
          :label="$t('contatosCampanha.addContacts')"
          icon="add"
          v-if="campanha?.status === 'pending' ||
            campanha?.status === 'canceled' ||
            !campanha?.status"
          @click="modalAddContatosCampanha = !modalAddContatosCampanha"
        />
      </template>
      <template v-slot:body-cell-profilePicUrl="props">
        <q-td>
          <q-avatar style="border: 1px solid #9e9e9ea1 !important">
            <q-icon
              name="mdi-account"
              size="1.5em"
              color="grey-5"
              v-if="!props.value"
            />
            <q-img
              :src="props.value"
              style="max-width: 150px"
            >
              <template v-slot:error>
                <q-icon
                  name="mdi-account"
                  size="1.5em"
                  color="grey-5"
                />
              </template>
            </q-img>
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            v-if="campanha?.status === 'pending'"
            flat
            round
            icon="mdi-delete"
            @click="deletarContatoCampanha(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:pagination="{ pagination }">
        {{ contatosCampanha.length }}/{{ pagination.rowsNumber }}
      </template>
    </q-table>

    <q-dialog
      persistent
      v-model="modalAddContatosCampanha"
    >
      <q-card style="min-width: 80vw; width: 80vw">
        <q-card-section class="q-pt-none q-pt-md">
          <fieldset>
            <legend class="q-px-sm">{{ $t("contatosCampanha.filters") }}</legend>
            <div class="row q-gutter-md items-end">
              <div class="col-grow">
                <label>{{ $t("contatosCampanha.start") }}</label>
                <DatePick
                  dense
                  v-model="pesquisa.startDate"
                />
              </div>
              <div class="col-grow">
                <label>{{ $t("contatosCampanha.end") }}</label>
                <DatePick
                  dense
                  v-model="pesquisa.endDate"
                />
              </div>
              <div class="col-xs-12 col-sm-4 grow text-center">
                <q-select
                  dense
                  outlined
                  v-model="pesquisa.ddds"
                  multiple
                  :label="$t('contatosCampanha.states')"
                  :options="estadosBR"
                  option-value="sigla"
                  option-label="nome"
                  emit-value
                  map-options
                  use-chips
                  dropdown-icon="add"
                  @update:model-value="onChangeStates"
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                      v-bind="itemProps"
                      v-on="itemEvents || {}"
                    >
                      <q-item-section>
                        <q-item-label v-html="opt.nome"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          :model-value="selected"
                          @update:model-value="() => toggleOption(opt)"
                        />
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected-item="{ opt }">
                    <q-badge
                      dense
                      color="grey-3"
                      text-color="primary"
                      class="q-ma-xs text-body1"
                      :label="opt.nome"
                    >
                    </q-badge>
                  </template>
                </q-select>
              </div>
              <div class="col-xs-12 col-sm-4 grow text-center">
                <q-select
                  outlined
                  dense
                  v-model="pesquisa.tags"
                  multiple
                  :label="$t('contatosCampanha.labels')"
                  :options="etiquetas"
                  option-value="id"
                  option-label="tag"
                  emit-value
                  map-options
                  use-chips
                  dropdown-icon="add"
                  @update:model-value="onChangeTags"
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                      v-bind="itemProps"
                      v-on="itemEvents || {}"
                    >
                      <q-item-section>
                        <q-item-label v-html="opt.tag"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          :model-value="selected"
                          @update:model-value="toggleOption(opt)"
                        />
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected-item="{ opt }">
                    <q-chip
                      dense
                      color="white"
                      text-color="primary"
                      class="q-ma-xs text-body1"
                    >
                      <q-icon
                        :style="`color: ${opt.color}`"
                        name="mdi-pound-box-outline"
                        size="28px"
                        class="q-mr-sm"
                      />
                      {{ opt.tag }}
                    </q-chip>
                  </template>
                </q-select>
              </div>
              <div class="col-xs-12 col-sm-4 grow text-center">
                <q-select
                  outlined
                  dense
                  v-model="pesquisa.wallets"
                  multiple
                  :label="$t('contatosCampanha.wallet')"
                  :options="usuarios"
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                  use-chips
                  dropdown-icon="add"
                  @update:model-value="onChangeWallets"
                >
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item
                      v-bind="itemProps"
                      v-on="itemEvents || {}"
                    >
                      <q-item-section>
                        <q-item-label v-html="opt.name"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          :model-value="selected"
                          @update:model-value="toggleOption(opt)"
                        />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-xs-12 col-sm-4 grow text-center">
                <q-input
                  style="width: 300px"
                  outlined
                  dense
                  v-model="pesquisa.searchParam"
                  clearable
                  :placeholder="$t('contatosCampanha.filterNamePhone')"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-grow text-right">
                <q-btn
                  class="q-mr-sm"
                  color="primary"
                  :label="$t('contatosCampanha.newContact')"
                  icon="refresh"
                  @click="listarAddContatos"
                />
              </div>
            </div>
          </fieldset>
        </q-card-section>
        <q-card-section>
          <q-table
            class="my-sticky-dynamic q-ma-sm blur-effect"
            style="height: 50vh"
            :title="$t('contatosCampanha.contactsTitle')"
            id="tabela-contatos-campanha"
            :rows="contatosAdd"
            :columns="columnsAdd"
            :loading="loading"
            row-key="number"
            selection="multiple"
            v-model:selected="selected"
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            separator="cell"
          >
            <template v-slot:top>
              <div class="row col-4 q-table__title items-center ">
                {{ $t('contatosCampanha.selectContactsTitle') }}
              </div>
              <q-space />
              <q-btn
                class="q-ml-md"
                color="negative"
                :label="$t('common.cancel')"
                @click="modalAddContatosCampanha = false"
              />
              <q-btn
                class="q-ml-md"
                color="primary"
                icon="save"
                :label="$t('common.add')"
                @click="addContatosCampanha"
              />
            </template>
            <template v-slot:body-cell-profilePicUrl="props">
              <q-td>
                <q-avatar style="border: 1px solid #9e9e9ea1 !important">
                  <q-icon
                    name="mdi-account"
                    size="1.5em"
                    color="grey-5"
                    v-if="!props.value"
                  />
                  <q-img
                    :src="props.value"
                    style="max-width: 150px"
                  >
                    <template v-slot:error>
                      <q-icon
                        name="mdi-account"
                        size="1.5em"
                        color="grey-5"
                      />
                    </template>
                  </q-img>
                </q-avatar>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { estadoPorDdd, estadosBR } from 'src/utils/constants.js'
import { RelatorioContatos, RelatorioContatosCampanha } from 'src/service/estatisticas.js'
import { AdicionarContatosCampanha, DeletarTodosContatosCampanha, ListarContatosCampanha, DeletarContatoCampanha } from 'src/service/campanhas.js'
import { format, parseISO, sub } from 'date-fns'
import { ListarUsuarios } from 'src/service/user.js'

export default {
  name: 'ContatosCampanha',
  data () {
    return {
      _campanhaHeader: null,
      pageAllowed: true,
      userProfile: 'user',
      modalAddContatosCampanha: false,
      campanhaData: null,
      etiquetas: [],
      usuarios: [],
      pesquisa: {
        startDate: format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        ddds: [],
        tags: [],
        wallets: [],
        searchParam: ''
      },
      estadoPorDdd,
      estadosBR,
      contatosCampanha: [],
      filter: null,
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      ACK: { // Se ACK == 3 ou 4 entao color green
        '-1': 'Error',
        0: 'Envio Pendente',
        1: 'Entrega Pendente',
        2: 'Recebida',
        3: 'Lida',
        4: 'Reproduzido'
      },
      loading: false,
      columns: [
        { name: 'profilePicUrl', label: '', field: 'profilePicUrl', style: 'width: 50px', align: 'center' },
        { name: 'name', label: 'Nome', field: 'name', align: 'left', style: 'width: 300px' },
        { name: 'number', label: 'WhatsApp', field: 'number', align: 'center', style: 'width: 300px' },
        {
          name: 'campaignContacts',
          label: 'Status',
          field: 'campaignContacts',
          align: 'center',
          style: 'width: 200px',
          format: (v) => {
            return v ? this.ACK[v[0].ack] : ''
          }
        },
        {
          name: 'tags',
          label: 'Etiquetas',
          field: 'tags',
          style: 'width: 500px',
          align: 'left',
          format: (v) => {
            if (v) {
              const strs = v.map(i => i.tag)
              return strs.join(', ')
            }
            return ''
          }
        },
        { name: 'estado', label: 'Estado', field: 'number', style: 'width: 500px', align: 'left', format: v => this.definirEstadoNumero(v) },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ],
      columnsAdd: [
        { name: 'profilePicUrl', label: '', field: 'profilePicUrl', style: 'width: 50px', align: 'center' },
        { name: 'name', label: 'Nome', field: 'name', align: 'left', style: 'width: 300px' },
        { name: 'number', label: 'WhatsApp', field: 'number', align: 'center', style: 'width: 300px' },
        {
          name: 'tags',
          label: 'Etiquetas',
          field: 'tags',
          style: 'width: 500px',
          align: 'left',
          format: (v) => {
            if (v) {
              const strs = v.map(i => i.tag)
              return strs.join(', ')
            }
            return ''
          }
        },
        { name: 'estado', label: 'Estado', field: 'number', style: 'width: 500px', align: 'left', format: v => this.definirEstadoNumero(v) }

      ],
      contatosAdd: [],
      selected: []
    }
  },
  methods: {
    formatDate (date, dateMask = 'dd/MM/yyyy') {
      return format(parseISO(date), dateMask)
    },
    async listarAddContatos () {
      const { data } = await RelatorioContatosCampanha(this.pesquisa)
      this.contatosAdd = data.contacts
    },
    async listarEtiquetas () {
      const { data } = await ListarEtiquetas(true)
      // Ordenar etiquetas por ordem alfabética baseada no campo 'tag'
      this.etiquetas = data.sort((a, b) => {
        const tagA = a.tag ? a.tag.toLowerCase() : ''
        const tagB = b.tag ? b.tag.toLowerCase() : ''
        return tagA.localeCompare(tagB)
      })
    },
    async listarContatosCampanha () {
      const { data } = await ListarContatosCampanha(this.$route.params.campanhaId)
      this.contatosCampanha = data
    },
    definirEstadoNumero (numero) {
      try{
        const ddd = numero.substring(2, 4)
        return estadosBR.find(e => e.sigla === estadoPorDdd[ddd])?.nome || ''
      } catch(e){
        
      }
    },
    async addContatosCampanha () {
      try {
        await AdicionarContatosCampanha(this.selected, this.$route.params.campanhaId)
        this.listarContatosCampanha()
        this.modalAddContatosCampanha = false
        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: this.$t('contatosCampanha.contactsAdded'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contatosCampanha.errorAddingContacts'), error)
      }
    },
    async listarUsuarios () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contatosCampanha.errorUsers'), error)
      }
    },
    async buscarDadosCampanha () {
      // Primeiro tenta buscar do localStorage
      const tempData = localStorage.getItem('tempCampanhaData')
      if (tempData) {
        try {
          this.campanhaData = JSON.parse(tempData)
          // Remove os dados temporários após usar
          localStorage.removeItem('tempCampanhaData')
          return
        } catch (error) {
          console.error('Erro ao parsear dados da campanha do localStorage:', error)
          localStorage.removeItem('tempCampanhaData')
        }
      }

      // Se não encontrou no localStorage e tem ID, busca dados básicos
      if (!this.campanhaData && this.campanhaId) {
        try {
          // Aqui você pode implementar uma chamada para buscar os dados da campanha por ID
          // Por enquanto, vamos apenas definir um objeto básico
          this.campanhaData = {
            id: this.campanhaId,
            name: `Campanha ${this.campanhaId}`,
            status: 'pending',
            start: new Date().toISOString()
          }
        } catch (error) {
          console.error('Erro ao buscar dados da campanha:', error)
        }
      }
    },
    onChangeStates (value) {
      // Método para lidar com mudanças nos estados selecionados
      console.log('Estados selecionados:', value)
    },
    onChangeTags (value) {
      // Método para lidar com mudanças nas tags selecionadas
      console.log('Tags selecionadas:', value)
    },
    onChangeWallets (value) {
      // Método para lidar com mudanças nas carteiras selecionadas
      console.log('Carteiras selecionadas:', value)
    },
    deletarContatoCampanha (contato) {
      DeletarContatoCampanha(this.$route.params.campanhaId, contato.id)
        .then(res => {
          this.listarContatosCampanha()
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('contatosCampanha.confirmClearCampaign'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        })
        .catch(error => {
          console.error(error)
          this.$notificarErro(this.$t('contatosCampanha.errorClearingCampaign'), error)
        })
    },
    deletarTodosContatosCampanha () {
      this.$q.dialog({
        title: this.$t('contatosCampanha.confirmClearCampaign'),
        // message: 'Mensagens antigas não serão apagadas no whatsapp.',
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
        DeletarTodosContatosCampanha(this.$route.params.campanhaId)
          .then(res => {
            this.contatosCampanha = []
            this.$notificarSucesso(this.$t('contatosCampanha.contactDeleted'))
          })
          .catch(error => {
            console.error(error)
            this.$notificarErro(this.$t('contatosCampanha.errorDelete'), error)
          })
      })
    }
  },
  computed: {
    campanha () {
      // Primeiro tenta pegar do localStorage, depois dos dados carregados
      return this.campanhaData || null
    },
    campanhaId () {
      return this.$route?.params?.campanhaId || (this.campanha && this.campanha.id) || null
    }
  },
  beforeMount () {
    this.listarEtiquetas()
    this.listarUsuarios()
  },
  async mounted () {
    // Se não temos NEM objeto NEM id, aí sim volta para a lista
    if (!this.campanha && !this.campanhaId) {
      this.$router.push({ name: 'campanhas' })
      return
    }

    // Tenta buscar dados da campanha se não estiverem disponíveis
    await this.buscarDadosCampanha()


    // Ações normais da tela
    this.listarContatosCampanha()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.campanhas === true
  }
}
</script>

<style lang="scss" scoped>
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

  .q-card-section {
    padding: 1.2rem 1.5rem;

    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }

    .text-caption {
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.9rem;
    }
  }
}

.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: auto;
  height: 85vh;

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

  .q-table__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--q-primary);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  thead tr:last-child th {
    top: 63px;
  }

  thead tr:first-child th {
    top: 0;
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

.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    .q-card-section {
      padding: 1.2rem 1.5rem;

      fieldset {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        padding: 1.5rem;
        margin: 0;

        legend {
          color: var(--q-primary);
          font-weight: 600;
          padding: 0 0.5rem;
        }
      }
    }

    .q-input, .q-select, .q-datetime-picker {
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

    .q-chip {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.9);
      }
    }
  }
}

.q-banner {
  border-radius: 12px;
  margin: 1rem 0;
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
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .text-caption {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .my-sticky-dynamic {
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

  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);

      fieldset {
        border-color: rgba(255, 255, 255, 0.1);
      }

      .q-input, .q-select, .q-datetime-picker {
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

      .q-chip {
        background: rgba(255, 255, 255, 0.05);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
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
  .q-card {
    margin: 0.5rem;
    border-radius: 12px;

    .q-card-section {
      padding: 1rem;
    }
  }

  .my-sticky-dynamic {
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

  .q-dialog {
    .q-card {
      width: 95vw !important;
      border-radius: 12px;

      .q-card-section {
        padding: 1rem;

        fieldset {
          padding: 1rem;
        }
      }

      .row {
        flex-direction: column;
        gap: 0.5rem;
      }

      .q-input, .q-select, .q-datetime-picker {
        width: 100% !important;
      }
    }
  }
}

.blur-effect {
  filter: blur(0px);
  transition: filter 0.3s ease;
}
</style>
