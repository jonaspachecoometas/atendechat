<template>
  <div v-if="userProfile === 'superadmin'">
    <q-table
      flat
      bordered
      square
      hide-bottom
      style="border-radius: 8px"
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('tenantQueue.title')"
      :rows="filas"
      row-key="id"
      :columns="columns"
      :rows-per-page-options="[0]"
    >

      <template v-slot:top-right>
        <q-btn :label="$t('tenantQueue.updateQueues')"  color="primary" @click="listarFilas" style="margin-right: 10px;"/>
        <q-btn :label="$t('tenantQueue.openBullBoard')" color="primary" @click="abrirBullBoard" style="margin-right: 10px;"/>
        <q-btn :label="$t('tenantQueue.restartBackend')" color="negative" @click="restart" style="margin-right: 10px;"/>
        <q-btn :label="$t('tenantQueue.restartQueues')" color="negative" @click="reiniciarFilas" style="margin-right: 10px;"/>
        <q-card-section v-if="!loading">
          <q-item-section>
            <div>{{ $t('tenantQueue.queuesUpdated') }}</div>
            <div class="loading-bar"><div class="bar"></div></div>
          </q-item-section>
        </q-card-section>
        <!-- <q-btn label="Reiniciar Processamento" color="warning" @click="reiniciarFilas" /> -->
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn 
          icon="mdi-refresh-circle" 
          flat
          round 
          @click="reprocessarFila(props.row.queueName)" />
        </q-td>
      </template>
    </q-table>
  </div>

</template>

<script>
import { ListarQueue, ReiniciarQueue, ReprocessarServico } from 'src/service/tenants.js'
import { Restart } from 'src/service/pm2.js'

export default {
  data() {
    return {
      userProfile: 'user',
      loading: false,
      filas: [],
      filasIntervalId: null, // Adicionar referência para o interval
      // Sistema de gerenciamento de memória
      timers: [],
      columns: [
        { name: 'queueName', label: this.$t('tenantQueue.columns.queueName'), align: 'left', field: row => row.queueName, sortable: true },
        { name: 'failedCount', label: this.$t('tenantQueue.columns.failedCount'), align: 'center', field: row => row.failedCount, sortable: true },
        { name: 'activeCount', label: this.$t('tenantQueue.columns.activeCount'), align: 'center', field: row => row.activeCount, sortable: true },
        { name: 'waitingCount', label: this.$t('tenantQueue.columns.waitingCount'), align: 'center', field: row => row.waitingCount, sortable: true },
        { name: 'acoes', label: this.$t('tenantQueue.columns.actions'), field: 'acoes', align: 'center' }
      ]
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
      if (this.filasIntervalId) {
        clearInterval(this.filasIntervalId);
        this.filasIntervalId = null;
      }
    },
    async restart(){
      this.$q.dialog({
        title: this.$t('tenantQueue.dialogs.restartBackendTitle'),
        message: this.$t('tenantQueue.dialogs.restartBackendMessage'),
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
        await Restart() 
      })
    },
    listarFilas() {
      this.loading = true
      ListarQueue()
        .then(response => {
          this.filas = response.data
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    reiniciarFilas() {
      this.$q.dialog({
        title: this.$t('tenantQueue.dialogs.restartQueuesTitle'),
        message: this.$t('tenantQueue.dialogs.restartQueuesMessage'),
        html: true,
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
        this.loading = true
        ReiniciarQueue()
          .then(() => {
            this.listarFilas()
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    reprocessarFila(queueName) {
      if (!queueName) {
        console.error('Queue name is undefined');
        return;
      }
      this.loading = true
      ReprocessarServico(queueName)
        .then(() => {
          this.listarFilas()
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    abrirBullBoard() {
      this.$q.notify({
        html: true,
        message: this.$t('tenantQueue.notifications.bullBoardRedirect'),
        type: 'positive',
        progress: true,
        position: 'top',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      const timerId = setTimeout(() => {
        const url = process.env.URL_API + '/admin/queues/';
        window.open(url, '_blank');
      }, 3000);
      this.addTimer(timerId);
    }
  },
  mounted() {
    this.userProfile = localStorage.getItem('profile')
    this.listarFilas()
    this.filasIntervalId = setInterval(() => {
      this.listarFilas()
    }, 10000)
    this.addTimer(this.filasIntervalId);
  },
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-table__top {
    background: transparent;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .q-table__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--q-primary);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .q-table__control {
    gap: 0.3rem;
  }

  .q-btn {
    border-radius: 4px;
    padding: 0.25rem 0.6rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 0.8rem;
    min-height: 28px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    &--negative {
      background: rgba(var(--q-negative-rgb), 0.9);
      
      &:hover {
        background: var(--q-negative);
      }
    }
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
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .q-card-section {
    background: transparent;
    padding: 1rem;
  }

  .loading-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    
    .bar {
      width: 0;
      height: 100%;
      background: var(--q-primary);
      position: absolute;
      top: 0;
      left: 0;
      animation: loadingAnimation 10s infinite;
      border-radius: 2px;
    }
  }
}

@keyframes loadingAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

/* Estilos para o modo escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);

    .q-table thead tr th {
      background: rgba(255, 255, 255, 0.05);
    }

    .q-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .q-btn {
      &--negative {
        background: rgba(var(--q-negative-rgb), 0.8);
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
      padding: 0.6rem;
      flex-direction: column;
      gap: 0.3rem;
    }

    .q-table__control {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.3rem;
    }

    .q-btn {
      width: auto;
      min-width: 90px;
      margin: 0;
    }
  }
}
</style>
