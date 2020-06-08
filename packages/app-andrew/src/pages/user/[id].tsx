import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { IUserPageState, userPageState, userPageState$ } from 'queries'

type UserPageProps = {
  namespacesRequired: readonly string[]
}

const UserPage: NextPage<UserPageProps> = () => {
  const [state, setState] = useState<IUserPageState>(userPageState())
  useEffect(() => {
    const sub = userPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])
  return <div>USER PAGE</div>
}

UserPage.getInitialProps = async (): Promise<UserPageProps> => {
  return Promise.resolve({
    namespacesRequired: ['userPage'],
  })
}

export default UserPage
