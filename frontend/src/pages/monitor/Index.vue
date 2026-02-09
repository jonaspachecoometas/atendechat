<template>
  <div v-if="(userProfile === 'superadmin')" class="monitor-page">
    <div class="page-header">
      <h1 :class="{'text-white': $q.dark.isActive}" >{{ this.$t('monitor.title') }}</h1>
    </div>
    
    <div class="monitor-content">
      <SystemMonitor />
    </div>
  </div>
</template>

<script>
import SystemMonitor from '../../components/SystemMonitor.vue';

export default {
  name: 'MonitorPage',
  components: {
    SystemMonitor
  },
  data() {
    return {
      userProfile: 'user',
    };
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile');
  }
};
</script>

<style lang="scss" scoped>
.monitor-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(120deg, rgba(var(--q-primary-rgb), 0.07) 0%, rgba(var(--q-secondary-rgb), 0.07) 100%);
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  color: var(--q-primary);
  font-size: 2.1rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.07);
}

.monitor-content {
  background: rgba(255,255,255,0.88);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  backdrop-filter: blur(8px);
  padding: 2rem;
  transition: box-shadow 0.2s;
}

body.body--dark {
  .monitor-content {
    background: rgba(30,30,30,0.96);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .page-header h1 {
    color: var(--q-primary);
    text-shadow: 0 2px 8px rgba(0,0,0,0.18);
  }
}

@media (max-width: 700px) {
  .monitor-page {
    padding: 0.5rem;
  }
  .monitor-content {
    padding: 1rem;
    border-radius: 12px;
  }
  .page-header {
    margin-bottom: 1rem;
  }
  .page-header h1 {
    font-size: 1.3rem;
  }
}
</style> 
