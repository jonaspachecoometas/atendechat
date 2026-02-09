<template>
  <div v-if="easyFlowVisible"
    :class="{
      'fullscreen bg-white': isFullScreen,
      'flowHeightDefault': !isFullScreen
    }">
    <q-toolbar class="text-grey-8">
      <q-toolbar-title>
        <div class="text-h6">{{ data.name }}</div>
      </q-toolbar-title>
      <q-space />
      <!-- Botões de ação alinhados à direita -->
      <div class="row q-gutter-sm">
        <q-btn 
          class="bg-padrao"
          flat
          color="primary"
          icon="mdi-plus"
          size="12px"
          :label="$t('nodeForm.buttons.addStep')"
          @click="handleAddNewStep"
        />
        <q-btn 
          class="bg-padrao"
          flat
          color="positive"
          icon="mdi-content-save-outline"
          size="12px"
          :label="$t('common.save')"
          @click="saveFlow" 
        />
        <q-btn 
          class="bg-padrao"
          flat
          color="primary"
          icon="mdi-download"
          size="12px"
          :label="$t('common.download')"
          @click="downloadData"
        />
        <q-btn 
          class="bg-padrao"
          flat
          color="primary"
          size="12px"
          icon="mdi-auto-fix"
          :label="$t('common.autoLayout')"
          @click="autoLayout"
        />
        <q-btn 
          class="bg-padrao"
          flat
          color="primary"
          size="12px"
          :label="$t('common.fullscreen')"
          :icon="isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          @click="isFullScreen = !isFullScreen"
        />
      </div>
    </q-toolbar>
    <q-separator color="text-grey-3" />
    <div class="q-mt-sm"
      style="height: calc(100% - 10px);">
      <!-- Vue Flow Container - Ocupa toda a largura -->
      <div style="width: 100%; position: relative; height: 100%;">
        <VueFlow
          :nodes="vueFlowData.nodes"
          :edges="vueFlowData.edges"
          @nodes-change="onNodesChange"
          @edges-change="onEdgesChange"
          @connect="onConnect"
          @node-click="onNodeClick"
          class="vueflow-wrapper"
        >
          <!-- Custom Node Templates -->
          <template #node-default="{ data, selected, id }">
            <CustomNode
              :nodeData="{ ...data, id: id || data.id }"
              :selected="selected"
              @nodeClick="selectNode"
              @nodeEdit="editNode"
              @nodeDelete="deleteNode"
            />
          </template>
          <template #node-start="{ data, selected, id }">
            <CustomNode
              :nodeData="{ ...data, id: id || data.id }"
              :selected="selected"
              @nodeClick="selectNode"
              @nodeEdit="editNode"
              @nodeDelete="deleteNode"
            />
          </template>
          <template #node-configurations="{ data, selected, id }">
            <CustomNode
              :nodeData="{ ...data, id: id || data.id }"
              :selected="selected"
              @nodeClick="selectNode"
              @nodeEdit="editNode"
              @nodeDelete="deleteNode"
            />
          </template>
          
          <!-- Controls -->
          <Controls :show-interactive="false" />
          <MiniMap />
          <Background />
        </VueFlow>
      </div>
    </div>
    
    <!-- Modal de Configurações -->
    <q-dialog
      v-model="modalVisible"
      transition-show="slide-up"
      transition-hide="slide-down"
      @hide="onModalHide"
    >
      <q-card style="min-width: 600px; max-width: 800px; width: 90vw; max-height: 90vh; display: flex; flex-direction: column;">
        <q-card-section class="row items-center q-pb-none" style="flex-shrink: 0;">
          <div class="text-h6">{{ activeElement?.name || 'Configurações' }}</div>
          <q-space />
          <q-btn icon="mdi-close" flat round dense v-close-popup />
        </q-card-section>
        
        <q-card-section style="flex: 1; overflow-y: auto; padding: 0;">
          <flow-node-form 
            ref="nodeForm"
            hide-toolbar
            in-modal
            @setLineLabel="setLineLabel"
            @repaintEverything="repaintEverything"
            :filas="cDataFlow.filas"
            :usuarios="cDataFlow.usuarios"
            :nodesList="data"
            @addNode="addNode"
            @deleteLine="deleteLine"
            @addNewLineCondition="addNewLineCondition"
            @saveFlow="saveFlow"
            @downloadData="downloadData"
            @toggleFullScreen="isFullScreen = $event"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Visualização Resultado -->
    <flow-info v-if="flowInfoVisible"
      ref="flowInfo"
      :data="data"></flow-info>
    <flow-help v-if="flowHelpVisible"
      ref="flowHelp"></flow-help>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
