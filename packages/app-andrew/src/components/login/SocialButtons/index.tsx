import React, { FC, useState } from 'react'
import GoogleLogin, { GoogleLoginResponseOffline } from 'react-google-login'
import styles from './styles.scss'
import cx from 'classnames'
import { fbLoginUser, googleLoginUser } from '@gtms/state-user'
import { useFacebookLogin } from '@gtms/commons/hooks/fbLogin'
import { Spinner } from '@gtms/ui/Spinner'
import getConfig from 'next/config'
import { FaFacebookF } from 'react-icons/fa'

export const SocialButtons: FC<{
  additionalStyles?: string
  onFailure: () => unknown
}> = ({ additionalStyles, onFailure }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { publicRuntimeConfig } = getConfig()
  const { onClick, isProcessing } = useFacebookLogin({
    appId: publicRuntimeConfig.FB_APP_ID,
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
      className={cx(styles.wrapper, additionalStyles)}
    >
      {!isProcessing && !isLoading && (
        <>
          <button
            data-testid="social-buttons-facebook-button"
            className={`${styles.button} ${styles.facebook}`}
            onClick={() => !isLoading && onClick()}
          >
            <FaFacebookF /> Facebook
          </button>
          <div
            className={styles.google}
            data-testid="social-buttons-google-button"
          >
            <GoogleLogin
              clientId={publicRuntimeConfig.GOOGLE_CLIENT_ID}
              buttonText="Google"
              responseType="code"
              accessType="offline"
              onSuccess={async (response) => {
                setIsLoading(true)

                const { code } = response as GoogleLoginResponseOffline

                try {
                  await googleLoginUser({
                    code,
                  })
                } catch (err) {
                  onFailure()
                }

                setIsLoading(false)
              }}
              onFailure={onFailure}
            />
          </div>
        </>
      )}
      {(isProcessing || isLoading) && (
        <Spinner additionalStyles={styles.spinner} />
      )}
    </div>
  )
}
