import React, { FC, useState, useEffect } from 'react'
import { Modal } from '@gtms/ui/Modal'
import { LoginForm } from 'components/login/Form'
import { SocialButtons } from 'components/login/SocialButtons'
import styles from './styles.scss'
import { uiQuery } from 'state'
import { Link } from '@gtms/commons/i18n'

export const LoginWindow: FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(uiQuery.isLoginModalOpen())

  useEffect(() => {
    const sub = uiQuery.isLoginModalOpen$.subscribe((value: boolean) =>
      setIsOpen(value)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!isOpen) {
    return null
  }

  return (
    // @mariusz do we want to close this modal window onClick on overlay? if yes is that below is ok?
    <Modal onClose={() => setIsOpen(false)}>
      <div className={styles.loginWindow}>
        <h2>Login</h2>
        <LoginForm />
        <SocialButtons onFailure={() => null} />
        <Link href="/registration">
          <a className={styles.registrationLink}>
            Dont have account? Register now!
          </a>
        </Link>
      </div>
    </Modal>
  )
}
