import React, { FC, useState, useEffect } from 'react'
import { LoginForm } from 'components/login/Form'
import { RegistrationForm } from 'components/registration/Form'
import { SocialButtons } from 'components/login/SocialButtons'
import { uiQuery, closeLoginModal } from 'state'
import { Link } from '@gtms/commons/i18n'
// ui
import { Modal } from '@gtms/ui/Modal'
import styles from './styles.scss'

export const RegisterLoginWindow: FC<{}> = () => {
  const [isLoginActive, setIsLoginActive] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(
    uiQuery.isRegisterLoginModalOpen()
  )

  useEffect(() => {
    const sub = uiQuery.isRegisterLoginModalOpen$.subscribe((value: boolean) =>
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
    <Modal additionalStyles={styles.modalContent} onClose={closeLoginModal}>
      <h2 className={styles.header}>Login</h2>
      {isLoginActive ? <LoginForm /> : <RegistrationForm />}
      <SocialButtons onFailure={() => null} />
      <Link href="/registration">
        <a className={styles.registrationLink}>
          You do not have an account? Register now!
        </a>
      </Link>
    </Modal>
  )
}
