import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserAvatar } from 'components/common/UserAvatar'
import { UserNameSurname } from 'components/common/UserNameSurname'
import { TagGroup } from 'components/common/TagGroup'
import { Tag } from 'components/common/Tag'

export const PostSingle: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  {
    /* @this component is just a mock */
  }
  return (
    <div className={cx(styles.postSingle, additionalStyles)}>
      <div className={styles.user}>
        <UserAvatar
          additionalStyles={styles.userAvatar}
          image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
        />
        <UserNameSurname>Richard Branson</UserNameSurname>
      </div>
      <p className={styles.text}>
        Ex sint non nisi laborum ex in esse aliquip non veniam. Excepteurirure
        nisi enim laboris fugiat nostrud consequat do in ea. Et minimpariatur
        proident esse irure nisi ea non sint qui eu incididunt.
      </p>
      <TagGroup additionalStyles={styles.tags}>
        <Tag label="tag" />
        <Tag label="tag" />
        <Tag label="tag" />
        <Tag label="tag" />
      </TagGroup>
    </div>
  )
}
