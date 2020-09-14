import React, { FC, useState } from 'react'
import cx from 'classnames'
import { IImage } from '@gtms/commons/types/image'
import styles from './styles.scss'
import { Modal } from '../Modal'
import { Picture } from '../Picture'

export const ImageWithLightbox: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  src: IImage
}> = ({ additionalStyles, onClick = () => null, src }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      {isModalOpen && (
        <Modal
          additionalStyles={styles.modal}
          onClose={() => setIsModalOpen(false)}
        >
          <Picture {...src} />
        </Modal>
      )}
      <div
        className={cx(styles.miniature, additionalStyles)}
        data-testid="image-with-lightbox"
        style={{ backgroundImage: `url(${src.jpg})` }}
        onClick={() => {
          setIsModalOpen(true)
          onClick && onClick()
        }}
      />
    </div>
  )
}
