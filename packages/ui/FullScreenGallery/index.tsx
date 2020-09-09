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
  isActive: boolean
  currentBg: string
  gallery: {
    name: string
    className: string
  }[]
  file: ArrayBuffer | string | null
  onBgChange: (name: string) => unknown
  onClose: () => unknown
}> = ({
  additionalStyles,
  isActive,
  onClose,
  gallery,
  onBgChange,
  currentBg,
  children,
  file,
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
      <style global jsx>{`
        body {
          overflow: 'hidden';
        }
      `}</style>
      <div
        className={cx(
          styles.canvas,
          activeBg > -1 ? gallery[activeBg].className : undefined
        )}
        onClick={() => setIsImageWrapperActive(false)}
        style={
          file
            ? {
                backgroundImage: `url(${file})`,
              }
            : undefined
        }
      />
      <div
        className={cx(styles.imagesWrapper, {
          [styles.active]: isImageWrapperActive,
        })}
      >
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
        <Scrollbars style={{ width: '100%', height: '80%' }}>
          <ul className={styles.images}>
            {children}
            {gallery.map((bg, index) => (
              <li
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
