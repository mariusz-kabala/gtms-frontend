import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
import { getImage, getDisplayName } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
// ui
import { Button } from '../Button'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { UserAvatar } from '../UserAvatar'
import { IoIosArrowDropright, IoIosStarOutline } from 'react-icons/io'
// styles
import styles from './styles.scss'

export const UserPreview: FC<{
  user: IUser
  noUserAvatar: { [key: string]: IImage }
  onUserPostsClick: (user: IUser) => unknown
}> = ({ user, noUserAvatar, onUserPostsClick }) => {
  return (
    <div className={styles.wrapper} data-testid="user-preview">
      <UserAvatar
        additionalStyles={styles.avatar}
        image={getImage('200x200', user.avatar, noUserAvatar)}
      />
      <div className={styles.cover} />
      <div className={styles.content}>
        <h2 className={styles.header}>{getDisplayName(user)}</h2>
        {user.description && <p className={styles.desc}>{user.description}</p>}
        {user.tags.length > 0 && (
          <>
            <h3 className={styles.headerSection}>Tags:</h3>
            <TagGroup additionalStyles={styles.tags}>
              {user.tags.map((tag) => (
                <Tag label={tag} key={`user-tag-${tag}`} />
              ))}
            </TagGroup>
          </>
        )}
      </div>
      <div className={styles.btnsWrapper}>
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
      </div>
    </div>
  )
}
