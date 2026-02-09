/*
 * Quasar 2 + Vite configuration
 */
/* eslint-env node */
const { configure } = require('quasar/wrappers')

module.exports = configure((ctx) => {
  require('dotenv').config()
  return {
    css: ['app.sass'],
    extras: [
      'mdi-v5',
      'roboto-font',
      'material-icons',
      'material-icons-outlined'
    ],
    build: {
      env: {
        URL_API: process.env.URL_API || 'http://localhost:3000',
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        USUARIO_API: process.env.USUARIO_API,
        SENHA_API: process.env.SENHA_API
      },
      vueRouterMode: 'hash',
      alias: {
        'node:https': 'https'
      },
      extendViteConf(viteConf) {
		// Plugin para injetar versão do package.json
        const packageJson = require('./package.json')
        
        viteConf.plugins = viteConf.plugins || []
        viteConf.plugins.push({
          name: 'inject-app-version',
          transform(code, id) {
            // Substitui {{APP_VERSION}} no arquivo version.js
            if (id && id.includes('version.js')) {
              return {
                code: code.replace(
                  /export const APP_VERSION = ['"]{{APP_VERSION}}['"]/g,
                  `export const APP_VERSION = '${packageJson.version}'`
                ),
                map: null
              }
            }
            return null
          }
        })
		
        viteConf.build = viteConf.build || {}
        // Sourcemaps consomem muita memória; desativado para evitar OOM
        // Reabilite localmente se precisar depurar: viteConf.build.sourcemap = true
        viteConf.build.sourcemap = false
        
        // Configuração do SASS para resolver problema com math.div()
        viteConf.css = viteConf.css || {}
        viteConf.css.preprocessorOptions = viteConf.css.preprocessorOptions || {}
        viteConf.css.preprocessorOptions.sass = viteConf.css.preprocessorOptions.sass || {}
        viteConf.css.preprocessorOptions.sass.api = 'modern-compiler'
        // Reduzir chances de 404 de chunks hashed em produção PWA:
        // para builds PWA, evitamos code splitting agressivo.
        viteConf.build.rollupOptions = viteConf.build.rollupOptions || {}
        viteConf.build.rollupOptions.output = viteConf.build.rollupOptions.output || {}
        if (process.env.BUILD_PWA_SINGLE_CHUNK === '1') {
          // Força bundling em um único arquivo (minimiza riscos de mismatch SW/asset)
          viteConf.build.rollupOptions.inlineDynamicImports = true
          // Remover qualquer manualChunks existente
          delete viteConf.build.rollupOptions.output.manualChunks
        } else {
          // Caso contrário, manter chunking moderado para dev/build local
          viteConf.build.rollupOptions.output.manualChunks = (id) => {
            if (!id.includes('node_modules')) return undefined
            if (id.includes('/xlsx')) return 'xlsx'
            if (id.includes('apexcharts') || id.includes('vue3-apexcharts')) return 'apexcharts'
            if (id.includes('/chart.js') || id.includes('vue-chartjs')) return 'chartjs'
            if (id.includes('codemirror')) return 'codemirror'
            if (id.includes('wavesurfer')) return 'wavesurfer'
            if (id.includes('@signalwire') || id.includes('sip.js') || id.includes('jssip')) return 'telephony'
            if (id.includes('quasar') || id.includes('@quasar')) return 'quasar'
            if (id.includes('/vue/') || id.includes('vue-router') || id.includes('vuex') || id.includes('vue-i18n')) return 'vue'
            const parts = id.split('node_modules/')[1].split('/')
            const pkg = parts[0].startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
            return `vendor_${pkg.replace(/[@\\/]/g, '_')}`
          }
        }
        viteConf.build.chunkSizeWarningLimit = 5000
      }
    },
    devServer: {
      https: false,
      open: true
    },
    framework: {
      iconSet: 'material-icons',
      lang: 'pt-BR',
      config: { dark: false },
      plugins: ['Notify', 'Dialog', 'LocalStorage']
    },
    animations: 'all',
    ssr: { pwa: false },
    pwa: {
      workboxMode: 'injectManifest',
      swSrc: 'src-pwa/custom-service-worker.js',
      manifest: {
        name: 'APP',
        short_name: 'APP',
        description: 'Bot Multi-atendimento para whatsapp',
        display: 'standalone',
        orientation: 'any',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          { src: 'icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
          { src: 'icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    },
    boot: ['lame-shim', 'i18n', 'vuelidate', 'ccComponents', 'phone-input']
  }
})
