import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const TagGroup: FC<{
  additionalStyles?: string
  children: ReactNode
}> = ({ additionalStyles, children }) => (
  <div
    data-testid="tag-group"
    className={cx(styles.tagGroup, additionalStyles)}
  >
    {children}
  </div>
)
