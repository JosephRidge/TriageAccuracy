<template>
  <div class="px-24 text-left w-full h-screen">
    <div class="capitalize font-black text-6xl py-10">Problem Statement</div>

    <div class="py-2 text-lg">
      <div class="font-bold">Korean Triage and Acuity Scale (KTAS)</div>
      KTAS, introduced in 2016, is a five-level triage system used across Korea
      to asses patients to determine who should receive treatment first .
    </div>

    <!-- problem statement -->
    <div class="py-2 text-lg">
      <div class="font-bold">Problem: Mistriage in Emergency Departments</div>
      Mistriage occurs when patients are incorrectly categorized, leading to
      delays, overcrowding, and compromised patient care.
    </div>
    
    <!-- objectives -->
    <div class="py-2 text-lg">
      <div class="font-bold">Objective</div>
      Assess the accuracy of KTAS and identify causes of mistriage.
    </div>
    <div class="flex justify-end ">
      <RouterLink
        to="/patients"
        class="rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2 my-6  hover:cursor-pointer text-white"
        >now let us learn from the data ...</RouterLink
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
