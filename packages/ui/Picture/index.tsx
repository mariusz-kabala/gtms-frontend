import React, { FC, useState, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Picture: FC<{
  additionalStyles?: string
  alt?: string
  jpg?: string
  webp?: string
  coverImage?: boolean
  onError?: () => unknown
}> = ({ additionalStyles, alt, coverImage, jpg, webp, onError }) => {
  const [hide, setHide] = useState<boolean>(false)

  const onErrorCallback = useCallback(() => {
    if (onError) {
      return onError()
    }

    setHide(true)
  }, [onError])

  if (hide) {
    return null
  }

  if (coverImage) {
    return (
      <div
        className={cx(styles.image, additionalStyles)}
        style={{ backgroundImage: `url(${jpg})` }}
      />
    )
  }

  return (
    <picture className={additionalStyles}>
      {webp && <source srcSet={webp} type="image/webp" />}
      <source srcSet={jpg} type="image/jpeg" />
      <img
        className={styles.image}
        src={jpg}
        onError={onErrorCallback}
        alt={alt ? alt : 'image'}
      />
    </picture>
  )
}
