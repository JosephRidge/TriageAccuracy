<template>
  <div class="px-24 text-left w-full h-screen">
    <div class="capitalize font-black text-6xl py-10">Problem Statement</div>

    <div class="flex justify-center">
      <div
        class="text-xl bg-gray-200 rounded-md text-black w-screen flex justify-center h-fit p-4"
      >
        <div class="py-4 text-start">
          <div class="font-bold">Problem:</div>
          Mistriage refers to the incorrect categorization of patients, leading
          to delays, overcrowding, and the potential for compromised care. This
          misjudgement can result in increased patient wait times, strain on
          resources, and higher risks of poor outcomes. The purpose of this
          study is to identify the accuracy of triage based on medical records
          and to evaluate the causes of mistriage. This study will contribute to
          improving patient safety and the quality of emergency care by
          identifying triage accuracy and evaluating the causes of mistriage.
        </div>
      </div>
    </div>

    <div class="flex justify-center py-2">
      <div
        class="text-xl bg-gray-200 rounded-md text-black w-screen flex justify-center h-fit p-4"
      >
        <div class="py-2 text-start">
          <div class="font-bold">Objective:</div>
          The objective of this study is to assess the accuracy of the KTAS
          system and identify the underlying causes of Mistriage, focusing on
          improving triage accuracy and optimizing resource allocation in
          emergency care
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <RouterLink
        to="/patients"
        class="rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2 my-6 hover:cursor-pointer text-white"
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
