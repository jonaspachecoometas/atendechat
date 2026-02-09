<template>
  <q-dialog
    title="流程数据信息"
    v-model="dialogVisible"
    width="70%"
  >
    <el-alert
      title="使用说明"
      type="warning"
      description="以下流程信息可以被存储起来，方便下一次流程加载"
      show-icon
      close-text="知道了"
    >
    </el-alert>
    <br />
    <!-- Editor de código (Vue 3) -->
    <Codemirror
      :value="flowJsonData"
      :options="options"
      class="code"
    ></Codemirror>
  </q-dialog>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import Codemirror from 'codemirror-editor-vue3'
// Vite/ESM: usar import em vez de require
import 'codemirror/mode/javascript/javascript.js'

export default {
  props: {
    data: Object
  },
  data () {
    return {
      dialogVisible: false,
      flowJsonData: {},
      options: {
        mode: { name: 'javascript', json: true },
        lineNumbers: true
      }
    }
  },
  components: { Codemirror },
  methods: {
    init () {
      this.dialogVisible = true
      this.flowJsonData = JSON.stringify(this.data, null, 4)?.toString()
    }
  }
}
</script>
