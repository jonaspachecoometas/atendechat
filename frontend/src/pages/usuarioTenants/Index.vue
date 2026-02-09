<template>
  <div v-if="userProfile === 'superadmin'">
    <q-table
      flat
      bordered
      square
      hide-bottom
      style="border-radius: 8px"
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('usuariosTenants.title')"
      :rows="usuarios"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input
          style="width: 300px"
          filled
          dense
          class="col-grow"
          debounce="500"
          v-model="filter"
          clearable
          :placeholder="$t('usuariosTenants.filterPlaceholder')"
          @update:model-value="filtrarUsuario"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          class="q-ml-md col"
          :class="{
            'q-ml-none q-mt-md q-mr-md': $q.screen.width < 500
          }"
          color="primary"
          :label="$t('common.add')"
          @click="usuarioSelecionado = {}; modalUsuario = true"
        />
      </template>
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <span class="blur-effect">{{ props.row.email }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-tenant="props">
        <q-td :props="props">
          {{ props.row.tenant?.name || '-' }}
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarUsuario(props.row)"
          />
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarUsuario(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:pagination="{ pagination }">
        {{ usuarios.length }}/{{ pagination.rowsNumber }}
      </template>
    </q-table>
    <ModalUsuario
      v-model:modalUsuario="modalUsuario"
      @modalUsuario:usuario-editado="UPDATE_USUARIO"
      @modalUsuario:usuario-criado="usuarioCriado"
      v-model:usuarioEdicao="usuarioSelecionado"
    />
  </div>
</template>

<script>
// const userId = +localStorage.getItem('userId')
import { ListarUsuariosTenant, DeleteUsuarioTenant } from 'src/service/user.js'
import { ListarFilas } from 'src/service/filas.js'
import { MostrarCores } from 'src/service/empresas.js';
import ModalUsuario from './ModalUsuario.vue'
export default {
  name: 'IndexUsuarios',
  components: { ModalUsuario },
  data () {
    return {
      colors: {},
      userProfile: 'user',
      usuarios: [],
      usuarioSelecionado: {},
      modalFilaUsuario: false,
      filas: [],
      optionsProfile: [
        { value: 'user', label: this.$t('usuarios.profiles.user') },
        { value: 'super', label: this.$t('usuarios.profiles.super') },
        { value: 'admin', label: this.$t('usuarios.profiles.admin') },
        { value: 'superadmin', label: this.$t('usuarios.profiles.superadmin')  }
      ],
      modalUsuario: false,
      filter: null,
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      params: {
        pageNumber: 1,
        searchParam: null,
        hasMore: true
      },
      loading: false,
      columns: [
        { name: 'tenantId', label: "ID", field: 'tenantId', align: 'left' },
        { name: 'tenant', label: this.$t('usuariosTenants.tenant'), field: row => row.tenant?.name || '-', align: 'left' },
        { name: 'id', label: this.$t('usuariosTenants.id'), field: 'id', align: 'left' },
        { name: 'name', label: this.$t('usuariosTenants.name'), field: 'name', align: 'left' },
        { name: 'email', label: this.$t('usuariosTenants.email'), field: 'email', align: 'left' },
        { name: 'phone', label: this.$t('modalUsuario.phone'), field: 'phone', align: 'left' },
        { name: 'profile', label: this.$t('usuariosTenants.profile'), field: 'profile', align: 'left', format: v => this.optionsProfile.find(o => o.value === v).label },
        { name: 'restrictedUser', label: this.$t('usuarios.restrictedUser'), field: 'restrictedUser', align: 'left', format: v => v === 'enabled' ? '🔒 Habilitado' : '🔓 Desabilitado' },
        { name: 'acoes', label: this.$t('usuariosTenants.actions'), field: 'acoes', align: 'center' }
      ],
    }
  },
  methods: {
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const rawLabel =
              (typeof colorObj.label === 'string' && colorObj.label) ||
              (typeof colorObj.name === 'string' && colorObj.name) ||
              (typeof colorObj.key === 'string' && colorObj.key) ||
              ''

            if (!rawLabel) return acc
            const key = rawLabel.toLowerCase().trim()
            const value =
              colorObj.value ??
              (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
              colorObj.hex ??
              colorObj.color ??
              null

            if (typeof value === 'string' && value) {
              acc[key] = value
            }
            return acc
          }, {})

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    LOAD_USUARIOS (users) {
      const newUsers = []
      users.forEach(user => {
        const userIndex = this.usuarios.findIndex(c => c.id === user.id)
        if (userIndex !== -1) {
          // Preservar propriedades relacionadas como tenant que podem não vir no retorno
          this.usuarios[userIndex] = {
            ...this.usuarios[userIndex],
            ...user
          }
        } else {
          newUsers.push(user)
        }
      })
      const usersObj = [...this.usuarios, ...newUsers]
      this.usuarios = usersObj
    },
    UPDATE_USUARIO (usuario) {
      let newUsuarios = [...this.usuarios]
      const usuarioIndex = newUsuarios.findIndex(c => c.id === usuario.id)
      if (usuarioIndex !== -1) {
        // Preservar propriedades relacionadas como tenant que podem não vir no retorno
        newUsuarios[usuarioIndex] = {
          ...newUsuarios[usuarioIndex],
          ...usuario
        }
      } else {
        newUsuarios = [usuario, ...newUsuarios]
      }
      this.usuarios = [...newUsuarios]
      // Atualizar também o usuarioSelecionado se for o mesmo usuário
      if (this.usuarioSelecionado && this.usuarioSelecionado.id === usuario.id) {
        this.usuarioSelecionado = {
          ...this.usuarioSelecionado,
          ...usuario
        }
      }
    },
    DELETE_USUARIO (userId) {
      const newObj = [...this.usuarios.filter(u => u.id !== userId)]
      this.usuarios = [...newObj]
    },
    async listarUsuarios () {
      this.loading = true
      const { data } = await ListarUsuariosTenant(this.params)
      // Se for a primeira página, limpar a lista antes de adicionar
      if (this.params.pageNumber === 1) {
        this.usuarios = []
      }
      // Sempre fazer merge para preservar propriedades relacionadas
      this.LOAD_USUARIOS(data.users)
      this.params.hasMore = data.hasMore
      this.pagination.lastIndex = this.usuarios.length - 1
      this.pagination.rowsNumber = data.count
      this.loading = false
    },
    filtrarUsuario (data) {
      this.usuarios = []
      this.params.pageNumber = 1
      this.params.searchParam = data
      this.listarUsuarios()
    },
    onScroll ({ to, ref, ...all }) {
      if (this.loading !== true && this.params.hasMore === true && to === this.pagination.lastIndex) {
        this.params.pageNumber++
        this.listarUsuarios()
      }
    },
    usuarioCriado (usuario) {
      const obj = [...this.usuarios]
      obj.push(usuario)
      this.usuarios = [...obj]
    },
    editarUsuario (usuario) {
      // Buscar o usuário atualizado do array para garantir dados mais recentes
      const usuarioAtualizado = this.usuarios.find(u => u.id === usuario.id) || usuario
      this.usuarioSelecionado = { ...usuarioAtualizado }
      this.modalUsuario = true
    },
    deletarUsuario (usuario) {
      this.$q.dialog({
        title: this.$t('usuariosTenants.deleteConfirmation.title', { name: usuario.name }),
        // message: 'Mensagens antigas não serão apagadas no whatsapp.',
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        this.loading = true
        console.log(usuario)
        await DeleteUsuarioTenant(usuario.id, usuario.tenantId)
          .then(res => {
            this.DELETE_USUARIO(usuario.id)
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('usuariosTenants.deleteConfirmation.successMessage', { name: usuario.name }),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .catch(error => {
            console.error(error)
            this.$notificarErro(this.$t('usuariosTenants.deleteConfirmation.errorMessage'), error)
          })
        this.loading = false
      })
    },
    async listarFilas () {
      const { data } = await ListarFilas()
      this.filas = data
    },
    gerirFilasUsuario (usuario) {
      this.usuarioSelecionado = usuario
      this.modalFilaUsuario = true
    }
  },
  async mounted () {
    await this.listarFilas()
    await this.listarUsuarios()
    this.userProfile = localStorage.getItem('profile')
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : [])
      } catch (_) { list = [] }

      const colors = list.reduce((acc, colorObj = {}) => {
        const rawLabel =
          (typeof colorObj.label === 'string' && colorObj.label) ||
          (typeof colorObj.name === 'string' && colorObj.name) ||
          (typeof colorObj.key === 'string' && colorObj.key) ||
          ''

        if (!rawLabel) return acc
        const key = rawLabel.toLowerCase().trim()
        const value =
          colorObj.value ??
          (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
          colorObj.hex ??
          colorObj.color ??
          null

        if (typeof value === 'string' && value) acc[key] = value
        return acc
      }, {})

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
.blur-effect {
  filter: blur(0px);
  transition: all 0.3s ease;
}

.my-sticky-dynamic {
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease-out;
}

.my-sticky-dynamic:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.q-table {
  border-radius: 12px;
  overflow: hidden;
}

.q-table thead th {
  background: var(--q-primary);
  color: white;
  font-weight: 500;
  padding: 12px 16px;
}

.q-table tbody tr {
  transition: all 0.3s ease;
}

.q-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.02);
  transform: scale(1.01);
}

.q-input {
  .q-field__control {
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .q-field__control:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}

.q-btn {
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &--round {
    padding: 8px;
    margin: 0 4px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

/* Estilos para o modo escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .q-table tbody tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .q-input .q-field__control {
    background: rgba(255, 255, 255, 0.05);
  }
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .my-sticky-dynamic {
    margin: 0.5rem;
  }

  .q-table {
    font-size: 0.9rem;
  }

  .q-btn--round {
    padding: 6px;
  }
}
</style>
