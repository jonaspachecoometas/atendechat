<template>
  <div v-if="pageAllowed">
    <q-table style="border-radius: 8px !important" class="my-sticky-dynamic" :title="$t('contacts.tableTitle')" :id="`tabela-contatos-${isChatContact ? 'atendimento' : ''}`"
      :rows="contacts" :columns="filteredColumns" :loading="loading" row-key="id" virtual-scroll
      :virtual-scroll-item-size="48" :virtual-scroll-sticky-size-start="48" v-model:pagination="pagination"
      :rows-per-page-options="[0]" @virtual-scroll="onScroll" :bordered="isChatContact" :square="isChatContact"
      :flat="isChatContact" :separator="isChatContact ? 'vertical' : 'horizontal'" :class="{
        'q-ma-lg': !isChatContact,
        'q-ml-md heightChat': isChatContact
      }">
      <template v-slot:top>
        <div class="row q-gutter-md items-center">
          <div class="col-auto row items-center">
            <q-btn v-if="isChatContact" class="q-mr-sm" color="black" round flat icon="mdi-close"
              @click="$router.push({ name: 'chat-empty' })" />
              <div class="text-h6">{{ $t('contacts.tableTitle') }}</div>
          </div>
          <q-space />
          <div class="col-auto row items-center">
            <q-input style="margin-right: 20px;" filled dense debounce="500" v-model="filter" clearable
            :placeholder="$t('contacts.searchPlaceholder')" @update:model-value="filtrarContato">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-select v-model="selectedWallet" :options="usuarios" option-value="id" option-label="name" clearable
              filled dense style="width: 200px; margin-right: 20px;" :label="$t('contacts.walletFilterLabel')"
              @update:model-value="filtrarContatoPorCarteira">
              <template v-slot:prepend>
                <q-icon name="mdi-wallet" />
              </template>
            </q-select>
            <q-select
              v-model="selectedTag"
              :options="tagsOptions"
              option-value="id"
              option-label="tag"
              clearable
              filled
              dense
             
              style="width: 200px; margin-right: 20px;"
              :label="$t('contacts.tagFilterLabel')"
              @update:model-value="filtrarContatoPorEtiqueta"
              >
              <template v-slot:prepend>
                <q-icon name="mdi-tag" />
              </template>
            </q-select>
          </div>
          <div class="header-actions-mobile">
            <q-btn 
              v-if="selectedContacts.length === 0" 
              class="q-ml-md" 
              color="primary" 
              :label="$t('common.add')"
              @click="selectedContactId = null; modalContato = true" 
            />
            <q-btn 
              v-if="selectedContacts.length > 0" 
              class="q-ml-md" 
              color="negative" 
              :label="`${$t('common.delete')} (${selectedContacts.length})`"
              @click="deleteSelectedContacts" 
            />
            <q-btn 
              v-if="selectedContacts.length > 0" 
              class="q-ml-md" 
              color="grey" 
              :label="$t('common.cancel')"
              @click="clearSelection" 
            />
            <q-btn-dropdown 
              v-if="selectedContacts.length === 0"
              color="warning" 
              :label="$t('common.actions')" 
              class="q-ml-md"
            >
              <q-list>
              <q-item v-if="userProfile === 'admin' || userProfile === 'super'" clickable @click="confirmarSincronizarContatos">
                <q-item-section>{{ $t('contacts.syncContactsLabel') }}</q-item-section>
              </q-item>
              <q-item v-if="userProfile === 'admin' || userProfile === 'super'" clickable @click="confirmarSincronizarGrupos">
                <q-item-section>{{ $t('contacts.syncGroupsLabel') }}</q-item-section>
              </q-item>
              <q-item v-if="!isChatContact" clickable @click="modalImportarContatos = true">
                <q-item-section>
                {{ $t('common.import') }}
                <q-tooltip :offset="[5, 5]">
                  {{ $t('contacts.downloadCsvHint') }}
                </q-tooltip>
                </q-item-section>
              </q-item>
              <q-item v-if="!isChatContact && (userProfile === 'admin' || userProfile === 'super')" clickable @click="handleExportContacts">
                <q-item-section>{{ $t('contacts.exportContactsLabel') }}</q-item-section>
              </q-item>
              <q-item v-if="userProfile === 'admin' || userProfile === 'super'" clickable @click="removerDuplicados">
                <q-item-section>{{ $t('contacts.removeDuplicatesLabel') }}</q-item-section>
              </q-item>
              <q-item v-if="userProfile === 'admin' || userProfile === 'super'" clickable @click="agruparLid">
                <q-item-section>{{ $t('contacts.agruparLid') }}</q-item-section>
              </q-item>
              <q-item v-if="userProfile === 'admin' || userProfile === 'super'" clickable @click="checarNonoDigito">
                <q-item-section>{{ $t('contacts.checkDigit') }}</q-item-section>
              </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown 
              v-if="selectedContacts.length === 0"
              :label="$t('contacts.coluumnsButton')" 
              color="grey-8" 
              icon="settings" 
              class="q-ml-md"
            >
              <q-list>
              
                <q-item
                  v-for="col in columns.filter(c => c && c.name && !fixedColumns.includes(c.name))"
                  :key="col.name"
                  clickable
                  @click="toggleColumnVisibility(col.name)"
                >
                  <q-item-section>
                    <q-checkbox
                      v-model="visibleColumns[col.name]"
                      :label="col.label"
                      @click.stop
                    />
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>

          </div>
        </div>
      </template>

      <template v-slot:header-cell-select="props">
        <q-th>
          <q-checkbox 
            v-model="selectAll"
            @update:model-value="toggleSelectAll"
            :indeterminate="selectedContacts.length > 0 && selectedContacts.length < contacts.length"
          />
        </q-th>
      </template>

      <template v-slot:body-cell-select="props">
        <q-td>
          <q-checkbox 
            v-model="selectedContacts" 
            :val="props.row.id"
            @update:model-value="updateSelectAll"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-profilePicUrl="props">
        <q-td>
          <q-avatar class="blur-effect" style="border: 1px solid #9e9e9ea1 !important; cursor: pointer;"
            @click="openImageModal(props.value)">
            <q-icon name="mdi-account" size="1.5em" color="grey-5" v-if="!props.value" />
            <q-img :src="props.value" style="max-width: 150px" @error="handleImageError(props.row)">
              <template v-slot:error>
                <q-icon name="mdi-account" size="1.5em" color="grey-5" />
              </template>
            </q-img>
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat round icon="img:whatsapp-logo.png" @click="handleSaveTicket(props.row, 'whatsapp')"
            v-if="props.row.number && cSessionsWpp.length > 0" />
          <q-btn flat round icon="img:baileys-logo.png" @click="handleSaveTicket(props.row, 'baileys')"
            v-if="props.row.number && cSessionsBaileys.length > 0" />
          <q-btn flat round icon="img:meow-logo.png" @click="handleSaveTicket(props.row, 'meow')"
            v-if="props.row.number && cSessionsMeow.length > 0" />
          <q-btn flat round icon="img:evo-logo.png" @click="handleSaveTicket(props.row, 'evo')"
            v-if="props.row.number && cSessionsEvo.length > 0" />
          <q-btn flat round icon="img:zapi-logo.png" @click="handleSaveTicket(props.row, 'zapi')"
            v-if="props.row.number && cSessionsZapi.length > 0" />
          <q-btn flat round icon="img:uazapi-logo.png" @click="handleSaveTicket(props.row, 'uazapi')"
            v-if="props.row.number && cSessionsUazapi.length > 0" />
          <q-btn flat round icon="img:waba-logo.png" @click="handleSaveTicket(props.row, 'waba')"
            v-if="props.row.number && cSessionsWaba.length > 0" />
          <q-btn flat round icon="img:messenger-logo.png" @click="handleSaveTicket(props.row, 'messenger')"
            v-if="props.row.messengerId && !props.row.number && cSessionsMessenger.length > 0" />
          <q-btn flat round icon="img:instagram-logo.png" @click="handleSaveTicket(props.row, 'instagram')"
            v-if="props.row.instagramPK && !props.row.number && cSessionsInstagram.length > 0" />
          <q-btn flat round icon="img:hub_instagram-logo.png" @click="handleSaveTicket(props.row, 'hub_instagram')"
            v-if="props.row.instagramPK" />
          <q-btn flat round icon="img:hub_facebook-logo.png" @click="handleSaveTicket(props.row, 'hub_facebook')"
            v-if="props.row.messengerId" />
          <q-btn flat round icon="img:hub_whatsapp-logo.png" @click="handleSaveTicket(props.row, 'hub_whatsapp_business_account')"
            v-if="props.row.number && cSessionsHub.length > 0" />
          <!-- <q-btn flat round icon="mdi-phone-in-talk" @click="outcomingCall(props.row)"
            v-if="props.row.number && cSessionsWithWavoipToken.length > 0" /> -->
          <q-btn flat round icon="mdi-phone-in-talk" color="primary" @click="outcomingCallNovo(props.row)"
            v-if="props.row.number && cSessionsWithWavoipToken.length > 0">
            <q-tooltip>{{ $t('generalSupport.contactDetails.call') }}</q-tooltip>
          </q-btn>
          <q-btn v-if="userProfile === 'admin'" flat round icon="mdi-eye" @click="espiarAtendimentoContactId(props.row.id)" />
          <q-btn flat round icon="edit" @click="editContact(props.row.id)" />
          <q-btn flat round icon="mdi-delete" @click="deleteContact(props.row.id)" />
        </q-td>
      </template>
      <template v-slot:body-cell-number="props">
        <q-td>
          <span v-if="props.row.number" class="blur-effect">
            <a :href="getPhoneNumberLink(props.row.number)">
              {{ props.row.number }}
            </a>
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td>
          <span v-if="props.row.email" class="blur-effect">
            <a :href="'mailto:' + props.row.email">{{ props.row.email }}</a>
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td>
          <span v-if="props.row.name" class="blur-effect">
            {{ props.row.name }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-tags="props">
        <q-td :props="props">
          <span v-html="formatTags(props.row.tags)"></span>
        </q-td>
      </template>
      <template v-slot:pagination="{ pagination }">
        {{ contacts.length }}/{{ pagination.rowsNumber }}
      </template>
      <template v-slot:body-cell-bloquearContato="props">
        <q-td align="center">
          <q-toggle 
            v-model="props.row.blocked"
            @update:model-value="() => bloquearContato(props.row, props.row.blocked)" 
            color="primary"
            :label="$t('contacts.block')"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-bloquearChatbot="props">
        <q-td align="center">
          <q-toggle 
            v-model="props.row.chatbotBlocked"
            @update:model-value="() => bloquearChatbot(props.row, props.row.chatbotBlocked)" 
            color="primary"
            :label="$t('contacts.blockBot')"
          />
        </q-td>
      </template>
    </q-table>
    <ContatoModal :contactId="selectedContactId" v-model:modalContato="modalContato"
      @contatoModal:contato-editado="listarContatos" @contatoModal:contato-criado="listarContatos" />

    <q-dialog v-model="modalImportarContatos" persistent @show="abrirEnvioArquivo" @hide="limparFormularioImportacao">
      <q-card style="width: 400px;">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('contacts.importContactsLabel') }}</div>
        </q-card-section>
        <q-card-section>
          <q-file ref="PickerFileMessage" id="PickerFileMessage" bg-color="blue-grey-1" outlined dense use-chips
            accept=".txt, .csv" v-model="file" :label="$t('contacts.importContactsLabel') "
            :hint="$t('contacts.importWarning') ">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

        </q-card-section>
        <q-card-section>
          <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat>
            <q-card-section class="text-bold q-pb-none">
              {{ $t('contacts.tagsColumn') }}
              <q-separator />
            </q-card-section>
            <q-card-section class="q-pa-none">
              <q-select square borderless v-model="tags" multiple :options="etiquetas" use-chips option-value="id"
                option-label="tag" emit-value map-options dropdown-icon="add">
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps" v-on="itemEvents || {}">
                    <q-item-section>
                      <q-item-label v-html="opt.tag"></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="{ opt }">
                  <q-chip dense square color="white" text-color="primary" class="q-ma-xs row col-12 text-body1">
                    <q-icon :style="`color: ${opt.color}`" name="mdi-pound-box-outline" size="28px" class="q-mr-sm" />
                    {{ opt.tag }}
                  </q-chip>
                </template>
                <template v-slot:no-option="{ itemProps, itemEvents }">
                  <q-item v-bind="itemProps" v-on="itemEvents || {}">
                    <q-item-section>
                      <q-item-label class="text-negative text-bold">
                        {{ $t('contacts.noTagsAvailable') }}
                      </q-item-label>
                      <q-item-label caption>
                        {{ $t('contacts.noTagsAvailableWarning') }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>

              </q-select>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat>
            <q-card-section class="text-bold q-pb-none">
              {{ $t('contacts.walletColumn') }}
              <q-separator />
            </q-card-section>
            <q-card-section class="q-pa-none">
              <q-select square borderless v-model="wallets" multiple :max-values="1" :options="usuarios" use-chips
                option-value="id" option-label="name" emit-value map-options dropdown-icon="add">
              </q-select>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <q-checkbox 
            v-model="validContact"
            :label="$t('contacts.validateContact')" 
            color="primary" 
            keep-color 
          >
            <q-tooltip :offset="[5, 5]">
                {{ $t('contacts.validateContact') }}
              </q-tooltip>
          </q-checkbox>
          <q-banner class="bg-yellow text-black" inline-actions>
            {{ $t('contacts.validateContactWarning') }}
          </q-banner>
        </q-card-section>
        <q-card-section v-if="tags.length > 0">
          <q-checkbox 
            v-model="addTags"
            :label="$t('contacts.addTagsInsteadOfReplace')" 
            color="primary" 
            keep-color 
          >
            <q-tooltip :offset="[5, 5]">
              {{ $t('contacts.addTagsTooltip') }}
            </q-tooltip>
          </q-checkbox>
          <q-banner class="bg-blue text-white" inline-actions>
            {{ $t('contacts.addTagsWarning') }}
          </q-banner>
        </q-card-section>
        <q-card-section>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn class="q-ml-md" color="negative" :label="$t('common.cancel')" v-close-popup
            @click="limparFormularioImportacao" />

          <q-btn class="q-ml-md" color="positive" :label="$t('common.confirm')" @click="handleImportCSV" />
          <q-btn class="q-ml-md" color="primary" :label="$t('contacts.downloadModelLabel')" @click="downloadModelCsv" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalTransferirTicket" @hide="modalTransferirTicket = false" persistent>
      <q-card class="q-pa-md" style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('contacts.selectDestiny') }}</div>
        </q-card-section>
        <q-card-section>
          <q-select square outlined v-model="filaSelecionada" :options="filas" emit-value map-options option-value="id"
            option-label="queue" :label="$t('contacts.queueDestiny')" />
        </q-card-section>
        <q-card-section>
          <q-select square outlined v-model="usuarioSelecionado" :options="usuariosTransferencia.filter(filterUsers)"
            emit-value map-options option-value="id" option-label="name" :label="$t('contacts.userDestiny')"  />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('common.out')" color="negative" v-close-popup class="q-mr-lg" />
          <q-btn flat :label="$t('common.save')" color="primary" @click="confirmarTransferenciaTicket" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showImageModal">
      <q-card>
        <q-card-section>
          <q-img :src="selectedImageUrl" style="width: 400px; height: 400px;">
            <template v-slot:error>
              <q-img src="/nopicture.png" style="width: 400px; height: 400px;"></q-img>
            </template>
          </q-img>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('common.close')" color="primary" @click="showImageModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isTicketModalOpen" @show="scrollToBottom">
      <q-card :style="cardStyle">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">
            {{ $t('atendimentoItemTicketPainel.labels.espiarAtendimento', {
              idTicket: currentTicket.id
            }) }}
          </div>
          <q-btn icon="close" flat round @click="isTicketModalOpen = false" />
        </q-card-section>
        <q-card-section>
          <MensagemChatEspiarContato :mensagens="currentTicket.messages" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de seleção de WhatsApp -->
    <q-dialog v-model="showSelectWavoipDialog">
      <q-card style="min-width: 320px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">{{ $t('generalSupport.selectWavoip') }}</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="opt in wavoipOptions" :key="opt.value" clickable @click="selectedWavoipToken = opt.value" :active="selectedWavoipToken === opt.value">
              <q-item-section avatar>
                <q-icon :name="opt.icon" />
              </q-item-section>
              <q-item-section>{{ opt.label }}</q-item-section>
              <q-item-section side>
                <q-radio v-model="selectedWavoipToken" :val="opt.value" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')"  color="negative" @click="cancelarSelecaoWavoipContato" />
          <q-btn flat :label="$t('webphone.tooltips.call')" color="primary" :disable="!selectedWavoipToken" @click="confirmarSelecaoWavoipContato" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de seleção de WhatsApp (Novo) -->
    <q-dialog v-model="showSelectWavoipDialogNovo">
      <q-card style="min-width: 320px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">{{ $t('generalSupport.selectWavoip') }} (Novo)</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="opt in wavoipOptionsNovo" :key="opt.value" clickable @click="selectedWavoipTokenNovo = opt.value" :active="selectedWavoipTokenNovo === opt.value">
              <q-item-section avatar>
                <q-icon :name="opt.icon" />
              </q-item-section>
              <q-item-section>{{ opt.label }}</q-item-section>
              <q-item-section side>
                <q-radio v-model="selectedWavoipTokenNovo" :val="opt.value" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')"  color="negative" @click="cancelarSelecaoWavoipContatoNovo" />
          <q-btn flat :label="$t('webphone.tooltips.call')" color="primary" :disable="!selectedWavoipTokenNovo" @click="confirmarSelecaoWavoipContatoNovo" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
