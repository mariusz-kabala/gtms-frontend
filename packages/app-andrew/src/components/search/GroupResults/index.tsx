import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { UserAvatarNoImage } from 'enums'
// ui
import { MockData } from '@gtms/ui/MockData'
import { GroupSingle } from '@gtms/ui/GroupSingle'
import { Pagination } from '@gtms/ui/Pagination'
// styles
import styles from './styles.scss'

export const GroupResults: FC<{
  isLoading: boolean
  isError: boolean
  docs: IGroup[]
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
          <MockData theme="dark" />
          <MockData
            theme="dark"
            onClick={() => null}
            text="Searching, please wait..."
          />
          <MockData theme="dark" numberOfElements={4} />
        </div>
      )}
      {!isLoading && !isError && docs.length > 0 && (
        <>
          {docs.map((group) => (
            <GroupSingle
              noUserAvatar={UserAvatarNoImage}
              key={`group-${group.id}`}
              {...group}
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
      {!isLoading && !isError && docs.length == 0 && <p>No records</p>}
      {!isLoading && isError && <div>ERROR STATE, SHOW SOMETHING HERE</div>}
    </div>
  )
}
