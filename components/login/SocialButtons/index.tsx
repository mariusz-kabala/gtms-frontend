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
          appId="303620873893899"
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
          clientId="852444040338-23tmailtvhcb2koltsra0bmjiu7f9ni7.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={() => null}
          onFailure={() => null}
        />
      </div>
    </div>
  )
}
