import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import styles from './styles.scss'

export const GroupNoAccess: FC = () => {
  const { t } = useTranslation('groupNoAccessComponent')

  return (
    <div className={styles.wrapper} data-testid="group-no-access">
      <ErrorWrapper
        buttons={<Button additionalStyles={styles.btn}>{t('btn')}</Button>}
      >
        <h2>{t('header')}</h2>
        <p>{t('subheader')}</p>
      </ErrorWrapper>
    </div>
  )
}
