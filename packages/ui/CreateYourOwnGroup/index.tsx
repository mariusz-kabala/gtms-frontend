import React, { FC } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const CreateYourOwnGroup: FC<{
  additionalStyles?: string
  onClick?: () => unknown
}> = ({ additionalStyles, onClick }) => {
  const { t } = useTranslation('createYourOwnGroup')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="create-your-own-group"
      onClick={onClick}
    >
      <Link href={'/group-create'}>
        <a>
          <Picture
            additionalStyles={styles.picture}
            jpg={'/images/white-theme/create-your-own-group.png'}
          />
          <h4 className={styles.header}>{t('header')}</h4>
          <p className={styles.desc}>{t('description')}</p>
        </a>
      </Link>
    </div>
  )
}
