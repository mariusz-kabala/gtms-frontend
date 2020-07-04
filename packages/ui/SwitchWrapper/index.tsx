import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import Switch from 'react-switch'

export const SwitchWrapper: FC<{
  additionalStyles?: string
  checked: boolean
  onChange: () => unknown
  disabled?: boolean
}> = ({ additionalStyles, checked, disabled, onChange }) => (
  <div data-testid="switch-wrapper">
    <Switch
      className={cx(styles.overlay, additionalStyles)}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
    />
  </div>
)
