import React, { FC, ReactNode } from 'react'
import ReactCSSTransitionGroup from 'react-transition-group'
import styles from './styles.scss'
import cx from 'classnames'

export const ExpandingRow: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({ additionalStyles, children }) => {
  return (
    <div
      data-testid="expanding-row"
      className={cx(styles.wrapper, additionalStyles)}
    >
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {children}
      </ReactCSSTransitionGroup>
    </div>
  )
}
