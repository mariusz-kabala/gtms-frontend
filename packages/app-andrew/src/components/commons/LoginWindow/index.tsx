import React, { FC, useState, useEffect } from 'react'
import { Modal } from '@gtms/ui/Modal'
import { LoginForm } from '../../login/Form'
import { SocialButtons } from '../../login/SocialButtons'
import styles from './styles.scss'
import { uiQuery } from '../../../state'
import { Link } from '@gtms/commons/i18n'

export const LoginWindow: FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(uiQuery.isLoginModalOpen())

  useEffect(() => {
    const sub = uiQuery.isLoginModalOpen$.subscribe((value: boolean) =>
      setIsOpen(value)
    )

    return sub.unsubscribe
  }, [])

  if (!isOpen) {
    return null
  }

  return (
    <Modal onClose={() => null}>
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
