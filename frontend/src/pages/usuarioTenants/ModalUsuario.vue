<template>
  <q-dialog
    persistent
    :model-value="modalUsuario"
    @update:model-value="v => $emit('update:modalUsuario', v)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card style="width: 98vw; max-width: 1200px">
      <q-card-section>
        <div class="text-h6">{{ $t('modalUsuariosTenants.title') }}</div>
      </q-card-section>
      <q-card-section class="q-col-gutter-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-5">
            <q-select
              :disable="!!usuario.id"
              outlined
              v-model="usuario.tenantId"
              :options="filteredTenants"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              :label="$t('modalUsuariosTenants.tenantLabel')"
            />
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-5">
            <c-input
              outlined
              v-model.trim="usuario.name"
              :validator="v$.usuario.name"
              @blur="v$.usuario.name.$touch"
              :label="$t('modalUsuariosTenants.nameLabel')"
            />
          </div>
          <div class="col-7">
            <c-input
              outlined
              :validator="v$.usuario.email"
              @blur="v$.usuario.email.$touch"
              v-model.trim="usuario.email"
              :label="$t('modalUsuariosTenants.emailLabel')"
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
              :label="$t('modalUsuariosTenants.passwordLabel')"
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
              :label="$t('modalUsuariosTenants.profileLabel')"
            />
          </div>
          <div class="col-12" v-if="userProfile === 'admin' && ['user', 'super'].includes(usuario.profile)">
            <q-checkbox
              v-model="usuario.blockWavoip"
              :label="$t('modalUsuario.blockWavoip')"
            />
            <p style="font-size: 12px;">{{ $t('modalUsuario.blockWavoipHint') }}</p>
          </div>
          <div class="col-12" v-if="userProfile === 'admin' || userProfile === 'superadmin'">
            <q-select
              outlined
              v-model="usuario.restrictedUser"
              :options="restrictedUserOptions"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              :label="$t('modalUsuario.restrictedUser')"
            />
          </div>
          <div class="col-12" v-if="(userProfile === 'admin' || userProfile === 'superadmin') && ['user', 'super'].includes(usuario.profile)">
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
          <div class="col-12" v-if="userProfile === 'admin' || userProfile === 'superadmin'">
            <q-expansion-item
              label="Horário de Atendimento"
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
import { CriarUsuarioTenant, UpdateUsuariosTenant } from 'src/service/user.js'
import { ListarTenants } from 'src/service/tenants.js'
import { Notify } from 'quasar'
import BusinessHours from 'src/components/BusinessHours.vue'

