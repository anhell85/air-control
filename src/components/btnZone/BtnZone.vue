<template>
  <div class="btn" :class="status">
    <div class="flex w-100 justify-between">
      <div class="btn__temperature" :class="status">
        <p>{{ props.temperature }}º</p>
      </div>
      <div class="btn__active">
        <IconPower
          class="btn__active__img"
          alt="on/off"
          :colorStatus="status"
          @click="airControlStore.toggleActivationZone(props.id)"
        ></IconPower>
      </div>
    </div>
    <div class="flex w-100 justify-between">
      <div class="w-50">
        <div class="btn__name" :class="status">
          <img
            class="cool"
            src="/btnZone/edit.svg"
            alt="icon edit"
            @click="show = !show"
          />
          <h5>{{ props.name }}</h5>
        </div>
        <div class="btn__status" :class="status">
          {{ textStatus }} {{ props.indicatedTemperature }}º
        </div>
      </div>
      <div class="btn__icon">
        <img
          v-if="status === 'heat'"
          class="cool"
          src="/btnZone/heat.svg"
          alt="icon heat"
        />
        <img
          v-if="status === 'cool'"
          class="cool"
          src="/btnZone/cool.svg"
          alt="icon cool"
        />
      </div>
      <ModalZone
        v-if="show"
        :info="props"
        @close="show = !show"
        @edit="editZone"
      ></ModalZone>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import IconPower from './IconPower.vue'
import ModalZone from '../ModalZone.vue'
import { useAirControlStore } from '@/stores/airControlStore.js'
const airControlStore = useAirControlStore()

//Variables
const props = defineProps({
  active: Boolean,
  id: Number,
  indicatedTemperature: Number,
  temperature: Number,
  name: String,
  mode: String,
})
const status = ref('off')
const textStatus = ref('')
const show = ref(false)

watch(
  () => props.mode,
  newValue => {
    checkZone(newValue)
  },
)
const checkZone = mode => {
  if (mode) {
    status.value = props.mode
    if (props.mode === 'cool') {
      textStatus.value = 'Enfriando'
    }
    if (props.mode === 'heat') {
      textStatus.value = 'Calentando'
    }
    if (props.mode === 'confort' || props.mode === 'off') {
      textStatus.value = ''
    }
  } else {
    status.value = 'off'
    textStatus.value = ''
  }
}
const editZone = information => {
  airControlStore.setValuesZone(information)
  show.value = false
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  flex-direction: column;
  width: 9rem;
  background: var(--power-off);
  // box-shadow: var(--shadow-box);
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.22),
    0 1px 2px 0 rgba(0, 0, 0, 0.34);
  border-radius: 10px;
  font-family: 'Roboto', Arial;
  height: 130px;
  padding: 17px 0 17px 13px;
  transition: box-shadow 2s ease;

  &.off {
    box-shadow:
      0 1px 3px 3px rgba(0, 0, 0, 0.22),
      0 1px 3px 3px rgba(0, 0, 0, 0.34);
  }
  &__temperature {
    font-size: 33px;
    font-weight: 500;
    color: var(--font-off);
    line-height: 1;
    &.heat,
    &.cool,
    &.confort {
      color: var(--power-off);
    }
  }
  &__active {
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
  }
  &__name {
    font-size: 1rem;
    font-weight: 500;
    color: var(--power-active);
    width: 100%;
    display: flex;

    img {
      width: 0.8rem;
      cursor: pointer;
      margin-right: 0.3rem;
    }
    h5 {
      font-size: 1rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    &.heat,
    &.cool,
    &.confort {
      color: var(--power-off);
    }
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__status {
    font-size: 13px;
    color: var(--font-subtitle);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    &::first-letter {
      text-transform: uppercase;
    }
    &.heat {
      color: var(--power-heat);
    }
    &.cool {
      color: var(--power-cool);
    }
    &.confort {
      color: var(--power-confort);
    }
  }
  &__icon {
    overflow: hidden;
    width: 65px;
    height: 58px;
    & > img {
      opacity: 1;
      transition: opacity 10s;
    }

    & > .cool {
      transition: opacity 2s;
      position: relative;
      left: 10px;
      width: 80px;
      filter: invert(100%) sepia(65%) saturate(2%) hue-rotate(279deg)
        brightness(108%) contrast(100%);
      opacity: 0.6;
      animation:
        rotate 10s infinite linear,
        opacity 2s forwards;
    }
    & > .heat {
      position: relative;
      left: 2px;
      width: 99px;
      filter: invert(100%) sepia(65%) saturate(2%) hue-rotate(279deg)
        brightness(108%) contrast(100%);
      opacity: 0.6;
      animation: rotate 10s infinite linear;
    }
  }
  &.heat {
    background: linear-gradient(to right bottom, #ffffff, #ef694e, #cf1e11);
    background-size: 300% 300%;
    -webkit-animation: gradient 2s ease;
    -moz-animation: gradient 2s ease;
    animation: gradient 2s ease;
    animation-fill-mode: forwards;
  }
  &.cool {
    background: linear-gradient(to right bottom, #ffffff, #40c3f7, #0b69a3);
    background-size: 300% 300%;
    -webkit-animation: gradient 2s ease;
    -moz-animation: gradient 2s ease;
    animation: gradient 2s ease;
    animation-fill-mode: forwards;
  }
  &.confort {
    background: linear-gradient(to right bottom, #ffffff, #2dcc9a, #01644f);
    background-size: 300% 300%;
    -webkit-animation: gradient 2s ease;
    -moz-animation: gradient 2s ease;
    animation: gradient 2s ease;
    animation-fill-mode: forwards;
  }
  @keyframes gradient {
    from {
      background-position: 0% 50%;
    }
    to {
      background-position: 100% 50%;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.6;
    }
  }
}
@media (width > 640px) {
  .btn {
    width: 12rem;
  }
}
</style>
