<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <div class="row col full-width q-pa-lg">
      <q-card flat bordered class="full-width">
        <q-card-section class="text-h6 text-bold">
          {{ $t('instagramComentarios.title') }}
          <div class="absolute-top-right q-pa-sm">
            <q-btn
              flat
              class="btn-outline"
              color="primary"
              icon="refresh"
              :label="$t('instagramComentarios.refresh')"
              @click="loadChannels"
              :loading="loadingChannels"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="row full-width q-px-md q-pb-md">
      <q-card flat bordered class="full-width">
        <q-card-section>
          <div class="row q-gutter-md">
            <div class="col-12 col-md-4">
              <q-select
                v-model="selectedChannel"
                :options="channels"
                option-label="name"
                option-value="id"
                :label="$t('instagramComentarios.selectChannel')"
                emit-value
                map-options
                @update:model-value="onChannelChange"
                clearable
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon name="mdi-instagram" color="pink" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.name }}</q-item-label>
                      <q-item-label caption>ID: {{ scope.opt.id }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Lista de Mídias -->
    <div v-if="selectedChannel" class="row full-width q-px-md q-pb-md">
      <q-card flat bordered class="full-width">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ $t('instagramComentarios.mediaList') }}</div>
          <q-inner-loading :showing="loadingMedia">
            <q-spinner color="primary" size="50px" />
          </q-inner-loading>
          
          <div v-if="!loadingMedia && mediaList.length === 0" class="text-center q-pa-lg">
            <q-icon name="mdi-image-off" size="60px" color="grey" />
            <div class="text-grey q-mt-md">{{ $t('instagramComentarios.noMedia') }}</div>
          </div>

          <div v-else class="row q-gutter-md">
            <q-card
              v-for="media in mediaList"
              :key="media.id"
              flat
              bordered
              class="col-12 col-sm-6 col-md-4 col-lg-3 cursor-pointer"
              @click="selectMedia(media)"
            >
              <q-card-section>
                <div class="text-subtitle2 text-bold q-mb-xs">{{ $t('instagramComentarios.mediaId') }}: {{ media.id }}</div>
                <div v-if="media.caption" class="text-caption text-grey-7 q-mb-sm" style="max-height: 60px; overflow: hidden;">
                  {{ media.caption }}
                </div>
                <div v-if="media.timestamp" class="text-caption text-grey">
                  {{ formatDate(media.timestamp) }}
                </div>
                <q-chip v-if="media.media_type" :label="media.media_type" size="sm" color="primary" />
              </q-card-section>
            </q-card>
          </div>

          <div v-if="mediaPaging && mediaPaging.next" class="row justify-center q-mt-md">
            <q-btn
              flat
              color="primary"
              :label="$t('instagramComentarios.loadMore')"
              @click="loadMoreMedia"
              :loading="loadingMoreMedia"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Comentários da Mídia Selecionada -->
    <div v-if="selectedMedia" class="row full-width q-px-md q-pb-md">
      <q-card flat bordered class="full-width">
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="col">
              <div class="text-h6">{{ $t('instagramComentarios.comments') }}</div>
              <div class="text-caption text-grey">{{ $t('instagramComentarios.mediaId') }}: {{ selectedMedia.id }}</div>
            </div>
            <q-btn
              flat
              round
              icon="close"
              @click="selectedMedia = null; commentsList = []"
            />
          </div>

          <q-inner-loading :showing="loadingComments">
            <q-spinner color="primary" size="50px" />
          </q-inner-loading>

          <div v-if="!loadingComments && commentsList.length === 0" class="text-center q-pa-lg">
            <q-icon name="mdi-comment-off" size="60px" color="grey" />
            <div class="text-grey q-mt-md">{{ $t('instagramComentarios.noComments') }}</div>
          </div>

          <q-list v-else separator>
            <q-item v-for="comment in commentsList" :key="comment.id">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="mdi-account-circle" color="grey" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <strong>{{ comment.username || $t('instagramComentarios.anonymous') }}</strong>
                  <span class="text-grey q-ml-sm text-caption">
                    {{ formatDate(comment.timestamp) }}
                  </span>
                </q-item-label>
                <q-item-label caption>{{ comment.text }}</q-item-label>
                <q-item-label v-if="comment.like_count" caption>
                  <q-icon name="mdi-heart" color="red" size="xs" />
                  {{ comment.like_count }} {{ $t('instagramComentarios.likes') }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="row q-gutter-xs">
                  <q-btn
                    flat
                    round
                    icon="mdi-reply"
                    color="primary"
                    @click="openReplyDialog(comment)"
                  >
                    <q-tooltip>{{ $t('instagramComentarios.reply') }}</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    icon="mdi-delete"
                    color="negative"
                    @click="confirmDeleteComment(comment)"
                  >
                    <q-tooltip>{{ $t('instagramComentarios.delete') }}</q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>

          <div v-if="commentsPaging && commentsPaging.next" class="row justify-center q-mt-md">
            <q-btn
              flat
              color="primary"
              :label="$t('instagramComentarios.loadMore')"
              @click="loadMoreComments"
              :loading="loadingMoreComments"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Dialog de Resposta -->
    <q-dialog v-model="replyDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('instagramComentarios.replyToComment') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="selectedComment" class="q-mb-md">
            <div class="text-caption text-grey">{{ $t('instagramComentarios.commentFrom') }}</div>
            <div class="text-body2">
              <strong>{{ selectedComment.username || $t('instagramComentarios.anonymous') }}</strong>: 
              {{ selectedComment.text }}
            </div>
          </div>

          <q-input
            v-model="replyMessage"
            :label="$t('instagramComentarios.replyMessage')"
            type="textarea"
            rows="4"
            autofocus
            :rules="[val => !!val || $t('instagramComentarios.messageRequired')]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('instagramComentarios.cancel')" color="grey" v-close-popup />
          <q-btn
            flat
            :label="$t('instagramComentarios.send')"
            color="primary"
            @click="sendReply"
            :loading="sendingReply"
            :disable="!replyMessage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ListarWhatsapps } from 'src/service/sessoesWhatsapp.js'
import {
  ListMediaInstagram,
  GetMediaCommentsInstagram,
  ReplyCommentInstagram,
  DeleteCommentInstagram
} from 'src/service/instagram.js'
import request from 'src/service/request.js'

export default defineComponent({
  name: 'InstagramComentarios',
  data() {
    return {
      userProfile: localStorage.getItem('profile'),
      pageAllowed: true,
      channels: [],
      selectedChannel: null,
      loadingChannels: false,
      mediaList: [],
      loadingMedia: false,
      loadingMoreMedia: false,
      mediaPaging: null,
      selectedMedia: null,
      commentsList: [],
      loadingComments: false,
      loadingMoreComments: false,
      commentsPaging: null,
      replyDialog: false,
      selectedComment: null,
      replyMessage: '',
      sendingReply: false,
      deletingComment: false
    }
  },
  mounted() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      this.loadingChannels = true
      try {
        const { data } = await ListarWhatsapps()
        this.channels = data.filter(channel => channel.type === 'instagram' && channel.status === 'CONNECTED')
      } catch (error) {
        console.error('Error loading channels:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorLoadingChannels')
        })
      } finally {
        this.loadingChannels = false
      }
    },
    async onChannelChange() {
      if (this.selectedChannel) {
        this.selectedMedia = null
        this.commentsList = []
        await this.loadMedia()
      }
    },
    async loadMedia() {
      if (!this.selectedChannel) return
      
      this.loadingMedia = true
      try {
        const { data } = await ListMediaInstagram(this.selectedChannel, {
          limit: 25,
          fields: 'id,caption,timestamp,media_type,media_url,permalink'
        })
        
        this.mediaList = data.data || []
        this.mediaPaging = data.paging || null
      } catch (error) {
        console.error('Error loading media:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorLoadingMedia')
        })
      } finally {
        this.loadingMedia = false
      }
    },
    async loadMoreMedia() {
      if (!this.mediaPaging?.next || !this.selectedChannel) return
      
      this.loadingMoreMedia = true
      try {
        const channel = this.channels.find(c => c.id === this.selectedChannel)
        const { data } = await ListMediaInstagram(this.selectedChannel, {
          limit: 25,
          fields: 'id,caption,timestamp,media_type,media_url,permalink',
          nextUrl: this.mediaPaging.next
        })
        
        this.mediaList = [...this.mediaList, ...(data.data || [])]
        this.mediaPaging = data.paging || null
      } catch (error) {
        console.error('Error loading more media:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorLoadingMoreMedia')
        })
      } finally {
        this.loadingMoreMedia = false
      }
    },
    async selectMedia(media) {
      this.selectedMedia = media
      await this.loadComments(media.id)
    },
    async loadComments(mediaId) {
      this.loadingComments = true
      try {
        const channel = this.channels.find(c => c.id === this.selectedChannel)
        const { data } = await GetMediaCommentsInstagram(mediaId, {
          limit: 25,
          fields: 'id,text,username,timestamp,like_count',
          whatsappId: channel.id
        })
        
        this.commentsList = data.data || []
        this.commentsPaging = data.paging || null
      } catch (error) {
        console.error('Error loading comments:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorLoadingComments')
        })
      } finally {
        this.loadingComments = false
      }
    },
    async loadMoreComments() {
      if (!this.commentsPaging?.next || !this.selectedMedia) return
      
      this.loadingMoreComments = true
      try {
        const channel = this.channels.find(c => c.id === this.selectedChannel)
        const { data } = await request({
          url: `/instagramMetaComments/${this.selectedMedia.id}`,
          method: 'get',
          params: {
            nextUrl: this.commentsPaging.next,
            whatsappId: channel.id
          }
        })
        
        this.commentsList = [...this.commentsList, ...(data.data || [])]
        this.commentsPaging = data.paging || null
      } catch (error) {
        console.error('Error loading more comments:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorLoadingMoreComments')
        })
      } finally {
        this.loadingMoreComments = false
      }
    },
    openReplyDialog(comment) {
      this.selectedComment = comment
      this.replyMessage = ''
      this.replyDialog = true
    },
    async sendReply() {
      if (!this.replyMessage || !this.selectedComment) return
      
      this.sendingReply = true
      try {
        const channel = this.channels.find(c => c.id === this.selectedChannel)
        await ReplyCommentInstagram({
          commentId: this.selectedComment.id,
          message: this.replyMessage,
          whatsappId: channel.id
        })
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('instagramComentarios.replySent')
        })
        
        this.replyDialog = false
        this.replyMessage = ''
        this.selectedComment = null
        
        // Recarregar comentários
        await this.loadComments(this.selectedMedia.id)
      } catch (error) {
        console.error('Error sending reply:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorSendingReply')
        })
      } finally {
        this.sendingReply = false
      }
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString(this.$i18n.locale)
    },
    confirmDeleteComment(comment) {
      this.$q.dialog({
        title: this.$t('instagramComentarios.deleteComment'),
        message: this.$t('instagramComentarios.deleteConfirmation'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteComment(comment)
      })
    },
    async deleteComment(comment) {
      if (!comment || !comment.id) return
      
      this.deletingComment = true
      try {
        const channel = this.channels.find(c => c.id === this.selectedChannel)
        await DeleteCommentInstagram({
          commentId: comment.id,
          whatsappId: channel.id
        })
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('instagramComentarios.commentDeleted')
        })
        
        // Recarregar comentários
        await this.loadComments(this.selectedMedia.id)
      } catch (error) {
        console.error('Error deleting comment:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('instagramComentarios.errorDeletingComment')
        })
      } finally {
        this.deletingComment = false
      }
    }
  }
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>

