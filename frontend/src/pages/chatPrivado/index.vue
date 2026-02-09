<template>
  <div class="whatsapp-app position-relative bg-grey-4" :style="style" v-if="(userProfile === 'admin' || pageAllowed)">
    <q-layout view="lHh Lpr lFf" class="whatsapp-layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn flat :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-padrao', 'btn-rounded']" icon="mdi-home" :color="$q.dark.isActive ? 'white' : 'black'" @click="() => $router.push({ name: 'home' })">
            <q-tooltip>
              {{ $t('chatPrivado.toolbar.returnMenu') }}
            </q-tooltip>
          </q-btn>
          <q-btn flat :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-padrao', 'btn-rounded', 'q-ml-xs']" icon="mdi-forum-outline" :color="$q.dark.isActive ? 'white' : 'black'" @click="() => $router.push({ name: 'atendimento' })">
            <q-tooltip>
              {{ $t('chatPrivado.toolbar.atendimento') }}
            </q-tooltip>
          </q-btn>
          <q-btn flat :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-padrao', 'btn-rounded', 'q-ml-xs']" icon="mdi-arrow-right-bold-box-outline" :color="$q.dark.isActive ? 'white' : 'black'" @click="toggleRightDrawer">
            <q-tooltip>
              {{ $t('chatPrivado.toolbar.minimize') }}
            </q-tooltip>
          </q-btn>
          <div class="row items-center q-mx-md" v-if="selectedContact && selectedContact.id">
            <q-btn round flat :disable="cDisableActions">
              <q-avatar color="primary" text-color="white">
                {{ Value(selectedContact.name?.charAt(0), 'name') }}
              </q-avatar>
            </q-btn>
            <div class="q-pl-md">
              <div class="q-subtitle-2 q-font-weight-bold">
                {{ Value(selectedContact.name, 'name') }}
                <q-skeleton v-if="!Value(selectedContact.name, 'name')" animation="none" style="width: 230px" />
              </div>
              <div class="q-caption text-grey-7">
                <template v-if="selectedContact.isGroup">
                  <q-badge color="warning" outline>{{ $t('chatPrivado.labels.grupo') }}</q-badge>
                </template>
                <template v-else>
                  <q-badge color="primary" outline>
                    {{ Value(selectedContact.email, 'email') }}
                  </q-badge>
                  <q-skeleton v-if="!Value(selectedContact.email, 'email')" animation="none" style="width: 230px" />
                </template>
              </div>
            </div>
            <q-btn v-if="selectedContact.isGroup" flat round icon="mdi-account-group" color="primary" @click="showGroupMembers = true">
              <q-tooltip>
                {{ $t('chatPrivado.toolbar.groupMembers') }}
              </q-tooltip>
            </q-btn>
          </div>
          <q-space />
        </q-toolbar>
      </q-header>

      <q-page-container class="bg-grey-2" :style="styleChatArea">
        <q-scroll-area ref="chatPanel" class="scroll-y chatarea" :style="cStyleScrolll" @scroll="scrollArea">
          <div class="q-pa-md">
            <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div v-for="(message, index) in messages" :key="message?.id" class="text-weight-medium">
                <hr v-if="isLineDate" :key="'hr-' + index" class="hr-text q-mt-lg q-mb-md"
                  :data-content="formatarData(message.timestamp)"
                  v-show="index === 0 || formatarData(message.timestamp) !== formatarData(messages[index - 1].timestamp)">
                <q-chat-message :ref="message?.id" :id="message?.id"
                  :name="message.sender?.id == usuario.userId ? $t('chatPrivado.messages.senderMe') : message.sender?.name"
                  :bg-color="message.sender == usuario.userId ? 'grey-2' : $q.dark.isActive ? 'blue-2' : 'blue-1'"
                  :stamp="getMessageStamp(message)" :sent="message.sender?.id == usuario.userId">
                  <template v-slot:stamp>
                    <div class="row items-center q-gutter-xs" style="flex-wrap: nowrap;">
                      <span>{{ dataInWordsMessage(Number(message.timestamp)) }}</span>
                      <span 
                        v-if="message.reactFromMe && !selectedContact.isGroup" 
                        @click="podeRemoverReacao(message, 'reactFromMe') && removerReacaoClicando(message, 'reactFromMe')"
                        class="reaction-emoji"
                        :style="podeRemoverReacao(message, 'reactFromMe') ? 'cursor: pointer; font-size: 1.2em; user-select: none; opacity: 0.8; transition: opacity 0.2s; line-height: 1;' : 'font-size: 1.2em; user-select: none; line-height: 1;'"
                        @mouseenter="podeRemoverReacao(message, 'reactFromMe') && ($event.target.style.opacity = '1')"
                        @mouseleave="podeRemoverReacao(message, 'reactFromMe') && ($event.target.style.opacity = '0.8')"
                        :title="podeRemoverReacao(message, 'reactFromMe') ? $t('chatPrivado.messages.clickToRemoveReaction') : ''">
                        {{ message.reactFromMe }}
                      </span>
                      <span 
                        v-if="message.react && !selectedContact.isGroup" 
                        @click="podeRemoverReacao(message, 'react') && removerReacaoClicando(message, 'react')"
                        class="reaction-emoji"
                        :style="podeRemoverReacao(message, 'react') ? 'cursor: pointer; font-size: 1.2em; user-select: none; opacity: 0.8; transition: opacity 0.2s; line-height: 1;' : 'font-size: 1.2em; user-select: none; line-height: 1;'"
                        @mouseenter="podeRemoverReacao(message, 'react') && ($event.target.style.opacity = '1')"
                        @mouseleave="podeRemoverReacao(message, 'react') && ($event.target.style.opacity = '0.8')"
                        :title="podeRemoverReacao(message, 'react') ? $t('chatPrivado.messages.clickToRemoveReaction') : ''">
                        {{ message.react }}
                      </span>
                    </div>
                  </template>
                  <div style="width: 200px;">
                    <q-btn 
                      class="absolute-top-right" 
                      style="top: 4px !important; right: 4px !important; position: absolute !important;"
                      dense 
                      flat 
                      ripple 
                      round 
                      icon="mdi-chevron-down"
                      size="sm">
                      <q-menu square auto-close anchor="bottom left" self="top left">
                        <q-list style="min-width: 150px">
                          <q-item 
                            v-if="!selectedContact.isGroup" 
                            clickable 
                            @click="abrirModalReacao(message)">
                            <q-item-section>
                              <q-item-label>{{ $t('common.react') }}</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator v-if="!selectedContact.isGroup && message.sender?.id == usuario.userId" />
                          <q-item 
                            v-if="message.mediaType === 'chat' && message.sender?.id == usuario.userId" 
                            clickable 
                            @click="iniciarEdicaoMensagem(message)">
                            <q-item-section>
                              <q-item-label>{{ $t('common.edit') }}</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator v-if="message.mediaType === 'chat' && message.sender?.id == usuario.userId" />
                          <q-item 
                            clickable 
                            @click="abrirModalEncaminhar(message)">
                            <q-item-section>
                              <q-item-label>{{ $t('common.forward') }}</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-separator />
                          <q-item 
                            v-if="message.sender?.id == usuario.userId" 
                            clickable 
                            @click="confirmarDeletarMensagem(message)">
                            <q-item-section>
                              <q-item-label>{{ $t('common.delete2') }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                    <q-icon v-if="message.sender == usuario.userId" class="absolute-bottom-right q-pr-xs q-pb-xs"
                      name="mdi-check-all" size="1.2em" :color="message.read ? 'blue-12' : ''" />
                    <template v-if="message.mediaType === 'image'">
                      <q-img @click=" urlMedia = message.mediaUrl; abrirModalImagem = true" :src="message.mediaUrl"
                        spinner-color="primary" class="q-mt-md" style="cursor: pointer;min-width: 280px;max-width: 280px;" />
                      <VueEasyLightbox moveDisabled :visible="abrirModalImagem" :imgs="urlMedia" :index="message.ticketId || 1" @hide="abrirModalImagem = false" />
                    </template>
                    <template v-if="message.mediaType === 'video'">
                      <video :src="message.mediaUrl" controls class="q-mt-md" style="height:150px; min-width: 280px;max-width: 280px; object-fit: cover; border-radius: 8px;">
                      </video>
                    </template>
                    <template v-if="message.mediaType === 'audio'">
                        <div style="width: 280px; height: 100%">
                          <audio class="q-mt-md full-width"
                            controls
                            ref="audioMessage"
                            controlsList="download playbackrate volume">
                            <source :src="message.mediaUrl" type="audio/mp3" />
                          </audio>
                        </div>
                    </template>
                    <template v-if="!['audio', 'contactMessage', 'image', 'video'].includes(message.mediaType) && message.mediaUrl">
                      <div class="text-center full-width hide-scrollbar no-scroll" style="min-width: 280px;max-width: 280px;">
                        <iframe v-if="isPDF(message.mediaUrl)" frameBorder="0" scrolling="no" style="min-width: 280px;max-width: 280px; overflow-y: hidden;" class="no-scroll hide-scrollbar" :src="message.mediaUrl">
                          {{ $t('chatPrivado.messages.pdfPlaceholder') }}
                        </iframe>
                        <q-btn type="a" :color="$q.dark.isActive ? '' : 'grey-3'" no-wrap no-caps stack dense class="q-mt-sm text-center text-black btn-rounded text-grey-9 ellipsis" download :target="isPDF(message.mediaUrl) ? '_blank' : ''" :href="message.mediaUrl">
                          <q-tooltip v-if="message.mediaUrl" content-class="text-bold">
                            {{ $t('chatPrivado.messages.download') }}: {{ message.mediaName }}
                            {{ message.text }}
                          </q-tooltip>
                          <div class="row items-center q-ma-xs">
                            <div class="ellipsis col-grow q-pr-sm" style="max-width: 290px">
                              {{ formatarMensagem(message.text || message.mediaName) }}
                            </div>
                            <q-icon name="mdi-download" />
                          </div>
                        </q-btn>
                      </div>
                    </template>
                    <div v-if="message.mediaType === 'chat'" class="q-message-container row items-end no-wrap">
                      <div class="message-text" style="white-space: pre-line">{{ message.text }}</div>
                    </div>
                  </div>
                </q-chat-message>
              </div>
            </transition-group>
            <div id="inicioListaMensagensChat"></div>
          </div>
        </q-scroll-area>
      </q-page-container>

      <q-drawer v-model="rightDrawerOpen" side="right" show-if-above bordered :breakpoint="690" :overlay="$q.screen.lt.md" :width="$q.screen.lt.md ? $q.screen.width : undefined" elevated>
        <q-toolbar class="bg-grey-3 q-mb-xs">
          
          <q-input rounded outlined dense class="drawer-search q-ml-xs" bg-color="white" v-model="searchParam" @update:model-value="buscarTicketFiltro()" :placeholder="$t('chatPrivado.messages.searchPlaceholder')" style="width: 200px;">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn round flat icon="close" class="drawer-close" @click="toggleRightDrawer" />
        </q-toolbar>

        <q-tabs v-model="tab" inline-label class="btn-rounded" dense narrow-indicator :active-bg-color="$q.dark.isActive ? 'primary' : 'grey-3'" align="justify" :class="{'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive}">
          <q-tab :ripple="false" name="users" icon="mdi-account-outline" 
          :label="$t('common.users')"
          >
            <template v-slot:default>
              <span>
                <q-badge v-if="notificacaoInternaNaoLida > 0"
                    color="red"
                    floating
                    class="badge-left"
                  > {{ notificacaoInternaNaoLida }}</q-badge>
              </span>
            </template>
          </q-tab>
          <q-tab :ripple="false" name="groups" icon="mdi-account-outline" :label="$t('chatPrivado.messages.groupsTab')">
            <template v-slot:default>
              <span>
                <q-badge v-if="notificacaoInternaGrupoNaoLida > 0"
                    color="red"
                    floating
                    class="badge-left"
                  > {{ notificacaoInternaGrupoNaoLida }}</q-badge>
              </span>
            </template>
          </q-tab>
          <!-- <q-tab :ripple="false" name="groups" icon="mdi-account-outline" :label="$t('chatPrivado.messages.groupsTab')"></q-tab> -->
        </q-tabs>
          <q-tab-panels v-model="tab" animated swipeable>
            <q-tab-panel name="users" class="tabChat">
              <q-scroll-area style="height: calc(96vh - 158px) !important">
                <q-list>
                  <q-item v-for="(contact) in searchedUsers" :key="contact?.id" clickable v-ripple @click="openChat(contact, false)" class="q-py-md">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white" class="relative-position">
                        {{ contact?.name?.charAt(0) }}
                        <q-badge floating style="background-color: green;" v-if="contact?.isOnline"></q-badge>
                        <q-badge floating style="background-color: gray;" v-if="!contact?.isOnline"></q-badge>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <div class="row items-center justify-between">
                        <q-item-label class="text-weight-medium" style="max-width: 70%">
                          {{ contact?.name }}
                          <q-tooltip>{{ contact?.name }}</q-tooltip>
                        </q-item-label>
                        <q-item-label caption class="text-grey-7" style="min-width: 85px; text-align: right">
                          {{ dataInWords(contact?.timestamp) }}
                        </q-item-label>
                      </div>
                      <div class="row items-center justify-between q-mt-sm">
                        <q-item-label caption class="conversation__summary" style="max-width: 70%">
                          <q-icon v-if="contact?.read !== null" name="mdi-check-all" size="1.2em" :color="contact?.read ? 'blue-12' : ''" />
                          {{ (contact?.text || '').substring(0, 20) }}{{ (contact?.text || '').length > 20 ? '...' : '' }}
                        </q-item-label>
                        <q-badge rounded color="red" v-if="contact?.count > 0" class="q-ml-sm">
                          {{ contact?.count }}
                        </q-badge>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-tab-panel>
            <q-tab-panel name="groups" class="tabChat">
              <q-scroll-area style="height: calc(96vh - 158px) !important">
                <q-list>
                  <q-item v-for="(contact) in searchedGroup" :key="contact?.id" clickable v-ripple @click="openChat(contact, true)">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        {{ contact?.name?.charAt(0) }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label lines="1">
                        {{ contact?.name }}
                        <q-tooltip content-class="text-bold">
                          {{ contact?.name }}
                        </q-tooltip>
                      </q-item-label>
                      <q-item-label class="conversation__summary" caption>
                        {{ (contact?.text || '').substring(0, 20) }}{{ (contact?.text || '').length > 20 ? '...' : '' }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>
                        {{ dataInWords(contact?.timestamp) }}
                      </q-item-label>
                      <q-badge class="badge-left" color="red" v-if="contact?.count > 0">{{ contact?.count }}</q-badge>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-tab-panel>
          </q-tab-panels>
      </q-drawer>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
            <q-btn v-if="$q.screen.width > 500" flat dense icon="mdi-emoticon-happy-outline" :disable="cDisableActions || cMostrarEnvioArquivo" class="bg-padrao btn-rounded q-mx-xs" :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                {{ $t('chatPrivado.chatFooter.emoji') }}
              </q-tooltip>
              <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                <VEmojiPicker style="width: 40vw" :showSearch="false" :emojisByRow="20" :labelSearch="$t('common.search')" lang="pt-BR" @select="onInsertSelectEmoji" />
              </q-menu>
            </q-btn>
            <q-btn v-if="$q.screen.width > 500" icon="mdi-paperclip" round flat :disable="cDisableActions" @click="abrirEnvioArquivo" dense :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                {{ $t('chatPrivado.chatFooter.attachFile') }}
              </q-tooltip>
            </q-btn>
            <q-btn v-if="$q.screen.width > 500" icon="mdi-message-video" round flat :disable="cDisableActions" @click="handlSendLinkVideo" dense :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                {{ $t('chatPrivado.chatFooter.sendVideoLink') }}
              </q-tooltip>
            </q-btn>
            <q-input hide-bottom-space :disable="cDisableActions" v-show="!cMostrarEnvioArquivo" ref="inputEnvioMensagem" id="inputEnvioMensagem" type="textarea" @keydown.exact.enter.prevent="() => newMenssage.trim().length ? sendMessage() : ''" class="col-grow q-mx-xs text-grey-10 inputEnvioMensagem" bg-color="white" color="grey-7" placeholder="Digita sua mensagem" input-style="max-height: 30vh" autogrow rounded dense outlined v-model="newMenssage" @paste="handlePaste">
              <template v-slot:prepend v-if="$q.screen.width < 500">
                <q-btn flat icon="mdi-emoticon-happy-outline" :disable="cDisableActions" dense round :color="$q.dark.isActive ? 'white' : ''">
                  <q-tooltip content-class="text-bold">
                    {{ $t('chatPrivado.chatFooter.emoji') }}
                  </q-tooltip>
                  <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                    <VEmojiPicker style="width: 40vw" :showSearch="false" :emojisByRow="20" :labelSearch="$t('common.search')" lang="pt-BR" @select="onInsertSelectEmoji" />
                  </q-menu>
                </q-btn>
                <q-btn icon="mdi-paperclip" round flat :disable="cDisableActions" @click="abrirEnvioArquivo" dense :color="$q.dark.isActive ? 'white' : ''">
                  <q-tooltip content-class="text-bold">
                    {{ $t('chatPrivado.chatFooter.attachFile') }}
                  </q-tooltip>
                </q-btn>
              </template>
            </q-input>
            <!-- QFile controlado por pickFiles() -->
            <q-file
              :disable="cDisableActions"
              ref="PickerFileMessage"
              id="PickerFileMessage"
              v-model="arquivos"
              v-show="cMostrarEnvioArquivo"
              class="col-grow q-mx-xs PickerFileMessage"
              bg-color="white"
              input-style="max-height: 30vh"
              outlined
              use-chips
              multiple
              autogrow
              dense
              rounded
              append
              :max-files="5"
              :max-file-size="15728640"
              :max-total-size="31457280"
              @keydown.exact.enter.prevent="() => arquivos.length > 0 ? sendMessage() : ''"
              accept=".mp3, .txt, .xml, .jpg, .png, image/jpeg, .pdf, .doc, .docx, .mp4, .xls, .xlsx, .jpeg, .zip, .ppt, .pptx, image/*"
              @rejected="onRejectedFiles"
            >
              <template v-slot:file="{ file, removeFile }">
                <q-chip
                  :label="truncateFileName(file.name)"
                  removable
                  @remove="removeFile"
                  color="primary"
                  text-color="white"
                />
              </template>
            </q-file>
            <q-btn ref="btnEnviarMensagem" @click="sendMessage()" flat icon="mdi-send" :disable="cDisableActions" class="bg-padrao btn-rounded q-mx-xs" :color="$q.dark.isActive ? 'white' : ''">
              <q-tooltip content-class="text-bold">
                {{ $t('chatPrivado.chatFooter.send') }}
              </q-tooltip>
            </q-btn>

            <q-btn
              v-if="!cMostrarEnvioArquivo && !isRecordingAudio"
              @click="handleSartRecordingAudio"
              :disabled="cDisableActions"
              flat
              icon="mdi-microphone"
              class="bg-padrao btn-rounded q-mx-xs"
              :color="$q.dark.isActive ? 'white' : ''"
            >
              <q-tooltip content-class="text-bold"> {{ $t('inputMensagem.labels.enviarAudio') }} </q-tooltip>
            </q-btn>
            <div style="width: 200px" class="flex flex-center items-center" v-if="isRecordingAudio">
              <q-btn flat icon="mdi-close" color="negative" @click="handleCancelRecordingAudio" class="bg-padrao btn-rounded q-mx-xs" />
              <!-- <RecordingTimer class="text-bold" :class="{ 'text-white': $q.dark.isActive }" /> -->
              <q-btn flat icon="mdi-send-circle-outline" color="positive" @click="handleStopRecordingAudio" class="bg-padrao btn-rounded q-mx-xs" />
            </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
    <audio ref="audioNotificationPlay">
      <source :src="alertSound" type="audio/mp3">
    </audio>
    <q-dialog v-model="showGroupMembers">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('chatPrivado.dialog.groupMembers') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item v-for="member in groupMembers" :key="member.userId">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ member.user.name?.charAt(0) }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ member.user.name }}</q-item-label>
                <q-item-label caption>{{ member.user.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showEditMessage" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('chatPrivado.dialog.editMessage') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="editingMessageText"
            type="textarea"
            autofocus
            outlined
            :placeholder="$t('chatPrivado.messages.editPlaceholder')"
            rows="3"
            @keydown.enter.ctrl="salvarEdicaoMensagem"
            @keydown.enter.meta="salvarEdicaoMensagem"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="grey" v-close-popup />
          <q-btn flat :label="$t('common.save')" color="primary" @click="salvarEdicaoMensagem" :loading="savingMessage" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showForwardMessage" persistent>
      <q-card style="min-width: 400px; max-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('chatPrivado.dialog.forwardMessage') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="forwardSearchParam"
            :placeholder="$t('chatPrivado.messages.searchPlaceholder')"
            outlined
            dense
            clearable
            class="q-mb-md">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-list style="max-height: 300px; overflow-y: auto;">
            <q-item 
              v-for="contact in filteredForwardUsers" 
              :key="contact?.id" 
              clickable 
              v-ripple 
              @click="selecionarDestinatarioEncaminhar(contact)">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ contact.name?.charAt(0) }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ contact.name }}</q-item-label>
                <q-item-label caption>{{ contact.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="filteredForwardUsers.length === 0">
              <q-item-section>
                <q-item-label class="text-grey">{{ $t('chatPrivado.messages.noUsersFound') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showForwardMessage" persistent>
      <q-card style="min-width: 400px; max-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('chatPrivado.dialog.forwardMessage') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="forwardSearchParam"
            :placeholder="$t('chatPrivado.messages.searchPlaceholder')"
            outlined
            dense
            clearable
            class="q-mb-md">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-list style="max-height: 300px; overflow-y: auto;">
            <q-item 
              v-for="contact in filteredForwardUsers" 
              :key="contact?.id" 
              clickable 
              v-ripple 
              @click="selecionarDestinatarioEncaminhar(contact)">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ contact.name?.charAt(0) }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ contact.name }}</q-item-label>
                <q-item-label caption>{{ contact.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="filteredForwardUsers.length === 0">
              <q-item-section>
                <q-item-label class="text-grey">{{ $t('chatPrivado.messages.noUsersFound') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalEmojiOpen" :maximized="$q.screen.lt.sm" :position="$q.screen.gt.xs ? 'standard' : 'bottom'">
      <q-card class="emoji-picker-modal" :style="$q.screen.gt.xs ? 'min-width: 500px; max-width: 600px; max-height: 85vh;' : 'width: 100%; max-height: 85vh;'">
        <q-card-section class="q-pa-none" style="overflow: hidden;">
          <VEmojiPicker
            style="width: 40vw"
            :showSearch="false"
            :emojisByRow="20"
            :labelSearch="$t('common.search')"
            lang="pt-BR"
            @select="onSelectEmojiReaction"
          />
        </q-card-section>
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

import { uid } from 'quasar'
import { mapGetters } from 'vuex'
import { ListarUsuariosChatPrivado, DadosUsuario } from 'src/service/user.js'
import pt from 'date-fns/locale/pt-BR'
import { ListarTenantPorId } from 'src/service/tenants.js'
import { format, formatDistance, parseJSON } from 'date-fns'
import { ListarUsersPrivadosPorGrupo } from 'src/service/equipes.js'
import { listCountUnreadPrivateMessage, listCountUnreadGroupMessage, enviarMensagemPrivada, listarGruposPrivados, listarMensagensPrivadas, marcarMensagemPrivadaComoLida, editarMensagemPrivada, deletarMensagemPrivada, adicionarReacaoMensagemPrivada, removerReacaoMensagemPrivada } from 'src/service/chatPrivado.js'
import VueEasyLightbox from 'vue-easy-lightbox'
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'
import whatsBackground from 'src/assets/wa-background.png'
import whatsBackgroundDark from 'src/assets/wa-background-dark.jpg'
import alertSound from 'src/assets/icq.mp3'
import mixinSockets from 'src/pages/atendimento/mixinSockets.js'
import socketInitial from 'src/layouts/socketInitial.js'
import { socketIO } from 'src/utils/socket.js'
import { MostrarCores } from 'src/service/empresas.js';

// import RecordingTimer from './RecordingTimer.vue';

export default {
  mixins: [mixinSockets, socketInitial],
  name: 'WhatsappLayout',
  props: {
    isLineDate: {
      type: Boolean,
      default: true
    },
    showMenu: {
      type: Boolean,
      default: false
    }
  },
  // components: {
  //   RecordingTimer
  // },
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      isRecordingAudio: false,
      mediaRecorder: null,
      mediaStream: null,
      audioChunks: [],
      isCancellingRecord: false,
      colors: {},
      notificacaoInternaNaoLida: '',
      notificacaoInternaGrupoNaoLida: '',
      usuario: {},
      rightDrawerOpen: true,
      abrirModalImagem: false,
      search: '',
      message: '',
      newMenssage: '',
      urlMedia: '',
      alertSound,
      tab: 'users',
      searchParam: '',
      searchedUsers: [],
      searchedGroup: [],
      arquivos: [],
      messages: [],
      userId: 0,
      heigthInputMensagem: 0,
      abrirFilePicker: false,
      selectedContact: {
        id: null,
        name: '',
        isOnline: false,
        messages: [],
        hasMore: false
      },
      showGroupMembers: false,
      groupMembers: [],
      // Adicionar propriedades para controlar timers
      recalcularHora: 0,
      horaIntervalId: null,
      // Sistema de gerenciamento de memória
      timers: [],
      // Timer para atualizar lista de usuários após receber mensagens
      updateUsersListTimer: null,
      // Edição e deleção de mensagens
      showEditMessage: false,
      editingMessage: null,
      editingMessageText: '',
      savingMessage: false,
      // Reações
      modalEmojiOpen: false,
      mensagemReacao: null,
      // Encaminhar
      showForwardMessage: false,
      forwardSearchParam: '',
      mensagemParaEncaminhar: null,
      destinatarioEncaminhar: null,
    }
  },
  computed: {
    ...mapGetters([
      'userChat',
      'mensagemChatPrivado',
      'notificacaoChatPrivado',
      'chatFocado',
      'unreadMessageInterna',
      'listaUsuarios',
      'listaGrupos'
    ]),
    filteredForwardUsers() {
      const base = (this.listaUsuarios || []).filter(u => !!u?.id && u?.id !== this.usuario?.userId)
      if (!this.forwardSearchParam || this.forwardSearchParam.length === 0) {
        return base
      }
      const term = this.forwardSearchParam.toLowerCase()
      return base.filter(u => 
        (u.name || '').toLowerCase().indexOf(term) >= 0 ||
        (u.email || '').toLowerCase().indexOf(term) >= 0
      )
    },
    cMostrarEnvioArquivo() {
      return this.arquivos.length > 0
    },
    style() {
      return {
        height: this.$q.screen.height + 'px'
      }
    },
    styleChatArea() {
      return {
        backgroundImage: this.$q.dark.isActive ? `url(${whatsBackgroundDark}) !important` : `url(${whatsBackground}) !important`,
        backgroundPosition: 'center !important'
      }
    },
    cDisableActions() {
      return (this.selectedContact?.id == null)
    },
    cStyleScrolll() {
      const loading = 0 // this.loading ? 72 : 0
      const add = this.heigthInputMensagem + loading
      // Reserve exact height for content so it never covers footer
      return `height: calc(100vh - var(--chat-header-h, 56px) - var(--chat-footer-h, 56px) - ${add}px) !important; width: 100%`
    }
  },
  watch: {
    listaUsuarios: {
      immediate: true,
      handler() {
        const base = (this.listaUsuarios || []).filter(u => !!u?.id)
        this.searchedUsers = base
        if (this.searchParam.length > 0) {
          this.searchedUsers = base.filter(u => (u.name || '').toLowerCase().indexOf(this.searchParam.toLowerCase()) == 0)
        }
      }
    },
    listaGrupos: {
      immediate: true,
      handler() {
        const base = (this.listaGrupos || []).filter(g => !!g?.id)
        this.searchedGroup = base
        if (this.searchParam.length > 0) {
          this.searchedGroup = base.filter(u => (u.name || '').toLowerCase().indexOf(this.searchParam.toLowerCase()) == 0)
        }
      }
    },
    unreadMessageInterna: {
      handler() {
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        if (this.selectedContact?.id !== null && this.selectedContact?.id == this.unreadMessageInterna.receiverId) {
          this.messages.forEach(message => {
            if (message.sender?.id == this.unreadMessageInterna.senderId) {
              message.read = true
              this.$forceUpdate()
            }
          })
        }
        if (this.unreadMessageInterna.senderId == usuario.userId) {
          const index = this.listaUsuarios.findIndex(user => user?.id == this.unreadMessageInterna.receiverId)
          const user = { ...this.listaUsuarios[index] }
          user.read = true
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user })
        }
      }
    },
    userChat: {
      handler() {
        try {
          const idx = (this.listaUsuarios || []).findIndex(u => u?.id === this.userChat?.userId)
          if (idx >= 0) {
            const updated = { ...this.listaUsuarios[idx], isOnline: this.userChat.isOnline }
            this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: updated })
            if (this.searchParam?.length) {
              this.buscarTicketFiltro()
            }
          }
        } catch (e) {
          // no-op
        }
      }
    },
    mensagemChatPrivado: {
      async handler() {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (this.selectedContact?.id !== null &&
          ((this.selectedContact?.id == this.mensagemChatPrivado.senderId && this.mensagemChatPrivado.groupId == null) ||
            (this.selectedContact?.id == this.mensagemChatPrivado.groupId && this.mensagemChatPrivado.receiverId == null && this.mensagemChatPrivado.senderId != usuario.userId))
        ) {
          // Verifica se a mensagem já existe
          const existingMessage = this.messages.find(message => message?.id === this.mensagemChatPrivado?.id);
          if (!existingMessage) {
            const newMessage = {
              id: this.mensagemChatPrivado?.id,
              text: this.mensagemChatPrivado.text,
              timestamp: this.mensagemChatPrivado.timestamp,
              sender: this.mensagemChatPrivado.sender,
              received: this.mensagemChatPrivado.receiverId,
              mediaType: this.mensagemChatPrivado.mediaType,
              mediaName: this.mensagemChatPrivado.mediaName,
              mediaUrl: this.mensagemChatPrivado.mediaUrl,
              react: this.mensagemChatPrivado.react,
              reactFromMe: this.mensagemChatPrivado.reactFromMe
            };

            this.messages.push(newMessage);

            if (this.selectedContact.isGroup) {
              const index = this.listaGrupos.findIndex(grupo => grupo?.id == this.mensagemChatPrivado.groupId);
              const group = { ...this.listaGrupos[index] };
              group.senderId = this.mensagemChatPrivado.senderId;
              group.timestamp = this.mensagemChatPrivado.timestamp;
              group.text = this.mensagemChatPrivado.text;
              group.read = null;
              this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group });
            } else {
              const index = this.listaUsuarios.findIndex(user => user?.id == this.mensagemChatPrivado.senderId);
              if (index >= 0) {
                const user = { ...this.listaUsuarios[index] };
                user.senderId = this.mensagemChatPrivado.senderId;
                user.timestamp = this.mensagemChatPrivado.timestamp;
                user.text = this.mensagemChatPrivado.text;
                user.read = null;
                this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
              }
            }

            this.$forceUpdate();
            this.marcarMensagemComoLida(this.selectedContact?.id, this.selectedContact.isGroup);
            this.scrollToBottom();
          }
        } else {
          // Nova mensagem recebida - atualiza apenas os contadores locais
          if (this.mensagemChatPrivado.groupId != null && this.mensagemChatPrivado.senderId != usuario.userId) {
            const index = this.listaGrupos.findIndex(grupo => grupo?.id == this.mensagemChatPrivado.groupId);
            if (index >= 0) {
              const group = { ...this.listaGrupos[index] };
              group.senderId = this.mensagemChatPrivado.senderId;
              group.timestamp = this.mensagemChatPrivado.timestamp;
              group.text = this.mensagemChatPrivado.text;
              group.read = null;
              
              // Verifica se é uma nova mensagem (não está na conversa atual aberta)
              // Verifica se a conversa atual está aberta e se a mensagem pertence a ela
              const isCurrentChat = this.selectedContact?.id === this.mensagemChatPrivado.groupId;
              const messageExists = this.mensagemChatPrivado?.id && this.messages.find(m => m?.id === this.mensagemChatPrivado?.id);
              const isNewMessage = !isCurrentChat && !messageExists;
              
              if (isNewMessage) {
                // Incrementa o contador do grupo em tempo real
                // Garante que o contador seja um número válido e não negativo
                const currentCount = Math.max(0, Number(group.count || 0));
                group.count = currentCount + 1;
                
                // Atualiza os contadores gerais do servidor (badge da aba)
                try {
                  const privateMessageData = await listCountUnreadPrivateMessage(this.usuario.userId);
                  const groupMessageData = await listCountUnreadGroupMessage(this.usuario.userId);
                  this.notificacaoInternaNaoLida = privateMessageData.data.count || 0;
                  this.notificacaoInternaGrupoNaoLida = (groupMessageData.data.count && groupMessageData.data.count.count) || 0;
                } catch (error) {
                  console.error('Erro ao atualizar contadores gerais:', error);
                }
                
                // Agenda atualização da lista de grupos para sincronizar contadores com o servidor
                // Usa debounce para evitar múltiplas chamadas quando várias mensagens chegam rapidamente
                if (this.updateUsersListTimer) {
                  clearTimeout(this.updateUsersListTimer);
                }
                this.updateUsersListTimer = setTimeout(async () => {
                  try {
                    await this.listarGrupos();
                  } catch (error) {
                    console.error('Erro ao atualizar lista de grupos:', error);
                  }
                  this.updateUsersListTimer = null;
                }, 500); // Aguarda 500ms após a última mensagem para atualizar
              } else {
                // Se a mensagem já existe, mantém o contador atual
                group.count = Number(group.count || 0);
              }
              
              // Atualiza o grupo no store com o contador correto
              this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group });
            }
          } else if (this.mensagemChatPrivado.senderId != usuario.userId) {
            const index = this.listaUsuarios.findIndex(user => user?.id == this.mensagemChatPrivado.senderId);
            if (index >= 0) {
              const user = { ...this.listaUsuarios[index] };
              user.senderId = this.mensagemChatPrivado.senderId;
              user.timestamp = this.mensagemChatPrivado.timestamp;
              user.text = this.mensagemChatPrivado.text;
              user.read = null;
              
              // Verifica se é uma nova mensagem (não está na conversa atual aberta)
              // A mensagem não está em this.messages porque essa conversa não está aberta
              // Verifica se a conversa atual está aberta e se a mensagem pertence a ela
              const isCurrentChat = this.selectedContact?.id === this.mensagemChatPrivado.senderId;
              const messageExists = this.mensagemChatPrivado?.id && this.messages.find(m => m?.id === this.mensagemChatPrivado?.id);
              const isNewMessage = !isCurrentChat && !messageExists;
              
              if (isNewMessage) {
                // Incrementa o contador da conversa em tempo real
                // Garante que o contador seja um número válido e não negativo
                const currentCount = Math.max(0, Number(user.count || 0));
                user.count = currentCount + 1;
                
                // Atualiza os contadores gerais do servidor (badge da aba)
                try {
                  const privateMessageData = await listCountUnreadPrivateMessage(this.usuario.userId);
                  const groupMessageData = await listCountUnreadGroupMessage(this.usuario.userId);
                  this.notificacaoInternaNaoLida = privateMessageData.data.count || 0;
                  this.notificacaoInternaGrupoNaoLida = (groupMessageData.data.count && groupMessageData.data.count.count) || 0;
                } catch (error) {
                  console.error('Erro ao atualizar contadores gerais:', error);
                }
                
                // Agenda atualização da lista de usuários para sincronizar contadores com o servidor
                // Usa debounce para evitar múltiplas chamadas quando várias mensagens chegam rapidamente
                if (this.updateUsersListTimer) {
                  clearTimeout(this.updateUsersListTimer);
                }
                this.updateUsersListTimer = setTimeout(async () => {
                  try {
                    await this.listarUsuarios();
                  } catch (error) {
                    console.error('Erro ao atualizar lista de usuários:', error);
                  }
                  this.updateUsersListTimer = null;
                }, 500); // Aguarda 500ms após a última mensagem para atualizar
              } else {
                // Se a mensagem já existe, mantém o contador atual
                user.count = Number(user.count || 0);
              }
              
              // Atualiza o usuário no store com o contador correto
              this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
            }
          }
        }
      }
    },
    notificacaoChatPrivado: {
      async handler() {
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        if (this.notificacaoChatPrivado.groupId && this.notificacaoChatPrivado.senderId !== usuario.userId) {
          const index = this.listaGrupos.findIndex(g => g?.id == this.notificacaoChatPrivado.groupId)
          const grupo = this.listaGrupos[index]
          const grupoUser = await ListarUsersPrivadosPorGrupo(this.notificacaoChatPrivado.groupId)
          const isUserInGroup = grupoUser.data.some(user => user.userId === usuario.userId)
          
          if ((index >= 0 && !this.chatFocado) || (this.chatFocado && this.chatFocado?.id !== grupo?.id)) {
            if (JSON.parse(localStorage.getItem('recording'))) {
              return
            }
            try {
              if (JSON.parse(localStorage.getItem('recording'))) {
                return
              }
              // Só toca a notificação se o usuário estiver no grupo
              if (isUserInGroup) {
                this.$refs.audioNotificationPlay.play()
              }
            } catch(e){}
            return
          }
          return
        }
        if ((!this.chatFocado || this.chatFocado?.id !== this.notificacaoChatPrivado.senderId) && this.notificacaoChatPrivado.senderId !== usuario.userId) {
          if (JSON.parse(localStorage.getItem('recording'))) {
            return
          }
          try {
            if (JSON.parse(localStorage.getItem('recording'))) {
              return
            }
            this.$refs.audioNotificationPlay.play()
          } catch(e){}
        }
      }
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
      if (this.horaIntervalId) {
        clearInterval(this.horaIntervalId);
        this.horaIntervalId = null;
      }
      if (this.updateUsersListTimer) {
        clearTimeout(this.updateUsersListTimer);
        this.updateUsersListTimer = null;
      }
    },
    // Método para limpar timers
    cleanup() {
      if (this.horaIntervalId) {
        clearInterval(this.horaIntervalId)
        this.horaIntervalId = null
      }
      // Finaliza gravação/stream se estiver ativo
      this.resetMedia()
    },
    async listTenantPorId(){
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.tenantDados = data[0];
      localStorage.setItem('menuVisibility', JSON.stringify(data[0].menuVisibility?.[0] || {}));
    },
    async handleSartRecordingAudio() {
      try {
        if (!navigator?.mediaDevices?.getUserMedia) {
          throw new Error('getUserMedia não suportado neste navegador')
        }

        // Solicita o microfone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.mediaStream = stream

        // Define um mimeType suportado
        const candidates = [
          'audio/ogg; codecs=opus',
          'audio/webm; codecs=opus',
          'audio/mp4; codecs=mp4a.40.2',
          'audio/webm'
        ]
        const mimeType = candidates.find(type => window.MediaRecorder && MediaRecorder.isTypeSupported(type)) || ''

        // Instancia MediaRecorder
        if (typeof window === 'undefined' || typeof window.MediaRecorder === 'undefined') {
          throw new Error('MediaRecorder não suportado neste navegador')
        }
        this.audioChunks = []
        this.isCancellingRecord = false
        const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
        this.mediaRecorder = mr

        mr.ondataavailable = (e) => {
          if (e?.data && e.data.size > 0) this.audioChunks.push(e.data)
        }
        mr.onerror = (e) => {
          console.error('Erro no MediaRecorder:', e)
        }
        mr.onstop = async () => {
          try {
            // Evita envio quando for cancelamento
            if (this.isCancellingRecord) {
              this.resetMedia()
              return
            }

            const blob = new Blob(this.audioChunks, { type: mr.mimeType || 'audio/ogg' })
            if (!blob || blob.size < 10000) {
              // Áudio muito curto, ignora
              this.resetMedia()
              return
            }

            await this.uploadRecordedBlob(blob, mr.mimeType)
          } catch (err) {
            console.error('Falha ao finalizar gravação:', err)
            this.$notificarErro(this.$t('common.notifications.error'), err)
          } finally {
            this.resetMedia()
          }
        }

        mr.start()
        this.isRecordingAudio = true
        localStorage.setItem('recording', 'true')
      } catch (error) {
        this.isRecordingAudio = false
        localStorage.setItem('recording', 'false')
        console.error('Erro ao iniciar a gravação:', error)
        this.$notificarErro(this.$t('common.notifications.error'), error)
      }
    },
    async handleStopRecordingAudio() {
      this.loading = true
      this.isRecordingAudio = false
      try {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop()
        } else {
          // Nada para parar; apenas limpa estado
          this.resetMedia()
        }
      } catch (error) {
        console.log('error', error)
        this.loading = false
        this.$notificarErro(this.$t('common.notifications.error'), error)
      }
    },
    async handleCancelRecordingAudio() {
      try {
        this.isCancellingRecord = true
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop()
        }
      } catch (error) {
        this.$notificarErro(this.$t('common.notifications.error'), error)
      } finally {
        this.isRecordingAudio = false
        this.loading = false
        this.resetMedia()
      }
    },
    async uploadRecordedBlob(blob, mimeType) {
      let response
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      const date = new Date()
      const formData = new FormData()

      // Define extensão a partir do mimeType
      const ext = mimeType?.includes('ogg') ? 'ogg' : (mimeType?.includes('webm') ? 'webm' : (mimeType?.includes('mp4') ? 'm4a' : 'ogg'))
      const filename = `${date.getTime()}.${ext}`
      const audioFile = new File([blob], filename, { type: mimeType || 'audio/ogg' })

      const messageData = {
        text: this.newMenssage,
        timestamp: date.getTime(),
        sender: usuario.userId,
        receiverId: this.selectedContact?.id,
        tenantId: usuario.tenantId,
        mediaType: 'chat',
        read: false,
        arquivos: this.arquivos,
        isGroup: this.selectedContact.isGroup
      }

      const uniqueId = `${Date.now()}`
      formData.append('id', uniqueId)
      formData.append('medias', audioFile)
      formData.append('text', filename)
      formData.append('read', false)
      formData.append('isGroup', this.selectedContact.isGroup)
      formData.append('tenantId', usuario.tenantId)
      formData.append('receiverId', this.selectedContact?.id)
      formData.append('sender', usuario.userId)
      formData.append('timestamp', date.getTime())

      try {
        response = await enviarMensagemPrivada(formData)
        messageData.id = uniqueId
        this.updateFrontEndWithMessage(response, messageData)
      } catch (error) {
        console.error(this.$t('chatPrivado.notifications.sendMessageError'), error)
      } finally {
        this.arquivos = []
        this.isRecordingAudio = false
        this.loading = false
        const timerId = setTimeout(() => {
          this.scrollToBottom()
        }, 300)
        this.addTimer(timerId)
      }
    },
    resetMedia() {
      try {
        if (this.mediaRecorder) {
          this.mediaRecorder.ondataavailable = null
          this.mediaRecorder.onstop = null
          this.mediaRecorder.onerror = null
        }
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(t => t.stop())
        }
      } catch (e) { /* noop */ }
      this.mediaRecorder = null
      this.mediaStream = null
      this.audioChunks = []
      localStorage.setItem('recording', 'false')
    },
    async contarMensagens() {
      try {
        const privateMessageData = await listCountUnreadPrivateMessage(this.usuario.userId);
        const groupMessageData = await listCountUnreadGroupMessage(this.usuario.userId);
        // Apenas atualiza os contadores se não houver mensagens em processamento
        if (!this.mensagemChatPrivado?.id) {
          this.notificacaoInternaNaoLida = privateMessageData.data.count || 0;
          this.notificacaoInternaGrupoNaoLida = (groupMessageData.data.count && groupMessageData.data.count.count) || 0;
        }
      } catch(e){
        console.error('Erro ao contar mensagens:', e);
        this.notificacaoInternaNaoLida = 0;
        this.notificacaoInternaGrupoNaoLida = 0;
      }
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = colorsArray.reduce((acc, colorObj) => {
            const key = colorObj.label.toLowerCase();
            acc[key] = colorObj[key];  // Use the correct key here
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
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
    async openChat(contact, isGroup) {
      // Clone contact to avoid mutating Vuex state by reference
      const payload = { ...(contact || {}), isGroup }
      // If contact is invalid, reset selection and stop
      if (!payload?.id) {
        this.selectedContact = { id: null, name: '', isOnline: false, messages: [], hasMore: false, isGroup: !!isGroup }
        this.$store.commit('CHAT_PRIVATE_FOC_UPDATE', this.selectedContact)
        return
      }
      this.$store.commit('CHAT_PRIVATE_FOC_UPDATE', payload)
      this.selectedContact = payload
      this.listarMensagens(payload?.id, isGroup)
      this.scrollToBottom()
      await this.marcarMensagemComoLida(payload?.id, isGroup)
      
      // Se for um grupo, carrega os membros
      if (isGroup) {
        try {
          const response = await ListarUsersPrivadosPorGrupo(contact.id)
          this.groupMembers = response.data
          // console.log('Membros do grupo:', response.data)
        } catch (error) {
          console.error('Erro ao carregar membros do grupo:', error)
        }
      }
    },
    abrirEnvioArquivo(event) {
      this.newMenssage = ''
      this.abrirFilePicker = true
      try {
        this.$refs.PickerFileMessage && this.$refs.PickerFileMessage.pickFiles(event)
      } catch (e) {
        console.error('Falha ao abrir seletor de arquivos', e)
      }
    },
    onNativeFileChange(e) {
      try {
        const files = Array.from(e?.target?.files || [])
        if (!files.length) return
        const MAX_FILES = 5
        const MAX_TOTAL = 31457280 // 30MB
        const MAX_EACH = 15728640 // 15MB

        // Remove arquivos muito grandes individualmente
        const validBySize = []
        for (const f of files) {
          if (f.size > MAX_EACH) {
            this.$q.notify({ type: 'negative', message: `${f.name} acima de 15MB`, position: 'top' })
          } else {
            validBySize.push(f)
          }
        }

        // Respeita limite de quantidade
        const availableSlots = Math.max(0, MAX_FILES - this.arquivos.length)
        const toAdd = validBySize.slice(0, availableSlots)
        if (validBySize.length > availableSlots) {
          this.$q.notify({ type: 'warning', message: this.$t('inputMensagemAgendamento.maxFiles'), position: 'top' })
        }

        // Respeita limite de tamanho total (30MB)
        const currentTotal = this.arquivos.reduce((acc, f) => acc + (f.size || 0), 0)
        let accTotal = currentTotal
        const finalAdd = []
        for (const f of toAdd) {
          if (accTotal + f.size <= MAX_TOTAL) {
            accTotal += f.size
            finalAdd.push(f)
          } else {
            this.$q.notify({ type: 'warning', message: this.$t('inputMensagemAgendamento.checkFiles'), position: 'top' })
          }
        }

        if (finalAdd.length) {
          this.arquivos = [...this.arquivos, ...finalAdd]
        }
      } finally {
        // Permite selecionar o mesmo arquivo novamente no futuro
        if (e?.target) e.target.value = ''
      }
    },
    onRejectedFiles(rejectedEntries) {
      this.$q.notify({
        html: true,
        message: `${this.$t('inputMensagemAgendamento.error')} <br>
        <ul>
          <li>${this.$t('inputMensagemAgendamento.checkFiles')} </li>
        </ul>`,
        type: 'negative',
        progress: true,
        position: 'top',
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
    },
    async listarMensagens(userId, isGroup) {
      if (!userId) {
        // Evita chamadas com id indefinido e limpa visual
        this.messages = []
        return
      }
      try {
        const { data } = await listarMensagensPrivadas(userId, isGroup)
        // Filtra as mensagens para incluir apenas aquelas com senderId ou receiverId correspondente ao ID do contato selecionado
        this.messages = data.msgs.map(message => ({
          id: message?.id,
          text: message.text,
          timestamp: message.timestamp,
          sender: message.sender,
          mediaType: message.mediaType,
          mediaName: message.mediaName,
          mediaUrl: message.mediaUrl,
          received: message.receiverId,
          read: message.read,
          react: message.react,
          reactFromMe: message.reactFromMe
        })).reverse();

        this.userId = userId
        this.scrollToBottom()
      } catch (error) {
        console.error(error)
      }
    },
    async marcarMensagemComoLida(contactId, isGroup) {
      if (!contactId) return
      try {
        await marcarMensagemPrivadaComoLida(contactId, isGroup)
        if (isGroup) {
          const index = this.listaGrupos.findIndex(grupo => grupo?.id == contactId)
          if (index < 0) return
          const grupo = { ...this.listaGrupos[index] }
          // Atualiza o contador da tab para grupos antes de zerar
          this.notificacaoInternaGrupoNaoLida = Math.max(0, this.notificacaoInternaGrupoNaoLida - grupo.count);
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'remove', data: grupo.count })
          grupo.count = 0
          this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: grupo })
          
          // Recarrega a lista de grupos para sincronizar com o servidor
          await this.listarGrupos()
          // Atualiza os contadores gerais
          await this.contarMensagens()
        } else {
          const index = this.listaUsuarios.findIndex(user => user?.id == contactId)
          if (index < 0) return
          const user = { ...this.listaUsuarios[index] }
          // Atualiza o contador da tab para usuários antes de zerar
          this.notificacaoInternaNaoLida = Math.max(0, this.notificacaoInternaNaoLida - user.count);
          this.$store.commit('LIST_PRIVATE_NOTIFICATION', { action: 'remove', data: user.count })
          user.count = 0
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user })
          
          // Recarrega a lista de usuários para sincronizar com o servidor
          await this.listarUsuarios()
          // Atualiza os contadores gerais
          await this.contarMensagens()
        }
      } catch (error) {
        console.error('Erro ao marcar mensagem como não lida:', error)
      }
    },
    async sendMessage() {
      if (this.newMenssage.trim() === '' && !this.cMostrarEnvioArquivo) {
        return;
      }
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const date = new Date();

        const messageData = {
          text: this.newMenssage,
          timestamp: date.getTime(),
          sender: usuario.userId,
          receiverId: this.selectedContact?.id,
          tenantId: usuario.tenantId,
          mediaType: 'chat',
          read: false,
          arquivos: this.arquivos,
          isGroup: this.selectedContact.isGroup
        };

        let response;

        if (!this.cMostrarEnvioArquivo) {
          messageData.id = Date.now(); // Gera um ID único
          response = await enviarMensagemPrivada(messageData);
          this.updateFrontEndWithMessage(response, messageData);
        } else {
          for (const [index, media] of this.arquivos.entries()) {
            const formData = new FormData();
            const uniqueId = `${Date.now()}_${index}`; // Gera um ID único combinando o timestamp e o índice
            formData.append('id', uniqueId); // Use uniqueId aqui
            formData.append('medias', media);
            formData.append('text', media.name);
            formData.append('read', false);
            formData.append('isGroup', this.selectedContact.isGroup);
            formData.append('tenantId', usuario.tenantId);
            formData.append('receiverId', this.selectedContact?.id);
            formData.append('sender', usuario.userId);
            formData.append('timestamp', date.getTime());

            try {
              // Envia cada arquivo separadamente
              response = await enviarMensagemPrivada(formData);


              // Atribui um ID único para cada mensagem
              messageData.id = uniqueId; // Atribua o mesmo uniqueId para o messageData

              // Atualiza o front-end para cada envio
              this.updateFrontEndWithMessage(response, messageData);
            } catch (error) {
              console.error(this.$t('chatPrivado.notifications.sendMessageError'), error);
            }
          }
        }

        // Limpa os campos após todos os envios
        this.newMenssage = '';
        this.arquivos = [];
      } catch (error) {
        console.error(error);
      }
      this.scrollToBottom();
    },
    updateFrontEndWithMessage(response, messageData) {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      delete messageData.receiverId;
      messageData.received = this.selectedContact?.id;
      messageData.mediaType = response.data.mensagem.mediaType;
      messageData.mediaName = response.data.mensagem.mediaName;
      messageData.mediaUrl = response.data.mensagem.mediaUrl;
      messageData.react = response.data.mensagem.react || null;
      messageData.reactFromMe = response.data.mensagem.reactFromMe || null;
      messageData.sender = {
        id: usuario.userId,
        name: usuario.username
      };
      this.messages.push({ ...messageData });

      this.$forceUpdate();
      this.scrollToBottom();
      // Atualiza a lista correta (usuários ou grupos)
      if (this.selectedContact?.isGroup) {
        const idx = this.listaGrupos.findIndex(g => g?.id == this.selectedContact?.id)
        if (idx >= 0) {
          const group = { ...this.listaGrupos[idx] }
          group.senderId = usuario.userId
          group.timestamp = response.data.mensagem.timestamp
          group.text = this.newMenssage.trim() === '' ? response.data.mensagem.mediaName : this.newMenssage
          group.read = false
          this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group })
        }
      } else {
        const index = this.listaUsuarios.findIndex(user => user?.id == this.selectedContact?.id);
        if (index >= 0) {
          const user = { ...this.listaUsuarios[index] };
          user.senderId = usuario.userId;
          user.timestamp = response.data.mensagem.timestamp;
          user.text = this.newMenssage.trim() === '' ? response.data.mensagem.mediaName : this.newMenssage;
          user.read = false;
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
        }
      }
    },
    async handlSendLinkVideo() {
      try {
        const link = `https://meet.jit.si/${uid()}/${uid()}`
        let mensagem = link
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        let id = Date.now(); // Use a timestamp for unique ID

        const date = new Date();

        const messageData = {
          id: id,
          text: mensagem,
          timestamp: date.getTime(),
          sender: usuario.userId,
          receiverId: this.selectedContact?.id,
          tenantId: usuario.tenantId,
          mediaType: 'chat',
          read: false,
          arquivos: this.arquivos,
          isGroup: this.selectedContact.isGroup
        };

        let response;
        response = await enviarMensagemPrivada(messageData);
        
        delete messageData.receiverId;
        messageData.received = this.selectedContact?.id;
        messageData.mediaType = response.data.mensagem.mediaType;
        messageData.mediaName = response.data.mensagem.mediaName;
        messageData.mediaUrl = response.data.mensagem.mediaUrl;
        messageData.react = response.data.mensagem.react || null;
        messageData.reactFromMe = response.data.mensagem.reactFromMe || null;
        messageData.sender = {
          id: usuario.userId,
          name: usuario.username
        };
        this.messages.push(messageData);

        this.$forceUpdate();
        this.scrollToBottom();

        // Atualiza a lista correta (usuários ou grupos)
        if (this.selectedContact?.isGroup) {
          const idx = this.listaGrupos.findIndex(g => g?.id == this.selectedContact?.id)
          if (idx >= 0) {
            const group = { ...this.listaGrupos[idx] }
            group.senderId = usuario.userId
            group.timestamp = response.data.mensagem.timestamp
            group.text = this.newMenssage.trim() === '' ? response.data.mensagem.mediaName : this.newMenssage
            group.read = false
            this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group })
          }
        } else {
          const index = this.listaUsuarios.findIndex(user => user?.id == this.selectedContact?.id);
          if (index >= 0) {
            const user = { ...this.listaUsuarios[index] };
            user.senderId = usuario.userId;
            user.timestamp = response.data.mensagem.timestamp;
            user.text = this.newMenssage.trim() === '' ? response.data.mensagem.mediaName : this.newMenssage;
            user.read = false;
            this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
          }
        }

        this.newMenssage = '';
        this.arquivos = [];
      } catch (error) {
        console.error(error);
      }
      this.scrollToBottom();
    },
    async listarUsuarios() {
      try {
        const { data } = await ListarUsuariosChatPrivado(this.params)
        this.$store.commit('LIST_USERS_PRIVATE', { action: 'create', data: data.users.filter(usuario => usuario.profile !== 'superadmin') })
      } catch (error) {
        console.error(error)
      }
    },
    async listarGrupos() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      const { data } = await listarGruposPrivados(usuario.userId)
      this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'create', data: data })
    },
    buscarTicketFiltro() {
      const term = (this.searchParam || '').toLowerCase()
      this.searchedUsers = (this.listaUsuarios || [])
        .filter(u => !!u?.id)
        .filter(u => (u.name || '').toLowerCase().indexOf(term) == 0)
      this.searchedGroup = (this.listaGrupos || [])
        .filter(g => !!g?.id)
        .filter(g => (g.name || '').toLowerCase().indexOf(term) == 0)
    },
    dataInWords(timestamp) {
      if (timestamp) {
        return formatDistance(new Date(Number(timestamp)), new Date(), { locale: pt })
      } else {
        return null
      }
    },
    dataInWordsMessage(date) {
      return format(parseJSON(new Date(date)), 'HH:mm', { locale: pt })
    },
    getMessageStamp(message) {
      // Retorna apenas o tempo, as reações são exibidas no slot stamp
      return this.dataInWordsMessage(Number(message.timestamp));
    },
    podeRemoverReacao(message, reactionType) {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const isSender = message.sender?.id === usuario.userId;
      
      // reactFromMe só pode ser removida pelo remetente
      if (reactionType === 'reactFromMe') {
        return isSender;
      }
      
      // react só pode ser removida pelo destinatário (não pelo remetente)
      if (reactionType === 'react') {
        return !isSender;
      }
      
      return false;
    },
    async removerReacaoClicando(message, reactionType) {
      try {
        // Verifica novamente se pode remover (segurança adicional)
        if (!this.podeRemoverReacao(message, reactionType)) {
          return;
        }
        
        await removerReacaoMensagemPrivada(message.id);
        
        // Atualiza localmente
        const index = this.messages.findIndex(m => m.id === message.id);
        if (index >= 0) {
          if (reactionType === 'reactFromMe') {
            this.messages[index].reactFromMe = null;
          } else {
            this.messages[index].react = null;
          }
          this.$forceUpdate();
        }
      } catch (error) {
        console.error('Erro ao remover reação:', error);
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.error || 'Erro ao remover reação',
          position: 'top'
        });
      }
    },
    abrirModalReacao(message) {
      this.mensagemReacao = message;
      this.modalEmojiOpen = true;
    },
    abrirModalEncaminhar(message) {
      this.mensagemParaEncaminhar = message;
      this.forwardSearchParam = '';
      this.showForwardMessage = true;
    },
    async selecionarDestinatarioEncaminhar(contact) {
      if (!this.mensagemParaEncaminhar || !contact) {
        return;
      }

      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const date = new Date();

        // Se for mensagem de texto
        if (this.mensagemParaEncaminhar.mediaType === 'chat') {
          const messageData = {
            text: this.mensagemParaEncaminhar.text,
            timestamp: date.getTime(),
            sender: usuario.userId,
            receiverId: contact.id,
            tenantId: usuario.tenantId,
            mediaType: 'chat',
            read: false,
            isGroup: false
          };

          await enviarMensagemPrivada(messageData);
        } else {
          // Se for arquivo, precisa baixar e reenviar
          await this.encaminharArquivo(this.mensagemParaEncaminhar, contact.id);
        }

        this.$q.notify({
          type: 'positive',
          message: this.$t('chatPrivado.notifications.messageForwarded'),
          position: 'top'
        });

        this.showForwardMessage = false;
        this.mensagemParaEncaminhar = null;
        this.destinatarioEncaminhar = null;
      } catch (error) {
        console.error('Erro ao encaminhar mensagem:', error);
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.error || this.$t('chatPrivado.notifications.forwardError'),
          position: 'top'
        });
      }
    },
    async encaminharArquivo(message, receiverId) {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const date = new Date();

        // Obtém o token de autenticação
        const token = JSON.parse(localStorage.getItem('token') || 'null');

        // Baixa o arquivo original com autenticação
        const response = await fetch(message.mediaUrl, {
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {}
        });
        
        if (!response.ok) {
          throw new Error('Erro ao baixar arquivo');
        }
        
        const blob = await response.blob();
        
        // Cria um File object a partir do blob
        const file = new File([blob], message.mediaName || message.text || 'arquivo', {
          type: blob.type
        });

        const formData = new FormData();
        formData.append('medias', file);
        formData.append('text', message.mediaName || message.text);
        formData.append('read', false);
        formData.append('isGroup', false);
        formData.append('tenantId', usuario.tenantId);
        formData.append('receiverId', receiverId);
        formData.append('sender', usuario.userId);
        formData.append('timestamp', date.getTime());

        await enviarMensagemPrivada(formData);
      } catch (error) {
        console.error('Erro ao encaminhar arquivo:', error);
        throw error;
      }
    },
    async onSelectEmojiReaction(emoji) {
      if (!this.mensagemReacao || !emoji || !emoji.data) {
        this.modalEmojiOpen = false;
        return;
      }

      try {
        // Verifica se já existe reação do usuário atual
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const isSender = this.mensagemReacao.sender?.id === usuario.userId;
        const existingReaction = isSender ? this.mensagemReacao.reactFromMe : this.mensagemReacao.react;

        // Se selecionar o mesmo emoji, remove a reação
        if (existingReaction === emoji.data) {
          await removerReacaoMensagemPrivada(this.mensagemReacao.id);
          
          // Atualiza localmente
          const index = this.messages.findIndex(m => m.id === this.mensagemReacao.id);
          if (index >= 0) {
            if (isSender) {
              this.messages[index].reactFromMe = null;
            } else {
              this.messages[index].react = null;
            }
            this.$forceUpdate();
          }
        } else {
          // Se já existe reação diferente, remove primeiro
          if (existingReaction) {
            await removerReacaoMensagemPrivada(this.mensagemReacao.id);
          }

          // Adiciona a nova reação
          await adicionarReacaoMensagemPrivada(this.mensagemReacao.id, emoji.data);

          // Atualiza localmente
          const index = this.messages.findIndex(m => m.id === this.mensagemReacao.id);
          if (index >= 0) {
            if (isSender) {
              this.messages[index].reactFromMe = emoji.data;
            } else {
              this.messages[index].react = emoji.data;
            }
            this.$forceUpdate();
          }
        }
      } catch (error) {
        console.error('Erro ao adicionar reação:', error);
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.error || 'Erro ao adicionar reação',
          position: 'top'
        });
      } finally {
        this.modalEmojiOpen = false;
        this.mensagemReacao = null;
      }
    },
    abrirModalReacao(message) {
      this.mensagemReacao = message;
      this.modalEmojiOpen = true;
    },
    onInsertSelectEmoji(emoji) {
      if (!emoji || !emoji.data) return
      const qInput = this.$refs.inputEnvioMensagem
      const tArea = qInput?.$refs?.input
        || qInput?.getNativeElement?.()
        || qInput?.$el?.querySelector?.('textarea')
        || qInput?.$el?.querySelector?.('input')

      if (tArea) {
        const startPos = Number(tArea.selectionStart || 0)
        const endPos = Number(tArea.selectionEnd || 0)
        const tmpStr = String(tArea.value ?? this.newMenssage ?? '')
        const newVal = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos)
        this.newMenssage = newVal
        this.$nextTick(() => {
          try {
            tArea.focus()
            const newPos = startPos + String(emoji.data).length
            tArea.selectionStart = tArea.selectionEnd = newPos
          } catch (e) { /* noop */ }
        })
      } else {
        // Fallback: append and focus input
        this.newMenssage = (this.newMenssage || '') + emoji.data
        this.$nextTick(() => { try { qInput?.focus?.() } catch (e) {} })
      }
    },
    Value(obj) {
      if (obj) {
        return obj
      } else {
        return ''
      }
    },
    scrollToBottom() {
      const timerId = setTimeout(() => {
        this.$nextTick(() => {
          document.getElementById('inicioListaMensagensChat').scrollIntoView()
        })
      }, 200)
      this.addTimer(timerId);
    },
    scrollArea(e) {
      this.hideOptions = true
      const timerId = setTimeout(() => {
        if (!e) return
        this.scrollIcon = (e.verticalSize - (e.verticalPosition + e.verticalContainerSize)) > 2000 // e.verticalPercentage < 0.8
      }, 200)
      this.addTimer(timerId);
    },
    isPDF(url) {
      if (!url) return false
      const split = url.split('.')
      const ext = split[split.length - 1]
      return ext === 'pdf'
    },
    formatarMensagem(body) {
      if (!body) return
      let format = body
      function is_aplhanumeric(c) {
        var x = c.charCodeAt()
        return !!(((x >= 65 && x <= 90) || (x >= 97 && x <= 122) || (x >= 48 && x <= 57)))
      }
      function whatsappStyles(format, wildcard, opTag, clTag) {
        var indices = []
        for (var i = 0; i < format.length; i++) {
          if (format[i] === wildcard) {
            // eslint-disable-next-line no-unused-expressions
            if (indices.length % 2) { (format[i - 1] == ' ') ? null : ((typeof (format[i + 1]) == 'undefined') ? indices.push(i) : (is_aplhanumeric(format[i + 1]) ? null : indices.push(i))) } else { (typeof (format[i + 1]) == 'undefined') ? null : ((format[i + 1] == ' ') ? null : (typeof (format[i - 1]) == 'undefined') ? indices.push(i) : ((is_aplhanumeric(format[i - 1])) ? null : indices.push(i))) }
          } else {
            // eslint-disable-next-line no-unused-expressions
            (format[i].charCodeAt() == 10 && indices.length % 2) ? indices.pop() : null
          }
        }
        // eslint-disable-next-line no-unused-expressions
        (indices.length % 2) ? indices.pop() : null
        var e = 0
        indices.forEach(function (v, i) {
          var t = (i % 2) ? clTag : opTag
          v += e
          format = format.substr(0, v) + t + format.substr(v + 1)
          e += (t.length - 1)
        })
        return format
      }
      format = whatsappStyles(format, '_', '<i>', '</i>')
      format = whatsappStyles(format, '*', '<b>', '</b>')
      format = whatsappStyles(format, '~', '<s>', '</s>')
      format = format.replace(/\n/gi, '<br>')
      return format
    },
    formatarData(data, formato) {
      const dt = new Date(Number(data))
      const fmt = formato || 'dd/MM/yyyy'
      return format(dt, fmt, { locale: pt })
    },
    async handlePaste(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            if (this.arquivos.length >= 5) {
              this.$q.notify({
                type: 'negative',
                message: this.$t('inputMensagemAgendamento.maxFiles'),
                position: 'top'
              });
              return;
            }

            const totalSize = this.arquivos.reduce((acc, curr) => acc + curr.size, 0);
            if (totalSize + file.size > 31457280) { // 30MB
              this.$q.notify({
                type: 'negative',
                message: this.$t('inputMensagemAgendamento.maxSize'),
                position: 'top'
              });
              return;
            }

            this.arquivos.push(file);
            this.$q.notify({
              type: 'positive',
              message: `${file.name} ${this.$t('inputMensagemAgendamento.added')}`,
              position: 'top'
            });
          }
        }
      }
    },
    truncateFileName(name) {
      if (name && name.length > 20) {
        return name.substring(0, 17) + '...';
      }
      return name;
    },
    iniciarEdicaoMensagem(message) {
      this.editingMessage = message;
      this.editingMessageText = message.text || '';
      this.showEditMessage = true;
    },
    async salvarEdicaoMensagem() {
      if (!this.editingMessage || !this.editingMessageText.trim()) {
        return;
      }

      if (this.editingMessageText.trim() === this.editingMessage.text) {
        this.showEditMessage = false;
        this.editingMessage = null;
        this.editingMessageText = '';
        return;
      }

      this.savingMessage = true;
      try {
        const response = await editarMensagemPrivada(this.editingMessage.id, this.editingMessageText.trim());
        
        // Atualiza a mensagem na lista local
        const index = this.messages.findIndex(m => m.id === this.editingMessage.id);
        if (index >= 0) {
          this.messages[index].text = response.data.mensagem.text;
          this.messages[index].updatedAt = response.data.mensagem.updatedAt;
          this.$forceUpdate();
        }

        // Atualiza na lista de conversas
        if (this.selectedContact?.isGroup) {
          const idx = this.listaGrupos.findIndex(g => g?.id == this.selectedContact?.id);
          if (idx >= 0) {
            const group = { ...this.listaGrupos[idx] };
            group.text = this.editingMessageText.trim();
            this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: group });
          }
        } else {
          const idx = this.listaUsuarios.findIndex(u => u?.id == this.selectedContact?.id);
          if (idx >= 0) {
            const user = { ...this.listaUsuarios[idx] };
            user.text = this.editingMessageText.trim();
            this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
          }
        }

        this.$q.notify({
          type: 'positive',
          message: this.$t('chatPrivado.notifications.messageEdited'),
          position: 'top'
        });

        this.showEditMessage = false;
        this.editingMessage = null;
        this.editingMessageText = '';
      } catch (error) {
        console.error('Erro ao editar mensagem:', error);
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.error || this.$t('chatPrivado.notifications.editError'),
          position: 'top'
        });
      } finally {
        this.savingMessage = false;
      }
    },
    confirmarDeletarMensagem(message) {
      this.$q.dialog({
        title: this.$t('chatPrivado.dialog.deleteMessageTitle'),
        message: this.$t('chatPrivado.dialog.deleteMessageConfirm'),
        cancel: {
          label: this.$t('common.cancel'),
          color: 'grey',
          flat: true
        },
        ok: {
          label: this.$t('common.delete'),
          color: 'negative',
          flat: true
        },
        persistent: true
      }).onOk(() => {
        this.deletarMensagem(message);
      });
    },
    async deletarMensagem(message) {
      try {
        await deletarMensagemPrivada(message.id);
        
        // Remove a mensagem da lista local
        const index = this.messages.findIndex(m => m.id === message.id);
        if (index >= 0) {
          this.messages.splice(index, 1);
          this.$forceUpdate();
        }

        this.$q.notify({
          type: 'positive',
          message: this.$t('chatPrivado.notifications.messageDeleted'),
          position: 'top'
        });
      } catch (error) {
        console.error('Erro ao deletar mensagem:', error);
        this.$q.notify({
          type: 'negative',
          message: error?.response?.data?.error || this.$t('chatPrivado.notifications.deleteError'),
          position: 'top'
        });
      }
    },
  },
  async mounted() {
    // if (!localStorage.getItem('reloaded')) {
    //   localStorage.setItem('reloaded', 'true');
    //   window.location.reload();
    // } else {
    //   localStorage.removeItem('reloaded');
    // }
    await this.listTenantPorId();
    this.userProfile = localStorage.getItem('profile');
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    const { data } = await DadosUsuario(this.usuario.userId)
    localStorage.setItem(`menuPermissions`, JSON.stringify(data?.menuPermissions));
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.["chat-privado"] === true;
    await this.contarMensagens();
    // Garantir painel 'users' ativo e offsets do drawer após montagem
    this.$nextTick(() => {
      this.tab = 'users'
      if (this.updateDrawerOffset) this.updateDrawerOffset()
    })
    this.$store.commit('UPDATE_SHOW_MENU', this.showMenu)
    this.listarUsuarios()
    this.listarGrupos()
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      const colors = JSON.parse(storedColors).reduce((acc, colorObj) => {
        const key = colorObj.label.toLowerCase();
        acc[key] = colorObj[key];
        return acc;
      }, {});

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
    // console.log('MenuPermissions_Cache', menuPermissions)

    // Listeners para eventos de edição, deleção e reações
    const socket = socketIO();
    if (socket && this.usuario?.tenantId) {
      socket.on(`${this.usuario.tenantId}:msg-private-msg-update`, (data) => {
        if (data.action === 'update' && data.data) {
          const index = this.messages.findIndex(m => m.id === data.data.id);
          if (index >= 0) {
            this.messages[index].text = data.data.text;
            this.messages[index].updatedAt = data.data.updatedAt;
            this.$forceUpdate();
          }
        }
      });

      socket.on(`${this.usuario.tenantId}:msg-private-msg-delete`, (data) => {
        if (data.action === 'delete' && data.data) {
          const index = this.messages.findIndex(m => m.id === data.data.id);
          if (index >= 0) {
            this.messages.splice(index, 1);
            this.$forceUpdate();
          }
        }
      });

      socket.on(`${this.usuario.tenantId}:msg-private-msg-reaction`, (data) => {
        if (data.action === 'update' && data.data) {
          const index = this.messages.findIndex(m => m.id === data.data.id);
          if (index >= 0) {
            this.messages[index].react = data.data.react;
            this.messages[index].reactFromMe = data.data.reactFromMe;
            this.$forceUpdate();
          }
        }
      });

      socket.on(`${this.usuario.tenantId}:unread-msg-private-msg`, async (data) => {
        if (data.action === 'update' && data.data) {
          // Atualiza o contador do contato específico
          if (data.data.isGroup) {
            const index = this.listaGrupos.findIndex(grupo => grupo?.id == data.data.senderId);
            if (index >= 0) {
              const grupo = { ...this.listaGrupos[index] };
              grupo.count = 0;
              this.$store.commit('LIST_GROUPS_PRIVATE_CHAT', { action: 'update', data: grupo });
            }
            // Recarrega a lista de grupos para sincronizar
            await this.listarGrupos();
          } else {
            const index = this.listaUsuarios.findIndex(user => user?.id == data.data.senderId);
            if (index >= 0) {
              const user = { ...this.listaUsuarios[index] };
              user.count = 0;
              this.$store.commit('LIST_USERS_PRIVATE', { action: 'update', data: user });
            }
            // Recarrega a lista de usuários para sincronizar
            await this.listarUsuarios();
          }
          // Atualiza os contadores gerais
          await this.contarMensagens();
        }
      });
    }
  },
  created() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.horaIntervalId = setInterval(() => {
      this.recalcularHora++
    }, 20000)
    this.addTimer(this.horaIntervalId);
    // Ajusta offsets do Drawer conforme altura real do header e footer
    this.updateDrawerOffset = this.updateDrawerOffset || function () {
      try {
        const layout = this.$el?.querySelector?.('.whatsapp-layout')
        const header = layout?.querySelector?.('.q-header')
        const footer = layout?.querySelector?.('.q-footer')
        const h = header?.getBoundingClientRect()?.height || 56
        const f = footer?.getBoundingClientRect()?.height || 56
        document.documentElement.style.setProperty('--chat-header-h', `${Math.round(h)}px`)
        document.documentElement.style.setProperty('--chat-footer-h', `${Math.round(f)}px`)
      } catch (e) { /* noop */ }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateDrawerOffset)
    }

    // Listeners para eventos de edição, deleção e reações serão adicionados no mounted
  },
  beforeUnmount() {
    this.cleanup()
    // Limpeza completa de memória
    this.cleanupMemory();
    if (typeof window !== 'undefined' && this.updateDrawerOffset) {
      window.removeEventListener('resize', this.updateDrawerOffset)
    }
  },
  unmounted() {
    this.cleanup()
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  components: {
    VEmojiPicker,
    VueEasyLightbox
  }
}
</script>

