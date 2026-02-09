<template>
  <q-dialog v-model="dialogProxy" persistent @hide="fecharModal" @show="abrirModal">
    <q-card class="q-pa-lg">
      <q-card-section>
        <h3 class="q-mt-none q-mb-md">{{ $t('equipes.modalUser.title') }}</h3>

        <q-select
          v-model="tempSelectedUsers"
          :options="searchedUsers"
          option-label="name"
          option-value="id"
          multiple
          use-input
          input-debounce="300"
          :clearable="false"
          emit-value
          map-options
          @filter="onFilterUsers"
          :placeholder="$t('equipes.modalUser.placeholder')"
        >
          <q-tooltip>{{ $t('equipes.modalUser.tooltip') }}</q-tooltip>
        </q-select>
      </q-card-section>

      <q-card-actions align="right" class="q-mt-md">
        <q-btn
          flat
          :label="$t('equipes.modalUser.saveButton')"
          color="primary"
          :loading="loading"
          @click="saveChanges"
          class="q-mr-md"
        />
        <q-btn flat :label="$t('equipes.modalUser.closeButton')" color="negative" v-close-popup class="q-mr-md" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ListarUsersPrivadosPorGrupo, AddUserGrupoPrivado, RemoveUserGrupoPrivado } from 'src/service/equipes.js'
import { ListarUsuarios } from 'src/service/user.js'

export default {
  name: 'ModalUserPrivadoGrupo',
  props: {
    modalUserGrupo: {
      type: Boolean,
      default: false
    },
    grupoId: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modalUserGrupo', 'update:grupoId'],
  data () {
    return {
      loading: false,
      listaUsuariosGrupo: [],
      listaUsuarios: [],
      searchedUsers: [],
      tempSelectedUsers: [], // seleção temporária
      selectedUsers: []
    }
  },
  computed: {
    dialogProxy: {
      get () {
        return this.modalUserGrupo
      },
      set (val) {
        this.$emit('update:modalUserGrupo', val)
      }
    }
  },
  methods: {
    resetar () {
      this.listaUsuariosGrupo = []
      this.listaUsuarios = []
      this.searchedUsers = []
      this.tempSelectedUsers = []
      this.selectedUsers = []
    },
    fecharModal () {
      this.$emit('update:grupoId', 0)
      this.$emit('update:modalUserGrupo', false)
      this.resetar()
    },
    async abrirModal () {
      this.resetar()
      if (!this.grupoId) {
        // Sem grupo, apenas mantém o modal fechado
        this.$nextTick(() => this.$emit('update:modalUserGrupo', false))
        return
      }
      await this.listarUsuariosDoSistema()
      await this.listarUsuariosDoGrupo()
      this.tempSelectedUsers = [...this.selectedUsers]
    },
    async listarUsuariosDoGrupo () {
      try {
        const { data } = await ListarUsersPrivadosPorGrupo(this.grupoId)
        if (data) {
          this.listaUsuariosGrupo = Array.isArray(data) ? data : []
          this.updateSelectedUsers()
        }
      } catch (error) {
        console.error(this.$t('equipes.modalUser.notifications.error'), error)
      }
    },
    async listarUsuariosDoSistema () {
      try {
        const { data } = await ListarUsuarios()
        const users = data?.users || data || []
        const usuariosFiltrados = Array.isArray(users)
          ? users.filter(user => user.profile !== 'superadmin')
          : []
        this.listaUsuarios = usuariosFiltrados
        this.searchedUsers = usuariosFiltrados
      } catch (error) {
        console.error(this.$t('equipes.modalUser.notifications.error'), error)
      }
    },
    updateSelectedUsers () {
      // API retorna [{ user: { id, name, ... }, ... }]
      this.selectedUsers = this.listaUsuariosGrupo.map(item => item.user?.id).filter(Boolean)
    },
    onFilterUsers (val, update) {
      update(() => {
        const needle = String(val || '').toLowerCase()
        this.searchedUsers = !needle
          ? this.listaUsuarios
          : this.listaUsuarios.filter(u => String(u.name || '').toLowerCase().includes(needle))
      })
    },
    async saveChanges () {
      const addedUsers = this.tempSelectedUsers.filter(id => !this.selectedUsers.includes(id))
      const removedUsers = this.selectedUsers.filter(id => !this.tempSelectedUsers.includes(id))

      this.loading = true
      try {
        for (const userId of addedUsers) {
          await AddUserGrupoPrivado(userId, this.grupoId)
        }
        for (const userId of removedUsers) {
          await RemoveUserGrupoPrivado(userId, this.grupoId)
        }
        await this.listarUsuariosDoGrupo()
        await this.listarUsuariosDoSistema()

        this.$q.notify({
          type: 'info',
          progress: true,
          position: 'top',
          message: this.$t('equipes.modalUser.notifications.updated'),
          textColor: 'black',
          actions: [{ icon: 'close', round: true, color: 'white' }]
        })
        this.fecharModal()
      } catch (error) {
        console.error(this.$t('equipes.modalUser.notifications.error'), error)
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          message: this.$t('equipes.modalUser.notifications.error'),
          actions: [{ icon: 'close', round: true, color: 'white' }]
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-pa-lg { min-width: 70vw; }
</style>
