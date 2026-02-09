<template>
  <div class="funil-page" :style="containerStyle" v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="header-actions">
      <template v-if="!isMobile">
        <q-tabs class="custom-tabs" align="left" dense>
          <q-route-tab
            to="/funil/dashboard"
            name="dashboard"
            :label="$t('funil.dashBoard')"
          />
          <q-route-tab
            to="/funil/kanban"
            name="kanban"
            :label="$t('funil.kanban')"
          />
          <q-route-tab
            to="/funil/pipelines"
            name="pipelines"
            :label="$t('funil.pipelines')"
          />
          <q-route-tab
            to="/funil/calendar"
            name="calendar"
            :label="$t('funil.calendar')"
          />
          <q-route-tab
            to="/funil/acao"
            name="acao"
            :label="$t('funil.acao')"
          />
          <q-route-tab
            to="/funil/acao-ticket"
            name="acao-ticket"
            :label="$t('funil.acaoTicket') || 'Ações de Tickets'"
          />
        </q-tabs>
      </template>
      <template v-else>
        <q-select
          v-model="selectedTab"
          :options="tabOptions"
          emit-value
          map-options
          dense
          outlined
          class="q-mb-sm mobile-tabs-dropdown"
          @update:model-value="onTabChange"
        />
      </template>
      <q-btn
        round
        color="primary"
        icon="refresh"
        @click="atualizarDados"
        class="refresh-btn"
        :loading="loading"
      >
        <q-tooltip>{{ $t('common.atualizar') }}</q-tooltip>
      </q-btn>
    </div>
    <q-separator />
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
export default {
  name: 'FunilPage',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      loading: false,
      componentKey: 0,
      selectedTab: '/funil/dashboard',
      tabOptions: [
        { label: this.$t('funil.dashBoard'), value: '/funil/dashboard' },
        { label: this.$t('funil.kanban'), value: '/funil/kanban' },
        { label: this.$t('funil.pipelines'), value: '/funil/pipelines' },
        { label: this.$t('funil.calendar'), value: '/funil/calendar' },
        { label: this.$t('funil.acao'), value: '/funil/acao' },
        { label: this.$t('funil.acaoTicket') || 'Ações de Tickets', value: '/funil/acao-ticket' }
      ]
    }
  },
  computed: {
    containerStyle() {
      if (this.$q.dark.isActive) {
        return {
          background: 'var(--q-dark-page, #181c24)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
        }
      }
      return {
        background: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)'
      }
    },
    isMobile() {
      return this.$q.screen.lt.sm;
    }
  },
  watch: {
    '$route.path'(val) {
      this.selectedTab = val;
    }
  },
  methods: {
    async atualizarDados() {
      this.loading = true;
      try {
        this.componentKey++;
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.dadosAtualizados'),
          position: 'top'
        });
      } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('common.erroAtualizacao'),
          position: 'top'
        });
      } finally {
        this.loading = false;
      }
    },
    onTabChange(val) {
      if (val && this.$route.path !== val) {
        this.$router.push(val);
      }
    }
  },
  async mounted() {
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed?.colors)
            ? parsed.colors
            : []
      } catch (_) {
        list = []
      }

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

        if (typeof value === 'string' && value) {
          acc[key] = value
        }
        return acc
      }, {})
      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.kanban === true;
    // Atualiza o valor do dropdown ao montar
    this.selectedTab = this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
h1, .text-h4, .text-h5, .text-h6 {
  color: var(--q-primary);
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 0.5rem;
}

.funil-page {
  padding: 24px 0;

  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  .q-tabs {
    padding: 0 24px;
    margin-bottom: 8px;

    border-radius: 12px;
    backdrop-filter: blur(8px);

    .q-tab {
      min-height: 48px;
      padding: 0 24px;
      font-weight: 500;
      letter-spacing: 0.3px;
      transition: all 0.3s ease;
      border-radius: 8px;
      margin: 4px;

      &--active {
        color: #00a300;
        font-weight: 600;
        background: rgba(0, 163, 0, 0.1);
      }

      &:hover {
        background: rgba(0, 163, 0, 0.05);
        transform: translateY(-1px);
      }
    }
  }

  .q-separator {
    margin: 0 24px;
    opacity: 0.1;
  }

  > div {
    padding: 24px;

    border-radius: 16px;
    backdrop-filter: blur(8px);
    margin: 12px 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  }
}

@media (max-width: 600px) {
  .funil-page {
    margin: 0;
    border-radius: 0;
    padding: 8px 0;
  }
  .custom-tabs {
    margin: 8px 2px 0 2px;
    min-height: 40px;
    height: 44px;
    padding: 0 2px;
    font-size: 0.95rem;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .custom-tabs::-webkit-scrollbar {
    display: none;
  }
  .custom-tabs .q-tab {
    min-width: unset;
    min-height: 32px;
    height: 36px;
    padding: 0 10px;
    font-size: 0.95rem;
    margin: 0 2px;
    flex: 0 0 auto;
  }
  .header-actions {
    flex-direction: column;
    align-items: stretch;
    padding: 0 4px;
    gap: 6px;
  }
  .refresh-btn {
    margin-left: 0;
    margin-top: 6px;
    width: 36px;
    height: 36px;
    align-self: flex-end;
  }
}

.custom-tabs {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
  margin: 18px 8px 0 8px;
  min-height: 48px;
  height: 52px;
  padding: 0 8px;
  transition: all 0.3s ease;
}

.custom-tabs .q-tab {
  border-radius: 8px;
  min-height: 40px;
  height: 44px;
  padding: 0 16px;
  font-size: 1rem;
  line-height: 1.2;
  display: flex;
  align-items: center;
  margin: 0 2px;
  transition: all 0.3s;
}

.custom-tabs .q-tab .q-icon {
  font-size: 1.3rem;
  margin-right: 6px;
  color: var(--q-grey-6);
}

.custom-tabs .q-tab.q-tab--active {
  background: var(--q-primary);
  color: #fff !important;
}

.custom-tabs .q-tab.q-tab--active .q-icon {
  color: #fff !important;
}

.custom-tabs .q-tab:hover {
  background: #fff;
  color: var(--q-primary) !important;
}

/* Modo Escuro */
body.body--dark .sidebar {
  background: rgba(30,30,30,0.95);
  border-color: rgba(255,255,255,0.08);
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
}
body.body--dark .custom-tabs {
  background: rgba(30,30,30,0.95);
  border-color: rgba(255,255,255,0.08);
}
body.body--dark .custom-tabs .q-tab {
  color: #eee;
}
body.body--dark .custom-tabs .q-tab.q-tab--active {
  background: var(--q-primary);
  color: #fff !important;
}
body.body--dark .custom-tabs .q-tab .q-icon {
  color: #bbb;
}
body.body--dark .custom-tabs .q-tab.q-tab--active .q-icon {
  color: #fff !important;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 8px;
}

.refresh-btn {
  margin-left: 16px;
}

@media (max-width: 600px) {
  .header-actions {
    padding: 0 12px;
  }
  
  .refresh-btn {
    margin-left: 8px;
  }
}

.mobile-tabs-dropdown {
  width: 100%;
  max-width: 320px;
  margin-bottom: 8px;
}
</style> 