<style lang="sass">
.whatsapp-layout
  .q-drawer
    // Keep drawer between header and footer and under header shadow
    z-index: 3000 !important
    min-width: 300px
    max-width: 420px
    top: var(--chat-header-h, 56px) !important
    bottom: var(--chat-footer-h, 56px) !important
    height: calc(100vh - var(--chat-header-h, 56px) - var(--chat-footer-h, 56px)) !important
  
  // Garantir que o overlay não bloqueie a interação no mobile
  .q-drawer__overlay
    z-index: 2999 !important
  
  // Garantir que o conteúdo do drawer seja clicável e tenha prioridade
  .q-drawer__content
    z-index: 3001 !important
    position: relative !important
    pointer-events: auto !important
  
  // Ensure header/footer are always above the drawer (shadow visible)
  .q-header
    z-index: 2002 !important
  .q-footer
    z-index: 2001 !important

.badge-left
  border-radius: 50%

.chatarea .q-scrollarea__container
  // Subtract actual header and footer heights to avoid overlapping the footer
  height: calc(100vh - var(--chat-header-h, 56px) - var(--chat-footer-h, 56px)) !important

// Give the page container padding so fixed header/footer don’t cover content
.whatsapp-layout .q-page-container
  padding-bottom: var(--chat-footer-h, 56px)
  padding-top: var(--chat-header-h, 56px)

