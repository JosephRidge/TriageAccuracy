<template>
  <div class="text-left w-screen h-screen">
    <div class="font-bold text-4xl py-4 px-24 ">Focusing on Patients</div>

    <div class="grid grid-cols-2 px-24 ">
      <!-- patient arrival  -->
      <div class="mx-4">
        <h1>Patient Arrival Means</h1>
        <div style="position: relative; height: 40vh; width: 50vw">
          <canvas id="arrivalModeChart" class="rounded-lg"></canvas>
        </div>
      </div>
      <!-- patient gender -->
      <div class="mx-4">
        <h1>Patient Gender</h1>
        <div style="position: relative; height: 40vh; width: 50vw">
          <canvas id="genderModeChart" class="rounded-lg"></canvas>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 px-24 ">
      <!-- patient age -->
      <div class=" ">
        <h1>Patient Age</h1>
        <div style="position: relative; height: 35vh; width: 50vw">
          <canvas id="ageDistChart" class="rounded-lg"></canvas>
        </div>
      </div>
      <!-- mental state -->
      <div class=" ">
        <h1>Patient Mental State on Arrival</h1>
        <div style="position: relative; height: 35vh; width: 40vw">
          <canvas id="mentalStateChart" class="rounded-lg"></canvas>
        </div>
      </div>
    </div>

    <!-- navigation button -->  
    <div class=" px-4 py-1 flex justify-end ">
      <RouterLink
        to="/nurse"
        class="capitalize rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2   hover:cursor-pointer text-white"
      >
        Find out the Nurses diagnosis...
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Papa from "papaparse";
import { triageDataPath } from "../../utility/constants";
import { RouterLink } from "vue-router";
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
              backgroundColor: "#1446A0", // Bar color
              borderWidth: 0.5,
              // borderRadius: 200,
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

    async genderModeChart() {
      await this.loadCSVData();
      const arrivalCounts = {};
      this.triageData.forEach((entry) => {
        const mode = entry["Sex"];
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

      new Chart(document.getElementById("genderModeChart"), {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nurse Diagnosis Chart",
              data: data,
              backgroundColor: ["#1446A0", "#00000"],
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

    async mentalStateChart() {
      await this.loadCSVData();
      const arrivalCounts = {};
      this.triageData.forEach((entry) => {
        const mode = entry["Mental"];
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

      new Chart(document.getElementById("mentalStateChart"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Patient Mental State",
              data: data,
              backgroundColor: "#1446A0", // Bar color
              // borderWidth: 0.5,
              // borderRadius: 10, // Rounded corners for the bars
              categoryPercentage: 0.9, // Control the width of each bar (reduce category percentage to reduce space between bars)
              barPercentage: 1, // Ensure bars fit within each category without gaps
        
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true, // Ensure bars start at zero on the x-axis
              grid: {
                display: false, // Remove grid lines from the x-axis
              },
              ticks: {
                display: true, // Show bin ranges as labels on the x-axis
              },
            },
            y: {
              ticks: {
                display: false, // Show counts as labels on the y-axis
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

    async ageAtTriage() {
      await this.loadCSVData();

      // Set up bin parameters
      const minAge = 0; // Start from age 0
      const maxAge = 100; // Maximum age for the histogram (you can adjust this based on your data)
      const numBins = 5; // Number of bins (5 bins for age distribution)

      // Calculate bin width based on the number of bins and age range
      const binWidth = (maxAge - minAge) / numBins;

      // Initialize bins to 0
      const bins = Array(numBins).fill(0);

      // Get the "Age" values and filter out any null or undefined values
      const ageValues = this.triageData
        .map((entry) => entry["Age"]) // Assuming the "Age" field in your CSV data
        .filter((value) => value !== null && value !== undefined);

      // Distribute age values into bins based on the bin width
      ageValues.forEach((value) => {
        const binIndex = Math.min(
          Math.floor((value - minAge) / binWidth),
          numBins - 1
        ); // Ensure binIndex is within the range of bins
        bins[binIndex]++;
      });

      // Prepare the bin range labels (e.g., "0-20", "21-40", etc.)
      const labels = [];
      for (let i = 0; i < numBins; i++) {
        const lowerBound = minAge + i * binWidth;
        const upperBound = lowerBound + binWidth - 1;
        labels.push(`${lowerBound}-${upperBound}`);
      }

      // Create the histogram chart
      new Chart(document.getElementById("ageDistChart"), {
        type: "bar", // Bar chart for histogram
        data: {
          labels: labels, // Bin ranges for x-axis labels
          datasets: [
            {
              label: "Age Distribution",
              data: bins, // Counts of customers in each bin

              backgroundColor: "#000000", // Bar color
              borderWidth: 0.5,
              // borderRadius: 200,
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
                display: true, // Show bin ranges as labels on the x-axis
              },
            },
            y: {
              ticks: {
                display: false, // Show counts as labels on the y-axis
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
    this.patientArrivalMeans();
    this.genderModeChart();
    this.ageAtTriage();
    this.mentalStateChart()
  },
};
</script>

<style></style>
