<template>
  <div class="q-pa-sm">
    <q-card class="q-my-md">
      <q-card-section class="row justify-between items-center">
        <div class="col-xs-12 col-md-3 text-h4 text-bold text-center text-md-left">
          {{ $t('dashBoard.controlPanel') }}
        </div>
        
         <!-- Só mostra no mobile -->
        <div v-if="$q.screen.lt.sm" class="col-xs-12 col-md-9 justify-end flex q-gutter-sm text-center text-md-right q-my-md rdsPainelDate">
          <div class="date-row">
            <div class="q-mb-sm">
              <q-input
                dense
                outlined
                stack-label
                :label="$t('dashBoard.scheduleStartDate')"
                :model-value="formatDateDMY(params.startDate)"
                readonly
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="startPopupMobile" cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="params.startDate" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                outlined
                stack-label
                :label="$t('dashBoard.scheduleEndDate')"
                :model-value="formatDateDMY(params.endDate)"
                readonly
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="endPopupMobile" cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="params.endDate" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="actions-row">
            <q-btn
              class="bg-padrao q-mb-sm"
              flat
              color="primary"
              icon="refresh"
              :label="$t('dashBoard.generate')"
              @click="getDashData"
            />
            <q-toggle
              v-if="grupoAtivo === 'disabled'"
              v-model="toggleValue"
              checked-icon="check"
              unchecked-icon="clear"
              @update:model-value="handleGroups"
              :color="toggleValue ? 'green' : 'negative'"
              size="md"
              >
              <q-tooltip anchor="bottom middle" self="top middle">
                <span>{{ $t('dashBoard.filterGroups') }}</span>
              </q-tooltip>
            </q-toggle>
          </div>
        </div>

        <!-- Só mostra no desktop/tablet -->
        <div v-if="!$q.screen.lt.sm" class="col-xs-12 col-md-9 justify-end flex q-gutter-sm text-center text-md-right q-my-md rdsPainelDate">
          <div class="q-mb-sm">
            <q-input
              style="width: 200px"
              dense
              outlined
              stack-label
              :label="$t('dashBoard.scheduleStartDate')"
              :model-value="formatDateDMY(params.startDate)"
              readonly
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="startPopup" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="params.startDate" mask="YYYY-MM-DD" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-mb-sm">
            <q-input
              style="width: 200px"
              dense
              outlined
              stack-label
              :label="$t('dashBoard.scheduleEndDate')"
              :model-value="formatDateDMY(params.endDate)"
              readonly
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="endPopup" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="params.endDate" mask="YYYY-MM-DD" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <q-btn
            class="bg-padrao q-mb-sm"
            flat
            color="primary"
            icon="refresh"
            :label="$t('dashBoard.generate')"
            @click="getDashData"
          />
          <q-toggle
            v-if="grupoAtivo === 'disabled'"
            v-model="toggleValue"
            checked-icon="check"
            unchecked-icon="clear"
            @update:model-value="handleGroups"
            :color="toggleValue ? 'green' : 'negative'"
            size="md"
            >
            <q-tooltip anchor="bottom middle" self="top middle">
              <span>{{ $t('dashBoard.filterGroups') }}</span>
            </q-tooltip>
          </q-toggle>
        </div>

      </q-card-section>
    </q-card>
    <q-card class="q-my-md">
      <q-card-section class="row justify-between items-center">
        <div class="col-12">
          <q-expansion-item expand-separator>
            <template #header>
              <div class="text-h6 text-bold text-md-left">
                {{ $t('dashStyles.title') }}
              </div>
            </template>
            <q-select
              style="margin: 10px"
              v-model="selectedTheme"
              :options="themeOptions"
              :label="$t('dashStyles.tema')"
              dense
              outlined
              option-label="label"
              option-value="value"
            />
            <div class="row q-col-gutter-md">
              <div
                v-for="(panel, key) in chartPanels"
                :key="key"
                class="col-12 col-sm-6 col-md-4"
              >
                <q-card :class="{ 'q-card--disabled': !panel.visible }" flat bordered>
                  <q-card-section class="q-pa-sm flex items-center">
                    <q-checkbox
                      v-model="panel.visible"
                      :label="panel.label"
                      @update:model-value="savePanelPrefs"
                      class="q-mr-sm"
                    />
                    <q-select
                      v-if="!['evolutionChannels', 'evolutionByPeriod', 'evolutionByValue', 'performanceCards', 'performanceTable'].includes(key)"
                      v-model="panel.type"
                      :options="chartTypeOptions"
                      dense
                      outlined
                      :label="$t('dashStyles.tipoGrafico')"
                      option-label="label"
                      option-value="value"
                      emit-value
                      map-options
                      :disable="!panel.visible"
                      @update:model-value="(value) => updateChartType(key, value)"
                      class="q-ml-sm"
                      style="min-width: 120px"
                    />
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="q-pa-xs">
                    <q-tooltip>
                      {{ $t('dashStyles.tooltip') }} {{ panel.label }}
                    </q-tooltip>
                    <div class="text-caption text-grey-7">
                      {{ $t('dashStyles.show') }} {{ panel.label }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-expansion-item>
        </div>
      </q-card-section>

    </q-card>
    <div class="row q-col-gutter-md">
      <div v-if="chartPanels.queue.visible" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsQueue"
              :key="`queue-${chartPanels.queue.type}-${chartKeys.queue}`"
              :type="chartPanels.queue.type"
              height="300"
              width="100%"
              :options="ticketsQueueOptions"
              :series="ticketsQueueOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div v-if="chartPanels.user.visible" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsUser"
              :key="`user-${chartPanels.user.type}-${chartKeys.user}`"
              :type="chartPanels.user.type"
              height="300"
              width="100%"
              :options="ticketsUserOptions"
              :series="ticketsUserOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div v-if="chartPanels.status.visible" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsStatus"
              :key="`status-${chartPanels.status.type}-${chartKeys.status}`"
              :type="chartPanels.status.type"
              height="300"
              width="100%"
              :options="ticketsStatusOptions"
              :series="ticketsStatusOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div v-if="chartPanels.channel.visible" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsChannels"
              :key="`channel-${chartPanels.channel.type}-${chartKeys.channel}`"
              :type="chartPanels.channel.type"
              height="300"
              width="100%"
              :options="ticketsChannelsOptions"
              :series="ticketsChannelsOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div v-if="chartPanels.channelName.visible" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsName"
              :key="`channelName-${chartPanels.channelName.type}-${chartKeys.channelName}`"
              :type="chartPanels.channelName.type"
              height="300"
              width="100%"
              :options="ticketsChannelsNamesOptions"
              :series="ticketsChannelsNamesOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
      <div v-if="chartPanels.reasons.visible" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section class="q-pa-md">
            <ApexChart
              ref="ChartTicketsReasons"
              :key="`reasons-${chartPanels.reasons.type}-${chartKeys.reasons}`"
              :type="chartPanels.reasons.type"
              height="300"
              width="100%"
              :options="ticketsReasonsOptions"
              :series="ticketsReasonsOptions.series"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card class="q-my-md" v-if="chartPanels.evolutionChannels.visible">
      <q-card-section>
        <ApexChart
          ref="ChartTicketsEvolutionChannels"
          :key="`evolutionChannels-${chartKeys.evolutionChannels}`"
          type="bar"
          height="300"
          width="100%"
          :options="ticketsEvolutionChannelsOptions"
          :series="ticketsEvolutionChannelsOptions.series"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-my-md" v-if="chartPanels.evolutionByPeriod.visible">
      <q-card-section class="q-pa-md">
        <ApexChart
          ref="ChartTicketsEvolutionByPeriod"
          :key="`evolutionByPeriod-${chartKeys.evolutionByPeriod}`"
          type="line"
          height="300"
          :options="ticketsEvolutionByPeriodOptions"
          :series="ticketsEvolutionByPeriodOptions.series"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-my-md" v-if="chartPanels.evolutionByValue.visible">
      <q-card-section class="q-pa-md">
        <ApexChart
          ref="ChartTicketsEvolutionByValue"
          :key="`evolutionByValue-${chartKeys.evolutionByValue}`"
          type="line"
          height="300"
          :options="ticketsEvolutionByValueOptions"
          :series="ticketsEvolutionByValueOptions.series"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-my-md q-pa-sm" v-if="toggleValue === false && chartPanels.performanceCards.visible">
      <q-card class="q-my-md q-pa-sm">
      <q-card-section class="q-pa-md">
        <div class="row q-gutter-md justify-center">
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.qtd_total_atendimentos }}
                    </p>
                    <p class="text-caption text-branco">{{ $t('dashBoard.totalTickets') }}</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-account-multiple" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.qtd_demanda_ativa }}
                    </p>
                    <p class="text-caption text-branco">{{ $t('dashBoard.activeTickets') }}</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-account-check" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.qtd_demanda_receptiva }}
                    </p>
                    <p class="text-caption text-branco">{{ $t('dashBoard.receptiveTickets') }}</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-phone-incoming" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ ticketsAndTimes.new_contacts }}
                    </p>
                    <p class="text-caption text-branco">{{ $t('dashBoard.newContacts') }}</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-account-plus" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ cTmaFormat }}
                    </p>
                    <p class="text-caption text-branco">{{ $t('dashBoard.avgHandlingTime') }}</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-clock-outline" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-shrink">
            <q-card
              flat
              bordered
              class="my-card full-height"
              style="min-width: 200px; background-color: var(--q-primary); color: white"
            >
              <q-card-section class="text-center">
                <div class="row items-center">
                  <div class="col">
                    <p class="text-h4 text-bold text-center text-branco">
                      {{ cTmeFormat }}
                    </p>
                    <p class="text-caption text-branco">{{ $t('dashBoard.avgResponseTime') }}</p>
                  </div>
                  <div class="col">
                    <q-icon name="mdi-timer-sand" size="lg" color="white" class="text-white" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <!-- <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <q-card flat bordered class="my-card full-height" style="background-color: var(--q-primary); color: white">
              <q-card-section class="text-center">
                <p class="text-h5 text-bold text-center">
                  <q-icon name="mdi-clock-outline" size="lg" color="white" class="text-white" />
                  {{ cTmaFormat }}
                </p>
                {{ $t('dashBoard.avgHandlingTime') }}
              </q-card-section>
            </q-card>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <q-card flat bordered class="my-card full-height" style="background-color: var(--q-primary); color: white">
              <q-card-section class="text-center">
                <p class="text-h5 text-bold text-center">
                  <q-icon name="mdi-timer-sand" size="lg" color="white" class="text-white" />
                  {{ cTmeFormat }}
                </p>
                {{ $t('dashBoard.avgResponseTime') }}
              </q-card-section>
            </q-card>
          </div> -->
        </div>
      </q-card-section>
    </q-card>
      <q-card-section class="q-pa-md" v-if="chartPanels.performanceTable.visible && ticketsPerUsersTableReady">
        <q-table
          :title="$t('dashBoard.performanceByTeam')"
          :rows="ticketsPerUsersDetail || []"
          :columns="TicketsPerUsersDetailColumn || []"
          row-key="email"
          v-model:pagination="paginationTableUser"
          :rows-per-page-options="[0]"
          bordered
          flat
          hide-bottom
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div class="row col text-bold"> {{ props.row.name || $t('common.notInformed') }} </div>
              <div class="row col text-caption">{{ props.row.email }} </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { groupBy } from 'lodash'
