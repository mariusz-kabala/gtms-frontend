import React, { FC, useState } from 'react'
import GoogleLogin from 'react-google-login'
import classNames from './styles.scss'
import { fbLoginUser } from 'state/user'
import { useFacebookLogin } from 'hooks/fbLogin'
import { Spinner } from 'components/common/Spinner'

export const SocialButtons: FC<{
  onSuccess: () => unknown
  onFailure: () => unknown
}> = ({ onSuccess, onFailure }) => {
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

        onSuccess()
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
          className={`${classNames.button} ${classNames.facebook}`}
          onClick={() => !isLoading && onClick()}
        >
          Facebook
        </a>
      </div>
      <div className={classNames.children}>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={() => null}
          onFailure={() => null}
        />
      </div>
      {(isProcessing || isLoading) && (
        <div className={classNames.children}>
          <Spinner />
        </div>
      )}
    </div>
  )
}
