import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import { useTranslation } from '@gtms/commons/i18n'

export const DeleteAccount: FC<{
  additionalStyles?: string
  onConfirm: () => unknown
}> = ({ additionalStyles, onConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { t } = useTranslation('deleteUserAccount')

  return (
    <div data-testid="delete-account">
      {isModalOpen && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() => setIsModalOpen(false)}
        >
          <h2>{t('header')}</h2>
          <p>Eteu in occaecat occaecat consectetur et laboris aliquip.</p>
          <div className={styles.buttons}>
            <Button
              testid="delete-account-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              {t('noBtn')}
            </Button>
            <Button
              testid="delete-account-confirm"
              additionalStyles={styles.yes}
              onClick={() => {
                onConfirm()
                setIsModalOpen(false)
              }}
            >
              {t('yesBtn')}
            </Button>
          </div>
        </Modal>
      )}

      <Button
        additionalStyles={cx(styles.btnDeleteAccount, additionalStyles)}
        onClick={() => {
          setIsModalOpen(true)
        }}
        testid="delete-account-button"
      >
        {t('deleteAccountBtn')}
      </Button>
    </div>
  )
}
