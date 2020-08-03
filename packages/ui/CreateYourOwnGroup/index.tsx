import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
import { useTranslation } from '@gtms/commons/i18n'

export const CreateYourOwnGroup: FC<{
  additionalStyles?: string
  onClick?: () => unknown
}> = ({ additionalStyles, onClick }) => {
  const { t } = useTranslation('createYourOwnGroup')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="create-your-own-group"
      onClick={() => (onClick ? onClick : null)}
      style={{
        backgroundImage: `url('/images/white-theme/create-your-own-group.png')`,
      }}
    >
      <Link href={'/group/group-create'}>
        <div>
          <h4 className={styles.header}>{t('header')}</h4>
          <p className={styles.desc}>{t('description')}</p>
        </div>
      </Link>
    </div>
  )
}
