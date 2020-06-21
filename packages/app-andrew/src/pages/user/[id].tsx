import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { IUserPageState, userPageState, userPageState$ } from 'queries'
import { getUserDetails, initialize } from '@gtms/state-user'
import { Profile } from 'components/user/Profile'
import { Groups } from 'components/user/Groups'
import { FollowButton } from 'components/user/FollowButton'

type UserPageProps = {
  namespacesRequired: readonly string[]
  initialState: IUserPageState
}

const UserPage: NextPage<UserPageProps> = ({ initialState }) => {
  const [state, setState] = useState<IUserPageState>(initialState)

  useEffect(() => {
    initialize(initialState)
    const sub = userPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div>
      <Profile user={state} />
      <FollowButton user={state} />
      <Groups
        groupsMember={state.groupsMember}
        groupsAdmin={state.groupsAdmin}
        groupsOwner={state.groupsOwner}
      />
    </div>
  )
}

UserPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<UserPageProps> => {
  const { id } = ctx?.query

  await getUserDetails(id as string)

  return {
    namespacesRequired: ['userPage'],
    initialState: userPageState(),
  }
}

export default UserPage
