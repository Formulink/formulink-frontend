import { type Ref, watch } from 'vue'

export function useBackdrop(trigger: Ref<boolean>, options?: {
  zIndex?: number
  blur?: string
  background?: string
  id?: string
  onClick?: () => void
}) {
  const {
    zIndex = 9999,
    blur = 'blur(4px)',
    background = 'rgba(0,0,0,0.3)',
    id = 'global-backdrop',
    onClick = () => trigger.value = false
  } = options || {}

  watch(trigger, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''

    const existing = document.getElementById(id)

    if (val && !existing) {
      const el = document.createElement('div')
      el.id = id
      Object.assign(el.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: zIndex.toString(),
        background,
        backdropFilter: blur,
      })
      el.addEventListener('click', onClick)
      document.body.appendChild(el)
    }

    if (!val && existing) {
      existing.remove()
    }
  })
}
