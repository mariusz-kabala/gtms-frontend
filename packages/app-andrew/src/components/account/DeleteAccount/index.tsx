import React, { FC, useState } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { IoIosCloseCircle, IoIosCheckbox } from 'react-icons/io'
import { AiOutlineDelete } from 'react-icons/ai'
import { Button } from '@gtms/ui/Button'
import { Picture } from '@gtms/ui/Picture'
import { Modal } from '@gtms/ui/Modal'
import styles from './styles.scss'

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
          additionalStyles={styles.modal}
          onClose={() => setIsModalOpen(false)}
        >
          <Picture
            additionalStyles={styles.ohnoimage}
            jpg={'/images/white-theme/ohno.png'}
          />
          <div className={styles.buttons}>
            <Button
              additionalStyles={styles.btn}
              testid="delete-account-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              <i>
                <IoIosCloseCircle />
              </i>
              {t('noBtn')}
            </Button>
            <Button
              additionalStyles={styles.btn}
              testid="delete-account-confirm"
              onClick={() => {
                onConfirm()
                setIsModalOpen(false)
              }}
            >
              <i>
                <IoIosCheckbox />
              </i>
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
        <i>
          <AiOutlineDelete />
        </i>
        {t('deleteAccountBtn')}
      </Button>
    </div>
  )
}
