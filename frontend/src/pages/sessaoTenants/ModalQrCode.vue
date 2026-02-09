<template>
  <q-dialog :value="abrirModalQR"
    @hide="fecharModalQrModal"
    persistent>
    <q-card style="bg-white">
      <q-card-section>
        <div class="text-h6 text-primary">
          {{ $t('sessaoModalQrcode.title') }}
          <q-btn round
            class="q-ml-md"
            color="negative"
            icon="mdi-close"
            @click="fecharModalQrModal" />
        </div>
      </q-card-section>
      <q-card-section class="text-center"
        :style="$q.dark.isActive ? 'background: white !important' : ''">
        <QrcodeVue v-if="cQrcode"
          :value="cQrcode"
          :size="300"
          level="H" />
        <span v-else>
          Aguardando o Qr Code
        </span>
      </q-card-section>
      <q-card-section>
        <div class="row">Caso tenha problema com a leitura, solicite um novo Qr Code </div>
        <div class="row col-12 justify-center">
          <q-btn color="primary"
            glossy
            ripple
            outline
            label="Novo QR Code"
            @click="solicitarQrCode"
            icon="watch_later" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>

import QrcodeVue from 'qrcode.vue'

export default {
  name: 'ModalQrCode',
  components: {
    QrcodeVue
  },
  props: {
    abrirModalQR: {
      type: Boolean,
      default: false
    },
    channel: {
      type: Object,
      default: () => ({
        id: null,
        qrcode: ''
      })
    }
  },
  watch: {
    channel: {
      handler (v) {
        if (this.channel.status === 'CONNECTED') {
          this.fecharModalQrModal()
        }
      },
      deep: true
    }
  },
  computed: {
    cQrcode () {
      return this.channel.qrcode
    }
  },
  methods: {
    solicitarQrCode () {
      this.$emit('gerar-novo-qrcode', this.channel)
      this.fecharModalQrModal()
    },
    fecharModalQrModal () {
      this.$emit('update:abrirModalQR', false)
    }
  }
}
</script>

<style scoped lang="scss">
.q-dialog .q-card {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  max-width: 95vw;
  margin: 0 auto;
  transition: all 0.3s;
}
.q-card-section {
  padding: 1.5rem 1.5rem 0.7rem 1.5rem;
}
body.body--dark {
  .q-dialog .q-card {
    background: rgba(30,30,30,0.97);
    border: 1px solid rgba(255,255,255,0.08);
  }
}
@media (max-width: 600px) {
  .q-dialog .q-card {
    width: 98vw !important;
    border-radius: 12px;
    padding: 0.5rem;
  }
  .q-card-section {
    padding: 1rem !important;
  }
}
</style>
