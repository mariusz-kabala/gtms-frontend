import { NextPage } from 'next'
import { useAuth } from 'hooks/auth'
import { authOrRedirectToLogin } from 'server/auth'

export const HomePage: NextPage<{
  accessToken?: string
  refreshToken?: string
}> = ({ accessToken, refreshToken }) => {
  const { isLogged } = useAuth(accessToken, refreshToken)

  return (
    <div>
      Welcome to Next.js!
      <p>scoped!</p>
      {isLogged && <p>USER HAS A VALID SESSION!!!</p>}
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

HomePage.getInitialProps = authOrRedirectToLogin

export default HomePage
