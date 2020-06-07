import React from 'react'
import { NextPage } from 'next'

type UserPageProps = {
  namespacesRequired: readonly string[]
}

const UserPage: NextPage<UserPageProps> = () => {
  return <div>USER PAGE</div>
}

UserPage.getInitialProps = async (): Promise<UserPageProps> => {
  return Promise.resolve({
    namespacesRequired: ['userPage'],
  })
}

export default UserPage
