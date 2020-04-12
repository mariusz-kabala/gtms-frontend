import React from 'react'
import { NextPage } from 'next'
import { useAuth } from '@gtms/commons/hooks/auth'
import { Logout } from '@gtms/ui/Logout'
import { RecentlyRegistered } from '@gtms/ui/RecentlyRegistered'

export const HomePage: NextPage<{}> = () => {
  const { isLogged } = useAuth()

  return (
    <div>
      {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
      {isLogged && <Logout />}
      <RecentlyRegistered />
    </div>
  )
}

HomePage.getInitialProps = async () => {
  return {
    namespacesRequired: ['commmon'],
  }
}

export default HomePage
