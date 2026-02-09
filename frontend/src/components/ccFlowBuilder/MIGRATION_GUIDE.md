# Guia de Migração: jsPlumb para Vue Flow

## Visão Geral

Este guia explica como migrar o flow builder atual (que usa jsPlumb) para Vue Flow, mantendo **100% de compatibilidade** com a estrutura JSON existente no banco de dados.

## Por que migrar?

- ✅ **Mais moderno**: Vue Flow é uma biblioteca Vue 3 nativa, mais performática
- ✅ **Melhor TypeScript**: Suporte completo a TypeScript
- ✅ **Mais recursos**: Zoom, minimap, controles nativos
- ✅ **Melhor UX**: Interface mais fluida e responsiva
- ✅ **Manutenção**: Biblioteca ativamente mantida
- ✅ **Compatibilidade**: Mantém a mesma estrutura JSON

## Estrutura JSON Atual

O formato atual salvo no banco:

```json
{
  "name": "Fluxo Inicial",
  "nodeList": [
    {
      "id": "start",
      "name": "Início",
      "type": "start",
      "left": "26px",
      "top": "100px",
      "ico": "mdi-play",
      "viewOnly": true,
      "interactions": [],
      "conditions": [],
      "actions": []
    }
  ],
  "lineList": [
    {
      "from": "start",
      "to": "nodeC",
      "label": "Valor",
      "paintStyle": { "strokeWidth": 3, "stroke": "#5c67f2" }
    }
  ]
}
```

**Esta estrutura será mantida!** O adaptador converte automaticamente entre os formatos.

## Passos para Migração

### 1. Instalar Vue Flow

```bash
npm install @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

### 2. Usar o Adaptador

O arquivo `vueflow-adapter.js` fornece funções para converter entre os formatos:

```javascript
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'

// Ao carregar dados do banco
const vueFlowData = convertToVueFlow(flowDataFromDatabase)

// Ao salvar no banco
const dataToSave = convertFromVueFlow(vueFlowData, flowName)
```

### 3. Substituir o Componente Principal

Substitua `panel.vue` pelo novo componente `vueflow-example.vue` (ou adapte o existente).

### 4. Criar Componentes de Nós Customizados

Crie componentes Vue para cada tipo de nó:

```vue
<!-- nodes/DefaultNode.vue -->
<template>
  <div class="custom-node" @click="$emit('click', data)">
    <q-icon :name="data.originalData.ico" />
    {{ data.label }}
  </div>
</template>
```

### 5. Manter o Formulário de Nó

O componente `node_form.vue` pode ser mantido **exatamente como está**, pois trabalha com a mesma estrutura de dados.

## Vantagens da Migração

### Performance
- Vue Flow usa Virtual DOM do Vue 3, mais eficiente
- Renderização otimizada de grandes fluxos
- Melhor gerenciamento de memória

### Recursos Adicionais
- **Zoom**: Controles nativos de zoom
- **Minimap**: Visualização geral do fluxo
- **Background**: Grid opcional
- **Seleção múltipla**: Selecionar vários nós
- **Undo/Redo**: Sistema de histórico nativo

### Desenvolvimento
- TypeScript completo
- Documentação excelente
- Comunidade ativa
- Exemplos prontos

## Compatibilidade com Dados Existentes

✅ **100% compatível**: Todos os fluxos existentes no banco continuarão funcionando

O adaptador:
- Converte `nodeList` → `nodes` (Vue Flow)
- Converte `lineList` → `edges` (Vue Flow)
- Preserva todas as propriedades customizadas em `data.originalData`
- Converte de volta ao salvar

## Exemplo de Uso

```vue
<template>
  <VueFlow
    v-model="vueFlowData"
    @nodes-change="onNodesChange"
    @edges-change="onEdgesChange"
    @connect="onConnect"
  >
    <Controls />
    <MiniMap />
  </VueFlow>
</template>

<script>
import { VueFlow } from '@vue-flow/core'
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'

export default {
  components: { VueFlow },
  props: {
    flowData: Object // Formato atual do banco
  },
  setup(props) {
    const vueFlowData = ref(convertToVueFlow(props.flowData))
    
    const saveFlow = () => {
      const dataToSave = convertFromVueFlow(vueFlowData.value, props.flowData.name)
      // Salvar dataToSave no banco (mesma estrutura de antes)
    }
    
    return { vueFlowData, saveFlow }
  }
}
</script>
```

## Migração Gradual

Você pode migrar gradualmente:

1. **Fase 1**: Instalar Vue Flow e criar o adaptador
2. **Fase 2**: Criar versão paralela do componente
3. **Fase 3**: Testar com alguns fluxos
4. **Fase 4**: Substituir completamente o jsPlumb

## Alternativas

Se Vue Flow não atender suas necessidades, outras opções:

- **React Flow** (se migrar para React)
- **XYFlow** (fork do React Flow)
- **Butterfly** (mais leve, menos recursos)
- **GoJS** (pago, muito completo)

## Suporte

O adaptador `vueflow-adapter.js` pode ser estendido para:
- Suportar novos tipos de nós
- Adicionar validações
- Implementar transformações customizadas
- Adicionar metadados extras

## Conclusão

A migração é **totalmente viável** e mantém compatibilidade completa com os dados existentes. O adaptador faz todo o trabalho de conversão automaticamente.

