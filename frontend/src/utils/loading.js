import { Loading, QSpinnerBars, QSpinnerPuff } from 'quasar'

const loading = {}
let lastRequest = new Date()

// Sistema de gerenciamento de memória
let timers = []

const addTimer = (timerId) => {
  timers.push(timerId);
};

const clearAllTimers = () => {
  timers.forEach(timerId => {
    clearTimeout(timerId);
    clearInterval(timerId);
  });
  timers = [];
};

const cleanupMemory = () => {
  clearAllTimers();
};

loading.show = function (config) {
  // if (config && config.loading) {
  const now = new Date()
  const ms = now - lastRequest
  lastRequest = now
  if (ms > 2000) {
    if (config.loading === 'gears') {
      Loading.show({
        spinner: QSpinnerBars,
        message: '',
        messageColor: 'white',
        spinnerSize: 100,
        spinnerColor: 'white',
        customClass: ''
      })
    } else if (config.loading === 'hourglass') {
      Loading.show({
        spinner: QSpinnerBars,
        message: '',
        messageColor: 'white',
        spinnerSize: 100,
        spinnerColor: 'white',
        customClass: ''
      })
    } else {
      Loading.show({
        spinner: QSpinnerPuff,
        message: 'Estamos trabalhando...',
        messageColor: 'white',
        spinnerSize: 150,
        spinnerColor: 'white',
        customClass: ''
      })
    }
  }
  // }
}

loading.hide = function (config) {
  const timerId = setTimeout(() => {
    Loading.hide()
  }, 1000)
  addTimer(timerId);
  // if (config && config.loading) {
  //   setTimeout(() => {
  //     Loading.hide()
  //   }, 1000)
  // }
}

// Métodos de limpeza de memória
loading.cleanupMemory = cleanupMemory;
loading.clearAllTimers = clearAllTimers;

export default loading
