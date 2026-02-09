<template>
  <!-- Componente vazio - controle feito pelo script externo via CDN -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WebphoneNovo',
  computed: {
    ...mapGetters({
      inboxes: 'whatsapps',
    }),
  },
  watch: {
    inboxes: {
      handler(newInboxes) {
        if (newInboxes && Array.isArray(newInboxes)) {
          newInboxes.forEach(inbox => {
            if (inbox.wavoipToken) {
              this.startWavoip(inbox.name, inbox.wavoipToken);
            }
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    startWavoip(inboxName, token) {
      this.$store.dispatch('webphone_novo/startWavoip', {
        token,
        inboxName,
      });
    },
  },
};
</script>

