import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreateForm } from './Form'
import { useRouter } from 'next/router'

export const GroupCreate: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')
  const router = useRouter()
  const [errorOccured, setErrorOccured] = useState<boolean>(false)

  return (
    <div data-testid="group-create">
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
