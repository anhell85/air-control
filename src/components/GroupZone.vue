<template>
  <div class="grouped">
    <div class="grouped__panel">
      <div class="grouped__info" @click="displayZones(props.group.id)">
        <img
          :class="{ active: display }"
          src="/groupedZone/arrowUp.svg"
          alt="desplegar/contraer"
        />
        <h4>{{ props.group.name }}</h4>
      </div>
      <div class="grouped__buttons">
        <button
          @click="airControlStore.toggleActivationGroup(false, props.group.id)"
        >
          <h6>off</h6>
        </button>
        <button
          @click="airControlStore.toggleActivationGroup(true, props.group.id)"
        >
          <h6>on</h6>
        </button>
        <div>
          <img
            src="/groupedZone/crop.svg"
            alt="desplegar/contraer"
            @click="showInfoGroup(props.group.id)"
          />
          <div class="form" :class="{ active: showForm }">
            <FormGroup
              v-if="showForm"
              :info="infoGroupSelected"
              @close="closeDropdown"
            ></FormGroup>
          </div>
        </div>
      </div>
    </div>
    <div class="grouped__zones" :class="{ 'grouped__zones--active': display }">
      <BtnZone
        v-for="(zone, index) in zones"
        :key="index"
        :active="zone.active"
        :id="zone.id"
        :indicatedTemperature="zone.indicatedTemperature"
        :temperature="zone.temperature"
        :name="zone.name"
        :mode="zone.mode"
        class="zone"
      ></BtnZone>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BtnZone from './btnZone/BtnZone.vue'
import FormGroup from './FormGroup.vue'
import { useAirControlStore } from '@/stores/airControlStore.js'
const airControlStore = useAirControlStore()
//Variables
const zones = ref([])
const idGroup = ref(-1)
const display = ref(false)
const showForm = ref(false)
const infoGroupSelected = reactive({})
const props = defineProps({
  group: Object,
})

//Functions
const closeDropdown = () => {
  display.value = false
  showForm.value = false
}
const displayZones = id => {
  if (!display.value) {
    zones.value = airControlStore.getZonesToGroup(id)
    idGroup.value = id
    display.value = !display.value
  } else {
    display.value = !display.value
    idGroup.value = -1
  }
}
const showInfoGroup = id => {
  if (showForm.value) {
    showForm.value = false
    idGroup.value = -1
  } else {
    infoGroupSelected.group = airControlStore.getGroup(id)
    infoGroupSelected.zones = airControlStore.zones
    idGroup.value = id
    showForm.value = true
  }
}
</script>

<style lang="scss" scoped>
.grouped {
  width: 100%;
  margin-bottom: 4rem;
  &__panel {
    background: #ffffff;
    box-shadow: var(--shadow-box);
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    margin-bottom: 15px;
    width: 100%;
  }
  &__info {
    display: flex;
    > img {
      width: 1.5rem;
      transition: transform 0.5s;
      margin-right: 3px;
      &.active {
        transform: rotate(180deg);
      }
    }
    > h4::first-letter {
      text-transform: uppercase;
    }
  }
  &__buttons {
    display: flex;
    img {
      width: 1.5rem;
    }
    > button {
      text-transform: uppercase;
      font-weight: 500;
      border: 0;
      background: none;
      > h6 {
        font-size: 0.7rem;
      }
    }
    .form {
      position: relative;
      height: 0;
      visibility: hidden;
      opacity: 0;
      transition:
        visibility 0.3s linear,
        opacity 0.3s linear,
        height 0.3s linear;
      &.active {
        display: flex;
        visibility: visible;
        height: auto;
        opacity: 1;
      }
    }
  }
  &__zones {
    display: flex;
    flex-wrap: wrap;
    height: 0;
    visibility: hidden;
    opacity: 0;
    gap: 30px;
    transition:
      visibility 0.3s linear,
      opacity 0.3s linear,
      height 0.3s linear;
    &--active {
      display: flex;
      visibility: visible;
      height: auto;
      opacity: 1;
    }
  }
}
@media (width > 1024px) {
  .grouped {
    width: 860px;
  }
}
</style>