import { ListarFilas } from 'src/service/filas.js'
import { ListarUsuarios } from 'src/service/user.js'
import {
  GetDashTicketsAndTimes,
  GetDashTicketsChannels,
  GetDashTicketsEvolutionChannels,
  GetDashTicketsQueue,
  GetDashTicketsEvolutionByPeriod,
  GetDashTicketsEvolutionByValue,
  GetDashTicketsPerUsersDetail,
  GetDashTicketsUser,
  GetDashTicketsStatus,
  GetDashTicketsReasons,
  GetDashTicketsEvolutionChannelsName
} from 'src/service/estatisticas'
import { ListarConfiguracoes } from 'src/service/configuracoes.js'
import { subDays, format, formatDuration, differenceInDays } from 'date-fns'
import VueApexCharts from 'vue3-apexcharts'
import { QIcon } from 'quasar'
import { dashboardThemes } from './dashboardThemes.js'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'IndexDashboard',
  components: { ApexChart: VueApexCharts, QIcon },
  data () {
    return {
      // Força re-render dos gráficos quando o tipo mudar
      chartKeys: {
        queue: 0,
        user: 0,
        status: 0,
        channel: 0,
        channelName: 0,
        reasons: 0,
        evolutionChannels: 0,
        evolutionByPeriod: 0,
        evolutionByValue: 0
      },
      colors: {},
      confiWidth: {
        horizontal: false,
        width: this.$q.screen.width
      },
      toggleValue: false,
      grupoAtivo: 'disabled',
      params: {
        startDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        queuesIds: [],
        whatsappIds: [],
        selectedUser: [],
        userIds: [],
        isGroup: false
      },
      paginationTableUser: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 0,
        rowsNumber: 0
      },
      filas: [],
      usuarios: [],
      ticketsChannels: [],
      ticketsChannelsNames: [],
      ticketsChannelsNamesOptions: {
        // colors: ['#00E396', '#ff2a00','#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        legend: {
          position: 'bottom'
        },
        title: {
          text: this.$t('dashBoard.attendanceByChannelName')
        },
        noData: {
          text: this.$t('common.noData'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#000000']
          },
          fillSeriesColor: false,
          marker: {
            show: false
          }
        }
      },
      ticketsChannelsOptions: {
        // colors: ['#00E396', '#ff2a00','#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        legend: {
          position: 'bottom'
        },
        title: {
          text: this.$t('dashBoard.attendanceByChannel')
        },
        noData: {
          text: this.$t('common.noData'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#FFFFFF']
          },
          fillSeriesColor: false,
          marker: {
            show: false
          }
        }
      },
      ticketsQueue: [],
      ticketsQueueOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: this.$t('dashBoard.attendanceByQueue')
        },
        noData: {
          text: this.$t('common.noData'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#FFFFFF']
          },
          fillSeriesColor: false,
          marker: {
            show: false
          }
        }
      },
      ticketsReasons: [],
      ticketsReasonsOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: this.$t('dashBoard.attendanceByReasons')
        },
        noData: {
          text: this.$t('common.noData'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#FFFFFF']
          },
          fillSeriesColor: false,
          marker: {
            show: false
          }
        }
      },
      ticketsStatus: [],
      ticketsStatusOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: this.$t('dashBoard.attendanceByStatus')
        },
        noData: {
          text: this.$t('common.noData'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#FFFFFF']
          },
          fillSeriesColor: false,
          marker: {
            show: false
          }
        }
      },
      ticketsUser: [],
      ticketsUserOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        legend: {
          position: 'bottom'
        },
        title: {
          text: this.$t('dashBoard.attendanceByUser')
        },
        noData: {
          text: this.$t('common.noData'),
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [],
        labels: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -10
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'middle',
          style: {
            fontSize: '16px',
            offsetY: '150',
            fontFamily: 'Helvetica, Arial, sans-serif'
          },
          offsetX: 0
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#FFFFFF']
          },
          fillSeriesColor: false,
          marker: {
            show: false
          }
        }
      },
      ticketsEvolutionChannels: [],
      ticketsEvolutionChannelsOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        chart: {
          type: 'bar',
          // height: 300,
          stacked: true,
          stackType: '100%',
          toolbar: {
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">'
            }

          }
        },
        series: [],
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        grid: {
          show: true,
          strokeDashArray: 0
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        dataLabels: {
          enabled: true
        },
        title: {
          text: this.$t('dashBoard.evolutionByChannel'),
          align: 'left'
        },
        stroke: {
          width: 0
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 250
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }],
        xaxis: {
          type: 'category',
          categories: [],
          tickPlacement: 'on'
          // labels: {
          //   formatter: function (value, timestamp, opts) {
          //     return format(new Date(timestamp), 'dd/MM')
          //     // return opts.dateFormatter().format('dd MMM')
          //   }
          // }
          // type: 'datetime'
          // format: 'dd/MM'
          // datetimeFormatter: {
          //   // year: 'yyyy',
          //   month: 'MM',
          //   day: 'DD'
          //   // hour: 'HH:mm',
          // }
        },
        yaxis: {
          title: {
            text: this.$t('dashBoard.attendances'),
            style: {
              color: '#FFF'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return Number(val).toFixed(0)
            }
          }
        }
      },
      ticketsEvolutionByValue: [],
      ticketsEvolutionByValueOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        chart: {
          toolbar: {
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">'
            }

          }
        },
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          width: [4, 4, 4]
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        title: {
          text: this.$t('dashBoard.attendanceValueEvolution'),
          align: 'left'
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: this.$t('dashBoard.values')
          }
        },
        tooltip: {
          shared: false,
          x: {
            show: false
          },
          y: {
            formatter: function (val) {
              return Number(val).toFixed(0)
            }
          }
        },
        series: [
          { name: this.$t('dashBoard.evolutionByValue'), type: 'column', data: [] },
          { type: 'line', data: [] }
        ],
        legend: {
          show: false
        }
      },
      ticketsEvolutionByPeriod: [],
      ticketsEvolutionByPeriodOptions: {
        // colors: ['#008FFB', '#00E396', '#FEB019'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        theme: {
          mode: 'light',
          palette: 'palette1'
        },
        chart: {
          toolbar: {
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">'
            }

          }
        },
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          width: [4, 4, 4]
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        title: {
          text: this.$t('dashBoard.attendanceEvolution'),
          align: 'left'
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: this.$t('dashBoard.attendances')
          }
        },
        tooltip: {
          shared: false,
          x: {
            show: false
          },
          y: {
            formatter: function (val) {
              return Number(val).toFixed(0)
            }
          }
        },
        series: [
          { name: this.$t('dashBoard.evolutionByPeriod'), type: 'column', data: [] },
          { type: 'line', data: [] }
        ],
        legend: {
          show: false
        }
      },
      ticketsAndTimes: {
        qtd_total_atendimentos: null,
        qtd_demanda_ativa: null,
        qtd_demanda_receptiva: null,
        tma: null,
        tme: null
      },
      ticketsPerUsersDetail: [],
      ticketsPerUsersTableReady: false,
      TicketsPerUsersDetailColumn: [
        {
          name: 'name',
          label: this.$t('dashBoard.user'),
          field: 'name',
          align: 'left',
          style: 'width: 300px;',
          format: (v, r) => {
            return v ? `${r.name} | ${r.email}` : this.$t('common.notInformed')
          }
        },
        {
          name: 'qtd_pendentes',
          label: this.$t('dashBoard.pending'),
          field: 'qtd_pendentes'
        },
        {
          name: 'qtd_em_atendimento',
          label: this.$t('dashBoard.attending'),
          field: 'qtd_em_atendimento'
        },
        {
          name: 'qtd_resolvidos',
          label: this.$t('dashBoard.resolved'),
          field: 'qtd_resolvidos'
        },
        {
          name: 'qtd_por_usuario',
          label: this.$t('dashBoard.total'),
          field: 'qtd_por_usuario'
        },
        {
          name: 'media_avaliacao',
          label: this.$t('dashBoard.avgRating'),
          field: 'media_avaliacao'
        },
        {
          name: 'tme',
          label: this.$t('dashBoard.avgFirstResponse'),
          field: 'tme',
          align: 'center',
          headerStyle: 'text-align: center !important',
          format: v => {
            return formatDuration(v)
              .replace('hours', this.$t('common.hours'))
              .replace('minutes', this.$t('common.minutes')) || '';
          }
        },
        {
          name: 'tma',
          label: this.$t('dashBoard.avgHandlingTime'),
          field: 'tma',
          align: 'center',
          headerStyle: 'text-align: center !important',
          format: v => {
            return formatDuration(v)
              .replace('hours', this.$t('common.hours'))
              .replace('minutes', this.$t('common.minutes')) || '';
          }
        }
      ],
      selectedTheme: (() => {
        const stored = localStorage.getItem('dashboardTheme')
        const themeKey = stored && dashboardThemes[stored] ? stored : 'padrao'
        return (
          Object.keys(dashboardThemes)
            .map(key => ({
              label: this.$t(dashboardThemes[key].name),
              value: key
            }))
            .find(opt => opt.value === themeKey) || { label: this.$t('dashStyles.defaultLabel'), value: this.$t('dashStyles.defaultValue') }
        )
      })(),
      themeOptions: Object.keys(dashboardThemes).map(key => ({ 
        label: this.$t(dashboardThemes[key].name),
        value: key
      })),
      chartTypeOptions: [
        { label: this.$t('dashStyles.pizzaLabel'), value: 'pie' },
        { label: this.$t('dashStyles.barLabel'), value: 'bar' },
        { label: this.$t('dashStyles.lineLabel'), value: 'line' },
        { label: this.$t('dashStyles.areaLabel'), value: 'area' },
        { label: this.$t('dashStyles.radarLabel'), value: 'radar' },
        { label: this.$t('dashStyles.donutLabel'), value: 'donut' },
      ],
      chartPanels: (() => {
        const defaultPanels = {
          queue: { label: this.$t('dashStyles.queueLabel'), visible: true, type: 'pie' },
          user: { label: this.$t('dashStyles.userLabel'), visible: true, type: 'pie' },
          status: { label: this.$t('dashStyles.statusLabel'), visible: true, type: 'pie' },
          channel: { label: this.$t('dashStyles.channelLabel'), visible: true, type: 'pie' },
          channelName: { label: this.$t('dashStyles.channelNameLabel'), visible: true, type: 'pie' },
          reasons: { label: this.$t('dashStyles.reasonsLabel'), visible: true, type: 'pie' },
          evolutionChannels: { label: this.$t('dashStyles.channelEvolutionLabel'), visible: true, type: 'bar' },
          evolutionByPeriod: { label: this.$t('dashStyles.evolutionByPeriodLabel'), visible: true },
          evolutionByValue: { label: this.$t('dashStyles.evolutionByValueLabel'), visible: true },
          performanceCards: { label: this.$t('dashStyles.performanceCardsLabel'), visible: true },
          performanceTable: { label: this.$t('dashStyles.performanceTableLabel'), visible: true },
        };
        const saved = localStorage.getItem('dashboardChartPanels');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // Garante que todas as chaves existam
            return { ...defaultPanels, ...parsed };
          } catch (e) {
            return { ...defaultPanels };
          }
        } else {
          return { ...defaultPanels };
        }
      })(),
    }
  },
  watch: {
    '$q.dark.isActive' () {
      // Reaplica tema aos gráficos sem recarregar a rota
      this.applyTheme(this.selectedTheme)
    },
    '$q.screen.width' () {
      // necessário para carregar os gráficos com a alterçaão do mode (dark/light)
      this.setConfigWidth()
    },
    selectedTheme: {
      handler(newTheme) {
        // Garante que newTheme seja uma string (chave do tema)
        let themeKey = newTheme
        if (typeof newTheme === 'object' && newTheme !== null) {
          themeKey = newTheme.value || newTheme
        }
        
        // Valida se a chave do tema existe
        if (!dashboardThemes[themeKey]) {
          console.warn(`Tema "${themeKey}" não encontrado, usando tema padrão`)
          themeKey = 'padrao'
          this.selectedTheme = themeKey
        }
        
        this.applyTheme(themeKey)
        localStorage.setItem('dashboardTheme', themeKey)
        window.location.reload()
      },
      immediate: false
    },
    chartPanels: {
      handler() {
        this.savePanelPrefs()
      },
      deep: true
    },
    'chartPanels.queue.type': {
      handler(newType) {
        if (newType) {
          this.getDashTicketsQueue()
        }
      }
    },
    'chartPanels.user.type': {
      handler(newType) {
        if (newType) {
          this.getDashTicketsUser()
        }
      }
    },
    'chartPanels.status.type': {
      handler(newType) {
        if (newType) {
          this.getDashTicketsStatus()
        }
      }
    },
    'chartPanels.channel.type': {
      handler(newType) {
        if (newType) {
          this.getDashTicketsChannels()
        }
      }
    },
    'chartPanels.channelName.type': {
      handler(newType) {
        if (newType) {
          this.getDashTicketsEvolutionChannelsName()
        }
      }
    },
    'chartPanels.reasons.type': {
      handler(newType) {
        if (newType) {
          this.getDashTicketsReasons()
        }
      }
    },
    // watcher removido para evolutionChannels
  },
  created() {
    // Listener para detectar mudanças no localStorage
    this.storageListener = (e) => {
      if (e.key === 'storedColors') {
        console.log('Cores personalizadas atualizadas no localStorage')
        const colorsLoaded = this.loadCustomColors()
        if (!colorsLoaded) {
          this.setFallbackColors()
        }
        this.$nextTick(() => {
          this.applyTheme(this.selectedTheme)
        })
      }
    }
    window.addEventListener('storage', this.storageListener)
  },
  beforeUnmount() {
    // Remove o listener quando o componente for destruído
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener)
    }
  },
  computed: {
    cTmaFormat () {
      const tma = this.ticketsAndTimes.tma || {};
      const duration = formatDuration(tma) || '';
      const translatedDuration = duration
        .replace('hours', this.$t('dashBoard.hours'))
        .replace('minutes', this.$t('dashBoard.minutes'));

      return translatedDuration;
    },
    cTmeFormat () {   
      const tme = this.ticketsAndTimes.tme || {}
      const duration = formatDuration(tme) || '';
      const translatedDuration = duration
        .replace('hours', this.$t('dashBoard.hours'))
        .replace('minutes', this.$t('dashBoard.minutes'));

      return translatedDuration;
    },
  },
  methods: {
    // Método para carregar cores personalizadas do localStorage
    loadCustomColors() {
      const storedColors = localStorage.getItem('storedColors');
      if (storedColors) {
        let list = []
        try {
          const parsed = JSON.parse(storedColors)
          list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : [])
        } catch (e) { 
          console.warn('Erro ao fazer parse das cores armazenadas:', e)
          return false
        }

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

        // Aplica as cores imediatamente para evitar delay
        const root = document.documentElement;
        Object.keys(colors).forEach(key => {
          root.style.setProperty(`--q-${key}`, colors[key]);
        });
        
        return true
      } else {
        console.warn('Nenhuma cor armazenada no localStorage');
        return false
      }
    },
    
    // Método para definir cores de fallback que não sejam roxas
    setFallbackColors() {
      const root = document.documentElement;
      
      // Cores de fallback em tons de verde/azul para evitar a cor roxa padrão
      const fallbackColors = {
        primary: '#2ecc71',    // Verde
        secondary: '#f8f9fa',  // Cinza claro
        accent: '#3498db',     // Azul
        positive: '#27ae60',   // Verde escuro
        negative: '#e74c3c',   // Vermelho
        warning: '#f39c12',    // Laranja
        light: '#ecf0f1',      // Cinza muito claro
        dark: '#2c3e50'        // Azul escuro
      };
      
      // Aplica as cores de fallback apenas se não houver cores personalizadas
      Object.keys(fallbackColors).forEach(key => {
        const currentValue = getComputedStyle(root).getPropertyValue(`--q-${key}`).trim();
        if (!currentValue || currentValue === '#4361ee' || currentValue === 'var(--q-primary)') {
          root.style.setProperty(`--q-${key}`, fallbackColors[key]);
        }
      });
      
      console.log('Cores de fallback aplicadas para evitar cor roxa padrão');
    },
    
    // Método para forçar aplicação de cores durante refreshes rápidos
    forceColorApplication() {
      // Aplica cores imediatamente no DOM para evitar delay
      const root = document.documentElement;
      
      // Verifica se as cores personalizadas estão carregadas
      const primaryColor = getComputedStyle(root).getPropertyValue('--q-primary').trim();
      
      // Se a cor primária ainda for a padrão roxa, força aplicação de fallback
      if (primaryColor === '#4361ee' || primaryColor === 'var(--q-primary)') {
        this.setFallbackColors();
      }
      
      // Aplica o tema novamente para garantir que os gráficos usem as cores corretas
      this.$nextTick(() => {
        this.applyTheme(this.selectedTheme);
      });
    },
    formatDateDMY (val) {
      if (!val) return ''
      try {
        const s = String(val)
        const [y, m, d] = s.split('-')
        if (y && m && d) return `${d.padStart(2,'0')}/${m.padStart(2,'0')}/${y}`
        // fallback: se vier como Date
        const dt = new Date(val)
        if (!isNaN(dt)) {
          const dd = String(dt.getDate()).padStart(2,'0')
          const mm = String(dt.getMonth()+1).padStart(2,'0')
          const yy = String(dt.getFullYear())
          return `${dd}/${mm}/${yy}`
        }
        return s
      } catch (e) { return String(val) }
    },
    validateChartData(data, valueKey = 'qtd') {
      return data.filter(item => {
        const value = +item[valueKey]
        return !isNaN(value) && value !== null && value !== undefined
      })
    },
    suppressApexChartsErrors() {
      // Suprime console.error específicos do ApexCharts
      const originalConsoleError = console.error
      console.error = (...args) => {
        const errorMessage = args.join(' ')
        
        // Lista de erros do ApexCharts para suprimir
        const suppressErrors = [
          'Expected number',
          'NaN',
          'data property',
          '<path> attribute d:',
          'It is a possibility that you may have not included',
        ]
        
        // Verifica se o erro deve ser suprimido
        const shouldSuppress = suppressErrors.some(error => errorMessage.includes(error))
        
        if (shouldSuppress) {
          return // Não exibe o erro
        }
        
        // Para todos os outros erros, mantém o comportamento normal
        originalConsoleError.apply(console, args)
      }
      
      // Captura exceções globais
      const originalOnError = window.onerror
      window.onerror = (message, source, lineno, colno, error) => {
        const errorStr = String(message)
        
        // Suprime erros específicos do ApexCharts
        if (errorStr.includes('Expected number') || 
            errorStr.includes('NaN') ||
            errorStr.includes('<path> attribute d:')) {
          return true // Previne o erro de aparecer
        }
        
        // Para outros erros, mantém o comportamento normal
        if (originalOnError) {
          return originalOnError(message, source, lineno, colno, error)
        }
        return false
      }
      
      // Captura exceções não capturadas
      const originalOnUnhandledRejection = window.onunhandledrejection
      window.onunhandledrejection = (event) => {
        const errorStr = String(event.reason)
        
        // Suprime erros específicos do ApexCharts
        if (errorStr.includes('Expected number') || 
            errorStr.includes('NaN') ||
            errorStr.includes('<path> attribute d:')) {
          event.preventDefault() // Previne o erro de aparecer
          return
        }
        
        // Para outros erros, mantém o comportamento normal
        if (originalOnUnhandledRejection) {
          originalOnUnhandledRejection(event)
        }
      }
      
      // Intercepta erros específicos do ApexCharts no DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Remove atributos inválidos de path que causam erros
                const paths = node.querySelectorAll('path')
                paths.forEach(path => {
                  const d = path.getAttribute('d')
                  if (d && d.includes('NaN')) {
                    path.removeAttribute('d')
                  }
                })
              }
            })
          }
        })
      })
      
      // Observa mudanças no DOM
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    },
    async listarFilas () {
      try {
        const { data } = await ListarFilas()
        this.filas = data
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao listar filas:', error)
        }
      }
    },
    async listarUsuarios () {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users.filter(user => user.profile !== 'superadmin');
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao listar usuários:', error)
        }
      }
    },
    async listarConfiguracoes() {
      try {
        const { data } = await ListarConfiguracoes()
        localStorage.setItem('configuracoes', JSON.stringify(data))
        const ignoreGroupMsg = data.find(config => config.key === 'ignoreGroupMsg')
        this.grupoAtivo = ignoreGroupMsg.value
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao listar configurações:', error)
        }
      }
    },
    handleGroups() {
      if (this.toggleValue) {
        this.params.isGroup = true
        this.$q.notify({
          type: 'positive',
          message: this.$t('dashBoard.filterGroups'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } else {
        this.params.isGroup = false
        this.$q.notify({
          type: 'positive',
          message: this.$t('dashBoard.filterPrivateChats'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      }
    },
    setConfigWidth () {
      const diffDays = differenceInDays(new Date(this.params.endDate), new Date(this.params.startDate))
      if (diffDays > 30) {
        this.configWidth = { horizontal: true, width: 2200 }
      } else {
        const actualWidth = this.$q.screen.width
        this.configWidth = { horizontal: true, width: actualWidth - (actualWidth < 768 ? 40 : 100) }
      }
    },
    getDashTicketsAndTimes () {
      GetDashTicketsAndTimes(this.params).then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          this.ticketsAndTimes = res.data[0]
        } else {
          // Mantém os valores padrão se não houver dados
          this.ticketsAndTimes = {
            qtd_total_atendimentos: null,
            qtd_demanda_ativa: null,
            qtd_demanda_receptiva: null,
            tma: null,
            tme: null
          }
        }
      })
        .catch(err => {
          // Silenciar erros de timeout - não mostrar no console
          if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
            console.error(err)
          }
        })
    },
    getDashTicketsUser () {
      GetDashTicketsUser(this.params).then(res => {
        this.ticketsUser = Array.isArray(res?.data) ? res.data : []
        const type = this.chartPanels.user.type
        const validData = this.validateChartData(this.ticketsUser)
        
        let series = []
        let labels = []
        if (type === 'pie' || type === 'donut') {
          series = validData.map(e => +e.qtd)
          labels = validData.map(e => e.label)
        } else {
          series = [{ name: this.$t('dashStyles.users'), data: validData.map(e => +e.qtd) }]
          labels = validData.map(e => e.label)
        }
        this.ticketsUserOptions = JSON.parse(JSON.stringify({
          ...this.ticketsUserOptions,
          chart: { ...this.ticketsUserOptions.chart, type },
          series,
          labels
        }))
        
        // Usa a função segura para atualizar o gráfico
        this.safeUpdateChart(this.$refs.ChartTicketsUser, this.ticketsUserOptions, series)
      })
        .catch(err => {
          // Silenciar erros de timeout - não mostrar no console
          if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
            console.error(err)
          }
          this.ticketsUser = []
        })
    },
    getDashTicketsQueue () {
      GetDashTicketsQueue(this.params).then(res => {
        this.ticketsQueue = Array.isArray(res?.data) ? res.data : []
        const type = this.chartPanels.queue.type
        const validData = this.validateChartData(this.ticketsQueue)
        
        let series = []
        let labels = []
        if (type === 'pie' || type === 'donut') {
          series = validData.map(e => +e.qtd)
          labels = validData.map(e => e.label)
        } else {
          series = [{ name: this.$t('dashStyles.atendimento'), data: validData.map(e => +e.qtd) }]
          labels = validData.map(e => e.label)
        }
        this.ticketsQueueOptions = JSON.parse(JSON.stringify({
          ...this.ticketsQueueOptions,
          chart: { ...this.ticketsQueueOptions.chart, type },
          series,
          labels
        }))
        
        // Usa a função segura para atualizar o gráfico
        this.safeUpdateChart(this.$refs.ChartTicketsQueue, this.ticketsQueueOptions, series)
      })
        .catch(err => {
          // Silenciar erros de timeout - não mostrar no console
          if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
            console.error(err)
          }
          this.ticketsQueue = []
        })
    },
    getDashTicketsReasons () {
      GetDashTicketsReasons(this.params).then(res => {
        this.ticketsReasons = Array.isArray(res?.data) ? res.data : []
        const type = this.chartPanels.reasons.type
        let series = []
        let labels = []
        if (this.ticketsReasons && this.ticketsReasons.length > 0) {
          if (type === 'pie' || type === 'donut') {
            series = this.ticketsReasons.map(e => +e.qtd).filter(val => !isNaN(val) && val !== null)
            labels = this.ticketsReasons.map(e => e.name).filter((_, index) => !isNaN(this.ticketsReasons[index].qtd) && this.ticketsReasons[index].qtd !== null)
          } else {
            const validData = this.ticketsReasons.filter(e => !isNaN(+e.qtd) && +e.qtd !== null)
            series = [{ name: this.$t('dashStyles.demandas'), data: validData.map(e => +e.qtd) }]
            labels = validData.map(e => e.name)
          }
        }
        this.ticketsReasonsOptions = JSON.parse(JSON.stringify({
          ...this.ticketsReasonsOptions,
          chart: { ...this.ticketsReasonsOptions.chart, type },
          series,
          labels
        }))
        this.safeUpdateChart(this.$refs.ChartTicketsReasons, this.ticketsReasonsOptions, series)
      })
        .catch(err => {
          // Silenciar erros de timeout - não mostrar no console
          if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
            console.error(err)
          }
          this.ticketsReasons = []
        })
    },
    getDashTicketsStatus () {
      const statusMapping = {
        closed: this.$t('dashStyles.closed'),
        open: this.$t('dashStyles.open'),
        pending: this.$t('dashStyles.pending'),
        schedule: this.$t('dashStyles.schedule'),
        undefined: this.$t('dashStyles.undefined')
      };
      GetDashTicketsStatus(this.params).then(res => {
        this.ticketsStatus = Array.isArray(res?.data) ? res.data : []
        const type = this.chartPanels.status.type
        let series = []
        let labels = []
        if (this.ticketsStatus && this.ticketsStatus.length > 0) {
          if (type === 'pie' || type === 'donut') {
            series = this.ticketsStatus.map(e => +e.qtd).filter(val => !isNaN(val) && val !== null)
            labels = this.ticketsStatus.map(e => statusMapping[e.status]).filter((_, index) => !isNaN(this.ticketsStatus[index].qtd) && this.ticketsStatus[index].qtd !== null)
          } else {
            const validData = this.ticketsStatus.filter(e => !isNaN(+e.qtd) && +e.qtd !== null)
            series = [{ name: 'Status', data: validData.map(e => +e.qtd) }]
            labels = validData.map(e => statusMapping[e.status])
          }
        }
        this.ticketsStatusOptions = JSON.parse(JSON.stringify({
          ...this.ticketsStatusOptions,
          chart: { ...this.ticketsStatusOptions.chart, type },
          series,
          labels
        }))
        this.safeUpdateChart(this.$refs.ChartTicketsStatus, this.ticketsStatusOptions, series)
      })
        .catch(err => {
          // Silenciar erros de timeout - não mostrar no console
          if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
            console.error(err)
          }
          this.ticketsStatus = []
        })
    },
    getDashTicketsChannels () {
      const statusMapping = {
        zapi: 'Z-API',
        uazapi: 'Uazapi',
        evo: 'WhatsApp Evolution',
        meow: 'WhatsApp Meow',
        whatsapp: 'WhatsApp Web.Js',
        waba: 'WhatsApp Official',
        webmail: 'Webmail',
        hub_facebook: 'Facebook',
        hub_instagram: 'Instagram',
        hub_sms: 'SMS',
        hub_telegram: 'Telegram',
        hub_whatsapp: 'WhatsApp Hub',
        hub_whatsapp_business_account: 'WhatsApp Hub',
        hub_widget: 'Widget',
        hub_webchat: 'WebChat',
        hub_email: 'Email',
        hub_mercadolivre: 'MercadoLivre',
        hub_tiktok: 'TikTok',
        hub_likedin: 'LinkedIn',
        hub_olx: 'OLX',
        hub_ifood: 'iFood',
        hub_twitter: 'Twitter',
        hub_youtube: 'YouTube',
        telegram: 'Telegram',
        instagram: 'Instagram',
        baileys: 'WhatsApp Baileys',
        webchat: 'Webchat',
        messenger: 'Messenger',
      };
      GetDashTicketsChannels(this.params).then(res => {
        this.ticketsChannels = Array.isArray(res?.data) ? res.data : []
        const type = this.chartPanels.channel.type
        let series = []
        let labels = []
        if (this.ticketsChannels && this.ticketsChannels.length > 0) {
          if (type === 'pie' || type === 'donut') {
            series = this.ticketsChannels.map(e => +e.qtd).filter(val => !isNaN(val) && val !== null)
            labels = this.ticketsChannels.map(e => statusMapping[e.label]).filter((_, index) => !isNaN(this.ticketsChannels[index].qtd) && this.ticketsChannels[index].qtd !== null)
          } else {
            const validData = this.ticketsChannels.filter(e => !isNaN(+e.qtd) && +e.qtd !== null)
            series = [{ name: this.$t('dashStyles.channels'), data: validData.map(e => +e.qtd) }]
            labels = validData.map(e => statusMapping[e.label])
          }
        }
        this.ticketsChannelsOptions = JSON.parse(JSON.stringify({
          ...this.ticketsChannelsOptions,
          chart: { ...this.ticketsChannelsOptions.chart, type },
          series,
          labels
        }))
        this.safeUpdateChart(this.$refs.ChartTicketsChannels, this.ticketsChannelsOptions, series)
      })
      .catch(err => {
        console.error(err)
        this.ticketsChannels = []
      })
    },
    getDashTicketsEvolutionChannelsName () {
      GetDashTicketsEvolutionChannelsName(this.params).then(res => {
        this.ticketsChannelsNames = Array.isArray(res?.data) ? res.data : []
        const type = this.chartPanels.channelName.type
        let series = []
        let labels = []
        if (this.ticketsChannelsNames && this.ticketsChannelsNames.length > 0) {
          if (type === 'pie' || type === 'donut') {
            series = this.ticketsChannelsNames.map(e => +e.qtd).filter(val => !isNaN(val) && val !== null)
            labels = this.ticketsChannelsNames.map(e => e.label || this.$t('dashBoard.undefined')).filter((_, index) => !isNaN(this.ticketsChannelsNames[index].qtd) && this.ticketsChannelsNames[index].qtd !== null)
          } else {
            const validData = this.ticketsChannelsNames.filter(e => !isNaN(+e.qtd) && +e.qtd !== null)
            series = [{ name: this.$t('dashStyles.channels'), data: validData.map(e => +e.qtd) }]
            labels = validData.map(e => e.label || this.$t('dashBoard.undefined'))
          }
        }
        this.ticketsChannelsNamesOptions = JSON.parse(JSON.stringify({
          ...this.ticketsChannelsNamesOptions,
          chart: { ...this.ticketsChannelsNamesOptions.chart, type },
          series,
          labels
        }))
        this.safeUpdateChart(this.$refs.ChartTicketsName, this.ticketsChannelsNamesOptions, series)
      })
      .catch(err => {
        console.error(err)
        this.ticketsChannelsNames = []
      })
    },
    getDashTicketsEvolutionChannels () {
      GetDashTicketsEvolutionChannels(this.params)
        .then(res => {
          this.ticketsEvolutionChannels = Array.isArray(res?.data) ? res.data : []
          const type = this.chartPanels.evolutionChannels.type
          const labels = []
          const series = []
          
          if (this.ticketsEvolutionChannels && this.ticketsEvolutionChannels.length > 0) {
            const dataLabel = groupBy({ ...this.ticketsEvolutionChannels }, 'dt_referencia')
            const labelKeys = Object.keys(dataLabel)
            labels.push(...labelKeys)
            
            this.ticketsEvolutionChannelsOptions.labels = labels
            this.ticketsEvolutionChannelsOptions.xaxis.categories = labels
            
            const dados = groupBy({ ...this.ticketsEvolutionChannels }, 'label')
            for (const item in dados) {
              series.push({
                name: item,
                data: dados[item].map(d => {
                  return d.qtd
                })
              })
            }
          } else {
            this.ticketsEvolutionChannelsOptions.labels = []
            this.ticketsEvolutionChannelsOptions.xaxis.categories = []
          }
          
          this.ticketsEvolutionChannelsOptions = JSON.parse(JSON.stringify({
            ...this.ticketsEvolutionChannelsOptions,
            chart: { ...this.ticketsEvolutionChannelsOptions.chart, type },
            series
          }))
          
          // Usa a função segura para atualizar o gráfico
          this.safeUpdateChart(this.$refs.ChartTicketsEvolutionChannels, this.ticketsEvolutionChannelsOptions, series)
        })
        .catch(error => {
          // Silenciar erros de timeout - não mostrar no console
          if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
            console.error(error)
          }
          this.ticketsEvolutionChannels = []
        })
    },
    getDashTicketsEvolutionByValue () {
      GetDashTicketsEvolutionByValue(this.params)
        .then(res => {
          this.ticketsEvolutionByValue = Array.isArray(res?.data) ? res.data : []
          const series = [{
            name: this.$t('dashBoard.evolutionByValue'), 
            type: 'column',
            data: []
          }, {
            type: 'line',
            data: []
          }
          ]
          const labels = []
          if (this.ticketsEvolutionByValue && this.ticketsEvolutionByValue.length > 0) {
            this.ticketsEvolutionByValue.forEach(e => {
              series[0].data.push(+e.value) 
              labels.push(e.label) 
            })
            series[1].data = series[0].data
          }
          this.ticketsEvolutionByValueOptions.labels = labels
          this.ticketsEvolutionByValueOptions.series = series
          this.safeUpdateChart(this.$refs.ChartTicketsEvolutionByValue, this.ticketsEvolutionByValueOptions, series)
        })
        .catch(error => {
          // Silenciar erros de timeout - não mostrar no console
          if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
            console.error(error)
          }
          this.ticketsEvolutionByValue = []
        })
    },
    getDashTicketsEvolutionByPeriod () {
      GetDashTicketsEvolutionByPeriod(this.params)
        .then(res => {
          this.ticketsEvolutionByPeriod = Array.isArray(res?.data) ? res.data : []
          const series = [{
            name: this.$t('dashBoard.evolutionByPeriod'), 
            type: 'column',
            data: []
          }, {
            type: 'line',
            data: []
          }
          ]
          const labels = []
          if (this.ticketsEvolutionByPeriod && this.ticketsEvolutionByPeriod.length > 0) {
            this.ticketsEvolutionByPeriod.forEach(e => {
              series[0].data.push(+e.qtd)
              labels.push(e.label)
            })
            series[1].data = series[0].data
          }
          this.ticketsEvolutionByPeriodOptions.labels = labels
          this.ticketsEvolutionByPeriodOptions.series = series
          this.safeUpdateChart(this.$refs.ChartTicketsEvolutionByPeriod, this.ticketsEvolutionByPeriodOptions, series)
        })
        .catch(error => {
          // Silenciar erros de timeout - não mostrar no console
          if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
            console.error(error)
          }
          this.ticketsEvolutionByPeriod = []
        })
    },
    getDashTicketsPerUsersDetail () {
      GetDashTicketsPerUsersDetail(this.params)
        .then(res => {
          this.ticketsPerUsersDetail = Array.isArray(res.data) ? res.data : []
          this.ticketsPerUsersTableReady = true
        })
        .catch(error => {
          console.error(error)
          this.ticketsPerUsersDetail = []
          this.ticketsPerUsersTableReady = true
        })
    },
    getDashData () {
      // Validar se as datas são iguais
      if (this.params.startDate === this.params.endDate) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('dashBoard.dataValidation'),
          position: 'top',
          timeout: 3000
        })
        return
      }

      this.setConfigWidth()
      this.getDashTicketsAndTimes()
      this.getDashTicketsChannels()
      this.getDashTicketsEvolutionChannels()
      this.getDashTicketsQueue()
      this.getDashTicketsStatus()
      this.getDashTicketsReasons()
      this.getDashTicketsUser()
      this.getDashTicketsEvolutionByPeriod()
      this.getDashTicketsEvolutionByValue()
      this.getDashTicketsPerUsersDetail()
      this.getDashTicketsEvolutionChannelsName()
    },
    applyTheme(themeKey) {
      // Primeiro, garante que as cores personalizadas estejam carregadas
      const colorsLoaded = this.loadCustomColors()
      
      // Se não conseguiu carregar cores personalizadas, aplica cores de fallback
      if (!colorsLoaded) {
        this.setFallbackColors()
      }
      
      if (typeof themeKey === 'object' && themeKey !== null) {
        themeKey = themeKey.value || themeKey
      }
      if (!dashboardThemes[themeKey]) {
        themeKey = 'padrao'
      }
      const theme = dashboardThemes[themeKey]
      if (!theme) {
        console.error('Tema não encontrado:', themeKey)
        return
      }

      // Função para obter o valor real da cor (resolver variáveis CSS se necessário)
      const getColorValue = (color) => {
        if (color.startsWith('var(--')) {
          return getComputedStyle(document.documentElement).getPropertyValue(color.slice(4, -1)).trim()
        }
        return color
      }

      // Aplica opções nos gráficos (deep clone)
      const chartTheme = {
        mode: theme.chartOptions.mode,
        palette: theme.chartOptions.palette
      }

      // Se for o tema padrão, adiciona configurações monócromas
      if (themeKey === 'padrao' && theme.chartOptions.monochrome) {
        const primaryColor = getColorValue(theme.colors.primary)
        chartTheme.monochrome = {
          enabled: true,
          color: primaryColor,
          shadeTo: theme.chartOptions.monochrome.shadeTo,
          shadeIntensity: theme.chartOptions.monochrome.shadeIntensity
        }
      } else {
        // Para outros temas, aplica as cores específicas do tema
        const colors = [
          getColorValue(theme.colors.primary),
          getColorValue(theme.colors.accent),
          getColorValue(theme.colors.positive),
          getColorValue(theme.colors.warning),
          getColorValue(theme.colors.negative),
          getColorValue(theme.colors.light),
          getColorValue(theme.colors.dark)
        ].filter(color => color && color !== 'undefined')
        
        if (colors.length > 0) {
          chartTheme.colors = colors
        }
      }

      this.ticketsQueueOptions = _cloneDeep({ ...this.ticketsQueueOptions, theme: chartTheme })
      this.ticketsStatusOptions = _cloneDeep({ ...this.ticketsStatusOptions, theme: chartTheme })
      this.ticketsReasonsOptions = _cloneDeep({ ...this.ticketsReasonsOptions, theme: chartTheme })
      this.ticketsUserOptions = _cloneDeep({ ...this.ticketsUserOptions, theme: chartTheme })
      this.ticketsChannelsOptions = _cloneDeep({ ...this.ticketsChannelsOptions, theme: chartTheme })
      this.ticketsEvolutionChannelsOptions = _cloneDeep({ ...this.ticketsEvolutionChannelsOptions, theme: chartTheme })
      this.ticketsEvolutionByPeriodOptions = _cloneDeep({ ...this.ticketsEvolutionByPeriodOptions, theme: chartTheme })
      this.ticketsEvolutionByValueOptions = _cloneDeep({ ...this.ticketsEvolutionByValueOptions, theme: chartTheme })
      this.ticketsChannelsNamesOptions = {...this.ticketsChannelsNamesOptions, theme: chartTheme}
      
      // Atualiza usando a função segura
      this.$nextTick(() => {
        this.safeUpdateChart(this.$refs.ChartTicketsQueue, this.ticketsQueueOptions, this.ticketsQueueOptions.series)
        this.safeUpdateChart(this.$refs.ChartTicketsStatus, this.ticketsStatusOptions, this.ticketsStatusOptions.series)
        this.safeUpdateChart(this.$refs.ChartTicketsReasons, this.ticketsReasonsOptions, this.ticketsReasonsOptions.series)
        this.safeUpdateChart(this.$refs.ChartTicketsUser, this.ticketsUserOptions, this.ticketsUserOptions.series)
        this.safeUpdateChart(this.$refs.ChartTicketsChannels, this.ticketsChannelsOptions, this.ticketsChannelsOptions.series)
        this.safeUpdateChart(this.$refs.ChartTicketsName, this.ticketsChannelsNamesOptions, this.ticketsChannelsNamesOptions.series)
      })
    },
    updateChartType(key, value) {
      // Normaliza valor vindo do QSelect (pode ser objeto {label,value} ou string)
      const type = typeof value === 'object' && value !== null ? value.value : value
      // Vue 3: não existe this.$set; atribuição direta é reativa para props já existentes
      if (this.chartPanels[key]) {
        // Garante que a chave 'type' exista antes de setar
        const current = this.chartPanels[key]
        this.chartPanels[key] = { ...current, type }
      }
      // incrementa chave para forçar remount do componente ApexChart
      if (this.chartKeys[key] !== undefined) this.chartKeys[key]++
      
      // Adiciona um pequeno delay para evitar erros de renderização do ApexCharts
      this.$nextTick(() => {
        // Atualiza o gráfico correspondente imediatamente
        switch (key) {
          case 'queue':
            this.getDashTicketsQueue(); break;
          case 'user':
            this.getDashTicketsUser(); break;
          case 'status':
            this.getDashTicketsStatus(); break;
          case 'channel':
            this.getDashTicketsChannels(); break;
          case 'channelName':
            this.getDashTicketsEvolutionChannelsName(); break;
          case 'reasons':
            this.getDashTicketsReasons(); break;
          case 'evolutionChannels':
            this.getDashTicketsEvolutionChannels(); break;
        }
      })
      this.savePanelPrefs()
    },
    savePanelPrefs() {
      const validTypes = ['pie', 'bar', 'line', 'area', 'radar', 'donut'];
      Object.keys(this.chartPanels).forEach(key => {
        if (!validTypes.includes(this.chartPanels[key].type)) {
          this.chartPanels[key].type = 'pie';
        }
      });
      localStorage.setItem('dashboardChartPanels', JSON.stringify(this.chartPanels))
    },
    // Função para atualizar gráficos com tratamento de erro e guarda de estado
    safeUpdateChart(ref, options, series) {
      const doUpdate = () => {
        try {
          if (ref && ref.chart) {
            const safeSeries = Array.isArray(series) ? series : []
            const safeOptions = { ...options, series: Array.isArray(options?.series) ? options.series : (safeSeries || []) }
            ref.updateOptions(safeOptions)
            ref.updateSeries(safeSeries, true)
          }
        } catch (error) {
          const errorStr = String(error)
          if (!errorStr.includes('Expected number') &&
              !errorStr.includes('NaN') &&
              !errorStr.includes('<path> attribute d:')) {
            console.error('Erro ao atualizar gráfico:', error)
          }
        }
      }
      if (!ref || !ref.chart) {
        this.$nextTick(doUpdate)
        return
      }
      doUpdate()
    },
  },
  beforeMount () {
    // this.suppressApexChartsErrors()
    
    this.$store.commit('UPDATE_SHOW_MENU', this.showMenu)
    this.listarConfiguracoes()
    
    // Carrega cores personalizadas ou aplica fallback antes de aplicar o tema
    const colorsLoaded = this.loadCustomColors()
    if (!colorsLoaded) {
      this.setFallbackColors()
    }
    this.applyTheme(this.selectedTheme)
  },
  mounted () {
    // this.suppressApexChartsErrors()
    
    // Garante que as cores estejam carregadas novamente no mounted
    const colorsLoaded = this.loadCustomColors()
    if (!colorsLoaded) {
      this.setFallbackColors()
    }
    
    this.listarUsuarios()
    this.listarFilas()
    this.getDashData()
    
    // Aplica o tema novamente para garantir que use as cores carregadas
    this.$nextTick(() => {
      this.applyTheme(this.selectedTheme)
    })
    
    // Verifica e corrige cores após um pequeno delay para refreshes rápidos
    setTimeout(() => {
      this.forceColorApplication()
    }, 100)
    
    this.savePanelPrefs()
  }
}
</script>

