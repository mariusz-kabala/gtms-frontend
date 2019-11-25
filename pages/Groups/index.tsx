import { NextPage } from 'next'
import { checkAccess } from 'hooks/access'
import { authOrRedirectToLogin } from 'server/auth'

const GroupsPage: NextPage<{
  accessToken?: string
  refreshToken?: string
}> = ({ accessToken, refreshToken }) => {
  checkAccess({ accessToken, refreshToken })

  return <div>Groups page</div>
}

GroupsPage.getInitialProps = authOrRedirectToLogin

export default GroupsPage
