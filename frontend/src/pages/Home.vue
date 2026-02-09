<template>
  <div class="home-container q-pa-md">
    <!-- Header de Boas-vindas -->
    <div class="row q-mb-lg">
      <div class="col-12">
        <q-card class="welcome-card">
          <q-card-section class="q-pa-lg">
            <div class="row items-center">
              <div class="col-xs-12 col-md-8">
                <h1 class="text-h3 text-bold q-mb-sm">
                  {{ $t('home.welcome') }}, {{ userName }}!
                </h1>
                <p class="text-h6 text-grey-7">
                  {{ $t('home.subtitle') }}
                </p>
              </div>
              <div class="col-xs-12 col-md-4 text-center text-md-right">
                <q-icon 
                  name="mdi-view-dashboard" 
                  size="120px" 
                  color="primary" 
                  class="q-mt-md"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Cards de Acesso Rápido -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-card 
          class="quick-access-card cursor-pointer"
          @click="$router.push({ name: 'home-dashboard' })"
        >
          <q-card-section class="q-pa-lg text-center">
            <q-icon 
              name="mdi-chart-line" 
              size="48px" 
              color="primary" 
              class="q-mb-md"
            />
            <div class="text-h6 text-bold q-mb-xs">
              {{ $t('home.dashboard') }}
            </div>
            <div class="text-caption text-grey-7">
              {{ $t('home.dashboardDescription') }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-card 
          class="quick-access-card cursor-pointer"
          @click="$router.push({ name: 'atendimento' })"
        >
          <q-card-section class="q-pa-lg text-center">
            <q-icon 
              name="mdi-forum-outline" 
              size="48px" 
              color="positive" 
              class="q-mb-md"
            />
            <div class="text-h6 text-bold q-mb-xs">
              {{ $t('home.attendance') }}
            </div>
            <div class="text-caption text-grey-7">
              {{ $t('home.attendanceDescription') }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-card 
          class="quick-access-card cursor-pointer"
          @click="$router.push({ name: 'contatos' })"
        >
          <q-card-section class="q-pa-lg text-center">
            <q-icon 
              name="mdi-card-account-mail" 
              size="48px" 
              color="info" 
              class="q-mb-md"
            />
            <div class="text-h6 text-bold q-mb-xs">
              {{ $t('home.contacts') }}
            </div>
            <div class="text-caption text-grey-7">
              {{ $t('home.contactsDescription') }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Seção de Informações -->
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">
              <q-icon name="mdi-information-outline" class="q-mr-sm" />
              {{ $t('home.quickInfo') }}
            </div>
            <q-list separator>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-lightning-bolt" color="warning" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('home.info1') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-shield-check" color="positive" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('home.info2') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-chart-box" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('home.info3') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-bold q-mb-md">
              <q-icon name="mdi-menu" class="q-mr-sm" />
              {{ $t('home.quickLinks') }}
            </div>
            <q-list separator>
              <q-item 
                clickable 
                v-ripple
                @click="$router.push({ name: 'home-dashboard' })"
              >
                <q-item-section avatar>
                  <q-icon name="mdi-chart-line" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('home.dashboard') }}</q-item-label>
                  <q-item-label caption>{{ $t('home.dashboardDescription') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>
              </q-item>
              <q-item 
                clickable 
                v-ripple
                @click="$router.push({ name: 'relatorios' })"
              >
                <q-item-section avatar>
                  <q-icon name="mdi-file-chart" color="info" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ $t('home.reports') }}</q-item-label>
                  <q-item-label caption>{{ $t('home.reportsDescription') }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    userName() {
      // Tenta obter o nome do usuário do localStorage ou store
      try {
        const userData = localStorage.getItem('usuario')
        if (userData) {
          const user = JSON.parse(userData)
          return user.username || user.email?.split('@')[0] || this.$t('home.user')
        }
      } catch (e) {
        console.warn('Erro ao obter dados do usuário:', e)
      }
      return this.$t('home.user')
    }
  },
  mounted() {
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
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
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // Não faz nenhuma query ao banco de dados
    // Esta página é apenas informativa e de navegação rápida
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  
  h1 {
    color: var(--q-primary) !important;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
  
  p {
    color: #666 !important;
    font-size: 1rem;
    margin: 0;
  }
  
  .q-icon {
    opacity: 0.9;
    color: var(--q-primary);
  }
}

.quick-access-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .q-card-section {
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.q-item {
  border-radius: 8px;
  margin: 4px 0;
  
  &:hover {
    background-color: rgba(var(--q-primary-rgb), 0.05);
  }
}

// Modo escuro
body.body--dark {
  .welcome-card {
    background: rgba(30, 30, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    h1 {
      color: var(--q-primary) !important;
    }
    
    p {
      color: #aaa !important;
    }
  }
  
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .q-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
}

// Responsividade
@media (max-width: 600px) {
  .welcome-card {
    .q-icon {
      size: 80px !important;
    }
    
    h1 {
      font-size: 1.5rem !important;
    }
  }
  
  .quick-access-card .q-card-section {
    min-height: 150px;
    padding: 1rem !important;
  }
}
</style>

