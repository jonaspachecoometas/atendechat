<template>
  <div class="reasons-field">
    <q-card class="bg-white q-mt-sm btn-rounded" style="width: 100%" bordered flat>
      <q-card-section class="text-bold q-pb-none">
        {{ $t('generalSupport.reason') }}
        <q-separator />
      </q-card-section>
      <div class="row items-center q-mb-md q-pb-md" style="margin-top: 5px; margin-left: 5px; gap: 5px;">
        <q-select
          v-model="$attrs.element.data.reasonId"
          outlined
          :label="$t('common.save')"
          :options="motivos"
          option-value="id"
          option-label="name"
          emit-value
          class="col-10"
          :loading="loading"
          @update:model-value="onReasonChange"
        />
        <q-btn
          @click="limparReason"
          class="col-1 text-red"
          flat
          round
          size="sm"
          style="display: flex; align-items: center; justify-content: center;"
          icon="mdi-cancel"
        >
          <q-tooltip>
            {{ $t('generalSupport.clearReason') }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ListarMotivos } from 'src/service/motivos'

export default {
  name: 'ReasonsField',
  data() {
    return {
      motivos: [],
      loading: false
    }
  },
  mounted() {
    this.initializeData()
    this.carregarMotivos()
  },
  methods: {
    async carregarMotivos() {
      try {
        this.loading = true
        const { data } = await ListarMotivos()
        // Ordenar motivos por ordem alfabética baseada no campo 'name'
        const motivosOrdenados = (data.reasons || []).sort((a, b) => {
          const nameA = a?.name ? a.name.toLowerCase() : ''
          const nameB = b?.name ? b.name.toLowerCase() : ''
          return nameA.localeCompare(nameB)
        })
        this.motivos = motivosOrdenados
      } catch (error) {
        console.error('Erro ao carregar motivos:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar motivos'
        })
      } finally {
        this.loading = false
      }
    },
    initializeData() {
      if (!this.$attrs.element.data.reasonId) {
        this.$attrs.element.data.reasonId = null
      }
    },
    onReasonChange() {
      // Trigger change event if needed
      this.$emit('reason-changed', this.$attrs.element.data.reasonId)
    },
    limparReason() {
      this.$attrs.element.data.reasonId = null
      this.onReasonChange()
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

<style lang="sass" scoped>
.reasons-field
  .q-card
    border-radius: 8px
    
  .q-select
    .q-field__control
      border-radius: 6px
      
  .q-btn
    border-radius: 50%
    
  @media (prefers-color-scheme: dark)
    .q-card
      background-color: #2d2d2d !important
      color: white
      
    .q-select
      .q-field__control
        background-color: #424242
        color: white
</style>
