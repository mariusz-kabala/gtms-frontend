import React from 'react'
import { NextPage } from 'next'
import { SettingsWizardForm } from 'components/groups/SettingsWizardForm'

const GroupPage: NextPage<{}> = () => {
  return (
    <div style={{ width: '40%', margin: '10% auto', color: 'white' }}>
      <SettingsWizardForm />
    </div>
  )
}

export default GroupPage