<style lang="scss">
// Cards principais
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.13);
  }

  .q-card-section {
    padding: 1.2rem 1.5rem;
  }
}

// Títulos
h1, .text-h4, .text-h5, .text-h6 {
  color: var(--q-primary);
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 0.5rem;
}

// Títulos brancos para cards coloridos
.text-branco, .text-white {
  color: #fff !important;
}

// Banners e avisos
.q-banner {
  border-radius: 12px;
  background: #fffbe6 !important;
  border: 1px solid #ffe58f;
  color: #222;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

// Separadores
.q-separator {
  margin: 1rem 0;
  border-radius: 2px;
}

// Tabelas
.q-table {
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.07);
  border: 1px solid rgba(255,255,255,0.18);
  th, td {
    padding: 1rem 0.7rem;
    font-size: 1rem;
  }
  thead th {
    color: var(--q-primary);
    font-weight: 700;
    background: rgba(var(--q-primary-rgb), 0.07);
  }
  tbody tr {
    transition: background 0.2s;
    &:hover {
      background: rgba(var(--q-primary-rgb), 0.04);
    }
  }
}

// Gráficos
.apexcharts-canvas {
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  background: transparent !important;
}

// Scrollbar personalizada
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: var(--q-primary);
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 8px;
}

// Responsividade
@media (max-width: 900px) {
  .q-card {
    border-radius: 14px !important;
    .q-card-section {
      padding: 1rem;
    }
  }
  h1, .text-h4, .text-h5, .text-h6 {
    font-size: 1.1rem;
  }
}
@media (max-width: 600px) {
  .q-card {
    border-radius: 10px !important;
    .q-card-section {
      padding: 0.7rem;
    }
  }
  h1, .text-h4, .text-h5, .text-h6 {
    font-size: 1rem;
  }
  .q-table th, .q-table td {
    font-size: 0.95rem;
    padding: 0.6rem 0.3rem;
  }
  .rdsPainelDate {
    flex-direction: column !important;
    gap: 16px;
    .date-row {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      justify-content: center;
      .q-mb-sm {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
      }
      .q-datetime-picker, .q-field {
        width: 100% !important;
        min-width: 120px;
      }
    }
    .actions-row {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      justify-content: center;
      align-items: center;
      .q-btn {
        flex: 1;
        min-width: 120px;
        max-width: 200px;
      }
      .q-toggle {
        flex-shrink: 0;
      }
    }
  }
  .q-card-section > .row.justify-between.items-center {
    flex-direction: column !important;
    align-items: stretch !important;
  }
  .text-h4, .text-h5, .text-h6 {
    text-align: center !important;
    width: 100%;
  }
}

