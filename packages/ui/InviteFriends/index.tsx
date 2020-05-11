import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ClickToCopy } from '@gtms/ui/ClickToCopy'
import { useTranslation } from '@gtms/commons/i18n'

export const InviteFriends: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('inviteFriendsComponent')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="invite-friends"
      style={{ backgroundImage: `url(/images/temp_images/andrew_bg.jpg)` }}
    >
      <div className={styles.content}>
        <h2 className={styles.header}>{t('header')}</h2>
        <ClickToCopy text="TEXT IS MISSING HERE!!" />
      </div>
    </div>
  )
}
