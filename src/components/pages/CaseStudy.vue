<template>
  <div class="px-10 text-left w-screen ">
    <!--  case study  -->
    <div class="capitalize font-black text-4xl py-10">
      {{ studyArea }}
    </div>
    <div class="w-screen grid grid-cols-2">
      <div class="py-2 w-3/4">
        <!-- title -->
        <div>
          <div class="text-xl">
            Korea has a Population:
            <span class="font-bold">26 Million people</span> as of 2023.
          </div>
          <div class="py-4">
            <div class="font-bold text-xl">Triage and Acuity Scale</div>
            Triage and Acuity Scale is a system used to rapidly assess and
            prioritize patients’ needs in emergency departments (EDs) and other
            healthcare settings. Components Triage: The process of sorting
            patients based on their urgency of need, from most critical to least
            critical. Acuity: A measure of a patient’s severity of illness or
            injure , typically assessed using standardized criteria.
          </div>
          <!--  triage scales -->
        
            <div class="font-bold text-xl">
              Types of Triage Scales: [<a
                href="https://doi.org/10.7748/en2009.07.17.4.16.c7122"
                class="hover:cursor-pointer text-blue-700 hover:underline"
                >1</a
              >,
              <a
                href="https://doi.org/10.3238/arztebl.2010.0892"
                class="hover:cursor-pointer text-blue-700 hover:underline"
                >2</a
              >]
            </div>
            As triage scales should be matched to the specific medical
            environment in which they are used, the application of a triage
            scale developed for one country should be approached with caution
            when applied to another country. Examples of Triage scales that
            exist are:
            <ul style="list-style-type: disc" class="px-7">
              <li>Korean Triage and Acuity Scale (KTAS)</li>
              <li>Canadian Triage and Acuity Scale (CTAS)</li>
              <li>Australian Triage Scale (ATS)</li>
              <li>Manchester Triage Scale</li>
            </ul> 

          <div>
            <div class="font-bold text-xl pt-2">KTAS</div>
            KTAS was developed based on the CTAS and has been used nationwide in
            South Korea(since 2016). It is composed of five levels:

            <ul style="list-style-type: disc" class="px-7">
              <li>Level 1: Critical</li>
              <li>Level 2: Urgent Level</li>
              <li>Level 3: Semi-urgent</li>
              <li>Level 4: Less urgent</li>
              <li>Level 5: Non-urgent</li>
            </ul>
          </div>
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
            class="rounded-lg"
          ></canvas>
        </div>
      </div>
    </div> 
     <div class="flex">
      <div class="">
        Reference article:<a
          class="text-blue-800 font-bold"
          href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0216972"
        >
          paper</a
        > 
    </div>
   
     </div>
     <div class="mx-10 flex justify-end">
      <RouterLink
        to="/dataSetOverview"
        class="rounded-full bg-[#1446A0] hover:bg-black w-fit px-10 py-2 my-6  hover:cursor-pointer text-white"
        >Dataset Overview</RouterLink
      >
    </div>
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

      // Generate colors with decreasing opacity
      const colors = data.map((_, index) => {
        const opacity = 1 - index * 0.1; // Decrease opacity for each bar
        return `rgba(136, 8, 8, ${Math.max(opacity, 0.5)})`; // Minimum opacity of 0.2
      });

      new Chart(document.getElementById("diseaseChart"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Deaths per 100 000 population",
              data: data,
              backgroundColor: colors, // Apply dynamic colors
              borderColor: "#880808",
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false, // Remove grid lines from the y-axis
              },
            },
            x: {
              grid: {
                display: false, // Remove grid lines from the x-axis
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            datalabels: {
              color: "#FFFFFF", // Set label color to white
              anchor: "center", // Center-align labels within bars
              align: "center", // Vertically align labels in the middle
              formatter: (value) => value, // Display the data value
              font: {
                size: 12, // Adjust font size
              },
            },
          },
        },
        plugins: [ChartDataLabels], // Register the plugin
      });
    },
  },
  mounted() {
    Chart.register(ChartDataLabels);
    this.showCausesOfDeath();
  },
};
</script>
