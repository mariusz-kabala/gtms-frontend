import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const HamburgerIcon: FC<{
  additionalStyles?: string
  onClick: () => unknown
}> = ({ additionalStyles, onClick }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      onClick={onClick}
      data-testid="hamburger-icon"
    >
      <div className={cx(styles.icon, styles.navIcon1)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon2)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon3)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon4)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon5)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon6)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon7)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={cx(styles.icon, styles.navIcon8)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
