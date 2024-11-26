<template>
  <div class=" px-24 text-left w-screen h-screen tracking-widest leading-loose">
    <div class="font-bold text-4xl py-2">
      Focusing on Triage Diagnosis: Nurse-Expert Accuracy
    </div>
 

    <div class=" py-10 w-screen h-fit ">
      <table class=" ">
        <thead>
          <tr class="bg-gray-200 w-screen">
            <th></th>
            <!-- Empty cell for top-left corner -->
            <th class="bg-black text-white px-4">Nurse Remarks</th>
            <th></th>
          </tr>
          <tr>
            <th class="bg-black text-white px-4">Expert Remarks</th>
            <th class="font-normal bg-gray-200 px-3">Emergency</th>
            <th class="font-normal px-3 bg-gray-200">Non-Emergency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="row-header px-3 bg-gray-200">Emergency</td>
            <td class="px-3">{{ expertNurseEmergencyAlignment }}</td>
            <td class="px-3 bg-red-500 font-bold">
              {{ expertNurseEmergencyNonEmergencyAlignment }}
            </td>
          </tr>
          <tr>
            <td class="row-header px-3 bg-gray-200">Non-Emergency</td>
            <td class="px-3 bg-red-500 font-bold">
              {{ expertNurseNonEmergencyEmergencyAlignment }}
            </td>
            <td class="px-3">
              {{ expertNurseNonEmergencyNoEmergencyAlignment }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <RouterLink
      to="/causesOfmistriage"
      class="rounded-full bg-gray-950 hover:bg-black w-fit px-4 py-2 my-6 scale-90 hover:cursor-pointer text-white"
    >
      Causes of Mistriage
    </RouterLink>
  </div>
</template>

<script>
import Papa from "papaparse";
import { triageDataPath } from "../../utility/constants";
import { RouterLink } from "vue-router";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";

export default {
  data() {
    return {
      count: 0,
      triageData: [], // Store the data here
      expertNurseEmergencyAlignment: 0,
      expertNurseEmergencyNonEmergencyAlignment: 0,
      expertNurseNonEmergencyEmergencyAlignment: 0,
      expertNurseNonEmergencyNoEmergencyAlignment: 0,
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

    async prepareTreeMapData() {
      await this.loadCSVData(); // Load the data if needed

      const counts = {
        "Emergency (Nurse)": 0,
        "Non-Emergency (Nurse)": 0,
        "Emergency (Expert)": 0,
        "Non-Emergency (Expert)": 0,
      };

      this.triageData.forEach((entry) => {
        const nurseCategory = entry["KTAS_Nurse"];
        const expertCategory = entry["KTAS_expert"];

        if (nurseCategory === "Emergency") counts["Emergency (Nurse)"]++;
        else if (nurseCategory === "Non-Emergency")
          counts["Non-Emergency (Nurse)"]++;

        if (expertCategory === "Emergency") counts["Emergency (Expert)"]++;
        else if (expertCategory === "Non-Emergency")
          counts["Non-Emergency (Expert)"]++;
      });

      // Convert counts to Treemap data format
      return Object.keys(counts).map((type) => ({
        label: type,
        value: counts[type],
        color: type.includes("Emergency") ? "red" : "black",
      }));
    },
    async matrix() {
      const ctx = document.getElementById("myChart").getContext("2d");
      const data = await this.prepareTreeMapData();
      console.log(data);

      new Chart(ctx, {
        type: "treemap",
        data: {
          datasets: [
            {
              tree: data,
              key: "value",
              groups: ["label"],
              backgroundColor: (ctx) => {
                const type = ctx.raw ? ctx.raw.label : "";
                return type.includes("Emergency") ? "red" : "black";
              },
              borderWidth: 1,
              borderColor: "white",
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const { raw } = ctx;
                  return `${raw.label}: ${raw.value}`;
                },
              },
            },
          },
        },
      });
    },

    async prepareComparisonMatrix() {
      await this.loadCSVData(); // Load the data first

      // Initialize the matrix with all combinations
      const matrix = {
        "Expert: Emergency | Nurse: Emergency": 0,
        "Expert: Emergency | Nurse: Non-Emergency": 0,
        "Expert: Non-Emergency | Nurse: Emergency": 0,
        "Expert: Non-Emergency | Nurse: Non-Emergency": 0,
      };

      this.triageData.forEach((entry) => {
        const expertRemark = entry["KTAS_expert"];
        const nurseRemark = entry["KTAS_Nurse"];

        if (expertRemark === "Emergency" && nurseRemark === "Emergency") {
          matrix["Expert: Emergency | Nurse: Emergency"]++;
        } else if (
          expertRemark === "Emergency" &&
          nurseRemark === "Non-Emergency"
        ) {
          matrix["Expert: Emergency | Nurse: Non-Emergency"]++;
        } else if (
          expertRemark === "Non-Emergency" &&
          nurseRemark === "Emergency"
        ) {
          matrix["Expert: Non-Emergency | Nurse: Emergency"]++;
        } else if (
          expertRemark === "Non-Emergency" &&
          nurseRemark === "Non-Emergency"
        ) {
          matrix["Expert: Non-Emergency | Nurse: Non-Emergency"]++;
        }
      });

      this.expertNurseEmergencyAlignment =
        matrix["Expert: Emergency | Nurse: Emergency"];
      this.expertNurseEmergencyNonEmergencyAlignment =
        matrix["Expert: Emergency | Nurse: Non-Emergency"];
      this.expertNurseNonEmergencyEmergencyAlignment =
        matrix["Expert: Non-Emergency | Nurse: Emergency"];
      this.expertNurseNonEmergencyNoEmergencyAlignment =
        matrix["Expert: Non-Emergency | Nurse: Non-Emergency"];
    },
  },
  mounted() {
    Chart.register(ChartDataLabels);
    Chart.register(TreemapController, TreemapElement);
    this.prepareComparisonMatrix();
  },
};
</script>
