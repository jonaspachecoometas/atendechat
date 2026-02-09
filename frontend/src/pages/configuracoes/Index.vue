<template>
  <div class="layout-container" v-if="userProfile === 'admin' && isMobile">
    <!-- Menu Superior -->
    <div class="tabs-wrapper">
      <q-btn
        v-if="isMobile"
        flat
        dense
        round
        icon="menu"
        @click="drawerOpen = !drawerOpen"
        class="mobile-menu-btn"
      />
      <q-tabs 
        class="custom-tabs" 
        align="left" 
        v-model="activeTab" 
        active-color="primary" 
        inactive-color="grey-6"
        :breakpoint="0"
      >
        <q-tab name="config-gerais" :label="$t('configuracoes.tabs.gerais')" icon="settings" />
        <q-tab name="bots-ia" :label="$t('configuracoes.tabs.botsIA')" icon="smart_toy" />
        <q-tab name="integracoes" :label="$t('configuracoes.tabs.integracoes')" icon="mdi-cellphone-message" />
        <q-tab name="kanban-demandas" :label="$t('configuracoes.tabs.crm')" icon="mdi-account-box-multiple-outline" />
        <q-tab name="sessoes" :label="$t('configuracoes.tabs.sessoes')" icon="mdi-cellphone-wireless" />
      </q-tabs>
    </div>

    <!-- Drawer para Mobile -->
    <q-drawer
      v-model="drawerOpen"
      :width="280"
      :breakpoint="768"
      overlay
      bordered
      class="mobile-drawer"
      :class="{ 'desktop-drawer': !isMobile }"
    >
      <div class="drawer-header" v-if="isMobile">
        <div class="drawer-title">{{ $t('configuracoes.sidebar.menu') || 'Menu' }}</div>
        <q-btn
          flat
          dense
          round
          icon="close"
          @click="drawerOpen = false"
          class="drawer-close-btn"
        />
      </div>
      <q-list class="submenu">
        <!-- Configurações Gerais -->
        <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/geral" tag="router-link">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.gerais') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/smtp" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-email" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.smtp') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/a2f" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-shield-lock" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.a2f') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'config-gerais' && asaas" clickable to="/configuracoes/pagamentos" tag="router-link">
          <q-item-section avatar>
            <q-icon name="payments" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.payment') }}</q-item-section>
        </q-item>

        <!-- Bots e IA -->
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/typebot" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.typebot') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/chat-gpt" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.chatGPT') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/grok" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.grok') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/gemini" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.gemini') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/qwen" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.qwen') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/claude" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.claude') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/deepseek" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.deepseek') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/n8n" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.n8n') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/dify" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.dify') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/ollama" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.ollama') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/lm" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.lm') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/dialogflow" tag="router-link">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.dialogflow') }}</q-item-section>
        </q-item>

        <!-- Integrações -->
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/webhooks" tag="router-link">
          <q-item-section avatar>
            <q-icon name="webhook" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.webhooks') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/meta" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-whatsapp" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.meta') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/google-calendar" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-google" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.googleCalendar') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/webchat" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-chat" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.webchat') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/zapi" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-message" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.zapi') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/uazapi" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-message" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.uazapi') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/evolution" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-message" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.evolution') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/wuzapi" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-message" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.wuzapi') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/hub" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-message" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.hub') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/sms" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-message" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.sms') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/vapi" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-play" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.vapi') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/groqcloud" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-volume-medium" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.groqcloud') }}</q-item-section>
        </q-item>

        <!-- Kanban e Demandas -->
        <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/lanes" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-tray-full" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.kanban') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/motivos" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-clipboard-text-multiple-outline" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.motivos') }}</q-item-section>
        </q-item>
        <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/variaveis" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-variable" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.variaveis') }}</q-item-section>
        </q-item>

        <!-- Sessões -->
        <q-item v-if="activeTab === 'sessoes'" clickable to="/configuracoes/sessoes" tag="router-link">
          <q-item-section avatar>
            <q-icon name="mdi-cellphone-wireless" />
          </q-item-section>
          <q-item-section>{{ $t('configuracoes.sidebar.sessoes') }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Submenu e Opções -->
    <div class="content-container">
      <!-- Submenu Lateral (Desktop) -->
      <div v-if="!isMobile" class="sidebar" :class="{ collapsed: isCollapsed }">
        <q-btn
          :icon="isCollapsed ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'"
          flat
          dense
          round
          @click="toggleSidebar"
          class="toggle-sidebar"
        >
          <q-tooltip>
            <q-tooltip>{{ $t('configuracoes.tooltips.toggleSidebar') }}</q-tooltip>
          </q-tooltip>
          </q-btn>  
        <q-list v-show="!isCollapsed" class="submenu">
          <!-- Configurações Gerais -->
          <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/geral" tag="router-link">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.gerais') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/smtp" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-email" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.smtp') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/a2f" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-shield-lock" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.a2f') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'config-gerais' && asaas" clickable to="/configuracoes/pagamentos" tag="router-link">
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.payment') }}</q-item-section>
          </q-item>

          <!-- Bots e IA -->
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/typebot" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.typebot') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/chat-gpt" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.chatGPT') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/grok" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.grok') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/gemini" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.gemini') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/qwen" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.qwen') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/claude" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.claude') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/deepseek" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.deepseek') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/n8n" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.n8n') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/dify" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.dify') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/ollama" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.ollama') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/lm" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.lm') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/dialogflow" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.dialogflow') }}</q-item-section>
          </q-item>

          <!-- Integrações -->
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/webhooks" tag="router-link">
            <q-item-section avatar>
              <q-icon name="webhook" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.webhooks') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/meta" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-whatsapp" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.meta') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/google-calendar" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-google" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.googleCalendar') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/webchat" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-chat" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.webchat') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/zapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.zapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/uazapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.uazapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/evolution" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.evolution') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/wuzapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.wuzapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/hub" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.hub') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/sms" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.sms') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/vapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-play" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.vapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/groqcloud" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-volume-medium" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.groqcloud') }}</q-item-section>
          </q-item>
          <!-- <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/proxy" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-network" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.proxy') }}</q-item-section>
          </q-item> -->

          <!-- Kanban e Demandas -->
          <!-- <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/tutoriais" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-play-circle-outline" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.tutoriais') }}</q-item-section>
          </q-item> -->
          <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/lanes" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-tray-full" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.kanban') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/motivos" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-clipboard-text-multiple-outline" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.motivos') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/variaveis" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-variable" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.variaveis') }}</q-item-section>
          </q-item>
          

          <!-- Sessões -->
          <q-item v-if="activeTab === 'sessoes'" clickable to="/configuracoes/sessoes" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-wireless" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.sessoes') }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Conteúdo Principal -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
  <div class="layout-container" v-if="userProfile === 'admin' && !isMobile">
    <!-- Menu Superior -->
    <div class="tabs-wrapper">
      <q-tabs 
        class="custom-tabs" 
        align="left" 
        v-model="activeTab" 
        active-color="primary" 
        inactive-color="grey-6"
      >
        <q-tab name="config-gerais" :label="$t('configuracoes.tabs.gerais')" icon="settings" />
        <q-tab name="bots-ia" :label="$t('configuracoes.tabs.botsIA')" icon="smart_toy" />
        <q-tab name="integracoes" :label="$t('configuracoes.tabs.integracoes')" icon="mdi-cellphone-message" />
        <q-tab name="kanban-demandas" :label="$t('configuracoes.tabs.crm')" icon="mdi-account-box-multiple-outline" />
        <q-tab name="sessoes" :label="$t('configuracoes.tabs.sessoes')" icon="mdi-cellphone-wireless" />
      </q-tabs>
    </div>

    <!-- Submenu e Opções -->
    <div class="content-container">
      <!-- Submenu Lateral -->
      <div class="sidebar" :class="{ collapsed: isCollapsed }">
        <q-btn
          :icon="isCollapsed ? 'mdi-arrow-collapse-right' : 'mdi-arrow-collapse-left'"
          flat
          dense
          round
          @click="toggleSidebar"
          class="toggle-sidebar"
        >
          <q-tooltip>
            <q-tooltip>{{ $t('configuracoes.tooltips.toggleSidebar') }}</q-tooltip>
          </q-tooltip>
          </q-btn>  
        <q-list v-show="!isCollapsed" class="submenu">
          <!-- Configurações Gerais -->
          <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/geral" tag="router-link">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.gerais') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/smtp" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-email" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.smtp') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'config-gerais'" clickable to="/configuracoes/a2f" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-shield-lock" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.a2f') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'config-gerais' && asaas" clickable to="/configuracoes/pagamentos" tag="router-link">
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.payment') }}</q-item-section>
          </q-item>

          <!-- Bots e IA -->
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/typebot" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.typebot') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/chat-gpt" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.chatGPT') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/grok" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.grok') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/gemini" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.gemini') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/qwen" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.qwen') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/claude" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.claude') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/deepseek" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.deepseek') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/n8n" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.n8n') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/dify" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.dify') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/ollama" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.ollama') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/lm" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.lm') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'bots-ia'" clickable to="/configuracoes/dialogflow" tag="router-link">
            <q-item-section avatar>
              <q-icon name="smart_toy" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.dialogflow') }}</q-item-section>
          </q-item>

          <!-- Integrações -->
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/webhooks" tag="router-link">
            <q-item-section avatar>
              <q-icon name="webhook" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.webhooks') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/meta" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-whatsapp" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.meta') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/google-calendar" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-google" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.googleCalendar') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/webchat" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-chat" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.webchat') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/zapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.zapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/uazapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.uazapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/evolution" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.evolution') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/wuzapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.wuzapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/hub" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.hub') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/sms" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-message" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.sms') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/vapi" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-play" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.vapi') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/groqcloud" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-volume-medium" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.groqcloud') }}</q-item-section>
          </q-item>
          <!-- <q-item v-if="activeTab === 'integracoes'" clickable to="/configuracoes/proxy" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-network" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.proxy') }}</q-item-section>
          </q-item> -->

          <!-- Kanban e Demandas -->
          <!-- <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/tutoriais" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-play-circle-outline" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.tutoriais') }}</q-item-section>
          </q-item> -->
          <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/lanes" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-tray-full" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.kanban') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/motivos" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-clipboard-text-multiple-outline" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.motivos') }}</q-item-section>
          </q-item>
          <q-item v-if="activeTab === 'kanban-demandas'" clickable to="/configuracoes/variaveis" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-variable" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.variaveis') }}</q-item-section>
          </q-item>
          

          <!-- Sessões -->
          <q-item v-if="activeTab === 'sessoes'" clickable to="/configuracoes/sessoes" tag="router-link">
            <q-item-section avatar>
              <q-icon name="mdi-cellphone-wireless" />
            </q-item-section>
            <q-item-section>{{ $t('configuracoes.sidebar.sessoes') }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Conteúdo Principal -->
      <div class="content">
        <router-view />
      </div>
    </div>
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
      isCollapsed: false,
      activeTab: "config-gerais",
      drawerOpen: false,
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.drawerOpen = false;
      }
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
    async listarTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        this.asaas = true
      } else {
        this.asaas = false
      }
    },
  },
  watch: {
    $route() {
      // Fechar drawer ao navegar em mobile
      if (this.isMobile) {
        this.drawerOpen = false;
      }
    },
    activeTab(newTab, oldTab) {
      // Abrir menu lateral ao mudar de tab
      if (newTab !== oldTab) {
        if (this.isMobile) {
          // Abrir drawer no mobile
          this.drawerOpen = true;
        } else {
          // Expandir sidebar no desktop
          this.isCollapsed = false;
        }
      }
    },
  },
  async mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
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
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
})
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
  margin: 18px 8px 0 8px;
  padding: 0 8px;
  min-height: 52px;
  transition: all 0.3s ease;
}

