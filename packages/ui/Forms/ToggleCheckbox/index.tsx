import React, { FC } from 'react'
import styles from './styles.scss'

export const ToggleCheckbox: FC<{
  additionalStyles?: string
  checked?: boolean
  labelChecked?: string
  labelUnchecked?: string
  name?: string
  onChange?: () => unknown
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
  lockerIcon?: boolean
}> = ({
  additionalStyles,
  checked = false,
  labelChecked,
  labelUnchecked,
  name,
  onChange,
  reference,
  lockerIcon,
}) => (
  <div
    onClick={onChange}
    className={additionalStyles}
    data-testid="toggle-checkbox"
  >
    <label className={styles.switch}>
      <input
        className={styles.input} /* @todo name it properly */
        defaultChecked={checked}
        ref={reference}
        type="checkbox"
        name={name}
        id={name}
      />
      <span>
        {lockerIcon && (
          <span
            data-testid="toggle-checkbox-locker-icon"
            className={styles.locker}
          />
        )}
        <span className={styles.textLabelChecked}>{labelChecked}</span>
        <span className={styles.textLabelUnchecked}>{labelUnchecked}</span>
      </span>
    </label>
  </div>
)
