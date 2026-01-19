import { onMounted, onUnmounted, type Ref } from 'vue'

export const useInfiniteScroll = (
  sentinel: Ref<HTMLElement | null>,
  callback: () => void | Promise<void>
) => {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!sentinel.value) return

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback()
        }
      },
      {
        threshold: 0.1
      }
    )

    observer.observe(sentinel.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}