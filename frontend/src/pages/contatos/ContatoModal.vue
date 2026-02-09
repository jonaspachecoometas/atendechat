<template>
  <q-dialog
    @show="resetContactData"
    :model-value="modalContato"
    @update:model-value="$emit('update:modalContato', $event)"
    persistent
  >
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">
          {{ contactId ? $t('contactsModal.titleEdit') : $t('contactsModal.titleAdd') }}
        </div>
      </q-card-section>

      <q-card-section class="q-py-sm text-bold">
        {{ $t('contactsModal.labelName') }}
      </q-card-section>

      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 col-md-6 row q-col-gutter-sm items-center">
          <c-input
            class="col"
            outlined
            v-model="contato.name"
            :validator="v$.contato.name"
            @blur="v$.contato.name.$touch"
            :label="$t('contactsModal.labelName')"
          />
          <q-btn
            v-if="contactId"
            round
            dense
            flat
            color="primary"
            icon="refresh"
            :loading="isUpdatingName"
            @click="updateName"
            :disable="isUpdatingName"
            :title="$t('contactsModal.updateNameButton')"
          />
        </div>
        <c-input
          class="col-12 col-md-6"
          outlined
          v-model="contato.number"
          :validator="v$.contato.number"
          @blur="v$.contato.number.$touch"
          mask="+##########################"
          :placeholder="$t('contactsModal.placeholderNumber')"
          fill-mask
          unmasked-value
          :hint="$t('contactsModal.hintNumber')"
          :label="$t('contactsModal.labelNumber')"
        />
        <c-input
          class="col-12"
          outlined
          :validator="v$.contato.email"
          @blur="v$.contato.email.$touch"
          v-model="contato.email"
          :label="$t('contactsModal.labelEmail')"
        />
        <c-input
          class="col-6"
          outlined
          :validator="v$.contato.cpf"
          @blur="v$.contato.cpf.$touch"
          :placeholder="$t('contactsModal.placeholderCpf')"
          :hint="$t('contactsModal.hintCpf')"
          v-model="contato.cpf"
          :label="$t('contactsModal.labelCpf')"
        />
        <c-input
          class="col-6"
          outlined
          :validator="v$.contato.birthdayDate"
          @blur="v$.contato.birthdayDate.$touch"
          v-model="contato.birthdayDate"
          :label="$t('contactsModal.labelBirthday')"
          :hint="$t('contactsModal.hintBirthday')"
        />
        <c-input
          class="col-6"
          outlined
          :validator="v$.contato.firstName"
          @blur="v$.contato.firstName.$touch"
          :placeholder="$t('contactsModal.placeholderFirstName')"
          :hint="$t('contactsModal.hintFirstName')"
          v-model="contato.firstName"
          :label="$t('contactsModal.labelFirstName')"
        />
        <c-input
          class="col-6"
          outlined
          :validator="v$.contato.lastName"
          @blur="v$.contato.lastName.$touch"
          :placeholder="$t('contactsModal.placeholderLastName')"
          :hint="$t('contactsModal.hintLastName')"
          v-model="contato.lastName"
          :label="$t('contactsModal.labelLastName')"
        />
        <c-input
          class="col-12"
          outlined
          :validator="v$.contato.businessName"
          @blur="v$.contato.businessName.$touch"
          :placeholder="$t('contactsModal.placeholderBusinessName')"
          :hint="$t('contactsModal.hintBusinessName')"
          v-model="contato.businessName"
          :label="$t('contactsModal.labelBusinessName')"
        />
        <c-input
          class="col-4"
          outlined
          :validator="v$.contato.messengerId"
          @blur="v$.contato.messengerId.$touch"
          :placeholder="$t('contactsModal.placeholderMessengerId')"
          :hint="$t('contactsModal.hintMessengerId')"
          v-model="contato.messengerId"
          :label="$t('contactsModal.labelMessengerId')"
        />
        <c-input
          class="col-4"
          outlined
          :validator="v$.contato.instagramPK"
          @blur="v$.contato.instagramPK.$touch"
          :placeholder="$t('contactsModal.placeholderInstagramPK')"
          :hint="$t('contactsModal.hintInstagramPK')"
          v-model="contato.instagramPK"
          :label="$t('contactsModal.labelInstagramPK')"
        />
        <c-input
          class="col-4"
          outlined
          :validator="v$.contato.hubWhatsapp"
          @blur="v$.contato.hubWhatsapp.$touch"
          :placeholder="$t('contactsModal.placeholderhubWhatsapp')"
          :hint="$t('contactsModal.hinthubWhatsapp')"
          v-model="contato.hubWhatsapp"
          :label="$t('contactsModal.labelhubWhatsapp')"
        />
        <div class="col-12 row q-col-gutter-sm items-center">
          <c-input
            class="col"
            outlined
            dense
            :validator="v$.contato.lid"
            @blur="v$.contato.lid.$touch"
            :placeholder="$t('contactsModal.placeholderLid')"
            :hint="$t('contactsModal.hintLid')"
            v-model="contato.lid"
            :label="$t('contactsModal.labelLid')"
          />
          <q-btn
            v-if="contactId"
            round
            dense
            flat
            color="primary"
            icon="refresh"
            :loading="isUpdatingLid"
            @click="updateLid"
            :disable="isUpdatingLid"
            :title="$t('contactsModal.updateLidButton')"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-card class="bg-white q-mt-sm btn-rounded" bordered flat>
          <q-card-section class="text-bold q-pb-none">
            {{ $t('contactsModal.walletSectionTitle') }}
            <q-separator />
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-select
              square
              borderless
              v-model="contato.wallets"
              multiple
              :max-values="1"
              :options="usuarios"
              use-chips
              option-value="id"
              option-label="name"
              emit-value
              map-options
              dropdown-icon="add"
              class="col-12"
            >
              <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                <q-item v-bind="itemProps" v-on="itemEvents || {}">
                  <q-item-section>
                    <q-item-label v-html="opt.name"></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox :model-value="selected" @update:model-value="() => toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="{ opt }">
                <q-chip
                  dense
                  square
                  color="white"
                  text-color="primary"
                  class="q-ma-xs row col-12 text-body1"
                >
                  {{ opt.name }}
                </q-chip>
              </template>
              <template v-slot:no-option="{ itemProps, itemEvents }">
                <q-item v-bind="itemProps" v-on="itemEvents || {}">
                  <q-item-section>
                    <q-item-label class="text-negative text-bold">
                      {{ $t('contactsModal.walletNoAvailable') }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-section>
        <q-card class="bg-white q-mt-sm btn-rounded" bordered flat>
          <q-card-section class="text-bold q-pb-none">
            {{ $t('contactsModal.tagSectionTitle') }}
            <q-separator />
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-select
              square
              borderless
              v-model="contato.tags"
              multiple
              :options="etiquetas"
              use-chips
              option-value="id"
              option-label="tag"
              emit-value
              map-options
              dropdown-icon="add"
              class="col-12"
            >
              <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                <q-item v-bind="itemProps" v-on="itemEvents || {}">
                  <q-item-section>
                    <q-item-label v-html="opt.tag"></q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-checkbox :model-value="selected" @update:model-value="() => toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="{ opt }">
                <q-chip
                  dense
                  square
                  color="white"
                  text-color="primary"
                  class="q-ma-xs row col-12 text-body1"
                >
                  <q-icon :style="{ color: opt.color }" name="mdi-pound-box-outline" size="28px" class="q-mr-sm" />
                  {{ opt.tag }}
                </q-chip>
              </template>
              <template v-slot:no-option="{ itemProps, itemEvents }">
                <q-item v-bind="itemProps" v-on="itemEvents || {}">
                  <q-item-section>
                    <q-item-label class="text-negative text-bold">
                      {{ $t('contactsModal.tagNoAvailable') }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-section class="q-py-sm text-bold">
        {{ $t('contactsModal.additionalInfoSectionTitle') }}
      </q-card-section>

      <q-card-section class="row q-col-gutter-md justify-center">
        <template v-for="(extraInfo, index) in contato.extraInfo" :key="extraInfo._tempId">
          <div class="col-12 row justify-center q-col-gutter-sm">
            <q-input
              class="col-12 col-md-6"
              outlined
              v-model="extraInfo.name"
              :label="$t('common.description')"
              :error="hasDuplicateName(extraInfo, index)"
              :error-message="hasDuplicateName(extraInfo, index) ? 'Este nome já está sendo usado em outro campo' : ''"
            />
            <q-input
              class="col-12 col-md-6"
              outlined
              :label="$t('common.info')"
              v-model="extraInfo.value"
            />
            <div class="col q-pt-md">
              <q-btn
                icon="delete"
                round
                flat
                color="negative"
                @click="removeExtraInfo(index)"
              />
            </div>
          </div>
        </template>
        <div class="col-12">
          <q-btn
            class="full-width"
            color="primary"
            outline
            :label="$t('common.addInfo')"
            @click="addExtraInfo"
          />
        </div>
      </q-card-section>
      
      <!-- <q-card-section class="row q-col-gutter-md justify-center">
        <template v-for="(extraInfo, index) in contato.extraInfo">
          <div :key="index" class="col-12 row justify-center q-col-gutter-sm">
            <q-input
              class="col-12 col-md-6"
              outlined
              v-model="extraInfo.name"
              :label="$t('common.description')"
            />
            <q-input
              class="col-12 col-md-6"
              outlined
              label="Informação"
              v-model="extraInfo.value"
            />
            <div class="col q-pt-md">
              <q-btn
                :key="index"
                icon="delete"
                round
                flat
                color="negative"
                @click="removeExtraInfo(index)"
              />
            </div>
          </div>
        </template>
        <div class="col-12">
          <q-btn
            class="full-width"
            color="primary"
            outline
            :label="$t('contactsModal.saveButtonLabel')"
            @click="saveContact"
          />
        </div>
      </q-card-section> -->

      <q-card-actions align="right" class="q-mt-lg">
        <q-btn 
          :label="$t('contactsModal.exitButtonLabel')" 
          color="negative" 
          v-close-popup 
          class="q-px-md"
          :disable="isSaving" 
        />
        <q-btn 
          class="q-ml-lg q-px-md" 
          :label="$t('contactsModal.saveButtonLabel')" 
          color="primary" 
          @click="saveContact"
          :loading="isSaving"
          :disable="isSaving"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { ObterContato, CriarContato, EditarContato, EditarEtiquetasContato, AtualizarLid, AtualizarNome } from 'src/service/contatos.js'
import { ListarUsuarios } from 'src/service/user.js'
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { debounce } from 'quasar'

export default {
  name: 'ContatoModal',
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  props: {
    modalContato: {
      type: Boolean,
      default: false
    },
    contactId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      contato: {
        name: null,
        number: null,
        email: '',
        extraInfo: [],
        wallets: [],
        tags: [],
        cpf: '',
        birthdayDate: '',
        firstName: '',
        lastName: '',
        businessName: '',
        messengerId: null,
        instagramPK: null,
        hubWhatsapp: null,
        lid: null
      },
      usuarios: [],
      etiquetas: [],
      isLoading: false,
      isSaving: false,
      isUpdatingLid: false,
      isUpdatingName: false
    }
  },
  validations: {
    contato: {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      email: { email },
      // number: { required, minLength: minLength(8) },
      number: { minLength: minLength(8) },
      cpf: { minLength: minLength(11) },
      birthdayDate: { minLength: minLength(10) },
      firstName: { minLength: minLength(3) },
      lastName: { minLength: minLength(3) },
      businessName: { minLength: minLength(3) },
      messengerId: { minLength: minLength(3) },
      instagramPK: { minLength: minLength(3) },
      hubWhatsapp: { minLength: minLength(3) },
      lid: { minLength: minLength(3) }
    }
  },
  methods: {
    resetContactData() {
      if (!this.contactId) {
        this.contato = {
          name: null,
          number: null,
          email: '',
          extraInfo: [],
          wallets: [],
          tags: [],
          cpf: '',
          birthdayDate: '',
          firstName: '',
          lastName: '',
          businessName: '',
          messengerId: null,
          instagramPK: null,
          hubWhatsapp: null,
          lid: null
        };
        this.fetchContact();
      } else {
        this.fetchContact();
      }
    },
    async fetchContact () {
      try {
        await this.listarUsuarios()
        if (!this.contactId) return
        const { data } = await ObterContato(this.contactId)
        this.contato = {
          ...data,
          extraInfo: data.extraInfo && Array.isArray(data.extraInfo) 
            ? data.extraInfo.map((info, idx) => {
                const stableId = info.id ? `db-${info.id}` : `temp-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 9)}`
                return {
                  name: info.name || '', 
                  value: info.value || '',
                  id: info.id || null,
                  _tempId: stableId
                }
              }) 
            : []
        }
        if (data.number && data.number.substring(0, 2) === '55') {
          this.contato.number = data.number.substring(0)
        }
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('common.notifications.error'), error)
      }
    },
    removeExtraInfo (index) {
      this.contato = {
        ...this.contato,
        extraInfo: this.contato.extraInfo.filter((_, i) => i !== index)
      }
    },
    addExtraInfo () {
      const newField = { 
        name: null, 
        value: null,
        _tempId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      this.contato = {
        ...this.contato,
        extraInfo: [...this.contato.extraInfo, newField]
      }
    },
    hasDuplicateName (currentField, currentIndex) {
      if (!this.contato.extraInfo || this.contato.extraInfo.length === 0) return false
      const currentName = currentField?.name?.trim()
      if (!currentName) return false
      return this.contato.extraInfo.some((info, index) => 
        index !== currentIndex && 
        info.name && 
        info.name.trim() === currentName
      )
    },
    async saveContact () {
      if (this.isSaving) return
      
      this.$v.contato.$touch()
      if (this.$v.contato.$error) {
        return this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          message: this.$t('contactsModal.validationErrorMessage'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      }

      // Validar campos duplicados antes de salvar
      const validExtraInfo = this.contato.extraInfo
        .filter(info => info.name && info.name.trim() !== '' && info.value !== null && info.value !== undefined)
        .map(info => ({ name: info.name.trim(), value: String(info.value) }))
      
      const names = validExtraInfo.map(info => info.name)
      const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index)
      
      if (duplicateNames.length > 0) {
        this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          message: 'Não é permitido ter campos com o mesmo nome: ' + [...new Set(duplicateNames)].join(', '),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.isSaving = false
        return
      }

      this.isSaving = true
      const contato = {
        ...this.contato,
        number: '' + this.contato.number,
        // Sempre enviar extraInfo, mesmo que vazio, para que o backend remova campos antigos
        extraInfo: validExtraInfo
      }

      try {
        if (this.contactId) {
          const { data } = await EditarContato(this.contactId, contato)
          await EditarEtiquetasContato(this.contactId, [...this.contato.tags])
          this.$emit('contatoModal:contato-editado', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('contactsModal.editSuccessMessage'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarContato(contato)
          if(this.contato.tags){
            await EditarEtiquetasContato(data.id, [...this.contato.tags]) 
          }
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('contactsModal.createSuccessMessage'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.$emit('contatoModal:contato-criado', data)
        }
        this.$emit('update:modalContato', false)
      } catch (error) {
        console.error(error)
        if (error.data && error.data.error.includes('ERR_DUPLICATED_CONTACT')){
          this.$q.notify({
            type: 'negative',
            progress: true,
            position: 'top',
            message: this.$t('contactsModal.duplicatedContact'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          this.$notificarErro(this.$t('contactsModal.errorContact'), error)
        } else if (error.data && (error.data.error.includes('ERR_WAPP_INVALID_CONTACT') || error.data.error.includes('ERR_WAPP_CHECK_CONTACT'))){
          this.$q.notify({
            type: 'negative',
            progress: true,
            position: 'top',
            message: this.$t('contactsModal.errorContact') + ': ' + this.$t('contactsModal.invalidContact'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        this.$notificarErro(this.$t('contactsModal.errorContact'), error)
        } else {
          this.$q.notify({
              type: 'negative',
              progress: true,
              position: 'top',
              message: this.$t('contactsModal.errorContact') + ': ' + error.data.error,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          this.$notificarErro(this.$t('contactsModal.errorContact'), error)
        }
      } finally {
        this.isSaving = false
      }
    },
    async listarUsuarios () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contactsModal.errorUsers'), error)
      }
    },
    async listarEtiquetas() {
      try {
        const { data } = await ListarEtiquetas(true)
        // Ordenar etiquetas por ordem alfabética baseada no campo 'tag'
        this.etiquetas = data.sort((a, b) => {
          const tagA = a.tag ? a.tag.toLowerCase() : ''
          const tagB = b.tag ? b.tag.toLowerCase() : ''
          return tagA.localeCompare(tagB)
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contactsModal.errorTags'), error)
      }
    },
    async updateLid() {
      if (this.isUpdatingLid) return
      
      this.isUpdatingLid = true
      try {
        const { data } = await AtualizarLid(this.contactId, this.contato.lid)
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t('contactsModal.updateLidSuccessMessage'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        this.$emit('update:modalContato', false)
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contactsModal.errorContact'), error)
      } finally {
        this.isUpdatingLid = false
      }
    },
    async updateName() {
      if (this.isUpdatingName) return
      
      this.isUpdatingName = true
      try {
        const { data } = await AtualizarNome(this.contactId, this.contato.name)
        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          textColor: 'black',
          message: this.$t('contactsModal.updateNameSuccessMessage'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('contactsModal.errorContact'), error)
      } finally {
        this.isUpdatingName = false
      }
    }
  },
  created() {
    this.debouncedTagUpdate = debounce(async (tags) => {
      if (this.contactId) {
        try {
          this.isLoading = true
          await EditarEtiquetasContato(this.contactId, [...tags])
        } catch (error) {
          console.error(error)
          this.$notificarErro(this.$t('contactsModal.errorTags'), error)
        } finally {
          this.isLoading = false
        }
      }
    }, 500)
  },
  watch: {
    'contato.tags': {
      handler(newTags) {
        this.debouncedTagUpdate(newTags)
      },
      deep: true
    }
  },
  beforeMount() {
    this.listarEtiquetas()
  },
  unmounted() {
    this.v$?.contato?.$reset()
  }
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;

    .q-card-section {
      padding: 16px 24px;

      &:first-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding-bottom: 16px;
      }

      .text-h6 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--q-primary);
        margin: 0;
      }
    }

    .q-card-actions {
      padding: 16px 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }
  }

  .q-input,
  .q-select {
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

  .q-card.bg-white {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;

    .q-card-section {
      padding: 12px 16px;

      .text-bold {
        font-weight: 600;
        color: var(--q-primary);
        margin-bottom: 8px;
      }

      .q-separator {
        margin: 8px 0;
      }
    }
  }

  .q-chip {
    border-radius: 6px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      .q-card-section {
        &:first-child {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }

      .q-card-actions {
        border-top-color: rgba(255, 255, 255, 0.1);
      }
    }

    .q-input,
    .q-select {
      .q-field__control {
        background: rgba(255, 255, 255, 0.05);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &.q-field--focused {
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }

    .q-card.bg-white {
      background: rgba(40, 40, 40, 0.95);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .q-dialog {
    .q-card {
      border-radius: 12px;

      .q-card-section {
        padding: 12px 16px;
      }

      .q-card-actions {
        padding: 12px 16px;
      }
    }
  }
}
</style>
