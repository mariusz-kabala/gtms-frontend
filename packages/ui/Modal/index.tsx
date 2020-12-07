import React, { FC, ReactNode, useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
// ui
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { Overlay } from '@gtms/ui/Overlay'
import styles from './styles.scss'

export const Modal: FC<{
  additionalStyles?: string
  children: ReactNode
  onClose: () => unknown
}> = ({ additionalStyles, children, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  const portalNode = useRef(
    typeof window !== 'undefined' && document.createElement('div')
  )

  useLayoutEffect(() => {
    if (document) {
      document.body.appendChild(portalNode.current as HTMLDivElement)
    }
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  if (!portalNode.current) {
    return null
  }

  return createPortal(
    <>
      <div className={cx(styles.wrapper, additionalStyles)} data-testid="modal">
        {children}
      </div>
      <Overlay onClick={onClose} />
    </>,
    portalNode.current
  )
}
