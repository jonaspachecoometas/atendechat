<template>
  <div>
    <div class="row">
      <div class="col">
        <q-table
          style="border-radius: 8px !important;"
          square
          flat
          bordered
          class="my-sticky-dynamic q-ma-lg"
          :title="$t('listChatflow.title')"
          hide-bottom
          :rows="listachatFlow"
          :columns="columns"
          :loading="loading"
          row-key="id"
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:top-right>
            <q-btn
              class="q-ml-md"
              color="primary"
              :label="$t('common.add')"
              @click="chatFlowSelecionado = {}; modalChatFlow = true"
            />
          </template>
          <template v-slot:body-cell-isActive="props">
            <q-td class="text-center">
              <q-icon
                size="16px"
                :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
                :color="props.value ? 'positive' : 'negative'"
                class=""
              />
              {{ props.value ? $t('listChatflow.status.active') : $t('listChatflow.status.inactive') }}
            </q-td>
          </template>
          <template v-slot:body-cell-acoes="props">
            <q-td class="text-center">
              <q-btn
                color="primary"
                icon="edit"
                flat
                round
                class="bg-padrao q-mx-sm"
                @click="editFlow(props.row)"
              >
                <q-tooltip>
                  {{ $t('listChatflow.actions.edit') }}
                </q-tooltip>
              </q-btn>
              <q-btn
                color="primary"
                icon="mdi-content-duplicate"
                flat
                round
                class="bg-padrao q-mx-sm"
                @click="duplicarFluxo(props.row)"
              >
                <q-tooltip>
                  {{ $t('listChatflow.actions.duplicate') }}
                </q-tooltip>
              </q-btn>
              <q-btn-dropdown
                color="primary"
                icon="mdi-sitemap"
                flat
                round
                class="bg-padrao q-mx-sm"
                style="padding-left: 10px !important;"
              >
                <q-tooltip>
                  {{ $t('listChatflow.actions.open') }}
                </q-tooltip>
                <q-list>
                  <q-item clickable v-close-popup @click="abrirFluxo(props.row, false)">
                    <q-item-section avatar>
                      <q-icon name="mdi-sitemap" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ $t('listChatflow.actions.newVersion') }}</q-item-label>
                      <q-item-label caption>{{ $t('listChatflow.actions.newVersionDesc') }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="abrirFluxo(props.row, true)">
                    <q-item-section avatar>
                      <q-icon name="mdi-code-tags" color="secondary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ $t('listChatflow.actions.oldVersion') }}</q-item-label>
                      <q-item-label caption>{{ $t('listChatflow.actions.oldVersionDesc') }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <q-btn
                color="primary"
                icon="mdi-code-json"
                flat
                round
                class="bg-padrao q-mx-sm"
                @click="abrirModalImportarJson(props.row)"
              >
                <q-tooltip>
                  {{ $t('listChatflow.actions.importJson') }}
                </q-tooltip>
              </q-btn>
              <q-btn
                color="primary"
                icon="delete"
                flat
                round
                class="bg-padrao q-mx-sm"
                @click="deletarFluxo(props.row)"
              >
                <q-tooltip>
                  {{ $t('listChatflow.actions.delete') }}
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <ModalChatFlow
      v-model:modalChatFlow="modalChatFlow"
      v-model:chatFlowEdicao="chatFlowSelecionado"
      @chatFlow:criada="novoFluxoCriado"
      @chatFlow:editado="fluxoEditado"
    />
    
    <q-dialog v-model="confirmDelete" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ $t('listChatflow.confirmDelete.title') }}</div>
          <div>{{ chatFlowSelecionado.name }}</div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            :label="$t('common.cancel')"
            v-close-popup
            class="q-mr-md"
            color="primary"
          />
          <q-btn :label="$t('common.delete')" color="negative" v-close-popup @click="confirmDeleteFoo()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalImportarJson" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ $t('listChatflow.importJsonDialog.title', { name: chatFlowSelecionado.name }) }}</div>
          <q-input
            v-model="jsonContent"
            type="textarea"
            :label="$t('listChatflow.importJsonDialog.jsonLabel')"
            autogrow
            filled
            :rules="[val => !!val || $t('listChatflow.importJsonDialog.jsonValidationError')]"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            :label="$t('common.cancel')"
            v-close-popup
            color="primary"
          />
          <q-btn
            :label="$t('common.import')"
            color="primary"
            @click="importarJsonConfirm"
            :disable="!jsonContent"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ListarFilas } from 'src/service/filas.js'
