import React, { FC, ReactElement } from 'react'
import styles from './styles.scss'
import { getItem, setItem } from 'helpers/localStorage'
import { Button } from 'components/common/Button'

export const CookiePolicy: FC<{ children: ReactElement }> = ({ children }) => {
  const isCookieAccepted = getItem('isCookieAccepted')

  return isCookieAccepted === 'true' ? (
    children
  ) : (
    <div data-testid="cookie-policy" className={styles.cookiePolicy}>
      <div className={styles.cookie}>
        <p>here goes cookie policy</p>
        <Button onClick={() => setItem('isCookieAccepted', 'true')}>
          Accept
        </Button>
      </div>
      {children}
    </div>
  )
}
