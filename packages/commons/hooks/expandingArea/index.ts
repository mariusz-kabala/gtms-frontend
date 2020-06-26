import { useRef, useEffect, useCallback } from 'react'

export const getHeight = (rows: number, el: HTMLTextAreaElement): number => {
  const {
    borderBottomWidth,
    borderTopWidth,
    fontSize,
    lineHeight,
    paddingBottom,
    paddingTop,
  } = window.getComputedStyle(el)

  const lh =
    lineHeight === 'normal'
      ? parseFloat(fontSize) * 1.2
      : parseFloat(lineHeight)

  const rowHeight =
    rows === 0
      ? 0
      : lh * rows +
        parseFloat(borderBottomWidth) +
        parseFloat(borderTopWidth) +
        parseFloat(paddingBottom) +
        parseFloat(paddingTop)

  const scrollHeight =
    el.scrollHeight + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth)

  return Math.max(rowHeight, scrollHeight)
}

export const resize = (rows: number, el: HTMLTextAreaElement | null): void => {
  if (el) {
    el.style.height = '0'
    el.style.overflowY = 'hidden'
    el.style.height = `${getHeight(rows, el)}px`
  }
}

export function useExpandingArea(rows = 10) {
  const ref = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    ref.current && resize(rows, ref.current)
  }, [ref, rows])

  const handleInput = useCallback(() => {
    ref.current && resize(rows, ref.current)
  }, [ref, rows])

  return { ref, handleInput }
}
