<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="modal-overlay" @click="closeAlert">
        <div class="modal-container" @click.stop>
          <p class="modal-message">{{ message }}</p>
          <button class="modal-button" @click="closeAlert">확인</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/useAlert'

const { isVisible, message, closeAlert } = useAlert()
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 4px;
  padding: 24px;
  max-width: 320px;
  width: 90%;
}

.modal-message {
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
  word-break: keep-all;
}

.modal-button {
  width: 100%;
  padding: 12px;
  background-color: #ef7014;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: #ef7014;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>