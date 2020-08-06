import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
import { getImage, getDisplayName } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
// ui
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { UserAvatar } from '../UserAvatar'
import { Button } from '../Button'
import {
  IoIosArrowDropright,
  IoIosArrowDown,
  IoIosStarOutline,
} from 'react-icons/io'
// styles
import styles from './styles.scss'

export const UserPreview: FC<{
  user: IUser
  noUserAvatar: { [key: string]: IImage }
  onUserPostsClick: (user: IUser) => unknown
  onClose: () => unknown
}> = ({ user, noUserAvatar, onClose, onUserPostsClick }) => {
  return (
    <div className={styles.wrapper} data-testid="user-preview">
      <UserAvatar
        image={getImage('200x200', user.avatar, noUserAvatar)}
        additionalStyles={styles.userAvatar}
      />
      <div>
        <h1>{getDisplayName(user)}</h1>
        <h2>{user.username}</h2>
        {user.description && <p>{user.description}</p>}
      </div>

      {user.tags.length > 0 && (
        <TagGroup>
          {user.tags.map((tag) => (
            <Tag label={tag} key={`user-tag-${tag}`} />
          ))}
        </TagGroup>
      )}

      <Link href={`/user/${user.username}`}>
        <Button additionalStyles={styles.btn}>
          <i>
            <IoIosArrowDropright />
          </i>
          Open profile
        </Button>
      </Link>

      <Button
        additionalStyles={styles.btn}
        onClick={() => onUserPostsClick(user)}
      >
        <i>
          <IoIosArrowDropright />
        </i>
        Show posts
      </Button>

      <Button additionalStyles={styles.btn}>
        <i>
          <IoIosStarOutline />
        </i>
        Add to favs
      </Button>

      <Button onClick={onClose} additionalStyles={styles.btn}>
        <i>
          <IoIosArrowDown />
        </i>
        close it
      </Button>
    </div>
  )
}