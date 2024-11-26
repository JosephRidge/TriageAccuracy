<template>
  <div>
    <canvas id="barChart"></canvas>
    <canvas id="scatterChart"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'VitalSignsVisualization',
  mounted() {
    this.createBarChart();
    this.createScatterPlot();
  },
  methods: {
    // Bar Chart: Average Vital Signs per Status Category
    createBarChart() {
      const ctxBar = document.getElementById('barChart').getContext('2d');
      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Systolic BP', 'Diastolic BP', 'Heart Rate'],
          datasets: [
            {
              label: 'Overtriage',
              data: [130, 85, 100],
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
              label: 'Correct',
              data: [120, 80, 85],
              backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
              label: 'Undertriage',
              data: [110, 75, 70],
              backgroundColor: 'rgba(75, 192, 192, 1)',
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },

    // Scatter Plot: Vital Signs vs. Mistriage Status
    createScatterPlot() {
      const ctxScatter = document.getElementById('scatterChart').getContext('2d');
      new Chart(ctxScatter, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Overtriage',
              data: [{ x: 130, y: 100 }, { x: 125, y: 110 }],
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
              label: 'Correct',
              data: [{ x: 120, y: 85 }, { x: 118, y: 90 }],
              backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
              label: 'Undertriage',
              data: [{ x: 110, y: 70 }, { x: 112, y: 72 }],
              backgroundColor: 'rgba(75, 192, 192, 1)',
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              type: 'linear',
            },
          },
        },
      });
    },
  }
});
</script>

<style scoped>
canvas {
  margin: 20px;
}
</style>
