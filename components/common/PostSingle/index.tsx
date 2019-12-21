import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { FlipCard } from 'components/common/FlipCard'
import { UserAvatar } from 'components/common/UserAvatar'
import { UserCard } from 'components/common/UserCard'
import { TagGroup } from 'components/common/TagGroup'
import { Tag } from 'components/common/Tag'

export const PostSingle: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState(false)

  {
    /* @this component is just a mock */
  }

  return (
    <div className={cx(additionalStyles)}>
      <FlipCard
        isActive={state}
        clickOutside
        back={
          <UserCard image="https://www.bootdey.com/img/Content/avatar/avatar6.png" />
        }
      >
        <div className={styles.postSingle}>
          <UserAvatar
            onClick={() => setState(!state)}
            image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
            additionalStyles={styles.userAvatar}
            userName="Marty McFly"
          />
          <p className={styles.text}>
            Ex sint non nisi laborum ex in esse aliquip non veniam. Excepteur
            irure nisi enim laboris fugiat nostrud consequat do in ea. Et minim
            pariatur proident esse irure nisi ea non sint qui eu incididunt.
          </p>
          <p>
            Eiusmod minim mollit non esse do aute cupidatat. Consequat
            consectetur consequat sit sit est. Nisi et commodo enim sunt
            consectetur eu officia Lorem dolore est sunt ex voluptate.
          </p>
          <TagGroup>
            <Tag label="tag" />
            <Tag label="tag" />
            <Tag label="tag" />
            <Tag label="tag" />
          </TagGroup>
        </div>
      </FlipCard>
    </div>
  )
}
