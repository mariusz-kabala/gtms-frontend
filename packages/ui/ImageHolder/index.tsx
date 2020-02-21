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
          <img src={src} />
        </Modal>
      )}
      <img
        data-testid="imageHolder"
        className={cx(styles.wrapper, additionalStyles)}
        src={src}
        onClick={() => {
          setState(true)
          onClick()
        }}
      />
    </>
  )
}
