import React, { FC, useState, useEffect } from 'react'
import { Picture } from '@gtms/ui/Picture'
import { Tag } from '@gtms/ui/Tag'
import { UserAvatarNoImage } from 'enums'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { TagGroup } from '@gtms/ui/TagGroup'
import { InviteToGroupButton } from '../InviteToGroupButton'
import { IUser } from '@gtms/commons/models'
import styles from './styles.scss'
import { IAccountDetails, userQuery } from '@gtms/state-user'

export const Profile: FC<{
  user: IUser
}> = ({ user }) => {
  const [state, setState] = useState<IAccountDetails>(
    userQuery.accountDetails()
  )

  useEffect(() => {
    const sub = userQuery.accountDetails$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="user-profile">
      <div className={styles.left}>
        <div className={styles.profileImage}>
          <Picture {...getImage('800x800', user.avatar, UserAvatarNoImage)} />
        </div>
      </div>
      <div className={styles.right}>
        <section className={styles.info}>
          <h2>{getDisplayName(user)}</h2>
          <p>{user.description || 'user did not add any description yet'}</p>
        </section>

        <section className={styles.tags}>
          <h3>Moje tagi:</h3>
          <TagGroup>
            {user.tags.length > 0 &&
              user.tags.map((tag) => (
                <Tag label={tag} key={`user-tag-${tag}`} />
              ))}
            {user.tags.length === 0 && <p>No tags</p>}
          </TagGroup>
        </section>

        {state.id !== user.id && (
          <section className={styles.actions}>
            <InviteToGroupButton userId={user.id} />
          </section>
        )}
      </div>
    </div>
  )
}
