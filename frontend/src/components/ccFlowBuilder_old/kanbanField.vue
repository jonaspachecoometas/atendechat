<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-select
            ref="inputEnvioMensagem"
            style="flex: auto"
            borderless
            v-model="$attrs.element.data.kanban"
            class="q-pa-sm bg-white"
            dense
            outlined
            emit-value
            :options="kanbans.map(kanban => ({label: kanban.name, value: kanban.id}))"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarKanbans } from 'src/service/kanban.js'

export default {
  name: 'KanbanField',
  data () {
    return {
      kanbans: []
    }
  },
  mounted() {
    this.listarKanbans();
  },
  methods: {
    async listarKanbans () {
      try{
        const { data } = await ListarKanbans()
        // Ordenar kanbans por ordem alfabética baseada no campo 'name'
        const kanbansOrdenados = (data.kanban || []).sort((a, b) => {
          const nameA = a?.name ? a.name.toLowerCase() : ''
          const nameB = b?.name ? b.name.toLowerCase() : ''
          return nameA.localeCompare(nameB)
        })
        this.kanbans = kanbansOrdenados
        return kanbansOrdenados;
      } catch(e){
        console.error('Erro ao buscar kanbans:', e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
