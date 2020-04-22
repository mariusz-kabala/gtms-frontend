import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreateForm } from './Form'

export const GroupCreate: NextPage<{}> = () => {
  const { t } = useTranslation('groupCreate')
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
      <GroupCreateForm onError={() => setErrorOccured(true)} />
    </div>
  )
}
