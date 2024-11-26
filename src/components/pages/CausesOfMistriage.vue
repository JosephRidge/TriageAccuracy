<template>
  <div>
    <div class="font-bold text-4xl py-4 px-24">Causes Of Mistriage</div>
    <div style="position: relative; height: 60vh; width: 70vw">
      <canvas id="barChart" class="rounded-lg"></canvas>
    </div>
     <!-- navigation button -->
     <div class="py-6 mx-auto flex justify-center">
      <RouterLink
        to="/nurse"
        class="capitalize rounded-full bg-gray-950 hover:bg-black w-fit px-4 py-2 scale-90 hover:cursor-pointer text-white"
      >
       Find more about the data we used...
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels" 

export default defineComponent({
  name: "VitalSignsVisualization",
  mounted() {
    Chart.register(ChartDataLabels);
    this.createBarChart();
  },
  methods: {
    createBarChart() {
      const canvas = document.getElementById("barChart");
      const ctxBar = canvas.getContext("2d");

      // Original labels and dataset values
      const labels = [
        "Applying pain scale",
        "Applying physical symptom chief complaint",
        "Applying psychological assessment",
        "Applying vital signs",
        "Considering mental state",
        "Considering symptom onset",
        "Considering transfer notes",
        "Considering underlying disease",
        "Other",
      ];

      const overTriageData = [24, 16, 0, 7, 4, 1, 1, 2, 0];
      const underTriageData = [40, 31, 6, 15, 9, 8, 8, 7, 7];

      // Combine labels and data for sorting
      const combinedData = labels.map((label, index) => ({
        label,
        overTriage: overTriageData[index],
        underTriage: underTriageData[index],
        total: overTriageData[index] + underTriageData[index], // Use total as sorting metric
      }));

      // Sort the data by total value (ascending order)
      combinedData.sort((a, b) => b.total - a.total);

      // Separate sorted data back into labels and datasets
      const sortedLabels = combinedData.map((item) => item.label);
      const sortedOverTriage = combinedData.map((item) => item.overTriage);
      const sortedUnderTriage = combinedData.map((item) => item.underTriage);

      new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: sortedLabels, // Use sorted labels
          datasets: [
            {
              label: "Over Triage",
              data: sortedOverTriage,  
              backgroundColor: "#add8e6",
              borderWidth: 0.5, 
            },
            {
              label: "Under Triage",
              data: sortedUnderTriage,  
              backgroundColor: "#C70039",
              borderWidth: 0.5, 
            },
          ],
        },
        options: {
          indexAxis: "y", // Horizontal bars
          responsive: true,
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false, // Remove grid lines from the x-axis
              },
            },
            y: {
              stacked: true,
              grid: {
                display: false, // Remove grid lines from the y-axis
              },
            },
          },
        },
      });
    },
  },
});
</script>

<style scoped>
canvas {
  margin: 20px;
}
</style>
