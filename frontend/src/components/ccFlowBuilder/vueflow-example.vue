<template>
  <div class="vueflow-container">
    <q-toolbar class="text-grey-8">
      <q-toolbar-title>
        <div class="text-h6">{{ flowData.name }}</div>
      </q-toolbar-title>
      <q-btn
        round
        flat
        color="positive"
        icon="mdi-content-save-outline"
        @click="saveFlow"
      />
    </q-toolbar>
    <q-separator />

    <div style="display: flex; height: calc(100vh - 100px);">
      <!-- Área do Flow Builder -->
      <div style="flex: 1; position: relative;">
        <VueFlow
          v-model="vueFlowData"
          :nodes="vueFlowData.nodes"
          :edges="vueFlowData.edges"
          @nodes-change="onNodesChange"
          @edges-change="onEdgesChange"
          @connect="onConnect"
          @node-drag="onNodeDrag"
          @node-drag-stop="onNodeDragStop"
          class="vueflow-wrapper"
        >
          <!-- Custom Node Types -->
          <template #node-start="{ data }">
            <StartNode :data="data" />
          </template>
          
          <template #node-configurations="{ data }">
            <ConfigurationsNode :data="data" />
          </template>

          <template #node-default="{ data }">
            <DefaultNode 
              :data="data" 
              @click="selectNode(data.originalData)"
            />
          </template>

          <!-- Controls -->
          <Controls />
          <MiniMap />
          <Background />
        </VueFlow>
      </div>

      <!-- Painel de Configuração (mantém o mesmo formato) -->
      <div style="width: 650px; border-left: 1px solid #dce3e8;">
        <flow-node-form
          ref="nodeForm"
          v-if="selectedNode"
          :node="selectedNode"
          :filas="filas"
          :usuarios="usuarios"
          :nodesList="flowData"
          @addNode="addNode"
          @deleteLine="deleteLine"
          @addNewLineCondition="addNewLineCondition"
          @saveFlow="saveFlow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { VueFlow, useVueFlow, Controls, MiniMap, Background } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// Importar o adaptador
import {
  convertToVueFlow,
  convertFromVueFlow,
  updateNodePosition,
  addConnection,
  removeConnection
} from './vueflow-adapter.js'

// Importar componentes existentes
import FlowNodeForm from './node_form.vue'
import StartNode from './nodes/StartNode.vue'
import ConfigurationsNode from './nodes/ConfigurationsNode.vue'
import DefaultNode from './nodes/DefaultNode.vue'

import { UpdateChatFlow } from '../../service/chatFlow.js'

