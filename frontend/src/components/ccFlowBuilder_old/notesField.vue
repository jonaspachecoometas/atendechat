<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.NotesField') }}
        </div>
        
        <!-- Nota -->
        <div class="q-mb-sm">
          <div class="row items-center">
            <div class="col-10">
              <q-input
                v-model="$attrs.element.data.noteText"
                :label="$t('nodeForm.notes.note')"
                type="textarea"
                outlined
                dense
                autogrow
                rows="3"
                :rules="[val => !!val || $t('common.required')]"
                :placeholder="$t('nodeForm.notes.notePlaceholder')"
                @update:model-value="updateData"
              />
            </div>
            <div class="col-2 q-pl-sm">
              <q-btn
                @click="clearData"
                class="text-red"
                flat
                round
                size="sm"
                icon="mdi-cancel"
              >
                <q-tooltip>
                  {{ $t('nodeForm.clear') }}
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'NotesField',
  mounted() {
    this.initializeData()
  },
  methods: {
    initializeData() {
      if (!this.$attrs.element.data.noteText) {
        this.$attrs.element.data.noteText = ''
      }
    },
    updateData() {
      this.$emit('notes-changed', this.$attrs.element.data)
    },
    clearData() {
      this.$attrs.element.data.noteText = ''
      this.updateData()
    }
  },
  watch: {
    '$attrs.element.data': {
      handler() {
        this.initializeData()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.text-subtitle2 {
  color: #2c3e50;
  font-weight: 600;
}

.q-input, .q-select {
  .q-field__control {
    background: rgba(255, 255, 255, 0.7);
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
    
    &:focus-within {
      background: #fff;
    }
  }
}

body.body--dark {
  .text-subtitle2 {
    color: #fff;
  }
  
  .q-input, .q-select {
    .q-field__control {
      background: rgba(40, 40, 40, 0.85);
      color: #fff;
      
      &:hover {
        background: rgba(40, 40, 40, 0.95);
      }
      
      &:focus-within {
        background: #222;
      }
    }
  }
}
</style>
