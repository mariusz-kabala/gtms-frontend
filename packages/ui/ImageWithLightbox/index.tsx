import React, { FC, useState } from 'react'
import cx from 'classnames'
import styles from './styles.scss'
import { Modal } from '@gtms/ui/Modal'

export const ImageWithLightbox: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  src: string
  alt?: string
}> = ({ additionalStyles, onClick = () => null, src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <img className={styles.fullImage} src={src} alt={alt ?? ''} />
        </Modal>
      )}
      <div
        className={cx(styles.miniature, additionalStyles)}
        style={{ backgroundImage: `url(${src})` }}
        data-testid="imageWithLightbox"
        onClick={() => {
          setIsModalOpen(true)
          onClick()
        }}
      />
    </div>
  )
}
