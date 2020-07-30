import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Picture: FC<{
  additionalStyles?: string
  alt?: string
  jpg?: string
  webp?: string
  coverImage: boolean
}> = ({ additionalStyles, alt, coverImage, jpg, webp }) =>
  coverImage ? (
    <div
      className={cx(styles.image, additionalStyles)}
      style={{ backgroundImage: `url(${jpg})` }}
    />
  ) : (
    <picture className={additionalStyles}>
      {webp && <source srcSet={webp} type="image/webp" />}
      <source srcSet={jpg} type="image/jpeg" />
      <img className={styles.image} src={jpg} alt={alt ? alt : 'image'} />
    </picture>
  )
