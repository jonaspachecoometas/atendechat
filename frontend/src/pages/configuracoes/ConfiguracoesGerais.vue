<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.notViewAssignedTickets') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.notViewAssignedTickets') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="NotViewAssignedTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="NotViewAssignedTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="handleDependencies('NotViewAssignedTickets')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.notViewTicketsChatBot') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.notViewTicketsChatBot') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="NotViewTicketsChatBot"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="NotViewTicketsChatBot === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="handleDependencies('NotViewTicketsChatBot')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.directTicketsToWallets') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.directTicketsToWallets') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="DirectTicketsToWallets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="DirectTicketsToWallets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('DirectTicketsToWallets')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.ticketNulo') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.ticketNulo') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ticketNulo"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ticketNulo === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="handleDependencies('ticketNulo')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.supervisor') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.supervisor') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="supervisor"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="supervisor === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantSupervisorAdmin('supervisor')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.semRedis') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.semRedis') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="semRedis"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="semRedis === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            disable
        />
        </q-item-section>
      </q-item>
      <q-item tag="label" v-ripple class="responsive-item">
      <!-- Texto do Item -->
      <q-item-section class="text-section">
        <q-item-label>{{ $t('configuracoesGerais.labels.chatbotFlow') }}</q-item-label>
        <q-item-label caption>{{ $t('configuracoesGerais.captions.chatbotFlow') }}</q-item-label>
      </q-item-section>

      <!-- Botão de Reset -->
      <q-item-section avatar class="action-section">
        <q-btn
          @click="resetarFluxoAtivo"
          flat
          icon="mdi-replay"
          color="negative"
          class="bg-padrao btn-rounded"
        >
          <q-tooltip content-class="bg-negative text-bold">
            {{ $t('configuracoesGerais.captions.chatbotFlow') }}
          </q-tooltip>
        </q-btn>
      </q-item-section>

      <!-- Select Responsivo -->
      <q-item-section class="select-section">
        <q-select
          outlined
          dense
          v-model="botTicketActive"
          :options="listaChatFlow"
          map-options
          emit-value
          option-value="id"
          option-label="name"
          @update:model-value="atualizarConfiguracao('botTicketActive')"
        />
      </q-item-section>
    </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.ignoreGroupMsg') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.ignoreGroupMsg') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ignoreGroupMsg"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ignoreGroupMsg === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('ignoreGroupMsg')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.ignoreIgStories') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.ignoreIgStories') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ignorarStories"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ignorarStories === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarIgnorarStories('ignorarStories')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.showGroupsForAll') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.showGroupsForAll') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="mostrarGruposParaTodos"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="mostrarGruposParaTodos === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarVisualizacaoGrupos('mostrarGruposParaTodos')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.showClosedForAll') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.showClosedForAll') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="mostrarFechadoParaTodos"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="mostrarFechadoParaTodos === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarVisualizacaoFechados('mostrarFechadoParaTodos')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.rejectCalls') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.rejectCalls') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="rejectCalls"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="rejectCalls === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('rejectCalls')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="rejectCalls === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="callRejectMessage"
            type="textarea"
            autogrow
            dense
            outlined
            :label="$t('configuracoesGerais.labels.callRejectMessage')"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('callRejectMessage')"
          />
      </div>
      </div>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.chatbotLane') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.chatbotLane') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="chatbotLane"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="chatbotLane === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantShowChatbot('chatbotLane')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.chatbotFix') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.chatbotFix') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="fixarConexao"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="fixarConexao === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantFixarConexoes('fixarConexao')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.forcePending') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.forcePending') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="forcarPendente"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="forcarPendente === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantForcarPendente('forcarPendente')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.agruparTickets') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.agruparTickets') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="agruparTickets"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="agruparTickets === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantAgruparTickets('agruparTickets')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple class="responsive-item">
        <q-item-section class="text-section">
          <q-item-label>{{ $t('configuracoesGerais.labels.messageListingType') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.messageListingType') }}</q-item-label>
        </q-item-section>

        <q-item-section class="select-section">
          <q-select
            outlined
            dense
            v-model="messageListingType"
            :options="messageListingTypeOptions"
            map-options
            emit-value
            @update:model-value="alterarTenantMessageListingType()"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.listarPelaUltimaMensagem') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.listarPelaUltimaMensagem') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="listarPelaUltimaMensagem"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="listarPelaUltimaMensagem === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantListByLastMessage('listarPelaUltimaMensagem')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.validateContact') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.validateContact') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="validateContact"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="validateContact === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantValidateContact('validateContact')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.hearHubApi') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.hearHubApi') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="hearHubApi"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="hearHubApi === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantHearHubApi('hearHubApi')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.ticketsRain') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.ticketsRain') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ticketsRain"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ticketsRain === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantTicketsRain('ticketsRain')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.shutdownWallet') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.shutdownWallet') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="carteiraExterna"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="carteiraExterna === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarCarteiraExterna('carteiraExterna')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.waitProcessing') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.waitProcessing') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="esperarProcessamento"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="esperarProcessamento === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarProcessamentoExterno('esperarProcessamento')"
        />
        </q-item-section>
      </q-item>
      
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.transbordo') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.transbordo') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="transbordo"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="transbordo === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarServicoTransbordo('transbordo')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.openChat') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.openChat') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="janelaConversa"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="janelaConversa === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarJanelaWaba('janelaConversa')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.atualizarNomes') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.atualizarNomes') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="atualizarNomes"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="atualizarNomes === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantAtualizarNomesTickets('atualizarNomes')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.forcarAdmin') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.forcarAdmin') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="forcarAdmin"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="forcarAdmin === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantForcarAdmin('forcarAdmin')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.audioPlugin') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.audioPlugin') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="pluginAudio"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="pluginAudio === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarPluginAudio('pluginAudio')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.audioModule') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.audioModule') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="audioModulo"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="audioModulo === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarModuloAudio('audioModulo')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.signed') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.signed') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="signed"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="signed === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('signed')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.controlFeatures') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.controlFeatures') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="controleFeatures"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="controleFeatures === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantControlFeatures('controleFeatures')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.forceReason') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.forceReason') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="forceReason"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="forceReason === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantForcarRazao('forceReason')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.allowPause') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.allowPause') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="allowPause"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="allowPause === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantAllowPause('allowPause')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.universalCounter') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.universalCounter') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="universalCounter"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="universalCounter === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('universalCounter')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.autoClose') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.autoClose') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="autoClose"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="autoClose === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('autoClose')"
        />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="autoClose === 'enabled'">
        <div class="col-12">
          <q-select
            v-model="autoCloseTime"
            :options="tempoOptions"
            outlined
            :label="$t('configuracoesGerais.labels.autoCloseTime')"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('autoCloseTime')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="autoClose === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="autoCloseMessage"
            type="textarea"
            autogrow
            dense
            outlined
            :label="$t('configuracoesGerais.labels.autoCloseMessage')"
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('autoCloseMessage')"
          />
        </div>
      </div>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.ticketLimit') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.ticketLimit') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="ticketLimit"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="ticketLimit === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('ticketLimit')"
        />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="ticketLimit === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="ticketLimitDaysAgo"
            type="number"
            
            dense
            outlined
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            :label="$t('configuracoesGerais.labels.days')"
            @update:model-value="atualizarConfiguracao('ticketLimitDaysAgo')"
          />
        </div>
      </div>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.notificationSilenced') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.notificationSilenced') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="notificationSilenced"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="notificationSilenced === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('notificationSilenced')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.persistirMedia') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.persistirMedia') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="persistirMedia"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="persistirMedia === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarBaileysMediaPersist('persistirMedia')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.useUserBusinessHours') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.useUserBusinessHours') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="useUserBusinessHours"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="useUserBusinessHours === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantUseUserBusinessHours('useUserBusinessHours')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.webPushChatInterno') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.webPushChatInterno') }}</q-item-label>
        </q-item-section>

      <q-item-section avatar>
        <q-toggle
            v-model="webPushChatInterno"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webPushChatInterno === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantWebPushChatInterno('webPushChatInterno')"
        />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple class="responsive-item">
        <q-item-section class="text-section">
          <q-item-label>{{ $t('configuracoesGerais.labels.maxAttemps') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.maxAttemps') }}</q-item-label>
        </q-item-section>

        <q-item-section class="select-section">
          <q-input
            v-model="tentativas"
            type="number"
            dense
            outlined
            debounce="700"
            @update:model-value="alterarTenantTentativas('tentativas')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple class="responsive-item">
        <q-item-section class="text-section">
          <q-item-label>{{ $t('configuracoesGerais.labels.limitTickets') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.limitTickets') }}</q-item-label>
        </q-item-section>

        <q-item-section class="select-section">
          <q-input
            v-model="limiteTickets"
            type="number"
            dense
            outlined
            debounce="700"
            @update:model-value="alterarTenantLimiteTickets('limiteTickets')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple class="responsive-item">
        <q-item-section class="text-section">
          <q-item-label>{{ $t('configuracoesGerais.labels.limitePrivate') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.limitePrivate') }}</q-item-label>
        </q-item-section>

        <q-item-section class="select-section">
          <q-input
            v-model="limiteChatInterno"
            type="number"
            dense
            outlined
            debounce="700"
            @update:model-value="alterarTenantLimiteMensagensChatInterno('limiteChatInterno')"
          />
        </q-item-section>
      </q-item>

      <!-- <q-item tag="label" v-ripple class="responsive-item">
        <q-item-section class="text-section">
          <q-item-label>{{ $t('configuracoesGerais.labels.postmanLink') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.postmanLink') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar class="input-section">
          <q-input
            v-model="postmanLink"
            type="text"
            dense
            outlined
            debounce="700"
            @update:model-value="alterarTenantPostmanLink('postmanLink')"
          />
        </q-item-section>
      </q-item> -->

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.forbiddenNumbers') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.forbiddenNumbers') }}</q-item-label>
        </q-item-section>
        </q-item>
      <div class="row q-px-md">
        <div class="col-12">
          <q-input
            v-model="forbiddenNumbers"
            dense
            outlined
            input-style="min-height: 6vh; max-height: 9vh;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('forbiddenNumbers')"
          />
        </div>
      </div>

       <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.erroMessage') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.erroMessage') }}</q-item-label>
        </q-item-section>
        <q-btn  @click="forcarMensagem"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            {{ $t('common.send') }}
          </q-tooltip>
        </q-btn>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.solveMessage') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.solveMessage') }}</q-item-label>
        </q-item-section>
        <q-btn  @click="resolvePending"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            {{ $t('common.send') }}
          </q-tooltip>
        </q-btn>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.validate') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.validate') }}</q-item-label>
          <div v-if="loading">{{ $t('configuracoesGerais.captions.validating') }}</div>
          <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
          </div>
        </q-item-section>
        <q-btn  @click="checkContact"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            {{ $t('common.send') }}
          </q-tooltip>
        </q-btn>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.syncMessagesUpdate') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.syncMessagesUpdate') }}</q-item-label>
          <div v-if="loading">{{ $t('configuracoesGerais.captions.syncMessagesUpdate') }}</div>
          <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
          </div>
        </q-item-section>
        <q-btn  @click="atualizarMensagens"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            {{ $t('common.send') }}
          </q-tooltip>
        </q-btn>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.syncTicketData') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.syncTicketData') }}</q-item-label>
          <div v-if="loading">{{ $t('configuracoesGerais.captions.syncTicketData') }}</div>
          <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
          </div>
        </q-item-section>
        <q-btn  @click="atualizarDataTickets"
            flat
            icon="mdi-replay"
            color="negative"
            class="bg-padrao btn-rounded" >
          <q-tooltip content-class="bg-negative text-bold">
            {{ $t('common.send') }}
          </q-tooltip>
        </q-btn>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesGerais.labels.scanContacts') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesGerais.captions.scanContacts') }}</q-item-label>
          <div v-if="loading">{{ $t('configuracoesGerais.captions.scanContacts') }}</div>
          <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
          </div>
        </q-item-section>
        <q-btn @click="scanContacts"
               flat
               icon="mdi-replay"
               color="negative"
               class="bg-padrao btn-rounded">
          <q-tooltip content-class="bg-primary text-bold">
            {{ $t('configuracoesGerais.labels.scanContacts') }}
          </q-tooltip>
        </q-btn>
      </q-item>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarChatFlow } from 'src/service/chatFlow.js'
