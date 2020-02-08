import React from 'react'
import { NextPage } from 'next'
import { useAuth } from 'hooks/auth'
import { Logout } from 'components/common/Logout'

export const HomePage: NextPage<{}> = () => {
  const { isLogged } = useAuth()

  return (
    <div>
      {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
      {isLogged && <Logout />}
    </div>
  )
}

HomePage.getInitialProps = async () => {
  return {
    namespacesRequired: ['commmon'],
  }
}

export default HomePage
