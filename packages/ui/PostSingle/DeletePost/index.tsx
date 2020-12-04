import React, { FC, useState } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import useKey from 'use-key-hook'
// ui
import { Button } from '../../Button'
import { Modal } from '@gtms/ui/Modal'
import { IoIosCloseCircle, IoIosCheckbox, IoMdTrash } from 'react-icons/io'
import styles from './styles.scss'

export const DeletePost: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('postSingleDeletePostComponent')
  const [isActive, setIsActive] = useState<boolean>(false)

  useKey(() => setIsActive(false), {
    detectKeys: [27],
  })

  return (
    <>
      {isActive && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() => setIsActive(false)}
        >
          <div data-testid="post-single-delete-post-question">
            <h2 className={styles.header}>{t('header')}</h2>
            <p className={styles.desc}>
              Eteu in occaecat occaecat consectetur et laboris aliquip.
            </p>
            <div className={styles.buttons}>
              <Button
                additionalStyles={styles.btn}
                onClick={() => setIsActive(false)}
                testid="post-single-delete-post-canel"
              >
                <i>
                  <IoIosCloseCircle />
                </i>
                {t('noBtn')}
              </Button>
              <Button
                additionalStyles={styles.btn}
                onClick={() => setIsActive(false)}
                testid="delete-account-confirm"
              >
                <i>
                  <IoIosCheckbox />
                </i>
                {t('yesBtn')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <Button
        additionalStyles={cx(styles.buttonDelete, additionalStyles)}
        testid="post-single-delete-post-button"
        onClick={() => setIsActive(true)}
      >
        <i>
          <IoMdTrash />
        </i>
        {t('btnDeletePost')}
      </Button>
    </>
  )
}
