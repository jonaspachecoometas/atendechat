<template>
  <div>
    <q-tabs class="text-teal" align="left">
      <q-route-tab
        to="/grupo/massagrupos"
        name="bulkgroups"
        no-caps
        icon="mdi-account-details-outline"
        :label="$t('grupoIndex.tabs.bulkgroups')"
      />
      <q-route-tab
        to="/grupo/massagrupos2"
        name="bulkgroups2"
        no-caps
        icon="mdi-account-cog-outline"
        :label="$t('grupoIndex.tabs.bulkgroups2')"
      />
      <q-route-tab
        to="/grupo/massausuarios"
        name="bulkuser"
        no-caps
        icon="mdi-account-convert-outline"
        :label="$t('grupoIndex.tabs.bulkuser')"
      />
      <q-route-tab
        to="/grupo/banlist"
        name="banlist"
        no-caps
        icon="mdi-account-cancel-outline"
        :label="$t('grupoIndex.tabs.banlist')"
      />
      <q-route-tab
        to="/grupo/wordlist"
        name="wordlist"
        no-caps
        icon="mdi-chat-alert-outline"
        :label="$t('grupoIndex.tabs.wordlist')"
      />
      <q-route-tab
        to="/grupo/saudacao"
        name="greetings"
        no-caps
        icon="mdi-account-arrow-right-outline"
        :label="$t('grupoIndex.tabs.greetings')"
      />
      <q-route-tab
        to="/grupo/despedida"
        name="farewell"
        no-caps
        icon="mdi-account-arrow-right-outline"
        :label="$t('grupoIndex.tabs.farewell')"
      />
    </q-tabs>
        <q-banner style="margin-top: 10px; border-radius: 0px;" class="custom-banner" inline-actions>
          <p>{{ $t('grupoIndex.banner.stability') }}</p>
        </q-banner>
    <router-view />
    <q-dialog v-model="showWarningModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ $t('grupoIndex.banner.warning.title') }}
          </div>
          <div class="text-body1 q-mt-md">
            <q-banner class="bg-orange text-black q-mt-md" dense rounded>
              <q-icon name="warning" size="md" class="q-mr-sm" />
              <div class="text-subtitle1">
                {{ $t('grupoIndex.banner.warning.blockRisk') }}
              </div>
              <div class="text-bold">
                {{ $t('grupoIndex.banner.warning.realRisk') }}
              </div>
            </q-banner>
            <div class="text-body1 q-mb-md">
              <b>{{ $t('grupoIndex.banner.warning.spamTolerance') }}</b><br />
              {{ $t('grupoIndex.banner.warning.monitoring') }}
            </div>
            <q-banner class="bg-red text-black q-mt-md" dense rounded>
              <q-icon name="error" size="md" class="q-mr-sm" />
              <div class="text-subtitle1">
                {{ $t('grupoIndex.banner.warning.attention') }}
              </div>
            </q-banner>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('grupoIndex.dialog.cancelButton')" color="negative" @click="cancelNavigation" />
          <q-btn flat :label="$t('grupoIndex.dialog.confirmButton')" color="positive" @click="confirmNavigation" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { MostrarCores } from 'src/service/empresas.js';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      showWarningModal: false,
      colors: {},
      userProfile: 'user',
      usuario
    }
  },
  methods: {
    cancelNavigation() {
      this.showWarningModal = false;
      this.$router.push({ name: 'home-dashboard' }); // Use 'push' para navegar para a rota correta
    },
    confirmNavigation() {
      localStorage.setItem('showWarningModalGrupos', false)
      this.showWarningModal = false;
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
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
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
    const showModalGrupo = JSON.parse(localStorage.getItem('showWarningModalGrupos'))
    this.showWarningModal = !showModalGrupo && showModalGrupo !== null ? false : true;
    // this.loadColors()
  },
})
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

.q-tabs {
  background: rgba(255,255,255,0.85);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.5rem 0 0.5rem;
  backdrop-filter: blur(6px);
}
.q-route-tab {
  border-radius: 8px 8px 0 0;
  margin-right: 0.2rem;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}
.q-route-tab.q-tab--active {
  background: var(--q-primary);
  color: #fff !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}
.q-card-section .text-h6 {
  font-weight: 700;
  color: var(--q-primary);
}
.q-btn {
  border-radius: 4px;
  min-width: 20px;
  min-height: 20px;
  padding: 0.08rem 0.4rem;
  font-size: 0.78rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}
.q-btn:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.11);
  background: rgba(var(--q-primary-rgb), 0.09);
}
.q-dialog .q-card {
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border: 1px solid rgba(0,0,0,0.08);
}
.custom-banner {
  border-radius: 10px;
  margin-bottom: 0.5rem;
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
}
body.body--dark .q-tabs {
  background: rgba(30,30,30,0.98);
}
body.body--dark .q-card, body.body--dark .q-dialog .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
body.body--dark .q-route-tab.q-tab--active {
  background: var(--q-primary);
  color: #fff !important;
}
body.body--dark .custom-banner {
  background: #23234a !important;
  color: #e0e0e0 !important;
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
  .q-tabs {
    border-radius: 10px 10px 0 0;
    padding: 0.1rem 0.2rem 0 0.2rem;
  }
}
</style>
