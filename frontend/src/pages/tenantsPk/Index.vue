<template>
  <q-page>
    <div id="app" v-if="userProfile === 'superadmin'">
      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-h6">{{ $t('tenantsPk.titles.environmentVariables') }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list bordered padding>
            <q-item 
              v-for="(value, key, index) in envData" 
              :key="key" 
              :class="{
                'row-light': !$q.dark.isActive && index % 2 === 0,
                'row-dark': !$q.dark.isActive && index % 2 !== 0,
                'row-light-dark': $q.dark.isActive && index % 2 === 0,
                'row-dark-dark': $q.dark.isActive && index % 2 !== 0
              }"
              >
              <q-item-section>{{ key }}</q-item-section>
              <q-item-section>{{ value }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-h6">{{ $t('tenantsPk.titles.packageJsonData') }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list bordered padding>
            <q-item 
            v-for="(value, key, index) in packageData" 
            :key="key" 
            :class="{
                'row-light': !$q.dark.isActive && index % 2 === 0,
                'row-dark': !$q.dark.isActive && index % 2 !== 0,
                'row-light-dark': $q.dark.isActive && index % 2 === 0,
                'row-dark-dark': $q.dark.isActive && index % 2 !== 0
              }"
            >
              <q-item-section>{{ key }}</q-item-section>
              <q-item-section>{{ value }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { MostrarCores } from 'src/service/empresas.js';
import { ListarTenantsEv, ListarTenantsPk } from 'src/service/tenants.js';

export default {
  name: 'App',
  data() {
    return {
      colors: {},
      envData: {},
      packageData: {},
      userProfile: 'user'
    };
  },
  methods: {
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

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    async loadEnvData() {
      try {
        const response = await ListarTenantsEv();
        if (response && response.status === 200) {
          const raw = response.data && (response.data.data ?? response.data)
          if (Array.isArray(raw)) {
            // Converte array para objeto indexado para exibição estável
            this.envData = raw.reduce((acc, v, i) => {
              acc[i] = v
              return acc
            }, {})
          } else if (raw && typeof raw === 'object') {
            this.envData = raw
          } else {
            this.envData = { value: String(raw ?? '') }
          }
        } else {
          console.error(this.$t('tenantsPk.errors.loadEnvData'))
        }
      } catch (error) {
        console.error(this.$t('tenantsPk.errors.loadEnvData'), error?.message || error)
      }
    },
    async loadPackageData() {
      try {
        const response = await ListarTenantsPk();
        if (response && response.status === 200) {
          const raw = response.data && (response.data.data ?? response.data)
          if (Array.isArray(raw)) {
            this.packageData = raw.reduce((acc, v, i) => {
              acc[i] = v
              return acc
            }, {})
          } else if (raw && typeof raw === 'object') {
            this.packageData = raw
          } else {
            this.packageData = { value: String(raw ?? '') }
          }
        } else {
          console.error(this.$t('tenantsPk.errors.loadPackageData'))
        }
      } catch (error) {
        console.error(this.$t('tenantsPk.errors.loadPackageData'), error?.message || error)
      }
    },
  },
  mounted() {
    this.userProfile = localStorage.getItem('profile');
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val;
        return acc;
      }, {});

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors();
    this.loadEnvData();
    this.loadPackageData();
  }
};
</script>

<style lang="scss" scoped>
.q-page {
  padding: 1rem;
  background: linear-gradient(135deg, rgba(var(--q-primary-rgb), 0.05), rgba(var(--q-secondary-rgb), 0.05));
  min-height: 100vh;
}

.q-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 1.5rem;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .q-card-section {
    &:first-child {
      background: rgba(var(--q-primary-rgb), 0.05);
      padding: 1.2rem 1.5rem;
    }

    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .q-separator {
    background: rgba(255, 255, 255, 0.1);
  }
}

.q-list {
  border-radius: 12px;
  overflow: hidden;
  background: transparent !important;
  border: none !important;

  .q-item {
    padding: 0.8rem 1.2rem;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(var(--q-primary-rgb), 0.05);
    }

    .q-item__section {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
}

/* Modo Claro */
.row-light {
  background-color: rgba(245, 245, 245, 0.9);
  color: #212121;
}
.row-dark {
  background-color: rgba(255, 255, 255, 0.95);
  color: #212121;
}

/* Modo Escuro */
.row-light-dark {
  background-color: rgba(66, 66, 66, 0.7);
  color: #ffffff;
}
.row-dark-dark {
  background-color: rgba(97, 97, 97, 0.9);
  color: #ffffff;
}

/* Responsividade */
@media (max-width: 600px) {
  .q-page {
    padding: 0.5rem;
  }

  .q-card {
    margin-bottom: 1rem;
    border-radius: 12px;

    .q-card-section {
      &:first-child {
        padding: 1rem;
      }

      .text-h6 {
        font-size: 1.1rem;
      }
    }
  }

  .q-list {
    .q-item {
      padding: 0.6rem 1rem;
      
      .q-item__section {
        font-size: 0.85rem;
      }
    }
  }
}
</style>
