import React, { FC, useState } from 'react'
import cx from 'classnames'
import { getItem, setItem } from '@gtms/commons/helpers/localStorage'
// ui
import useKey from 'use-key-hook'
import { Button } from '../Button'
import { Overlay } from '@gtms/ui/Overlay'
// styles
import styles from './styles.scss'

export const CookiePolicy: FC = () => {
  const isCookieAccepted = getItem('isCookieAccepted')
  const [isActive, setIsActive] = useState(false)
  const [isHiddenCompletely, setIsHiddenCompletely] = useState(false)

  useKey(() => setIsActive(false), {
    detectKeys: [27],
  })

  if (isCookieAccepted === 'true') {
    return null
  }

  return (
    <>
      <div
        data-testid="cookie-policy"
        onMouseEnter={() => {
          setIsActive(true)
        }}
        className={cx(styles.wrapper, {
          [styles.active]: isActive,
          [styles.hidden]: isHiddenCompletely,
        })}
      >
        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              Elit mollit reprehenderit dolore qui velit voluptate. Tempor
              voluptate id eu aliquip deserunt enim anim consectetur.
              Consectetur eu exercitation occaecat enim excepteur dolore.
            </p>
            <p>
              Nisi ea consectetur id id dolor aliqua proident et aliquip quis.
              Ut nisi tempor elit excepteur velit laboris ea eu enim mollit elit
              mollit dolor. Eiusmod anim esse mollit velit reprehenderit quis
              consectetur est esse ea deserunt officia. Eiusmod sit
              reprehenderit excepteur nostrud velit ad magna sint commodo qui.
              Dolore laboris commodo magna sint.
            </p>
            <p>
              Elit nostrud reprehenderit pariatur veniam reprehenderit ut ad
              magna occaecat id duis magna non. Aute occaecat ut laboris eiusmod
              qui officia in eiusmod qui exercitation ullamco id eu. Anim cillum
              enim Lorem nulla incididunt dolor do. Dolor ipsum sint ea nulla
              irure laborum dolore veniam sit incididunt aliquip ut. Velit sunt
              nulla reprehenderit aute commodo mollit tempor amet in nostrud
              nulla elit.
            </p>
          </div>
          <Button
            data-testid="action-button"
            additionalStyles={styles.btn}
            onClick={() => {
              setIsHiddenCompletely(true)
              setItem('isCookieAccepted', 'true')
            }}
          >
            Accept
          </Button>
        </div>
      </div>
      {isActive && !isHiddenCompletely && (
        <Overlay onClick={() => setIsActive(false)} />
      )}
    </>
  )
}
