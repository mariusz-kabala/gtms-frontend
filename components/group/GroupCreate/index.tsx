import React from 'react'
import styles from './styles.scss'
import { useTranslation } from 'i18n'
import { NextPage } from 'next'
import { GroupCreateForm } from './Form'

export const GroupCreate: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')

  return (
    <div className={styles.wrapper} data-testid="groupCreate">
      <div className={styles.formWrapper}>
        <h1>{t('createGroup')}</h1>
        <p>
          Ad amet sunt voluptate consequat aliquip pariatur. Quis laboris
          incididunt elit.
        </p>
        <GroupCreateForm />
      </div>
    </div>
  )
}
