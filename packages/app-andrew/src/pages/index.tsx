import React, { useState } from 'react'
import { NextPage } from 'next'
import { useAuth } from '@gtms/commons/hooks/auth'
import { Logout } from '@gtms/ui/Logout'
import { Sidebar } from '@gtms/ui/Sidebar'

export const HomePage: NextPage<{}> = () => {
  const { isLogged } = useAuth()
  const [state, setState] = useState<boolean>(false)

  return (
    <div>
      <Sidebar isActive={state} onClose={() => setState(false)}>
        <p>scoped!</p>
      </Sidebar>
      <button onClick={() => setState(true)}>open sidebar</button>
      Welcome to Next.js!
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
