<template>
  <div v-if="userProfile === 'superadmin'">
    <q-tabs class="text-teal" align="left">
      <q-route-tab
        to="/configuracoesTenant/smtp-tenant"
        name="smtp-tenant"
        icon="mdi-email"
        no-caps
        :label="$t('configuracaoTenantSmtp.label')"
      />
    </q-tabs>
    <router-view />
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId } from 'src/service/tenants.js'
import { MostrarCores } from 'src/service/empresas.js';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      colors: {},
      userProfile: 'user',
      usuario,
      asaas: false,
    }
  },
  methods: {
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
    async listarTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        this.asaas = true
      } else {
        this.asaas = false
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
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
    // this.loadColors()
  },
})
</script>

<style lang="scss" scoped>
.q-tabs {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  padding: 4px 4px 4px 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  min-height: 48px;
  height: 52px;

  .q-tab {
    border-radius: 6px;
    transition: all 0.3s ease;
    margin: 0 2px;
    min-height: 40px;
    height: 44px;
    padding: 0 16px;
    font-size: 1rem;
    line-height: 1.2;
    display: flex;
    align-items: center;

    .q-icon {
      font-size: 1.4rem;
      margin-right: 6px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    &--active {
      background: var(--q-primary);
      color: white;
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-tabs {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .q-tab {
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .q-tabs {
    padding: 2px 2px 2px 6px;
    margin-bottom: 12px;
    min-height: 40px;
    height: 44px;

    .q-tab {
      margin: 0 1px;
      min-height: 32px;
      height: 36px;
      padding: 0 10px;
      font-size: 0.95rem;

      .q-icon {
        font-size: 1.1rem;
        margin-right: 4px;
      }
    }
  }
}
</style>
