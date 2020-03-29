import React, { FC, createRef, useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

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

export const ExpandingTextarea: FC<{
  additionalStyles?: string
  name?: string
  placeholder?: string
  rows?: number
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
}> = ({ additionalStyles, name, placeholder, reference, rows = 10 }) => {
  const ref = createRef<HTMLTextAreaElement>()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    resize(rows, ref.current)
  }, [ref, rows])

  const handleInput = useCallback(
    (e) => {
      setValue(e.target.value)
      resize(rows, ref.current)
    },
    [ref, rows]
  )

  return (
    <>
      <textarea
        readOnly={true}
        className={styles.hidden}
        value={value}
        name={name}
        ref={reference}
      ></textarea>
      <textarea
        className={cx(styles.textarea, additionalStyles)}
        data-testid="form-expanding-textarea"
        name={name}
        onInput={handleInput}
        rows={rows}
        placeholder={placeholder}
        ref={ref}
      />
    </>
  )
}
