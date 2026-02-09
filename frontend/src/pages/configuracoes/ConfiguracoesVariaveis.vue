<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesVariaveis.titlePlatform') }}</q-item-label>
          <q-item-label caption>
            <div class="col-12">
              <li v-for="(description, variable) in platformVars" :key="variable" class="text-weight-medium text-nowrap q-pr-md blur-effect">
                <span class="text-bold" v-html="'{{' + variable + '}}:'"></span>
                {{ description }}
              </li>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesVariaveis.titleTypebot') }}</q-item-label>
          <q-item-label caption>
            <div class="col-12">
              <li v-for="(description, variable) in typebotVars" :key="variable" class="text-weight-medium text-nowrap q-pr-md blur-effect">
                <span class="text-bold" v-html="'{{' + variable + '}}:'"></span>
                {{ description }}
              </li>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { defineComponent } from 'vue'
import { i18n } from 'src/boot/i18n.js'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      metaToken: '',
      webhookChecked: '',
      loading: false,
      userProfile: 'user'
    }
  },
  computed: {
    platformVars() {
      // Usa $tm se disponível; fallback para i18n.global.tm
      try {
        const obj = (this.$tm && this.$tm('configuracoesVariaveis.platformVariables'))
          || (i18n && i18n.global && i18n.global.tm && i18n.global.tm('configuracoesVariaveis.platformVariables'))
          || {}
        return obj && typeof obj === 'object' ? obj : {}
      } catch (_) { return {} }
    },
    typebotVars() {
      try {
        const obj = (this.$tm && this.$tm('configuracoesVariaveis.typebotVariables'))
          || (i18n && i18n.global && i18n.global.tm && i18n.global.tm('configuracoesVariaveis.typebotVariables'))
          || {}
        return obj && typeof obj === 'object' ? obj : {}
      } catch (_) { return {} }
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
  },
})
</script>

<style lang="scss" scoped>
.q-list {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  padding: 18px 18px 10px 18px;
  margin-top: 18px;
  margin-bottom: 18px;
}

.q-item {
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
  .q-item__label {
    font-weight: 500;
  }
  .q-item__label--caption {
    opacity: 0.7;
  }
}

.col-12 {
  margin-bottom: 8px;
}

li.text-weight-medium {
  background: rgba(255,255,255,0.7);
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 6px 10px;
  transition: background 0.2s;
  font-size: 0.98rem;
  &:hover {
    background: rgba(0,0,0,0.04);
  }
}

.text-bold {
  color: var(--q-primary);
}

/* Modo Escuro */
body.body--dark {
  .q-list {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .q-item {
    &:hover {
      background: rgba(255,255,255,0.07);
    }
  }
  li.text-weight-medium {
    background: rgba(255,255,255,0.05);
    &:hover {
      background: rgba(255,255,255,0.10);
    }
  }
  .text-bold {
    color: var(--q-primary);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .q-list {
    padding: 10px 6px 6px 6px;
    border-radius: 10px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .q-item {
    margin-bottom: 10px;
  }
  .col-12 {
    margin-bottom: 4px;
  }
  li.text-weight-medium {
    font-size: 0.93rem;
    padding: 4px 6px;
  }
}
</style>
