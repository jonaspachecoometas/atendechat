<template>
  <div v-if="(userProfile === 'admin' || pageAllowed)">
    <q-card-section>
      <q-banner class="bg-yellow text-black" inline-actions style="margin-left: 8px;margin-right: 8px;">
        {{ $t("campanhas.warningBanner") }}
      </q-banner>
    </q-card-section>
    <q-table
      style="border-radius: 8px !important;"
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('campanhas.title')"
      :rows="campanhas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          class="q-mr-md"
          color="primary"
          icon="refresh"
          outline
          @click="listarCampanhas(currentPage)"
        >
          <q-tooltip>
            {{ $t("campanhas.actions.refresh") }}
          </q-tooltip>
        </q-btn>
        <q-btn
          class="q-mr-md"
          color="primary"
          icon="sort"
          outline
          @click="ordenarPorId"
        >
          <q-tooltip>
            {{ $t("campanhas.actions.sortById") }}
          </q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          :label="$t('campanhas.actions.addCampaign')"
          @click="campanhaEdicao = {}; modalCampanha = true"
        />
      </template>
      <template v-slot:body-cell-color="props">
        <q-td class="text-center">
          <div
            class="q-pa-sm rounded-borders"
            :style="`background: ${props.row.color}`"
          >
            {{ props.row.color }}
          </div>
        </q-td>
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
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="mdi-account-details-outline"
            @click="contatosCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.viewContacts") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            v-if="['pending', 'canceled'].includes(props.row.status)"
            icon="mdi-calendar-clock"
            @click="iniciarCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.programSend") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            v-if="['scheduled', 'processing'].includes(props.row.status)"
            icon="mdi-close-box-multiple"
            @click="cancelarCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.cancelCampaign") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            v-if="props.row.status === 'processing'"
            icon="mdi-skip-next"
            color="warning"
            @click="pularMensagemAtual(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.skipMessage") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            v-if="props.row.status === 'processing'"
            icon="mdi-check-all"
            color="negative"
            @click="forcarFinalizacaoCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.forceFinish") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="['pending', 'scheduled', 'canceled'].includes(props.row.status)"
            flat
            round
            icon="edit"
            @click="editarCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.editCampaign") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="content_copy"
            color="primary"
            @click="duplicarCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.duplicateCampaign") }}
            </q-tooltip>
          </q-btn>
          <q-btn-dropdown
            flat
            round
            icon="mdi-file-download-outline"
            color="primary"
            dropdown-icon="arrow_drop_down"
            @click.stop
          >
            <q-list>
              <q-item clickable v-close-popup @click="baixarRelatorio(props.row)">
                <q-item-section avatar><q-icon name="mdi-file-pdf-box" color="red" /></q-item-section>
                <q-item-section>{{ $t('campanhas.actions.downloadReportPdf') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="baixarRelatorioCsv(props.row)">
                <q-item-section avatar><q-icon name="mdi-file-delimited-outline" color="primary" /></q-item-section>
                <q-item-section>{{ $t('campanhas.actions.downloadReportCsv') }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarCampanha(props.row)"
          >
            <q-tooltip>
              {{ $t("campanhas.actions.deleteCampaign") }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    
    <!-- Controles de Paginação -->
    <div class="q-pa-md flex justify-between items-center">
      <!-- Controles de limite por página -->
      <div class="flex items-center">
        <span class="q-mr-sm">{{ $t('campanhas.register') }}</span>
        <q-select
          v-model="limit"
          :options="[5, 10, 15, 20, 25, 50]"
          dense
          outlined
          style="width: 80px"
          @update:model-value="handleLimitChange"
        />
      </div>
      
      <!-- Informações da página atual -->
      <div class="text-caption">
        {{ getPageRange() }} de {{ totalCount }} {{ $t('campanhas.campanhas') }}
      </div>
      
      <!-- Controles de navegação -->
      <div class="flex items-center">
        <!-- <q-btn
          flat
          round
          icon="chevron_left"
          :disable="currentPage === 1"
          @click="prevPage"
          color="primary"
        /> -->
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="6"
          boundary-numbers
          direction-links
          color="primary"
          size="sm"
        />
        <!-- <q-btn
          flat
          round
          icon="chevron_right"
          :disable="currentPage === totalPages"
          @click="nextPage"
          color="primary"
        /> -->
      </div>
    </div>
    
    <ModalCampanha
      v-if="modalCampanha"
      v-model:modalCampanha="modalCampanha"
      v-model:campanhaEdicao="campanhaEdicao"
      @modal-campanha:criada="campanhaCriada"
      @modal-campanha:editada="campanhaEditada"
    />
    <q-dialog v-model="showWarningModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ $t('campanhas.warningModal.title') }}
          </div>
          <div class="text-body1 q-mt-md">
            <div>
              <!-- Aviso Importante -->
              <q-banner class="bg-orange text-black q-mt-md" dense rounded>
                <q-icon name="warning" size="md" class="q-mr-sm" />
                <div class="text-subtitle1">
                  {{ $t('campanhas.warningModal.description.whatsappRisk1.title') }}
                </div>
                <div class="text-bold">
                  {{ $t('campanhas.warningModal.description.whatsappRisk1.content') }}
                </div>
              </q-banner>

              <!-- Informação Adicional -->
              <div class="text-body1 q-mb-md">
                <div class="text-subtitle1">
                  {{ $t('campanhas.warningModal.description.whatsappRisk2.title') }}
                </div>
                <div class="text-bold">
                  {{ $t('campanhas.warningModal.description.whatsappRisk2.content') }}
                </div>
              </div>

              <!-- Cuidado: Mensagem de Alerta -->
              <q-banner class="bg-red text-black q-mt-md" dense rounded>
                <q-icon name="error" size="md" class="q-mr-sm" />
                <div class="text-subtitle1">
                  <div class="text-subtitle1">{{ $t('campanhas.warningModal.description.highSpamRisk.title') }}</div>
                  <div>{{ $t('campanhas.warningModal.description.highSpamRisk.content') }}</div>
                </div>
              </q-banner>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('common.out')" color="negative" @click="cancelNavigation" />
          <q-btn flat :label="$t('common.continue')" color="positive" @click="confirmNavigation" />
        </q-card-actions>
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
import { CancelarCampanha, DeletarCampanha, IniciarCampanha, ListarCampanhas, DuplicarCampanha, RelatorioDetalhadoCampanha, AtualizarAckContatosCampanha, PularMensagemCampanha } from 'src/service/campanhas.js'
import ModalCampanha from './ModalCampanha.vue'
import { MostrarCores } from 'src/service/empresas.js';
import { format, parseISO, startOfDay } from 'date-fns'
import { createJsPDFWithAutoTable, addAutoTable } from 'src/utils/jspdf-autotable-loader.js'

export default {
  name: 'Campanhas',
  components: {
    ModalCampanha
  },
  data () {
    return {
      pageAllowed: true,
      showWarningModal: false,
      idOrder: 'asc',
      colors: {},
      userProfile: 'user',
      campanhaEdicao: {},
      modalCampanha: false,
      campanhas: [],
      // Variáveis de paginação
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      limit: 10,
      pagination: {
        rowsPerPage: 10,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: this.$t("campanhas.columns.id"), field: 'id', align: 'left' },
        { name: 'name', label: this.$t("campanhas.columns.name"), field: 'name', align: 'left' },
        { name: 'start', label: this.$t("campanhas.columns.start"), field: 'start', align: 'center', format: (v) => format(parseISO(v), 'dd/MM/yyyy HH:mm') },
        {
          name: 'status',
          label: this.$t("campanhas.columns.status"),
          field: 'status',
          align: 'center',
          format: (v) => v ? this.status[v] : ''
        },
        { name: 'currentMessageId', label: this.$t("campanhas.columns.currentMessageId"), field: 'currentMessageId', align: 'center' },
        { name: 'contactsCount', label: this.$t("campanhas.columns.contactsCount"), field: 'contactsCount', align: 'center' },
        { name: 'pendentesEnvio', label: this.$t("campanhas.columns.queueForSend"), field: 'pendentesEnvio', align: 'center' },
        // { name: 'pendentesEntrega', label: this.$t("campanhas.columns.notSended"), field: 'pendentesEntrega', align: 'center' },
        { name: 'recebidas', label: this.$t("campanhas.columns.sent"), field: 'recebidas', align: 'center' },
        // { name: 'lidas', label: 'Lidas', field: 'lidas', align: 'center' },
        { name: 'acoes', label: this.$t("campanhas.columns.actions"), field: 'acoes', align: 'center' }
      ],
      status: {
        pending: this.$t("campanhas.status.pending"),
        scheduled: this.$t("campanhas.status.scheduled"),
        processing: this.$t("campanhas.status.processing"),
        canceled: this.$t("campanhas.status.canceled"),
        finished: this.$t("campanhas.status.finished"),
      }
    }
  },
  watch: {
    currentPage: {
      handler(newPage, oldPage) {
        if (newPage !== oldPage) {
          this.listarCampanhas(newPage);
        }
      },
      immediate: false
    }
  },
  methods: {
    cancelNavigation() {
      this.showWarningModal = false;
      this.$router.push({ name: 'home-dashboard' }); // Use 'push' para navegar para a rota correta
    },
    confirmNavigation() {
      localStorage.setItem('showWarningModalCampanhas', false)
      this.showWarningModal = false;
    },
    async baixarRelatorio(campanha) {
      try {
        // Obter os dados do relatório (JSON) chamando o endpoint já existente
        const response = await RelatorioDetalhadoCampanha(campanha.id);
        const report = response.data;

        // Criar instância do jsPDF com autoTable garantido
        const doc = await createJsPDFWithAutoTable();
        
        doc.setFont("helvetica", "normal"); // Garante suporte a acentuação

        // Título do Relatório
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text(this.$t("campanhas.baixarRelatorio.title"), 10, 15);
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        let y = 25;
        doc.text(this.$t("campanhas.baixarRelatorio.description.campaignDetails.id", { id: report.id }), 10, y);
        y += 8;
        doc.text(this.$t("campanhas.baixarRelatorio.description.campaignDetails.status", { status: report.status }), 10, y);
        y += 8;
        doc.text(
          this.$t("campanhas.baixarRelatorio.description.campaignDetails.startDate", { date: new Date(report.start).toLocaleString() }),
          10,
          y
        );
        y += 8;
        doc.text(this.$t("campanhas.baixarRelatorio.description.campaignDetails.totalContacts", { total: report.totalContacts }), 10, y);
        y += 8;
        doc.text(this.$t("campanhas.baixarRelatorio.description.campaignDetails.delivered", { count: report.delivered }), 10, y);
        y += 8;
        doc.text(this.$t("campanhas.baixarRelatorio.description.campaignDetails.pending", { count: report.pending }), 10, y);
        y += 8;
        doc.text(this.$t("campanhas.baixarRelatorio.description.campaignDetails.failed", { count: report.failed }), 10, y);
        y += 10;

        // Linha separadora
        doc.setDrawColor(100, 100, 255);
        doc.setLineWidth(0.5);
        doc.line(10, y, 200, y);
        y += 6;

        // Adicionar tabela com os contatos
        const contacts = report.contacts.map((c, index) => [
          index + 1,
          c.name || this.$t("campanhas.baixarRelatorio.description.placeholders.unknownName"),
          c.ack === 2 || c.ack === 3 || c.ack === 4
            ? this.$t("campanhas.baixarRelatorio.description.statusDescriptions.delivered")
            : c.ack === 0
            ? this.$t("campanhas.baixarRelatorio.description.statusDescriptions.pending")
            : this.$t("campanhas.baixarRelatorio.description.statusDescriptions.failed"),
          (c.body || this.$t("campanhas.baixarRelatorio.description.placeholders.noMessage")).substring(0, 60),
          (c.mediaName || this.$t("campanhas.baixarRelatorio.description.placeholders.noMedia")).substring(0, 40),
        ]);

        // Usar o método autoTable - tentar usar o método da instância, senão usar a função importada
        // Ajustar larguras para caber na página (largura total ~190 unidades com margens de 10)
        const autoTableOptions = {
          startY: y,
          head: [
            [
              this.$t("campanhas.baixarRelatorio.description.tableHeaders.index"),
              this.$t("campanhas.baixarRelatorio.description.tableHeaders.name"),
              this.$t("campanhas.baixarRelatorio.description.tableHeaders.status"),
              this.$t("campanhas.baixarRelatorio.description.tableHeaders.message"),
              this.$t("campanhas.baixarRelatorio.description.tableHeaders.media"),
            ],
          ],
          body: contacts,
          styles: {
            font: "helvetica",
            fontSize: 9,
            cellPadding: 2.5,
            overflow: 'linebreak',
            valign: 'middle',
          },
          headStyles: {
            fillColor: [33, 102, 172],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center',
          },
          alternateRowStyles: { fillColor: [240, 245, 255] },
          columnStyles: {
            0: { cellWidth: 10, halign: 'center' },
            1: { cellWidth: 30 },
            2: { cellWidth: 20, halign: 'center' },
            3: { cellWidth: 55 },
            4: { cellWidth: 45 },
          },
          margin: { left: 10, right: 10 },
          // Garantir que a tabela se ajuste à largura da página
          tableWidth: 'wrap',
        };

        // Usar autoTable - se estiver disponível na instância, usar diretamente, senão usar a função importada
        if (typeof doc.autoTable === 'function') {
          doc.autoTable(autoTableOptions);
        } else {
          await addAutoTable(doc, autoTableOptions);
        }

        // Rodapé com data/hora de geração
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(120);
          doc.text(
            `${this.$t("campanhas.baixarRelatorio.description.generatedAt")} ${new Date().toLocaleString()}`,
            10,
            287
          );
          doc.text(
            `${this.$t("campanhas.baixarRelatorio.description.page")} ${i}/${pageCount}`,
            190,
            287,
            { align: 'right' }
          );
        }

        // Salvar o PDF
        doc.save(this.$t("campanhas.baixarRelatorio.description.fileName", { id: report.id }));

        this.$notificarSucesso(this.$t("campanhas.baixarRelatorio.description.notifications.success"));
      } catch (error) {
        this.$notificarErro(this.$t("campanhas.baixarRelatorio.description.notifications.error"), error);
      }
    },
    async baixarRelatorioCsv(campanha) {
      try {
        const response = await RelatorioDetalhadoCampanha(campanha.id);
        const report = response.data;
        const headers = [
          this.$t("campanhas.baixarRelatorio.description.tableHeaders.index"),
          this.$t("campanhas.baixarRelatorio.description.tableHeaders.name"),
          this.$t("campanhas.baixarRelatorio.description.tableHeaders.status"),
          this.$t("campanhas.baixarRelatorio.description.tableHeaders.message"),
          this.$t("campanhas.baixarRelatorio.description.tableHeaders.media"),
        ];
        const rows = report.contacts.map((c, index) => [
          index + 1,
          c.name || this.$t("campanhas.baixarRelatorio.description.placeholders.unknownName"),
          c.ack === 2 || c.ack === 3 || c.ack === 4
            ? this.$t("campanhas.baixarRelatorio.description.statusDescriptions.delivered")
            : c.ack === 0
            ? this.$t("campanhas.baixarRelatorio.description.statusDescriptions.pending")
            : this.$t("campanhas.baixarRelatorio.description.statusDescriptions.failed"),
          (c.body || this.$t("campanhas.baixarRelatorio.description.placeholders.noMessage")).replace(/\n/g, ' '),
          c.mediaName || this.$t("campanhas.baixarRelatorio.description.placeholders.noMedia"),
        ]);
        let csvContent = '';
        csvContent += headers.join(';') + '\n';
        rows.forEach(row => {
          csvContent += row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(';') + '\n';
        });
        // Adiciona BOM para Excel reconhecer UTF-8
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', this.$t("campanhas.baixarRelatorio.description.fileName", { id: report.id }) + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.$notificarSucesso(this.$t("campanhas.baixarRelatorio.description.notifications.success"));
      } catch (error) {
        this.$notificarErro(this.$t("campanhas.baixarRelatorio.description.notifications.error"), error);
      }
    },
    duplicarCampanha(campanha) {
      this.$q.dialog({
        title: this.$t("campanhas.dialogs.duplicateCampaign.title"),
        message: `${this.$t("campanhas.dialogs.duplicateCampaign.message")} "${campanha.name}"?`,
        cancel: {
          label: this.$t("campanhas.dialogs.duplicateCampaign.no"),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t("campanhas.dialogs.duplicateCampaign.yes"),
          color: 'positive',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        try {
          const response = await DuplicarCampanha(campanha.id);
          this.$notificarSucesso(this.$t("campanhas.notifications.campaignDuplicated"));
          this.listarCampanhas(this.currentPage); // Atualiza a lista de campanhas
        } catch (error) {
          this.$notificarErro(this.$t("campanhas.notifications.campaignDuplicated"), error);
        }
      });
    },
    ordenarPorId() {
      // Alternar entre ordem ascendente e descendente
      if (this.idOrder === 'asc') {
        this.idOrder = 'desc';
        // Ordenar campanhas por ID em ordem descendente (maior para menor)
        this.campanhas.sort((a, b) => b.id - a.id);
      } else {
        this.idOrder = 'asc';
        // Ordenar campanhas por ID em ordem ascendente (menor para maior)
        this.campanhas.sort((a, b) => a.id - b.id);
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
    async listarCampanhas (page = 1) {
      this.loading = true
      try {
        const { data } = await ListarCampanhas(page, this.limit)
        
        // Adicionar valores padrão para campos que podem estar faltando
        this.campanhas = data.campaigns.map(campaign => ({
          ...campaign,
          pendentesEnvio: campaign.pendentesEnvio || 0,
          pendentesEntrega: campaign.pendentesEntrega || 0,
          recebidas: campaign.recebidas || 0,
          lidas: campaign.lidas || 0
        }))
        this.totalCount = data.totalCount
        this.totalPages = data.totalPages
        this.currentPage = data.currentPage
        this.pagination.rowsNumber = data.totalCount
        this.pagination.rowsPerPage = this.limit
      } catch (error) {
        console.error('Erro ao carregar campanhas:', error)
        this.$notificarErro('Erro ao carregar campanhas')
      } finally {
        this.loading = false
      }
    },
    // Métodos de paginação
    async nextPage () {
      if (this.currentPage < this.totalPages) {
        await this.listarCampanhas(this.currentPage + 1)
      }
    },
    async prevPage () {
      if (this.currentPage > 1) {
        await this.listarCampanhas(this.currentPage - 1)
      }
    },
    async goToPage (page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        await this.listarCampanhas(page)
      }
    },
    handleLimitChange(newLimit) {
      this.limit = newLimit;
      this.currentPage = 1; // Reset to first page when limit changes
      this.listarCampanhas(this.currentPage);
    },
    getPageRange() {
      const start = (this.currentPage - 1) * this.limit + 1;
      const end = Math.min(this.currentPage * this.limit, this.totalCount);
      return `${start}-${end}`;
    },
    isValidDate (v) {
      return startOfDay(new Date(parseISO(v))).getTime() >= startOfDay(new Date()).getTime()
    },
    campanhaCriada (campanha) {
      this.listarCampanhas(this.currentPage)
    },
    campanhaEditada (campanha) {
      this.listarCampanhas(this.currentPage)
    },
    editarCampanha (campanha) {
      if (campanha.status !== 'pending' && campanha.status !== 'canceled') {
        this.$notificarErro(this.$t("campanhas.notifications.warningEdit"))
      }
      this.campanhaEdicao = {
        ...campanha,
        start: campanha.start, // format(parseISO(campanha.start), 'yyyy-MM-dd'),
        end: campanha.start // format(parseISO(campanha.start), 'yyyy-MM-dd')
      }
      this.modalCampanha = true
    },
    deletarCampanha (campanha) {
      // if (campanha.status !== 'pending' && campanha.status !== 'canceled' && campanha.contactsCount) {
      //   this.$notificarErro('Só é permitido deletar campanhas que estejam pendentes ou canceladas e não possuam contatos vinculados.')
      // }
      this.$q.dialog({
        title: this.$t("common.attention"),
        message: `${this.$t("campanhas.dialogs.cancelCampaign.title")} ${campanha.name}?`,
        cancel: {
          label: this.$t("common.no"),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t("common.yes"),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        DeletarCampanha(campanha)
          .then(res => {
            this.$notificarSucesso(`${this.$t("campanhas.notifications.campaignDeleted")}: ${campanha.tag} deletada!`)
            this.listarCampanhas(this.currentPage)
          })
          .catch(err => {
            this.$notificarErro('Erro ao deletar campanha', err)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    contatosCampanha (campanha) {
      // Armazena os dados da campanha no localStorage temporariamente
      localStorage.setItem('tempCampanhaData', JSON.stringify(campanha))
      this.$router.push({
        name: 'contatos-campanha',
        params: {
          campanhaId: campanha.id
        }
      })
    },
    cancelarCampanha (campanha) {
      if(campanha.status === 'processing') {
        this.$q.dialog({
        title: this.$t('common.attention'),
        message: `${this.$t("campanhas.dialogs.cancelCampaignError.message")}!`,
      })
        return
      }
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: `${this.$t("campanhas.dialogs.cancelCampaign.message")} "${campanha.name}"?`,
        cancel: {
          label: this.$t("common.no"),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t("common.yes"),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        CancelarCampanha(campanha.id)
          .then(res => {
            this.$notificarSucesso(this.$t("campanhas.notifications.campaignCanceled"))
            this.listarCampanhas(this.currentPage)
          }).catch(err => {
            this.$notificarErro(this.$t("campanhas.notifications.errorCancel"), err)
          })
      })
    },
    iniciarCampanha (campanha) {
      if (!this.isValidDate(campanha.start)) {
        this.$notificarErro(this.$t("campanhas.notifications.errorStart"))
      }

      if (campanha.contactsCount == 0) {
        this.$notificarErro(this.$t("campanhas.notifications.errorStartContact"))
      }

      if (campanha.status !== 'pending' && campanha.status !== 'canceled') {
        this.$notificarErro(this.$t("campanhas.notifications.errorStartCancel"))
      }

      IniciarCampanha(campanha.id).then(res => {
        this.$notificarSucesso(this.$t("campanhas.notifications.campaignStarted"))
        this.listarCampanhas(this.currentPage)
      }).catch(err => {
        this.$notificarErro(this.$t("campanhas.notifications.errorGeneral"), err)
      })
    },
    forcarFinalizacaoCampanha (campanha) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: `${this.$t("campanhas.dialogs.forceFinish.message")} "${campanha.name}"?`,
        cancel: {
          label: this.$t("common.no"),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t("common.yes"),
          color: 'positive',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        try {
          await AtualizarAckContatosCampanha(campanha.id)
          this.$notificarSucesso(this.$t("campanhas.notifications.campaignForceFinished"))
          this.listarCampanhas(this.currentPage)
        } catch (error) {
          this.$notificarErro(this.$t("campanhas.notifications.errorGeneral"), error)
        }
      })
    },
    pularMensagemAtual (campanha) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: `${this.$t("campanhas.dialogs.skipMessage.message")} "${campanha.name}"?`,
        cancel: {
          label: this.$t("common.no"),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t("common.yes"),
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        try {
          await this.pularMensagem(campanha.id)
          this.$notificarSucesso(this.$t("campanhas.notifications.messageSkipped"))
          this.listarCampanhas(this.currentPage)
        } catch (error) {
          this.$notificarErro(this.$t("campanhas.notifications.errorGeneral"), error)
        }
      })
    },
    async pularMensagem (campaignId) {
      const response = await PularMensagemCampanha(campaignId)
      return response.data
    },
  },
  mounted () {
    this.listarCampanhas()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.campanhas === true;
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
    const showModalCampanha = JSON.parse(localStorage.getItem('showWarningModalCampanhas'))
    this.showWarningModal = !showModalCampanha && showModalCampanha !== null ? false : true;
    // this.loadColors()
  }
}

</script>

<style lang="scss" scoped>
.q-banner {
  border-radius: 8px;
  background: rgba(var(--q-warning-rgb), 0.1) !important;
  border: 1px solid rgba(var(--q-warning-rgb), 0.2);
}

.q-banner.bg-red {
  background: #ff0000 !important;
  color: #ffffff !important;
  border: 1px solid #ffe58f !important;
}

.q-banner.bg-orange {
  background: orange !important;
  color: #ffffff !important;
  border: 1px solid #ffe58f !important;
}


.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: auto;

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

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

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

  .q-table thead tr th {
    background: rgba(var(--q-primary-rgb), 0.1);
    color: var(--q-primary);
    font-weight: 600;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .q-table tbody tr {
    transition: all 0.3s ease;

    &:hover {
      background: rgba(var(--q-primary-rgb), 0.05);
    }

    td {
      padding: 0.8rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .q-btn {
    border-radius: 6px;
    padding: 0.15rem 0.4rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;
    min-height: 24px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    &--flat {
      padding: 0.15rem;
      min-height: auto;
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

  &.bg-yellow {
    background: #fffbe6 !important;
    color: #222 !important;
    border: 1px solid #ffe58f !important;
  }

}

.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    .q-card-section {
      padding: 1.2rem 1.5rem;

      .text-h6 {
        color: var(--q-primary);
        font-weight: 600;
      }

      .q-banner {
        margin: 0.5rem 0;
      }
    }

    .q-card-actions {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.95);

      .q-btn {
        border-radius: 8px;
        padding: 0.4rem 1rem;
        font-weight: 500;
        letter-spacing: 0.3px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 0.9rem;
        min-height: 36px;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar-thumb {
      border-color: rgba(30, 30, 30, 0.8);
    }

    .q-table thead tr th {
      background: rgba(255, 255, 255, 0.05);
    }

    .q-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .q-banner {
    &.bg-yellow {
      background: #fffbe6 !important;
      color: #222 !important;
      border: 1px solid #ffe58f !important;
    }
  }

  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      .q-card-actions {
        background: rgba(30, 30, 30, 0.95);
      }
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
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

    .q-btn {
      width: auto;
      min-width: 80px;
      margin: 0;
    }
  }

  .q-dialog {
    .q-card {
      width: 95vw !important;
      border-radius: 12px;

      .q-card-section {
        padding: 1rem;
      }

      .q-card-actions {
        padding: 0.8rem;
        flex-direction: column;
        gap: 0.5rem;

        .q-btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
