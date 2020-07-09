import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '../../Button'
import useKey from 'use-key-hook'
import { IoIosCloseCircle, IoIosCheckbox, IoMdTrash } from 'react-icons/io'

export const DeletePost: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('postSingleDeletePostComponent')
  const [isActive, setIsActive] = useState<boolean>(false)

  useKey(() => setIsActive(false), {
    detectKeys: [27],
  })

  return isActive ? (
    <div
      className={styles.wrapperConfirm}
      data-testid="post-single-delete-post-question"
    >
      <h2>{t('header')}</h2>
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
  ) : (
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
  )
}
