import React, { FC, useState } from 'react'
import { Button } from 'components/common/Button'
import { Modal } from 'components/common/Modal'
import styles from './styles.scss'
// import { Link } from 'i18n'

export const DeleteAccount: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <div>
              {/* @todo create mixin for headers */}
              <h2>Are you sure youd like to delete your account?</h2>

              <div className={styles.buttons}>
                <Button additionalStyles={styles.no} onClick={() => null}>
                  Nah, not, not really, just kiddin
                </Button>

                <Button onClick={() => null}>
                  Yes, really. Its time to say good bye...
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Button
        onClick={() => {
          setIsModalOpen(true)
        }}
        additionalStyles={styles.btnDeleteAccount}
      >
        Delete Account
      </Button>
    </>
  )
}
