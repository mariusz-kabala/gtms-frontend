import React, { FC } from 'react'
import styles from './styles.scss'

export const Picture: FC<{
  additionalStyles?: string
  jpg?: string
  webp?: string
}> = ({ additionalStyles, jpg, webp }) => {
  console.log(additionalStyles)
  return (
  <picture className={additionalStyles}>
    {webp && <source srcSet={webp} type="image/webp" />}
    <source srcSet={jpg} type="image/jpeg" />
    <img className={styles.img} src={jpg} />
  </picture>
  )
}
