<template>
  <div class="text-left w-screen h-screen tracking-widest leading-loose px-36">
    <div class="font-bold text-4xl py-2">Triage Diagnosis by Nurse</div>

    <div class="grid grid-cols-2">
      <!-- nurse  -->
      <div class=" ">
        <h1>General Nurse Diagnosis</h1>
        <div style="position: relative; height: 40vh; width: 40vw">
          <canvas id="nurseDiagnosisChart" class="rounded-lg"></canvas>
        </div>
      </div>
      <!-- patient time at triage -->
      <div class=" ">
        <h1 class="pt-4">Time taken a triage</h1>
        <div style="position: relative; height: 35vh; width: 50vw">
          <canvas id="triageTimeDistChart" class="rounded-lg"></canvas>
        </div>
      </div>
    </div>
    <!-- patientsPerHRModeChart -->
    <div class="">
      <div class="">
        <h1 class="pt-4 text-center">Number Of Patients per Hour</h1>
        <div style="height: 35vh; width: 80vw" class="flex justify-center">
          <canvas id="patientsPerHRModeChart" class="rounded-lg"></canvas>
        </div>
      </div>
    </div>
    <div>
      <!-- patient seen per hour -->
      <div></div>
    </div>
    <div class="px-4 py-1 flex justify-end">
      <RouterLink
        to="/expert"
        class="capitalize rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2 hover:cursor-pointer text-white"
      >
        Triage Accuracy
      </RouterLink>
    </div>
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
              backgroundColor: ["#880808", "#1446A0"],
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
    async timeAtTriage() {
      await this.loadCSVData();

      const binWidth = 1.5;
      const minDuration = 0;
      const maxDuration = 18;
      const numBins = Math.ceil((maxDuration - minDuration) / binWidth);
      const bins = Array(numBins).fill(0);

      const durationValues = this.triageData
        .map((entry) => entry["KTAS duration_min"])
        .filter((value) => value !== null && value !== undefined);

      durationValues.forEach((value) => {
        const binIndex = Math.min(Math.floor(value / binWidth), numBins - 1); // Ensure binIndex is within the range of bins
        bins[binIndex]++;
      });

      const counts = bins;
      const labels = [];
      for (let i = 0; i < numBins; i++) {
        const lowerBound = minDuration + i * binWidth;
        const upperBound = lowerBound + binWidth;
        const formattedLowerBound = i === 0 ? "0" : lowerBound.toFixed(1); // Check if it's the first bin
        labels.push(`${formattedLowerBound}-${upperBound.toFixed(1)}`);
      }

      // Create the histogram chart
      new Chart(document.getElementById("triageTimeDistChart"), {
        type: "bar", // Bar chart
        data: {
          labels: labels, // Counts as x-axis labels
          datasets: [
            {
              label: "Average time at Triage in minutes",
              data: bins,
              backgroundColor: "#1446A0", // Bar color
              borderWidth: 0.5,
              // borderRadius: 10, // Rounded corners for the bars
              categoryPercentage: 0.9, // Control the width of each bar (reduce category percentage to reduce space between bars)
              barPercentage: 1, // Ensure bars fit within each category without gaps
            },
          ],
        },
        options: {
          indexAxis: "x", // Set this to 'y' to make the bars horizontal
          responsive: true,
          plugins: {
            datalabels: {
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
                display: true, // Show counts as labels on the x-axis
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
              backgroundColor: ["#880808", "#1446A0"],
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

    async numOfPatientsPerHour() {
      await this.loadCSVData();

      const binWidth = 3; // Set each bin range to 1.5
      const minDuration = 0; // Start from 0
      const maxDuration = 18; // End at 18

      // Create bins for each range (0-1.5, 1.5-3.0, etc.)
      const numBins = Math.ceil((maxDuration - minDuration) / binWidth);
      const bins = Array(numBins).fill(0); // Initialize bins to 0

      // Get the "Patients number per hour" values and filter out any null or undefined values
      const durationValues = this.triageData
        .map((entry) => entry["Patients number per hour"]) // Ensure the column name matches exactly
        .filter((value) => value !== null && value !== undefined);

      // Distribute data points into bins based on the bin width of 1.5
      durationValues.forEach((value) => {
        const binIndex = Math.min(Math.floor(value / binWidth), numBins - 1); // Ensure binIndex is within the range of bins
        bins[binIndex]++;
      });

      // Generate the bin range labels (e.g., "0-1.5", "1.5-3.0", etc.)
      const labels = [];
      for (let i = 0; i < numBins; i++) {
        const lowerBound = minDuration + i * binWidth;
        const upperBound = lowerBound + binWidth;
        const formattedLowerBound = i === 0 ? "0" : lowerBound.toFixed(1); // Check if it's the first bin
        labels.push(`${formattedLowerBound}-${upperBound.toFixed(1)}`);
      }

      // Create the histogram chart
      new Chart(document.getElementById("patientsPerHRModeChart"), {
        type: "bar", // Bar chart for histogram
        data: {
          labels: labels, // Bin ranges for x-axis labels (e.g., "0-1.5", "1.5-3.0")
          datasets: [
            {
              label: "Patients per Hour",
              data: bins, // Frequency of patients per bin
              backgroundColor: "#1446A0", // Bar color
              borderWidth: 0.5,
              // borderRadius: 10, // Rounded corners for the bars
              categoryPercentage: 0.9, // Control the width of each bar (reduce category percentage to reduce space between bars)
              barPercentage: 1, // Ensure bars fit within each category without gaps
            },
          ],
        },
        options: {
          indexAxis: "x", // Set this to 'y' to make the bars horizontal
          responsive: true,
          plugins: {
            datalabels: {
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
          scales: {
            x: {
              beginAtZero: true, // Ensure bars start at zero on the x-axis
              grid: {
                display: false, // Remove grid lines from the x-axis
              },
              ticks: {
                display: true, // Show bin range labels on the x-axis
              },
            },
            y: {
              ticks: {
                display: true, // Show counts on the y-axis
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
    Chart.register(ChartDataLabels);
    // Call patientArrivalMeans method when the component is mounted
    this.nurseDiagnosisChart();
    // this.expertDiagnosisChart();
    this.timeAtTriage();
    this.numOfPatientsPerHour();
  },
};
</script>
