import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { UserAvatar } from '../../UserAvatar'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('recentlyRegisteredUsers')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="RecentlyRegisteredUsers"
    >
      <h2 className={styles.output}>{t('header')}</h2>
      <div className={styles.user}>
        <UserAvatar
          image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
          additionalStyles={styles.userAvatar}
        />
        <span>Marty Mcfly</span>
      </div>
    </div>
  )
}
