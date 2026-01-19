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

  .modal-container {
    background: var(--color-background);
    border-radius: var(--radius-sm);
    padding: var(--spacing-2xl);
    max-width: 320px;
    width: 90%;

    .modal-message {
      text-align: center;
      margin-bottom: var(--spacing-xl);
      line-height: 1.5;
      word-break: keep-all;
      font-size: var(--font-size-base);
    }

    .modal-button {
      width: 100%;
      padding: var(--spacing-md);
      background-color: var(--color-primary);
      color: var(--color-background);
      border: none;
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;

      &:active {
        background-color: var(--color-primary);
      }
    }
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