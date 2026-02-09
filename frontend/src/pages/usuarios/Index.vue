<template>
  <div v-if="userProfile === 'admin'">
    <q-table
      style="border-radius: 8px !important"
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('usuarios.title')"
      :rows="usuarios"
      :columns="columns"
      :loading="loading"
      row-key="id"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      v-model:pagination="pagination"
      :rows-per-page-options="[40]"
      @virtual-scroll="onVirtualScroll"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <span v-if="col.name === 'isOnline'">
              {{ col.label }}
              <q-icon name="help" size="18px" class="q-ml-xs">
                <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4">
                  <span class="text-weight-medium">{{ $t('usuarios.notifications.status1') }}</span>
                  <span class="row col">{{ $t('usuarios.notifications.statusOnline') }}</span>
                  <span class="row col">{{ $t('usuarios.notifications.statusOffline') }}</span>
                  <span class="row col">{{ $t('usuarios.notifications.statusReload') }}</span>
                </q-tooltip>
              </q-icon>
            </span>
            <span v-else>
              {{ col.label }}
            </span>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:top-right>
        <q-input
          style="width: 300px"
          filled
          dense
          class="col-grow"
          debounce="500"
          v-model="filter"
          clearable
          :placeholder="$t('usuarios.placeholder')"
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
      <template v-slot:body-cell-sipEnabled="props">
        <q-td :props="props" class="text-center">
          <q-icon
            :name="props.row.sipEnabled ? 'mdi-check-circle' : 'mdi-close-circle'"
            :color="props.row.sipEnabled ? 'positive' : 'negative'"
            size="sm"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-sipStatus="props">
        <q-td :props="props" class="text-center">
          <q-icon
            :name="getSipStatusIcon(props.row.sipStatus)"
            :color="getSipStatusColor(props.row.sipStatus)"
            size="sm"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-whatsappAllowed="props">
        <q-td :props="props">
          <!-- <div style="white-space: pre-line;">
            {{ props.row.whatsappAllowed?.map(w => w.name).join('\n') }}
          </div> -->
          <ol style="padding-left: 20px; margin: 0">
            <li v-for="(w, index) in props.row.whatsappAllowed" :key="index">{{ w.name }}</li>
          </ol>
        </q-td>
      </template>
      <template v-slot:body-cell-queues="props">
        <q-td :props="props">
          <!-- <div style="white-space: pre-line;">
            {{ props.row.queues?.map(q => q.queue).join('\n') }}
          </div> -->
          <ol style="padding-left: 20px; margin: 0">
            <li v-for="(q, index) in props.row.queues" :key="index">{{ q.queue }}</li>
          </ol>
        </q-td>
      </template>
      <template v-slot:body-cell-menuPermissions="props">
        <q-td :props="props">
          <ol style="padding-left: 20px; margin: 0">
            <li
              v-for="(val, key) in formatarMenuPermissions(props.row.menuPermissions)"
              :key="key"
            >
              {{ key }}
            </li>
          </ol>
        </q-td>
      </template>
      <template v-slot:body-cell-isOnline="props">
        <q-td :props="props" class="text-center">
          <q-tooltip v-if="isCurrentUser(props.row)" anchor="top middle" self="bottom middle" content-class="bg-primary text-white">
            {{ $t('usuarios.notifications.changeStatusInToolbar') }}
          </q-tooltip>
          <q-select
            v-model="props.row._statusProxy"
            borderless
            dense
            rounded
            :options="statusOptions"
            map-options
            emit-value
            :disable="isCurrentUser(props.row)"
            @update:model-value="val => updateStatus(props.row, val)"
          >
            <template v-slot:selected>
              <div class="row full-width justify-center">
                <q-chip
                  color="grey-3"
                  text-color="primary"
                  class="q-my-none q-ml-sm q-mr-none q-py-md"
                >
                  <q-avatar
                    :color="getStatusColor(props.row._statusProxy)"
                    text-color="white"
                    size="20px"
                    :icon="getStatusIcon(props.row._statusProxy)"
                    rounded
                  />
                  {{ getStatusLabel(props.row._statusProxy) }}
                </q-chip>
              </div>
            </template>
          </q-select>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="mdi-arrow-decision-outline"
            @click="gerirFilasUsuario(props.row)"
          >
            <q-tooltip>
              {{ $t('usuarios.modals.userManagement') }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-cellphone-wireless"
            @click="gerirWhatsappsUsuario(props.row)"
          >
            <q-tooltip>
              {{ $t('usuarios.modals.whatsappManagement') }}
            </q-tooltip>
          </q-btn>
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
        {{ usuarios.length }}/{{ usuarios.length }}
      </template>
    </q-table>
    <ModalUsuario
      v-model:modalUsuario="modalUsuario"
      @modalUsuario:usuario-editado="UPDATE_USUARIO"
      @modalUsuario:usuario-criado="usuarioCriado"
      v-model:usuarioEdicao="usuarioSelecionado"
    />
    <ModalFilaUsuario
      v-model:modalFilaUsuario="modalFilaUsuario"
      v-model:usuarioSelecionado="usuarioSelecionado"
      :filas="filas"
      @modalFilaUsuario:sucesso="UPDATE_USUARIO"
    />
    <ModalWhatsappUsuario
      v-model:modalWhatsappUsuario="modalWhatsappUsuario"
      v-model:usuarioSelecionado="usuarioSelecionado"
      :sessions="sessions"
      @modalWhatsappUsuario:sucesso="UPDATE_USUARIO"
    />
  </div>
</template>

<script>
import { ListarUsuarios, DeleteUsuario, UpdateIsOnlineUsuario } from 'src/service/user.js';
import { ListarFilas } from 'src/service/filas.js';
import { ListarWhatsapps } from 'src/service/sessoesWhatsapp.js'
import ModalUsuario from './ModalUsuario.vue';
import ModalFilaUsuario from './ModalFilaUsuario.vue';
import ModalWhatsappUsuario from './ModalWhatsappUsuario.vue';
import { MostrarCores } from 'src/service/empresas.js';

export default {
  name: 'IndexUsuarios',
  components: { ModalUsuario, ModalFilaUsuario, ModalWhatsappUsuario },
  data() {
    return {
      colors: {},
      userProfile: 'user',
      usuarios: [],
      usuarioSelecionado: {},
      modalUsuario: false,
      modalFilaUsuario: false,
      modalWhatsappUsuario: false,
      filas: [],
      sessions: [],
      statusOptions: [
        { label: 'Online', value: 'online', icon: 'mdi-account-check', color: 'positive' },
        { label: 'Offline', value: 'offline', icon: 'mdi-account-off', color: 'negative' }
      ],
      optionsProfile: [
        { value: 'user', label: this.$t('usuarios.profiles.user') },
        { value: 'super', label: this.$t('usuarios.profiles.super')},
        { value: 'admin', label: this.$t('usuarios.profiles.admin') },
        { value: 'superadmin', label: this.$t('usuarios.profiles.superadmin') }
      ],
      modalUsuario: false,
      filter: null,
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        page: 1
      },
      hasMore: true,
      loading: false,
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'name', label: 'Nome', field: 'name', align: 'left' },
        { name: 'email', label: this.$t('usuarios.email'), field: 'email', align: 'left' },
        { name: 'phone', label: this.$t('modalUsuario.phone'), field: 'phone', align: 'left' },
        { name: 'queues', label: 'Filas', field: 'queues', align: 'left', format: (v) => !v ? '' : v.map(f => f.queue).join(', '), classes: 'ellipsis', style: 'max-width: 400px;' },
        { name: 'whatsappAllowed', label: this.$t('usuarios.whatsappAllowed'), field: 'whatsappAllowed', align: 'left', format: v => !v ? '' : v.map(w => w.name).join(', '), classes: 'ellipsis', style: 'max-width: 400px;' },
        { name: 'profile', label: this.$t('usuarios.profile'), field: 'profile', align: 'left', format: v => this.optionsProfile.find(o => o.value === v).label },
        { name: 'restrictedUser', label: this.$t('usuarios.restrictedUser'), field: 'restrictedUser', align: 'left', format: v => v === 'enabled' ? '🔒 Habilitado' : '🔓 Desabilitado' },
        { name: 'isOnline', label: this.$t('usuarios.isOnline'), field: 'isOnline', align: 'left', format: val => val ? '🟢 Online' : '🔴 Offline' },
        { name: 'acoes', label: this.$t('usuarios.actions'), field: 'acoes', align: 'center' }
      ],
      // Sistema de gerenciamento de memória
      timers: []
    };
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
    },
    formatarMenuPermissions(menuPermissions) {
      let perms = menuPermissions;

      // Se for array (alguns usuários retornam array)
      if (Array.isArray(perms)) {
        perms = perms[0] || {};
      }

      // Retorna apenas os que são true
      return Object.fromEntries(
        Object.entries(perms).filter(([_, value]) => value === true)
      );
    },
    formatWavoip(value) {
      return value ? this.$t('common.yes') : this.$t('common.no');
    },
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
    async onVirtualScroll({ to }) {
      if (!this.loading && to >= this.usuarios.length - 5 && this.hasMore) {
        this.pagination.page++;
        await this.carregarMaisUsuarios();
      }
    },
    async carregarMaisUsuarios() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;

      try {
        const response = await ListarUsuarios({
          pageNumber: this.pagination.page,
          rowsPerPage: this.pagination.rowsPerPage,
          searchParam: this.filter
        });

        const { users, count } = response.data;

        // Adiciona o campo auxiliar _statusProxy para cada usuário
        users.forEach(u => {
          u._statusProxy = u.isOnline ? 'online' : 'offline';
        });

        const usersObj = [...this.usuarios, ...users];
        this.usuarios = usersObj.filter(usuario => usuario.profile !== 'superadmin');

        this.pagination.rowsNumber = this.usuarios.length;

        if (this.usuarios.length >= count) {
          this.hasMore = false;
        }
      } catch (error) {
        console.error(this.$t('usuarios.notifications.error'), error);
      } finally {
        this.loading = false;
      }
    },
    filtrarUsuario(data) {
      this.pagination.page = 1;
      this.usuarios = [];
      this.hasMore = true;
      this.carregarMaisUsuarios();
    },
    UPDATE_USUARIO(usuario) {
      let newUsuarios = [...this.usuarios];
      const usuarioIndex = newUsuarios.findIndex(c => c.id === usuario.id);
      if (usuarioIndex !== -1) {
        newUsuarios[usuarioIndex] = usuario;
      } else {
        newUsuarios = [usuario, ...newUsuarios];
      }
      this.usuarios = [...newUsuarios];
    },
    DELETE_USUARIO(userId) {
      const newObj = [...this.usuarios.filter(u => u.id !== userId)];
      this.usuarios = [...newObj];
    },
    usuarioCriado(usuario) {
      const obj = [...this.usuarios];
      obj.push(usuario);
      this.usuarios = [...obj];
    },
    editarUsuario(usuario) {
      this.usuarioSelecionado = usuario;
      this.modalUsuario = true;
    },
    deletarUsuario(usuario) {
      this.$q.dialog({
        title: this.$t('usuarios.modals.deleteConfirmation', { name: usuario.name }),
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
      }).onOk(() => {
        this.loading = true;
        DeleteUsuario(usuario.id)
          .then(() => {
            this.DELETE_USUARIO(usuario.id);
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('usuarios.notifications.userDeleted', { name: usuario.name }),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            });
          })
          .catch(error => {
            console.error(error);
            this.$notificarErro(this.$t('usuarios.notifications.deleteError'), error);
          })
          .finally(() => (this.loading = false));
      });
    },
    async listarFilas() {
      const { data } = await ListarFilas();
      this.filas = data;
    },
    async listarSessions(){
      const { data } = await ListarWhatsapps();
      this.sessions = data;
    },
    gerirFilasUsuario(usuario) {
      this.usuarioSelecionado = usuario;
      this.modalFilaUsuario = true;
    },
    gerirWhatsappsUsuario(usuario) {
      this.usuarioSelecionado = usuario;
      this.modalWhatsappUsuario = true;
    },
    getSipStatusIcon(status) {
      const statusMap = {
        'online': 'mdi-phone',
        'offline': 'mdi-phone-off',
        'busy': 'mdi-phone-busy',
        'unknown': 'mdi-help-circle'
      }
      return statusMap[status] || 'mdi-help-circle'
    },
    getSipStatusColor(status) {
      const colorMap = {
        'online': 'positive',
        'offline': 'negative',
        'busy': 'warning',
        'unknown': 'grey'
      }
      return colorMap[status] || 'grey'
    },
    getStatusIcon(status) {
      const statusMap = {
        'online': 'mdi-account-check',
        'offline': 'mdi-account-off'
      }
      return statusMap[status] || 'mdi-account-off'
    },
    getStatusColor(status) {
      const colorMap = {
        'online': 'positive',
        'offline': 'negative'
      }
      return colorMap[status] || 'negative'
    },
    getStatusLabel(status) {
      const statusMap = {
        'online': 'Online',
        'offline': 'Offline'
      }
      return statusMap[status] || 'Offline'
    },
    async updateStatus(usuario, status) {
      if (this.isCurrentUser(usuario)) {
        this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          message: this.$t('usuarios.notifications.changeStatusInToolbar'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
        return;
      }

      const isOnline = status === 'online';

      try {
        await UpdateIsOnlineUsuario(usuario.id, { isOnline });
        // usuario.isOnline = isOnline;
        // usuario._statusProxy = isOnline ? 'online' : 'offline';

        // try{
        //   const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
        //   const usuarioNovo = { ...usuarioLogado, isOnline, status: usuario._statusProxy }
        //   localStorage.setItem('usuario', JSON.stringify(usuarioNovo))
        // }catch(error){
        //   console.error(error)
        // }

        this.$q.notify({
          type: 'positive',
          progress: true,
          position: 'top',
          message: this.$t('usuarios.notifications.statusUpdated'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        });
      } catch (error) {
        console.error(error);
        this.$notificarErro(this.$t('usuarios.notifications.statusUpdateError'), error);
      }
    },
    isCurrentUser(usuario) {
      try {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
        return usuarioLogado && usuarioLogado.userId === usuario.id;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  },
  async mounted() {
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
    await this.listarSessions();
    await this.listarFilas();
    await this.carregarMaisUsuarios();
    this.userProfile = localStorage.getItem('profile');
    // this.loadColors();
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
};
</script>

<style lang="sass">
.my-sticky-dynamic
  background: rgba(255, 255, 255, 0.85)
  backdrop-filter: blur(12px)
  border-radius: 16px
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
  border: 1px solid rgba(255, 255, 255, 0.2)
  transition: all 0.3s ease

  .q-table__title
    font-size: 1.5rem
    font-weight: 600
    color: var(--q-primary)
    padding: 1rem

  .q-table__top
    background: rgba(255, 255, 255, 0.5)
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    padding: 8px 16px

    .q-btn
      min-width: 32px
      min-height: 32px
      padding: 4px 12px
      font-size: 0.75rem
      border-radius: 6px
      font-weight: 500
      letter-spacing: 0.3px
      transition: all 0.2s ease

      &:hover
        transform: translateY(-1px)
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)

  .q-table thead th
    background: rgba(var(--q-primary-rgb), 0.1)
    color: var(--q-primary)
    font-weight: 600
    font-size: 0.9rem
    padding: 12px 16px
    transition: all 0.3s ease

  .q-table tbody td
    padding: 12px 16px
    transition: all 0.3s ease

  .q-table tbody tr
    transition: all 0.3s ease
    
    &:hover
      background: rgba(var(--q-primary-rgb), 0.05)
      transform: translateY(-1px)

  .q-input
    .q-field__control
      border-radius: 12px
      background: rgba(255, 255, 255, 0.7)
      border: 1px solid rgba(255, 255, 255, 0.3)
      transition: all 0.3s ease

      &:hover
        background: rgba(255, 255, 255, 0.9)
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)

  .blur-effect
    filter: blur(0px)
    transition: all 0.3s ease
    
    &:hover
      filter: blur(0px)

  ol
    li
      transition: all 0.3s ease
      padding: 4px 0
      
      &:hover
        transform: translateX(5px)
        color: var(--q-primary)

body.body--dark
  .my-sticky-dynamic
    background: rgba(30, 30, 30, 0.85)
    border-color: rgba(255, 255, 255, 0.1)

    .q-table thead th
      background: rgba(255, 255, 255, 0.05)

    .q-table tbody tr:hover
      background: rgba(255, 255, 255, 0.05)

    .q-input .q-field__control
      background: rgba(255, 255, 255, 0.05)
      border-color: rgba(255, 255, 255, 0.1)

      &:hover
        background: rgba(255, 255, 255, 0.08)

@media (max-width: 600px)
  .my-sticky-dynamic
    margin: 0.5rem
    
    .q-table__title
      font-size: 1.2rem

    .q-table thead th,
    .q-table tbody td
      padding: 8px 12px

    .q-table__top
      .q-btn
        min-width: 28px
        min-height: 28px
        padding: 2px 8px
        font-size: 0.7rem
</style>
