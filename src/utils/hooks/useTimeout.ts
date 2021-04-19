import { ref, onMounted, onUnmounted } from 'vue'

export function useTimeout(delay = 0) {
    const ready = ref(false)
    let timer: number
    onMounted(() => {
        timer = window.setTimeout(() => {
            ready.value = true
        }, delay)
    })
    onUnmounted(() => {
        window.clearTimeout(timer)
    })
    return ready
}