<template>
  <div class="q-my-md" v-if="(userProfile === 'admin')">
    <q-card flat bordered class="my-sticky-dynamic q-ma-lg">
      <q-card-section>
        <div class="text-h5">{{ $t('callLogs.title') || 'Logs de Chamadas' }}</div>
        <div class="text-caption">{{ $t('callLogs.subtitle') || 'Registros de chamadas realizadas e recebidas' }}</div>
      </q-card-section>
      <q-card-section>
        <q-btn @click="downloadReport" :label="$t('callLogs.downloadReport')" color="primary" />
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="callLogs"
          :columns="columns"
          row-key="id"
          flat
          bordered
          dense
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarCallLogs } from 'src/service/callLog.js';

export default {
  name: 'CallLogsIndex',
  data() {
    return {
      userProfile: 'user',
      callLogs: [],
      columns: [
        { name: 'id', label: this.$t('callLogs.columns.id') || 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'user', label: this.$t('callLogs.columns.user') ||'Usuário', align: 'left', field: 'user', sortable: true, format: val => val?.name || 'N/A' },
        { name: 'originNumber', label: this.$t('callLogs.columns.originNumber') || 'Número de Origem', align: 'left', field: 'originNumber', sortable: true },
        { name: 'destinationNumber', label: this.$t('callLogs.columns.destinationNumber') || 'Número de Destino', align: 'left', field: 'destinationNumber', sortable: true },
        { name: 'callStatus', label: this.$t('callLogs.columns.callStatus') || 'Status da Chamada', align: 'left', field: 'callStatus', sortable: true, format: this.formatCallStatus },
        { name: 'callDuration', label: this.$t('callLogs.columns.callDuration') || 'Duração', align: 'left', field: 'callDuration', sortable: true },
        { name: 'createdAt', label: this.$t('callLogs.columns.createdAt') || 'Data de Criação', align: 'left', field: 'createdAt', sortable: true, format: this.formatDate }
      ]
    };
  },
  methods: {
    async fetchCallLogs() {
      try {
        const response = await ListarCallLogs();
        this.callLogs = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar logs de chamadas:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    formatCallStatus(status) {
      const statusMap = {
        'Calling': this.$t('callLogs.status.calling'),
        'Received': this.$t('callLogs.status.received'),
        'Accepted': this.$t('callLogs.status.accepted'),
        'Completed': this.$t('callLogs.status.completed'),
        'Ended': this.$t('callLogs.status.ended')
      };
      return statusMap[status] || status;
    },
    downloadReport() {
      const csvContent = this.callLogs.map(log => {
        return [
          log.id,
          log.originNumber,
          log.destinationNumber,
          this.formatCallStatus(log.callStatus),
          log.callDuration,
          this.formatDate(log.createdAt)
        ].join(',');
      }).join('\n');

      const csvHeader = 'ID,Número de Origem,Número de Destino,Status da Chamada,Duração,Data de Criação\n';
      const csvData = '\uFEFF' + csvHeader + csvContent;

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'report_call_logs.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    await this.fetchCallLogs();
  }
};
</script>

<style lang="scss" scoped>
.q-my-md {
  padding: 1rem;
}

.my-sticky-dynamic {
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
}
</style> 
