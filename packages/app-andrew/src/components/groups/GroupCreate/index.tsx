import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreateForm } from './Form'

export const GroupCreate: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')
  const [errorOccured, setErrorOccured] = useState<boolean>(false)

  return (
    <div
      data-testid="group-create"
      className={styles.wrapper}
      style={{ backgroundImage: `url('/images/temp_images/group_bg.png')` }}
    >
      <div className={styles.formWrapper}>
        {errorOccured && (
          <div
            data-testid="group-create-error-indicator"
            style={{
              color: '#fff',
              fontWeight: 800,
              textAlign: 'center',
              backgroundColor: 'red',
              padding: '10px',
            }}
          >
            {t('errorOccured')}
          </div>
        )}
        <h1>{t('createGroup')}</h1>
        <p>
          Ad amet sunt voluptate consequat aliquip pariatur. Quis laboris
          incididunt elit.
        </p>
        <GroupCreateForm onError={() => setErrorOccured(true)} />
      </div>
    </div>
  )
}