.mobile-menu-btn {
  flex-shrink: 0;
}

.content-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px 0 0 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border-right: 1px solid rgba(0,0,0,0.04);
  transition: width 0.3s ease, background 0.3s;
  overflow: hidden;
  margin-top: 18px;
  margin-bottom: 18px;
  margin-left: 8px;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 60px;
}

.toggle-sidebar {
  margin: 10px;
}

.submenu {
  padding: 10px 0 10px 0;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.98);
}

.drawer-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--q-primary);
}

.drawer-close-btn {
  color: var(--q-grey-7);
}

.mobile-drawer {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
}

.mobile-drawer.desktop-drawer {
  display: none;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
}

.custom-tabs {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 48px;
  height: 52px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.custom-tabs::-webkit-scrollbar {
  height: 4px;
}

.custom-tabs::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 2px;
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
  white-space: nowrap;
  flex-shrink: 0;
}

.custom-tabs .q-tab .q-icon {
  font-size: 1.3rem;
  margin-right: 6px;
  color: var(--q-grey-6);
}

.custom-tabs .q-tab.q-tab--active,
.custom-tabs .q-tab.q-tab--active:hover,
.custom-tabs .q-tab.q-tab--active:focus {
  background: var(--q-primary) !important;
  background-color: var(--q-primary) !important;
  color: #fff !important;
}

