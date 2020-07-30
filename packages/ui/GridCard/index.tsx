import React, { FC } from 'react'
import { IImage } from '@gtms/commons/types/image'
// ui
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const GridCard: FC<{
  image: IImage
  name: string
  desc?: string
  onClick?: () => unknown
}> = ({ desc, name, image, onClick }) => {
  return (
    <div className={styles.wrapper} data-testid="grid-card" onClick={onClick}>
      <Picture additionalStyles={styles.image} coverImage jpg={image.jpg} />
      <div className={styles.headerAndDesc}>
        <h2 className={styles.header}>{name}</h2>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  )
}
