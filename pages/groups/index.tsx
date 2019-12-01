import React from 'react'
import { NextPage } from 'next'
import { useCheckAccess } from 'hooks/access'
import { ShareGroup } from 'components/groups/shareGroup'
import { authOrRedirectToLogin } from 'server/auth'

const GroupsPage: NextPage<{
  accessToken?: string
  refreshToken?: string
}> = ({ accessToken, refreshToken }) => {
  useCheckAccess({ accessToken, refreshToken })

  return <ShareGroup />
}

GroupsPage.getInitialProps = authOrRedirectToLogin

export default GroupsPage
