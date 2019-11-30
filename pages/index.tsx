import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useAuth } from 'hooks/auth'
import { authOrRedirectToLogin } from 'server/auth'
import { useTranslation } from 'i18n'

export const HomePage: NextPage<{
  accessToken?: string
  refreshToken?: string
  namespacesRequired?: string[]
}> = ({ accessToken, refreshToken }) => {
  const { isLogged } = useAuth(accessToken, refreshToken)
  const { t } = useTranslation('common')

  return (
    <div>
      Welcome to Next.js!
      <p>scoped!</p>
      {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
      {isLogged && <a href="/logout">{t('logout')}</a>}
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
