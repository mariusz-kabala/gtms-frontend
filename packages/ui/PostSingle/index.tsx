import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserAvatar } from '../UserAvatar'
import { TagGroup } from '../TagGroup'
import { Tag } from '../Tag'

export const PostSingle: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  {
    /* @this component is just a mock */
  }
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="postSingle"
    >
      <div className={styles.user}>
        <UserAvatar
          additionalStyles={styles.userAvatar}
          image="images/temp_images/logo-patrol-2.png"
          onClick={() => setState(!state)}
        />
        <span>Marty Mcfly</span>
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
