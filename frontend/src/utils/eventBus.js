// Lightweight event bus for Vue 3 (replaces $root.$on/$off/$emit patterns)
const listeners = new Map()

export function on(event, handler) {
  if (!listeners.has(event)) listeners.set(event, new Set())
  listeners.get(event).add(handler)
  return () => off(event, handler)
}

export function off(event, handler) {
  const set = listeners.get(event)
  if (set) set.delete(handler)
}

export function emit(event, payload) {
  const set = listeners.get(event)
  if (set) {
    for (const fn of Array.from(set)) {
      try { fn(payload) } catch (e) { console.error('eventBus handler error', e) }
    }
  }
}

export default { on, off, emit }

