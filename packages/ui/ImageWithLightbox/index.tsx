import React, { FC, useState } from 'react'
import cx from 'classnames'
import styles from './styles.scss'
import { Modal } from '../Modal'
import { Picture } from '../Picture'

export const ImageWithLightbox: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  src: { jpg: string; webp?: string }
}> = ({ additionalStyles, onClick = () => null, src }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Picture {...src} additionalStyles={styles.fullImage} />
        </Modal>
      )}
      <div
        className={cx(styles.miniature, additionalStyles)}
        style={{ backgroundImage: `url(${src.jpg})` }}
        data-testid="image-with-lightbox"
        onClick={() => {
          setIsModalOpen(true)
          onClick && onClick()
        }}
      />
    </div>
  )
}
