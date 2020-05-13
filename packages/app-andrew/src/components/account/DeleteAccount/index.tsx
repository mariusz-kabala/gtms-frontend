import React, { FC, useState } from 'react'
import cx from 'classnames'
import styles from './styles.scss'
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
          <div>
            <h2>{t('header')}</h2>
            <div className={styles.buttons}>
              <Button
                testid="delete-account-cancel"
                additionalStyles={styles.no}
                onClick={() => setIsModalOpen(false)}
              >
                {t('noBtn')}
              </Button>
              <Button
                testid="delete-account-confirm"
                onClick={() => {
                  onConfirm()
                  setIsModalOpen(false)
                }}
              >
                {t('yesBtn')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Button
        onClick={() => {
          setIsModalOpen(true)
        }}
        testid="delete-account-button"
        additionalStyles={cx(styles.btnDeleteAccount, additionalStyles)}
      >
        {t('deleteAccountBtn')}
      </Button>
    </div>
  )
}
