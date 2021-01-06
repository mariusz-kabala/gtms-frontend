import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreateForm } from './Form'
import { useRouter } from 'next/router'
// styles
import styles from './styles.scss'

export const GroupCreate: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')
  const router = useRouter()
  const [errorOccured, setErrorOccured] = useState<boolean>(false)

  return (
    <div data-testid="group-create">
      {errorOccured && (
        <span
          className={styles.errorOccured}
          data-testid="group-create-error-indicator"
        >
          {t('errorOccured')}
        </span>
      )}
      <GroupCreateForm
        onError={() => setErrorOccured(true)}
        onSuccess={(group) => {
          // @todo here we should set a notification
          router.push(`/group/${group.slug}`)
        }}
      />
    </div>
  )
}