export default {
  name: 'VueFlowBuilder',
  components: {
    VueFlow,
    Controls,
    MiniMap,
    Background,
    FlowNodeForm,
    StartNode,
    ConfigurationsNode,
    DefaultNode
  },
  props: {
    flowData: {
      type: Object,
      required: true
    },
    filas: {
      type: Array,
      default: () => []
    },
    usuarios: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const { onNodesChange, onEdgesChange, addEdges, removeEdges } = useVueFlow()
    
    // Estado reativo
    const vueFlowData = ref({ nodes: [], edges: [] })
    const selectedNode = ref(null)
    const nodeForm = ref(null)

    // Converter dados iniciais para Vue Flow
    onMounted(() => {
      if (props.flowData) {
        vueFlowData.value = convertToVueFlow(props.flowData)
      }
    })

    // Observar mudanças no flowData externo
    watch(() => props.flowData, (newData) => {
      if (newData) {
        vueFlowData.value = convertToVueFlow(newData)
      }
    }, { deep: true })

    // Quando os nós mudam (arrastar, selecionar, etc)
    const handleNodesChange = (changes) => {
      onNodesChange(changes)
      
      // Atualizar posições no flowData original
      changes.forEach(change => {
        if (change.type === 'position' && change.dragging === false) {
          updateNodePosition(props.flowData, change.id, change.position)
        }
      })
    }

    // Quando as arestas mudam
    const handleEdgesChange = (changes) => {
      onEdgesChange(changes)
      
      // Atualizar lineList no flowData original
      changes.forEach(change => {
        if (change.type === 'remove') {
          const edge = change.item
          removeConnection(props.flowData, edge.source, edge.target)
        }
      })
    }

    // Quando uma nova conexão é criada
    const onConnect = (connection) => {
      addConnection(
        props.flowData,
        connection.source,
        connection.target,
        connection.label || ''
      )
      
      // Atualizar vueFlowData
      vueFlowData.value.edges.push({
        id: `edge-${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        label: connection.label || '',
        type: 'smoothstep'
      })
    }

    // Quando um nó é arrastado
    const onNodeDrag = (event, node) => {
      // Atualizar posição em tempo real (opcional)
      updateNodePosition(props.flowData, node.id, node.position)
    }

    // Quando o arrasto do nó termina
    const onNodeDragStop = (event, node) => {
      updateNodePosition(props.flowData, node.id, node.position)
    }

    // Selecionar um nó
    const selectNode = (nodeData) => {
      selectedNode.value = nodeData
    }

    // Adicionar novo nó
    const addNode = (nodeType = 'node') => {
      const newNodeId = `node-${Date.now()}`
      const newNode = {
        id: newNodeId,
        name: 'Novo Passo',
        type: nodeType,
        left: '200px',
        top: '200px',
        interactions: [],
        conditions: [],
        actions: []
      }

      // Adicionar ao flowData original
      if (!props.flowData.nodeList) {
        props.flowData.nodeList = []
      }
      props.flowData.nodeList.push(newNode)

      // Adicionar ao Vue Flow
      const vueFlowNode = convertToVueFlow({ nodeList: [newNode], lineList: [] })
      vueFlowData.value.nodes.push(...vueFlowNode.nodes)
    }

    // Deletar linha
    const deleteLine = (from, to) => {
      removeConnection(props.flowData, from, to)
      
      // Remover do Vue Flow
      vueFlowData.value.edges = vueFlowData.value.edges.filter(
        edge => !(edge.source === from && edge.target === to)
      )
    }

    // Adicionar nova linha condicional
    const addNewLineCondition = (from, to, oldTo) => {
      if (oldTo) {
        removeConnection(props.flowData, from, oldTo)
        vueFlowData.value.edges = vueFlowData.value.edges.filter(
          edge => !(edge.source === from && edge.target === oldTo)
        )
      }
      
      addConnection(props.flowData, from, to)
      
      vueFlowData.value.edges.push({
        id: `edge-${from}-${to}`,
        source: from,
        target: to,
        type: 'smoothstep'
      })
    }

    // Salvar fluxo
    const saveFlow = async () => {
      // Garantir que os dados estão sincronizados
      const finalData = convertFromVueFlow(vueFlowData.value, props.flowData.name)
      
      // Mesclar com dados existentes (preservar configurações)
      const dataToSave = {
        ...props.flowData,
        nodeList: finalData.nodeList,
        lineList: finalData.lineList
      }

      try {
        await UpdateChatFlow({
          ...dataToSave,
          flow: dataToSave
        })
        
        emit('flow-saved')
        // this.$notificarSucesso('Fluxo salvo!')
      } catch (error) {
        console.error('Erro ao salvar fluxo:', error)
        // this.$notificarErro(error)
      }
    }

    return {
      vueFlowData,
      selectedNode,
      nodeForm,
      onNodesChange: handleNodesChange,
      onEdgesChange: handleEdgesChange,
      onConnect,
      onNodeDrag,
      onNodeDragStop,
      selectNode,
      addNode,
      deleteLine,
      addNewLineCondition,
      saveFlow
    }
  }
}
</script>

<style scoped>
.vueflow-container {
  width: 100%;
  height: 100%;
}

.vueflow-wrapper {
  width: 100%;
  height: 100%;
}
</style>

