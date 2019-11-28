import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Checkbox: FC<{
  additionalStyles?: string
  name?: string
  label?: string
  value?: string
  // reference @todo
  onChange?: () => unknown
}> = ({
  additionalStyles,
  name,
  label,
  value,
  // reference, @todo do it
  onChange,
}) => (
  <div className={cx(styles.checkboxWrapper, additionalStyles)}>
    <input
      className={styles.input} /* @todo name it properly */
      placeholder={label}
      value={value}
      // ref={reference}
      type="checkbox"
      name={name}
      id={name}
      onChange={onChange}
      style={{ display: 'none' }}
    />
    <label htmlFor={name} className={styles.check}>
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>
    <span className={styles.label}>{name}</span>
  </div>
)
