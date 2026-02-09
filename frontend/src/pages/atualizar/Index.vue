<template>
  <q-page class="q-pa-md" v-if="userProfile === 'superadmin'">
    <div class="q-gutter-md row justify-around">
      <!-- Card para iniciar o processo de atualização -->
      <q-card flat bordered class="my-card col-12 col-md-11">
        <q-card-section>
          <div class="text-center q-pa-md">
            <div class="text-h6">{{ $t('atualizar.updateTitle') }}
              <q-chip
                
                :color="license === 'enabled' ? 'positive' : 'negative'"
              >
                {{ license === 'enabled' ? $t('assinatura.licenseActive') : $t('assinatura.licenseValidating') }}
              </q-chip>
              <q-chip v-if="isUpdating" clickable  @click="liberarUpdate">{{ $t('assinatura.forceReleaseUpdateButton') }}</q-chip>
            </div>
            <q-banner
              class="bg-yellow text-black"
              inline-actions
              style="margin-top: 10px;margin-bottom: -30px;"
            >
              <p>{{ $t('atualizar.updateBanner') }}
              </p>
            </q-banner>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pa-md">
          <q-btn color="negative" @click="startUpdateProcess" :disabled="isUpdating || updatingProcess || license !== 'enabled'" class="q-mt-sm">
            {{ $t('atualizar.updateButton') }}
          </q-btn>
        </q-card-actions>
        <q-card-section v-if="updatingProcess" class="q-pa-md">
          <q-linear-progress indeterminate color="negative" />
        </q-card-section>
      </q-card>

      <!-- Card para iniciar o processo de migração -->
      <q-card flat bordered class="my-card col-12 col-md-5">
        <q-card-section>
          <div class="text-center q-pa-md">
            <q-icon name="mdi-transfer" size="30px" color="negative" />
            <div class="text-h6">{{ $t('atualizar.migrationTitle') }}</div>
            <q-banner
              class="bg-yellow text-black"
              inline-actions
              style="margin-top: 10px;margin-bottom: -30px;"
            >
              <p>{{ $t('atualizar.migrationBanner') }}</p>
            </q-banner>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pa-md">
          <q-btn
            color="negative"
            @click="startMigrationProcess"
            class="q-mt-sm"
          >
            {{ $t('atualizar.migrationButton') }}
          </q-btn>
        </q-card-actions>
      </q-card>

      <!-- Card para iniciar o processo de limpeza -->
      <q-card flat bordered class="my-card col-12 col-md-5">
        <q-card-section>
          <div class="text-center q-pa-md">
            <q-icon name="mdi-delete-outline" size="30px" color="negative" />
            <div class="text-h6">{{ $t('atualizar.cleanTitle') }}</div>
            <q-banner
              class="bg-yellow text-black"
              inline-actions
              style="margin-top: 10px;margin-bottom: -30px;"
            >
              <p>{{ $t('atualizar.cleanBanner') }}</p>
            </q-banner>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-pa-md">
          <q-btn color="negative" @click="startCleanProcess" class="q-mt-sm">
            {{ $t('atualizar.cleanButton') }}
          </q-btn>
        </q-card-actions>
      </q-card>

    </div>
  </q-page>
</template>

<script>
import { UploadZip, Update, MigrarArquivos, LimparArquivos } from 'src/service/customizar.js';
import { ListarTenants, LiberarUpdate } from "src/service/tenants.js";
import { socketIO } from 'src/utils/socket.js'
const socket = socketIO()
const tenantId = JSON.parse(localStorage.getItem('usuario'))

