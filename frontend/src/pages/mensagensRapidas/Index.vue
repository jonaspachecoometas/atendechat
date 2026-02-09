<template>
  <div v-if="pageAllowed">
    <q-table
      style="border-radius: 8px !important;"
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('mensagemRapida.title')"
      :rows="mensagensRapidas"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          :label="$t('common.add')"
          @click="abrirModalParaCriar"
        />
      </template>
      <template v-slot:body-cell-media="props">
        <q-td :props="props">
          <span v-if="props.row.media">
            <a :href="generateMediaUrl(props.row.media)" target="_blank" style="text-decoration: underline; cursor: pointer;">
              {{ $t('mensagemRapida.fileOpen') }}
            </a>
          </span>
          <span v-else>
            {{ $t('mensagemRapida.noFile') }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-message="props">
        <q-td :props="props">
          <span>
            {{ props.row.message && props.row.message.length > 20 ? props.row.message.substring(0, 20) + '...' : props.row.message || '-' }}
          </span>
          <q-tooltip max-width="360px" class="text-left">
            <div
              v-if="props.row.message"
              v-html="formatarMensagemWhatsApp(props.row.message)"
            />
            <span v-else>{{ $t('mensagemRapida.noPreview') }}</span>
          </q-tooltip>
        </q-td>
      </template>
      <template v-slot:body-cell-voice="props">
        <q-td :props="props">
          <span>
            {{ props.row.voice === 'enabled' ? $t('mensagemRapida.active') : $t('mensagemRapida.inactive') }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            :disable="!podeGerenciarMensagem(props.row)"
            :color="podeGerenciarMensagem(props.row) ? 'primary' : 'grey-5'"
            @click="editarMensagem(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            :disable="!podeGerenciarMensagem(props.row)"
            :color="podeGerenciarMensagem(props.row) ? 'negative' : 'grey-5'"
            @click="deletarMensagem(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <ModalMensagemRapida
      v-model:modalMensagemRapida="modalMensagemRapida"
      v-model:mensagemRapidaEmEdicao="mensagemRapidaEmEdicao"
      :mensagens-existentes="todasMensagensRapidas"
      :usuario-logado="usuario"
      @mensagemRapida:criada="mensagemCriada"
      @mensagemRapida:editada="mensagemEditada"
    />
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import ModalMensagemRapida from './ModalMensagemRapida.vue'
import { ListarMensagensRapidas, DeletarMensagemRapida } from 'src/service/mensagensRapidas.js'
import { MostrarCores } from 'src/service/empresas.js';

export default {
  name: 'MensagensRapidas',
  components: { ModalMensagemRapida },
  computed: {
    perfilAtual () {
      return String(this.userProfile || this.usuario?.profile || '').toLowerCase()
    },
    podeGerenciarMensagensPublicas () {
      return ['admin', 'super', 'supervisor', 'superadmin'].includes(this.perfilAtual)
    }
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      loading: false,
      mensagensRapidas: [],
      todasMensagensRapidas: [],
      modalMensagemRapida: false,
      mensagemRapidaEmEdicao: {},
      usuario: null,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'userId', label: 'User ID', field: 'userId', align: 'left' },
        { name: 'key', label: this.$t('mensagemRapida.key'), field: 'key', align: 'left' },
        { name: 'message', label: this.$t('mensagemRapida.message'), field: 'message', align: 'left', format: val => (val.length > 20 ? val.substring(0, 20) + '...' : val) },
        { name: 'media', label: this.$t('mensagemRapida.file'), field: 'media', align: 'left' },
        { name: 'voice', label: this.$t('mensagemRapida.recordedAudio'), field: 'voice', align: 'left' },
        {
          name: 'visibility',
          label: this.$t('mensagemRapida.visibility'),
          field: row => row,
          align: 'left',
          format: row => (this.isMensagemPublica(row) ? this.$t('mensagemRapida.visibilityPublic') : this.$t('mensagemRapida.visibilityPrivate'))
        },
        { name: 'acoes', label: this.$t('mensagemRapida.actions'), field: 'acoes', align: 'center' },
      ],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      }
    }
  },
  methods: {
    abrirModalParaCriar () {
      this.mensagemRapidaEmEdicao = {}
      this.modalMensagemRapida = true
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val;
            return acc;
          }, {});

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    generateMediaUrl(mediaFileName) {
      return `${process.env.URL_API}/public/${this.usuario.tenantId}/fastreply/${mediaFileName}`;
    },
    mensagensDoUsuario (mensagens = []) {
      if (!Array.isArray(mensagens)) return []
      return mensagens.filter(mensagem => this.isMensagemDoUsuario(mensagem))
    },
    isMensagemDoUsuario (mensagem = {}) {
      if (this.isMensagemPublica(mensagem)) {
        return true
      }
      const usuarioId = this.usuario?.id ?? this.usuario?.userId
      if (usuarioId === undefined || usuarioId === null) return true
      const ownerId = mensagem?.userId ?? mensagem?.usuarioId ?? mensagem?.ownerId
      if (ownerId === undefined || ownerId === null) return true
      return String(ownerId) === String(usuarioId)
    },
    isMensagemPublica (mensagem = {}) {
      const valor = mensagem?.isPublic ?? mensagem?.is_public ?? mensagem?.public ?? mensagem?.publico
      if (typeof valor === 'string') {
        return ['true', '1', 'enabled', 'public', 'sim'].includes(valor.toLowerCase())
      }
      return Boolean(valor)
    },
    podeGerenciarMensagem (mensagem = {}) {
      return this.isMensagemPublica(mensagem)
        ? this.podeGerenciarMensagensPublicas
        : this.isMensagemDoUsuario(mensagem)
    },
    formatarMensagemWhatsApp (texto = '') {
      if (typeof texto !== 'string' || !texto) {
        return ''
      }
      const sanitize = (value = '') => value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

      let formatado = sanitize(texto)
      const blocos = []

      formatado = formatado.replace(/```([\s\S]*?)```/g, (_, conteudo) => {
        const placeholder = `__CODE_BLOCK_${blocos.length}__`
        blocos.push(`<pre><code>${conteudo}</code></pre>`)
        return placeholder
      })

      formatado = formatado.replace(/`([^`]+)`/g, '<code>$1</code>')
      formatado = formatado.replace(/\*(?!\s)([^*]+?)\*/g, '<strong>$1</strong>')
      formatado = formatado.replace(/_(?!\s)([^_]+?)_/g, '<em>$1</em>')
      formatado = formatado.replace(/~(?!\s)([^~]+?)~/g, '<s>$1</s>')
      formatado = formatado.replace(/\r?\n/g, '<br>')

      formatado = formatado.replace(/__CODE_BLOCK_(\d+)__/g, (_, indice) => blocos[indice] || '')
      return formatado
    },
    async listarMensagensRapidas () {
      const { data } = await ListarMensagensRapidas()
      this.todasMensagensRapidas = Array.isArray(data) ? data : []
      this.mensagensRapidas = this.mensagensDoUsuario(this.todasMensagensRapidas)
    },
    mensagemCriada (mensagem) {
      this.todasMensagensRapidas.unshift(mensagem)
      if (this.isMensagemDoUsuario(mensagem)) {
        this.mensagensRapidas.unshift(mensagem)
      }
    },
    mensagemEditada (mensagem) {
      const todas = [...this.todasMensagensRapidas]
      const idxTodas = todas.findIndex(m => m.id === mensagem.id)
      if (idxTodas > -1) {
        todas[idxTodas] = mensagem
      }
      this.todasMensagensRapidas = [...todas]
      this.mensagensRapidas = this.mensagensDoUsuario(this.todasMensagensRapidas)
    },
    editarMensagem (mensagem) {
      if (!this.podeGerenciarMensagem(mensagem)) return
      this.mensagemRapidaEmEdicao = { ...mensagem }
      this.modalMensagemRapida = true
    },
    deletarMensagem (mensagem) {
      if (!this.podeGerenciarMensagem(mensagem)) return
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('mensagemRapida.deleteConfirmation', { key: mensagem.key }),
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
      }).onOk(() => {
        this.loading = true
        DeletarMensagemRapida(mensagem)
          .then(res => {
            this.todasMensagensRapidas = this.todasMensagensRapidas.filter(m => m.id !== mensagem.id)
            this.mensagensRapidas = this.mensagensDoUsuario(this.todasMensagensRapidas)
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('mensagemRapida.deleteSuccess'),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
        this.loading = false
      })
    }
  },
  mounted () {
    this.userProfile = localStorage.getItem('profile')
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.['mensagens-rapidas'] !== false;
    this.listarMensagensRapidas()
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val;
        return acc;
      }, {});

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
  }
}
</script>

<style scoped lang="scss">
.my-sticky-dynamic {
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  overflow: hidden;

  .q-table__top,
  .q-table__bottom,
  .q-table__title {
    background: transparent;
    border: none;
  }

  thead tr {
    background: rgba(var(--q-primary-rgb), 0.08);
    font-weight: 600;
  }

  tbody tr {
    transition: background 0.2s;
    &:hover {
      background: rgba(var(--q-primary-rgb), 0.07);
    }
  }

  .q-btn {
    border-radius: 8px;
    min-width: 32px;
    min-height: 32px;
    padding: 0.2rem 0.7rem;
    font-size: 0.9rem;
    transition: box-shadow 0.2s, background 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    &:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.13);
      background: rgba(var(--q-primary-rgb), 0.08);
    }
  }
}

.q-card {
  border-radius: 16px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
  margin-bottom: 1.5rem;
}

body.body--dark {
  .my-sticky-dynamic,
  .q-card {
    background: rgba(30,30,30,0.92);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .q-table thead tr {
    background: rgba(var(--q-primary-rgb), 0.18);
  }
}
</style>
