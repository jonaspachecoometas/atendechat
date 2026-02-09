<!-- 
  EXEMPLO PRÁTICO: Como adicionar o adaptador no panel.vue atual
  Este arquivo mostra EXATAMENTE onde adicionar o código
-->

<script>
// ============================================
// 1. ADICIONAR O IMPORT (linha ~113)
// ============================================
import draggable from 'vuedraggable'
import './jsplumb.js'
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

// ✅ ADICIONAR ESTA LINHA:
import { convertToVueFlow, convertFromVueFlow } from './vueflow-adapter.js'

export default {
  data () {
    return {
      // ... propriedades existentes ...
      data: {},
      
      // ✅ OPCIONAL: Adicionar se quiser preparar para Vue Flow
      // vueFlowData: { nodes: [], edges: [] },
    }
  },
  
  methods: {
    // ============================================
    // 2. USAR NO MÉTODO saveFlow (linha ~273)
    // ============================================
    saveFlow () {
      // ✅ OPCIONAL: Validar formato antes de salvar
      // try {
      //   const vueFlowData = convertToVueFlow(this.data)
      //   const validatedData = convertFromVueFlow(vueFlowData, this.data.name)
      //   this.data = validatedData // Atualizar com dados validados
      // } catch (error) {
      //   console.warn('Erro ao validar formato:', error)
      // }
      
      // Código existente continua igual
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
    
    // ============================================
    // 3. USAR NO MÉTODO dataReload (linha ~903)
    // ============================================
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
        
        // ✅ OPCIONAL: Converter para Vue Flow (preparar para migração)
        // if (this.vueFlowData) {
        //   this.vueFlowData = convertToVueFlow(this.data)
        // }
        
        this.$nextTick(() => {
          if (this.jsPlumb) {
            this.jsPlumb.deleteEveryConnection()
            this.jsPlumb.deleteEveryEndpoint()
          }
          this.jsPlumbInit()
        })
      })
    },
    
    // ============================================
    // 4. MÉTODO NOVO: Validar estrutura (adicionar)
    // ============================================
    // ✅ ADICIONAR ESTE MÉTODO NOVO:
    validateFlowStructure() {
      try {
        // Converte para Vue Flow e volta para validar
        const vueFlowData = convertToVueFlow(this.data)
        const convertedBack = convertFromVueFlow(vueFlowData, this.data.name)
        
        // Verifica se a conversão preservou os dados
        const nodesOk = JSON.stringify(this.data.nodeList) === 
                       JSON.stringify(convertedBack.nodeList)
        const linesOk = JSON.stringify(this.data.lineList) === 
                       JSON.stringify(convertedBack.lineList)
        
        if (!nodesOk || !linesOk) {
          console.warn('⚠️ Estrutura pode ter inconsistências após conversão')
          return false
        }
        
        return true
      } catch (error) {
        console.error('❌ Erro na validação:', error)
        return false
      }
    },
    
    // ============================================
    // 5. USAR NO MÉTODO addNode (linha ~598) - OPCIONAL
    // ============================================
    addNode (evt, nodeMenu, mousePosition) {
      // ... todo o código existente continua igual ...
      
      if (!this.data.nodeList) this.data.nodeList = []
      this.data.nodeList.push(node)
      
      // ✅ OPCIONAL: Atualizar vueFlowData se estiver usando
      // if (this.vueFlowData) {
      //   this.vueFlowData = convertToVueFlow(this.data)
      // }
      
      this.$nextTick(function () {
        // ... resto do código existente ...
      })
    },
    
    // ============================================
    // 6. USAR NO MÉTODO deleteLine (linha ~525) - OPCIONAL
    // ============================================
    deleteLine (from, to) {
      // ... todo o código existente continua igual ...
      
      // Remove da lista de linhas
      if (this.data.lineList) {
        this.data.lineList = this.data.lineList.filter(function (line) {
          if (line.from == from && line.to == to) {
            return false
          }
          return true
        })
      }
      
      // ✅ OPCIONAL: Atualizar vueFlowData se estiver usando
      // if (this.vueFlowData) {
      //   this.vueFlowData = convertToVueFlow(this.data)
      // }
      
      // ... resto do código existente ...
    }
  }
}
</script>

<!-- 
  RESUMO:
  
  1. Adicionar import na linha ~113
  2. Usar no saveFlow() para validar (opcional)
  3. Usar no dataReload() para preparar migração (opcional)
  4. Adicionar método validateFlowStructure() (opcional)
  5. Usar em addNode/deleteLine se quiser sincronizar (opcional)
  
  IMPORTANTE: Tudo é OPCIONAL! Você pode:
  - Apenas importar e não usar (não quebra nada)
  - Usar só para validação
  - Usar para preparar migração futura
  - Usar completamente quando migrar para Vue Flow
-->

