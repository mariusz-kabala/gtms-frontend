import React, { FC } from 'react'
import cx from 'classnames'
import { IImage } from '@gtms/commons/types/image'
// ui
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const GridCard: FC<{
  additionalStyles?: string
  desc?: string
  image: IImage
  name: string
  onClick?: () => unknown
}> = ({ additionalStyles, desc, image, name, onClick }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="grid-card"
      onClick={onClick}
    >
      <Picture additionalStyles={styles.image} coverImage jpg={image.jpg} />
      <div className={styles.headerAndDesc}>
        <h2 className={styles.header}>{name}</h2>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  )
}
