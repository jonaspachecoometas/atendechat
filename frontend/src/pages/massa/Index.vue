<template>
  <div>
    <q-tabs class="text-teal" align="left">
      <q-route-tab
        to="/massa/template"
        name="bulkTemplate"
        no-caps
        icon="mdi-rocket"
        :label="$t('massaGeral.tabs.template')"
      />
      <q-route-tab
        to="/massa/template-variavel"
        name="bulkTemplateVariable"
        no-caps
        icon="mdi-rocket"
        :label="$t('massaGeral.tabs.templateVariable')"
      />
      <q-route-tab
        to="/massa/texto"
        name="bulktext"
        no-caps
        icon="mdi-rocket"
        :label="$t('massaGeral.tabs.text')"
      />
      <q-route-tab
        to="/massa/textovariavel"
        name="bulktextVariavel"
        no-caps
        icon="mdi-rocket"
        :label="$t('massaGeral.tabs.textVariable')"
      />
      <q-route-tab
        to="/massa/wavoip"
        name="bulktextWavoip"
        no-caps
        icon="mdi-rocket"
        :label="$t('massaGeral.tabs.wavoip')"
      />
      <q-route-tab
        to="/massa/sms"
        name="bulktextSMS"
        no-caps
        icon="mdi-rocket"
        :label="$t('massaGeral.tabs.sms')"
      />
      <q-route-tab
        to="/massa/relatorio"
        name="bulkRelatorio"
        no-caps
        icon="mdi-file-chart"
        :label="$t('massaGeral.tabs.report')"
      />
    </q-tabs>
    <router-view />
    <q-dialog v-model="showWarningModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('massaGeral.dialog.title') }}</div>
          <div class="text-body1 q-mt-md">
            <div>
              <q-banner class="bg-orange text-black q-mt-md" dense rounded>
                <q-icon name="warning" size="md" class="q-mr-sm" />
                <div class="text-subtitle1">
                  {{ $t('massaGeral.dialog.description.importantNotice.title') }}
                </div>
                <div class="text-bold">
                  {{ $t('massaGeral.dialog.description.importantNotice.content') }}
                </div>
              </q-banner>
              <div class="text-body1 q-mb-md">
                <b>{{ $t('massaGeral.dialog.description.additionalInfo.title') }}</b><br />
                {{ $t('massaGeral.dialog.description.additionalInfo.content') }}
              </div>
              <q-banner class="bg-red text-black q-mt-md" dense rounded>
                <q-icon name="error" size="md" class="q-mr-sm" />
                <div class="text-subtitle1">
                  {{ $t('massaGeral.dialog.description.alert.title') }}
                </div>
                <div v-html="$t('massaGeral.dialog.description.alert.content')"></div>
              </q-banner>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('massaGeral.dialog.actions.exit')"
            color="negative"
            @click="cancelNavigation"
          />
          <q-btn
            flat
            :label="$t('massaGeral.dialog.actions.continue')"
            color="positive"
            @click="confirmNavigation"
          />
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
      localStorage.setItem('showWarningModalDisparo', false)
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
    const showModalDisparo = JSON.parse(localStorage.getItem('showWarningModalDisparo'))
    // this.loadColors()
    this.showWarningModal = !showModalDisparo && showModalDisparo !== null ? false : true
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
