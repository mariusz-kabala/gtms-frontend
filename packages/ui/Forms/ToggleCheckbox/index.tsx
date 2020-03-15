import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const ToggleCheckbox: FC<{
  additionalStyles?: string
  checked?: boolean
  labelChecked?: string
  labelUnchecked?: string
  lockerIcon?: boolean
  name?: string
  onChange?: () => unknown
  reference?: (
    ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  ) => void
  rounded?: boolean
}> = ({
  additionalStyles,
  checked = false,
  labelChecked,
  labelUnchecked,
  lockerIcon,
  name,
  onChange,
  reference,
  rounded,
}) => (
  <div
    onClick={onChange}
    className={additionalStyles}
    data-testid="toggle-checkbox"
  >
    <label className={styles.switcher}>
      <input
        className={cx(styles.input, {
          [styles.rounded]: rounded,
        })}
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
