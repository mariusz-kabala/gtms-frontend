import React, { FC, useState } from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import classNames from './styles.scss'
import { fbLoginUser, googleLoginUser } from 'state/user'
import { useFacebookLogin } from 'hooks/fbLogin'
import { Spinner } from 'components/common/Spinner'

export const SocialButtons: FC<{
  onFailure: () => unknown
}> = ({ onFailure }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onClick, isProcessing } = useFacebookLogin({
    appId: process.env.FB_APP_ID,
    fields: 'name, email, picture',
    onFailure,
    onSuccess: async payload => {
      const { accessToken, id } = payload

      setIsLoading(true)

      try {
        await fbLoginUser({
          accessToken,
          id,
        })
      } catch (err) {
        onFailure()
      }

      setIsLoading(false)
    },
  })

  return (
    <div data-testid="social-buttons" className={classNames.container}>
      <div className={classNames.children}>
        <a
          data-testid="social-buttons-facebook-button"
          className={`${classNames.button} ${classNames.facebook}`}
          onClick={() => !isLoading && onClick()}
        >
          Facebook
        </a>
      </div>
      <div
        className={classNames.children}
        data-testid="social-buttons-google-button"
      >
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={async response => {
            setIsLoading(true)

            const { accessToken, googleId } = response as GoogleLoginResponse

            try {
              await googleLoginUser({
                accessToken,
                id: googleId,
              })
            } catch (err) {
              onFailure()
            }

            setIsLoading(false)
          }}
          onFailure={onFailure}
        />
      </div>
      {(isProcessing || isLoading) && (
        <div
          className={classNames.children}
          data-testid="social-buttons-loader"
        >
          <Spinner />
        </div>
      )}
    </div>
  )
}
