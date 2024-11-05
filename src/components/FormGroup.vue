<template>
  <div class="form__group">
    <div class="form__group__name">
      <label for="name">Nombre de la zona</label>
      <input
        type="text"
        id="name"
        placeholder="editar o crear"
        v-model="nameGroup"
      />
    </div>
    <div class="form__group__zones">
      <p>Zonas disponibles</p>
      <label
        class="form__group__checkbox"
        v-for="(zone, index) in zonesEditables"
        :for="zone.name"
        :key="index"
        >{{ zone.name }}
        <input
          :id="zone.name"
          type="checkbox"
          :checked="zone.checked"
          v-model="zone.checked"
        />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="form__group__btns">
      <button @click="deleteGroup()">eliminar</button>
      <button @click="saveGroup()">guardar</button>
      <button @click="newGroup()">nuevo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAirControlStore } from '@/stores/airControlStore.js'
const airControlStore = useAirControlStore()
const props = defineProps({
  info: Object,
})
const emit = defineEmits(['close'])
let nameGroup = ref('')
let zonesEditables = ref([])
onMounted(() => {
  nameGroup.value = props.info.group.name
  zonesEditables.value = JSON.parse(JSON.stringify(props.info.zones))
  activeZonesFromGroup()
})
//Functions

const activeZonesFromGroup = () => {
  for (const zone of zonesEditables.value) {
    if (props.info.group.collectionZones.includes(zone.id)) {
      zone.checked = true
    }
  }
}
const deleteGroup = () => {
  if (Object.values(airControlStore.groupZones).length < 2) {
    alert('No es posible eliminar el unico grupo de zonas')
  } else {
    emit('close')
    airControlStore.deleteGroup(props.info.group.id)
  }
}
const saveGroup = () => {
  const info = {
    active: false,
    collectionZones: [],
    id: props.info.group.id,
    name: nameGroup.value,
  }
  for (const zone of zonesEditables.value) {
    if (zone.checked) {
      info.collectionZones.push(zone.id)
    }
  }
  emit('close')
  airControlStore.saveGroup(info)
}
const newGroup = () => {
  const info = {
    active: false,
    collectionZones: [],
    id: -1,
    name: nameGroup.value,
  }
  for (const zone of zonesEditables.value) {
    if (zone.checked) {
      info.collectionZones.push(zone.id)
    }
  }
  emit('close')
  airControlStore.newGroup(info)
}
</script>

<style lang="scss" scoped>
.form__group {
  position: absolute;
  right: -0.5rem;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 2px 3px 6px 0px;
  top: 0rem;
  font-size: 16px;
  &__name {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    input {
      padding: 4px;
    }
  }
  &__zones {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    max-height: 200px;
    overflow-y: scroll;
  }
  &__checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 8px 0;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark {
        background-color: #2196f3;
      }
      &:checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 4px;
      &:after {
        content: '';
        position: absolute;
        display: none;
      }
      &:after {
        left: 9px;
        top: 2px;
        width: 8px;
        height: 16px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    &:hover input ~ .checkmark {
      background-color: #ccc;
    }
  }
  &__btns {
    display: flex;
    > button {
      margin: 10px;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
