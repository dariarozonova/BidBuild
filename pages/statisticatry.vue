<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="indigo">
            <v-spacer></v-spacer>
            <v-toolbar-title class="font-weight-bold white--text">Sludinājumu statistika</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <Bar v-if="loaded" :chartData="chartData" :options="chartOptions" />
          <v-card-text style="text-align: center">{{ lastUpdate }}</v-card-text>
        </v-card>
        <v-card class="elevation-2 mt-5">
          <v-card-text>
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Apskatīt sludinājumu statistiku
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: null,
      lastUpdate: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              borderColor: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: 'rgba(0, 0, 0, 0.7)',
            },
          },
          x: {
            grid: {
              borderColor: 'rgba(0, 0, 0, 0)',
            },
            ticks: {
              color: 'rgba(0, 0, 0, 0.7)',
            },
          },
        },
      },
    }
  },
  async mounted() {
    this.loaded = false}
}
</script>
