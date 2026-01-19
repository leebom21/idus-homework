import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')

export const useAlert = () => {
  const openAlert = (msg: string) => {
    message.value = msg
    isVisible.value = true
  }

  const closeAlert = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    message,
    openAlert,
    closeAlert
  }
}