// Vue Flow imports
import { VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { Background } from '@vue-flow/background'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
// Adaptador para Vue Flow
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'
// Componentes customizados
import CustomNode from './nodes/CustomNode.vue'
// Componentes existentes
import { easyFlowMixin } from './mixins.js'
import flowNode from './node.vue'
import nodeMenu from './node_menu.vue'
import FlowInfo from './info.vue'
import FlowHelp from './help.vue'
import FlowNodeForm from './node_form.vue'
import { merge, cloneDeep } from 'lodash'
import './index.css'
import { uid } from 'quasar'

import { UpdateChatFlow } from '../../service/chatFlow.js'

export default {
  data () {
    return {
      isFullScreen: false,
      // jsPlumb 实例 (mantido para compatibilidade, mas não usado mais)
      jsPlumb: null,
      // 控制画布销毁
      easyFlowVisible: true,
      // 控制流程数据显示与隐藏
      flowInfoVisible: false,
      // 是否加载完毕标志位
      loadEasyFlowFinish: false,
      flowHelpVisible: false,
      // Modal de configurações
      modalVisible: false,
      // ID do nó sendo editado (para inicializar o formulário quando o modal abrir)
      editingNodeId: null,
      // 数据 (formato original: nodeList/lineList)
      data: {},
      // Vue Flow data (formato Vue Flow: nodes/edges)
      vueFlowData: { nodes: [], edges: [] },
      // Elemento ativo para modificação
      activeElement: {
        // node, line
        type: undefined,
        nodeId: undefined,
        sourceId: undefined,
        targetId: undefined
      },
      zoom: 0.5
    }
  },
  props: {
    filas: {
      type: Array,
      default: () => []
    },
    usuarios: {
      type: Array,
      default: () => []
    }
  },
  // 一些基础配置移动该文件中
  mixins: [easyFlowMixin],
  components: {
    // Vue Flow components
    VueFlow,
    Controls,
    MiniMap,
    Background,
    CustomNode,
    // Componentes existentes
    // eslint-disable-next-line vue/no-unused-components
    draggable, flowNode, nodeMenu, FlowInfo, FlowNodeForm, FlowHelp
  },
  directives: {
    flowDrag: {
      bind (el, binding, vnode, oldNode) {
        if (!binding) {
          return
        }
        el.onmousedown = (e) => {
          if (e.button == 2) {
            // 右键不管
            return
          }
          //  鼠标按下，计算当前原始距离可视区的高度
          let disX = e.clientX
          let disY = e.clientY
          el.style.cursor = 'move'

          document.onmousemove = function (e) {
            // 移动时禁止默认事件
            e.preventDefault()
            const left = e.clientX - disX
            disX = e.clientX
            el.scrollLeft += -left

            const top = e.clientY - disY
            disY = e.clientY
            el.scrollTop += -top
          }

          document.onmouseup = function (e) {
            el.style.cursor = 'auto'
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  computed: {
    cDataFlow () {
      return this.$store.state.chatFlow
    }
  },
  watch: {
    // Watcher para inicializar o formulário quando o modal abrir
    modalVisible (newVal) {
      if (newVal && this.editingNodeId) {
        // Aguardar o modal estar completamente renderizado
        this.$nextTick(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.initializeNodeForm(this.editingNodeId)
            }, 150)
          })
        })
      } else if (!newVal) {
        // Limpar o nodeId quando o modal fechar
        this.editingNodeId = null
      }
    }
  },
  methods: {
    getUUID () {
      return uid()
    },
    // updateLineNodes (node) {
    //   this.jsPlumb.repaintEverything()
    // },
    addNewLineCondition (from, to, oldTo) {
      // Se to é null, não faz nada
      if (!to) {
        return
      }
      
      // Verificar se os nós existem antes de criar a conexão
      const sourceExists = this.data.nodeList?.some(n => n.id === from) || 
                          this.vueFlowData.nodes?.some(n => n.id === from)
      const targetExists = this.data.nodeList?.some(n => n.id === to) || 
                          this.vueFlowData.nodes?.some(n => n.id === to)
      
      if (!sourceExists || !targetExists) {
        console.warn('Tentativa de criar edge com nós inexistentes:', { from, to })
        return
      }
      
      if (!this.jsPlumpConsist({ sourceId: from, targetId: to })) {
        return
      }
      
      // Adiciona a linha à lineList
      if (!this.data.lineList) this.data.lineList = []
      
      // Remove apenas a linha específica que está sendo alterada (se oldTo foi fornecido)
      if (oldTo) {
        this.data.lineList = this.data.lineList.filter(line => 
          !(line.from === from && line.to === oldTo)
        )
        
        // Remove do Vue Flow também
        this.vueFlowData.edges = this.vueFlowData.edges.filter(edge =>
          !(edge.source === from && edge.target === oldTo)
        )
      }
      
      // Verifica se já existe uma linha com a mesma origem e destino
      const existingLine = this.data.lineList.find(line => 
        line.from === from && line.to === to
      )
      
      // Se não existe, adiciona a nova linha à lineList
      if (!existingLine) {
        this.data.lineList.push({ from: from, to: to, label: 'Valor' })
        
        // Adiciona ao Vue Flow apenas se os nós existirem
        if (sourceExists && targetExists) {
          const edgeId = `edge-${from}-${to}-${Date.now()}`
          this.vueFlowData.edges.push({
            id: edgeId,
            source: from,
            target: to,
            label: 'Valor',
            type: 'smoothstep',
            animated: true, // Ativar animação na nova edge
            style: { stroke: '#5c67f2', strokeWidth: 3, strokeDasharray: '5,5' }
          })
        }
      }
    },
    saveFlow () {
      // IMPORTANTE: Sincronizar TODAS as posições do vueFlowData para data.nodeList ANTES de salvar
      // Isso garante que as posições mais recentes sejam persistidas
      if (this.vueFlowData.nodes && this.data.nodeList) {
        this.vueFlowData.nodes.forEach(vueNode => {
          const dataNode = this.data.nodeList.find(n => n.id === vueNode.id)
          if (dataNode && vueNode.position) {
            dataNode.left = `${vueNode.position.x}px`
            dataNode.top = `${vueNode.position.y}px`
          }
        })
      }
      
      // Validar formato usando o adaptador antes de salvar
      try {
        const vueFlowData = convertToVueFlow(this.data)
        const validatedData = convertFromVueFlow(vueFlowData, this.data.name)
        // Usar dados validados (garante formato consistente)
        this.data = validatedData
      } catch (error) {
        console.warn('Aviso ao validar formato:', error)
        // Continua salvando mesmo se houver erro na validação
      }
      
      const data = {
        ...this.cDataFlow.flow,
        flow: this.data
      }
      UpdateChatFlow(data)
        .then(res => {
          this.$notificarSucesso('Fluxo salvo!')
        })
        .catch(error => {
          console.error(error)
          this.$notificarErro(error)
        })
    },
    jsPlumpConsist (evt) {
      const from = evt.sourceId
      const to = evt.targetId
      if (from === to) {
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          timeout: 2500,
          message: 'Não é possível conectar o elemento a si mesmo.',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        return false
      }
      /*
      if (this.hasLine(from, to)) {
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          timeout: 2500,
          message: 'Não é possível realizar loop entre os elementos.',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        return false
      }
      if (this.hashOppositeLine(from, to)) {
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          timeout: 2500,
          message: 'Não é possível realizar loop entre os elementos.',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        return false
      }
      */
      this.$notificarSucesso('Conexão realizada.')
      return true
    },
    jsPlumbInit () {
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        this.loadEasyFlow()
        // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
        // DESABILITADO: Clique nas linhas para evitar alteração do activeElement
        // this.jsPlumb.bind('click', (conn, originalEvent) => {
        //   this.activeElement.type = 'line'
        //   this.activeElement.sourceId = conn.sourceId
        //   this.activeElement.targetId = conn.targetId
        //   this.$refs.nodeForm.lineInit({
        //     from: conn.sourceId,
        //     to: conn.targetId,
        //     label: conn.getLabel()
        //   })
        // })
        // 连线
        this.jsPlumb.bind('connection', (evt) => {
          if (!this.jsPlumpConsist(evt)) {
            return
          }
          const from = evt.source.id
          const to = evt.target.id
          if (this.loadEasyFlowFinish) {
            if (!this.data.lineList) this.data.lineList = []
            this.data.lineList.push({ from: from, to: to, label: 'Valor' })
            // const label = 'Chave'
            const label = null
            // REMOVIDO: lineInit para evitar abrir a div de edição da linha automaticamente
            // if (this.$refs.nodeForm) {
            //   this.$refs.nodeForm.lineInit({
            //     from,
            //     to,
            //     label
            //   })
            // }
            this.setLineLabel(from, to, label)
          }
        })

        // 删除连线回调
        this.jsPlumb.bind('connectionDetached', (evt) => {
          this.deleteLine(evt.sourceId, evt.targetId)
        })

        // 改变线的连接节点
        this.jsPlumb.bind('connectionMoved', (evt) => {
          this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })

        // 连线右击
        this.jsPlumb.bind('contextmenu', (evt) => {
          console.log('contextmenu', evt)
        })

        // 连线
        this.jsPlumb.bind('beforeDrop', (evt) => {
          return this.jsPlumpConsist(evt)
        })

        // beforeDetach
        this.jsPlumb.bind('beforeDetach', (evt) => {
          console.log('beforeDetach', evt)
        })
        this.jsPlumb.setContainer(this.$refs.efContainer)
      })
    },
    loadEasyFlow () {
      // 初始化节点
      if (!this.data.nodeList) return
      for (var i = 0; i < this.data.nodeList.length; i++) {
        const node = this.data.nodeList[i]
        // DESABILITADO: Removido makeSource para impedir arrastar linhas das condições
        // this.jsPlumb.makeSource(node.id, merge(this.jsplumbSourceOptions, {}))
        // DESABILITADO: Removido makeTarget para impedir conectar às condições
        // this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        if (!node.viewOnly) {
          this.jsPlumb.draggable(node.id, {
            containment: 'parent',
            stop: function (el) {
              // 拖拽节点结束后的对调
              console.log('drag to the end: ', el)
            }
          })
        }
      }
      // 初始化连线
      const uniqueConnections = new Set();
      if (this.data.lineList) {
        for (let i = 0; i < this.data.lineList.length; i++) {
          const line = this.data.lineList[i];
          const connectionKey = `${line.from}-${line.to}`;

          if (!uniqueConnections.has(connectionKey)) {
              uniqueConnections.add(connectionKey);
              
              var connParam = {
                  source: line.from,
                  target: line.to,
                  label: line.label ? line.label : '',
                  connector: line.connector ? line.connector : '',
                  anchors: line.anchors ? line.anchors : undefined,
                  paintStyle: { strokeWidth: 3, stroke: '#636063' }
              };
              
              this.jsPlumb.connect(connParam, this.jsplumbConnectOptions);
          }
        }
      }
      // for (let i = 0; i < this.data.lineList.length; i++) {
      //   const line = this.data.lineList[i]
      //   var connParam = {
      //     source: line.from,
      //     target: line.to,
      //     label: line.label ? line.label : '',
      //     connector: line.connector ? line.connector : '',
      //     anchors: line.anchors ? line.anchors : undefined,
      //     // paintStyle: line.paintStyle ? line.paintStyle : undefined
      //     paintStyle: { strokeWidth: 3, stroke: '#636063' }
      //   }
      //   this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
      // }
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
        // Garante que conexões protegidas existam
        this.ensureProtectedConnections()
      })
    },
    setLineLabel (from, to, label) {
      var conn = this.jsPlumb.getConnections({
        source: from,
        target: to
      })[0]
      if (!label || label === '') {
        conn.removeClass('flowLabel')
        conn.addClass('emptyFlowLabel')
      } else {
        conn.addClass('flowLabel')
      }
      conn.setLabel({
        label: label
      })

      conn.setPaintStyle({ strokeWidth: 3, stroke: '#5c67f2' })

      if (this.data.lineList) {
        this.data.lineList.forEach(function (line) {
          if (line.from == from && line.to == to) {
            line.label = label
          }
        })
      }
    },
    deleteElement () {
      if(this.activeElement.id === 'nodeC') return
      if (this.activeElement.type === 'node') {
        this.deleteNode(this.activeElement)
      } else if (this.activeElement.type === 'line') {
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: 'Deseja realmente deletar a linha selecionada?',
          cancel: {
            label: this.$t('common.no'),
            color: 'primary',
            push: true
          },
          ok: {
            label: this.$t('common.yes'),
            color: 'negative',
            push: true
          },
          persistent: true
        }).onOk(async () => {
          var conn = this.jsPlumb.getConnections({
            source: this.activeElement.sourceId,
            target: this.activeElement.targetId
          })[0]
          this.jsPlumb.deleteConnection(conn)
        })
      }
    },
    deleteLine (from, to) {
      // Verifica se é uma conexão protegida
      const protectedConnections = this.getProtectedConnections()
      const isProtected = protectedConnections.some(protectedConn => 
        protectedConn.from === from && protectedConn.to === to
      )
      
      if (isProtected) {
        const fromNode = this.data.nodeList.find(n => n.id === from)
        const toNode = this.data.nodeList.find(n => n.id === to)
        this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          timeout: 2500,
          message: `Esta conexão entre "${fromNode?.name || 'Início'}" e "${toNode?.name || 'Configurações'}" é obrigatória e não pode ser removida.`,
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        return
      }
      
      // Remove da lista de linhas
      if (this.data.lineList) {
        this.data.lineList = this.data.lineList.filter(function (line) {
          if (line.from == from && line.to == to) {
            return false
          }
          return true
        })
      }
      
      // Remove do Vue Flow também
      if (this.vueFlowData.edges) {
        this.vueFlowData.edges = this.vueFlowData.edges.filter(edge =>
          !(edge.source === from && edge.target === to)
        )
      }
    },
    changeLine (oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo)
    },
    changeNodeSite (data) {
      if (!this.data.nodeList) return
      for (var i = 0; i < this.data.nodeList.length; i++) {
        const node = this.data.nodeList[i]
        if (node.id === data.id) {
          node.left = data.left
          node.top = data.top
        }
      }
    },
    addNode (evt, nodeMenu, mousePosition) {
      // Validar nodeMenu - se não foi fornecido, usar padrão
      if (!nodeMenu) {
        nodeMenu = {
          name: 'Nova etapa',
          type: 'node',
          ico: 'mdi-robot-outline',
          actions: [],
          conditions: [],
          interactions: []
        }
      }
      
      // Usar posição do mouse ou posição padrão
      var left = 200, top = 200
      if (evt && evt.originalEvent) {
        var screenX = evt.originalEvent.clientX, screenY = evt.originalEvent.clientY
        // Tentar obter posição relativa ao container Vue Flow
        const vueFlowContainer = document.querySelector('.vueflow-wrapper')
        if (vueFlowContainer) {
          const containerRect = vueFlowContainer.getBoundingClientRect()
          left = screenX - containerRect.x
          top = screenY - containerRect.y
        } else {
          left = screenX
          top = screenY
        }
        // Centralizar
        left -= 85
        top -= 16
      }
      var nodeId = this.getUUID()
      // Gerar nome dinâmico
      var origName = nodeMenu.name
      var nodeName = origName
      var index = 1
      while (index < 10000) {
        var repeat = false
        if (this.data.nodeList) {
          for (var i = 0; i < this.data.nodeList.length; i++) {
            const node = this.data.nodeList[i]
            if (node.name === nodeName) {
              nodeName = origName + index
              repeat = true
            }
          }
        }
        if (repeat) {
          index++
          continue
        }
        break
      }
      var node = {
        id: nodeId,
        name: nodeName,
        type: nodeMenu.type,
        left: left + 'px',
        top: top + 'px',
        ico: nodeMenu.ico,
        state: 'success',
        actions: nodeMenu?.actions,
        conditions: nodeMenu?.conditions,
        interactions: nodeMenu?.interactions
      }
      /**
               * 这里可以进行业务判断、是否能够添加该节点
               */
      if (!this.data.nodeList) this.data.nodeList = []
      this.data.nodeList.push(node)
      
      // Adicionar ao Vue Flow também
      const vueFlowNode = convertToVueFlow({ nodeList: [node], lineList: [] })
      if (vueFlowNode.nodes && vueFlowNode.nodes.length > 0) {
        this.vueFlowData.nodes.push(vueFlowNode.nodes[0])
      }
      
      this.$nextTick(function () {
        // Garante que conexões protegidas existam após adicionar nó
        this.ensureProtectedConnections()
      })
    },
    deleteNode (node) {
      // O CustomNode emite nodeData.originalData, que é o objeto do nó original
      // Mas também pode vir diretamente como objeto do data.nodeList
      // Precisamos encontrar o nó correto no data.nodeList pelo nome ou outras propriedades
      let nodeId = null
      let nodeName = 'elemento'
      
      // Tentar encontrar pelo ID se existir
      if (node.id) {
        nodeId = node.id
        nodeName = node.name || nodeId
      } else if (node.name && this.data.nodeList) {
        // Se não tem ID, buscar pelo nome no data.nodeList
        const foundNode = this.data.nodeList.find(n => n.name === node.name && n.type === node.type)
        if (foundNode) {
          nodeId = foundNode.id
          nodeName = foundNode.name
        }
      }
      
      // Se ainda não encontrou, tentar buscar no vueFlowData.nodes
      if (!nodeId && this.vueFlowData.nodes) {
        const vueFlowNode = this.vueFlowData.nodes.find(n => 
          n.data?.label === node.name || 
          n.data?.originalData?.name === node.name
        )
        if (vueFlowNode) {
          nodeId = vueFlowNode.id
          nodeName = vueFlowNode.data?.label || vueFlowNode.data?.originalData?.name || nodeId
        }
      }
      
      if (!nodeId) {
        console.error('Não foi possível identificar o ID do nó para deletar', node)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao identificar o elemento para deletar'
        })
        return
      }
      
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: `Deseja realmente deletar o elemento (${nodeName})?`,
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        
        // Remove todas as linhas conectadas a este nó (tanto como origem quanto destino)
        if (this.data.lineList) {
          this.data.lineList = this.data.lineList.filter(line => {
            return line.from !== nodeId && line.to !== nodeId
          })
        }
        
        // Remove do Vue Flow edges
        if (this.vueFlowData.edges) {
          this.vueFlowData.edges = this.vueFlowData.edges.filter(edge => {
            return edge.source !== nodeId && edge.target !== nodeId
          })
        }
        
        // Remove o nó da lista
        if (this.data.nodeList) {
          this.data.nodeList = this.data.nodeList.filter(n => n.id !== nodeId)
        }
        
        // Remove do Vue Flow nodes - criar novo array para garantir reatividade
        if (this.vueFlowData.nodes) {
          this.vueFlowData.nodes = this.vueFlowData.nodes.filter(n => n.id !== nodeId)
        }
        
        // Filtrar edges órfãs após deletar nó
        this.filterOrphanEdges()
        
        // Forçar atualização do Vue Flow
        this.$nextTick(() => {
          // Limpar seleção se o nó deletado estava selecionado
          if (this.activeElement?.id === nodeId) {
            this.activeElement = {
              type: undefined,
              nodeId: undefined,
              sourceId: undefined,
              targetId: undefined
            }
          }
          
          // Atualizar formulário se necessário
          if (this.$refs.nodeForm) {
            this.$refs.nodeForm.nodeInit(this.data, null)
          }
        })
      })

      return true
    },
    // Seleciona o nó sem abrir o modal (clique simples)
    selectNode (nodeId) {
      // Sincronizar TODAS as posições do vueFlowData para data.nodeList
      if (this.vueFlowData.nodes && this.data.nodeList) {
        this.vueFlowData.nodes.forEach(vueNode => {
          const dataNode = this.data.nodeList.find(n => n.id === vueNode.id)
          if (dataNode && vueNode.position) {
            dataNode.left = `${vueNode.position.x}px`
            dataNode.top = `${vueNode.position.y}px`
          }
        })
      }
      
      const node = this.data.nodeList?.find(n => n.id === nodeId)
      this.activeElement = node
      
      // Sincronizar posições do data.nodeList para vueFlowData do nó selecionado
      if (node && this.vueFlowData.nodes) {
        const vueFlowNode = this.vueFlowData.nodes.find(n => n.id === nodeId)
        if (vueFlowNode && node.left && node.top) {
          const x = parseFloat(node.left) || 0
          const y = parseFloat(node.top) || 0
          vueFlowNode.position = { x, y }
        }
      }
    },
    // Método auxiliar para inicializar o formulário
    initializeNodeForm (nodeId) {
      if (!nodeId) {
        console.error('initializeNodeForm: nodeId não fornecido')
        return
      }
      
      if (!this.$refs.nodeForm || typeof this.$refs.nodeForm.nodeInit !== 'function') {
        console.error('initializeNodeForm: nodeForm não encontrado ou nodeInit não disponível', { 
          nodeForm: this.$refs.nodeForm,
          hasNodeForm: !!this.$refs.nodeForm,
          hasNodeInit: this.$refs.nodeForm && typeof this.$refs.nodeForm.nodeInit === 'function'
        })
        return
      }
      
      // Garantir que this.data está atualizado e contém nodeList
      if (!this.data || !this.data.nodeList) {
        console.error('initializeNodeForm: data ou nodeList não disponível', { data: this.data })
        return
      }
      
      // Verificar se o nó existe antes de inicializar
      const foundNode = this.data.nodeList.find(n => n.id === nodeId)
      if (!foundNode) {
        console.error('initializeNodeForm: nó não encontrado', { 
          nodeId, 
          availableIds: this.data.nodeList.map(n => n.id) 
        })
        return
      }
      
      // Inicializar o formulário
      this.$refs.nodeForm.nodeInit(this.data, nodeId)
    },
    // Abre o modal de edição (duplo clique)
    editNode (nodeId) {
      // Validar nodeId
      if (!nodeId) {
        console.error('editNode: nodeId não fornecido')
        return
      }
      
      // PRIMEIRO: Sincronizar TODAS as posições do vueFlowData para data.nodeList
      // Isso garante que as posições mais recentes (do arrasto) sejam salvas
      if (this.vueFlowData.nodes && this.data.nodeList) {
        this.vueFlowData.nodes.forEach(vueNode => {
          const dataNode = this.data.nodeList.find(n => n.id === vueNode.id)
          if (dataNode && vueNode.position) {
            // Vue 3: atribuição direta funciona (reatividade automática)
            dataNode.left = `${vueNode.position.x}px`
            dataNode.top = `${vueNode.position.y}px`
          }
        })
      }
      
      // Encontrar o nó no data.nodeList
      const node = this.data.nodeList?.find(n => n.id === nodeId)
      
      if (!node) {
        console.error('editNode: nó não encontrado no data.nodeList', { nodeId, nodeList: this.data.nodeList })
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao encontrar o elemento para editar'
        })
        return
      }
      
      this.activeElement = node
      
      // DEPOIS: Sincronizar posições do data.nodeList para vueFlowData do nó clicado
      // Isso garante que se houver alguma atualização externa, seja refletida
      if (node && this.vueFlowData.nodes) {
        const vueFlowNode = this.vueFlowData.nodes.find(n => n.id === nodeId)
        if (vueFlowNode && node.left && node.top) {
          // Converter de '100px' para número
          const x = parseFloat(node.left) || 0
          const y = parseFloat(node.top) || 0
          vueFlowNode.position = { x, y }
        }
      }
      
      // Armazenar o nodeId para inicializar quando o modal abrir
      this.editingNodeId = nodeId
      
      // Abrir modal de configurações (o watcher vai inicializar o formulário)
      this.modalVisible = true
    },
    // Mantido para compatibilidade (pode ser usado em outros lugares)
    clickNode (nodeId) {
      // Por padrão, apenas seleciona (não abre modal)
      this.selectNode(nodeId)
    },
    onModalHide () {
      // Quando o modal fechar, pode limpar o activeElement se necessário
      // Por enquanto, mantemos o activeElement para referência
    },
    handleAddNewStep () {
      // Criar um nodeMenu padrão para nova etapa
      const defaultNodeMenu = {
        name: 'Nova etapa',
        type: 'node',
        ico: 'mdi-robot-outline',
        actions: [],
        conditions: [],
        interactions: []
      }
      // Chamar addNode com valores padrão (sem evento de mouse)
      this.addNode(null, defaultNodeMenu, null)
    },
    hasLine (from, to) {
      if (!this.data.lineList) return false
      for (var i = 0; i < this.data.lineList.length; i++) {
        var line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },
    // 是否含有相反的线
    hashOppositeLine (from, to) {
      return this.hasLine(to, from)
    },
    nodeRightMenu (nodeId, evt) {
      this.menu.show = true
      this.menu.curNodeId = nodeId
      this.menu.left = evt.x + 'px'
      this.menu.top = evt.y + 'px'
    },
    repaintEverything () {
      this.syncLinesWithConditions()
      // Atualizar Vue Flow após sincronização
      this.$nextTick(() => {
        // Forçar atualização do Vue Flow
        const updated = convertToVueFlow(this.data)
        this.vueFlowData.nodes = updated.nodes
        // Filtrar edges órfãs (que referenciam nós que não existem)
        const nodeIds = new Set(updated.nodes.map(n => n.id))
        this.vueFlowData.edges = updated.edges.filter(edge => 
          nodeIds.has(edge.source) && nodeIds.has(edge.target)
        )
      })
    },
    // Método para sincronizar linhas com as condições dos nós
    syncLinesWithConditions() {
      if (!this.data.nodeList || !this.data.lineList) return
      
      // Criar um Set com todos os IDs de nós existentes para validação rápida
      const existingNodeIds = new Set(this.data.nodeList.map(n => n.id))
      
      // Conexões protegidas que nunca devem ser removidas
      const protectedConnections = this.getProtectedConnections()
      
      // Coleta todas as linhas que deveriam existir baseadas nas condições
      // MAS apenas se os nós de origem e destino existirem
      const expectedLines = []
      
      this.data.nodeList.forEach(node => {
        if (node.conditions && Array.isArray(node.conditions)) {
          node.conditions.forEach(condition => {
            if (condition.nextStepId) {
              // Verificar se ambos os nós existem antes de adicionar
              const sourceExists = existingNodeIds.has(node.id)
              const targetExists = existingNodeIds.has(condition.nextStepId)
              
              if (sourceExists && targetExists) {
                expectedLines.push({
                  from: node.id,
                  to: condition.nextStepId,
                  label: 'Valor'
                })
              }
            }
          })
        }
      })
      
      // Adiciona conexões protegidas às linhas esperadas (apenas se os nós existirem)
      protectedConnections.forEach(protectedConn => {
        if (existingNodeIds.has(protectedConn.from) && existingNodeIds.has(protectedConn.to)) {
          expectedLines.push(protectedConn)
        }
      })
      
      // Remove linhas que não deveriam existir (exceto as protegidas)
      const linesToRemove = this.data.lineList.filter(line => {
        // Não remove conexões protegidas
        const isProtected = protectedConnections.some(protectedConn => 
          protectedConn.from === line.from && protectedConn.to === line.to
        )
        if (isProtected) {
          return false
        }
        
        // Remove apenas se não está nas linhas esperadas
        return !expectedLines.some(expected => 
          expected.from === line.from && expected.to === line.to
        )
      })
      
      // Remove as linhas desnecessárias
      linesToRemove.forEach(line => {
        this.deleteLine(line.from, line.to)
      })
      
      // Adiciona linhas que estão faltando (apenas se os nós existirem)
      const linesToAdd = expectedLines.filter(expected => {
        // Verificar se os nós ainda existem
        const sourceExists = existingNodeIds.has(expected.from)
        const targetExists = existingNodeIds.has(expected.to)
        
        if (!sourceExists || !targetExists) {
          return false
        }
        
        // Verificar se já não existe
        return !this.data.lineList.some(line => 
          line.from === expected.from && line.to === expected.to
        )
      })
      
      // Adiciona as linhas faltantes
      linesToAdd.forEach(line => {
        this.addNewLineCondition(line.from, line.to, null)
      })
    },
    
    // Método para garantir que conexões protegidas existam
    ensureProtectedConnections() {
      const protectedConnections = this.getProtectedConnections()
      
      protectedConnections.forEach(protectedConn => {
        // Verifica se a conexão já existe
        const exists = this.data.lineList && this.data.lineList.some(line => 
          line.from === protectedConn.from && line.to === protectedConn.to
        )
        
        if (!exists) {
          // Adiciona à lista de linhas
          if (!this.data.lineList) this.data.lineList = []
          this.data.lineList.push({
            from: protectedConn.from,
            to: protectedConn.to,
            label: protectedConn.label
          })
          
          // Cria a conexão visual
          const connParam = {
            source: protectedConn.from,
            target: protectedConn.to,
            paintStyle: { strokeWidth: 3, stroke: '#5c67f2' }
          }
          
          this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
        }
      })
    },
    
    // Método para obter conexões protegidas que nunca devem ser removidas
    getProtectedConnections() {
      const protectedConnections = []
      
      if (!this.data.nodeList) return protectedConnections
      
      // Encontra o nó de início (start)
      const startNode = this.data.nodeList.find(node => node.type === 'start')
      
      // Encontra o nó de boas-vindas - pode ser identificado por:
      // 1. Nome contendo "Boas vindas" ou "Welcome"
      // 2. ID específico como "nodeC" 
      // 3. Tipo específico se existir
      const welcomeNode = this.data.nodeList.find(node => 
        node.name?.toLowerCase().includes('boas vindas') ||
        node.name?.toLowerCase().includes('welcome') ||
        node.id === 'nodeC' ||
        node.type === 'welcome'
      )
      
      // Se ambos existem, protege a conexão entre eles
      if (startNode && welcomeNode) {
        protectedConnections.push({
          from: startNode.id,
          to: welcomeNode.id,
          label: 'Início',
          protected: true // Flag para identificar como protegida
        })
      }
      
      return protectedConnections
    },
    
    dataInfo () {
      this.flowInfoVisible = true
      this.$nextTick(function () {
        this.$refs.flowInfo.init()
      })
    },
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
        // Converter para Vue Flow - garantir que seja um objeto válido
        try {
          const converted = convertToVueFlow(this.data)
          this.vueFlowData = {
            nodes: Array.isArray(converted.nodes) ? converted.nodes : [],
            edges: Array.isArray(converted.edges) ? converted.edges : []
          }
          // Filtrar edges órfãs após carregar
          this.$nextTick(() => {
            this.filterOrphanEdges()
          })
        } catch (error) {
          console.error('Erro ao converter para Vue Flow:', error)
          this.vueFlowData = { nodes: [], edges: [] }
        }
        this.loadEasyFlowFinish = true
      })
    },
    // Métodos Vue Flow
    onNodesChange (changes) {
      // Atualizar posições quando nós são arrastados
      changes.forEach(change => {
        if (change.type === 'position') {
          // Atualizar posição no vueFlowData imediatamente (durante o arrasto)
          const vueFlowNode = this.vueFlowData.nodes?.find(n => n.id === change.id)
          if (vueFlowNode && change.position) {
            vueFlowNode.position = change.position
          }
          
          // Quando o arrasto termina, salvar no data.nodeList
          if (change.dragging === false) {
            const node = this.data.nodeList?.find(n => n.id === change.id)
            if (node && change.position) {
              // Vue 3: atribuição direta funciona (reatividade automática)
              node.left = `${change.position.x}px`
              node.top = `${change.position.y}px`
            }
          }
        }
        // Atualizar seleção (sem abrir modal)
        if (change.type === 'select' && change.selected) {
          this.selectNode(change.id)
        }
      })
    },
    onEdgesChange (changes) {
      // Remover linhas quando edges são deletados
      changes.forEach(change => {
        if (change.type === 'remove') {
          const edge = change.item
          if (edge && edge.source && edge.target) {
            this.deleteLine(edge.source, edge.target)
          }
        }
      })
      
      // Filtrar edges órfãs periodicamente
      this.$nextTick(() => {
        this.filterOrphanEdges()
      })
    },
    // Filtrar edges que referenciam nós que não existem mais
    filterOrphanEdges() {
      if (!this.vueFlowData.nodes || !this.vueFlowData.edges) return
      
      const nodeIds = new Set(this.vueFlowData.nodes.map(n => n.id))
      const validEdges = this.vueFlowData.edges.filter(edge => {
        if (!edge.source || !edge.target) return false
        const sourceExists = nodeIds.has(edge.source)
        const targetExists = nodeIds.has(edge.target)
        
        if (!sourceExists || !targetExists) {
          console.warn('Removendo edge órfã:', {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            sourceExists,
            targetExists
          })
          return false
        }
        return true
      })
      
      if (validEdges.length !== this.vueFlowData.edges.length) {
        this.vueFlowData.edges = validEdges
        // Também atualizar data.lineList
        if (this.data.lineList) {
          const validLineList = this.data.lineList.filter(line => 
            nodeIds.has(line.from) && nodeIds.has(line.to)
          )
          if (validLineList.length !== this.data.lineList.length) {
            this.data.lineList = validLineList
          }
        }
      }
    },
    onConnect (connection) {
      // Adicionar nova conexão
      if (connection.source && connection.target) {
        this.addNewLineCondition(connection.source, connection.target, null)
      }
    },
    onNodeClick (event) {
      // O click já é tratado pelo CustomNode
      // Não precisamos fazer nada aqui, pois o CustomNode emite os eventos apropriados
      // Clique simples -> selectNode (apenas seleciona)
      // Duplo clique -> editNode (abre modal)
    },
    zoomAdd () {
      if (this.zoom >= 1) {
        return
      }
      this.zoom = this.zoom + 0.1
      this.$refs.efContainer.style.transform = `scale(${this.zoom})`
      this.jsPlumb.setZoom(this.zoom)
    },
    zoomSub () {
      if (this.zoom <= 0) {
        return
      }
      this.zoom = this.zoom - 0.1
      this.$refs.efContainer.style.transform = `scale(${this.zoom})`
      this.jsPlumb.setZoom(this.zoom)
    },
    // Auto-layout: reorganiza os nós automaticamente em camadas hierárquicas
    autoLayout () {
      if (!this.vueFlowData.nodes || !this.vueFlowData.edges) {
        return
      }

      const nodes = [...this.vueFlowData.nodes]
      const edges = [...this.vueFlowData.edges]
      
      // Encontrar o nó inicial (start) e configurações
      const startNode = nodes.find(n => {
        const originalData = n.data?.originalData || {}
        return originalData.type === 'start' || n.id === 'start'
      })

      const configNode = nodes.find(n => {
        const originalData = n.data?.originalData || {}
        return originalData.type === 'configurations' || n.id === 'configurations'
      })

      if (!startNode) {
        this.$q.notify({
          type: 'warning',
          message: 'Nó inicial não encontrado. Não é possível reorganizar automaticamente.',
          position: 'top'
        })
        return
      }

      // Calcular camadas hierárquicas usando BFS (Breadth-First Search)
      const layers = {}
      const visited = new Set()
      const queue = [{ nodeId: startNode.id, layer: 0 }]
      
      layers[startNode.id] = 0
      visited.add(startNode.id)

      // Colocar configurações na mesma camada do início (layer 0)
      if (configNode) {
        layers[configNode.id] = 0
        visited.add(configNode.id)
      }

      while (queue.length > 0) {
        const { nodeId, layer } = queue.shift()
        
        // Encontrar todos os nós conectados a partir deste nó
        const outgoingEdges = edges.filter(e => e.source === nodeId)
        
        for (const edge of outgoingEdges) {
          if (!visited.has(edge.target)) {
            visited.add(edge.target)
            layers[edge.target] = layer + 1
            queue.push({ nodeId: edge.target, layer: layer + 1 })
          }
        }
      }

      // Agrupar nós por camada
      const nodesByLayer = {}
      const nodeWidth = 200 // largura aproximada de um nó
      const nodeHeight = 100 // altura aproximada de um nó
      const horizontalSpacing = 250 // espaçamento horizontal entre nós
      const verticalSpacing = 150 // espaçamento vertical entre camadas
      const startX = 100 // posição inicial X
      const startY = 100 // posição inicial Y

      // Agrupar nós por camada
      // Garantir que start e configurations fiquem juntos na camada 0
      nodes.forEach(node => {
        let layer = layers[node.id] !== undefined ? layers[node.id] : 999 // nós não conectados vão para o final
        
        // Garantir que configurações sempre fique na camada 0 junto com start
        if (configNode && node.id === configNode.id) {
          layer = 0
        }
        
        if (!nodesByLayer[layer]) {
          nodesByLayer[layer] = []
        }
        nodesByLayer[layer].push(node)
      })

      // Ordenar nós na camada 0: start primeiro, depois configurations
      if (nodesByLayer[0]) {
        nodesByLayer[0].sort((a, b) => {
          const aIsStart = a.id === startNode.id || (a.data?.originalData?.type === 'start')
          const bIsStart = b.id === startNode.id || (b.data?.originalData?.type === 'start')
          if (aIsStart && !bIsStart) return -1
          if (!aIsStart && bIsStart) return 1
          return 0
        })
      }

      // Calcular posições para cada camada
      const updatedNodes = []
      const layerKeys = Object.keys(nodesByLayer).sort((a, b) => parseInt(a) - parseInt(b))

      layerKeys.forEach((layerKey, layerIndex) => {
        const layerNodes = nodesByLayer[layerKey]
        const layerY = startY + (layerIndex * verticalSpacing)
        
        // Calcular posição X centralizada para cada nó na camada
        const totalWidth = layerNodes.length * horizontalSpacing
        const startXLayer = startX - (totalWidth / 2) + (horizontalSpacing / 2)

        layerNodes.forEach((node, nodeIndex) => {
          const newX = startXLayer + (nodeIndex * horizontalSpacing)
          
          // Atualizar posição no vueFlowData
          const vueNode = this.vueFlowData.nodes.find(n => n.id === node.id)
          if (vueNode) {
            vueNode.position = { x: newX, y: layerY }
          }

          // Atualizar posição no data.nodeList
          const dataNode = this.data.nodeList?.find(n => n.id === node.id)
          if (dataNode) {
            dataNode.left = `${newX}px`
            dataNode.top = `${layerY}px`
          }

          updatedNodes.push({
            ...node,
            position: { x: newX, y: layerY }
          })
        })
      })

      // Atualizar vueFlowData com as novas posições
      this.vueFlowData.nodes = updatedNodes.map(node => {
        const existingNode = this.vueFlowData.nodes.find(n => n.id === node.id)
        return {
          ...existingNode,
          position: node.position
        }
      })

      this.$q.notify({
        type: 'positive',
        message: 'Etapas reorganizadas automaticamente!',
        position: 'top'
      })
    },
    // 下载数据
    downloadData () {
      this.$q.dialog({
        title: 'Atenção!',
        message: 'Confirma o download?',
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        var datastr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data, null, '\t'))
        var downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', datastr)
        downloadAnchorNode.setAttribute('download', 'data.json')
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
        this.$notificarSucesso('Baixando, por favor aguarde...')
      })
    },
    openHelp () {
      this.flowHelpVisible = true
      this.$nextTick(function () {
        this.$refs.flowHelp.init()
      })
    }
  },
  mounted () {
    // Carregar dados e converter para Vue Flow
    this.$nextTick(() => {
      // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      this.dataReload(this.cDataFlow.flow.flow)
    })
  }
}
</script>

