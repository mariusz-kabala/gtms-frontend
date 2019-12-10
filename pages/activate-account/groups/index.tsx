import React from 'react'
import { NextPage } from 'next'
import { useCheckAccess } from 'hooks/access'
import { authOrRedirectToLogin } from 'server/auth'
import { SavedSearch } from 'components/common/SavedSearch'

const GroupsPage: NextPage<{
  accessToken?: string
  refreshToken?: string
}> = ({ accessToken, refreshToken }) => {
  useCheckAccess({ accessToken, refreshToken })

  return (
    <div style={{ width: '340px' }}>
      <SavedSearch />
    </div>
  )
}

GroupsPage.getInitialProps = authOrRedirectToLogin

export default GroupsPage
