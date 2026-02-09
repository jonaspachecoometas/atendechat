# Migração para Vue Flow - Resumo Rápido

## ✅ Sim, é possível migrar mantendo a estrutura JSON!

O adaptador criado (`vueflow-adapter.js`) permite usar Vue Flow mantendo **100% de compatibilidade** com a estrutura JSON atual do banco de dados.

## Estrutura JSON Mantida

```json
{
  "name": "Fluxo Inicial",
  "nodeList": [...],  // ← Mantido
  "lineList": [...]   // ← Mantido
}
```

## Como Funciona

### 1. Ao Carregar do Banco
```javascript
// Dados vêm do banco no formato atual
const flowData = { name: "...", nodeList: [...], lineList: [...] }

// Converte para Vue Flow
const vueFlowData = convertToVueFlow(flowData)
// Resultado: { nodes: [...], edges: [...] }
```

### 2. Ao Salvar no Banco
```javascript
// Dados do Vue Flow
const vueFlowData = { nodes: [...], edges: [...] }

// Converte de volta para formato atual
const dataToSave = convertFromVueFlow(vueFlowData, flowName)
// Resultado: { name: "...", nodeList: [...], lineList: [...] }

// Salva normalmente no banco (mesma estrutura de antes)
await UpdateChatFlow({ ...dataToSave, flow: dataToSave })
```

## Instalação

```bash
npm install @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

## Exemplo Mínimo

```vue
<template>
  <VueFlow
    v-model="vueFlowData"
    @connect="onConnect"
    @nodes-change="onNodesChange"
  >
    <Controls />
  </VueFlow>
</template>

<script>
import { VueFlow, Controls } from '@vue-flow/core'
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'

export default {
  components: { VueFlow, Controls },
  props: {
    flowData: Object // Formato atual: { name, nodeList, lineList }
  },
  setup(props) {
    const vueFlowData = ref(convertToVueFlow(props.flowData))
    
    const saveFlow = () => {
      const dataToSave = convertFromVueFlow(vueFlowData.value, props.flowData.name)
      // Salvar dataToSave - mesma estrutura de antes!
    }
    
    return { vueFlowData, saveFlow }
  }
}
</script>
```

## Vantagens

✅ **Compatibilidade Total**: Mesma estrutura JSON no banco  
✅ **Performance**: Mais rápido e eficiente  
✅ **Recursos**: Zoom, minimap, controles nativos  
✅ **Manutenção**: Biblioteca moderna e ativa  
✅ **TypeScript**: Suporte completo  

## Próximos Passos

1. Instalar Vue Flow
2. Usar o adaptador nos componentes existentes
3. Substituir jsPlumb gradualmente
4. Manter `node_form.vue` como está (funciona igual!)

