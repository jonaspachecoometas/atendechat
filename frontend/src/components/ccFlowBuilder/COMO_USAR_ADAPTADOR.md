# Como Usar o Adaptador no panel.vue

## Exemplo 1: Uso Básico - Converter ao Carregar e Salvar

### 1. Importar o adaptador no início do script:

```javascript
// No início do <script>, junto com os outros imports
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'
```

### 2. Usar ao carregar dados (no método `dataReload`):

```javascript
dataReload (data) {
  this.easyFlowVisible = false
  this.data = {
    nodeList: [],
    lineList: [],
    ...data
  }
  this.$nextTick(() => {
    data = cloneDeep(data)
    this.easyFlowVisible = true
    this.data = data
    
    // ✅ NOVO: Converter para Vue Flow (se quiser usar Vue Flow depois)
    // const vueFlowData = convertToVueFlow(this.data)
    // this.vueFlowData = vueFlowData // se tiver uma propriedade vueFlowData
    
    this.$nextTick(() => {
      if (this.jsPlumb) {
        this.jsPlumb.deleteEveryConnection()
        this.jsPlumb.deleteEveryEndpoint()
      }
      this.jsPlumbInit()
    })
  })
}
```

### 3. Usar ao salvar (no método `saveFlow`):

```javascript
saveFlow () {
  // ✅ Opção 1: Salvar normalmente (mantém formato atual)
  const data = {
    ...this.cDataFlow.flow,
    flow: this.data
  }
  
  // ✅ Opção 2: Garantir formato correto antes de salvar
  // const convertedData = convertFromVueFlow(
  //   convertToVueFlow(this.data), 
  //   this.data.name
  // )
  // const data = {
  //   ...this.cDataFlow.flow,
  //   flow: convertedData
  // }
  
  UpdateChatFlow(data)
    .then(res => {
      this.$notificarSucesso('Fluxo salvo!')
    })
    .catch(error => {
      console.error(error)
      this.$notificarErro(error)
    })
}
```

## Exemplo 2: Validar Formato ao Salvar

```javascript
saveFlow () {
  // Converter e validar formato antes de salvar
  try {
    // Converte para Vue Flow e volta para garantir formato consistente
    const vueFlowData = convertToVueFlow(this.data)
    const validatedData = convertFromVueFlow(vueFlowData, this.data.name)
    
    const data = {
      ...this.cDataFlow.flow,
      flow: validatedData
    }
    
    UpdateChatFlow(data)
      .then(res => {
        // Atualizar this.data com os dados validados
        this.data = validatedData
        this.$notificarSucesso('Fluxo salvo!')
      })
      .catch(error => {
        console.error(error)
        this.$notificarErro(error)
      })
  } catch (error) {
    console.error('Erro ao validar formato:', error)
    this.$notificarErro('Erro ao validar formato do fluxo')
  }
}
```

## Exemplo 3: Usar para Debug/Validação

```javascript
// Adicionar método para validar estrutura
validateFlowStructure() {
  try {
    const vueFlowData = convertToVueFlow(this.data)
    const convertedBack = convertFromVueFlow(vueFlowData, this.data.name)
    
    // Comparar estruturas
    const nodesMatch = JSON.stringify(this.data.nodeList) === 
                       JSON.stringify(convertedBack.nodeList)
    const linesMatch = JSON.stringify(this.data.lineList) === 
                      JSON.stringify(convertedBack.lineList)
    
    if (!nodesMatch || !linesMatch) {
      console.warn('Estrutura pode ter inconsistências')
      return false
    }
    
    return true
  } catch (error) {
    console.error('Erro na validação:', error)
    return false
  }
}

// Usar antes de salvar
saveFlow () {
  if (!this.validateFlowStructure()) {
    this.$q.notify({
      type: 'warning',
      message: 'Estrutura do fluxo pode ter problemas. Verifique o console.'
    })
  }
  
  // ... resto do código de saveFlow
}
```

## Exemplo 4: Preparar para Migração Gradual

Adicione uma propriedade para armazenar dados do Vue Flow (mesmo sem usar ainda):

```javascript
data () {
  return {
    // ... propriedades existentes
    data: {},
    vueFlowData: { nodes: [], edges: [] }, // ✅ NOVO: Preparar para Vue Flow
    useVueFlow: false // ✅ Flag para alternar entre jsPlumb e Vue Flow
  }
},

watch: {
  // ✅ Sincronizar automaticamente quando data mudar
  data: {
    handler(newData) {
      if (newData && Object.keys(newData).length > 0) {
        this.vueFlowData = convertToVueFlow(newData)
      }
    },
    deep: true,
    immediate: false // Não executar no mount inicial
  }
}
```

## Exemplo 5: Usar em Métodos Específicos

### Ao adicionar nó:

```javascript
addNode (evt, nodeMenu, mousePosition) {
  // ... código existente para criar o nó ...
  
  if (!this.data.nodeList) this.data.nodeList = []
  this.data.nodeList.push(node)
  
  // ✅ NOVO: Atualizar vueFlowData também (se estiver usando)
  // this.vueFlowData = convertToVueFlow(this.data)
  
  this.$nextTick(function () {
    // ... resto do código existente
  })
}
```

### Ao deletar linha:

```javascript
deleteLine (from, to) {
  // ... código existente ...
  
  // Remove da lista de linhas
  if (this.data.lineList) {
    this.data.lineList = this.data.lineList.filter(function (line) {
      if (line.from == from && line.to == to) {
        return false
      }
      return true
    })
  }
  
  // ✅ NOVO: Atualizar vueFlowData também (se estiver usando)
  // this.vueFlowData = convertToVueFlow(this.data)
  
  // ... resto do código existente
}
```

## Exemplo 6: Migração Completa (Quando Estiver Pronto)

Quando quiser migrar completamente para Vue Flow, substitua o método `saveFlow`:

```javascript
saveFlow () {
  // Converter dados atuais para formato do banco
  const dataToSave = convertFromVueFlow(this.vueFlowData, this.data.name)
  
  // Mesclar com outras propriedades que possam existir
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
      // Atualizar this.data com os dados salvos
      this.data = finalData.flow
      this.$notificarSucesso('Fluxo salvo!')
    })
    .catch(error => {
      console.error(error)
      this.$notificarErro(error)
    })
}
```

## Resumo dos Casos de Uso

| Caso | Quando Usar | Código |
|------|-------------|--------|
| **Validação** | Verificar se estrutura está correta | `convertToVueFlow()` → `convertFromVueFlow()` |
| **Preparação** | Preparar para migração futura | Adicionar `vueFlowData` no data |
| **Debug** | Ver diferenças entre formatos | Comparar antes/depois da conversão |
| **Migração** | Substituir jsPlumb completamente | Usar Vue Flow + adaptador |

## Importante

✅ O adaptador **não quebra** nada que já existe  
✅ Você pode usar apenas para validação/debug  
✅ Pode preparar a migração gradualmente  
✅ Quando migrar, o formato do banco continua igual  

