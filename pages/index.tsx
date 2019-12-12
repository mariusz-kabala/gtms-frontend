import React, { useState } from 'react'
import { NextPage } from 'next'
import { useAuth } from 'hooks/auth'
import { Logout } from 'components/common/Logout'
import { ToggleCheckbox } from 'components/common/Forms/ToggleCheckbox'
import { Sidebar } from 'components/common/Sidebar'

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
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
          margin: 0;
        }
      `}</style>
      <ToggleCheckbox
        lockerIcon
        labelChecked="checked"
        labelUnchecked="unchecked"
      />
      <br />
      <ToggleCheckbox labelChecked="checked" labelUnchecked="unchecked" />
    </div>
  )
}

HomePage.getInitialProps = async () => {
  return {
    namespacesRequired: ['commmon'],
  }
}

export default HomePage
