<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super'  && pageAllowed))">
    <q-card bordered>
      <q-card-section>
        <div class="text-h6 q-px-sm">{{ $t('relatorioContatosAtendimento.title') }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <fieldset>
          <legend class="q-px-sm">{{ $t('relatorioContatosAtendimento.filtersLegend') }}</legend>
          <div class="row q-gutter-md items-end" >
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.startDate') }}</label>
              <DatePick
                dense
                v-model="pesquisa.startDate"
              />
              <!-- <q-input
                dense
                v-model="pesquisa.startDate"
                mask="####-##-##"
                type="date"
              /> -->
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.endDate') }}</label>  
              <DatePick
                dense
                v-model="pesquisa.endDate"
              />
              <!-- <q-input
                dense
                v-model="pesquisa.endDate"
                mask="####-##-##"
                type="date"
              /> -->
            </div>
            <div class="col-grow text-center">
              <q-btn
                class="q-mr-sm"
                color="primary"
                :label="$t('relatorioContatosAtendimento.generateButton')"
                icon="refresh"
                @click="gerarRelatorio"
              />
              <q-btn
                class="q-mr-sm"
                color="black"
                icon="print"
                :label="$t('relatorioContatosAtendimento.printButton')"
                @click="printReport('tRelatorioTickets')"
              />
              <q-btn
                color="warning"
                :label="$t('relatorioContatosAtendimento.excelButton')"
                @click="exportTable('tRelatorioTickets')"
              />
            </div>
          </div>
          <div class="row q-gutter-md items-end" style="margin-top: 10px">
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.status.status') }}</label>
              <q-select
                v-model="pesquisa.status"
                dense
                :options="statusOptions"
                multiple
                emit-value
                map-options
                :label="$t('relatorioContatosAtendimento.selectStatus')"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.connections') }}</label>
              <q-select
                v-model="pesquisa.whatsappId"
                dense
                :options="cSessionsOptions"
                multiple
                emit-value
                map-options
                :label="$t('relatorioContatosAtendimento.selectConnections')"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.queues') }}</label>
              <q-select
                v-model="pesquisa.queues"
                dense
                :options="queuesOptions"
                multiple
                emit-value
                map-options
                :label="$t('relatorioContatosAtendimento.selectQueues')"
                :loading="loadingFilas"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.users') }}</label>
              <q-select
                v-model="pesquisa.userId"
                dense
                :options="usuariosOptions"
                emit-value
                map-options
                :label="$t('relatorioContatosAtendimento.selectUsers')"
                :loading="loadingUsuarios"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.channels') }}</label>
              <q-select
                v-model="pesquisa.channel"
                dense
                :options="channelOptions"
                multiple
                emit-value
                map-options
                :label="$t('relatorioContatosAtendimento.selectChannels')"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.demands') }}</label>
              <q-select
                v-model="pesquisa.reasons"
                dense
                :options="motivoOptions"
                multiple
                emit-value
                map-options
                :label="$t('relatorioContatosAtendimento.selectDemands')"
                :loading="loadingMotivos"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.minValue') }}</label>
              <q-input
                dense
                v-model="pesquisa.valueMin"
                type="number"
                :label="$t('relatorioContatosAtendimento.inputMinValue')"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.maxValue') }}</label>
              <q-input
                dense
                v-model="pesquisa.valueMax"
                type="number"
                :label="$t('relatorioContatosAtendimento.inputMaxValue')"
              />
            </div>
          </div>
        </fieldset>
      </q-card-section>
    </q-card>

    <div class="row">
      <div class="col-xs-12 q-mt-sm">
        <div
        style="max-height: 350px;"
          class="tableLarge q-ma-sm q-markup-table q-table__container q-table__card q-table--cell-separator q-table--flat q-table--bordered q-table--no-wrap"
        >
          <table id="tableRelatorioTickets" class="q-pb-md q-table q-tabs--dense">
            <thead>
              <tr>
                <td v-for="col in columns" :key="col.name">
                  {{ col.label }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in tickets" :key="ticket.id">
                  <td 
                    v-for="col in columns" 
                    :key="col.name + '-' + ticket.id"
                    :class="['nota-limitada', col.name]"
                  >
                    {{ col.name === 'reasons' 
                        ? (ticket.reasonName || ticket.reasons || 'N/A') 
                        : (col.format ? col.format(ticket[col.field]) : ticket[col.field] || 'N/A') }}
                  </td>
                <!-- <td v-for="col in columns" :key="col.name + '-' + ticket.id">
                  {{ col.format ? col.format(ticket[col.field]) : ticket[col.field] || "N/A" }}
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Componente de impressão -->
    <ccPrintModelLandscape
      id="slotTableRelatorioTickets"
      :imprimirRelatorio="imprimir"
      title="Relatório de Tickets"
      :styleP="`
      table { width: 100%; font-size: 10px; border-spacing: 1; border-collapse: collapse;  }
      #tableReport tr td { border:1px solid #DDD; padding-left: 10px; padding-right: 10px;  }
      #tableReport thead tr:nth-child(1) td { text-align: center; padding: 5px; font-weight: bold; color: #000; background: lightgrey; opacity: 1; }
      #lineGroup { background: #f8f8f8; line-height: 30px; }
      `"
    >
      <template v-slot:body>
        <table class="q-pb-md q-table q-tabs--dense">
          <thead>
            <tr>
              <td v-for="col in columns" :key="col.name">{{ col.label }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td
                v-for="col in columns"
                :key="col.name + '-' + ticket.id"
              >
                {{ col.name === 'reasons' 
                    ? (ticket.reasonName || ticket.reasons || 'N/A') 
                    : (col.format ? col.format(ticket[col.field]) : ticket[col.field] || 'N/A') }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </ccPrintModelLandscape>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { RelatorioTiketss } from "src/service/estatisticas.js";
import { ListarFilas } from "src/service/filas.js";
import { ListarUsuarios } from "src/service/user.js"
import { ListarMotivos } from 'src/service/motivos.js'
import { mapGetters } from 'vuex';
import ccPrintModelLandscape from './ccPrintModelLandscape.vue'

export default {
  name: "RelatorioTickets",
  components: { ccPrintModelLandscape },
  data() {
    return {
      pageAllowed: true,
      userProfile: "user",
      tickets: [],
      usuariosOptions: [],
      motivoOptions: [],
      loadingUsuarios: false,
      loadingMotivos: false,
      columns: [
        { name: "id", label: this.$t("relatorioContatosAtendimento.tableHeaders.id"), field: "id", align: "center" },
        { name: "status", label: this.$t("relatorioContatosAtendimento.tableHeaders.status"), field: "status", align: "center", format: this.formatStatus },
        {
          name: "contactName",
          label: this.$t("relatorioContatosAtendimento.tableHeaders.name"),
          field: "contact",
          align: "center",
          style: "width: 200px",
          format: (v) => (v ? v.name : ""),
        },
        {
          name: "contactNumber",
          label: this.$t("relatorioContatosAtendimento.tableHeaders.number"),
          field: "contact",
          align: "center",
          style: "width: 200px",
          format: (v) => (v ? v.number : ""),
        },
        {
          name: "whatsapp",
          label: this.$t("relatorioContatosAtendimento.tableHeaders.connection"),
          field: "whatsapp",
          align: "center",
          style: "width: 200px",
          format: (v) => (v ? v.name : ""),
        },
        { name: "lastMessage", 
          class: 'nota-limitada',
          label: this.$t("relatorioContatosAtendimento.tableHeaders.lastMessage"), 
          field: "lastMessage", 
          align: "left" 
        },
        {
          name: "unreadMessages",
          label: this.$t("relatorioContatosAtendimento.tableHeaders.unreadMessages"),
          field: "unreadMessages",
          align: "center",
          format: this.formatNaoLida,
        },
        { name: "reasons", label: this.$t("relatorioContatosAtendimento.tableHeaders.demand"), field: "reasons", align: "left" },
        { name: "queue", label: this.$t("relatorioContatosAtendimento.tableHeaders.queues"), field: "queue", align: "left", format: (v) => (v ? v.queue : "") },
        { name: "channel", label: this.$t("relatorioContatosAtendimento.tableHeaders.channel"), field: "channel", align: "left", format: this.formatCanal },
        { name: "value", label: this.$t("relatorioContatosAtendimento.tableHeaders.value"), field: "value", align: "left", format: (v) => (v ? `R$ ${v}` : "N/A") },
        {
          name: 'ticketNotes',
          label: 'Notas',
          field: 'ticketNotes',
          align: 'left',
          class: 'nota-limitada',
          format: (ticketNotes) => {
            if (!ticketNotes || ticketNotes.length === 0) {
              return 'Vazio';
            }
            return ticketNotes.map(note => 
              `${note.notes} (${new Date(note.createdAt).toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })})`
            ).join(' | ');
          }
        },
        // { name: "ticketNotes", label: this.$t("relatorioContatosAtendimento.tableHeaders.ticketNotes"), field: "ticketNotes", align: "left" },
        {
          name: "createdAt",
          label: this.$t("relatorioContatosAtendimento.tableHeaders.creationDate"),
          field: "createdAt",
          align: "center",
          format: (v) => new Date(v).toLocaleString('pt-BR', {
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          }),
        },
      ],
      // columns: [
      //   { name: "id", label: "ID", field: "id", align: "center" },
      //   { name: "status", label: "Status", field: "status", align: "center", format: this.formatStatus },
      //   {
      //     name: 'contactName',
      //     label: 'Nome',
      //     field: 'contact',
      //     align: 'center',
      //     style: 'width: 200px',
      //     format: (v) => {
      //       return v ? v.name : ''
      //     }
      //   },
      //   {
      //     name: 'contactNumber',
      //     label: 'Número',
      //     field: 'contact',
      //     align: 'center',
      //     style: 'width: 200px',
      //     format: (v) => {
      //       return v ? v.number : ''
      //     }
      //   },
      //   {
      //     name: 'whatsapp',
      //     label: 'Conexão',
      //     field: 'whatsapp',
      //     align: 'center',
      //     style: 'width: 200px',
      //     format: (v) => {
      //       return v ? v.name : ''
      //     }
      //   },
      //   { name: "lastMessage", label: "Última Mensagem", field: "lastMessage", align: "left" },
      //   {
      //     name: "unreadMessages",
      //     label: "Mensagens Não Lidas",
      //     field: "unreadMessages",
      //     align: "center",
      //     format: this.formatNaoLida
      //   },
      //   { name: "reasons", label: "Demanda", field: "reasons", align: "left" },
      //   { name: "queue", label: "Filas", field: "queue", align: "left", format: (v) => {
      //       return v ? v.queue : ''
      //     } },
      //   { name: "channel", label: "Canal", field: "channel", align: "left", format: (val) => this.formatCanal(val)  },
      //   { name: "value", label: "Valor", field: "value", align: "left", format: (v) => {
      //       return v ? 'R$ ' + v : 'N/A'
      //     } },
      //   {
      //     name: "createdAt",
      //     label: "Data de Criação",
      //     field: "createdAt",
      //     align: "center",
      //     format: (v) => new Date(v).toLocaleString(),
      //   }
      // ],
      pesquisa: {
        startDate: "",
        endDate: "",
        status: [],
        queues: [],
        channel: [],
        reasons: [],
        whatsappId: [],
        valueMin: null,
        valueMax: null
      },
      statusOptions: [
        { label: this.$t("relatorioContatosAtendimento.status.open"), value: "open" },
        { label: this.$t("relatorioContatosAtendimento.status.closed"), value: "closed" },
        { label: this.$t("relatorioContatosAtendimento.status.pending"), value: "pending" },
      ],
      channelOptions: [
        { label: 'WhatsApp Official (WABA)', value: 'waba' },
        { label: 'WhatsApp Baileys (QRCode)', value: 'baileys' },
        { label: 'WhatsApp WebJs (QRCode)', value: 'whatsapp' },
        { label: 'WhatsApp Meow (QRCode)', value: 'meow' },
        { label: 'WhatsApp Evoltuion (QRCode)', value: 'evo' },
        { label: 'WhatsApp Zapi (QRCode)', value: 'zapi' },
        { label: 'WhatsApp Uazapi (QRCode)', value: 'uazapi' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'Facebook (Hub)', value: 'hub_facebook' },
        { label: 'Instagram (Hub)', value: 'hub_instagram' },
      ],
      queuesOptions: [],
      loadingFilas: false,
      imprimir: false
    };
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => !w.isDeleted)
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type }))
    }
  },
  methods: {
    // Função para trocar mês com dia e garantir formato brasileiro no Excel
    swapMonthDay(dateValue, format = 'dd/MM/yyyy HH:mm:ss') {
      if (!dateValue) return 'N/A';
      
      try {
        let date;
        
        // Se já é um objeto Date
        if (dateValue instanceof Date) {
          date = dateValue;
        }
        // Se é uma string ISO
        else if (typeof dateValue === 'string' && dateValue.includes('T')) {
          date = new Date(dateValue);
        }
        // Se é uma string de data simples
        else if (typeof dateValue === 'string') {
          date = new Date(dateValue);
        }
        // Se é um timestamp
        else if (typeof dateValue === 'number') {
          date = new Date(dateValue);
        }
        else {
          return 'N/A';
        }
        
        // Verificar se a data é válida
        if (isNaN(date.getTime())) {
          return 'N/A';
        }
        
        // Extrair componentes da data
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        // Criar string no formato que o Excel interpreta como brasileiro
        // Usar formato MM/DD/YYYY para que o Excel interprete como DD/MM/YYYY
        if (format.includes('ss')) {
          return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        } else {
          return `${month}/${day}/${year} ${hours}:${minutes}`;
        }
        
      } catch (error) {
        console.error('Erro ao trocar formato de data:', error, 'Valor:', dateValue);
        return 'N/A';
      }
    },
    formatDateForExport(dateValue, format = 'dd/MM/yyyy HH:mm:ss') {
      if (!dateValue) return 'N/A';
      
      try {
        // Tentar diferentes métodos de parsing da data
        let date;
        
        // Se já é um objeto Date
        if (dateValue instanceof Date) {
          date = dateValue;
        }
        // Se é uma string ISO
        else if (typeof dateValue === 'string' && dateValue.includes('T')) {
          date = new Date(dateValue);
        }
        // Se é uma string de data simples
        else if (typeof dateValue === 'string') {
          date = new Date(dateValue);
        }
        // Se é um timestamp
        else if (typeof dateValue === 'number') {
          date = new Date(dateValue);
        }
        else {
          return 'N/A';
        }
        
        // Verificar se a data é válida
        if (isNaN(date.getTime())) {
          return 'N/A';
        }
        
        // Para Excel, usar formato que ele reconheça como brasileiro
        // Usar vírgula em vez de dois pontos para evitar confusão com formato americano
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        if (format.includes('ss')) {
          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        } else {
          return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        
      } catch (error) {
        console.error('Erro ao formatar data para exportação:', error, 'Valor:', dateValue);
        return 'N/A';
      }
    },
    formatCanal(value) {
      const channelOptions = [
        { label: 'WhatsApp Official (WABA)', value: 'waba' },
        { label: 'WhatsApp Baileys (QRCode)', value: 'baileys' },
        { label: 'WhatsApp WebJs (QRCode)', value: 'whatsapp' },
        { label: 'WhatsApp Meow (QRCode)', value: 'meow' },
        { label: 'WhatsApp Evoltuion (QRCode)', value: 'evo' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'Facebook (Hub)', value: 'hub_facebook' },
        { label: 'Instagram (Hub)', value: 'hub_instagram' },
      ];

      const channel = channelOptions.find(option => option.value === value);
      return channel ? channel.label : this.$t("relatorioContatosAtendimento.unknownChannel");
    },
    formatNaoLida(unread){
      return unread ? this.$t("relatorioContatosAtendimento.yes") : this.$t("relatorioContatosAtendimento.no");
    },
    formatStatus(status) {
      switch (status) {
        case "open":
          return this.$t("relatorioContatosAtendimento.status.open");
        case "closed":
          return this.$t("relatorioContatosAtendimento.status.closed");
        case "pending":
          return this.$t("relatorioContatosAtendimento.status.pending");
        case "schedule":
          return this.$t("relatorioContatosAtendimento.status.scheduled");
        default:
          return status;
      }
    },
    async listarMotivos () {
      try {
        this.loadingMotivos = true;
        const { data } = await ListarMotivos();
        this.motivoOptions = data.reasons.map((motivo) => ({
          label: motivo.name,
          value: motivo.id,
        }));
      } catch (error) {
        console.error(error);
        this.$q.notify({ color: "negative", 
        message: this.$t("relatorioContatosAtendimento.notifications.loadingMotives") 
      });
      } finally {
        this.loadingMotivos = false;
      }
    },
    async listarUsuarios() {
      try {
        this.loadingUsuarios = true;
        const { data } = await ListarUsuarios();
        this.usuariosOptions = data.users
          .filter((user) => user.profile !== "superadmin")
          .map((user) => ({
            label: user.name,
            value: user.id,
          }));
      } catch (error) {
        console.error(error);
        this.$q.notify({ color: "negative", 
        message: this.$t("relatorioContatosAtendimento.notifications.loadingUsers") 
      });
      } finally {
        this.loadingUsuarios = false;
      }
    },
    async listarFilas() {
      try {
        this.loadingFilas = true;
        const { data } = await ListarFilas();
        this.queuesOptions = data.map((fila) => ({
          label: fila.queue,
          value: fila.id,
        }));
      } catch (error) {
        console.error("Erro ao listar filas:", error);
        this.$q.notify({ color: "negative", 
        message: this.$t("relatorioContatosAtendimento.notifications.loadingQueues")
      });
      } finally {
        this.loadingFilas = false;
      }
    },
    async gerarRelatorio() {
      if (!this.pesquisa.startDate || !this.pesquisa.endDate) {
        this.$q.notify({ color: "negative", 
        message: this.$t("relatorioContatosAtendimento.notifications.noDates")  
      });
        return;
      }
      // if (!this.pesquisa.userId) {
      //   this.$q.notify({ color: 'negative', message: 'Selecione um usuário para gerar o relatório' });
      //   return;
      // }
      const params = {
        ...this.pesquisa,
        userId: this.pesquisa.userId || null,
        channel: this.pesquisa.channel.length ? this.pesquisa.channel : null,
        reasons: this.pesquisa.reasons.length ? this.pesquisa.reasons : null,
        whatsappId: this.pesquisa.whatsappId.length ? this.pesquisa.whatsappId : null,
        valueMin: this.pesquisa.valueMin,
        valueMax: this.pesquisa.valueMax
      };

      const { data } = await RelatorioTiketss(params);
      console.log(data);
      this.tickets = data.tickets || [];
    },
    async exportTable() {
      try {
        const mod = await import('xlsx')
        const XLSX = mod.default || mod
        
        // Preparar dados para exportação com formatação adequada
        const exportData = this.tickets.map(ticket => {
          const row = {};
          
          // Mapear cada coluna com formatação adequada
          this.columns.forEach(col => {
            let value = ticket[col.field];

            // Coluna de Demanda: usar reasonName quando existir
            if (col.name === 'reasons') {
              value = ticket.reasonName || ticket.reasons || 'N/A';
            }
            
            // Aplicar formatação específica para cada campo
            if (col.format && typeof col.format === 'function') {
              value = col.format(value);
            } else if (value === null || value === undefined) {
              value = "N/A";
            }
            
            // Tratar campos aninhados
            if (col.field === 'contact' && value && typeof value === 'object') {
              if (col.name === 'contactName') {
                value = value.name || '';
              } else if (col.name === 'contactNumber') {
                value = value.number || '';
              }
            } else if (col.field === 'whatsapp' && value && typeof value === 'object') {
              value = value.name || '';
            } else if (col.field === 'queue' && value && typeof value === 'object') {
              value = value.queue || '';
            } else if (col.field === 'ticketNotes' && Array.isArray(value)) {
              if (value.length === 0) {
                value = 'Vazio';
              } else {
                value = value.map(note => {
                  const noteDate = this.swapMonthDay(note.createdAt, 'dd/MM/yyyy HH:mm');
                  return `${note.notes} (${noteDate})`;
                }).join(' | ');
              }
            } else if (col.field === 'value') {
              // Garantir vírgula como separador decimal na exportação
              try {
                const raw = ticket[col.field];
                let num;
                if (typeof raw === 'number') {
                  num = raw;
                } else if (typeof raw === 'string') {
                  // Remove símbolos e converte ponto decimal para parse
                  const cleaned = raw.replace(/[^\d.,-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
                  num = Number(cleaned);
                }
                if (!isNaN(num)) {
                  value = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                } else if (typeof value === 'string') {
                  // Fallback simples
                  value = value.replace('.', ',');
                }
              } catch (e) {
                // Mantém valor original em caso de erro
              }
            } else if (col.field === 'createdAt' && value) {
              // Usar função de troca para garantir formato brasileiro no Excel
              value = this.swapMonthDay(value, 'dd/MM/yyyy HH:mm:ss');
            }
            
            row[col.label] = value;
          });
          
          return row;
        });

        // Criar worksheet a partir dos dados formatados
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        
        // Configurar largura das colunas
        const colWidths = this.columns.map(col => {
          if (col.name === 'lastMessage' || col.name === 'ticketNotes') {
            return { wch: 50 }; // Colunas de texto longo
          } else if (col.name === 'contactName' || col.name === 'contactNumber') {
            return { wch: 20 }; // Colunas de contato
          } else {
            return { wch: 15 }; // Colunas padrão
          }
        });
        
        worksheet['!cols'] = colWidths;
        
        // Configurar formato das colunas de data para formato brasileiro
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let col = range.s.c; col <= range.e.c; col++) {
          const colLetter = XLSX.utils.encode_col(col);
          const headerCell = worksheet[colLetter + '1'];
          
          if (headerCell && headerCell.v === this.$t("relatorioContatosAtendimento.tableHeaders.creationDate")) {
            // Configurar coluna de data de criação como texto para manter formato MM/DD/YYYY (que será interpretado como DD/MM/YYYY)
            for (let row = range.s.r + 1; row <= range.e.r; row++) {
              const cellAddress = colLetter + (row + 1);
              if (worksheet[cellAddress]) {
                worksheet[cellAddress].t = 's'; // Tipo string
                worksheet[cellAddress].z = 'mm/dd/yyyy hh:mm:ss'; // Formato que será interpretado como brasileiro
              }
            }
          }
        }
        
        // Criar workbook e adicionar worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, this.$t("relatorioContatosAtendimento.sheetTitle"));
        
        // Exportar arquivo
        XLSX.writeFile(workbook, `${this.$t("relatorioContatosAtendimento.sheetName")}.xlsx`);
        
        this.$q.notify({
          color: "positive",
          message: this.$t("relatorioContatosAtendimento.notifications.exportSuccess") || "Relatório exportado com sucesso!",
          icon: "check"
        });
        
      } catch (error) {
        console.error('Erro ao exportar relatório:', error);
        this.$q.notify({
          color: "negative",
          message: this.$t("relatorioContatosAtendimento.notifications.exportError") || "Erro ao exportar relatório. Tente novamente.",
          icon: "error"
        });
      }
    },
    // exportTable() {
    //   const table = document.getElementById("tableRelatorioTickets");
    //   const worksheet = XLSX.utils.table_to_sheet(table);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório de Tickets");
    //   XLSX.writeFile(workbook, "Relatorio-Tickets.xlsx");
    // },
    printReport() {
      this.imprimir = !this.imprimir;
    },
  },
  async mounted() {
    this.userProfile = localStorage.getItem("profile");
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.relatorios === true;
    await this.listarMotivos(); // Carrega a lista de motivos
    await this.listarUsuarios(); // Carrega a lista de usuários
    await this.listarFilas(); // Carrega a lista de filas
  },
};
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}
.q-card-section legend {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}
.q-btn {
  border-radius: 8px;
  min-width: 28px;
  min-height: 28px;
  padding: 0.18rem 0.7rem;
  font-size: 0.92rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  &:hover {
    box-shadow: 0 3px 8px rgba(0,0,0,0.11);
    background: rgba(var(--q-primary-rgb), 0.09);
  }
}
.tableLarge {
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 0.5rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(6px);
  transition: box-shadow 0.2s;
}
thead tr td {
  color: #222;
  background: #eaeaff;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.nota-limitada {
  max-width: 300px;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}
body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
body.body--dark .tableLarge {
  background: rgba(40,40,40,0.92);
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
}
body.body--dark thead tr td {
  background: #23234a;
  color: #e0e0e0;
}
body.body--dark .tableLarge tbody tr td,
body.body--dark .q-table tbody tr td {
  color: #e0e0e0 !important;
  background: #232323 !important;
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
  .tableLarge {
    border-radius: 8px;
    padding: 0.2rem;
  }
}
</style>
