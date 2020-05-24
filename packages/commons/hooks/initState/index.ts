import { useRef, useEffect } from 'react'

export function useInitState(initFunc: () => unknown) {
  const isFirstRender = useRef<boolean>(true)

  if (isFirstRender.current) {
    initFunc()
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
  }, [])
}
