import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const ImageHolder: FC<{
  image: string
  height100?: boolean
}> = ({ height100, image }) => (
  <div
    className={cx(styles.wrapper, {
      [styles.height100]: height100,
    })}
    data-testid="image-holder"
    style={{ backgroundImage: `url(${image})` }}
  >
    <img src={image} />
  </div>
)
