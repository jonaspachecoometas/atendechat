<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-card
      v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed)) "
      class="q-ma-sm q-pa-sm q-card q-ma-md"
      square
      style="height: calc(100vh - 130px); border-radius: 8px !important;"
    >
      <q-card-section class="q-pa-sm q-mb-md">
        <q-list class="relatorios-list">
          <q-item
            v-for="menu in cRelatorios"
            :key="menu.name"
            class="shadow-1 q-px-sm items-start relatorio-card"
            clickable
            v-ripple
            :to="{name: menu.name}"
          >
            <q-item-section>
              <q-item-label class="text-primary">{{menu.titulo}}</q-item-label>
              <q-item-label caption>{{menu.objetivo}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import relatorios from './relatorios.json'
import { MostrarCores } from 'src/service/empresas.js';
export default {
  name: 'ccListaRelatorios',
  computed: {
    cRelatorios () {
      return relatorios
    }
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
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
  mounted() {
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.relatorios === true;
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
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px !important;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}
.relatorios-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 2.5rem;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
}
.relatorio-card {
  min-width: 280px;
  max-width: 340px;
  width: 100%;
  min-height: 90px;
  height: 90px;
  margin: 0;
  border-radius: 16px;
  background: rgba(var(--q-primary-rgb),0.04);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border-left: solid var(--q-primary) 3px;
  transition: box-shadow 0.2s, background 0.2s, transform 0.18s;
  &:hover {
    background: rgba(var(--q-primary-rgb),0.13);
    box-shadow: 0 4px 16px rgba(0,0,0,0.13);
    transform: translateY(-2px) scale(1.03);
  }
}
.q-item-label.text-primary {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--q-primary);
}
.q-item-label[caption] {
  font-size: 0.95rem;
  color: #666;
}
body.body--dark .q-card {
  background: rgba(30,30,30,0.98) !important;
  box-shadow: 0 6px 32px rgba(0,0,0,0.22) !important;
  border: 1px solid rgba(255,255,255,0.10) !important;
}
body.body--dark .relatorio-card {
  background: rgba(40,40,40,0.85);
  box-shadow: 0 1px 8px rgba(0,0,0,0.18);
}
body.body--dark .q-item-label.text-primary {
  color: var(--q-primary);
}
body.body--dark .q-item-label[caption] {
  color: #aaa;
}
@media (max-width: 900px) {
  .relatorios-list {
    gap: 1rem;
  }
  .relatorio-card {
    min-width: 95vw;
    max-width: 98vw;
    height: auto;
  }
}
</style>
