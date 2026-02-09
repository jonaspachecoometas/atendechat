<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.OpportunityField') }}
        </div>
        
        <!-- Nome da Oportunidade -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.name"
            :label="$t('funil.nome')"
            outlined
            dense
            :rules="[val => !!val || $t('common.required')]"
            class="q-mb-sm"
          />
        </div>

        <!-- Pipeline e Etapa -->
        <div class="row q-col-gutter-sm q-mb-sm">
          <div class="col-12 col-md-6">
            <q-select
              v-model="$attrs.element.data.stageId"
              :options="stagesOptions"
              :label="$t('funil.pipeEtapa')"
              outlined
              dense
              emit-value
              map-options
              :rules="[val => !!val || $t('common.required')]"
              @update:model-value="onStageChange"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="$attrs.element.data.responsibleId"
              :options="responsaveisOptions"
              :label="$t('funil.responsavel')"
              outlined
              dense
              emit-value
              map-options
              clearable
            />
          </div>
        </div>

        <!-- Valor -->
        <div class="q-mb-sm">
          <q-input
            v-model.number="$attrs.element.data.value"
            :label="$t('funil.valor')"
            type="number"
            min="0"
            step="0.01"
            outlined
            dense
          />
        </div>
        
        <!-- Tipo de Data -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.dateType"
            :options="dateTypeOptions"
            :label="$t('nodeForm.opportunity.dateType')"
            outlined
            dense
            emit-value
            map-options
            @update:model-value="onDateTypeChange"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.opportunity.dateTypeHint')"
          />
        </div>
        
        <!-- Dias a partir da interação -->
        <div v-if="$attrs.element.data.dateType === 'days_from_interaction'" class="q-mb-sm">
          <q-input
            v-model.number="$attrs.element.data.daysFromInteraction"
            :label="$t('funil.daysFromInteraction')"
            type="number"
            min="0"
            max="365"
            outlined
            dense
            :rules="[val => val >= 0 || $t('funil.daysRequired')]"
            :hint="$t('funil.daysFromInteractionHint')"
          />
        </div>
        
        <!-- Data customizada -->
        <div v-if="$attrs.element.data.dateType === 'custom'" class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.closingForecast"
            :label="$t('funil.previsaoFechamento')"
            filled
            type="date"
            outlined
            dense
            :rules="[val => !!val || $t('funil.dataObrigatoria')]"
          />
        </div>

        <!-- Status -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.opportunityStatus"
            :options="statusOptions"
            :label="$t('funil.status')"
            outlined
            dense
            emit-value
            map-options
            clearable
          />
        </div>

        <!-- Descrição -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.opportunityDescription"
            :label="$t('funil.descricao')"
            type="textarea"
            outlined
            dense
            autogrow
            rows="3"
          />
        </div>

        <!-- Contato (será preenchido automaticamente com o contato do ticket) -->
        <div class="q-mb-sm">
          <q-input
            :value="contactInfo"
            :label="$t('funil.contato')"
            outlined
            dense
            readonly
            :hint="$t('nodeForm.opportunity.contactAutoFill')"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarPipelines } from 'src/service/funil'
import { ListarStages } from 'src/service/estagio'
import { ListarUsuarios } from 'src/service/user'

export default {
  name: 'OpportunityField',
  data () {
    return {
      stagesOptions: [],
      responsaveisOptions: [],
      pipelines: [],
      stages: [],
      responsaveis: [],
      dateTypeOptions: [
        { label: this.$t('nodeForm.opportunity.today'), value: 'today' },
        { label: this.$t('nodeForm.opportunity.tomorrow'), value: 'tomorrow' },
        { label: this.$t('nodeForm.opportunity.days_from_interaction'), value: 'days_from_interaction' },
        { label: this.$t('nodeForm.opportunity.custom'), value: 'custom' }
      ]
    }
  },
  computed: {
    statusOptions() {
      return [
        { label: this.$t('nodeForm.opportunity.open'), value: 'open' },
        { label: this.$t('nodeForm.opportunity.win'), value: 'win' },
        { label: this.$t('nodeForm.opportunity.lose'), value: 'lose' }
      ]
    },
    contactInfo() {
      // Será preenchido automaticamente com o contato do ticket atual
      return this.$t('nodeForm.opportunity.contactAutoFill')
    }
  },
  watch: {
    '$attrs.element.data': {
      handler(newData) {
        if (newData && Object.keys(newData).length > 0) {
          // Não re-inicializar se já tem dados válidos
          if (!newData.dateType) {
            this.initializeData();
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async carregarDados() {
      try {
        const [resStages, resPipes, resUsers] = await Promise.all([
          ListarStages(),
          ListarPipelines(),
          ListarUsuarios()
        ]);

        this.stages = resStages.data.data || [];
        this.pipelines = resPipes.data.data || [];
        this.responsaveis = (resUsers.data.users || [])
          .filter(user => user.profile !== 'superadmin')
          .map(user => ({
            label: user.name,
            value: user.id
          }));

        // Preparar opções de estágios com pipeline
        this.stagesOptions = this.stages.map(stage => {
          const pipeline = this.pipelines.find(p => p.id === stage.pipelineId);
          return {
            label: (pipeline ? pipeline.name + ' > ' : '') + stage.name,
            value: stage.id,
            pipelineId: stage.pipelineId
          };
        });

        this.responsaveisOptions = this.responsaveis;
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
    onStageChange(stageId) {
      const stage = this.stages.find(s => s.id === stageId);
      if (stage) {
        // Atualizar o pipelineId automaticamente
        this.$attrs.element.data.pipelineId = stage.pipelineId;
      }
    },
    initializeData() {
      // Garantir que $attrs.element.data existe
      if (!this.$attrs.element.data) {
        this.$attrs.element.data = {};
      }
      
      // Inicializar dados padrão se não existirem
      if (this.$attrs.element.data.name === undefined) {
        this.$attrs.element.data.name = '';
      }
      if (this.$attrs.element.data.stageId === undefined) {
        this.$attrs.element.data.stageId = '';
      }
      if (this.$attrs.element.data.responsibleId === undefined) {
        this.$attrs.element.data.responsibleId = '';
      }
      if (this.$attrs.element.data.value === undefined) {
        this.$attrs.element.data.value = 0;
      }
      if (this.$attrs.element.data.dateType === undefined) {
        this.$attrs.element.data.dateType = 'today';
      }
      if (this.$attrs.element.data.daysFromInteraction === undefined) {
        this.$attrs.element.data.daysFromInteraction = 0;
      }
      if (this.$attrs.element.data.closingForecast === undefined) {
        this.$attrs.element.data.closingForecast = '';
      }
      if (this.$attrs.element.data.opportunityStatus === undefined) {
        this.$attrs.element.data.opportunityStatus = 'open';
      }
      if (this.$attrs.element.data.opportunityDescription === undefined) {
        this.$attrs.element.data.opportunityDescription = '';
      }
      if (this.$attrs.element.data.pipelineId === undefined) {
        this.$attrs.element.data.pipelineId = '';
      }
      
      // Log para debug
      console.log('OpportunityField - Dados inicializados:', this.$attrs.element.data);
    },
    
    onDateTypeChange(value) {
      if (value === 'days_from_interaction') {
        this.$attrs.element.data.daysFromInteraction = 0;
      } else if (value === 'today' || value === 'tomorrow') {
        // Limpar data customizada se não for mais necessária
        this.$attrs.element.data.closingForecast = '';
      }
    }
  },
  mounted() {
    this.carregarDados();
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
