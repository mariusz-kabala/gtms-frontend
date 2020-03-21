import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupCreate } from '../../components/groups/GroupCreate'

export const GroupCreatePage: NextPage<{}> = () => {
  const { t } = useTranslation('account')

  return (
    <div data-testid="group-create-page">
      {t('group create header')}
      <GroupCreate />
    </div>
  )
}

GroupCreatePage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupCreate'] })
}

export default GroupCreatePage
