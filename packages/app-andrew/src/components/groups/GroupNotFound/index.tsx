import React, { FC } from 'react'
import styles from './styles.scss'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'

export const GroupNotFound: FC = () => {
  const { t } = useTranslation('groupNotFoundComponent')

  return (
    <div className={styles.wrapper} data-testid="group-not-found">
      <h2>{t('header')}</h2>
      <p>{t('subheader')}</p>
      <Button>Delete Account</Button>
    </div>
  )
}
