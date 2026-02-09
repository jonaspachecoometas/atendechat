<template>
  <q-dialog
    persistent
    v-model="dialogProxy"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card style="width: 98vw; max-width: 1200px">
      <q-card-section>
        <div class="text-h6">{{ usuario.id ? $t('modalUsuario.titleEdit') : $t('common.add') }}</div>
      </q-card-section>
      <q-card-section class="q-col-gutter-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-5">
            <c-input
              outlined
              v-model.trim="usuario.name"
              :validator="v$.usuario.name"
              @blur="v$.usuario.name.$touch"
              :label="$t('modalUsuario.name')"
            />
          </div>
          <div class="col-7">
            <c-input
              outlined
              :validator="v$.usuario.email"
              @blur="v$.usuario.email.$touch"
              v-model.trim="usuario.email"
              :label="$t('modalUsuario.email')"
            />
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <c-input
              outlined
              v-model.trim="usuario.phone"
              :label="$t('modalUsuario.phone')"
              :hint="$t('modalUsuario.phoneHint')"
            />
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-5">
            <c-input
              outlined
              v-model="usuario.password"
              :validator="v$.usuario.password"
              @blur="v$.usuario.password.$touch"
              :type="isPwd ? 'password' : 'text'"
              :label="$t('modalUsuario.password')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </c-input>
          </div>
          <div class="col-7">
            <q-select
              :disable="isProfile"
              outlined
              v-model="usuario.profile"
              :options="optionsProfile"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              :label="$t('modalUsuario.profile')"
            />
          </div>
          <div class="col-12" v-if="userProfile === 'admin' && ['user', 'super'].includes(usuario.profile)">
            <q-checkbox
              v-model="usuario.blockWavoip"
              :label="$t('modalUsuario.blockWavoip')"
            />
            <p style="font-size: 12px;">{{ $t('modalUsuario.blockWavoipHint') }}</p>
          </div>
          <div class="col-12" v-if="userProfile === 'admin'">
            <div class="row items-center q-mb-xs">
              <span class="q-field-label">{{ $t('modalUsuario.restrictedUser') }}</span>
              <q-icon name="help" class="q-ml-sm" color="primary" size="sm">
                <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4" style="max-width: 400px;">
                  <div class="text-weight-medium q-mb-xs">{{ $t('modalUsuario.restrictedUserInfo') }}</div>
                  <ul class="q-pl-md" style="margin: 0; padding-left: 20px;">
                    <li>{{ $t('modalUsuario.restrictedUserRestriction1') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction2') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction3') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction4') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction5') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction6') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction7') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction8') }}</li>
                    <li>{{ $t('modalUsuario.restrictedUserRestriction9') }}</li>
                  </ul>
                </q-tooltip>
              </q-icon>
            </div>
            <q-select
              outlined
              v-model="usuario.restrictedUser"
              :options="restrictedUserOptions"
              option-value="value"
              option-label="label"
              emit-value
              map-options
            />
          </div>
          <div class="col-12" v-if="userProfile === 'admin' && ['user', 'super'].includes(usuario.profile)">
            <q-expansion-item
              :label="$t('modalUsuario.visibleMenu')"
              icon="mdi-eye"
              expand-separator
              dense
              v-if="usuario.profile !== 'superadmin'"
            >
              <div class="row q-col-gutter-md">
                <div
                  class="col-6"
                  v-for="(value, key) in filteredMenus"
                  :key="key"
                >
                  <q-toggle
                    v-model="usuario.menuPermissions[key]"
                    :label="menuLabels[key] || key"
                    color="primary"
                  />
                </div>
              </div>
            </q-expansion-item>
          </div>
          <div class="col-12" v-if="userProfile === 'admin'">
            <q-expansion-item
              :label="$t('modalUsuario.configSip')"
              icon="mdi-phone"
              expand-separator
              dense
            >
              <template v-slot:header>
                <div class="row items-center">
                  <span>{{ $t('modalUsuario.configSip') }}</span>
                  <q-icon name="help" class="q-ml-sm" color="primary">
                    <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4">
                      <span class="text-weight-medium">{{ $t('modalUsuario.sipConfigInfo') }}</span>
                      <span class="row col">{{ $t('modalUsuario.sipWebRTCInfo') }}</span>
                      <span class="row col">{{ $t('modalUsuario.sipWSSInfo') }}</span>
                    </q-tooltip>
                  </q-icon>
                </div>
              </template>
              <div class="row q-col-gutter-md">
                <div class="col-2">
                  <q-checkbox
                    v-model="usuario.sipEnabled"
                    :label="$t('modalUsuario.sipEnabled')"
                  />
                </div>
                <div class="col-2">
                  <c-input
                    outlined
                    v-model="usuario.sipUsername"
                    :label="$t('modalUsuario.sipUser')"
                    :disable="!usuario.sipEnabled"
                  />
                </div>
                <div class="col-2">
                  <c-input
                    outlined
                    v-model="usuario.sipPassword"
                    :label="$t('modalUsuario.sipPassword')"
                    :type="isSipPwd ? 'password' : 'text'"
                    :disable="!usuario.sipEnabled"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isSipPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isSipPwd = !isSipPwd"
                      />
                    </template>
                  </c-input>
                </div>
                <div class="col-2">
                  <c-input
                    outlined
                    v-model="usuario.sipServer"
                    :label="$t('modalUsuario.sipServer')"
                    :disable="!usuario.sipEnabled"
                  />
                </div>
                <div class="col-2">
                  <c-input
                    outlined
                    v-model.number="usuario.sipPort"
                    :label="$t('modalUsuario.sipPort')"
                    type="number"
                    :disable="!usuario.sipEnabled"
                  />
                </div>
              </div>
            </q-expansion-item>
          </div>
          <div class="col-12" v-if="userProfile === 'admin' || userProfile === 'superadmin'">
            <q-expansion-item
              :label="$t('modalUsuario.horarioAtendimento')"
              icon="mdi-clock-outline"
              expand-separator
              dense
              v-model="businessHoursExpanded"
            >
              <BusinessHours 
                ref="businessHoursComponent"
                :value="usuario.businessHours"
                style="margin-top: 10px;" 
                @input="onBusinessHoursChange"
                @update:value="onBusinessHoursChange"
              />
            </q-expansion-item>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="$t('common.out')"
          class="q-px-md q-mr-sm"
          color="negative"
          v-close-popup
        />
        <q-btn
          :label="$t('common.save')"
          class="q-px-md"
          color="primary"
          @click="handleUsuario"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { CriarUsuario, UpdateUsuarios, DadosUsuario } from 'src/service/user.js'
