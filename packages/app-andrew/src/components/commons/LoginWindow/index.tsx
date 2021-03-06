import React, { FC, useState, useEffect } from 'react'
import { LoginForm } from '@app/components/login/Form'
import { SocialButtons } from '@app/components/login/SocialButtons'
import { uiQuery, closeLoginModal } from '@app/state'
import { Link } from '@gtms/commons/i18n'
// ui
import { Modal } from '@gtms/ui/Modal'
import styles from './styles.scss'

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
    <Modal additionalStyles={styles.modalContent} onClose={closeLoginModal}>
      <h2 className={styles.header}>Login</h2>
      <LoginForm />
      <SocialButtons onFailure={() => null} />
      <Link href="/registration">
        <a className={styles.registrationLink}>
          You do not have an account? Register now!
        </a>
      </Link>
    </Modal>
  )
}
