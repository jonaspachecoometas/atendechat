<template>
  <div @click="handleClick" style="display: inline-block; cursor: pointer;">
    <slot name="logout" v-if="isLoggedIn">Logout</slot>
    <slot name="login" v-else>Login</slot>
  </div>
</template>

<script>
export default {
  name: 'VFacebookLogin',
  props: {
    appId: { type: String, required: true },
    version: { type: String, default: 'v12.0' },
    loginOptions: { type: Object, default: () => ({ scope: 'public_profile,email' }) }
  },
  data () {
    return {
      isSdkReady: false,
      isLoggedIn: false
    }
  },
  mounted () {
    // Carrega SDK do Facebook
    if (window.FB) {
      this.initSdk()
      return
    }
    window.fbAsyncInit = () => {
      this.initSdk()
    }
    const id = 'facebook-jssdk'
    if (!document.getElementById(id)) {
      const js = document.createElement('script')
      js.id = id
      js.async = true
      js.defer = true
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      document.body.appendChild(js)
    }
  },
  methods: {
    initSdk () {
      try {
        window.FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: false,
          version: this.version
        })
        this.isSdkReady = true
        this.$emit('sdk-init', window.FB)
        window.FB.getLoginStatus((response) => {
          this.isLoggedIn = response && response.status === 'connected'
        })
      } catch (e) {
        // ignore
      }
    },
    handleClick () {
      if (!this.isSdkReady) return
      if (this.isLoggedIn) {
        window.FB.logout((response) => {
          this.isLoggedIn = false
          this.$emit('logout', response)
        })
      } else {
        window.FB.login((response) => {
          this.isLoggedIn = response && response.status === 'connected'
          this.$emit('login', response)
        }, this.loginOptions)
      }
    }
  }
}
</script>

