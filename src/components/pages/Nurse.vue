<template>
  <div class="px-24 text-left w-full h-screen tracking-widest leading-loose">
    <div class="font-bold text-4xl py-2">Focusing on Triage Diagnosis</div>
    <!-- nurse  -->
    <div class="grid grid-cols-2">
      <h1>General Nurse Diagnosis</h1>
      <div style="position: relative; height: 40vh; width: 40vw">
        <canvas
          id="nurseDiagnosisChart"
          class="rounded-lg bg-green-50"
        ></canvas>
      </div>
    </div>

    <!--  expert -->
    
    <RouterLink
      to="/"
      class="rounded-full bg-gray-950 hover:bg-black w-fit px-4 py-2 my-6 scale-90 hover:cursor-pointer text-white"
    >
      What did the Experts say?   
    </RouterLink>
  </div>
</template>

<script>
import Papa from "papaparse";
import { triageDataPath } from "../../utility/constants";
import { RouterLink } from "vue-router";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the datalabels plugin

export default {
  data() {
    return {
      count: 0,
      triageData: [], // Store the data here
    };
  },
  props: ["title", "chartTarget"],
  methods: {
    // Load CSV data asynchronously
    async loadCSVData() {
      try {
        const response = await fetch(triageDataPath);
        const text = await response.text();
        return Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            // Store the parsed data in triageData
            this.triageData = result.data;
          },
          skipEmptyLines: true,
        });
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    },

    // Function to process and plot arrival means
    async nurseDiagnosisChart() {
      await this.loadCSVData();

      const arrivalCounts = {};
      this.triageData.forEach((entry) => {
        const mode = entry["KTAS_Nurse"];
        if (mode) {
          arrivalCounts[mode] = (arrivalCounts[mode] || 0) + 1;
        }
      });

      // Sort the data by counts in descending order
      const sortedArrivalCounts = Object.entries(arrivalCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count (value) in descending order
        .map(([key, value]) => ({ mode: key, count: value }));

      // Extract the sorted labels and data for the chart
      const labels = sortedArrivalCounts.map((entry) => entry.mode);
      const data = sortedArrivalCounts.map((entry) => entry.count);

      // Total for calculating percentages
      const total = data.reduce((sum, value) => sum + value, 0);

      new Chart(document.getElementById("nurseDiagnosisChart"), {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nurse Diagnosis Chart",
              data: data,
              backgroundColor: ["#880808", "#00000"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
                return `${percentage}%`; // Display percentage
              },
              color: "#fff", // Label text color
              font: {
                weight: "bold",
              },
              align: "center",
            },
            legend: {
              position: "top", // Position the legend
            },
          },
        },
      });
    },

    async expertDiagnosisChart() {
      await this.loadCSVData();

      const arrivalCounts = {};
      this.triageData.forEach((entry) => {
        const mode = entry["KTAS_expert"];
        if (mode) {
          arrivalCounts[mode] = (arrivalCounts[mode] || 0) + 1;
        }
      });

      // Sort the data by counts in descending order
      const sortedArrivalCounts = Object.entries(arrivalCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([key, value]) => ({ mode: key, count: value }));

      // Extract the sorted labels and data for the chart
      const labels = sortedArrivalCounts.map((entry) => entry.mode);
      const data = sortedArrivalCounts.map((entry) => entry.count);

      const total = data.reduce((sum, value) => sum + value, 0); // Total count for percentage calculation

      new Chart(document.getElementById("expertDiagnosisChart"), {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Expert Diagnosis Chart",
              data: data,
              backgroundColor: ["#880808", "#00000"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
                return `${percentage}%`; // Display percentage
              },
              color: "#fff", // Label text color
              font: {
                weight: "bold",
                size: 14,
              },
              align: "center",
              anchor: "center",
            },
            legend: {
              position: "top", // Position the legend
            },
          },
        },
      });
    },
  },
  mounted() {
    Chart.register(ChartDataLabels);
    // Call patientArrivalMeans method when the component is mounted
    this.nurseDiagnosisChart();
    this.expertDiagnosisChart();
  },
};
</script>
