import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { UserAvatar } from '../UserAvatar'
import { TagGroup } from '../TagGroup'
import { Tag } from '../Tag'
import { Button } from '../Button'

export const PostSingle: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('postSingleComponent')

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <UserAvatar
          image={{
            jpg: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
          }}
          additionalStyles={styles.userAvatar}
        />
        <span>Marty Mcfly</span>
        <Button additionalStyles={styles.delete}>{t('deletePost')}</Button>
      </div>
      <div className={styles.text}>
        <p>
          Ex sint non nisi laborum ex in esse aliquip non veniam. Excepteur
          irure nisi enim laboris fugiat nostrud consequat do in ea. Et minim
          pariatur proident esse irure nisi ea non sint qui eu incididunt.
        </p>
      </div>
      <TagGroup>
        <Tag label="tag" />
        <Tag label="tag" />
        <Tag label="tag" />
        <Tag label="tag" />
      </TagGroup>
    </div>
  )
}
