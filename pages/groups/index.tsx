import React from 'react'
import { NextPage } from 'next'
import { Navigation } from 'components/common/Navigation'
import { SavedSearch } from 'components/common/SavedSearch'

const GroupsPage: NextPage<{}> = () => {
  return (
    <div style={{ width: '340px' }}>
      <SavedSearch />
      <Navigation />
    </div>
  )
}

export default GroupsPage
