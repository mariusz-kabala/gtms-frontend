import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import { getItem, setItem } from 'helpers/localStorage'
import Button from 'components/Button'

export const CookiePolicy: FC<{ children: ReactNode }> = ({ children }) => {
  const isCookieAccepted = getItem('isCookieAccepted')

  return isCookieAccepted === 'true' ? (
    children
  ) : (
    <div className={styles.cookiePolicy}>
      <div className={styles.cookie}>
        <p>here goes cookie policy</p>
        <Button
          onClick={() => {
            setItem('isCookieAccepted', 'true')
          }}
        >
          Accept
        </Button>
      </div>
      {children}
    </div>
  )
}
