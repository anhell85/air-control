<template>
  <div class="modal" :class="{ modal__show: show }">
    <div class="modal__body">
      <div class="modal__body__row">
        <label for="name">nombre</label>
        <input type="text" id="name" v-model="information.name" />
      </div>
      <div class="modal__body__row">
        <label for="temperature">temperatura indicada</label>
        <input
          type="number"
          id="temperature"
          v-model="information.indicatedTemperature"
        />
      </div>
      <div class="modal__body__btn" @click="sendInfo">Editar</div>
    </div>
    <div class="modal__close" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const show = ref(true)
const props = defineProps({
  info: Object,
})
const emit = defineEmits(['close', 'edit'])
const closeModal = () => {
  show.value = false
  emit('close')
}
const sendInfo = () => {
  emit('edit', information)
}
const information = reactive({ ...props.info })
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  background: rgba(000, 000, 000, 0.3);
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  height: 0;
  transition: opacity 1s;
  &__body {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 0 auto;
    background: #dfdfdf;
    height: fit-content;
    color: #000000;
    &__row {
      margin: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      label {
        font-size: 0.8rem;
        width: 50%;
        margin-right: 1rem;
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
    &__btn {
      background: #c2bebe;
      width: 100px;
      padding: 10px;
      text-align: center;
      border-radius: 1rem;
      box-shadow: 0px 0px 6px 2px #ffffff;
      color: #ffffff;
      margin: 0.5rem auto 0;
      &:hover {
        background: #817f7f;
        cursor: pointer;
      }
    }
  }
  &__close {
    position: absolute;
    right: 35px;
    top: 15px;
    width: 32px;
    height: 32px;
    opacity: 1;
    cursor: pointer;
    z-index: 1;
  }
  &__close:before,
  &__close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background: #fff;
  }
  &__close:before {
    transform: rotate(45deg);
  }
  &__close:after {
    transform: rotate(-45deg);
  }
  &__show {
    opacity: 1;
    height: 100vh;
  }
}
</style>
