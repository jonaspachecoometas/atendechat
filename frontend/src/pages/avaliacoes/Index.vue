<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-tabs class="text-teal" align="left">
      <q-route-tab
        to="/avaliacoes/listar"
        name="list"
        no-caps
        icon="mdi-clipboard-list-outline"
        label="Listar Avaliações"
      />
      <q-route-tab
        to="/avaliacoes/configurar"
        name="config"
        no-caps
        icon="mdi-cog"
        label="Configurar Avaliações"
      />
    </q-tabs>
    <router-view />
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
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
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      usuario
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
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.avaliacoes === true;
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
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  padding: 0.2rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-tab {
    border-radius: 12px;
    margin: 0.1rem;
    padding: 0.2rem 0.6rem;
    min-height: 32px;
    transition: all 0.3s ease;

    &__icon {
      font-size: 1rem;
      margin-right: 0.3rem;
    }

    &__label {
      font-weight: 500;
      font-size: 0.85rem;
    }

    &:hover {
      background: rgba(var(--q-primary-rgb), 0.05);
    }

    &--active {
      background: rgba(var(--q-primary-rgb), 0.1);
      color: var(--q-primary);
    }
  }
}

.q-banner {
  border-radius: 12px;
  margin: 1rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.bg-red {
    background: rgba(var(--q-negative-rgb), 0.1) !important;
    color: var(--q-negative) !important;
    border: 1px solid rgba(var(--q-negative-rgb), 0.2) !important;
  }

  .q-icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  span {
    font-weight: 500;
  }
}

/* Modo Escuro */
body.body--dark {
  .q-tabs {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .q-tab {
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }

      &--active {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .q-banner {
    &.bg-red {
      background: rgba(var(--q-negative-rgb), 0.2) !important;
      color: #ff6b6b !important;
      border: 1px solid rgba(var(--q-negative-rgb), 0.3) !important;
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-tabs {
    margin: 0.5rem;
    padding: 0.2rem;
    border-radius: 12px;

    .q-tab {
      margin: 0.1rem;
      padding: 0.2rem 0.4rem;
      min-height: 28px;

      &__icon {
        font-size: 0.9rem;
      }

      &__label {
        font-size: 0.8rem;
      }
    }
  }

  .q-banner {
    margin: 0.5rem;
    padding: 0.8rem;
    border-radius: 12px;
  }
}
</style>
