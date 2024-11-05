<template>
  <GroupZone
    v-for="(group, index) in airControlStore.groupZones"
    :key="index"
    :group="group"
  ></GroupZone>
</template>

<script setup>
import { onMounted } from 'vue'
import GroupZone from '@/components/GroupZone.vue'
import { useAirControlStore } from '@/stores/airControlStore.js'
const airControlStore = useAirControlStore()
onMounted(() => {
  repetirCadaSegundo()
})

const repetirCadaSegundo = () => {
  setInterval(airControlStore.setTemperature, 5000)
}
</script>

<style lang="scss" scoped></style>
