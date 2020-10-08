import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { UserAvatarNoImage } from 'enums'
// ui
import { MockData } from '@gtms/ui/MockData'
import { UserSingle } from '@gtms/ui/UserSingle'
// styles
import styles from './styles.scss'

export const UserResults: FC<{
  isLoading: boolean
  isError: boolean
  docs: IUser[]
  tags: string[]
}> = ({ isLoading, isError, docs, tags }) => {
  return (
    <div data-testid="search-group-results">
      {isLoading && (
        <div className={styles.noRecords}>
          <MockData theme="dark" />
          <MockData
            theme="dark"
            onClick={() => null}
            text="Searching, please wait..."
          />
          <MockData theme="dark" numberOfElements={4} />
        </div>
      )}
      {!isLoading &&
        !isError &&
        docs.length > 0 &&
        docs.map((user) => (
          <UserSingle
            noUserAvatar={UserAvatarNoImage}
            key={`user-${user.id}`}
            {...user}
            activeTags={tags}
          />
        ))}
      {!isLoading && isError && <div>ERROR STATE, SHOW SOMETHING HERE</div>}
      {!isLoading && !isError && docs.length == 0 && <p>No records</p>}
    </div>
  )
}
