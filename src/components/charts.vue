<template>
  <div
    class="px-24 text-left w-full h-screen tracking-widest leading-loose grid place-content-center"
  >
    <div>
      <h1>Patient Arrival Means</h1>
      <div class="w-10 h-10">
      <canvas
        id="arrivalModeChart"
        class="rounded-lg bg-gray-200 " 
      ></canvas></div>
    </div>
    <div
      class="rounded-full bg-gray-950 hover:bg-black w-fit px-4 py-2 my-6 scale-90 hover:cursor-pointer text-white"
    >
      start here
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import { triageDataPath } from "../utility/constants";

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
    async patientArrivalMeans() {
      await this.loadCSVData();

      const arrivalCounts = {};
      this.triageData.forEach((entry) => {
        const mode = entry["Arrival mode"];
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

      new Chart(document.getElementById("arrivalModeChart"), {
        type: "bar", // Bar chart
        data: {
          labels: labels,
          datasets: [
            {
              label: "Number of Patients",
              data: data,
              backgroundColor: "#000000", // Bar color
              borderWidth: 0.5,
              borderRadius: 200,
            },
          ],
        },
        options: {
          indexAxis: "y", // Set this to 'y' to make the bars horizontal
          responsive: true,
          scales: {
            x: {
              beginAtZero: true, // Ensure bars start at zero on the x-axis
              grid: {
                display: false, // Remove grid lines from y-axis
              },
            },
            y: {
              beginAtZero: true, // Ensure bars start at zero on the y-axis
              grid: {
                display: false, // Remove grid lines from y-axis
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    // Call patientArrivalMeans method when the component is mounted
    this.patientArrivalMeans();
  },
};
</script>
