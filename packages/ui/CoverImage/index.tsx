import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const CoverImage: FC<{
  additionalStyles?: string
  children?: ReactNode
  image: string
}> = ({ additionalStyles, children, image }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="cover-image"
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
      <div className={styles.shadow} />
    </div>
  )
}