import { Restart } from 'src/service/pm2.js'
import { AlterarConfiguracao, ListarConfiguracoes } from 'src/service/configuracoes.js'
import { ListarTenantPorId, AlterarTenantShowChatbot, AlterarTenantControlFeatures, AlterarTenantForcarRazao, AlterarTenantAllowPause, AlterarTenantUseUserBusinessHours, AlterarTenantNullTickets, AlterarTenantLimiteMensagensChatInterno, AlterarTenantPostmanLink, AlterarTenantTentativas, AlterarTenantLimiteTickets, AlterarTenantListByLastMessage, AlterarTenantValidateContact, AlterarTenantHearHubApi, AlterarTenantTicketsRain, AlterarTenantAgruparTicket, AlterarServicoTransbordo, AlterarJanelaWaba, AlterarProcessamentoExterno, AlterarCarteiraExterna, AlterarVisualizacaoGrupos, AlterarIgnorarStories, AlterarVisualizacaoFechados, AlterarBaileysMediaPersist, AlterarPluginAudio, AlterarModuloAudio, AlterarTenantAtualizarNomes, AlterarTenantForcarPendente, AlterarTenantSemRedis, AlterarTenantSupervisorAdmin, AlterarTenantFixarConexoes, AlterarTenantForcarAdmin, AlterarTenantWebPushChatInterno, AlterarTenantMessageListingType } from 'src/service/tenants.js'
import { ResolvePending, AtualizarMensagensSyncTime, AtualizarLastMessageAtTickets} from 'src/service/tickets.js'
import { ValidarTodosContatos, ForcarMensagem } from 'src/service/sessoesWhatsapp.js'
import { defineComponent } from 'vue'
import { ScanContacts } from 'src/service/tenants.js';

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      userProfile: 'user',
      tempoOptions: [
        { value: '10', label: this.$t('configuracoesGerais.labels.minutes') },
        { value: '60', label: this.$t('configuracoesGerais.labels.hours') },
        { value: '1440', label: this.$t('configuracoesGerais.labels.day') },
        { value: '7200', label: this.$t('configuracoesGerais.labels.days5') },
        { value: '14400', label: this.$t('configuracoesGerais.labels.days10') },
      ],
      validateContact: null,
      hearHubApi: null,
      ticketsRain: null,
      configuracoes: [],
      listaChatFlow: [],
      NotViewAssignedTickets: null,
      NotViewTicketsChatBot: null,
      DirectTicketsToWallets: null,
      botTicketActive: null,
      ignoreGroupMsg: null,
      rejectCalls: null,
      callRejectMessage: '',
      signed: null,
      controleFeatures: null,
      forceReason: null,
      allowPause: null,
      useUserBusinessHours: null,
      chatbotLane: null,
      ticketNulo: null,
      webPushChatInterno: null,
      fixarConexao: null,
      forcarPendente: null,
      semRedis: null,
      supervisor: null,
      agruparTickets: null,
      listarPelaUltimaMensagem: null,
      transbordo: null,
      janelaConversa: null,
      carteiraExterna: null,
      mostrarGruposParaTodos: null,
      ignorarStories: null,
      pluginAudio: null,
      audioModulo: null,
      mostrarFechadoParaTodos: null,
      persistirMedia: null,
      esperarProcessamento: null,
      atualizarNomes: null,
      forcarAdmin: null,
      tentativas: '',
      limiteChatInterno: '',
      postmanLink: 'https://www.postman.com/comunidade-zdg/z-pro/collection/s16subg/postman-v3-x-x-x?action=share&creator=25151510',
      limiteTickets: '',
      notificationSilenced: null,
      forbiddenNumbers: [],
      universalCounter: null,
      autoClose: null,
      autoCloseTime: null,
      autoCloseMessage: '',
      ticketLimit: null,
      ticketLimitDaysAgo: '',
      messageListingType: 'default',
      loading: false,
    }
  },
  computed: {
    messageListingTypeOptions() {
      return [
        { value: 'default', label: this.$t('configuracoesGerais.labels.messageListingTypeDefault') },
        { value: 'byQueue', label: this.$t('configuracoesGerais.labels.messageListingTypeByQueue') },
        { value: 'complete', label: this.$t('configuracoesGerais.labels.messageListingTypeComplete') },
        { value: 'byTicket', label: this.$t('configuracoesGerais.labels.messageListingTypeByTicket') },
      ];
    }
  },
  methods: {
    async atualizarDataTickets(){
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitle4'),
        message: this.$t('configuracoesGerais.dialogs.syncTicketData'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('configuracoesGerais.notifications.processStarted'),
        });
        this.loading = true;
        try{
          try {
            const response = await AtualizarLastMessageAtTickets(this.usuario.tenantId);
            this.$q.notify({
              color: 'warning',
              position: 'bottom',
              message: response.data.message,
            });
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.$t('configuracoesGerais.notifications.updatingMessagesDate'),
            });
          } catch (error) {
            // Silenciar erros de timeout - não mostrar no console
            if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
              console.error('Erro ao atualizar mensagens:', error);
            }
          }
          this.loading = false;
        } catch(e){
          console.log('error', e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: `Error: ${e.data}`,
          });
          this.loading = false;
        }
      })
    },
    async atualizarMensagens() {
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitle2'),
        message: this.$t('configuracoesGerais.dialogs.updateMessagesDate'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('configuracoesGerais.notifications.processStarted'),
        });
        this.loading = true;
        try{
          try {
            const response = await AtualizarMensagensSyncTime(this.usuario.tenantId);
            this.$q.notify({
              color: 'warning',
              position: 'bottom',
              message: response.data.message,
            });
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: this.$t('configuracoesGerais.notifications.updatingMessagesDate'),
            });
          } catch (error) {
            // Silenciar erros de timeout - não mostrar no console
            if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
              console.error('Erro ao atualizar mensagens:', error);
            }
          }
          this.loading = false;
        } catch(e){
          console.log('error', e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: `Error: ${e.data}`,
          });
          this.loading = false;
        }
      })
    },
    async handleDependencies(changedKey) {
      console.log('changedKey', changedKey);
      if (changedKey === 'NotViewAssignedTickets' && this.NotViewAssignedTickets === 'enabled') {
        // this.NotViewTicketsChatBot = 'disabled';
        this.ticketNulo = 'disabled';
        await this.atualizarConfiguracao('NotViewTicketsChatBot');
        await this.alterarTenantNullTickets();
        this.$q.notify({
        color: 'warning',
        position: 'top',
        message: this.$t('configuracoesGerais.notifications.warningTicketSettings'),
      });
      }

      if (changedKey === 'NotViewTicketsChatBot' && this.NotViewTicketsChatBot === 'enabled') {
        // this.NotViewAssignedTickets = 'disabled';
        this.ticketNulo = 'disabled';
        await this.atualizarConfiguracao('NotViewAssignedTickets');
        await this.alterarTenantNullTickets();
        this.$q.notify({
        color: 'warning',
        position: 'top',
        message: this.$t('configuracoesGerais.notifications.warningTicketSettings'),
      });
      }

      if (changedKey === 'ticketNulo' && this.ticketNulo === 'enabled') {
        this.NotViewAssignedTickets = 'disabled';
        this.NotViewTicketsChatBot = 'disabled';
        await this.atualizarConfiguracao('NotViewAssignedTickets');
        await this.atualizarConfiguracao('NotViewTicketsChatBot');
        await this.alterarTenantNullTickets();
        this.$q.notify({
        color: 'warning',
        position: 'top',
        message: this.$t('configuracoesGerais.notifications.warningTicketSettings'),
      });
      }

      // Atualiza a configuração alterada no backend para a chave principal
      if (changedKey === 'NotViewAssignedTickets' || changedKey === 'NotViewTicketsChatBot') {
        await this.atualizarConfiguracao(changedKey);
      }

      if (changedKey === 'ticketNulo' && this.ticketNulo === 'disabled') {
        await this.alterarTenantNullTickets();
        this.$q.notify({
          color: 'warning',
          position: 'top',
          message: this.$t('configuracoesGerais.notifications.warningTicketSettings'),
        });
      }
    },
    async checkContact(){
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitle3'),
        message: this.$t('configuracoesGerais.dialogs.validateAllContacts'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('configuracoesGerais.notifications.processStarted'),
        });
        this.loading = true;
        try{
          try {
            const response = await ValidarTodosContatos();
            this.$q.notify({
              color: 'warning',
              position: 'bottom',
              message: response.data.message,
            });
          this.$q.notify({
            color: 'positive',
            position: 'top',
              message: this.$t('configuracoesGerais.notifications.contactsValidated'),
          });
        } catch (error) {
            console.error('Erro ao atualizar mensagens:', error);
          }
          this.loading = false;
        } catch(e){
          console.log('error', e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: `${this.$t('configuracoesGerais.notifications.errorValidatingContacts')}: ${e.data.error}`,
          });
          this.loading = false;
        }
      })

    //   this.$q.notify({
    //     color: 'positive',
    //     position: 'top',
    //     message: this.$t('configuracoesGerais.notifications.processStarted'),
    //   });
    //   this.loading = true;
    //   try{
    //     await ValidarTodosContatos()
    //     this.$q.notify({
    //       color: 'positive',
    //       position: 'top',
    //       message: this.$t('configuracoesGerais.notifications.contactsValidated'),
    //     });
    //     this.loading = false;
    // } catch(e){
    //     this.$q.notify({
    //       color: 'negative',
    //       position: 'top',
    //       message: `${this.$t('configuracoesGerais.notifications.errorValidatingContacts')}: ${e.data.error}`,
    //     });
    //     this.loading = false;
    //   }
    },
    async forcarMensagem(){
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitle'),
        message: this.$t('configuracoesGerais.dialogs.sendPendingMessages'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('configuracoesGerais.notifications.processStarted'),
        });
        this.loading = true;
        try{
          await ForcarMensagem()
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: this.$t('configuracoesGerais.notifications.sendingMessages'),
          });
          this.loading = false;
        } catch(e){
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: `${this.$t('configuracoesGerais.notifications.errorSendingMessages')}: ${e.data.error}`,
          });
          this.loading = false;
        }
      })

    },
    // recarregarPagina() {
    //   setTimeout(() => {
    //     location.reload(true);
    //   }, 1000);
    // },
    resetarFluxoAtivo() {
      this.botTicketActive = '';
      this.atualizarConfiguracao('botTicketActive');
    },
    async restart(){
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitle'),
        message: this.$t('configuracoesGerais.dialogs.restartApiMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        await Restart() 
      })
    },
    async resolvePending(){
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitle'),
        message: this.$t('configuracoesGerais.dialogs.resolvePendingMessages'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        await ResolvePending() 
      })
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      this.configuracoes = data
      this.configuracoes.forEach((el) => {
        let value = el.value
        if (el.key === 'botTicketActive' && el.value) {
          value = +el.value
        }
        this.$data[el.key] = value
      })
    },
    async listarChatFlow() {
      const { data } = await ListarChatFlow()
      this.listaChatFlow = data.chatFlow
    },
    async atualizarConfiguracao(key) {
      if (key === 'autoCloseTime'){
        const params = { key, value: this.$data[key].value }
        try {
          await AlterarConfiguracao(params)
          this.$q.notify({
            type: 'positive',
            message: this.$t('common.notifications.success'),
            progress: true,
            actions: [{ icon: 'close', round: true, color: 'white' }],
          })
        } catch (error) {
          // Silenciar erros de timeout - não mostrar no console
          if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
            console.error('error - AlterarConfiguracao', error)
            this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
            this.$notificarErro(this.$t('common.notifications.error'), error)
          }
        }
      }
      else {
        const params = { key, value: this.$data[key] }
        try {
          await AlterarConfiguracao(params)
          this.$q.notify({
            type: 'positive',
            message: 'Configuração alterada',
            progress: true,
            actions: [{ icon: 'close', round: true, color: 'white' }],
          })
          if(key === 'ignoreGroupMsg'){
            this.$q.notify({
              position: 'top',
              type: 'negative',
              message: this.$t('configuracoesGerais.notifications.baileysGroupWarning'),
              progress: true,
              actions: [{ icon: 'close', round: true, color: 'white' }],
            })
          }
        } catch (error) {
          // Silenciar erros de timeout - não mostrar no console
          if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
            console.error('error - AlterarConfiguracao', error)
            this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
            this.$notificarErro(this.$t('common.notifications.error'), error)
          }
        }
      }
    },
    async alterarTenantShowChatbot(){
      try {
        await AlterarTenantShowChatbot({
          id: this.usuario.tenantId,
          showChatBot: this.chatbotLane,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantForcarRazao(){
      try {
        await AlterarTenantForcarRazao({
          id: this.usuario.tenantId,
          forceReason: this.forceReason,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantAllowPause(){
      try {
        await AlterarTenantAllowPause({
          id: this.usuario.tenantId,
          allowPause: this.allowPause,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantUseUserBusinessHours(){
      try {
        await AlterarTenantUseUserBusinessHours({
          id: this.usuario.tenantId,
          useUserBusinessHours: this.useUserBusinessHours,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantWebPushChatInterno(){
      try {
        await AlterarTenantWebPushChatInterno({
          id: this.usuario.tenantId,
          webPushChatInterno: this.webPushChatInterno,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantControlFeatures(){
      try {
        await AlterarTenantControlFeatures({
          id: this.usuario.tenantId,
          controlFeatures: this.controleFeatures,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantNullTickets(){
      try {
        const response = await AlterarTenantNullTickets({
          id: this.usuario.tenantId,
          nullTickets: this.ticketNulo,
        })
        console.log(response)
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantForcarAdmin(){
      try {
        await AlterarTenantForcarAdmin({
          id: this.usuario.tenantId,
          forceAdmin: this.forcarAdmin,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantFixarConexoes(){
      try {
        await AlterarTenantFixarConexoes({
          id: this.usuario.tenantId,
          fixConnections: this.fixarConexao,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantForcarPendente(){
      try {
        await AlterarTenantForcarPendente({
          id: this.usuario.tenantId,
          forcePendingUser: this.forcarPendente,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantSupervisorAdmin(){
      try {
        await AlterarTenantSupervisorAdmin({
          id: this.usuario.tenantId,
          supervisorAdmin: this.supervisor,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantSemRedis(){
      try {
        await AlterarTenantSemRedis({
          id: this.usuario.tenantId,
          noRedis: this.semRedis,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantAgruparTickets(){
      try {
        await AlterarTenantAgruparTicket({
          id: this.usuario.tenantId,
          groupTickets: this.agruparTickets,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantMessageListingType(){
      try {
        await AlterarTenantMessageListingType({
          id: this.usuario.tenantId,
          messageListingType: this.messageListingType,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarTenantMessageListingType', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantListByLastMessage(){
      try {
        await AlterarTenantListByLastMessage({
          id: this.usuario.tenantId,
          listByLastMessage: this.listarPelaUltimaMensagem,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantValidateContact(){
      try {
        await AlterarTenantValidateContact({
          id: this.usuario.tenantId,
          validateContact: this.validateContact,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantHearHubApi(){
      try {
        await AlterarTenantHearHubApi({
          id: this.usuario.tenantId,
          hearHubApi: this.hearHubApi,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantTicketsRain(){
      try {
        await AlterarTenantTicketsRain({
          id: this.usuario.tenantId,
          ticketsRain: this.ticketsRain,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarJanelaWaba(){
      try {
        await AlterarJanelaWaba({
          id: this.usuario.tenantId,
          forceOpenChatWindow: this.janelaConversa,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarServicoTransbordo(){
      try {
        await AlterarServicoTransbordo({
          id: this.usuario.tenantId,
          serviceTransfer: this.transbordo,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarProcessamentoExterno(){
      try {
        await AlterarProcessamentoExterno({
          id: this.usuario.tenantId,
          waitProcessExternalInteraction: this.esperarProcessamento,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarCarteiraExterna(){
      try {
        await AlterarCarteiraExterna({
          id: this.usuario.tenantId,
          walletExternalInteraction: this.carteiraExterna,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarIgnorarStories(){
      try {
        await AlterarIgnorarStories({
          id: this.usuario.tenantId,
          ignoreIgStories: this.ignorarStories,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarVisualizacaoGrupos(){
      try {
        await AlterarVisualizacaoGrupos({
          id: this.usuario.tenantId,
          showGroupsForAll: this.mostrarGruposParaTodos,
        })
        localStorage.setItem('mostrarGruposParaTodos', this.mostrarGruposParaTodos);
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarModuloAudio(){
      try {
        await AlterarModuloAudio({
          id: this.usuario.tenantId,
          audioModule: this.audioModulo,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarPluginAudio(){
      try {
        await AlterarPluginAudio({
          id: this.usuario.tenantId,
          audioPlugin: this.pluginAudio,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarBaileysMediaPersist(){
      try {
        await AlterarBaileysMediaPersist({
          id: this.usuario.tenantId,
          baileysMediaPersist: this.persistirMedia,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarVisualizacaoFechados(){
      try {
        await AlterarVisualizacaoFechados({
          id: this.usuario.tenantId,
          showClosedForAll: this.mostrarFechadoParaTodos,
        })
        localStorage.setItem('mostrarFechadoParaTodos', this.mostrarFechadoParaTodos);
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantAtualizarNomesTickets(){
      try {
        await AlterarTenantAtualizarNomes({
          id: this.usuario.tenantId,
          updateNames: this.atualizarNomes,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantTentativas(){
      try {
        await AlterarTenantTentativas({
          id: this.usuario.tenantId,
          maxRetries: this.tentativas,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantLimiteMensagensChatInterno(){
      try {
        await AlterarTenantLimiteMensagensChatInterno({
          id: this.usuario.tenantId,
          privateMessageLimit: this.limiteChatInterno,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantPostmanLink(){
      try {
        await AlterarTenantPostmanLink({
          id: this.usuario.tenantId,
          postmanLink: this.postmanLink,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async alterarTenantLimiteTickets(){
      try {
        await AlterarTenantLimiteTickets({
          id: this.usuario.tenantId,
          ticketLimit: this.limiteTickets,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarConfiguracao', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      } 
    },
    async listarTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.chatbotLane = data[0].showChatBot
      this.controleFeatures = data[0].controlFeatures
      this.forceReason = data[0].forceReason
      this.allowPause = data[0].allowPause
      this.useUserBusinessHours = data[0].useUserBusinessHours
      this.ticketNulo = data[0].nullTickets
      this.tentativas = data[0].maxRetries
      this.limiteChatInterno = data[0].privateMessageLimit
      this.postmanLink = data[0].postmanLink
      this.fixarConexao = data[0].fixConnections
      this.forcarPendente = data[0].forcePendingUser
      this.semRedis = data[0].noRedis
      this.supervisor = data[0].supervisorAdmin
      this.agruparTickets = data[0].groupTickets
      this.listarPelaUltimaMensagem = data[0].listByLastMessage
      this.validateContact = data[0].validateContact
      this.hearHubApi = data[0].hearHubApi
      this.ticketsRain = data[0].ticketsRain
      this.transbordo = data[0].serviceTransfer
      this.janelaConversa = data[0].forceOpenChatWindow
      this.carteiraExterna = data[0].walletExternalInteraction
      this.mostrarGruposParaTodos = data[0].showGroupsForAll
      this.ignorarStories = data[0].ignoreIgStories
      this.pluginAudio = data[0].audioPlugin
      this.audioModulo = data[0].audioModule
      this.mostrarFechadoParaTodos = data[0].showClosedForAll
      this.persistirMedia = data[0].baileysMediaPersist
      this.esperarProcessamento = data[0].waitProcessExternalInteraction
      this.atualizarNomes = data[0].updateNames
      this.forcarAdmin = data[0].forceAdmin
      this.limiteTickets = data[0].ticketLimit
      this.webPushChatInterno = data[0].webPushChatInterno
      this.messageListingType = data[0].messageListingType || 'default'
    },
    async scanContacts() {
      this.$q.dialog({
        title: this.$t('configuracoesGerais.dialogs.confirmationTitleScanContacts'),
        message: this.$t('configuracoesGerais.dialogs.scanContacts'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('configuracoesGerais.notifications.processStarted'),
        });
        this.loading = true;
        try {
          await ScanContacts(this.usuario.tenantId);
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: this.$t('configuracoesGerais.notifications.scanContactsSuccess')
          });
        } catch (error) {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: this.$t('configuracoesGerais.notifications.scanContactsError')
          });
        } finally {
          this.loading = false;
        }
      });
    }
  },
  async mounted() {
    await this.listarConfiguracoes()
    await this.listarChatFlow()
    await this.listarTenantPorId()
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

.row.q-px-md {
  margin-bottom: 18px;
  &:last-of-type {
    margin-bottom: 0;
  }
  .col-12 {
    margin-bottom: 0;
  }
}

.q-input, .q-select {
  .q-field__control {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  }
  &.q-field--focused .q-field__control {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
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
  .q-input, .q-select {
    .q-field__control {
      background: rgba(255,255,255,0.05);
      &:hover {
        background: rgba(255,255,255,0.1);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.15);
    }
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
  .row.q-px-md {
    margin-bottom: 10px;
  }
}
</style>