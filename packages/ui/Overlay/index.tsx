import React, { FC } from 'react'
import styles from './styles.scss'
import { CSSTransition } from 'react-transition-group'
import cx from 'classnames'

export const Overlay: FC<{
  additionalStyles?: string
  isActive?: boolean
  onClick?: () => unknown
  opacity?: number
}> = ({ additionalStyles, isActive, onClick, opacity }) => (
  <CSSTransition in={isActive ? isActive : true} timeout={300} unmountOnExit>
    <div
      className={cx(styles.overlay, additionalStyles, {
        [styles.clickable]: onClick,
      })}
      data-testid="overlay"
      onClick={onClick}
      style={
        opacity
          ? {
              opacity: opacity,
            }
          : undefined
      }
    />
  </CSSTransition>
)
