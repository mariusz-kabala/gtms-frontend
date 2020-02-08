import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ImageHolder } from 'components/common/ImageHolder'

interface ItemCarousel {
  additionalStyles?: string
  data: Array<{ id: number; img: string }>
}

export const ItemCarousel: FC<ItemCarousel> = ({ additionalStyles, data }) => {
  return (
    <ul
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="itemCarousel"
    >
      {data.map(value => {
        return (
          <li key={value.id}>
            <ImageHolder src={value.img} />
          </li>
        )
      })}
    </ul>
  )
}
