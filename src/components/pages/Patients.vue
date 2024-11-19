<template>
  <div class="px-24 text-left w-full h-screen tracking-widest leading-loose">
    <div class="font-bold text-4xl py-2">Focusing on Patients</div>

    <!-- patient arrival  -->
    <div>
      <h1>Patient Arrival Means</h1>
      <div style="position: relative; width: 50vw">
        <canvas id="arrivalModeChart" class="rounded-lg bg-green-200"></canvas>
      </div>
    </div>

    <!-- patient time at triage -->
    <div>
      <h1 class="pt-4">Time taken a triage</h1>
      <div style="position: relative; width: 50vw">
        <canvas
          id="triageTimeDistChart"
          class="rounded-lg bg-green-200"
        ></canvas>
      </div>
    </div>
    <!-- navigation button -->
    <div class="py-4">
      <RouterLink
        to="/"
        class="rounded-full bg-gray-950 hover:bg-black w-fit px-4 py-2 scale-90 hover:cursor-pointer text-white"
      >
        What the Nurse vs Expert said
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import { triageDataPath } from "../../utility/constants";
import { RouterLink } from "vue-router";

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
          layout: {
            padding: 20,
          },
          indexAxis: "y", // Set this to 'y' to make the bars horizontal
          responsive: true,
          scales: {
            x: {
              beginAtZero: true, // Ensure bars start at zero on the x-axis
              grid: {
                display: false, // Remove grid lines from y-axis
              },
              ticks: {
                display: false, // Hide the ticks (markings) on the x-axis
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
    async timeAtTriage() {
      await this.loadCSVData();

      const binWidth = 1.5; // Set each bin range to 1.5
      const minDuration = 0; // Start from 0
      const maxDuration = 18; // End at 18

      // Create bins for each range (0-1.5, 1.5-3.0, etc.)
      const numBins = Math.ceil((maxDuration - minDuration) / binWidth);
      const bins = Array(numBins).fill(0); // Initialize bins to 0

      // Get the "KTAS duration_min" values and filter out any null or undefined values
      const durationValues = this.triageData
        .map((entry) => entry["KTAS duration_min"])
        .filter((value) => value !== null && value !== undefined);

      // Distribute data points into bins based on the bin width of 1.5
      durationValues.forEach((value) => {
        const binIndex = Math.min(Math.floor(value / binWidth), numBins - 1); // Ensure binIndex is within the range of bins
        bins[binIndex]++;
      });

      // Generate the bin range labels for the y-axis (counts of patients in each bin)
      const counts = bins; // Counts of patients per bin

      // Prepare the data for the chart
      const labels = counts; // Set the labels as the counts instead of the ranges

      // Create the histogram chart
      new Chart(document.getElementById("triageTimeDistChart"), {
        type: "bar", // Bar chart
        data: {
          labels: labels, // Counts as x-axis labels
          datasets: [
            {
              label: "Average time at Triage in minutes",
              data: bins,
              backgroundColor: "#000000", // Bar color
              borderWidth: 0.5,
              borderRadius: 10, // Rounded corners for the bars
              categoryPercentage: 0.9, // Control the width of each bar (reduce category percentage to reduce space between bars)
              barPercentage: 1, // Ensure bars fit within each category without gaps
            },
          ],
        },
        options: {
          layout: {
            padding: 20,
          },
          indexAxis: "x", // Set this to 'y' to make the bars horizontal
          responsive: true,
          scales: {
            x: {
              beginAtZero: true, // Ensure bars start at zero on the x-axis
              grid: {
                display: false, // Remove grid lines from the x-axis
              },
              ticks: {
                display: true, // Show counts as labels on the x-axis
              },
            },
            y: {
              ticks: {
                display: false, // Show counts as labels on the x-axis
              },
              beginAtZero: true, // Ensure bars start at zero on the y-axis
              grid: {
                display: false, // Remove grid lines from the y-axis
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
    this.timeAtTriage();
  },
};
</script>

<style>
canvas {
  width: 50vw; /* Full width of the parent container */
  height: 50vh; /* 50% of the viewport height */
  max-height: 500px; /* Optionally, you can set a max height */
}
</style>
