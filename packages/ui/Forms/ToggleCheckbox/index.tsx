import React, { FC } from 'react'
import styles from './styles.scss'

export const ToggleCheckbox: FC<{
  additionalStyles?: string
  checked?: boolean
  disabled?: boolean
  labelChecked?: string
  labelUnchecked?: string
  lockerIcon?: boolean
  name?: string
  onChange?: () => unknown
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
}> = ({
  additionalStyles,
  checked = false,
  disabled = false,
  labelChecked,
  labelUnchecked,
  lockerIcon,
  name,
  onChange,
  reference,
}) => (
  <div
    onClick={onChange}
    className={additionalStyles}
    data-testid="toggle-checkbox"
  >
    <label className={styles.switch}>
      <input
        className={styles.toggleCheckbox}
        defaultChecked={checked}
        disabled={disabled}
        id={name}
        name={name}
        ref={reference}
        type="checkbox"
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
