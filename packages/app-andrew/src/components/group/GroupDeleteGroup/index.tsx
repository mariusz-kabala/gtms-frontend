import React, { FC, useState } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
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
          additionalStyles={styles.modalContent}
          onClose={() => setIsModalOpen(false)}
        >
          <div>
            <h2>{t('header')}</h2>
            <div className={styles.buttons}>
              <Button
                testid="delete-group-cancel"
                additionalStyles={styles.no}
                onClick={() => setIsModalOpen(false)}
              >
                {t('noBtn')}
              </Button>
              <Button
                testid="delete-group-confirm"
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
        testid="delete-group-button"
        additionalStyles={cx(styles.btnDeleteGroup, additionalStyles)}
      >
        {t('deleteGroupBtn')}
      </Button>
    </div>
  )
}
