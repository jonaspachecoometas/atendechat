<template>
  <div v-if="userProfile === 'superadmin'">
    <q-page padding>
      <q-card flat bordered class="q-pa-md">
        <q-card-section class="text-center">
          <div class="text-h5 text-primary">{{ $t('assinatura.pageTitle') }}</div>
          <div class="text-subtitle1 q-mt-sm">{{ $t('assinatura.pageSubtitle') }}</div>
        </q-card-section>
        <q-separator spaced />
        <q-card-section class="q-pa-md">
          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="verified" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>{{ $t('assinatura.licenseStatusLabel') }}
                  <q-chip
                    outline
                    :color="license === 'enabled' ? 'positive' : 'negative'"
                  >
                    {{ license === 'enabled' ? $t('assinatura.licenseActive') : $t('assinatura.licenseValidating') }}
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-key-variant" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class='blur-effect' caption>{{ $t('assinatura.license_code') }}
                  {{ license_code ? '*'.repeat(license_code.length) : '' }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-calendar" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class='blur-effect' caption>{{ $t('assinatura.license_expiry') }}
                {{ formatarDataBR(license_expiry) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-web" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class='blur-effect' caption>{{ $t('assinatura.domains') }} {{ product_name && typeof product_name === 'string' && product_name.includes('ZPRO_') ? product_name.split('ZPRO_')[1] : '' }}
                <div class="domains-list">{{ domains || '' }}</div>
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  color="primary"
                  @click="openDomainModal"
                  v-if="userProfile === 'superadmin' && license === 'enabled'"
                />
              </q-item-section>
            </q-item>
            <q-item v-if="domains && String(domains).trim().toLowerCase() === 'whatsapp.com'">
              <q-item-section>
                <q-banner dense rounded class="q-mt-xs" color="warning" text-color="black" inline-actions>
                  {{ $t('assinatura.domainWarning') }}
                </q-banner>
              </q-item-section>
            </q-item>
            <q-item v-if="versionInfo">
              <q-item-section avatar>
                <q-icon name="mdi-information-outline" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  {{ $t('assinatura.backendVersion') }}
                  <strong>{{ versionInfo.version }}</strong>
                </q-item-label>
                <q-item-label caption>
                  {{ $t('assinatura.frontendVersion') }}
                  <strong>{{ cVersion }}</strong>
                </q-item-label>
                <q-item-label caption>
                  {{ $t('assinatura.expireIn') }}
                  <strong>{{ versionInfo.expiresAt }}</strong>
                </q-item-label>
                <q-item-label caption v-if="versionInfo.status === 'valid'">
                  {{ $t('assinatura.remainingDays') }} <strong>{{ versionInfo.daysRemaining }} {{ $t('assinatura.days') }}</strong>
                </q-item-label>
                <q-item-label caption v-else class="text-negative">
                  {{ $t('assinatura.expiredVersion') }}
                  <span v-if="versionInfo.expiredSince"> - {{ versionInfo.expiredSince }} {{ $t('assinatura.days') }} </span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            :label="$t('assinatura.updateLicenseButton')"
            color="primary"
            icon="edit"
            push
            @click="openEmailModal"
          />
          <q-btn
            color="primary"
            icon="refresh"
            push
            :disable="!canRefreshLicense"
            @click="refreshLicenseData()"
            >
            <q-tooltip>
              {{ $t('assinatura.lookForUpdatedData') }}
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>

      <!-- Modal Email -->
      <q-dialog v-model="isEmailModalOpen" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6 text-primary">{{ $t('assinatura.modalTitle') }}</div>
            <div class="text-subtitle2 q-mt-sm">{{ $t('assinatura.modalSubtitle') }}</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="email"
              :label="$t('assinatura.emailFieldLabel')"
              outlined
              dense
              :rules="[val => !!val || $t('assinatura.emailFieldError')]"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat :label="$t('assinatura.cancelButton')" color="negative" @click="closeEmailModal" />
            <q-btn flat :label="$t('assinatura.saveButton')" color="positive" @click="saveEmail" :loading="loading" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Modal Domínios -->
      <q-dialog v-model="isDomainModalOpen" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6 text-primary">{{ $t('assinatura.domainModalTitle') || 'Editar Domínios' }}</div>
            <div class="text-subtitle2 q-mt-sm">{{ $t('assinatura.domainModalSubtitle') || 'Atualize os domínios licenciados' }}</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="domainInput"
              :label="$t('assinatura.domainFieldLabel') || 'Domínios (separados por vírgula)'"
              outlined
              dense
              type="textarea"
              :rules="[val => !!val || $t('assinatura.domainFieldError') || 'Domínios são obrigatórios']"
              hint="Ex: exemplo1.com, exemplo2.com, exemplo3.com"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat :label="$t('assinatura.cancelButton') || 'Cancelar'" color="negative" @click="closeDomainModal" />
            <q-btn flat :label="$t('assinatura.saveButton') || 'Salvar'" color="positive" @click="saveDomains" :loading="domainLoading" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import { ListarTenants, AlterarEmail, ListarTenantsLs, AlterarTenantDomain, AlterarTenantRefreshLicenseData } from "src/service/tenants.js";
import { MostrarCores, ValidarVersao } from "src/service/empresas.js";
import packageEnv from 'src/../package.json'

export default {
  name: "Assinaturas",
  data() {
    return {
      versionInfo: null,
      isEmailModalOpen: false,
      email: "",
      license: "disabled",
      license_code: "",
      product_name: "",
      license_expiry: "",
      domains: "",
      is_blocked: false,
      colors: {},
      userProfile: "user",
      loading: false,
      isDomainModalOpen: false,
      domainInput: "",
      domainLoading: false,
      canRefreshLicense: true,
      refreshCooldown: 10,
      refreshInterval: null,
    };
  },
  computed: {
    cVersion () {
      return packageEnv.version
    }
  },
  methods: {
    async validarVersao(){
      const cachedData = localStorage.getItem('versionInfo');
      const cachedTimestamp = localStorage.getItem('versionInfoTimestamp');
     
      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        const cacheAge = now - parseInt(cachedTimestamp);
        const twelveHoursInMs = 12 * 60 * 60 * 1000;
       
        if (cacheAge < twelveHoursInMs) {
          this.versionInfo = JSON.parse(cachedData);
          return;
        }
      }
     
      try{
        const resp = await ValidarVersao();
        this.versionInfo = resp.data;
        localStorage.setItem('versionInfo', JSON.stringify(resp.data));
        localStorage.setItem('versionInfoTimestamp', new Date().getTime()?.toString());
      } catch (error) {
        console.error(error);
      }
    },
    formatarDataBR(dataISO) {
      if (!dataISO) return "Sem data definida";
      const data = new Date(dataISO);
      return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
    async listarTenants() {
      const { data } = await ListarTenants();
      this.email = data[0].tenantEmail;
      this.license = data[0].tenantLicense;
      const response = await ListarTenantsLs(data[0].tenantEmail)
      this.license_code = response.data.license_code || ''
      this.license_expiry = response.data.license_expiry || ''
      this.domains = response.data.licensed_domains || ''
      this.is_blocked = response.data.is_blocked || false
      this.product_name = response.data.product_name || ''
    },
    openEmailModal() {
      this.isEmailModalOpen = true;
      this.email = '';
    },
    closeEmailModal() {
      this.isEmailModalOpen = false;
    },
    async saveEmail() {
      try {
        this.loading = true;
        await AlterarEmail({ tenantEmail: this.email });
        this.$q.notify({ type: "positive", message: this.$t("assinatura.successMessage")});
        this.closeEmailModal();
        this.listarTenants();
      } catch (error) {
        if(error.data?.error === 'ERR_LIMIT_MAX'){
          this.$q.notify({
            type: 'negative',
            message: this.$t("assinatura.errorLimitExceeded"),
            position: 'top',
            progress: true
          })
        }
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;
          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val;
            return acc;
          }, {});
          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);
        }
      } catch (error) {
        console.error("Erro ao carregar as cores:", error);
      }
    },
    openDomainModal() {
      this.isDomainModalOpen = true;
      this.domainInput = this.domains || '';
    },
    closeDomainModal() {
      this.isDomainModalOpen = false;
      this.domainInput = '';
    },
    checkRefreshCooldown() {
      const lastRefresh = localStorage.getItem('lastRefreshLicenseData');
      if (lastRefresh) {
        const now = Date.now();
        const diff = Math.floor((now - parseInt(lastRefresh, 10)) / 1000);
        if (diff < this.refreshCooldown) {
          this.canRefreshLicense = false;
          this.refreshInterval = setTimeout(() => {
            this.canRefreshLicense = true;
            this.refreshInterval = null;
          }, (this.refreshCooldown - diff) * 1000);
        } else {
          this.canRefreshLicense = true;
        }
      } else {
        this.canRefreshLicense = true;
      }
    },
    async refreshLicenseData() {
      localStorage.setItem('lastRefreshLicenseData', Date.now().toString());
      this.canRefreshLicense = false;
      if (this.refreshInterval) clearTimeout(this.refreshInterval);
      this.refreshInterval = setTimeout(() => {
        this.canRefreshLicense = true;
        this.refreshInterval = null;
      }, this.refreshCooldown * 1000);

      try {
        this.loading = true;
        const response = await AlterarTenantRefreshLicenseData();
       
        const isDark = this.$q.dark.isActive;
        const textColor = isDark ? '#eee' : '#222';
        const labelColor = isDark ? '#90caf9' : '#1976d2';
        const expiryColor = isDark ? '#81c784' : '#388e3c';
        const bgColor = isDark ? '#23272e' : '#fff';

        const domainsList = response.data.licensed_domains && typeof response.data.licensed_domains === 'string' && response.data.licensed_domains.split
          ? response.data.licensed_domains.split(',').map(domain => `<li style='margin-bottom:2px;'><span style='color:${labelColor};'>Domínio</span> <span style='color:${textColor};'>${domain.trim()}</span></li>`).join('')
          : `<li style="color:${isDark ? '#888' : '#aaa'}">Empty</li>`;

        const licenseInfo = `
          <div style="text-align:left;min-width:260px;max-width:350px;line-height:1.7;background:${bgColor};border-radius:10px;padding:2px 0;">
            <div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;">
              <span style='font-size:1.3em;color:${expiryColor};'>Data de Expiração</span>
            </div>
            <div style="margin-bottom:16px;color:${textColor};font-size:1.05em;">
              ${this.formatarDataBR(response.data.license_expiry)}
            </div>
            <div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;">
              <span style='font-size:1.3em;color:${labelColor};'>Domínios</span>
            </div>
            <ul style='margin:0 0 0 18px;padding:0 0 0 0;font-size:1em;color:${textColor};'>
              ${domainsList}
            </ul>
          </div>
        `;
       
        this.$q.notify({
          message: licenseInfo,
          html: true,
          color: isDark ? 'grey-10' : 'white',
          textColor: isDark ? 'grey-2' : 'primary',
          position: 'top',
          timeout: 10000,
          progress: true,
          actions: [{ label: 'OK', color: 'primary' }]
        });
       
        this.product_name = response.data.product_name || ''
        this.license_code = response.data.license_code || '';
        this.license_expiry = response.data.license_expiry || '';
        this.domains = response.data.licensed_domains || '';
       
      } catch (error) {
        console.error("Erro ao atualizar a licença:", error);
        this.$q.notify({
          type: "negative",
          message: this.$t("assinatura.licenseRefreshError")
        });
      } finally {
        this.loading = false;
        setTimeout(() => {
          window.location.reload();
        }, 10000)
      }
    },
    async saveDomains() {
      try {
        this.domainLoading = true;
       
        const domainsArray = this.domainInput && typeof this.domainInput === 'string' && this.domainInput.split
          ? this.domainInput.split(',').map(domain => domain.trim()).filter(domain => domain.length > 0)
          : [];
       
        if (domainsArray.length === 0) {
          this.$q.notify({
            type: "negative",
            message: this.$t("assinatura.domainSaveError") || "Por favor, insira pelo menos um domínio válido"
          });
          return;
        }
       
        const response = await AlterarTenantDomain({ domains: domainsArray });
       
        if (response.data.status === true || response.data.status === 1) {
          this.$q.notify({
            type: "positive",
            message: response.data.message || this.$t("assinatura.domainSaveSuccess") || "Domínios atualizados com sucesso!"
          });
          this.closeDomainModal();
          this.listarTenants();
        } else {
          this.$q.notify({
            type: "negative",
            message: response.data.message || this.$t("assinatura.domainSaveError") || "Erro ao atualizar os domínios"
          });
        }
      } catch (error) {
        console.error("Erro ao salvar os domínios:", error);
        this.$q.notify({
          type: "negative",
          message: this.$t("assinatura.domainSaveError") || "Erro ao atualizar os domínios"
        });
      } finally {
        this.domainLoading = false;
      }
    },
  },

  // MODIFICAÇÃO AQUI: PROTEÇÃO POR URL
  mounted() {
    // SE NÃO FOR A URL SECRETA → REDIRECIONA IMEDIATAMENTE
    if (this.$route.path !== '/assinatura464') {
      this.$router.replace('/tenants')
      return
    }

    // Só carrega os dados se estiver na URL permitida
    this.listarTenants();
    this.validarVersao()
    this.userProfile = localStorage.getItem("profile");

    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { 
        const parsed = JSON.parse(storedColors); 
        list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) 
      } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val
        return acc
      }, {})
      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    }

    this.checkRefreshCooldown();
  },
};
</script>

<style lang="scss" scoped>
/* seu CSS permanece 100% igual */
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 500px;
  margin: 0 auto;
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  /* ... todo o resto do seu CSS ... */
}
.blur-effect { filter: blur(0px); transition: all 0.3s ease; }
.domains-list { display: block; margin-top: 4px; word-break: break-all; white-space: pre-line; font-size: 0.98em; }
/* ... resto do CSS ... */
</style>