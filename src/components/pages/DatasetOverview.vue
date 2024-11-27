<template>
  <div>
    <div class="capitalize font-black text-4xl py-4 px-24">
      KTAS Triage DATA:
    </div>

    <div class="py-2 px-24 text-lg">
      The data utilized in this project relates to medical records of patients
      from one regional and one local emergency department in South Korea.
      Description of variables:
    </div>

    <div class="px-24 py-2">
      <table border="2" class="w-3/4">
        <thead>
          <tr class="bg-[#1446A0] text-white">
            <th class="p-2 text-start">Feature/Variable</th>
            <th></th>
            <th class="p-2 text-start">Description</th>
          </tr>
        </thead>
        <tbody class>
          <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Sex</td>
            <td class="text-transparent ">: </td>
            <td>Gender of the patient</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Age</td>
            <td></td>
            <td>Age of the patient</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Arrival mode</td>
            <td></td>
            <td>Type of transportation to the hospital</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Injury</td>
            <td></td>
            <td>Whether the patient is injured or not</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Chief complaint</td>
            <td></td>
            <td>The patient's complaint</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Mental</td>
            <td></td>
            <td>The mental state of the patient</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">Pain</td>
            <td></td>
            <td>Whether the patient has pain</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">NRS pain</td>
            <td></td>
            <td>Nurse's assessment of pain for the patient</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">SBP</td>
            <td></td>
            <td>Systolic Blood Pressure</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">DBP</td>
            <td></td>
            <td>Diastolic Blood Pressure</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">HR</td>
            <td></td>
            <td>Heart Rate</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">RR</td>
            <td></td>
            <td>Respiratory rate</td>
          </tr>
           <tr class="hover:bg-blue-50 ">
            <td class="px-2 py-1">BT</td>
            <td></td>
            <td>Body Temperature</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mx-10 flex justify-end">
      <RouterLink
        to="/problemStatement"
        class="capitalize rounded-full bg-[#1446A0] hover:bg-black w-fit px-4 py-2 hover:cursor-pointer text-white"
      >
        let us understand the problem
      </RouterLink>
    </div>
  </div>
</template>

<script></script>