.WAL
  width: 100%
  height: 100%
  padding-bottom: 20px

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100vh
    width: 100%
    max-width: 100vw
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 200px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem

.q-message-text
  min-width: 300px
  max-width: 300px

.tabChat
  margin-top: 0
  padding-top: 8px
  padding-right: 0
  padding-left: 0
  padding-bottom: 0

// Estilos específicos apenas para as linhas de data no chat
.chatarea .hr-text
    line-height: 1em
    position: relative
    outline: 0
    border: 0
    color: black
    text-align: center
    height: 1.5em
    opacity: 0.8

    &:before
      content: ""
      background: linear-gradient(to right, transparent, #818078, transparent)
      position: absolute
      left: 0
      top: 50%
      width: 100%
      height: 1px

    &:after
      content: attr(data-content)
      position: relative
      display: inline-block
      color: black
      font-size: 16px
      font-weight: 600
      padding: 0 0.5em
      line-height: 1.5em
      background-color: $grey
      border-radius: 15px

// Estilos específicos apenas para o drawer do chat privado
.whatsapp-layout .q-drawer .q-item
  border-bottom: 1px solid rgba(0,0,0,0.05)
  &:last-child
    border-bottom: none

// Estilos específicos apenas para o chat privado
.whatsapp-layout .relative-position
  position: relative

.whatsapp-layout .q-badge
  font-size: 12px
  padding: 4px 8px

.whatsapp-layout .message-text
  white-space: pre-line
  word-wrap: break-word
  word-break: break-word

.whatsapp-layout .q-message-text
  min-width: 300px
  max-width: 300px
  white-space: pre-line


// Mantém o QFile no DOM, porém invisível quando não há arquivos,
// permitindo que pickFiles() funcione mesmo "oculto".
// (sem estilos extras para QFile/input nativo; seguindo a versão original)
</style>
