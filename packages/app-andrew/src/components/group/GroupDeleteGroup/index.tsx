import React, { FC, useState } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const GroupDeleteGroup: FC<{
  additionalStyles?: string
  onConfirm: () => unknown
}> = ({ additionalStyles, onConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { t } = useTranslation('groupDeleteGroup')

  return (
    <div data-testid="delete-group">
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
              testid="delete-group-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              {t('noBtn')}
            </Button>
            <Button
              additionalStyles={styles.btn}
              testid="delete-group-confirm"
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
        onClick={() => {
          setIsModalOpen(true)
        }}
        testid="delete-group-button"
        additionalStyles={cx(styles.btnDeleteGroup, additionalStyles)}
      >
        {t('deleteGroupBtn')}
      </Button>
    </div>
  )
}
