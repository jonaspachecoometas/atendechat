<template>
  <div>
    <q-item>
      <q-item-section avatar>
        <q-icon v-if="item.status == 'qrcode'"
          color="primary"
          name="mdi-crop-free"
          size="2.5em" />
        <q-icon v-if="item.status == 'DISCONNECTED'"
          color="negative"
          size="2.5em"
          name="mdi-wifi-alert" />
        <q-icon name="mdi-wifi-arrow-up-down"
          color="positive"
          size="2.5em"
          v-if="item.status == 'CONNECTED'" />
        <q-icon v-if="['PAIRING', 'TIMEOUT'].includes(item.status)"
          color="negative"
          size="2.5em"
          name="mdi-wifi-strength-1-alert" />
        <q-spinner v-if="item.status == 'OPENING'"
          color="green-7"
          size="3em"
          :thickness="2" />
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="item.status == 'qrcode'">
          <span class="text-weight-medium">{{ $t('configuracoesSessoesStatus.statuses.qrcode.title') }}</span>
          <span class="row col">{{ $t('configuracoesSessoesStatus.statuses.qrcode.description') }}</span>
        </q-item-label>
        <q-item-label v-if="item.status == 'DISCONNECTED'">
          <span class="text-weight-medium">{{ $t('configuracoesSessoesStatus.statuses.disconnected.title') }}</span>
          <span class="row col" v-if="item.type === 'whatsapp' || item.type === 'baileys'">{{ $t('configuracoesSessoesStatus.statuses.disconnected.whatsapp') }}</span>
          <span class="row col" v-if="item.type === 'waba'">{{ $t('configuracoesSessoesStatus.statuses.disconnected.waba') }}</span>
          <span class="row col" v-if="item.type === 'telegram'">{{ $t('configuracoesSessoesStatus.statuses.disconnected.telegram') }}</span>
          <span class="row col" v-if="item.type === 'instagram'">{{ $t('configuracoesSessoesStatus.statuses.disconnected.instagram') }}</span>
        </q-item-label>
        <q-item-label v-if="item.status == 'CONNECTED' && item.type === 'meow'">  
          <span class="text-weight-medium blur-effect">{{ $t('configuracoesSessoesStatus.statuses.connected.meow') }}  {{ item.number}} || {{item.wabaId}}</span>
        </q-item-label>
        <q-item-label v-if="item.status == 'CONNECTED' && item.type === 'evo'">  
          <span class="text-weight-medium blur-effect">{{ $t('configuracoesSessoesStatus.statuses.connected.meow') }}  {{ item.number}} || {{item.wabaId}}</span>
        </q-item-label>
        <q-item-label v-if="item.status == 'CONNECTED' && item.type === 'waba'">  
          <span class="text-weight-medium blur-effect">{{ $t('configuracoesSessoesStatus.statuses.connected.waba') }} {{ item.tokenAPI}} </span>
        </q-item-label>
        <q-item-label v-if="item.status == 'CONNECTED' && ['whatsapp', 'baileys', 'hub'].includes(item.type)">
          <span class="text-weight-medium blur-effect">
            {{ $t('configuracoesSessoesStatus.statuses.connected.whatsapp') }} {{ item.number }}
          </span>
        </q-item-label>
        <q-item-label v-if="item.status == 'CONNECTED' && item.type === 'whatsapp' || item.type === 'baileys' || item.type === 'waba' || item.type === 'meow' || item.type === 'evo'">
          <template v-if="item.profilePic !== 'disabled' && !item.profilePic.includes('nopicture.png')">
            <img class="blur-effect" :src="item.profilePic" alt="Perfil" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; vertical-align: middle; margin-right: 5px;">
          </template>
          <template v-else>
            <span class="mdi mdi-whatsapp" style="font-size: 30px; height: 30px; width: 30px; border-radius: 50%; vertical-align: middle; margin-right: 5px;"></span>
          </template>
          <span class="text-weight-medium">
            <template v-if="item.phone && (item.phone.pushname || item.phone.name)">{{ item.phone.pushname || item.phone.name || item.phone.phone }}</template>
            <!-- <template v-else>Carregando dados...</template> -->
          </span>
        </q-item-label>
        <q-item-label v-if="item.status == 'CONNECTED' && item.type.includes('hub')">
          <template v-if="item.profilePic !== 'disabled' && !item.profilePic.includes('nopicture.png')">
            <img class="blur-effect" :src="item.profilePic" alt="Perfil" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; vertical-align: middle; margin-right: 5px;">
          </template>
          <template v-else>
            <q-icon
              style="font-size: 30px; height: 30px; width: 30px; border-radius: 50%; vertical-align: middle; margin-right: 5px;"
              :name="`img:${item.type}-logo.png`"
            />
          </template>
          <span class="text-weight-medium">
            <template v-if="item.phone && (item.phone.pushname || item.phone.name)">{{ item.phone.pushname || item.phone.name || item.phone.phone }}</template>
            <!-- <template v-else>Carregando dados...</template> -->
          </span>
        </q-item-label>
        <!-- <q-item-label v-if="item.status == 'CONNECTED' && item.type === 'whatsapp' || item.type === 'baileys' || item.type === 'waba' || item.type === 'meow' || item.type.includes('hub')">
          <template v-if="item.profilePic !== 'disabled' && !item.profilePic.includes('nopicture.png')">
            <img class="blur-effect" :src="item.profilePic" alt="Perfil" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; vertical-align: middle; margin-right: 5px;">
          </template>
          <template v-else>
            <span class="mdi mdi-whatsapp" style="font-size: 30px; height: 30px; width: 30px; border-radius: 50%; vertical-align: middle; margin-right: 5px;"></span>
          </template>
          <span class="text-weight-medium">
            <template v-if="item.phone && (item.phone.pushname || item.phone.name)">{{ item.phone.pushname || item.phone.name || item.phone.phone }}</template>
          </span>
        </q-item-label> -->
        <q-item-label v-if="['PAIRING', 'TIMEOUT'].includes(item.status)">
          <span class="text-weight-medium">{{ $t('configuracoesSessoesStatus.statuses.pairingTimeout.title') }}</span>
          <span class="row col">{{ $t('configuracoesSessoesStatus.statuses.pairingTimeout.description') }}</span>
        </q-item-label>
        <q-item-label v-if="item.status == 'OPENING'">
          <span class="text-weight-medium">{{ $t('configuracoesSessoesStatus.statuses.opening.title') }}</span>
          <span class="row col">{{ $t('configuracoesSessoesStatus.statuses.opening.description') }}</span>
        </q-item-label>
        <q-item-label caption>
          {{ $t('configuracoesSessoesStatus.labels.lastUpdate') }}: {{ formatarData(item.updatedAt, 'dd/MM/yyyy HH:mm') }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
<script>
import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt-BR/index'

export default {
  name: 'ItemStatusChannel',
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    formatarData (data, formato) {
      return format(parseISO(data), formato, { locale: pt })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-item {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  padding: 12px 16px;
  margin: 8px 0;
}

.q-item-section {
  .q-icon {
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
}

.q-item-label {
  .text-weight-medium {
    font-size: 1.1em;
    color: var(--q-primary);
    margin-bottom: 4px;
  }
  span.row.col {
    color: rgba(0,0,0,0.7);
    font-size: 0.9em;
    line-height: 1.4;
  }
  &[caption] {
    color: rgba(0,0,0,0.5);
    font-size: 0.85em;
    margin-top: 8px;
  }
}

.blur-effect {
  filter: blur(0px);
  transition: all 0.3s ease;
  &:hover {
    filter: blur(0px);
  }
}

/* Modo Escuro */
body.body--dark {
  .q-item {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .q-item-label {
    .text-weight-medium {
      color: var(--q-primary);
    }
    span.row.col {
      color: rgba(255,255,255,0.7);
    }
    &[caption] {
      color: rgba(255,255,255,0.5);
    }
  }
}

@media (max-width: 600px) {
  .q-item {
    padding: 8px 12px;
    border-radius: 8px;
  }
  .q-item-label {
    .text-weight-medium {
      font-size: 1em;
    }
    span.row.col {
      font-size: 0.85em;
    }
  }
}
</style>

<style lang="sass">
.blur-effect 
  filter: blur(0px)    
</style>