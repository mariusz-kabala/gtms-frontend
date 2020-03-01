import React, { FC } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

export const ToggleCheckbox: FC<{
  additionalStyles?: string
  checked?: boolean
  onChange?: () => unknown
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
}> = ({ additionalStyles, checked, onChange, reference }) => (
  <div
    className={cx(styles.wrapper, additionalStyles, {
      [styles.checked]: checked,
    })}
    data-testid="toggle-checkbox"
    onClick={onChange}
  >
    <input ref={reference} className={styles.inputCheckbox} type="checkbox" />
    <div className={styles.checkmark}>
      <span>off</span>
      <svg viewBox="0 0 100 100">
        <path
          d="M20,55 L40,75 L77,27"
          fill="none"
          stroke="#FFF"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
)
