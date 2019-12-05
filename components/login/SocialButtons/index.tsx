import React, { FC } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import classNames from './styles.scss'
import { fbLoginUser } from 'state/user'

export const SocialButtons: FC<{ onSuccess: () => unknown }> = ({
  onSuccess,
}) => {
  return (
    <div data-testid="social-buttons" className={classNames.container}>
      <div className={classNames.children}>
        <FacebookLogin
          appId={process.env.FB_APP_ID}
          fields="name, email, picture"
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
