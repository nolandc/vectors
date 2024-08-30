// useDragStyles.ts
import { ref, watch } from 'vue'

const isDragStyleEnabled = ref(false)

export function useDragStyles() {
  const styleElement = ref<HTMLStyleElement | null>(null)

  watch(isDragStyleEnabled, (newValue) => {
    if (newValue) {
      if (!styleElement.value) {
        styleElement.value = document.createElement('style')
        document.head.appendChild(styleElement.value)
      }
      styleElement.value.textContent = 'body { user-select: none; }'
    } else {
      if (styleElement.value) {
        styleElement.value.textContent = ''
      }
    }
  })

  function enableDragStyling() {
    isDragStyleEnabled.value = true
  }

  function disableDragStyling() {
    isDragStyleEnabled.value = false
  }

  return {
    isDragStyleEnabled,
    enableDragStyling,
    disableDragStyling
  }
}