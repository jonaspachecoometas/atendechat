<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-table
      style="width: 100%; margin-left: 0;"
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :rows="groups"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :title="$t('equipes.title')"
    >
      <template #top-right>
        <q-btn
          color="primary"
          :label="$t('common.add')"
          @click="grupoEdicao = {}; modalGrupo = true"
        />
      </template>

      <template #body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon
            size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'"
          />
        </q-td>
      </template>

      <template #body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat round icon="mdi-account-multiple-plus-outline" @click="editarUsuarios(props.row)">
            <q-tooltip>{{ $t('equipes.actions.addUser') }}</q-tooltip>
          </q-btn>
          <q-btn flat round icon="edit" @click="editarGrupo(props.row)" />
          <q-btn flat round icon="mdi-delete" @click="deletarGrupo(props.row)" />
        </q-td>
      </template>
    </q-table>

    <ModalPrivadoGrupo
      v-model:modalGrupo="modalGrupo"
      v-model:grupoEdicao="grupoEdicao"
      @modal-grupo:criada="grupoCriada"
      @modal-grupo:editada="grupoEditada"
    />
    <ModalUserPrivadoGrupo
      v-model:modalUserGrupo="modalUserGrupo"
      v-model:grupoId="grupoId"
    />
  </div>

  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import ModalPrivadoGrupo from './ModalPrivadoGrupo.vue'
import ModalUserPrivadoGrupo from './ModalUserPrivadoGrupo.vue'
import { DeletarGrupoPrivado, ListarGruposPrivados } from 'src/service/equipes.js'
import { MostrarCores } from 'src/service/empresas.js'

export default {
  name: 'Grupos',
  components: {
    ModalPrivadoGrupo,
    ModalUserPrivadoGrupo
  },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      grupoEdicao: {},
      modalGrupo: false,
      modalUserGrupo: false,
      grupoId: 0,
      groups: [],
      pagination: {
        page: 1,
        rowsPerPage: 0, // 0 combina com [0] (mostrar todos)
        rowsNumber: 0
      },
      loading: false
    }
  },
  computed: {
    // Reativo a mudanças de idioma
    columns () {
      return [
        { name: 'id', label: this.$t('equipes.columns.id'), field: 'id', align: 'left' },
        { name: 'group', label: this.$t('equipes.columns.group'), field: 'group', align: 'left' },
        { name: 'isActive', label: this.$t('equipes.columns.isActive'), field: 'isActive', align: 'center' },
        { name: 'acoes', label: this.$t('equipes.columns.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  methods: {
    async loadColors () {
      try {
        const response = await MostrarCores()
        if (response?.status === 200) {
          const companyData = Array.isArray(response.data) ? response.data[0] : response.data
          const colorsArray = companyData?.systemColors || []

          // Espera-se que cada item tenha { label, value } (ou { label, hex })
          this.colors = colorsArray.reduce((acc, c) => {
            const key = String(c.label || '').toLowerCase()
            const val = c.value ?? c.hex ?? c.cor ?? null
            if (key && val) acc[key] = val
            return acc
          }, {})

          const root = document.documentElement
          const known = ['neutral', 'primary', 'secondary', 'accent', 'warning', 'negative', 'positive', 'light']
          known.forEach(k => {
            if (this.colors[k]) root.style.setProperty(`--q-${k}`, this.colors[k])
          })
        } else {
          console.error('Erro ao carregar as cores')
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error)
      }
    },

    async listarGrupos () {
      this.loading = true
      try {
        const { data } = await ListarGruposPrivados()
        this.groups = Array.isArray(data) ? data : []
        this.pagination.rowsNumber = this.groups.length
      } catch (e) {
        this.$q.notify?.({ type: 'negative', message: this.$t('common.errorLoading') })
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    grupoCriada (grupo) {
      if (!grupo) return
      this.groups = [...this.groups, grupo]
      this.pagination.rowsNumber = this.groups.length
    },

    grupoEditada (grupo) {
      if (!grupo?.id) return
      const copy = [...this.groups]
      const idx = copy.findIndex(g => g.id === grupo.id)
      if (idx > -1) {
        copy[idx] = { ...grupo }
        this.groups = copy
      }
    },

    editarGrupo (grupo) {
      this.grupoEdicao = { ...grupo }
      this.modalGrupo = true
    },

    editarUsuarios (grupo) {
      this.modalUserGrupo = true
      this.grupoId = grupo?.id || 0
    },

    async deletarGrupo (grupo) {
      if (!grupo?.id) return
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('equipes.dialog.deleteMessage', { group: grupo.group }),
        cancel: { label: this.$t('common.no'), color: 'primary', push: true },
        ok: { label: this.$t('common.yes'), color: 'negative', push: true },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        try {
          await DeletarGrupoPrivado(grupo)
          this.groups = this.groups.filter(g => g.id !== grupo.id)
          this.pagination.rowsNumber = this.groups.length
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('equipes.notifications.deleted', { group: grupo.group }),
            actions: [{ icon: 'close', round: true, color: 'white' }]
          })
        } catch (e) {
          this.$q.notify({ type: 'negative', message: this.$t('common.deleteFailed') })
          console.error(e)
        } finally {
          this.loading = false
        }
      })
    }
  },
  mounted () {
    this.listarGrupos()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions') || '{}')
    this.pageAllowed = menuPermissions?.equipes === true

    const storedColors = localStorage.getItem('storedColors')
    if (storedColors) {
      try {
        const parsed = JSON.parse(storedColors)
        const arr = Array.isArray(parsed) ? parsed : (parsed?.systemColors || [])
        const colors = arr.reduce((acc, c) => {
          const key = String(c.label || '').toLowerCase()
          const val = c.value ?? c.hex ?? c.cor ?? null
          if (key && val) acc[key] = val
          return acc
        }, {})
        const root = document.documentElement
        Object.keys(colors).forEach(k => root.style.setProperty(`--q-${k}`, colors[k]))
      } catch (e) {
        console.warn('Falha ao aplicar storedColors do localStorage', e)
      }
    } else {
      console.warn('Nenhuma cor armazenada no localStorage')
    }
    // Caso queira sempre buscar do backend:
    // this.loadColors()
  }
}
</script>

<style lang="scss" scoped></style>