const userId = +localStorage.getItem('userId')
import { CriarTicket, AtualizarTicket } from 'src/service/tickets.js'
import { RemoverFotoNula, ListarContatos, ImportarArquivoContato, DeletarContato, DeletarContatoForcado, SyncronizarContatos, SyncronizarGrupos, ExportarArquivoContato, DeletarDuplicados, AgruparLid, EditarContato, ChecarNonoDigito } from 'src/service/contatos.js'
import ContatoModal from './ContatoModal.vue'
import { ListarUsuarios, DadosUsuario } from 'src/service/user.js'
import { ListarTenantPorId } from 'src/service/tenants.js' 
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { mapGetters } from 'vuex'
import { ListarFilas } from 'src/service/filas.js'
import { MostrarCores } from 'src/service/empresas.js';
import { ListarConfiguracoes } from 'src/service/configuracoes.js'
import mixinAtualizarStatusTicket from 'src/pages/atendimento/mixinAtualizarStatusTicket.js'
import MensagemChatEspiarContato from 'src/pages/atendimento/MensagemChatEspiarContato.vue'
import whatsBackground from 'src/assets/wa-background.png'
import whatsBackgroundDark from 'src/assets/wa-background-dark.jpg'
import eventBus from 'src/utils/eventBus.js'

