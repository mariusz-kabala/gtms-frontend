import React, { useState } from 'react'
import { NextPage } from 'next'
import { useAuth } from '@gtms/commons/hooks/auth'
import { Logout } from '@gtms/ui/Logout'
import { Sidebar } from '@gtms/ui/Sidebar'
import { Link } from '@gtms/commons/i18n'

export const HomePage: NextPage<{}> = () => {
  const { isLogged } = useAuth()
  const [state, setState] = useState<boolean>(false)

  return (
    <div>
      <Sidebar isActive={state} onClose={() => setState(false)}>
        <p>scoped!</p>
      </Sidebar>
      <ul>
        <li>
          <Link href="/group/owsiak">Owsiak</Link>
        </li>
        <li>
          <Link href="/group/my-private-group">My Private group</Link>
        </li>
        <li>
          <Link href="/group/private-group">Private group</Link>
        </li>
      </ul>
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
