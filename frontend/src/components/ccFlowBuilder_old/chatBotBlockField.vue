<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-toggle
            ref="chatbotBlockToggle"
            style="flex: auto"
            v-model="$attrs.element.data.chatbotBlocked"
            class="q-pa-sm bg-white"
            :label="$attrs.element.data.chatbotBlocked ? $t('nodeForm.chatbotBlock.chatbotBlocked') : $t('nodeForm.chatbotBlock.chatbotActive')"
            color="negative"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ChatBotBlockField',
  data () {
    return {
      // Não precisa de dados externos, apenas controla o toggle
    }
  },
  mounted() {
    // Inicializa o campo se não existir
    if (this.$attrs.element.data.chatbotBlocked === undefined) {
      this.$attrs.element.data.chatbotBlocked = false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
