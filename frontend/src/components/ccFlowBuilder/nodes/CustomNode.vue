<template>
  <div
    :class="nodeContainerClass"
    class="custom-node text-body1"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <div class="ef-node-content">
      <div class="ef-node-text" style="display: flex; align-items: center;">
        <q-icon
          v-if="iconName"
          size="18px"
          :name="iconName"
          :color="iconColor"
          style="margin-right: 8px; flex-shrink: 0;"
        />
        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ nodeData.label }}</span>
      </div>
    </div>
    <!-- Resumo de ações/interações -->
    <div v-if="hasContent" class="ef-node-summary">
      <div class="summary-item" v-if="interactionsCount > 0">
        <q-icon name="mdi-message-text" size="12px" />
        <span>{{ interactionsCount }}</span>
      </div>
      <div class="summary-item" v-if="actionsCount > 0">
        <q-icon name="mdi-play-circle" size="12px" />
        <span>{{ actionsCount }}</span>
      </div>
      <div class="summary-item" v-if="conditionsCount > 0">
        <q-icon name="mdi-code-braces" size="12px" />
        <span>{{ conditionsCount }}</span>
      </div>
    </div>
    <!-- Botão de editar (duplo clique também funciona) -->
    <q-btn
      v-if="!nodeData.originalData?.viewOnly"
      round
      dense
      flat
      icon="mdi-pencil"
      color="primary"
      size="12px"
      class="edit-btn"
      @click.stop="handleDoubleClick"
      :title="$t('common.edit') || 'Duplo clique para editar'"
    />
    <q-btn
      v-if="!nodeData.originalData?.viewOnly && !isProtectedNode"
      round
      dense
      flat
      icon="mdi-delete"
      color="negative"
      size="12px"
      class="delete-btn"
      @click.stop="handleDelete"
    />
    <div class="ef-node-right-ico">
      <i
        class="el-icon-circle-check el-node-state-success"
        v-show="nodeData.originalData?.status === 'success'"
      ></i>
      <i
        class="el-icon-circle-close el-node-state-error"
        v-show="nodeData.originalData?.status === 'error'"
      ></i>
      <i
        class="el-icon-warning-outline el-node-state-warning"
        v-show="nodeData.originalData?.status === 'warning'"
      ></i>
      <i
        class="el-icon-loading el-node-state-running"
        v-show="nodeData.originalData?.status === 'running'"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomNode',
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    nodeContainerClass() {
      return {
        'ef-node-container': true,
        'border-left-exception': this.nodeData.originalData?.type === 'exception',
        'ef-node-active': this.selected
      }
    },
    iconName() {
      // Tentar obter o ícone de várias fontes
      const ico = this.nodeData.originalData?.ico || 
                  this.nodeData.data?.originalData?.ico ||
                  this.nodeData.ico
      
      // Se não tem ícone, usar um padrão baseado no tipo
      if (!ico) {
        const type = this.nodeData.originalData?.type || this.nodeData.type
        if (type === 'start') return 'mdi-play'
        if (type === 'configurations') return 'mdi-cog'
        return 'mdi-robot-outline'
      }
      
      return ico
    },
    iconColor() {
      // Retornar cor padrão (cinza) para os ícones
      // Se o nó estiver selecionado, usar azul (indigo)
      return this.selected ? 'indigo-5' : 'grey-7'
    },
    originalData() {
      return this.nodeData.originalData || this.nodeData.data?.originalData || {}
    },
    interactionsCount() {
      const interactions = this.originalData.interactions || []
      return interactions.length
    },
    actionsCount() {
      const actions = this.originalData.actions || []
      return actions.length
    },
    conditionsCount() {
      const conditions = this.originalData.conditions || []
      return conditions.length
    },
    hasContent() {
      return this.interactionsCount > 0 || this.actionsCount > 0 || this.conditionsCount > 0
    },
    isProtectedNode() {
      // Verificar se é um nó protegido (não pode ser excluído)
      const type = this.originalData.type || this.nodeData.type
      const name = this.originalData.name || this.nodeData.label || ''
      const id = this.nodeData.id
      
      // Nós do tipo 'start' não podem ser excluídos
      if (type === 'start') return true
      
      // Nós com nome "Boas vindas" não podem ser excluídos
      if (name.toLowerCase().includes('boas vindas') || name.toLowerCase().includes('welcome')) {
        return true
      }
      
      // IDs específicos que não podem ser excluídos
      if (['start', 'configurations', 'nodeC'].includes(id)) {
        return true
      }
      
      return false
    }
  },
  methods: {
    handleClick() {
      // Clique simples apenas seleciona (não abre modal)
      // Tentar obter o ID de várias fontes possíveis
      const nodeId = this.nodeData.id || 
                     this.nodeData.originalData?.id || 
                     this.nodeData.data?.id ||
                     this.nodeData.data?.originalData?.id
      if (nodeId) {
        this.$emit('nodeClick', nodeId)
      } else {
        console.error('CustomNode.handleClick: Não foi possível obter o ID do nó', this.nodeData)
      }
    },
    handleDoubleClick() {
      // Duplo clique abre o modal de edição
      // Tentar obter o ID de várias fontes possíveis
      const nodeId = this.nodeData.id || 
                     this.nodeData.originalData?.id || 
                     this.nodeData.data?.id ||
                     this.nodeData.data?.originalData?.id
      if (!nodeId) {
        console.error('CustomNode.handleDoubleClick: Não foi possível obter o ID do nó', {
          nodeData: this.nodeData,
          keys: Object.keys(this.nodeData || {}),
          hasId: 'id' in (this.nodeData || {}),
          hasOriginalData: !!this.nodeData?.originalData,
          originalDataKeys: this.nodeData?.originalData ? Object.keys(this.nodeData.originalData) : []
        })
        return
      }
      this.$emit('nodeEdit', nodeId)
    },
    handleDelete() {
      // Passar tanto o ID do nodeData quanto o originalData completo
      this.$emit('nodeDelete', {
        id: this.nodeData.id,
        ...this.nodeData.originalData
      })
    }
  }
}
</script>