.custom-tabs .q-tab.q-tab--active .q-icon {
  color: #fff !important;
}

.custom-tabs .q-tab:hover:not(.q-tab--active) {
  background: rgba(0,0,0,0.04);
}

/* Modo Escuro */
body.body--dark .sidebar {
  background: rgba(30,30,30,0.95);
  border-color: rgba(255,255,255,0.08);
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
}
body.body--dark .tabs-wrapper {
  background: rgba(30,30,30,0.95);
  border-color: rgba(255,255,255,0.08);
}
body.body--dark .custom-tabs {
  background: transparent;
}
body.body--dark .custom-tabs .q-tab {
  color: #eee;
}
body.body--dark .custom-tabs .q-tab.q-tab--active,
body.body--dark .custom-tabs .q-tab.q-tab--active:hover,
body.body--dark .custom-tabs .q-tab.q-tab--active:focus {
  background: var(--q-primary) !important;
  background-color: var(--q-primary) !important;
  color: #fff !important;
}
body.body--dark .custom-tabs .q-tab .q-icon {
  color: #bbb;
}
body.body--dark .custom-tabs .q-tab.q-tab--active .q-icon {
  color: #fff !important;
}
body.body--dark .mobile-drawer {
  background: rgba(30,30,30,0.95);
  border-color: rgba(255,255,255,0.08);
}
body.body--dark .drawer-header {
  background: rgba(30,30,30,0.98);
  border-color: rgba(255,255,255,0.08);
}
body.body--dark .drawer-title {
  color: var(--q-primary);
}
body.body--dark .drawer-close-btn {
  color: #bbb;
}

