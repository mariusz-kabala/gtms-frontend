import React, { FC } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import classNames from './styles.scss'
import { fbLoginUser } from 'state/user'

export const SocialButtons: FC<{ onSuccess: () => unknown }> = ({
  onSuccess,
}) => {
  return (
    <div className={classNames.container}>
      <div className={classNames.children}>
        <FacebookLogin
          appId={process.env.FB_APP_ID}
          fields="name, email, picture"
          callback={async response => {
            await fbLoginUser({
              accessToken: response.accessToken,
              id: response.id,
            })
            onSuccess()
          }}
          render={renderProps => (
            <button onClick={renderProps.onClick}>
              This is my custom FB button
            </button>
          )}
          size="small"
        />
      </div>
      <div className={classNames.children}>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={() => null}
          onFailure={() => null}
        />
      </div>
    </div>
  )
}