<style scoped>
.custom-node {
  min-height: 60px !important;
  min-width: 180px !important;
  max-width: 250px !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.ef-node-content {
  padding: 12px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-node:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08);
  border-color: #d0d0d0 !important;
}

.border-left-exception {
  border-left: 3px solid #ff4444 !important;
}

.ef-node-active {
  border-color: #6366f1 !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15), 0 2px 4px rgba(99, 102, 241, 0.1) !important;
  background: #ffffff !important;
  transform: none;
  z-index: 10;
}

.ef-node-text {
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  display: flex;
  align-items: center;
  line-height: 1.4;
}

/* Garantir que o ícone seja visível e tenha cor correta */
.custom-node .q-icon {
  color: #6b7280 !important;
  opacity: 1 !important;
  z-index: 2;
  display: block !important;
  margin-right: 8px;
}

.custom-node.ef-node-active .q-icon {
  color: #6366f1 !important;
}

.custom-node.ef-node-active .ef-node-text {
  color: #1f2937 !important;
}

/* Remover qualquer estilo que possa estar escondendo o ícone */
.custom-node .absolute-top-left.q-icon {
  visibility: visible !important;
  display: block !important;
  position: static !important;
  margin: 0 8px 0 0;
}

.ef-node-right-ico {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

/* Botões mais discretos - aparecem no hover */
.custom-node .q-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
  position: absolute;
  z-index: 10;
}

.custom-node:hover .q-btn {
  opacity: 1;
}

/* Posicionamento dos botões */
.custom-node .edit-btn {
  right: 8px;
  top: 8px;
}

.custom-node .delete-btn {
  right: 8px;
  top: 32px;
}

/* Área de resumo de ações/interações */
.ef-node-summary {
  border-top: 1px solid #f0f0f0;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fafafa;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  min-height: 28px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.summary-item .q-icon {
  color: #9ca3af !important;
  opacity: 0.8;
}

.ef-node-active .ef-node-summary {
  background: #f5f7fa;
  border-top-color: #e5e7eb;
}

/* ============================================
   ESTILOS PARA DARK MODE - CUSTOM NODE
   ============================================ */

body.body--dark .custom-node {
  background: #2d2d2d !important;
  border-color: #555555 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2) !important;
}

body.body--dark .custom-node:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3) !important;
  border-color: #666666 !important;
}

body.body--dark .ef-node-active {
  border-color: #8b9aff !important;
  box-shadow: 0 4px 12px rgba(139, 154, 255, 0.25), 0 2px 4px rgba(139, 154, 255, 0.15) !important;
  background: #2d2d2d !important;
}

body.body--dark .ef-node-text {
  color: #e5e5e5 !important;
}

body.body--dark .custom-node .q-icon {
  color: #b0b0b0 !important;
}

body.body--dark .custom-node.ef-node-active .q-icon {
  color: #8b9aff !important;
}

body.body--dark .custom-node.ef-node-active .ef-node-text {
  color: #ffffff !important;
}

body.body--dark .ef-node-summary {
  background: #252525 !important;
  border-top-color: #404040 !important;
}

body.body--dark .summary-item {
  color: #b0b0b0 !important;
}

body.body--dark .summary-item .q-icon {
  color: #888888 !important;
}

body.body--dark .ef-node-active .ef-node-summary {
  background: #2a2a2a !important;
  border-top-color: #4a4a4a !important;
}

body.body--dark .custom-node .q-btn {
  color: #ff6b6b !important;
}

body.body--dark .custom-node:hover .q-btn {
  background-color: rgba(255, 107, 107, 0.1) !important;
}
</style>