export default {
  name: 'IndexContatos',
  components: { ContatoModal, MensagemChatEspiarContato },
  mixins: [mixinAtualizarStatusTicket],
  userProfile: null,
  usuario: {},
  props: {
    isChatContact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    
    cSessionsHub() {
      return this.whatsapps.filter(w => ["hub_whatsapp_business_account"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsWpp() {
      return this.whatsapps.filter(w => ["whatsapp"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsWaba() {
      return this.whatsapps.filter(w => ["waba"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsBaileys() {
      return this.whatsapps.filter(w => ["baileys"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsMeow() {
      return this.whatsapps.filter(w => ["meow"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsEvo() {
      return this.whatsapps.filter(w => ["evo"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsZapi() {
      return this.whatsapps.filter(w => ["zapi"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsUazapi() {
      return this.whatsapps.filter(w => ["uazapi"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsMessenger() {
      return this.whatsapps.filter(w => ["messenger"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsInstagram() {
      return this.whatsapps.filter(w => ["instagram"].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsWithWavoipToken() {
      return this.whatsapps.filter(w => w.wavoipToken && !w.isDeleted && w.status === 'CONNECTED');
    },
    filteredColumns() {
      // Filtra as colunas com base no estado de visibilidade e remove entradas inválidas
      return this.columns.filter(col => {
        if (!col || !col.name) return false
        // As colunas fixas são sempre visíveis
        return this.fixedColumns.includes(col.name) || this.visibleColumns[col.name];
      });
    },
    userProfile: {
    get() {
      return localStorage.getItem('profile') || 'user';
    },
    set(value) {
      localStorage.setItem('profile', value);
    }
  },
    cardStyle() {
      return {
        backgroundImage: this.$q.dark.isActive ? `url(${this.whatsBackgroundDark})` : `url(${this.whatsBackground})`
      };
    }
  },
  data() {
    return {
      pageAllowed: true,
      usuarioDados: null,
      selectedTag: null,
      isNotViewAssignedTickets: 'disabled',
      selectedWallet: null,
      showImageModal: false,
      selectedImageUrl: '',
      colors: {},
      modalTransferirTicket: false,
      modalTransferResolve: null,
      usuarioSelecionado: null,
      filaSelecionada: null,
      filas: [],
      usuariosTransferencia: [],
      tagsOptions: [],
      contacts: [],
      ticketFocado: '',
      modalImportarContatos: false,
      modalContato: false,
      file: [],
      isImportCSV: false,
      filter: null,
      selectedContactId: null,
      selectedContacts: [],
      selectAll: false,
      params: {
        pageNumber: 1,
        searchParam: null,
        hasMore: true
      },
      validContact: false,
      addTags: false,
      wallets: [],
      tags: [],
      etiquetas: [],
      usuarios: [],
      pagination: {
        rowsPerPage: 100,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      showSelectWavoipDialog: false,
      wavoipOptions: [],
      selectedWavoipToken: null,
      contatoParaChamada: null,
      showSelectWavoipDialogNovo: false,
      wavoipOptionsNovo: [],
      selectedWavoipTokenNovo: null,
      contatoParaChamadaNovo: null,
      columns: [
        { name: 'select', label: '', field: 'select', style: 'width: 50px', align: 'center' },
        { name: 'profilePicUrl', label: this.$t('contacts.photoColumn'), field: 'profilePicUrl', style: 'width: 50px', align: 'center' },
        { name: 'name', label: this.$t('contacts.nameColumn'), field: 'name', align: 'left', style: 'width: 300px' },
        { name: 'number', label: this.$t('contacts.whatsappColumn'), field: 'number', align: 'center', style: 'width: 300px' },
        { name: 'lid', label: this.$t('contacts.lid'), field: 'lid', align: 'center', style: 'width: 300px' },
        { name: 'firstName', label: this.$t('contacts.firstNameColumn'), field: 'firstName', align: 'center', style: 'width: 300px' },
        { name: 'lastName', label: this.$t('contacts.lastNameColumn'), field: 'lastName', align: 'center', style: 'width: 300px' },
        { name: 'businessName', label: this.$t('contacts.businessColumn'), field: 'businessName', align: 'center', style: 'width: 300px' },
        { name: 'wallet', label: this.$t('contacts.walletColumn'), field: 'wallet', align: 'center', style: 'width: 300px' },
        { name: 'tags', label: this.$t('contacts.tagsColumn'), field: 'tags', align: 'center', style: 'width: 300px' },
        { name: 'kanban', label: this.$t('contacts.kanbanColumn'), field: 'kanban', align: 'center', style: 'width: 300px' },
        { name: 'email', label: this.$t('contacts.emailColumn'), field: 'email', style: 'width: 500px', align: 'left' },
        { name: 'cpf', label: this.$t('contacts.cpfColumn'), field: 'cpf', style: 'width: 300px', align: 'left' },
        { name: 'birthdayDate', label: this.$t('contacts.birthdayColumn'), field: 'birthdayDate', style: 'width: 500px', align: 'left' },
        { name: 'telegramId', label: this.$t('contacts.telegramColumn'), field: 'telegramId', align: 'center', style: 'width: 300px' },
        { name: 'messengerId', label: this.$t('contacts.messengerColumn'), field: 'messengerId', align: 'center', style: 'width: 300px' },
        { name: 'instagramPK', label: this.$t('contacts.instagramColumn'), field: 'instagramPK', align: 'center', style: 'width: 300px' },
        { name: 'hubWhatsapp', label: this.$t('contacts.hubWaba'), field: 'hubWhatsapp', align: 'center', style: 'width: 300px' },
        { name: 'bloquearContato', label: this.$t('contacts.blockContactColumn'), field: 'blocked', align: 'center', style: 'width: 200px' },
        { name: 'bloquearChatbot', label: this.$t('contacts.blockChatbotColumn'), field: 'chatbotBlocked', align: 'center', style: 'width: 200px' },
        { name: 'acoes', label: this.$t('contacts.actionsColumn'), field: 'acoes', align: 'center' },
      ],
      visibleColumns: {
        select: true,
        profilePicUrl: true,
        name: true,
        number: true,
        lid: false,
        firstName: false,
        lastName: false,
        businessName: false,
        wallet: false,
        tags: true,
        kanban: false,
        email: false,
        cpf: false,
        birthdayDate: false,
        telegramId: false,
        messengerId: false,
        instagramPK: false,
        hubWhatsapp: false,
        bloquearContato: false,
        bloquearChatbot: false,
        acoes: true
      },
      fixedColumns: ['select', 'name', 'acoes', 'number'],
      isTicketModalOpen: false,
      currentTicket: {},
      whatsBackground: whatsBackground,
      whatsBackgroundDark: whatsBackgroundDark,
    }
  },
  methods: {
    async handleImageError(data){
      if(!data.id) return
      try {
        await RemoverFotoNula(data.id);
      } catch (error) {
        console.error(this.$t('atendimentoItemTicket.errors.erroRemoverFoto'), error);
      }
    },
    filtrarContatoPorEtiqueta() {
      this.selectedWallet = null;
      this.contacts = [];
      this.params.pageNumber = 1;
      this.params.tagId = this.selectedTag ? this.selectedTag.id : null;
      this.listarContatos();
    },
    async bloquearContato(contact, bloquearStatus) {
      const contato = {
        number: contact.number,
        blocked: bloquearStatus
      };
      try {
        const { data } = await EditarContato(contact.id, contato);
        this.$q.notify({
          type: 'positive',
          message: this.$t('contacts.blockStatusUpdated'),
        });
      } catch (error) {
        console.error('Erro ao bloquear contato:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('contacts.blockStatusError')
        });
      }
    },
    async bloquearChatbot(contact, bloquearStatusChatbot) {
      const contato = {
        number: contact.number,
        chatbotBlocked: bloquearStatusChatbot
      };
      try {
        const { data } = await EditarContato(contact.id, contato);
        this.$q.notify({
          type: 'positive',
          message: this.$t('contacts.blockChatbotSuccess') ,
        });
      } catch (error) {
        console.error('Erro ao bloquear chatbot:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('contacts.blockChatbotError'),
        });
      }
    },
    outcomingCall(props) {
      // Filtra todos os whatsapps conectados com wavoipToken válido
      const whatsappsDisponiveis = this.whatsapps.filter(w => w.wavoipToken && w.status === 'CONNECTED');
      if (whatsappsDisponiveis.length <= 1) {
        // Só existe um, usa direto
        const token = whatsappsDisponiveis[0]?.wavoipToken;
        this.$store.dispatch('webphone/outcomingCall', {
          phone: props.number,
          contact_name: props.name,
          chat_id: props.id,
          token: token,
          profile_picture: props.profilePicUrl || '',
          instances: [token]
        });
      } else {
        // Mais de um, abre o modal de seleção
        this.wavoipOptions = whatsappsDisponiveis.map(w => ({
          label: w.name + (w.id ? ` (#${w.id})` : ''),
          value: w.wavoipToken,
          icon: w.type ? `img:${w.type}-logo.png` : 'mdi-whatsapp',
          id: w.id
        }));
        this.selectedWavoipToken = null;
        this.contatoParaChamada = props;
        this.showSelectWavoipDialog = true;
      }
    },
    outcomingCallNovo(props) {
      // Filtra todos os whatsapps conectados com wavoipToken válido
      const whatsappsDisponiveis = this.whatsapps.filter(w => w.wavoipToken && w.status === 'CONNECTED');
      if (whatsappsDisponiveis.length <= 1) {
        // Só existe um, usa direto
        const token = whatsappsDisponiveis[0]?.wavoipToken;
        this.$store.dispatch('webphone_novo/outcomingCall', {
          phone: props.number,
          contact_name: props.name,
          chat_id: props.id,
          token: token,
          profile_picture: props.profilePicUrl || '',
          instances: [token]
        });
      } else {
        // Mais de um, abre o modal de seleção
        this.wavoipOptionsNovo = whatsappsDisponiveis.map(w => ({
          label: w.name + (w.id ? ` (#${w.id})` : ''),
          value: w.wavoipToken,
          icon: w.type ? `img:${w.type}-logo.png` : 'mdi-whatsapp',
          id: w.id
        }));
        this.selectedWavoipTokenNovo = null;
        this.contatoParaChamadaNovo = props;
        this.showSelectWavoipDialogNovo = true;
      }
    },
    confirmarSelecaoWavoipContato() {
      if (!this.selectedWavoipToken || !this.contatoParaChamada) return;
      this.$store.dispatch('webphone/outcomingCall', {
        phone: this.contatoParaChamada.number,
        contact_name: this.contatoParaChamada.name,
        chat_id: this.contatoParaChamada.id,
        token: this.selectedWavoipToken,
        profile_picture: this.contatoParaChamada.profilePicUrl || '',
        instances: [this.selectedWavoipToken]
      });
      this.showSelectWavoipDialog = false;
      this.contatoParaChamada = null;
      this.selectedWavoipToken = null;
    },
    confirmarSelecaoWavoipContatoNovo() {
      if (!this.selectedWavoipTokenNovo || !this.contatoParaChamadaNovo) return;
      this.$store.dispatch('webphone_novo/outcomingCall', {
        phone: this.contatoParaChamadaNovo.number,
        contact_name: this.contatoParaChamadaNovo.name,
        chat_id: this.contatoParaChamadaNovo.id,
        token: this.selectedWavoipTokenNovo,
        profile_picture: this.contatoParaChamadaNovo.profilePicUrl || '',
        instances: [this.selectedWavoipTokenNovo]
      });
      this.showSelectWavoipDialogNovo = false;
      this.contatoParaChamadaNovo = null;
      this.selectedWavoipTokenNovo = null;
    },
    cancelarSelecaoWavoipContatoNovo() {
      this.showSelectWavoipDialogNovo = false;
      this.contatoParaChamadaNovo = null;
      this.selectedWavoipTokenNovo = null;
    },
    cancelarSelecaoWavoipContato() {
      this.showSelectWavoipDialog = false;
      this.contatoParaChamada = null;
      this.selectedWavoipToken = null;
    },
    saveColumnVisibility() {
      // Salva o estado das colunas no localStorage
      localStorage.setItem('columnVisibility', JSON.stringify(this.visibleColumns));
    },
    toggleColumnVisibility(columnName) {
      // Salvar a configuração no localStorage após a mudança
      this.saveColumnVisibility();
    },
    openImageModal(imageUrl) {
      this.selectedImageUrl = imageUrl;
      this.showImageModal = true;
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;



          this.colors = colorsArray.reduce((acc, colorObj) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val
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
    formatTags(tags) {
      if (!Array.isArray(tags)) return '';

      return tags.map(tag => {
        return `<span style="background-color: ${tag.color}; padding: 2px 8px; border-radius: 4px; color: white; margin-right: 4px;">${tag.tag}</span>`;
      }).join('');
    },
    downloadModelCsv() {
      const csvContent = 'nome;numero;email;cpf;dataNascimento;primeiroNome;ultimoNome;Empresa\nUser;5551900000;email@gmail.com;000.000.000-00;15/06/1987;Andre;Silva;MySend';
      const blob = new Blob([csvContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'model.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getPhoneNumberLink(number) {
      if ((number.startsWith("55")) && (number.charAt(4) > 5)) {
        return `tel:${number.slice(0, 4)}9${number.slice(-8)}`;
      } else {
        return `tel:${number}`;
      }
    },
    abrirEnvioArquivo(event) {
      this.isImportCSV = true
      this.limparFormularioImportacao()
      this.$refs.PickerFileMessage?.pickFiles(event)
    },
    limparFormularioImportacao() {
      this.file = []
      this.tags = []
      this.wallets = []
      this.validContact = false
      this.addTags = false
      this.isImportCSV = false
    },
    async handleImportCSV() {
      try {
        this.$q.notify({
          type: 'warning',
          message: this.$t('contacts.notifications.importInProgress'),
          caption: this.$t('contacts.notifications.importCaption'),
          position: 'top'
        })
        const formData = new FormData()
        formData.append('file', this.file)
        if (this.tags.length > 0) {
          formData.append('tags', this.tags)
        }
        if (this.wallets.length > 0) {
          formData.append('wallets', this.wallets)
        }
        formData.append('validContact', this.validContact?.toString())
        if (this.tags.length > 0) {
          formData.append('addTags', this.addTags?.toString())
        }
        await ImportarArquivoContato(formData)
        this.$notificarSucesso(this.$t('contacts.notifications.importSuccess'))
        this.$router.go(0)
      } catch (err) {
        this.$notificarErro(err)
      }
    },
    async listarFilas() {
      const { data: userData } = await DadosUsuario(this.usuario.userId);

      return new Promise(async (resolve, reject) => {
        try {
          const { data: filasData } = await ListarFilas();

          // Extrai os IDs das filas do usuário
          const userQueueIds = userData.queues.map(queue => queue.id);

          // Filtra as filas ativas e que fazem parte das filas do usuário
          this.filas = filasData.filter(fila => fila.isActive && userQueueIds.includes(fila.id));

          this.modalTransferirTicket = true;
          this.listarUsuariosTransferencia();
          
          // Armazena o resolve para ser chamado quando o modal for fechado
          this.modalTransferResolve = resolve;
        } catch (error) {
          console.error(error);
          this.$notificarErro(this.$t('contacts.notifications.loadQueuesError'), error);
          reject(error);
        }
      });
    },
    async listarUsuariosTransferencia() {
      try {
        let usuarios = [];
        let hasMore = true;
        let pageNumber = 1; // Página inicial.

        while (hasMore) {
          const { data } = await ListarUsuarios({ pageNumber });

          const novosUsuarios = data.users.filter(user => user.profile !== 'superadmin');
          usuarios = [...usuarios, ...novosUsuarios];

          hasMore = data.hasMore;
          pageNumber += 1;
        }

        this.usuarios = usuarios;
        this.usuariosTransferencia = usuarios;
        this.modalTransferirTicket = true;
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t('contacts.notifications.loadUsersError'), error);
      }
    },
    async listarUsuarios() {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contacts.notifications.loadUsersError'), error)
      }
    },
    async listarEtiquetas() {
      const { data } = await ListarEtiquetas(true)
      // Ordenar etiquetas por ordem alfabética baseada no campo 'tag'
      const sortedData = data.sort((a, b) => {
        const tagA = a.tag ? a.tag.toLowerCase() : ''
        const tagB = b.tag ? b.tag.toLowerCase() : ''
        return tagA.localeCompare(tagB)
      })
      this.etiquetas = sortedData
      this.tagsOptions = sortedData.map(tag => ({ id: tag.id, tag: tag.tag }));
    },
    filterUsers(element, index, array) {
      const fila = this.filaSelecionada
      if (fila == null) return true
      const queues_valid = element.queues.filter(function (element, index, array) {
        return (element.id == fila)
      })
      return (queues_valid.length > 0)
    },
    async confirmarTransferenciaTicket() {
      await AtualizarTicket(this.ticketFocado.id, {
        userId: this.usuarioSelecionado || userId,
        queueId: this.filaSelecionada || null,
        status: 'open',
        isTransference: 1
      })
      this.$q.notify({
        type: 'positive',
        message: this.$t('contacts.notifications.ticketTransferred'),
        progress: true,
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.modalTransferirTicket = false
      this.$store.commit('TICKET_FOCADO', {})
      
      // Resolve a Promise se existir
      if (this.modalTransferResolve) {
        this.modalTransferResolve();
        this.modalTransferResolve = null;
      }
    },
    downloadFile(downloadLink) {
      const link = document.createElement('a')
      link.href = downloadLink
      link.setAttribute('download', 'contacts.xlsx')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    handleExportContacts() {
      ExportarArquivoContato()
        .then(res => {
          const downloadLink = res.data.downloadLink
          this.downloadFile(downloadLink)
        })
        .catch(error => {
          console.error(this.$t('contacts.notifications.exportError'), error)
        })
    },
    LOAD_CONTACTS(contacts) {
      const newContacts = []
      contacts.forEach(contact => {
        const contactIndex = this.contacts.findIndex(c => c.id === contact.id)
        if (contactIndex !== -1) {
          this.contacts[contactIndex] = contact
        } else {
          newContacts.push(contact)
        }
      })
      const contactsObj = [...this.contacts, ...newContacts]
      this.contacts = contactsObj
    },
    UPDATE_CONTACTS(contact) {
      const newContacts = [...this.contacts]
      const contactIndex = newContacts.findIndex(c => c.id === contact.id)
      if (contactIndex !== -1) {
        newContacts[contactIndex] = contact
      } else {
        newContacts.unshift(contact)
      }
      this.contacts = [...newContacts]
    },
    DELETE_CONTACT(contactId) {
      const newContacts = [...this.contacts]
      const contactIndex = newContacts.findIndex(c => c.id === contactId)
      if (contactIndex !== -1) {
        newContacts.splice(contactIndex, 1)
      }
      this.contacts = [...newContacts]
    },
    filtrarContato(data) {
      this.contacts = []
      this.params.pageNumber = 1
      this.params.searchParam = data
      this.loading = true
      this.listarContatos()
    },
    filtrarContatoPorCarteira() {
      this.selectedTag = null; 
      this.contacts = [];
      this.params.pageNumber = 1;
      this.params.walletId = this.selectedWallet || null;
      this.listarContatos();
    },
    async listarContatos() {
      this.loading = true
      const params = {
        ...this.params,
        walletId: this.selectedWallet || null,
        tagId: this.selectedTag ? this.selectedTag.id : null,
      };
      const { data } = await ListarContatos(params)
      this.params.hasMore = data.hasMore
      this.LOAD_CONTACTS(data.contacts)
      this.loading = false
      this.pagination.lastIndex = this.contacts.length - 1
      this.pagination.rowsNumber = data.count
      
      // Limpar seleção quando a lista for atualizada
      this.selectedContacts = [];
      this.selectAll = false;
    },
    onScroll({ to, ref, ...all }) {
      if (this.loading !== true && this.params.hasMore === true && to === this.pagination.lastIndex) {
        this.loading = true
        this.params.pageNumber++
        this.listarContatos()
      }
    },
    async handleSaveTicket(contact, channel) {
      if (!contact.id) return
      const itens = []
      const channelId = null
      const response = await DadosUsuario(this.usuario.userId);
      const responseTenant = await ListarTenantPorId(this.usuario.tenantId)
      if(this.usuario.profile === 'admin' || (this.usuario.profile === 'super' && responseTenant.data[0].supervisorAdmin === 'disabled')){
        this.whatsapps.forEach(w => {
        if (w.type === channel) {
          itens.push({ label: w.name, value: w.id })
        } 
      })
      } else {
        const filteredWhatsapps = this.whatsapps.filter(w => 
        response.data.whatsappAllowed.some(wa => wa.id === w.id)
      );
      filteredWhatsapps.forEach(w => {
        if (w.type === channel) {
          itens.push({ label: w.name, value: w.id })
        } 
      })
      }
      
      this.$q.dialog({
        title: `${this.$t('contacts.dialog.contact')}: ${contact.name}`,
        message: this.$t('contacts.dialog.selectChannel'),
        options: {
          type: 'radio',
          model: channelId,
          isValid: v => !!v,
          items: itens
        },
        ok: {
          push: true,
          color: 'positive',
          label: this.$t('common.start'),
        },
        cancel: {
          push: true,
          label: this.$t('common.cancel'),
          color: 'negative'
        },
        persistent: true
      }).onOk(async channelId => {
        if (!channelId) return
        this.loading = true
        try {
          const { data: ticket } = await CriarTicket({
            contactId: contact.id,
            isActiveDemand: true,
            userId: userId,
            channel,
            channelId,
            status: 'open'
          })
          this.ticketFocado = ticket
          await this.listarFilas();
          await this.$store.commit('SET_HAS_MORE', true)
          await this.$store.dispatch('AbrirChatMensagens', ticket)
          this.$q.notify({
            message: `${this.$t('contacts.dialog.start')} || ${ticket.contact.name} - Ticket: ${ticket.id}`,
            type: 'positive',
            position: 'top',
            progress: true,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.$router.push({ name: 'chat', params: { ticketId: ticket.id } })
        } catch (error) {
          if (error.status === 409) {
            console.log('tkc >>>>>>>>>>>>> 3', error)
            if (this.isNotViewAssignedTickets === 'enabled' && this.userProfile === 'user') {
              this.$q.dialog({
                title: this.$t('common.attention'),
                message: this.$t("atendimentoVcard.adminOnlyMessage", { name: contact.name }),
                ok: {
                  label: this.$t('common.ok'),
                  color: 'negative',
                  push: true
                },
                persistent: true
              })
              this.loading = false
              return
            }
            
            // Extrair o ticket do erro - pode estar em error.data.ticket ou error.data.message (string JSON)
            let ticketAtual = null
            const errorData = error.data || error.response?.data
            
            if (errorData) {
              if (errorData.ticket) {
                // Ticket já está como objeto
                ticketAtual = errorData.ticket
              } else if (errorData.message) {
                // Ticket está como string JSON em message
                try {
                  ticketAtual = typeof errorData.message === 'string' 
                    ? JSON.parse(errorData.message) 
                    : errorData.message
                } catch (parseError) {
                  console.error('Erro ao fazer parse do ticket do erro 409:', parseError)
                  this.$notificarErro(this.$t('common.notifications.error'), error)
                  this.loading = false
                  return
                }
              } else if (errorData.error) {
                // Tentar extrair de error (pode ser string ou objeto)
                try {
                  ticketAtual = typeof errorData.error === 'string' 
                    ? JSON.parse(errorData.error) 
                    : errorData.error
                } catch (parseError) {
                  console.error('Erro ao fazer parse do ticket do erro 409:', parseError)
                  this.$notificarErro(this.$t('common.notifications.error'), error)
                  this.loading = false
                  return
                }
              }
            }
            
            if (!ticketAtual || !ticketAtual.id) {
              console.error('Não foi possível extrair o ticket do erro 409')
              this.$notificarErro(this.$t('common.notifications.error'), error)
              this.loading = false
              return
            }
            
            // Se o ticket já está open, apenas rotear diretamente com mensagem informativa
            if (ticketAtual.status === 'open') {
              // Verificar limitação de visualização de tickets não atribuídos
              if (this.isNotViewAssignedTickets === 'enabled' && this.userProfile === 'user') {
                this.$q.dialog({
                  title: this.$t('common.attention'),
                  message: this.$t("atendimentoVcard.adminOnlyMessage", { name: contact.name }),
                  ok: {
                    label: this.$t('common.ok'),
                    color: 'negative',
                    push: true
                  },
                  persistent: true
                })
                this.loading = false
                return
              }
              
              this.$q.notify({
                message: `${this.$t('contacts.notifications.existingTicket')} ${contact.name}. Redirecionando para o ticket...`,
                type: 'info',
                position: 'top',
                progress: true,
                actions: [{
                  icon: 'close',
                  round: true,
                  color: 'white'
                }]
              })
              
              // Verificar se precisa atualizar apenas o whatsappId
              const updateData = {}
              if (ticketAtual.whatsappId === null) {
                updateData.whatsapp = channelId
              }
              
              // Atualizar apenas se necessário
              if (Object.keys(updateData).length > 0) {
                await AtualizarTicket(ticketAtual.id, updateData)
                await new Promise(resolve => setTimeout(resolve, 250))
              }
              
              // Rotear diretamente para o ticket (sem abrir modal de seleção de destino)
              this.ticketFocado = ticketAtual
              await this.$store.commit('SET_HAS_MORE', true)
              await this.$store.dispatch('AbrirChatMensagens', ticketAtual)
              this.$router.push({ name: 'chat', params: { ticketId: ticketAtual.id } })
              this.loading = false
              return
            }
            
            // Se o status for pending, atualizar para open antes de rotear
            const updateData = {}
            const needsStatusUpdate = ticketAtual.status === 'pending'
            
            if (needsStatusUpdate) {
              updateData.status = 'open'
              updateData.userId = userId
              ticketAtual.status = 'open'
              ticketAtual.userId = userId
            }
            
            if (ticketAtual.whatsappId === null) {
              updateData.whatsapp = channelId
            }
            
            // Atualizar ticket se houver mudanças
            if (Object.keys(updateData).length > 0) {
              await AtualizarTicket(ticketAtual.id, updateData)
              
              // Aguardar 250ms para dar tempo de salvar no banco
              await new Promise(resolve => setTimeout(resolve, 250))
            }
            
            this.abrirAtendimentoExistente(contact, ticketAtual)
            return
          }
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
        this.loading = false
      })
    },
    editContact(contactId) {
      this.selectedContactId = contactId
      this.modalContato = true
    },
    deleteContact(contactId) {
      this.$q.dialog({
        title: this.$t('contacts.dialog.confirmDelete'),
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
      }).onOk(() => {
        this.loading = true
        DeletarContato(contactId)
          .then(res => {
            this.DELETE_CONTACT(contactId)
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('contacts.notifications.contactDeleted'),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .catch(error => {
            console.error(error)
            
            // Verificar se é um dos erros específicos que impedem a exclusão
            const errorMessage = error?.data?.error
            if (errorMessage === 'ERR_CONTACT_TICKETS_REGISTERED' || errorMessage === 'ERR_CONTACT_OPPORTUNITIES_REGISTERED') {
              // Perguntar se quer deletar forçadamente
              this.$q.dialog({
                title: this.$t('common.attention'),
                message: errorMessage === 'ERR_CONTACT_TICKETS_REGISTERED' 
                  ? this.$t('contacts.warning1')
                  : this.$t('contacts.warning2'),
                cancel: {
                  label: this.$t('common.no'),
                  color: 'primary',
                  push: true
                },
                ok: {
                  label: this.$t('contacts.deleteTitle'),
                  color: 'negative',
                  push: true
                },
                persistent: true
              }).onOk(() => {
                this.loading = true
                if(this.userProfile !== 'admin'){
                  this.$q.notify({
                    type: 'warning',
                    message: this.$t('contacts.forbidden'),
                    position: 'top',
                    actions: [{
                      icon: 'close',
                      round: true,
                      color: 'white'
                    }]
                  })
                  this.loading = false
                  return
                }
                DeletarContatoForcado(contactId)
                  .then(res => {
                    this.DELETE_CONTACT(contactId)
                    this.$q.notify({
                      type: 'positive',
                      progress: true,
                      position: 'top',
                      message: this.$t('contacts.deleteMessage'),
                      actions: [{
                        icon: 'close',
                        round: true,
                        color: 'white'
                      }]
                    })
                  })
                  .catch(forceError => {
                    console.error(forceError)
                    this.$notificarErro(this.$t('contacts.deleteError'), forceError)
                  })
                  .finally(() => {
                    this.loading = false
                  })
              })
            } else {
              // Para outros erros, mostrar a mensagem padrão
              this.$notificarErro(this.$t('contacts.notifications.deleteError'), error)
            }
          })
        this.loading = false
      })
    },
    toggleSelectAll() {
      if (this.selectAll) {
        // Selecionar todos os contatos visíveis
        this.selectedContacts = this.contacts.map(contact => contact.id);
      } else {
        // Desselecionar todos
        this.selectedContacts = [];
      }
    },
    updateSelectAll() {
      // Atualizar o estado do checkbox "selecionar todos"
      if (this.selectedContacts.length === 0) {
        this.selectAll = false;
      } else if (this.selectedContacts.length === this.contacts.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    clearSelection() {
      this.selectedContacts = [];
      this.selectAll = false;
    },
    deleteSelectedContacts() {
      if (this.selectedContacts.length === 0) {
        this.$q.notify({
          type: 'warning',
          message: 'Nenhum contato selecionado',
          position: 'top'
        });
        return;
      }

      this.$q.dialog({
        title: this.$t('contacts.dialog.confirmDelete'),
        message: this.$t('contacts.deleteSelectedContacts', { count: this.selectedContacts.length }),
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
        this.loading = true;
        const results = {
          success: [],
          failed: [],
          forceDeleted: []
        };

        for (const contactId of this.selectedContacts) {
          try {
            await DeletarContato(contactId);
            results.success.push(contactId);
            this.DELETE_CONTACT(contactId);
          } catch (error) {
            console.error(`Erro ao deletar contato ${contactId}:`, error);
            
            // Verificar se é um dos erros específicos que impedem a exclusão
            const errorMessage = error?.data?.error;
            if (errorMessage === 'ERR_CONTACT_TICKETS_REGISTERED' || errorMessage === 'ERR_CONTACT_OPPORTUNITIES_REGISTERED') {
              // Perguntar se quer deletar forçadamente
              const forceDelete = await this.confirmForceDelete(contactId, errorMessage);
              if (forceDelete) {
                try {
                  await DeletarContatoForcado(contactId);
                  results.forceDeleted.push(contactId);
                  this.DELETE_CONTACT(contactId);
                } catch (forceError) {
                  console.error(`Erro ao deletar forçadamente contato ${contactId}:`, forceError);
                  results.failed.push({ id: contactId, error: forceError });
                }
              } else {
                results.failed.push({ id: contactId, error: this.$t('contacts.deleteCanceled') });
              }
            } else {
              results.failed.push({ id: contactId, error });
            }
          }
        }

        // Limpar seleção
        this.selectedContacts = [];
        this.selectAll = false;

        // Mostrar resultado
        this.showBulkDeleteResults(results);
        this.loading = false;
      });
    },
    async confirmForceDelete(contactId, errorMessage) {
      return new Promise((resolve) => {
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: errorMessage === 'ERR_CONTACT_TICKETS_REGISTERED' 
            ? this.$t('contacts.warning1DeleteSelect', { contactId })
            : this.$t('contacts.warning2DeleteSelect', { contactId }),
          cancel: {
            label: this.$t('common.no'),
            color: 'primary',
            push: true
          },
          ok: {
            label: this.$t('contacts.deleteTitle'),
            color: 'negative',
            push: true
          },
          persistent: true
        }).onOk(() => {
          resolve(true);
        }).onCancel(() => {
          resolve(false);
        });
      });
    },
    showBulkDeleteResults(results) {
      const totalProcessed = results.success.length + results.forceDeleted.length + results.failed.length;
      const successCount = results.success.length;
      const forceDeletedCount = results.forceDeleted.length;
      const failedCount = results.failed.length;

      let message = `Processados ${totalProcessed} contatos:\n`;
      if (successCount > 0) message += `✅ ${successCount} deletados com sucesso\n`;
      if (forceDeletedCount > 0) message += `⚠️ ${forceDeletedCount} deletados forçadamente\n`;
      if (failedCount > 0) message += `❌ ${failedCount} falharam`;

      const type = failedCount === 0 ? 'positive' : failedCount === totalProcessed ? 'negative' : 'warning';

      this.$q.notify({
        type,
        message,
        position: 'top',
        timeout: 5000,
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      });
    },
    abrirChatContato(ticket) {
      // caso esteja em um tamanho mobile, fechar a drawer dos contatos
      if (this.$q.screen.lt.md && ticket.status !== 'pending') {
        eventBus.emit('infor-cabecalo-chat:acao-menu')
      }
      if (!(ticket.status !== 'pending' && (ticket.id !== this.$store.getters.ticketFocado.id || this.$route.name !== 'chat'))) return
      this.$store.commit('SET_HAS_MORE', true)
      this.$store.dispatch('AbrirChatMensagens', ticket)
    },
    abrirAtendimentoExistente(contato, ticket) {
      if (this.isNotViewAssignedTickets === 'enabled' && this.userProfile === 'user') {
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: `${this.$t('contacts.notifications.existingTicket')} ${contato.name}.`,
          ok: {
            label: this.$t('common.ok'),
            color: 'negative',
            push: true
          },
          persistent: true
        })
        this.loading = false
        return
      }
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: `${this.$t('contacts.notifications.existingTicketDetails')}: Ticket #${ticket.id} - User #${ticket.userId} - ${ticket.user?.name || 'N/A'}`,
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
        try {
          this.abrirChatContato(ticket)
        } catch (error) {
          this.$notificarErro(
            this.$t('contacts.notifications.tokenUpdateError'),
            error
          )
        }
      })
      this.loading = false
    },
    confirmarSincronizarContatos() {
      this.$q.dialog({
        title: this.$t('contacts.dialog.syncContactsTitle'),
        message: this.$t('contacts.dialog.syncContactsMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        await this.sincronizarContatos()
        this.loading = false
      })
    },
    removerDuplicados() {
      this.$q.dialog({
        title: this.$t('contacts.dialog.removeDuplicatesTitle'),
        message: this.$t('contacts.dialog.removeDuplicatesMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        await DeletarDuplicados()
        this.loading = false
      })
    },
    agruparLid() {
      this.$q.dialog({
        title: this.$t('contacts.agruparLidTitle'),
        message: this.$t('contacts.agruparLidMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        await AgruparLid()
        this.loading = false
      })
    },
    checarNonoDigito() {
      this.$q.dialog({
        title: this.$t('contacts.dialog.checkDigitTitle'),
        message: this.$t('contacts.dialog.checkDigitMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        const resp = await ChecarNonoDigito()
        console.log(resp)
        this.loading = false
      })
    },
    confirmarSincronizarGrupos() {
      this.$q.dialog({
        title: this.$t('contacts.dialog.syncGroupsTitle'),
        message: this.$t('contacts.dialog.syncGroupsMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'warning',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        await this.sincronizarGrupos()
        this.loading = false
      })
    },
    async sincronizarContatos() {
      try {
        this.loading = true
        await SyncronizarContatos()
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t('contacts.notifications.syncContact'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contacts.notifications.loadSynError'), error)
        this.loading = true
      }
      this.loading = true
    },
    async sincronizarGrupos() {
      try {
        this.loading = true
        await SyncronizarGrupos()
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t('contacts.notifications.syncGroups'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contacts.notifications.loadSynError'), error)
        this.loading = true
      }
      this.loading = true
    },
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes();
      localStorage.setItem('configuracoes', JSON.stringify(data));
      const conf = data.find(c => c.key === 'NotViewAssignedTickets');
      this.isNotViewAssignedTickets = conf?.value;
    },
    async espiarAtendimentoContactId(contactId) {
      try {
        const contact = this.contacts.find(c => c.id === contactId);
        await this.fetchMessagesForTicketContact({ contactId });
        this.$q.notify({
          message: this.$t("atendimentoMixinAtualizar.notifications.espiarAtendimento", {
            name: contact.name,
            id: contactId
          }),
          type: 'positive',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      } catch (error) {
        console.error('Erro ao espiar atendimento:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('atendimentoMixinAtualizar.notifications.erroAtualizarStatus')
        });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const dialogContent = document.querySelector('.q-dialog__inner > div');
        if (dialogContent) {
          dialogContent.scrollTop = dialogContent.scrollHeight;
        }
      });
    },
  },
  async mounted() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.userProfile = localStorage.getItem('profile')
    
    // Verificar restrictedUser
    try {
      const { data } = await DadosUsuario(this.usuario.userId)
      this.usuarioDados = data
      // Se restrictedUser estiver enabled, não permitir acesso à página
      if (data?.restrictedUser === 'enabled') {
        this.pageAllowed = false
        return
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
    
    await this.listarConfiguracoes()
    this.listarContatos()
    this.listarUsuarios()
    this.listarEtiquetas()
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
    // Carregar configurações de colunas salvas
    try {
      const savedColumns = localStorage.getItem('columnVisibility');
      if (savedColumns) {
        const parsedColumns = JSON.parse(savedColumns);
        // Aplicar apenas as colunas que existem na definição atual
        Object.keys(parsedColumns).forEach(key => {
          if (this.visibleColumns.hasOwnProperty(key)) {
            this.visibleColumns[key] = parsedColumns[key];
          }
        });
      }
    } catch (error) {
      console.warn('Erro ao carregar configurações de colunas:', error);
    }
  }
}
</script>

<style lang="sass">
.my-sticky-dynamic
  height: 85vh
  border-radius: 16px
  background: rgba(255, 255, 255, 0.95)
  backdrop-filter: blur(12px)
  border: 1px solid rgba(255, 255, 255, 0.2)
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
  transition: all 0.3s ease

  /* Estilização do scrollbar */
  &::-webkit-scrollbar
    width: 8px
    height: 8px

  &::-webkit-scrollbar-track
    background: rgba(0, 0, 0, 0.05)
    border-radius: 4px

  &::-webkit-scrollbar-thumb
    background: var(--q-primary)
    border-radius: 4px
    transition: all 0.3s ease

    &:hover
      background: var(--q-secondary)

  /* Para Firefox */
  scrollbar-width: thin
  scrollbar-color: var(--q-primary) rgba(0, 0, 0, 0.05)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: rgba(255, 255, 255, 0.95)
    backdrop-filter: blur(12px)
    border-bottom: 1px solid rgba(0, 0, 0, 0.08)

  thead tr th
    position: sticky
    z-index: 1
    font-weight: 600
    font-size: 0.9rem
    color: var(--q-primary)
    padding: 12px 16px
    transition: all 0.3s ease
    text-align: left !important

  thead tr:last-child th
    top: 63px

  thead tr:first-child th
    top: 0

.heightChat
  height: calc(100vh - 0px)
  
  .q-table__top
    padding: 12px
    background: rgba(255, 255, 255, 0.95)
    backdrop-filter: blur(12px)

#tabela-contatos-atendimento
  thead
    th
      height: 48px
      font-size: 0.85rem

.blur-effect 
  filter: blur(0px)
  transition: all 0.3s ease

  &:hover
    transform: scale(1.05)

/* Estilização dos inputs */
.q-input
  .q-field__control
    background: rgba(255, 255, 255, 0.7)
    border-radius: 8px
    transition: all 0.3s ease

    &:hover
      background: rgba(255, 255, 255, 0.9)

  &.q-field--focused .q-field__control
    background: rgba(255, 255, 255, 0.95)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)

/* Estilização dos selects */
.q-select
  .q-field__control
    background: rgba(255, 255, 255, 0.7)
    border-radius: 8px
    transition: all 0.3s ease

    &:hover
      background: rgba(255, 255, 255, 0.9)

  &.q-field--focused .q-field__control
    background: rgba(255, 255, 255, 0.95)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)

/* Modo Escuro */
body.body--dark
  .my-sticky-dynamic
    background: rgba(30, 30, 30, 0.95)
    border-color: rgba(255, 255, 255, 0.1)

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      background-color: rgba(30, 30, 30, 0.95)
      border-bottom-color: rgba(255, 255, 255, 0.1)

    tbody tr:hover
      background: rgba(255, 255, 255, 0.05)

    .q-table__bottom
      border-top-color: rgba(255, 255, 255, 0.1)

  .q-input .q-field__control,
  .q-select .q-field__control
    background: rgba(255, 255, 255, 0.05)

    &:hover
      background: rgba(255, 255, 255, 0.1)

    &.q-field--focused
      background: rgba(255, 255, 255, 0.15)

/* Responsividade */
@media (max-width: 1024px)
  .my-sticky-dynamic
    border-radius: 12px

  .q-table__top
    padding: 8px

  thead tr th
    padding: 8px 12px
    font-size: 0.85rem

  .q-table tbody td
    padding: 8px 12px
    font-size: 0.85rem

/* Estilo para o scroll do dialog */
.q-dialog__inner > div
  &::-webkit-scrollbar
    width: 8px
    background-color: rgba(0, 0, 0, 0.1)

  &::-webkit-scrollbar-thumb
    background-color: var(--q-primary)
    border-radius: 4px

  &::-webkit-scrollbar-track
    background-color: rgba(0, 0, 0, 0.05)

@media (max-width: 600px)
  .header-actions-mobile
    display: flex
    flex-direction: column
    align-items: stretch
    gap: 10px
    margin-top: 10px
    width: 100%
    padding-right: 30px
    button, .q-btn, .q-btn-dropdown
      width: 100%
</style>