import { ListarChatFlow, DeletarChatFlow, ImportarJsonChatFlow } from 'src/service/chatFlow.js'
import { ListarUsuarios } from 'src/service/user.js'
import ModalChatFlow from './ModalChatFlow.vue'

export default {
  name: 'ChatFlowIndex',
  components: { ModalChatFlow },
  data () {
    return {
      confirmDelete: false,
      listachatFlow: [],
      modalChatFlow: false,
      modalImportarJson: false,
      chatFlowSelecionado: {},
      jsonContent: '',
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
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'name', label: this.$t('common.variables.name'), field: 'name', align: 'left' },
        { name: 'isActive', label: this.$t('listChatflow.status.active'), field: 'isActive', align: 'center' },
        { name: 'celularTeste', label: this.$t('common.variables.phoneNumber'), field: 'celularTeste', align: 'center' },
        { name: 'acoes', label: '', field: 'acoes', align: 'center' },
      ],
      filas: [],
      usuarios: []
    }
  },
  methods: {
    abrirModalParaCriar () {
      this.chatFlowSelecionado = {}
      this.modalChatFlow = true
    },
    async listarChatFlow () {
      const { data } = await ListarChatFlow()
      this.listachatFlow = data.chatFlow
    },
    async listarFilas () {
      const { data } = await ListarFilas({ isActive: true })
      this.filas = data.filter(q => q.isActive)
    },
    async listarUsuarios () {
      const { data } = await ListarUsuarios(this.params)
      this.usuarios = data.users
    },
    novoFluxoCriado (flow) {
      const lista = [...this.listachatFlow]
      lista.push(flow)
      this.listachatFlow = lista
    },
    duplicarFluxo (flow) {
      this.chatFlowSelecionado = { ...flow, isDuplicate: true }
      this.modalChatFlow = true
    },
    fluxoEditado (flow) {
      const lista = [...this.listachatFlow.filter(f => f.id !== flow.id)]
      lista.push(flow)
      this.listachatFlow = lista
    },
    editFlow (flow) {
      this.chatFlowSelecionado = flow
      this.modalChatFlow = true
    },
    async abrirFluxo (flow, useOldVersion = false) {
      try {
        if (!this.filas.length) {
          await this.listarFilas()
        }
        if (!this.usuarios.length) {
          await this.listarUsuarios()
        }
        this.$store.commit('SET_FLOW_DATA', {
          usuarios: this.usuarios,
          filas: this.filas,
          flow
        })
        if (useOldVersion) {
          this.$router.push({ path: '/chat-flow/builder', query: { version: 'old' } })
        } else {
          this.$router.push({ path: '/chat-flow/builder' })
        }
      } catch (err) {
        console.error('Erro ao abrir fluxo:', err)
        this.$q.notify({ type: 'negative', message: this.$t('common.notifications.error') })
      }
    },
    deletarFluxo (flow) {
      this.chatFlowSelecionado = flow
      this.confirmDelete = true
    },
    async confirmDeleteFoo (flow) {
      await DeletarChatFlow(this.chatFlowSelecionado)
      await this.listarChatFlow()
    },
    abrirModalImportarJson (flow) {
      this.chatFlowSelecionado = flow
      this.jsonContent = ''
      this.modalImportarJson = true
    },
    async importarJsonConfirm() {
      try {
        const data = JSON.parse(this.jsonContent);

        // Função de validação
        const isValid = this.validarJson(data);
        if (!isValid) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('listChatflow.importJsonDialog.importError'),
          });
          return;
        }

        await ImportarJsonChatFlow({ ...data, id: this.chatFlowSelecionado.id });
        this.modalImportarJson = false;
        this.$q.notify({
          type: 'positive',
          message: this.$t('listChatflow.importJsonDialog.importSuccess'),
        });
        await this.listarChatFlow();
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('listChatflow.importJsonDialog.importError'),
        });
      }
    },

    // Método de validação do JSON
    validarJson(data) {
      // Propriedades obrigatórias para a estrutura do fluxo
      const requiredProps = ['name', 'nodeList', 'lineList'];
      const nodeRequiredProps = ['id', 'name', 'type'];

      // Verificar propriedades principais
      for (let prop of requiredProps) {
        if (!(prop in data)) {
          return false;
        }
      }

      // Verificar a estrutura de nodeList
      if (!Array.isArray(data.nodeList) || data.nodeList.length === 0) {
        return false;
      }

      for (let node of data.nodeList) {
        for (let prop of nodeRequiredProps) {
          if (!(prop in node)) {
            return false;
          }
        }
      }

      // Verificar a estrutura de lineList
      if (!Array.isArray(data.lineList)) {
        return false;
      }

      return true;
    },
    // async importarJsonConfirm () {
    //   try {
    //     const data = JSON.parse(this.jsonContent)
    //     await ImportarJsonChatFlow({ ...data, id: this.chatFlowSelecionado.id })
    //     this.modalImportarJson = false
    //     this.$q.notify({
    //       type: 'positive',
    //       message: 'JSON importado com sucesso!'
    //     })
    //     await this.listarChatFlow()
    //   } catch (error) {
    //     this.$q.notify({
    //       type: 'negative',
    //       message: 'Erro ao importar JSON'
    //     })
    //   }
    // }
  },
  async mounted () {
    await this.listarChatFlow()
    await this.listarFilas()
    await this.listarUsuarios()
  }
}
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  overflow: hidden;

  .q-table__top {
    background: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding: 16px 24px;
  }

  .q-table thead tr th {
    background: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    color: var(--q-primary);
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }

  .q-table tbody tr {
    transition: all 0.3s ease;
    &:hover {
      background: rgba(0,0,0,0.02);
    }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(0,0,0,0.04);
    }
  }

  .q-btn {
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
    }
  }
}

