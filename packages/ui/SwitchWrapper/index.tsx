import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import Switch from 'react-switch'

export const SwitchWrapper: FC<{
  additionalStyles?: string
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => unknown
}> = ({ additionalStyles, checked, disabled, onChange }) => (
  <div data-testid="switch-wrapper">
    <Switch
      checked={checked}
      className={cx(styles.overlay, additionalStyles)}
      disabled={disabled}
      onChange={onChange}
    />
  </div>
)