export default {
  name: 'ModalUsuario',
  components: { BusinessHours },
  setup () { return { v$: useVuelidate() } },
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
      tenants: [],
      isPwd: false,
      businessHoursExpanded: false,
      optionsProfile: [
        { value: 'user', label: this.$t('usuarios.profiles.user') },
        { value: 'super', label: this.$t('usuarios.profiles.super') },
        { value: 'admin', label: this.$t('usuarios.profiles.admin') },
        { value: 'superadmin', label: this.$t('usuarios.profiles.superadmin')  }
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
        tenantId: '',
        blockWavoip: false,
        restrictedUser: 'disabled',
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
        }
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
    filteredTenants() {
      return this.tenants
        .map(tenant => ({ label: tenant.name, value: tenant.id }))
        .sort((a, b) => {
          // Ordenar alfabeticamente por nome (label), ignorando maiúsculas/minúsculas
          return a.label.localeCompare(b.label, undefined, { 
            sensitivity: 'base',
            numeric: true 
          });
        });
    },
    filteredMenus() {
      const perfil = this.usuario.profile
      const permissoesPermitidas = {
        user: ['massa', 'grupo', 'chat-privado', 'kanban', 'tarefas'],
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
      tenantId: { required },
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
  created() {
    this.listarTenants();
  },
  mounted() {
    this.userProfile = localStorage.getItem('profile')
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
    async listarTenants () {
      const { data } = await ListarTenants()
      this.tenants = data
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
      
      if (this.usuarioEdicao.id) {
        this.usuario = { 
          ...this.usuarioEdicao,
          blockWavoip: this.usuarioEdicao.blockWavoip || false,
          restrictedUser: this.usuarioEdicao.restrictedUser || 'disabled',
          phone: this.usuarioEdicao.phone || '',
          businessHours: Array.isArray(this.usuarioEdicao.businessHours) ? this.usuarioEdicao.businessHours : [],
          menuPermissions: {
            ...baseMenuPermissions,
            ...(this.usuarioEdicao.menuPermissions || {})
          }
        }
      } else if (this.usuarioEdicao.userId) {
        this.usuario = {
          ...this.usuarioEdicao,
          id: this.usuarioEdicao.userId,
          name: this.usuarioEdicao.username,
          profile: this.usuarioEdicao.profile,
          tenantId: this.usuarioEdicao.tenantId,
          blockWavoip: this.usuarioEdicao.blockWavoip || false,
          restrictedUser: this.usuarioEdicao.restrictedUser || 'disabled',
          phone: this.usuarioEdicao.phone || '',
          businessHours: Array.isArray(this.usuarioEdicao.businessHours) ? this.usuarioEdicao.businessHours : [],
          menuPermissions: {
            ...baseMenuPermissions,
            ...(this.usuarioEdicao.menuPermissions || {})
          }
        }
      } else {
        // Novo usuário - inicializar com valores padrão para permitir edição
        this.usuario.businessHours = this.getDefaultBusinessHours()
        // Expandir o horário de atendimento para novo usuário
        this.businessHoursExpanded = true
      }
      
      // Se for edição, manter fechado por padrão (ou expandir se já tiver horários configurados)
      if (this.usuarioEdicao.id || this.usuarioEdicao.userId) {
        this.businessHoursExpanded = Array.isArray(this.usuario.businessHours) && this.usuario.businessHours.length > 0
      }
    },
    fecharModal () {
      if (!this.isProfile) {
        this.$emit('update:usuarioEdicao', {})
      }
      this.$emit('update:modalUsuario', false)
      this.usuario = {
        name: '',
        email: '',
        password: '',
        profile: 'user',
        tenantId: '',
        phone: '',
        blockWavoip: false,
        restrictedUser: 'disabled',
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
        }
      }
      this.isPwd = false
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
          message: this.$t('modalUsuariosTenants.validationError'),
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
        if (this.usuario.id) {
          const {
            email, id, name, tenantId, password, profile, blockWavoip, restrictedUser, businessHours, menuPermissions, phone
          } = this.usuario

          const params = { 
            email, 
            id, 
            name, 
            tenantId, 
            password, 
            profile, 
            blockWavoip, 
            restrictedUser: restrictedUser || 'disabled',
            businessHours: businessHours || [], 
            menuPermissions,
            phone: phone || ''
          }

          const { data } = await UpdateUsuariosTenant(this.usuario.id, params)
          this.$emit('modalUsuario:usuario-editado', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalUsuariosTenants.saveSuccess'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          // Garantir que businessHours seja sempre um array válido
          const businessHoursValue = Array.isArray(this.usuario.businessHours) 
            ? this.usuario.businessHours 
            : [];
          
          const params = {
            ...this.usuario,
            restrictedUser: this.usuario.restrictedUser || 'disabled',
            businessHours: businessHoursValue
          }
          const { data } = await CriarUsuarioTenant(params)
          this.$emit('modalUsuario:usuario-criado', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalUsuariosTenants.createSuccess'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.$emit('update:modalUsuario', false)
      } catch (error) {
        console.error(error, error.data.error === 'ERR_USER_LIMIT_USER_CREATION')
        if (error.data.error === 'ERR_USER_LIMIT_USER_CREATION') {
          Notify.create({
            type: 'negative',
            message: this.$t('modalUsuariosTenants.userLimitError'),
            caption: 'ERR_USER_LIMIT_USER_CREATION',
            position: 'top',
            progress: true
          })
        } else if (error.data?.error?.includes('SequelizeUniqueConstraintError') || 
                   error.data?.error?.includes('Validation error') ||
                   error?.response?.data?.error?.includes('SequelizeUniqueConstraintError') ||
                   error?.response?.data?.error?.includes('Validation error')) {
          Notify.create({
            type: 'negative',
            message: this.$t('modalUsuariosTenants.tryAgain'),
            position: 'top',
            progress: true
          })
        } else {
          Notify.create({
            type: 'negative',
            message: this.$t('modalUsuario.emailAlreadyExists') + error.data.error,
            position: 'top',
            progress: true
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
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
    background: rgba(255, 255, 255, 0.9);
  }

  .q-field__control:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
}

.q-checkbox {
  margin: 8px 0;
  
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
  
  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
  
  &__content {
    background: rgba(255, 255, 255, 0.5);
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
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
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
    background: rgba(30, 30, 30, 0.98);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .q-select .q-field__control,
  .c-input .q-field__control {
    background: rgba(255, 255, 255, 0.05);
  }

  .q-expansion-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .q-card-actions {
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