import { Notify } from 'quasar'
import BusinessHours from 'src/components/BusinessHours.vue'

export default {
  name: 'ModalUsuario',
  setup () { return { v$: useVuelidate() } },
  components: { BusinessHours },
  props: {
    modalUsuario: {
      type: Boolean,
      default: false
    },
    isProfile: {
      type: Boolean,
      default: false
    },
    usuarioEdicao: {
      type: Object,
      default: () => { return { id: null } }
    }
  },
  data () {
    return {
      userProfile: 'user',
      isPwd: false,
      isSipPwd: true,
      businessHoursExpanded: false,
      // Labels em maiúsculas, valores em minúsculas conforme ENUM do backend
      sipTransportOptions: [
        { label: 'WS', value: 'ws' },
        { label: 'UDP', value: 'udp' },
        { label: 'TCP', value: 'tcp' },
        { label: 'TLS', value: 'tls' }
      ],
      optionsProfile: [
        { value: 'user', label: this.$t('usuarios.profiles.user') },
        { value: 'super', label: this.$t('usuarios.profiles.super') },
        { value: 'admin', label: this.$t('usuarios.profiles.admin') }
      ],
      restrictedUserOptions: [
        { value: 'disabled', label: this.$t('modalUsuario.restrictedUserDisabled') },
        { value: 'enabled', label: this.$t('modalUsuario.restrictedUserEnabled') }
      ],
      usuario: {
        name: '',
        email: '',
        password: '',
        profile: 'user',
        blockWavoip: false,
        restrictedUser: 'disabled',
        phone: '',
        sipEnabled: false,
        sipUsername: '',
        sipPassword: '',
        sipServer: '',
        sipPort: 8089,
        // Backend ENUM aceita: 'ws' | 'udp' | 'tcp' | 'tls'
        sipTransport: 'ws',
        sipStatus: 'offline',
        businessHours: [],
        menuPermissions: {
          'massa': true,
          'grupo': true,
          'chat-privado': true,
          'kanban': true,
          'tarefas': true,
          'sessoes': true,
          'relatorios': true,
          'filas': true,
          'equipes': true,
          'mensagens-rapidas': true,
          'chat-flow': true,
          'agendamentos': true,
          'aniversarios': true,
          'fechamento': true,
          'etiquetas': true,
          'notas': true,
          'protocolos': true,
          'avaliacoes': true,
          'horarioAtendimento': true,
          'campanhas': true
        },
      },
      menuLabels: {
          'massa': this.$t('modalUsuario.massa'),
          'grupo': this.$t('modalUsuario.grupo'),
          'chat-privado': this.$t('modalUsuario.chatprivado'),
          'kanban': this.$t('modalUsuario.kanban'),
          'tarefas': this.$t('modalUsuario.tarefas'),
          'sessoes': this.$t('modalUsuario.sessoes'),
          'relatorios': this.$t('modalUsuario.relatorios'),
          'filas': this.$t('modalUsuario.filas'),
          'equipes': this.$t('modalUsuario.equipes'),
          'mensagens-rapidas': this.$t('modalUsuario.mensagensrapidas'),
          'chat-flow': this.$t('modalUsuario.chatflow'),
          'agendamentos': this.$t('modalUsuario.agendamentos'),
          'aniversarios': this.$t('modalUsuario.aniversarios'),
          'fechamento': this.$t('modalUsuario.fechamento'),
          'etiquetas': this.$t('modalUsuario.etiquetas'),
          'notas': this.$t('modalUsuario.notas'),
          'protocolos': this.$t('modalUsuario.protocolos'),
          'avaliacoes': this.$t('modalUsuario.avaliacoes'),
          'horarioAtendimento': this.$t('modalUsuario.horarioAtendimento'),
          'campanhas': this.$t('modalUsuario.campanhas')
        }
    }
  },
  computed: {
    dialogProxy: {
      get () { return this.modalUsuario },
      set (v) { this.$emit('update:modalUsuario', v) }
    },
    filteredMenus() {
      const perfil = this.usuario.profile
      const permissoesPermitidas = {
        user: ['massa', 'campanhas', 'grupo', 'chat-privado', 'kanban', 'tarefas'],
        super: Object.keys(this.usuario.menuPermissions),
        admin: Object.keys(this.usuario.menuPermissions)
      }

      const chavesPermitidas = permissoesPermitidas[perfil] || []

      return Object.fromEntries(
        Object.entries(this.usuario.menuPermissions).filter(([key]) =>
          chavesPermitidas.includes(key)
        )
      )
    }
  },
  validations () {
    let usuario = {
      name: { required, minLength: minLength(3), maxLength: maxLength(50) },
      email: { required, email },
      profile: { required },
      password: {}
    }
    if (!this.usuario.id) {
      usuario = {
        ...usuario,
        password: { required, minLength: minLength(6), maxLength: maxLength(50) }
      }
    }
    return { usuario }
  },
  methods: {
    getDefaultBusinessHours() {
      // Retorna os valores padrão do componente BusinessHours
      return [
        { day: 0, label: this.$t('businessHours.days.0'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 1, label: this.$t('businessHours.days.1'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 2, label: this.$t('businessHours.days.2'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 3, label: this.$t('businessHours.days.3'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 4, label: this.$t('businessHours.days.4'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 5, label: this.$t('businessHours.days.5'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 6, label: this.$t('businessHours.days.6'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' }
      ]
    },
    onBusinessHoursChange(newValue) {
      // Verificar se é um array válido antes de processar
      if (Array.isArray(newValue)) {
        // Usar JSON para criar uma cópia profunda e evitar referências
        this.usuario.businessHours = JSON.parse(JSON.stringify(newValue));
      }
    },
    abrirModal () {
      const edicao = this.usuarioEdicao
      const baseMenuPermissions = {
        'massa': true, 'grupo': true, 'chat-privado': true, 'kanban': true, 'tarefas': true,
        'sessoes': true, 'relatorios': true, 'filas': true, 'equipes': true, 'mensagens-rapidas': true,
        'chat-flow': true, 'agendamentos': true, 'aniversarios': true, 'fechamento': true,
        'etiquetas': true, 'notas': true, 'protocolos': true, 'avaliacoes': true,
        'horarioAtendimento': true, 'campanhas': true
      }
      this.usuario = {
        id: edicao.id,
        name: edicao.name,
        email: edicao.email,
        profile: edicao.profile || 'user',
        blockWavoip: edicao.blockWavoip || false,
        restrictedUser: edicao.restrictedUser || 'disabled',
        phone: edicao.phone || '',
        sipEnabled: edicao.sipEnabled || false,
        sipUsername: edicao.sipUsername || '',
        sipPassword: edicao.sipPassword || '',
        sipServer: edicao.sipServer || '',
        sipPort: edicao.sipPort || 8089,
        sipTransport: edicao.sipTransport || 'ws',
        sipStatus: edicao.sipStatus || 'offline',
        businessHours: Array.isArray(edicao.businessHours) ? edicao.businessHours : [],
        menuPermissions: {
          ...baseMenuPermissions,
          ...(Array.isArray(edicao.menuPermissions) ? edicao.menuPermissions[0] : edicao.menuPermissions || {})
        }
      }
      if (this.usuarioEdicao.id) {
        this.usuario = { ...this.usuarioEdicao, blockWavoip: this.usuarioEdicao.blockWavoip || false,
          restrictedUser: this.usuarioEdicao.restrictedUser || 'disabled',
          phone: this.usuarioEdicao.phone || '',
          sipEnabled: this.usuarioEdicao.sipEnabled || false,
          sipUsername: this.usuarioEdicao.sipUsername || '',
          sipPassword: this.usuarioEdicao.sipPassword || '',
          sipServer: this.usuarioEdicao.sipServer || '',
          sipPort: this.usuarioEdicao.sipPort || 8089,
          sipTransport: this.usuarioEdicao.sipTransport || 'ws',
          sipStatus: this.usuarioEdicao.sipStatus || 'offline',
          businessHours: this.usuarioEdicao.businessHours || [],
          menuPermissions: {
            ...baseMenuPermissions,
            ...(Array.isArray(this.usuarioEdicao.menuPermissions) ? this.usuarioEdicao.menuPermissions[0] : this.usuarioEdicao.menuPermissions || {})
          }
         };
      }
      if (this.usuarioEdicao.userId) {
        this.usuario = {
          ...this.usuarioEdicao,
          id: this.usuarioEdicao.userId,
          name: this.usuarioEdicao.username,
          profile: this.usuarioEdicao.profile,
          blockWavoip: this.usuarioEdicao.blockWavoip,
          restrictedUser: this.usuarioEdicao.restrictedUser || 'disabled',
          phone: this.usuarioEdicao.phone || '',
          sipEnabled: this.usuarioEdicao.sipEnabled || false,
          sipUsername: this.usuarioEdicao.sipUsername || '',
          sipPassword: this.usuarioEdicao.sipPassword || '',
          sipServer: this.usuarioEdicao.sipServer || '',
          sipPort: this.usuarioEdicao.sipPort || 8089,
          sipTransport: this.usuarioEdicao.sipTransport || 'ws',
          sipStatus: this.usuarioEdicao.sipStatus || 'offline',
          businessHours: this.usuarioEdicao.businessHours || [],
          menuPermissions: {
            ...baseMenuPermissions,
            ...(Array.isArray(this.usuarioEdicao.menuPermissions) ? this.usuarioEdicao.menuPermissions[0] : this.usuarioEdicao.menuPermissions || {})
          }
        }
      }
      
      // Se for novo usuário (sem id e sem userId), expandir e inicializar com valores padrão
      if (!this.usuarioEdicao.id && !this.usuarioEdicao.userId) {
        this.usuario.businessHours = this.getDefaultBusinessHours()
        this.businessHoursExpanded = true
      } else {
        // Se for edição, expandir apenas se já tiver horários configurados
        this.businessHoursExpanded = Array.isArray(this.usuario.businessHours) && this.usuario.businessHours.length > 0
      }
    },
    fecharModal () {
      if (!this.isProfile) {
        this.$emit('update:usuarioEdicao', {})
      }
      this.$emit('update:modalUsuario', false)
      const baseMenuPermissions = {
        'massa': true, 'grupo': true, 'chat-privado': true, 'kanban': true, 'tarefas': true,
        'sessoes': true, 'relatorios': true, 'filas': true, 'equipes': true, 'mensagens-rapidas': true,
        'chat-flow': true, 'agendamentos': true, 'aniversarios': true, 'fechamento': true,
        'etiquetas': true, 'notas': true, 'protocolos': true, 'avaliacoes': true,
        'horarioAtendimento': true, 'campanhas': true
      }
      this.usuario = {
        name: '',
        email: '',
        password: '',
        profile: 'user',
        blockWavoip: false,
        restrictedUser: 'disabled',
        phone: '',
        sipEnabled: false,
        sipUsername: '',
        sipPassword: '',
        sipServer: '',
        sipPort: 8089,
        sipTransport: 'ws',
        sipStatus: 'offline',
        businessHours: [],
        // voltar ao objeto padrão em vez de array vazio
        menuPermissions: baseMenuPermissions
      }
      this.isPwd = false
      this.isSipPwd = true
      this.businessHoursExpanded = false
      this.v$.usuario.$reset()
    },
    async handleUsuario () {
      this.v$.usuario.$touch()
      if (this.v$.usuario.$error) {
        return this.$q.notify({
          type: 'warning',
          progress: true,
          position: 'top',
          message: this.$t('modalUsuario.errorValidation'),
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      }

      // Validar horários de atendimento antes de salvar
      if (this.$refs.businessHoursComponent) {
        const validationErrors = this.$refs.businessHoursComponent.validateAllBusinessHours();
        
        if (validationErrors.length > 0) {
          const errorMessage = validationErrors.join('\n');
          return this.$q.notify({
            color: 'negative',
            position: 'top',
            message: this.$t('horarioAtendimento.notifications.validationError'),
            caption: errorMessage,
            timeout: 8000,
            multiLine: true,
            actions: [{ icon: 'close', color: 'white' }]
          });
        }
      }

      try {
        const baseParams = {
          name: this.usuario.name,
          email: this.usuario.email,
          password: this.usuario.password,
          profile: this.usuario.profile,
          blockWavoip: this.usuario.blockWavoip || false,
          restrictedUser: this.usuario.restrictedUser || 'disabled',
          // garantir objeto, mesmo que tenha sido alterado inadvertidamente
          menuPermissions: (this.usuario.menuPermissions && typeof this.usuario.menuPermissions === 'object' && !Array.isArray(this.usuario.menuPermissions))
            ? this.usuario.menuPermissions
            : {},
          sipEnabled: this.usuario.sipEnabled || false,
          sipUsername: this.usuario.sipUsername || '',
          sipPassword: this.usuario.sipPassword || '',
          sipServer: this.usuario.sipServer || '',
          sipPort: this.usuario.sipPort || 8089,
          // manter valores esperados pelo ENUM do backend (minúsculas)
          sipTransport: String(this.usuario.sipTransport || 'ws').toLowerCase(),
          sipStatus: this.usuario.sipStatus || 'offline',
          businessHours: this.usuario.businessHours || [],
          phone: this.usuario.phone || ''
        }

        if (this.usuario.id) {
          const params = {
            id: this.usuario.id,
            ...baseParams
          }

          if (this.$store.state.user.isAdmin) {
            params.profile = this.usuario.profile
          }

          const { data } = await UpdateUsuarios(this.usuario.id, params)
          this.$emit('modalUsuario:usuario-editado', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalUsuario.successEdit'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarUsuario(baseParams)
          this.$emit('modalUsuario:usuario-criado', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalUsuario.successCreate'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }

        this.$emit('update:modalUsuario', false)
      } catch (error) {
        if (error?.data && error?.data?.error === 'ERR_USER_LIMIT_USER_CREATION') {
          Notify.create({
            type: 'negative',
            message: this.$t('modalUsuario.errorLimit'),
            caption: 'ERR_USER_LIMIT_USER_CREATION',
            position: 'top',
            progress: true
          })
        } else if (error?.data?.error?.includes('SequelizeUniqueConstraintError') || 
                   error?.data?.error?.includes('Validation error') ||
                   error?.response?.data?.error?.includes('SequelizeUniqueConstraintError') ||
                   error?.response?.data?.error?.includes('Validation error')) {
          Notify.create({
            type: 'negative',
            message: this.$t('modalUsuario.tryAgain'),
            position: 'top',
            progress: true
          })
        } else {
          Notify.create({
            type: 'negative',
            message: error?.data?.error || 'Erro ao salvar usuário',
            position: 'top',
            progress: true
          })
        }
      }
    }
  },
  mounted(){
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: modalFadeIn 0.3s ease-out;
  }
}

.q-card-section {
  .text-h6 {
    color: var(--q-primary);
    font-weight: 600;
    margin-bottom: 1rem;
  }
}

.q-select, .c-input {
  .q-field__control {
    border-radius: 12px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .q-field__control:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.9);
  }
}

.q-checkbox {
  margin: 8px 0;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(var(--q-primary-rgb), 0.05);
    transform: translateX(5px);
  }
  
  .q-checkbox__inner {
    transition: all 0.3s ease;
  }
  
  &:hover .q-checkbox__inner {
    transform: scale(1.1);
  }
}

.q-expansion-item {
  border-radius: 12px;
  overflow: hidden;
  margin: 8px 0;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
  
  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
  
  &__content {
    background: rgba(255, 255, 255, 0.3);
    padding: 16px;
  }
}

.q-toggle {
  margin: 8px 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
}

.q-card-actions {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.5);
  
  .q-btn {
    border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    padding: 8px 24px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

/* Estilos para o modo escuro */
body.body--dark {
  .q-dialog .q-card {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .q-select .q-field__control,
  .c-input .q-field__control {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .q-expansion-item {
    background: rgba(255, 255, 255, 0.05);
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
    
    &__content {
      background: rgba(255, 255, 255, 0.03);
    }
  }

  .q-card-actions {
    background: rgba(255, 255, 255, 0.05);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}

/* Animações */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-dialog .q-card {
    width: 95vw !important;
    margin: 0.5rem;
  }

  .q-card-section {
    padding: 1rem;
  }

  .q-card-actions {
    padding: 1rem;
    
    .q-btn {
      padding: 6px 16px;
    }
  }
}
</style>
