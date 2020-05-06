import React, { FC, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { Overlay } from '@gtms/ui/Overlay'
import { useTranslation } from '@gtms/commons/i18n'

export const InviteFriends: FC<{
  additionalStyles?: string
  onClose: () => unknown
}> = ({ additionalStyles, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  const { t } = useTranslation('inviteFriendsComponent')

  return (
    <>
      <div
        className={cx(styles.wrapper, additionalStyles)}
        data-testid="invite-friends"
      >
        {t('header')}
      </div>
      <Overlay onClick={onClose} />
    </>
  )
}
