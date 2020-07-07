import React, { FC } from 'react'
import { IImage } from '@gtms/commons/types/image'
import styles from './styles.scss'

export const TagCardMini: FC<{
  desc?: string
  image: IImage
  tag: string
  onClick?: () => unknown
}> = ({ desc, image, tag, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image.jpg})` }}
      />
      <div className={styles.desc}>
        <h2 className={styles.header}>{tag}</h2>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  )
}
