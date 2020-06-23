import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Picture: FC<{
  additionalStyles?: string
  jpg?: string
  webp?: string
  maxWidth?: number
  maxHeight?: number
}> = ({ additionalStyles, maxWidth, maxHeight, jpg, webp }) =>
  maxWidth || maxHeight ? (
    <div
      className={cx(styles.img, additionalStyles)}
      style={{
        backgroundImage: `url(${jpg})`,
        maxHeight: maxHeight,
      }}
    />
  ) : (
    <picture className={additionalStyles}>
      {webp && <source srcSet={webp} type="image/webp" />}
      <source srcSet={jpg} type="image/jpeg" />
      <img className={styles.img} src={jpg} />
    </picture>
  )
