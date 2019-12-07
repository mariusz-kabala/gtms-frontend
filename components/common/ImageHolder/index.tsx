import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const ImageHolder: FC<{
  image: string
  fullHeight?: boolean
}> = ({ fullHeight, image }) => (
  <div
    className={cx(styles.wrapper, {
      [styles.fullHeight]: fullHeight,
    })}
    data-testid="image-holder"
    style={{ backgroundImage: `url(${image})` }}
  >
    <img src={image} />
  </div>
)
