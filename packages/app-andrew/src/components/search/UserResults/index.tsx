import React, { FC } from 'react'
import { IUser } from '@gtms/commons/models'
import { UserAvatarNoImage } from 'enums'
// ui
import { MockData } from '@gtms/ui/MockData'
import { UserSingle } from '@gtms/ui/UserSingle'
import { Pagination } from '@gtms/ui/Pagination'
// styles
import styles from './styles.scss'

export const UserResults: FC<{
  isLoading: boolean
  isError: boolean
  docs: IUser[]
  tags: string[]
  limit: number
  offset: number
  total: number
  getCurrentUrl?: (page: number) => string
  onChangePage: (page: number) => unknown
}> = ({
  isLoading,
  isError,
  docs,
  tags,
  limit,
  offset,
  total,
  getCurrentUrl,
  onChangePage,
}) => {
  return (
    <div data-testid="search-group-results">
      {isLoading && (
        <div className={styles.noRecords}>
          <MockData />
          <MockData onClick={() => null} text="Searching, please wait..." />
          <MockData numberOfElements={4} />
        </div>
      )}
      {!isLoading && !isError && docs.length > 0 && (
        <>
          {docs.map((user) => (
            <UserSingle
              noUserAvatar={UserAvatarNoImage}
              key={`user-${user.id}`}
              {...user}
              activeTags={tags}
            />
          ))}
          <div className={styles.pagination}>
            <Pagination
              limit={limit}
              offset={offset}
              total={total}
              onClick={onChangePage}
              getCurrentUrl={getCurrentUrl}
            />
          </div>
        </>
      )}
      {!isLoading && isError && <div>ERROR STATE, SHOW SOMETHING HERE</div>}
      {!isLoading && !isError && docs.length == 0 && <p>No records</p>}
    </div>
  )
}
