import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import useKey from 'use-key-hook'
// ui
import { Scrollbars } from 'react-custom-scrollbars'
import { Button } from '@gtms/ui/Button'
import { IoMdGrid, IoIosCheckmarkCircle } from 'react-icons/io'
import styles from './styles.scss'

export const FullScreenGallery: FC<{
  additionalStyles?: string
  currentBg: string
  file: ArrayBuffer | string | null
  gallery: {
    name: string
    className: string
    full?: string
  }[]
  isActive: boolean
  onBgChange: (name: string) => unknown
  onClose: () => unknown
}> = ({
  additionalStyles,
  children,
  currentBg,
  file,
  gallery,
  isActive,
  onBgChange,
  onClose,
}) => {
  useKey(() => onClose(), {
    detectKeys: [27],
  })

  const [isImageWrapperActive, setIsImageWrapperActive] = useState<boolean>(
    true
  )

  const [activeBg, setActiveBg] = useState<number>(
    gallery.findIndex((g) => g.name === currentBg)
  )

  const [loadedImages, setLoadedImages] = useState<number[]>([])

  useEffect(() => {
    if (!isActive) {
      return
    }

    gallery.forEach((img, index) => {
      const onReady = () => setLoadedImages((images) => [...images, index])

      if (!img.full) {
        onReady()
        return
      }

      const image = new Image()
      image.src = img.full
      if (image.complete) {
        onReady()
      } else {
        image.onload = onReady
      }
    })
  }, [isActive, gallery])

  useEffect(() => {
    if (file) {
      setIsImageWrapperActive(false)
      setActiveBg(-1)
    }
  }, [file])

  return (
    <div
      className={cx(styles.wrapper, additionalStyles, {
        [styles.active]: isActive,
      })}
      data-testid="full-screen-gallery"
    >
      {isActive && (
        <style global jsx>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <div
        className={cx(
          styles.canvas,
          activeBg > -1 ? gallery[activeBg].className : undefined
        )}
        data-loaded={'true'}
        onClick={() => setIsImageWrapperActive(false)}
        style={
          file
            ? {
                backgroundImage: `url(${file})`,
              }
            : undefined
        }
      />
      <div className={styles.btns}>
        <Button
          additionalStyles={styles.btn}
          onClick={() => setIsImageWrapperActive(true)}
        >
          <i>
            <IoMdGrid />
          </i>
          Browse gallery
        </Button>
        <Button
          additionalStyles={styles.btn}
          onClick={() => {
            onBgChange(activeBg > -1 ? gallery[activeBg].name : 'file')
            onClose()
          }}
        >
          <i>
            <IoIosCheckmarkCircle />
          </i>
          Choose this photo
        </Button>
      </div>
      <div
        className={cx(styles.imagesWrapper, {
          [styles.active]: isImageWrapperActive,
        })}
        onMouseEnter={() => {
          setIsImageWrapperActive(true)
        }}
      >
        <Scrollbars style={{ width: '100%', height: '80%' }}>
          <ul className={styles.images}>
            {children}
            {gallery.map((bg, index) => (
              <li
                data-loaded={loadedImages.includes(index) ? 'true' : 'false'}
                key={`bg-${index}`}
                onClick={() => {
                  setIsImageWrapperActive(false)
                  setActiveBg(index)
                }}
                className={cx(styles.item, bg.className, {
                  [styles.active]: index === activeBg,
                })}
              />
            ))}
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}