export default {
  data() {
    return {
      license: "disabled",
      userProfile: 'user',
      uploading: false,
      updatingProcess: false,
      selectedUpdateFile: null,
      selectedFileName: '',
      uploadProgress: 0,
      updateReady: false,
      isUpdating: false,
      // Sistema de gerenciamento de memória
      timers: []
    };
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
    async liberarUpdate(){
      const updatedData = { id: tenantId.tenantId, isUpdating: false };
      await LiberarUpdate(updatedData)
      this.updatingProcess = true;
      const timerId = setTimeout(() => {
        window.location.reload();
      }, 500)
      this.addTimer(timerId);
    },
    async listarTenants() {
      const { data } = await ListarTenants();
      this.license = data[0].tenantLicense;
      this.isUpdating = data[0].isUpdating;
    },
    triggerUpdateFileInput() {
      this.$refs.updateFileInput.click();
    },
    handleUpdateFileUpload(event) {
      const target = event.target;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file.name === 'update_rapido.zip') {
          this.selectedUpdateFile = file;
          this.selectedFileName = file.name;
        } else {
          this.selectedUpdateFile = null;
          this.selectedFileName = '';
          this.$q.notify({
            color: 'negative',
            message: this.$t("atualizar.fileValidationError"),
            timeout: 2000
          });
        }
      }
    },
    async uploadUpdateFile() {
      if (!this.selectedUpdateFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedUpdateFile);

      this.uploading = true;
      this.uploadProgress = 0;

      try {
        const response = await UploadZip(formData, {
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        });
        if (response.status === 200) {
          this.updateReady = true;
          this.$q.notify({
            color: 'positive',
            message: this.$t("atualizar.uploadSuccess"),
            timeout: 2000
          });
        } else {
          this.$q.notify({
            color: 'negative',
            message: this.$t("atualizar.uploadError"),
            timeout: 2000
          });
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: this.$t("atualizar.uploadError") + JSON.stringify(error),
          timeout: 2000
        });
      } finally {
        this.uploading = false;
        this.uploadProgress = 0;
      }
    },
    async startUpdateProcess() {
      this.updatingProcess = true;
      try {
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: this.$t('atualizar.buttonWarning'),
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
            const response = await Update();
            if (response.status === 200) {
              this.$q.notify({
                color: 'positive',
                message: this.$t("atualizar.updateStartSuccess"),
                timeout: 2000
              });
            } else {
              // this.$q.notify({
              //   color: 'negative',
              //   message: this.$t("atualizar.updateStartError"),
              //   timeout: 2000
              // });
              // this.updatingProcess = false;
            }
          } catch (err) {
            // this.$q.notify({
            //   color: 'negative',
            //   message: this.$t("atualizar.updateStartError") + ' - ' + (err?.message || 'Error'),
            //   timeout: 2000
            // });
            // this.updatingProcess = false;
          }
        }).onCancel(async () => {
          this.updatingProcess = false;
        })
        
      } catch (error) {
        // this.updatingProcess = false;
        this.$q.notify({
          color: 'negative',
          message: this.$t("atualizar.updateStartError") + JSON.stringify(error),
          timeout: 2000
        });
      }
    },
    async startMigrationProcess() {
      try {
        const response = await MigrarArquivos();
        if (response.status === 200) {
          this.$q.notify({
            color: 'positive',
            message: this.$t("atualizar.migrationStartSuccess"),
            timeout: 2000
          });
        } else {
          this.$q.notify({
            color: 'negative',
            message: this.$t("atualizar.migrationStartError"),
            timeout: 2000
          });
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: this.$t("atualizar.migrationStartError") + JSON.stringify(error),
          timeout: 2000
        });
      }
    },
    async startCleanProcess() {
      try {
        const response = await LimparArquivos();
        if (response.status === 200) {
          this.$q.notify({
            color: 'positive',
            message: this.$t("atualizar.cleanStartSuccess"),
            timeout: 2000
          });
        } else {
          this.$q.notify({
            color: 'negative',
            message: this.$t("atualizar.cleanStartError"),
            timeout: 2000
          });
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: this.$t("atualizar.cleanStartError") + JSON.stringify(error),
          timeout: 2000
        });
      }
    },
  },
  mounted() {
    this.userProfile = localStorage.getItem('profile');
    this.listarTenants();
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const socketChannel = `${usuario.tenantId}:updateList`;

    socket.on(socketChannel, data => {
      const msg = data?.payload?.message;

      console.log('Update SOCKET:', msg);

      if (msg !== 'Restarting services!') {
        this.updatingProcess = true;
        this.$q.notify({
          message: msg,
          type: 'warning',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      }

      if (msg === 'Restarting services!') {
        const timerId = setTimeout(() => {
          this.$q.notify({
            message: msg,
            type: 'warning',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          });
          // this.updatingProcess = false;
        }, 2000);
        this.addTimer(timerId);
      }
    });
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 1rem auto;

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
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .q-icon {
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.q-banner {
  border-radius: 8px;
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
  margin: 1rem 0;
  transition: all 0.3s ease;

  p {
    margin: 0;
    font-weight: 500;
  }
}

.q-chip {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
}

.q-linear-progress {
  border-radius: 4px;
  height: 4px;
}

/* Modo Escuro */
body.body--dark {
  .my-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .text-h6 {
      color: var(--q-primary);
    }
  }

  .q-banner {
    background: #fffbe6 !important;
    color: #222 !important;
    border: 1px solid #ffe58f !important;
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .my-card {
    margin: 0.5rem;
    border-radius: 12px;

    .q-card-section {
      padding: 1rem;

      .text-h6 {
        font-size: 1rem;
        flex-direction: column;
        gap: 0.3rem;
      }
    }
  }

  .q-banner {
    margin: 0.5rem 0;
    padding: 0.8rem;
    border-radius: 8px;
  }
}
</style>
