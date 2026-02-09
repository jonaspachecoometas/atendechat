<template>
  <div class="asterisk-webphone">
    <div v-if="isConnected" class="webphone-container">
      <!-- Status -->
      <div class="status-indicator">
        <q-icon name="phone" color="positive" size="xs" />
        <span class="text-positive">{{ $t('asteriskWebphone.conected') }}</span>
      </div>

      <!-- Input do número -->
      <div class="phone-input">
        <input
          v-model="phoneNumber"
          type="text"
          :placeholder="$t('asteriskWebphone.setNumber')"
          class="number-input"
          :disabled="isCalling && callStatus === 'Chamada recebida'"
        />
      </div>

      <!-- Keypad -->
      <div class="keypad">
        <div class="keypad-row" v-for="row in keypadRows" :key="row[0]">
          <button
            v-for="number in row"
            :key="number"
            class="keypad-button"
            @click="appendNumber(number)"
          >
            {{ number }}
          </button>
        </div>
        <div class="keypad-row">
          <button class="keypad-button" @click="appendNumber('*')">*</button>
          <button class="keypad-button" @click="appendNumber('0')">0</button>
          <button class="keypad-button" @click="appendNumber('#')">#</button>
        </div>
      </div>

      <!-- Botões de controle -->
      <div class="call-controls">
        <!-- Botões para chamada recebida -->
        <template v-if="isCalling && callStatus === 'Chamada recebida'">
          <button 
            class="call-button"
            :class="{ disabled: isCallingInProgress }"
            @click="acceptCall"
            :disabled="isCallingInProgress"
            style="background: #4caf50; color: white;"
          >
            <q-icon name="phone" />
          </button>
          <button 
            class="hangup-button"
            :class="{ disabled: isCallingInProgress }"
            @click="hangupCall"
            :disabled="isCallingInProgress"
          >
            <q-icon name="phone_disabled" />
          </button>
        </template>
        <!-- Botão para discar normalmente -->
        <template v-else>
          <button 
            class="call-button"
            :class="{ disabled: !isConnected || isCalling || !phoneNumber || isCallingInProgress }"
            @click="makeCall"
            :disabled="!isConnected || isCalling || !phoneNumber || isCallingInProgress"
          >
            <q-icon name="phone" />
          </button>
          <button 
            class="hangup-button"
            :class="{ disabled: !isCalling }"
            @click="hangupCall"
            :disabled="!isCalling"
          >
            <q-icon name="phone_disabled" />
          </button>
        </template>
      </div>

      <div class="call-info" v-if="isCalling">
        <div class="call-status">{{ callStatus }}</div>
        <div class="call-duration" v-if="callDuration">{{ callDuration }}</div>
      </div>

      <!-- Elemento de áudio para reprodução -->
      <audio ref="remoteAudio" autoplay></audio>
    </div>
    <div v-else class="disconnected-message">
      <q-icon name="warning" color="warning" />
      <span>{{ $t('asteriskWebphone.disconnectedWebphone') }}</span>
    </div>

    <!-- Áudios -->
    <audio ref="dtmf_1" :src="dtmfSounds['1']" preload="auto"></audio>
    <audio ref="dtmf_2" :src="dtmfSounds['2']" preload="auto"></audio>
    <audio ref="dtmf_3" :src="dtmfSounds['3']" preload="auto"></audio>
    <audio ref="dtmf_4" :src="dtmfSounds['4']" preload="auto"></audio>
    <audio ref="dtmf_5" :src="dtmfSounds['5']" preload="auto"></audio>
    <audio ref="dtmf_6" :src="dtmfSounds['6']" preload="auto"></audio>
    <audio ref="dtmf_7" :src="dtmfSounds['7']" preload="auto"></audio>
    <audio ref="dtmf_8" :src="dtmfSounds['8']" preload="auto"></audio>
    <audio ref="dtmf_9" :src="dtmfSounds['9']" preload="auto"></audio>
    <audio ref="dtmf_0" :src="dtmfSounds['0']" preload="auto"></audio>
    <audio ref="dtmf_star" :src="dtmfSounds['*']" preload="auto"></audio>
    <audio ref="dtmf_hash" :src="dtmfSounds['#']" preload="auto"></audio>
    <audio ref="ringTone" :src="calling" preload="auto"></audio>
    <audio ref="callingTone" :src="calling" preload="auto"></audio>
  </div>
</template>

