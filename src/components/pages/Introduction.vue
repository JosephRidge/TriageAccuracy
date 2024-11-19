<template>
  <div
    class="px-24 text-left w-full h-screen tracking-widest leading-loose grid place-content-center"
  >
   <div class="flex">
    <div class="w-1/2">
      <!-- title -->
      <div class="capitalize font-black text-7xl py-10">
        {{ introTitle }}
      </div>
      <!--  subtitle -->
      <div class="normal-case font-light text-4xl">{{ introSubtitle }}</div>
    </div>

    <div>
      <img src="../../assets/images/ambulance.jpg" alt="" srcset="" class="rounded-full hover:grayscale">
    </div>
   </div>

   <RouterLink to="/home" class="rounded-full bg-gray-950 hover:bg-black  w-fit px-4 py-2 my-6 scale-90 hover:cursor-pointer   text-white">start here</RouterLink>
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
  methods: {
    async increment() {
      this.count++;

      // DOM not yet updated
      console.log(document.getElementById("counter").textContent); // 0

      await nextTick();
      // DOM is now updated
      console.log(document.getElementById("counter").textContent); // 1
    },
  },
};
</script>
