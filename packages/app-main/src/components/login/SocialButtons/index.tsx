import React, { FC, useState } from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import styles from './styles.scss'
import cx from 'classnames'
import { fbLoginUser, googleLoginUser } from '@gtms/state-user'
import { useFacebookLogin } from '@gtms/commons/hooks/fbLogin'
import { Spinner } from '@gtms/ui/Spinner'

export const SocialButtons: FC<{
  additionalStyles?: string
  onFailure: () => unknown
}> = ({ additionalStyles, onFailure }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onClick, isProcessing } = useFacebookLogin({
    appId: process.env.FB_APP_ID,
    fields: 'name, email, picture',
    onFailure,
    onSuccess: async (payload) => {
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
    <div
      data-testid="social-buttons"
      className={cx(styles.container, additionalStyles)}
    >
      <div className={styles.children}>
        <button
          data-testid="social-buttons-facebook-button"
          className={`${styles.button} ${styles.facebook}`}
          onClick={() => !isLoading && onClick()}
        >
          Facebook
        </button>
      </div>
      <div
        className={styles.children}
        data-testid="social-buttons-google-button"
      >
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Google"
          onSuccess={async (response) => {
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
        <div className={styles.children} data-testid="social-buttons-loader">
          <Spinner />
        </div>
      )}
    </div>
  )
}
