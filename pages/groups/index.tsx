import React from 'react'
import { NextPage } from 'next'
import { SavedSearch } from 'components/common/SavedSearch'

const GroupsPage: NextPage<{}> = () => {
  return (
    <div style={{ width: '340px' }}>
      <SavedSearch />
    </div>
  )
}

export default GroupsPage
