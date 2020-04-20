import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { useTranslation } from '@gtms/commons/i18n'
import { UserAvatar } from '../UserAvatar'

export const PostCreate: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('postCreate')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="postCreate"
    >
      <div className={styles.text}>
        <div className={styles.avatar}>
          <UserAvatar
            image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
            additionalStyles={styles.userAvatar}
          />
          <span>John Lasseter</span>
        </div>
        <ExpandingTextarea rows={3} placeholder={t('yourMessage')} />
      </div>
      <Button type="submit" disabled={false} additionalStyles={styles.btn}>
        {t('send')}
      </Button>
    </div>
  )
}