.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;

  .q-card-section {
    padding: 18px 24px;
  }

  .q-input {
    .q-field__control {
      background: rgba(255,255,255,0.7);
      border-radius: 8px;
      transition: all 0.3s ease;
      &:hover {
        background: rgba(255,255,255,0.9);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.95);
      box-shadow: 0 4px 12px rgba(0,0,0,0.10);
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);

    .q-table__top {
      background: rgba(30, 30, 30, 0.8);
      border-color: rgba(255,255,255,0.08);
    }

    .q-table thead tr th {
      background: rgba(30, 30, 30, 0.9);
      border-color: rgba(255,255,255,0.08);
    }

    .q-table tbody tr {
      &:hover {
        background: rgba(255,255,255,0.05);
      }
      td {
        border-color: rgba(255,255,255,0.08);
      }
    }
  }

  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);

    .q-input {
      .q-field__control {
        background: rgba(255,255,255,0.05);
        &:hover {
          background: rgba(255,255,255,0.10);
        }
      }
      &.q-field--focused .q-field__control {
        background: rgba(255,255,255,0.15);
      }
    }
  }
}

@media (max-width: 600px) {
  .my-sticky-dynamic {
    border-radius: 12px !important;
    margin: 8px !important;

    .q-table__top {
      padding: 12px 16px;
    }

    .q-table thead tr th,
    .q-table tbody tr td {
      padding: 8px 12px;
    }
  }

  .q-card {
    border-radius: 12px;
    .q-card-section {
      padding: 12px 16px;
    }
  }
}
</style>