<script>
import { UserAgent, Registerer, Inviter, SessionState } from "sip.js";
import dtmf_0 from 'assets/dtmf_0.mp3'
import dtmf_1 from 'assets/dtmf_1.mp3'
import dtmf_2 from 'assets/dtmf_2.mp3'
import dtmf_3 from 'assets/dtmf_3.mp3'
import dtmf_4 from 'assets/dtmf_4.mp3'
import dtmf_5 from 'assets/dtmf_5.mp3'
import dtmf_6 from 'assets/dtmf_6.mp3'
import dtmf_7 from 'assets/dtmf_7.mp3'
import dtmf_8 from 'assets/dtmf_8.mp3'
import dtmf_9 from 'assets/dtmf_9.mp3'
import sound from 'assets/dtmf_0.mp3'
import sound_loud from 'assets/dtmf_0.mp3'
import calling from 'assets/calling.mp3'
import { CriarCallLog } from 'src/service/callLog.js';

export default {
  name: "AsteriskWebphone",
  props: {
    initialPhoneNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userAgent: null,
      registerer: null,
      session: null,
      phoneNumber: this.initialPhoneNumber,
      isConnected: false,
      isCalling: false,
      isCallingInProgress: false,
      callStatus: "",
      keypadRows: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9']
      ],
      callDuration: null,
      callTimer: null,
      startTime: null,
      ringTone: null,
      audioLoaded: false,
      remoteStream: null,
      dtmfSounds: {
        '1': dtmf_1,
        '2': dtmf_2,
        '3': dtmf_3,
        '4': dtmf_4,
        '5': dtmf_5,
        '6': dtmf_6,
        '7': dtmf_7,
        '8': dtmf_8,
        '9': dtmf_9,
        '0': dtmf_0,
        '*': sound,
        '#': sound_loud
      },
      calling: calling,
      // Sistema de gerenciamento de memória
      timers: []
    };
  },
  watch: {
    initialPhoneNumber(newVal) {
      this.phoneNumber = newVal;
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
      // Limpar timer específico do call se existir
      if (this.callTimer) {
        clearInterval(this.callTimer);
        this.callTimer = null;
      }
    },
    sipConfig() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      return {
        username: usuario.sipUsername,
        password: usuario.sipPassword,
        server: usuario.sipServer,
        port: usuario.sipPort,
        transport: usuario.sipTransport
      }
    },
    async startSip() {
      const config = this.sipConfig()
      this.userAgent = new UserAgent({
        uri: UserAgent.makeURI(`sip:${config.username}@${config.server}`),
        transportOptions: {
          server: `wss://${config.server}:${config.port}/ws`
        },
        authorizationUsername: config.username,
        authorizationPassword: config.password,
        logLevel: "error"
      });

      this.userAgent.delegate = {
        onInvite: (invitation) => {
          this.handleIncomingCall(invitation);
        }
      };

      await this.userAgent.start();
      this.registerer = new Registerer(this.userAgent);
      await this.registerer.register();
      this.isConnected = true;
    },
    async makeCall() {
      if (!this.phoneNumber || this.isCallingInProgress) return;
      
      try {
        this.isCallingInProgress = true;
        const config = this.sipConfig();
        const target = UserAgent.makeURI(`sip:${this.phoneNumber}@${config.server}`);
        const inviter = new Inviter(this.userAgent, target, {
          sessionDescriptionHandlerOptions: { constraints: { audio: true, video: false } }
        });
        this.session = inviter;
        this.setupSession(inviter);
        await inviter.invite();
        this.isCalling = true;
        this.callStatus = this.$t('asteriskWebphone.calling');
        this.playCallingTone();

        // Criar log de chamada
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        await CriarCallLog({
          userId: usuario.userid,
          tenantId: usuario.tenantId,
          phoneNumber: config.username,
          originNumber: config.username,
          destinationNumber: this.phoneNumber,
          callDuration: this.callDuration,
          callStatus: 'Calling'
        });
      } catch (error) {
        console.error('Erro ao iniciar chamada:', error);
        this.$q.notify({
          color: 'negative',
          message: this.$t('asteriskWebphone.callError'),
          icon: 'error'
        });
      } finally {
        this.isCallingInProgress = false;
      }
    },
    async handleIncomingCall(invitation) {
      const config = this.sipConfig();
      this.session = invitation;
      this.setupSession(invitation);
      this.isCalling = true;
      this.callStatus = this.$t('asteriskWebphone.callReceived');
      this.phoneNumber = invitation.remoteIdentity.uri.user;
      this.playRingTone();
      this.$emit('incoming-call');

      // Criar log de chamada
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!this.phoneNumber) {
        console.error('Número de telefone não definido ao tentar criar log de chamada.');
        return;
      }
      await CriarCallLog({
        userId: usuario.userid,
        tenantId: usuario.tenantId,
        phoneNumber: config.username,
        originNumber: config.username,
        destinationNumber: this.phoneNumber,
        callDuration: this.callDuration,
        callStatus: 'Received'
      });
    },
    async acceptCall() {
      if (!this.session) return;
      const config = this.sipConfig();
      try {
        this.isCallingInProgress = true;
        await this.session.accept();
        this.callStatus = this.$t('asteriskWebphone.conected');

        // Criar log de chamada aceita
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!this.phoneNumber) {
          console.error('Número de telefone não definido ao tentar criar log de chamada.');
          return;
        }
        await CriarCallLog({
          userId: usuario.userid,
          tenantId: usuario.tenantId,
          phoneNumber: config.username,
          originNumber: config.username,
          destinationNumber: this.phoneNumber,
          callDuration: this.callDuration,
          callStatus: 'Accepted'
        });
      } catch (error) {
        console.error('Erro ao aceitar chamada:', error);
        this.$q.notify({
          color: 'negative',
          message: this.$t('asteriskWebphone.callReceivedError'),
          icon: 'error'
        });
      } finally {
        this.isCallingInProgress = false;
      }
    },
    setupSession(session) {
      session.stateChange.addListener(async (state) => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const config = this.sipConfig();
        if (state === SessionState.Established) {
          // Conectar áudio remoto
          const pc = session.sessionDescriptionHandler.peerConnection;
          pc.getReceivers().forEach(receiver => {
            if (receiver.track && receiver.track.kind === "audio") {
              const stream = new window.MediaStream([receiver.track]);
              this.$refs.remoteAudio.srcObject = stream;
              this.$refs.remoteAudio.play();
            }
          });
          this.callStatus = this.$t('asteriskWebphone.conected');
          this.isCallingInProgress = false;
          this.stopRingTone();
          this.stopCallingTone();

          // Iniciar cálculo da duração da chamada
          this.startTime = Date.now();
          this.callTimer = setInterval(() => {
            this.callDuration = Math.floor((Date.now() - this.startTime) / 1000);
          }, 1000);
          this.addTimer(this.callTimer);

          // Criar log de chamada completada
          await CriarCallLog({
            userId: usuario.userid,
            tenantId: usuario.tenantId,
            phoneNumber: config.username,
            originNumber: config.username,
            destinationNumber: this.phoneNumber,
            callDuration: this.callDuration,
            callStatus: 'Completed'
          });
        }
        if (state === SessionState.Terminated) {
          this.isCalling = false;
          this.callStatus = this.$t('asteriskWebphone.callEnded');
          this.isCallingInProgress = false;
          this.stopRingTone();
          this.stopCallingTone();
          if (this.$refs.remoteAudio) {
            this.$refs.remoteAudio.srcObject = null;
          }

          // Parar o timer de duração da chamada
          this.cleanupMemory();

          // Criar log de chamada finalizada
          await CriarCallLog({
            userId: usuario.userid,
            tenantId: usuario.tenantId,
            phoneNumber: config.username,
            originNumber: config.username,
            destinationNumber: this.phoneNumber,
            callDuration: this.callDuration,
            callStatus: 'Ended'
          });
        }
      });
    },
    async hangupCall() {
      
      if (!this.session) {
        return;
      }

      try {
        if (this.session.state === SessionState.Established) {
          console.log('Chamada estabelecida, tentando terminar...');
          await this.session.bye();
          console.log('Chamada terminada com sucesso');
        } else if (this.session.state === SessionState.Initial) {
          console.log('Chamada em estado inicial, tentando rejeitar...');
          await this.session.reject();
          console.log('Chamada rejeitada com sucesso');
        } else if (this.session.state === SessionState.Establishing) {
          console.log('Chamada em estabelecimento, tentando cancelar...');
          if (this.session instanceof Inviter) {
            await this.session.cancel();
            console.log('Chamada cancelada com sucesso');
          } else {
            await this.session.bye();
            console.log('Chamada terminada com sucesso');
          }
        } else {
          console.log('Estado da chamada não tratado:', this.session.state);
          await this.session.bye();
        }
      } catch (error) {
        console.error('Erro detalhado ao encerrar chamada:', error);
        this.$q.notify({
          color: 'negative',
          message: this.$t('asteriskWebphone.callEndedError'),
          icon: 'error'
        });
      } finally {
        console.log('Limpando estado da chamada...');
        this.isCalling = false;
        this.callStatus = this.$t('asteriskWebphone.callEnded');
        this.isCallingInProgress = false;
        this.stopRingTone();
        if (this.$refs.remoteAudio) {
          this.$refs.remoteAudio.srcObject = null;
        }
        this.session = null;
        console.log('Estado da chamada limpo');
      }
    },
    playDialTone(number) {
      let audioRef;
      if (number === '*') {
        audioRef = 'dtmf_star';
      } else if (number === '#') {
        audioRef = 'dtmf_hash';
      } else {
        audioRef = `dtmf_${number}`;
      }
      if (this.$refs[audioRef]) {
        try {
          this.$refs[audioRef].currentTime = 0;
          this.$refs[audioRef].volume = 1.0;
          this.$refs[audioRef].play().catch(error => {
            console.error(`Erro ao tocar som DTMF ${number}:`, error);
          });
        } catch (error) {
          console.error(`Erro ao tocar som DTMF ${number}:`, error);
        }
      } else {
        console.error('Elemento de áudio não encontrado:', audioRef);
      }
    },
    appendNumber(number) {
      this.phoneNumber += number;
      this.playDialTone(number);
    },
    playRingTone() {
      if (this.$refs.ringTone) {
        try {
          this.$refs.ringTone.currentTime = 0
          this.$refs.ringTone.volume = 1.0
          this.$refs.ringTone.loop = true
          this.$refs.ringTone.play().catch(error => {
            console.error('Erro ao tocar som de toque:', error)
          })
        } catch (error) {
          console.error('Erro ao tocar som de toque:', error)
        }
      }
    },
    stopRingTone() {
      if (this.$refs.ringTone) {
        try {
          this.$refs.ringTone.pause()
          this.$refs.ringTone.currentTime = 0
        } catch (error) {
          console.error('Erro ao parar som de toque:', error)
        }
      }
    },
    playCallingTone() {
      if (this.$refs.callingTone) {
        try {
          this.$refs.callingTone.currentTime = 0
          this.$refs.callingTone.volume = 1.0
          this.$refs.callingTone.loop = true
          this.$refs.callingTone.play().catch(error => {
            console.error('Erro ao tocar som de chamada:', error)
          })
        } catch (error) {
          console.error('Erro ao tocar som de chamada:', error)
        }
      }
    },
    stopCallingTone() {
      if (this.$refs.callingTone) {
        try {
          this.$refs.callingTone.pause()
          this.$refs.callingTone.currentTime = 0
        } catch (error) {
          console.error('Erro ao parar som de chamada:', error)
        }
      }
    },
  },
  mounted() {
    this.startSip();
  },
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
    
    if (this.userAgent) {
      try {
        // Primeiro, parar o UserAgent
        this.userAgent.stop();
      } catch (error) {
        console.error('Erro ao parar UserAgent:', error);
      }
    }

    // Limpar os timers e áudios
    this.stopCallingTone();
    this.stopRingTone();

    // Limpar a sessão atual se existir
    if (this.session) {
      try {
        if (this.session.terminate) {
          this.session.terminate();
        }
        this.session = null;
      } catch (error) {
        console.error('Erro ao terminar sessão:', error);
      }
    }

    // Limpar o registrador
    if (this.registerer) {
      try {
        this.registerer.stateChange.removeAllListeners();
        this.registerer = null;
      } catch (error) {
        console.error('Erro ao limpar registrador:', error);
      }
    }

    // Resetar estados
    this.isConnected = false;
    this.isCalling = false;
    this.callStatus = "";
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>
.asterisk-webphone {
  max-width: 280px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.webphone-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.number-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
  outline: none;
}

.number-input:focus {
  border-color: #1976d2;
}

.keypad {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.keypad-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.keypad-button {
  flex: 1;
  aspect-ratio: 1;
  border: none;
  background: none;
  font-size: 24px;
  color: #1976d2;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.keypad-button:hover {
  background: #f0f0f0;
}

.keypad-button:active {
  background: #e0e0e0;
  transform: scale(0.95);
}

.call-controls {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.call-button, .hangup-button {
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.call-button {
  background: #4caf50;
  color: white;
}

.hangup-button {
  background: #f44336;
  color: white;
}

.call-button:hover:not(.disabled) {
  background: #43a047;
  transform: scale(1.05);
}

.hangup-button:hover:not(.disabled) {
  background: #e53935;
  transform: scale(1.05);
}

.call-button.disabled, .hangup-button.disabled {
  background: #e0e0e0;
  cursor: not-allowed;
  color: #9e9e9e;
}

.call-info {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.disconnected-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #f57c00;
  font-size: 14px;
  padding: 12px;
  background: #fff3e0;
  border-radius: 4px;
}
</style> 
