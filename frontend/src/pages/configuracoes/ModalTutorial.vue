<template>
  <q-dialog
    persistent
    :value="modalTutorial"
    @update:model-value="$emit('update:modalTutorial', $event)"
    @hide="fecharModal"
  >
    <q-card style="width: 500px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{ tutorialEdicao && tutorialEdicao.id ? $t('configuracaoTutoriais.edit') : $t('configuracaoTutoriais.create') }}
        </div>
      </q-card-section>
      
      <q-card-section>
        <q-input
          v-model="tutorial.title"
          :label="$t('configuracaoTutoriais.title')"
          outlined
          dense
        />
      </q-card-section>
      
      <q-card-section>
        <q-input
          v-model="tutorial.description"
          :label="$t('configuracaoTutoriais.description')"
          type="textarea"
          outlined
          dense
        />
      </q-card-section>
      
      <q-card-section>
        <q-input
          v-model="tutorial.link"
          :label="$t('configuracaoTutoriais.link')"
          outlined
          dense
        />
      </q-card-section>
      
      <q-card-section>
        <q-toggle
          v-model="tutorial.isActive"
          :label="$t('configuracaoTutoriais.isActive')"
          color="primary"
        />
      </q-card-section>
      
      <q-card-section>
        <q-file
          v-model="thumbnail"
          :label="$t('configuracaoTutoriais.thumbnail')"
          outlined
          dense
          accept="image/*"
          @update:model-value="handleThumbnailChange"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-img
          v-if="thumbnail || tutorial.thumbnailUrl"
          :src="thumbnail ? URL.createObjectURL(thumbnail) : tutorial.thumbnailUrl"
          style="max-width: 200px; margin-top: 10px"
        />
      </q-card-section>
      
      <q-card-actions align="right" class="q-mt-md">
        <q-btn
          flat
          :label="$t('common.cancel')"
          color="negative"
          @click="fecharModal"
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('common.save')"
          color="primary"
          @click="handleTutorial"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarTutorial, AtualizarTutorial } from 'src/service/tutorials.js'

export default {
  name: 'ModalTutorial',
  props: {
    modalTutorial: {
      type: Boolean,
      default: false
    },
    tutorialEdicao: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tutorial: {
        id: null,
        title: '',
        description: '',
        link: '',
        thumbnail: null,
        isActive: false
      },
      thumbnail: null,
      loading: false
    }
  },
  watch: {
    modalTutorial: {
      handler(newVal) {
        if (newVal) {
          this.abrirModal();
        }
      },
      immediate: true
    },
    tutorialEdicao: {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.tutorial = { ...newVal };
        } else {
          this.resetarTutorial();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    resetarTutorial() {
      this.tutorial = {
        id: null,
        title: '',
        description: '',
        link: '',
        thumbnail: null,
        isActive: false
      };
      this.thumbnail = null;
    },
    fecharModal() {
      this.resetarTutorial();
      this.$emit('update:tutorialEdicao', {});
      this.$emit('update:modalTutorial', false);
    },
    abrirModal() {
      if (this.tutorialEdicao && this.tutorialEdicao.id) {
        this.tutorial = { ...this.tutorialEdicao };
      } else {
        this.resetarTutorial();
      }
    },
    handleThumbnailChange(file) {
      if (file) {
        this.tutorial.thumbnail = file;
      }
    },
    async handleTutorial() {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append('title', this.tutorial.title);
        formData.append('description', this.tutorial.description);
        formData.append('link', this.tutorial.link);
        formData.append('isActive', this.tutorial.isActive);
        if (this.thumbnail) {
          formData.append('thumbnail', this.thumbnail);
        }

        if (this.tutorial.id) {
          const { data } = await AtualizarTutorial(this.tutorial.id, formData);
          this.$emit('modal-tutorial:editada', data);
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('common.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          });
        } else {
          const { data } = await CriarTutorial(formData);
          this.$emit('modal-tutorial:criada', data);
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('configuracaoTutoriais.notifications.created'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          });
        }
        this.loading = false;
        this.fecharModal();
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t('common.notifications.error'), error);
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
}

.q-card-section {
  padding: 18px 24px;
}

.q-card-actions {
  padding: 16px 24px;
  border-top: 1px solid rgba(0,0,0,0.06);
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
}

@media (max-width: 600px) {
  .q-card {
    width: 98vw !important;
    min-width: unset !important;
    border-radius: 10px;
    padding: 0;
  }
  .q-card-section, .q-card-actions {
    padding: 10px 8px;
  }
}
</style>