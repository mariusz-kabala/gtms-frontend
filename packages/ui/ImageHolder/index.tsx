import React, { FC, useState } from 'react'
import cx from 'classnames'
import styles from './styles.scss'
import { Modal } from '@gtms/ui/Modal'

export const ImageHolder: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  src: string
}> = ({ additionalStyles, onClick = () => null, src }) => {
  const [state, setState] = useState<boolean>(false)

  return (
    <>
      {state && (
        <Modal onClose={() => setState(false)}>
          <img src={src} alt={alt ?? ''} />
        </Modal>
      )}
      <div
        className={cx(styles.wrapper, additionalStyles)}
        style={{ backgroundImage: `url(${src})` }}
        data-testid="imageHolder"
        onClick={() => {
          setState(true)
          onClick()
        }}
      />
    </>
  )
}