<style scoped>
.vueflow-wrapper {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Estilos para os nós customizados */
:deep(.vue-flow__node) {
  cursor: pointer;
}

:deep(.vue-flow__edge) {
  cursor: pointer;
  stroke: #94a3b8;
  stroke-width: 2;
  stroke-dasharray: 5, 5;
}

:deep(.vue-flow__edge.selected) {
  stroke: #6366f1;
  stroke-width: 2.5;
  stroke-dasharray: 5, 5;
}

:deep(.vue-flow__edge-path) {
  stroke: #94a3b8;
  stroke-width: 2;
  stroke-dasharray: 5, 5;
}

/* Estilos para edges animadas */
:deep(.vue-flow__edge.animated .vue-flow__edge-path) {
  stroke-dasharray: 5, 5;
  animation: dashdraw 0.5s linear infinite;
}

@keyframes dashdraw {
  to {
    stroke-dashoffset: -10;
  }
}

/* Melhorar visualização da animação */
:deep(.vue-flow__edge.animated) {
  stroke-dasharray: 5, 5;
}

:deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: #6366f1;
  stroke-width: 2.5;
  stroke-dasharray: 5, 5;
}

/* Edges no dark mode */
body.body--dark :deep(.vue-flow__edge-path) {
  stroke: #6b7280 !important;
}

