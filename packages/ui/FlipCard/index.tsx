import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook' // @todo this hook or the one below must be replaced
import { useOnClickOutside } from '@gtms/commons/hooks/onClickOutside'

export const FlipCard: FC<{
  back: ReactNode
  children: ReactNode
  clickOutside: boolean
  isActive: boolean
}> = ({ back, children, clickOutside, isActive }) => {
  const [state, setState] = useState<boolean>(isActive) // for ON_ESC_KEY_PRESS - get back to front card

  // ON_ESC_KEY_PRESS - get back to front card
  useKey(
    () => {
      setState(false)
    },
    {
      detectKeys: [27],
    }
  )

  // ON_CLICK_OUTSIDE if active
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => (clickOutside ? setState(false) : null))

  // setStat for mounted component
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      setState(!state)
    } else {
      didMountRef.current = true
    }
    // eslint-disable-next-line
  }, [isActive])

  return (
    <div
      data-testid="flip-card"
      ref={ref}
      className={cx(styles.flipBox, {
        [styles.active]: state,
      })}
    >
      <div data-testid="flip-card-front" className={styles.front}>
        {children}
      </div>
      <div data-testid="flip-card-back" className={styles.back}>
        {back}
      </div>
    </div>
  )
}
