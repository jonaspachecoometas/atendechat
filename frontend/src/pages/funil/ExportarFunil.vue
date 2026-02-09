<template>
  <div class="exportar-funil">
    <q-select v-model="tipo" :options="tipos" :label="$t('funil.export')" class="q-mr-md" dense />
    <q-btn color="primary" icon="mdi-download" :label="$t('funil.exportCSV')" @click="exportarCSV" :disable="!tipo" dense />
  </div>
</template>

<script>
function toCSV(arr) {
  if (!arr.length) return ''
  const keys = Object.keys(arr[0])
  const csv = [keys.join(',')]
  arr.forEach(obj => {
    csv.push(keys.map(k => '"' + (obj[k] !== undefined ? obj[k] : '') + '"').join(','))
  })
  return csv.join('\n')
}

export default {
  name: 'ExportarFunil',
  props: {
    oportunidades: { type: Array, default: () => [] },
    pipelines: { type: Array, default: () => [] },
    etapas: { type: Array, default: () => [] }
  },
  data() {
    return {
      tipo: null,
      tipos: [
        { label: this.$t('funil.oportunidadesValue'), value: 'oportunidades' },
        { label: this.$t('funil.pipelinesValue'), value: 'pipelines' },
        { label: this.$t('funil.etapasValue'), value: 'etapas' }
      ]
    }
  },
  methods: {
    exportarCSV() {
      let dados = []
      if (this.tipo && this.tipo.value === 'oportunidades') dados = this.oportunidades.map(o => ({ ...o, status: o.status }))
      if (this.tipo && this.tipo.value === 'pipelines') dados = this.pipelines
      if (this.tipo && this.tipo.value === 'etapas') dados = this.etapas
      if (!dados.length) {
        this.$q && this.$q.notify && this.$q.notify({
          type: 'warning',
          message: this.$t('funil.noDataToExport')
        })
        return
      }
      const csv = toCSV(dados)
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.tipo.value}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.exportar-funil {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .q-select {
    .q-field__control {
      border-radius: 8px;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.3);

      &:hover {
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
    }
  }

  .q-btn {
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
    letter-spacing: 0.3px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
</style> 
