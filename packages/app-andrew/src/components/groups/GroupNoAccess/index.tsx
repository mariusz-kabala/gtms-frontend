import React, { FC } from 'react'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'

export const GroupNoAccess: FC = () => {
  const { t } = useTranslation('groupNoAccessComponent')

  return (
    <div className={styles.wrapper} data-testid="group-no-access">
      <h2>{t('header')}</h2>
      <p>{t('subheader')}</p>
      <Button>Delete Account</Button>
    </div>
  )
}
