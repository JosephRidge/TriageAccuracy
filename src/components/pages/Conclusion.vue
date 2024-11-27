<template>
  <div class="px-24 text-left w-full h-screen">
    <div class="capitalize font-black text-6xl py-10">
      So what did we understand?
    </div>

    <div class="flex gap-2 my-10">
      <div
        class="text-lg bg-black hover:bg-[#1446A0] rounded-md w-1/2 h-1/3 p-4"
      >
        <div class="bg-white rounded-full h-10 w-10 p-2 text-center font-bold">
          1
        </div>
        <div class="py-4 text-white text-start">
          The analysis of the Korean Triage and Acuity Scale (KTAS) reveals a
          high degree of accuracy (91.9%) supported by strong precision (96.5%)
          and specificity (95.5%) in classifying emergency and non-emergency
          cases. However, the sensitivity (89.4%) analysis highlights a
          potential for under-triage, which may compromise patient safety.
        </div>
      </div>

      <div
        class="text-lg bg-black hover:bg-[#1446A0] rounded-md w-1/2 h-1/3 p-4"
      >
        <div class="bg-white rounded-full h-10 w-10 p-2 text-center font-bold">
          2
        </div>
        <div class="py-4 text-white text-start">
          The primary causes of mistriage identified are errors in pain scale
          application, physical symptom assessment, and vital sign evaluation.
          To mitigate these issues, targeted training for healthcare
          professionals and refinement of the KTAS guidelines are recommended.
        </div>
      </div>
    </div>

    <div class="flex justify-end my-4">
      <RouterLink
        to="/"
        class="rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2 my-6 hover:cursor-pointer text-white"
        >back home</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { introSubtitle, introTitle } from "../../utility/constants";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      count: 0,
      introTitle: introTitle,
      introSubtitle: introSubtitle,
    };
  },
  methods: {},
};
</script>