// Modo escuro
body.body--dark {
  .q-card, .q-table {
    background: rgba(30, 30, 30, 0.97);
    border-color: rgba(255,255,255,0.10);
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  }
  .q-table thead th {
    background: rgba(255,255,255,0.05);
    color: var(--q-primary);
  }
  .q-table tbody tr:hover {
    background: rgba(255,255,255,0.05);
  }
  .q-banner {
    background: rgba(255,251,230,0.10) !important;
    border-color: rgba(255,229,143,0.18);
    color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--q-primary);
  }
  ::-webkit-scrollbar-track {
    background: #222;
  }
    
  // Força a cor do texto do tooltip no modo escuro
  .apexcharts-tooltip {
    background: #333 !important;
    border: 1px solid #555 !important;
    color: #fff !important;
    
    .apexcharts-tooltip-title {
      background: #444 !important;
      color: #fff !important;
      border-bottom: 1px solid #555 !important;
    }
    
    .apexcharts-tooltip-y-group {
      color: #fff !important;
    }
    
    .apexcharts-tooltip-goals-group {
      color: #fff !important;
    }
    
    .apexcharts-tooltip-marker {
      background: #fff !important;
    }
  }

  .apexcharts-menu-item * {
    color: #fff !important;
  }
  
  // Força o fundo escuro e texto branco no menu do ApexCharts
  .apexcharts-menu {
    background: #333 !important;
    border: 1px solid #555 !important;
    color: #fff !important;
    
    .apexcharts-menu-item {
      background: #333 !important;
      color: #fff !important;
      border-bottom: 1px solid #555 !important;
      
      &:hover {
        background: #444 !important;
        color: #fff !important;
      }
    }
  }
  
  // Força a cor do texto em todos os elementos do tooltip
  .apexcharts-tooltip * {
    color: #fff !important;
  }
}
</style>