/* Responsividade Tablet */
@media (max-width: 1024px) and (min-width: 769px) {
  .sidebar {
    width: 200px;
    border-radius: 10px 0 0 10px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .sidebar.collapsed {
    width: 50px;
  }
  .tabs-wrapper {
    margin: 8px 4px 0 4px;
    padding: 0 4px;
    min-height: 44px;
  }
  .custom-tabs {
    min-height: 40px;
    height: 44px;
  }
  .custom-tabs .q-tab {
    min-height: 36px;
    height: 40px;
    padding: 0 12px;
    font-size: 0.9rem;
    margin: 0 1px;
  }
  .custom-tabs .q-tab .q-icon {
    font-size: 1.1rem;
    margin-right: 4px;
  }
  .content {
    padding: 16px;
  }
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .layout-container {
    height: 100vh;
    overflow: hidden;
  }

  .tabs-wrapper {
    margin: 8px 4px 0 4px;
    padding: 0 4px;
    min-height: 48px;
    border-radius: 8px;
  }

  .mobile-menu-btn {
    margin: 0 4px;
  }

  .custom-tabs {
    min-height: 44px;
    height: 48px;
    padding: 0;
  }

  .custom-tabs .q-tab {
    min-height: 40px;
    height: 44px;
    padding: 0 12px;
    font-size: 0.85rem;
    margin: 0 2px;
  }

  .custom-tabs .q-tab .q-icon {
    font-size: 1.1rem;
    margin-right: 4px;
  }

  .content-container {
    flex-direction: column;
    overflow: hidden;
  }

  .sidebar {
    display: none;
  }

  .content {
    padding: 12px;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    width: 100%;
  }

  .mobile-drawer {
    z-index: 2000;
  }
}
</style>
