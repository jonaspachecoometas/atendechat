<template>
  <div class="terminal" v-if="userProfile === 'superadmin'">
    <div class="terminal-header">
      <h1 :class="{'text-white': $q.dark.isActive}">{{ $t('terminal.title') }}</h1>
    </div>
    <textarea ref="out" v-model="output" readonly rows="16" class="output"></textarea>
    <div class="input-area">
      <input
        type="text"
        v-model="command"
        :disabled="pending"
        @keyup.enter="sendCommand"
        @keydown.up.prevent="historyPrev"
        @keydown.down.prevent="historyNext"
        :placeholder="$t('terminal.placeholder')"
        class="input"
        autocomplete="off"
      />
      <q-btn
        color="primary"
        :disable="pending || !command.trim()"
        :loading="pending"
        :label="$t('terminal.sendButton')"
        @click="sendCommand"
        class="send-button"
      />
      <q-btn v-if="pending && streamActiveId" flat color="negative" icon="stop" :label="$t('common.cancel')" @click="killRunning" />
    </div>
  </div>
</template>

<script>
import { Terminal as runCommandHttp } from 'src/service/terminal.js';
import socket, { ensureConnectedFromStorage } from 'src/utils/socket.js'

export default {
  name: 'Terminal',
  data() {
    return {
      command: '',
      output: '',
      userProfile: 'user',
      pending: false,
      history: [],
      historyIndex: -1,
      streamHandlers: null,
      streamActiveId: null,
      connected: false,
      transport: '',
      serverLabel: ''
    };
  },
  computed: {
  },
  methods: {
    append(line = '') {
      this.output += (this.output && !this.output.endsWith('\n') ? '\n' : '') + line + '\n'
      this.$nextTick(() => {
        try {
          const t = this.$refs.out
          if (t) t.scrollTop = t.scrollHeight
        } catch (_) {}
      })
    },
    genId() {
      try {
        const arr = new Uint8Array(8)
        ;(window.crypto||{}).getRandomValues?.(arr)
        return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('')
      } catch (_) {
        return String(Date.now()) + '-' + Math.random().toString(16).slice(2)
      }
    },
    pushHistory(cmd) {
      if (!cmd) return
      if (this.history[this.history.length - 1] !== cmd) {
        this.history.push(cmd)
      }
      this.historyIndex = this.history.length
      try { localStorage.setItem('terminalHistory', JSON.stringify(this.history.slice(-100))) } catch (_) {}
    },
    historyPrev() {
      if (!this.history.length) return
      this.historyIndex = Math.max(0, this.historyIndex - 1)
      this.command = this.history[this.historyIndex] || ''
    },
    historyNext() {
      if (!this.history.length) return
      this.historyIndex = Math.min(this.history.length, this.historyIndex + 1)
      this.command = this.history[this.historyIndex] || ''
    },
    attachStreamHandlers(id) {
      const onData = (payload) => {
        if (!payload || payload.id !== id) return
        if (payload.chunk) this.append(payload.chunk)
      }
      const onEnd = (payload) => {
        if (!payload || payload.id !== id) return
        this.pending = false
        this.cleanupStreamHandlers()
      }
      const onError = (payload) => {
        if (!payload || payload.id !== id) return
        this.append(`[error] ${payload.message || 'unknown error'}`)
        this.pending = false
        this.cleanupStreamHandlers()
      }
      socket.on('terminal:output', onData)
      socket.on('terminal:end', onEnd)
      socket.on('terminal:error', onError)
      this.streamHandlers = [
        ['terminal:output', onData],
        ['terminal:end', onEnd],
        ['terminal:error', onError]
      ]
    },
    cleanupStreamHandlers() {
      if (!this.streamHandlers) return
      for (const [evt, fn] of this.streamHandlers) socket.off(evt, fn)
      this.streamHandlers = null
      this.streamActiveId = null
    },
    killRunning() {
      if (this.streamActiveId) {
        try { socket.emit('terminal:kill', { id: this.streamActiveId }) } catch (_) {}
      }
    },
    async sendCommand() {
      if (this.command.trim()) {
        const cmd = this.command
        this.append(`> ${cmd}`)
        this.command = ''
        this.pending = true
        this.pushHistory(cmd)

        // Tenta streaming por socket se disponível
        ensureConnectedFromStorage()
        const canStream = !!socket && socket.connected
        if (canStream) {
          const id = this.genId()
          this.streamActiveId = id
          this.attachStreamHandlers(id)
          socket.emit('terminal:exec', { id, command: cmd })
          // Fallback se não vier nenhum chunk em 600ms
          const fallbackTimer = setTimeout(async () => {
            if (this.streamActiveId === id) {
              this.cleanupStreamHandlers()
              await this.runHttp(cmd)
            }
          }, 600)
          // Limpa timer ao finalizar
          const clearTimer = () => clearTimeout(fallbackTimer)
          socket.once('terminal:output', clearTimer)
          socket.once('terminal:end', clearTimer)
          socket.once('terminal:error', clearTimer)
          return
        }
        // Fallback HTTP
        await this.runHttp(cmd)
      }
    },
    async runHttp(cmd) {
      try {
        const response = await runCommandHttp({ command: cmd })
        if (response?.data?.output) {
          this.append(response.data.output)
        } else {
          this.append(this.$t('terminal.noOutput'))
        }
      } catch (error) {
        const msg = error?.data?.error || error?.message || 'unknown'
        this.append(`${this.$t('terminal.error')}${msg}`)
      } finally {
        this.pending = false
      }
    }
  },
  mounted() {
    this.userProfile = localStorage.getItem('profile')
    // Carrega histórico
    try {
      const raw = localStorage.getItem('terminalHistory')
      const arr = raw ? JSON.parse(raw) : []
      if (Array.isArray(arr)) this.history = arr
      this.historyIndex = this.history.length
    } catch (_) {}

    // Conexão socket (status/rotulo)
    try {
      ensureConnectedFromStorage()
      const updateConn = () => {
        this.connected = !!(socket && socket.connected)
        try { this.transport = socket?.io?.engine?.transport?.name || '' } catch (_) { this.transport = '' }
        try {
          const uri = socket?.io?.uri || ''
          if (uri) {
            const u = new URL(uri, window.location.origin)
            this.serverLabel = u.host
          } else {
            this.serverLabel = (process.env.URL_API || '').replace(/^https?:\/\//, '')
          }
        } catch (_) {
          this.serverLabel = (process.env.URL_API || '')
        }
      }
      updateConn()
      socket.on('connect', updateConn)
      socket.on('disconnect', updateConn)
      socket.on('reconnect', updateConn)
      socket.on('reconnect_error', updateConn)
    } catch (_) {}
  }
};
</script>

<style lang="scss" scoped>
.terminal {
  display: flex;
  flex-direction: column;
  margin: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  animation: terminalFadeIn 0.5s ease-out;

  h1 {
    color: var(--q-primary);
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.connection {
  display: flex;
  align-items: center;
  gap: 8px;
  .dot {
    width: 10px; height: 10px; border-radius: 50%;
    &.ok { background: #21ba45; box-shadow: 0 0 8px rgba(33,186,69,.6) }
    &.bad { background: #c10015; box-shadow: 0 0 8px rgba(193,0,21,.6) }
  }
  .label { font-size: .85rem; opacity: .85; }
}

.shell-line {
  font-family: 'Fira Code', monospace;
  color: #8ab4f8;
  margin: 6px 0 4px;
  .blink { animation: blink 1s step-start 0s infinite; }
}

@keyframes blink { 50% { opacity: 0; } }

.output {
  flex-grow: 1;
  background: rgba(30, 30, 30, 0.95);
  color: #d4d4d4;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  height: 400px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.input-area {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.input {
  flex-grow: 1;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: var(--q-primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
}

.send-button {
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}

.command {
  color: var(--q-positive);
  font-weight: 600;
}

.response {
  color: #d4d4d4;
}

@keyframes terminalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos para o modo escuro */
body.body--dark {
  .terminal {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);

    .input {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .terminal {
    margin: 10px;
    padding: 1rem;

    h1 {
      font-size: 1.5rem;
    }

    .output {
      height: 300px;
    }

    .input-area {
      flex-direction: column;
      gap: 0.5rem;
    }

    .send-button {
      width: 100%;
    }
  }
}
</style>
