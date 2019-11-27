import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useAuth } from 'hooks/auth'
import { authOrRedirectToLogin } from 'server/auth'
import { Logout } from 'components/common/Logout'
import { ToggleCheckbox } from 'components/common/Forms/ToggleCheckbox'
import { SearchBar } from 'components/common/SearchBar'

export const HomePage: NextPage<{
  accessToken?: string
  refreshToken?: string
  namespacesRequired?: string[]
}> = ({ accessToken, refreshToken }) => {
  const { isLogged } = useAuth(accessToken, refreshToken)

  return (
    <div>
      Welcome to Next.js!
      <p>scoped!</p>
      {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
      {isLogged && <Logout />}
      <SearchBar />
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

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  const results = await authOrRedirectToLogin(ctx)

  return {
    ...results,
    namespacesRequired: ['commmon'],
  }
}

export default HomePage
