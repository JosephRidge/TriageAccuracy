<template>
  <div class="text-left w-screen h-screen bg-gray-50 leading-loose">
    <div class="font-bold text-4xl py-6 px-24">
      Korean Triage and Acuity Scale KPIs
    </div>
 
      <!-- tables -->
        <div class="px-24 py-5 w-screen h-fit flex justify-evenly">
      <!-- confusion matrix -->
      <div class="bg-white p-auto shadow-lg rounded-md">
        <table class="rounded-md m-4">
          <thead>
            <tr class="bg-white w-screen">
              <th></th>
              <!-- Empty cell for top-left corner -->
              <th class="bg-black text-white px-4">Nurse Remarks</th>
              <th></th>
            </tr>
            <tr>
              <th class="bg-black text-white px-4">Expert Remarks</th>
              <th class="font-normal bg-white px-3">Emergency</th>
              <th class="font-normal px-3 bg-white">Non-Emergency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="row-header px-3 bg-white">Emergency</td>
              <td class="px-3">{{ expertNurseEmergencyAlignment }}</td>
              <td class="px-3 bg-red-500 font-bold">
                {{ expertNurseEmergencyNonEmergencyAlignment }}
              </td>
            </tr>
            <tr>
              <td class="row-header px-3 bg-white">Non-Emergency</td>
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
      <!-- arrow -->
      <!-- <div class=" flex justify-end rotate-180 "> <img src="../../assets/illustrations/arrow.svg" class="w-24" alt="" srcset=""></div> -->
    </div>
      
    <div class="flex gap-4 py-4 justify-center">
      <!-- accuracy -->
      <div
        class="grid bg-white border-2   hover:border-blue-400 shadow-lg p-8 rounded-xl w-3/12"
      >
        <div class="font-bold text-3xl text-[#1446A0] text-center">
          Accuracy
        </div>
        <div class="text-5xl m-3 text-center text-gray-500 font-light">
          91.9 <span class="text-4xl text-[#1446A0]">%</span>
        </div>
        <hr />
        <div class="text-center">
          Nurses correctly classified 91.9% of the cases(high level of agreement
          with expert)
        </div>
      </div>
      <!-- Precision -->
      <div
        class="grid bg-white shadow-lg border-2   hover:border-blue-400 p-8 rounded-xl w-3/12"
      >
        <div class="font-bold text-3xl text-[#1446A0] text-center">
          Precision
        </div>
        <div class="text-5xl m-3 text-center text-gray-500 font-light">
          96.5 <span class="text-4xl text-[#1446A0]">%</span>
        </div>
        <hr />
        <div class="text-center">
          When nurses say a case is an emergency, they were correct 96.5% of the
          time
        </div>
      </div>
    </div>

    <div class="flex gap-4 justify-center">
      <!-- Sensitivity -->
      <div
        class="grid bg-white shadow-lg border-2  hover:border-blue-400 p-8 rounded-xl w-3/12"
      >
        <div class="font-bold text-3xl text-[#1446A0] text-center">
          Sensitivity
        </div>
        <div class="text-5xl m-3 text-center text-gray-500 font-light">
          89.4 <span class="text-4xl text-[#1446A0]">%</span>
        </div>
        <hr />
        <div class="text-center">
          Nurses correctly identified 89.4% of all emergencies, but 10.6% of the
          emergencies were missed
        </div>
      </div>
      <!-- specificity -->
      <div
        class="grid bg-white shadow-lg border-2  hover:border-blue-400 p-8 rounded-xl w-3/12"
      >
        <div class="font-bold text-3xl text-[#1446A0] text-center">
          Specificity
        </div>
        <div class="text-5xl m-3 text-center text-gray-500 font-light">
          95.5 <span class="text-4xl text-[#1446A0]">%</span>
        </div>
        <hr />
        <div class="text-center">
          Nurses correctly identified 95.5% of all non-emergencies, with only a
          small error rate
        </div>
      </div>
    </div>

    <div class="flex justify-end mx-8">
      <RouterLink
        to="/causesOfmistriage"
        class="capitalize rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2 hover:cursor-pointer text-white"
      >
        But what are the Causes of Mistriage ?
      </RouterLink>
    </div>
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
        color: type.includes("Emergency") ? "blue" : "black",
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
                return type.includes("Emergency") ? "blue" : "black";
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
