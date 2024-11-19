<template>
  <div class="px-10 text-left w-screen">
    <!--  case study  -->
    <div class="capitalize font-black text-4xl py-10">
      {{ studyArea }}
    </div>
    <div class="w-screen grid grid-cols-2">
      <div class="py-2 w-3/4">
        <!-- title -->
        <div>
          <div class="text-2xl">
            Korea has a Population:
            <span class="font-bold">26 Million people</span> as of 2023.
          </div>
          <div class="py-2 text-lg">
            <div class="font-bold">Korean Triage and Acuity Scale (KTAS)</div>
            KTAS, introduced in 2016, is a five-level triage system used across
            Korea to asses patients to determine who should receive treatment
            first .
          </div>
          <div class="py-2 text-lg">
            <div class="font-bold">
              Problem: Mistriage in Emergency Departments
            </div>
            Mistriage occurs when patients are incorrectly categorized, leading
            to delays, overcrowding, and compromised patient care.
          </div>
          <div class="py-2 text-lg">
            <div class="font-bold">Objective</div>
            Assess the accuracy of KTAS and identify causes of mistriage.
          </div>
          <div class="py-2 text-lg">
            <div class="font-bold">Dataset</div>
            <div>
              source:
              <a
                class="text-blue-800 font-bold"
                href="https://www.kaggle.com/code/ilkeryildiz/triage-application-with-machine-learning-models/notebook"
                >main dataset</a
              >
              and reference article:<a
                class="text-blue-800 font-bold"
                ref="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0216972"
                >paper</a
              >
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <!--  death causes -->
      <div>
        <div class="font-bold text-2xl py-4">
          Leading Causes of death in Korea
        </div>
        <div style="position: relative; width: 40vw">
          <canvas
            id="diseaseChart"
            height="500"
            width="800"
            class="rounded-lg bg-green-200"
          ></canvas>
        </div>
      </div>
    </div>

    <RouterLink
      to="/patients"
      class="rounded-full bg-gray-950 hover:bg-black w-fit px-4 py-2 my-6 scale-90 hover:cursor-pointer text-white"
      >let's start</RouterLink
    >
  </div>
</template>

<script>
import { introSubtitle, introTitle } from "../../utility/constants";
import { RouterLink } from "vue-router";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the datalabels plugin

export default {
  data() {
    return {
      count: 0,
      introTitle: introTitle,
      introSubtitle: introSubtitle,
      studyArea: "Korean Emergency Medical Services",
      population: "26,418,204",
      diseases: [
        { name: "Stroke", count: 218 },
        { name: "Ischaemic heart disease", count: 135 },
        { name: "Chronic obstructive pulmonary disease", count: 116 },
        { name: "Tuberculosis", count: 86 },
        { name: "Trachea, bronchus, lung cancers", count: 52 },
        { name: "Road injury", count: 43 },
        { name: "Hypertensive heart disease", count: 28 },
        { name: "Liver cancer", count: 23 },
        { name: "Alzheimer disease and other dementias", count: 22 },
        { name: "Lower respiratory infections", count: 22 },
      ],
    };
  },
  methods: {
    showCausesOfDeath() {
      // Extract names and counts
      const labels = this.diseases.map((d) => d.name);
      const data = this.diseases.map((d) => d.count);

      new Chart(document.getElementById("diseaseChart"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Deaths Population per 100,000 ",
              data: data,
              backgroundColor: "#FF6384", // Color for bars
              borderColor: "#00000",
              backgroundColor: "#000000", // Bar color
              borderWidth: 0.5,
              borderRadius: 200,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    },
  },
  mounted() {
    this.showCausesOfDeath();
  },
};
</script>
