<template>
  <div>
    <div class="timerBox">
      <span>{{ addZero(timer.minutes)}}:{{addZero(timer.seconds)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordingTimer',
  data () {
    return {
      timer: {
        minutes: 0,
        seconds: 0
      },
      intervalId: null // Adicionar referência para o interval
    }
  },
  methods: {
    interval () {
      this.intervalId = setInterval(() => {
        if (this.timer.seconds === 59) {
          this.timer = {
            ...this.timer,
            minutes: this.timer.minutes + 1,
            seconds: 0
          }
        }
        this.timer = {
          ...this.timer,
          seconds: this.timer.seconds + 1
        }
      }, 1000)
    },
    stopInteval () {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    addZero (n) {
      return n < 10 ? '0' + n : n
    }
  },
  mounted () {
    this.interval()
  },
  beforeUnmount() {
    this.stopInteval()
  },
  unmounted() {
    this.stopInteval()
  }
}
</script>

<style lang="scss" scoped>
.timerBox {
  width: 45px;
  text-align: center;
  font-size: 14px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
