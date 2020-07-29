import React, { FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
// ui
import { Button } from '@gtms/ui/Button'
import { IoMdGrid, IoIosCheckmarkCircle } from 'react-icons/io'
import { Scrollbars } from 'react-custom-scrollbars'
import styles from './styles.scss'

export const FullScreenGallery: FC<{
  additionalStyles?: string
  isActive: boolean
  gallery: {
    name: string
    className: string
  }[]
  onClose: () => unknown
}> = ({ additionalStyles, isActive, onClose, gallery }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  const [isImageWrapperActive, setIsImageWrapperActive] = useState<boolean>(
    true
  )
  const [activeBg, setActiveBg] = useState<number>(0)

  return (
    <div
      className={cx(styles.wrapper, additionalStyles, {
        [styles.active]: isActive,
      })}
      data-testid="full-screen-gallery"
    >
      <div
        className={cx(styles.canvas, gallery[activeBg].className)}
        onClick={() => setIsImageWrapperActive(false)}
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
          <Button additionalStyles={styles.btn} onClick={() => onClose()}>
            <i>
              <IoIosCheckmarkCircle />
            </i>
            Choose this photo
          </Button>
        </div>
        <Scrollbars style={{ width: '100%', height: '80%' }}>
          <ul className={styles.images}>
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
