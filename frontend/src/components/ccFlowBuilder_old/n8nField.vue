<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-input ref="inputN8nField"
            type="text"
            class="q-pa-sm bg-white col-grow"
            :placeholder="$t('n8nField.placeholders.n8nField')"
            v-model="$attrs.element.data.n8nfield"
            dense
            outlined
            :value="$attrs.element.data.n8nfield"
            >
          </q-input>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'N8nField',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>
