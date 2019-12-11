import React from 'react'
import { NextPage } from 'next'
import { useAuth } from 'hooks/auth'
import { Logout } from 'components/common/Logout'
import { ToggleCheckbox } from 'components/common/Forms/ToggleCheckbox'

export const HomePage: NextPage<{}> = () => {
  const { isLogged } = useAuth()

  return (
    <div>
      Welcome to Next.js!
      <p>scoped!</p>
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
