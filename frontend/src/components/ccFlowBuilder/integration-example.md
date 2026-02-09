# Exemplo de Integração - Substituindo jsPlumb por Vue Flow

## Cenário: Substituir apenas a visualização, manter tudo igual

Você pode substituir apenas a parte visual (jsPlumb) mantendo toda a lógica existente.

## Passo 1: Modificar panel.vue

No arquivo `panel.vue`, substitua a seção do jsPlumb:

### ANTES (jsPlumb):
```vue
<div id="efContainer" ref="efContainer" class="container" v-flowDrag>
  <template v-for="node in (data.nodeList || [])" :key="node.id">
    <flow-node :id="node.id" :node="node" ... />
  </template>
</div>
```

### DEPOIS (Vue Flow):
```vue
<VueFlow
  v-model="vueFlowData"
  @nodes-change="onNodesChange"
  @edges-change="onEdgesChange"
  @connect="onConnect"
  class="vueflow-container"
>
  <Controls />
  <MiniMap />
</VueFlow>
```

## Passo 2: Adicionar no script

```javascript
import { VueFlow, Controls, MiniMap } from '@vue-flow/core'
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'

export default {
  components: {
    VueFlow,
    Controls,
    MiniMap,
    // ... outros componentes existentes
  },
  data() {
    return {
      vueFlowData: { nodes: [], edges: [] },
      // ... outros dados existentes
    }
  },
  watch: {
    data: {
      handler(newData) {
        if (newData) {
          this.vueFlowData = convertToVueFlow(newData)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // Substituir jsPlumbInit por:
    initVueFlow() {
      if (this.data) {
        this.vueFlowData = convertToVueFlow(this.data)
      }
    },
    
    // Manter saveFlow igual, mas converter antes de salvar:
    saveFlow() {
      const dataToSave = convertFromVueFlow(this.vueFlowData, this.data.name)
      const finalData = {
        ...this.cDataFlow.flow,
        flow: {
          ...this.data,
          nodeList: dataToSave.nodeList,
          lineList: dataToSave.lineList
        }
      }
      
      UpdateChatFlow(finalData)
        .then(res => {
          this.$notificarSucesso('Fluxo salvo!')
        })
        .catch(error => {
          console.error(error)
          this.$notificarErro(error)
        })
    },
    
    // Manter addNode igual, mas atualizar vueFlowData também:
    addNode(nodeType) {
      // ... código existente de addNode ...
      
      // Depois de adicionar ao data.nodeList:
      this.vueFlowData = convertToVueFlow(this.data)
    },
    
    // Event handlers do Vue Flow:
    onNodesChange(changes) {
      // Atualizar posições no data original
      changes.forEach(change => {
        if (change.type === 'position' && !change.dragging) {
          const node = this.data.nodeList.find(n => n.id === change.id)
          if (node) {
            node.left = `${change.position.x}px`
            node.top = `${change.position.y}px`
          }
        }
      })
    },
    
    onEdgesChange(changes) {
      // Atualizar lineList quando edges mudam
      changes.forEach(change => {
        if (change.type === 'remove') {
          const edge = change.item
          this.deleteLine(edge.source, edge.target)
        }
      })
    },
    
    onConnect(connection) {
      // Adicionar nova conexão
      this.addNewLineCondition(connection.source, connection.target)
    }
  },
  mounted() {
    this.initVueFlow()
  }
}
```

## Passo 3: Manter node_form.vue igual

O componente `node_form.vue` **não precisa mudar nada**! Ele trabalha com `data.nodeList` e `data.lineList`, que continuam existindo.

## Passo 4: Remover código jsPlumb

Remover:
- `jsPlumbInit()`
- `loadEasyFlow()`
- `jsPlumpConsist()`
- Referências ao `jsPlumb` no template
- Import do jsplumb.js

## Vantagens desta Abordagem

✅ **Mínimas mudanças**: Apenas substituir a visualização  
✅ **Lógica preservada**: Todos os métodos existentes continuam funcionando  
✅ **Formulário intacto**: `node_form.vue` não precisa mudar  
✅ **Compatibilidade**: Mesma estrutura JSON no banco  

## Migração Gradual

Você pode fazer a migração em etapas:

1. **Etapa 1**: Criar componente paralelo com Vue Flow
2. **Etapa 2**: Testar com alguns fluxos
3. **Etapa 3**: Substituir completamente quando estiver confiante

## Exemplo Completo Simplificado

```vue
<template>
  <div>
    <!-- Substituir apenas esta parte -->
    <VueFlow
      v-model="vueFlowData"
      @nodes-change="onNodesChange"
      @edges-change="onEdgesChange"
      @connect="onConnect"
    >
      <Controls />
    </VueFlow>
    
    <!-- Manter tudo igual -->
    <flow-node-form
      ref="nodeForm"
      :node="selectedNode"
      :nodesList="data"
      @saveFlow="saveFlow"
    />
  </div>
</template>

<script>
import { VueFlow, Controls } from '@vue-flow/core'
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'
// ... outros imports existentes

export default {
  components: {
    VueFlow,
    Controls,
    // ... outros componentes
  },
  data() {
    return {
      vueFlowData: { nodes: [], edges: [] },
      data: {}, // Formato atual
      // ... resto igual
    }
  },
  watch: {
    data: {
      handler(newData) {
        this.vueFlowData = convertToVueFlow(newData)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    saveFlow() {
      const converted = convertFromVueFlow(this.vueFlowData, this.data.name)
      const finalData = { ...this.data, ...converted }
      UpdateChatFlow({ ...this.cDataFlow.flow, flow: finalData })
    },
    // ... outros métodos mantidos iguais
  }
}
</script>
```

