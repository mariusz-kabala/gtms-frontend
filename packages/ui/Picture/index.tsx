import React, { FC, useState, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Picture: FC<{
  additionalStyles?: string
  alt?: string
  coverImage?: boolean
  jpg?: string
  onClick?: () => unknown
  onError?: () => unknown
  webp?: string
}> = ({ additionalStyles, alt, coverImage, jpg, onClick, onError, webp }) => {
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
    <picture
      className={cx(additionalStyles, {
        [styles.isClickable]: onClick,
      })}
      onClick={onClick}
    >
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
