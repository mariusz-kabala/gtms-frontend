import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { setItem } from '@gtms/commons/helpers/localStorage'
import styles from './styles.scss'

export const Logout: FC<{
  text?: string
}> = ({ text }) => {
  const { t } = useTranslation('common')

  return (
    <a className={styles.wrapper} data-testid="logout-button" href="/logout">
      <button
        className={styles.btn}
        onClick={() => setItem('logout', '' + Date.now())}
      >
        {text ?? t('logout')}
      </button>
    </a>
  )
}
