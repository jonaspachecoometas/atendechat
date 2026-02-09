<template>
  <component :is="builderComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'FlowBuilderWrapper',
  computed: {
    builderComponent() {
      const version = this.$route.query.version
      
      if (version === 'old') {
        return defineAsyncComponent(() => import('components/ccFlowBuilder_old/panel.vue'))
      }
      
      // Padrão: versão nova
      return defineAsyncComponent(() => import('components/ccFlowBuilder/panel.vue'))
    }
  }
}
</script>

