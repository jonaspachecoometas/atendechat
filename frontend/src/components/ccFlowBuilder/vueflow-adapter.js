/**
 * Adaptador para converter entre o formato JSON atual (nodeList/lineList)
 * e o formato Vue Flow (nodes/edges)
 * 
 * Este adaptador permite migrar para Vue Flow mantendo compatibilidade
 * com a estrutura JSON existente no banco de dados
 */

/**
 * Converte o formato atual (nodeList/lineList) para Vue Flow (nodes/edges)
 * @param {Object} flowData - Dados no formato atual { name, nodeList, lineList }
 * @returns {Object} Dados no formato Vue Flow { nodes, edges }
 */
export function convertToVueFlow(flowData) {
  if (!flowData) return { nodes: [], edges: [] }

  // Converter nodeList para nodes do Vue Flow
  const nodes = (flowData.nodeList || []).map(node => ({
    id: node.id,
    type: getNodeType(node.type), // 'start', 'default', 'configurations', etc.
    position: {
      x: parseFloat(node.left) || 0,
      y: parseFloat(node.top) || 0
    },
    data: {
      label: node.name,
      // Incluir o ID no objeto data para que fique acessível no template
      id: node.id,
      // Preservar todas as propriedades originais
      originalData: {
        id: node.id, // Incluir ID também no originalData
        name: node.name,
        type: node.type,
        ico: node.ico,
        viewOnly: node.viewOnly,
        status: node.status,
        style: node.style,
        interactions: node.interactions || [],
        conditions: node.conditions || [],
        actions: node.actions || [],
        configurations: node.configurations || {},
        // Preservar propriedades de variável
        variableKey: node.variableKey || '',
        variableLabel: node.variableLabel || '',
        variableType: node.variableType || 'text',
        variableValidation: node.variableValidation || ''
      }
    },
    // Configurações específicas do Vue Flow
    draggable: !node.viewOnly,
    selectable: true,
    deletable: !['start', 'configurations'].includes(node.id)
  }))

  // Converter lineList para edges do Vue Flow
  const edges = (flowData.lineList || []).map((line, index) => ({
    id: `edge-${line.from}-${line.to}-${index}`,
    source: line.from,
    target: line.to,
    // label removido para não exibir labels nas linhas
    // label: line.label || '',
    type: 'smoothstep', // ou 'default', 'straight', 'step', 'bezier'
    animated: true, // Ativar animação nas edges
    style: line.paintStyle || { 
      stroke: '#94a3b8', 
      strokeWidth: 2,
      strokeDasharray: '5,5'
    },
    // Preservar propriedades originais
    data: {
      originalData: {
        from: line.from,
        to: line.to,
        label: line.label,
        connector: line.connector,
        anchors: line.anchors,
        paintStyle: line.paintStyle
      }
    }
  }))

  return {
    nodes,
    edges
  }
}

/**
 * Converte o formato Vue Flow (nodes/edges) para o formato atual (nodeList/lineList)
 * @param {Object} vueFlowData - Dados no formato Vue Flow { nodes, edges }
 * @param {String} flowName - Nome do fluxo
 * @returns {Object} Dados no formato atual { name, nodeList, lineList }
 */
export function convertFromVueFlow(vueFlowData, flowName = 'Fluxo') {
  if (!vueFlowData) {
    return {
      name: flowName,
      nodeList: [],
      lineList: []
    }
  }

  // Converter nodes do Vue Flow para nodeList
  const nodeList = (vueFlowData.nodes || []).map(node => {
    const originalData = node.data?.originalData || {}
    
    return {
      id: node.id,
      name: node.data?.label || originalData.name || node.id,
      type: originalData.type || getOriginalNodeType(node.type),
      left: `${node.position.x}px`,
      top: `${node.position.y}px`,
      ico: originalData.ico,
      viewOnly: originalData.viewOnly || false,
      status: originalData.status,
      style: originalData.style || {},
      interactions: originalData.interactions || [],
      conditions: originalData.conditions || [],
      actions: originalData.actions || [],
      configurations: originalData.configurations || {},
      // Preservar propriedades de variável
      variableKey: originalData.variableKey || '',
      variableLabel: originalData.variableLabel || '',
      variableType: originalData.variableType || 'text',
      variableValidation: originalData.variableValidation || ''
    }
  })

  // Converter edges do Vue Flow para lineList
  const lineList = (vueFlowData.edges || []).map(edge => {
    const originalData = edge.data?.originalData || {}
    
    return {
      from: edge.source,
      to: edge.target,
      label: edge.label || originalData.label || '',
      connector: originalData.connector,
      anchors: originalData.anchors,
      paintStyle: edge.style || originalData.paintStyle || { strokeWidth: 3, stroke: '#5c67f2' }
    }
  })

  return {
    name: flowName,
    nodeList,
    lineList
  }
}

/**
 * Mapeia o tipo de nó original para o tipo do Vue Flow
 * Usa 'default' para todos os tipos, já que temos um componente CustomNode que trata todos
 */
function getNodeType(originalType) {
  // Todos os tipos usam 'default' porque temos templates customizados para start e configurations
  // que também usam o mesmo componente CustomNode
  return 'default'
}

/**
 * Mapeia o tipo do Vue Flow para o tipo original
 */
function getOriginalNodeType(vueFlowType) {
  const typeMap = {
    'start': 'start',
    'configurations': 'configurations',
    'default': 'node',
    'exception': 'exception'
  }
  return typeMap[vueFlowType] || 'node'
}

/**
 * Atualiza a posição de um nó após ser arrastado no Vue Flow
 * @param {Object} flowData - Dados do fluxo atual
 * @param {String} nodeId - ID do nó
 * @param {Object} position - Nova posição { x, y }
 */
export function updateNodePosition(flowData, nodeId, position) {
  const node = flowData.nodeList?.find(n => n.id === nodeId)
  if (node) {
    node.left = `${position.x}px`
    node.top = `${position.y}px`
  }
  return flowData
}

/**
 * Adiciona uma nova conexão ao formato atual
 * @param {Object} flowData - Dados do fluxo atual
 * @param {String} sourceId - ID do nó origem
 * @param {String} targetId - ID do nó destino
 * @param {String} label - Label da conexão (opcional)
 */
export function addConnection(flowData, sourceId, targetId, label = '') {
  if (!flowData.lineList) {
    flowData.lineList = []
  }

  // Verifica se já existe a conexão
  const exists = flowData.lineList.some(
    line => line.from === sourceId && line.to === targetId
  )

  if (!exists) {
    flowData.lineList.push({
      from: sourceId,
      to: targetId,
      label: label,
      paintStyle: { strokeWidth: 3, stroke: '#5c67f2' }
    })
  }

  return flowData
}

/**
 * Remove uma conexão do formato atual
 * @param {Object} flowData - Dados do fluxo atual
 * @param {String} sourceId - ID do nó origem
 * @param {String} targetId - ID do nó destino
 */
export function removeConnection(flowData, sourceId, targetId) {
  if (flowData.lineList) {
    flowData.lineList = flowData.lineList.filter(
      line => !(line.from === sourceId && line.to === targetId)
    )
  }
  return flowData
}