body.body--dark :deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: #8b9aff !important;
}

body.body--dark :deep(.vue-flow__edge.animated .vue-flow__edge-path) {
  stroke: #6b7280 !important;
}

/* Esconder labels das linhas (edges) */
:deep(.vue-flow__edge-label),
:deep(.vue-flow__edge-text),
:deep(.vue-flow__edge-textwrapper),
:deep(.vue-flow__edge-textbg) {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

/* Estilos para os botões de controle do Vue Flow - estilo n8n */
:deep(.vue-flow__controls-button) {
  background-color: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  color: #6b7280 !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s ease !important;
}

:deep(.vue-flow__controls-button:hover) {
  background-color: #f9fafb !important;
  border-color: #d1d5db !important;
  color: #374151 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

/* Estilos para os ícones SVG dentro dos botões */
/* Vue Flow usa currentColor nos SVGs, então precisamos definir a cor no botão */
:deep(.vue-flow__controls-button svg) {
  color: #424242 !important;
  fill: currentColor !important;
  stroke: currentColor !important;
  opacity: 1 !important;
  display: block !important;
  visibility: visible !important;
  width: 16px !important;
  height: 16px !important;
}

:deep(.vue-flow__controls-button:hover svg) {
  color: #5c67f2 !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

/* Garantir que todos os elementos dentro do SVG herdem a cor */
:deep(.vue-flow__controls-button svg path),
:deep(.vue-flow__controls-button svg circle),
:deep(.vue-flow__controls-button svg rect),
:deep(.vue-flow__controls-button svg line),
:deep(.vue-flow__controls-button svg polyline),
:deep(.vue-flow__controls-button svg polygon),
:deep(.vue-flow__controls-button svg g) {
  fill: currentColor !important;
  stroke: currentColor !important;
  color: inherit !important;
}

/* ============================================
   ESTILOS PARA DARK MODE
   ============================================ */

/* Canvas/Background do Vue Flow */
body.body--dark .vueflow-wrapper {
  background: #1a1a1a !important;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px) !important;
}

/* Toolbar no dark mode */
body.body--dark .q-toolbar {
  background: #2d2d2d !important;
  border-bottom: 1px solid #404040;
}

body.body--dark .q-toolbar-title {
  color: #e5e5e5 !important;
}

/* Botões da toolbar no dark mode */
body.body--dark .q-btn.bg-padrao {
  background: #3a3a3a !important;
  color: #e5e5e5 !important;
}

body.body--dark .q-btn.bg-padrao:hover {
  background: #4a4a4a !important;
}

/* Separador no dark mode */
body.body--dark .q-separator {
  background: #404040 !important;
}

/* Modal no dark mode */
body.body--dark .q-dialog .q-card {
  background: #2d2d2d !important;
  color: #e5e5e5 !important;
}

body.body--dark .q-dialog .q-card-section {
  color: #e5e5e5 !important;
}

body.body--dark .q-dialog .text-h6 {
  color: #ffffff !important;
}

/* Nós no dark mode */
body.body--dark :deep(.vue-flow__node) {
  filter: brightness(0.95);
}

/* Controles do Vue Flow no dark mode */
body.body--dark :deep(.vue-flow__controls-button) {
  background-color: #3a3a3a !important;
  border: 1px solid #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.vue-flow__controls-button:hover) {
  background-color: #4a4a4a !important;
  border-color: #666666 !important;
}

body.body--dark :deep(.vue-flow__controls-button svg) {
  color: #e5e5e5 !important;
}

body.body--dark :deep(.vue-flow__controls-button:hover svg) {
  color: #8b9aff !important;
}

/* MiniMap no dark mode */
body.body--dark :deep(.vue-flow__minimap) {
  background: #2d2d2d !important;
  border: 1px solid #555555 !important;
}

body.body--dark :deep(.vue-flow__minimap-node) {
  background: #4a4a4a !important;
  border: 1px solid #666666 !important;
}

/* Background pattern no dark mode */
body.body--dark :deep(.vue-flow__background) {
  background: #1a1a1a !important;
}

body.body--dark :deep(.vue-flow__background-pattern) {
  stroke: rgba(255, 255, 255, 0.05) !important;
}
</style>
