import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { UserAvatarNoImage } from 'enums'
// ui
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { GroupSingle } from '@gtms/ui/GroupSingle'
import { MockData } from '@gtms/ui/MockData'
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
          <MockData />
          <MockData onClick={() => null} text="Searching, please wait..." />
          <MockData numberOfElements={4} />
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
      {!isLoading && isError && (
        <ErrorWrapper>
          <h2 data-testid="notifications-settings">
            {/* @todo add proper error msg with translation */}
            Error Lorem ipsum dolor
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
            minima quasi eaque molestiae cupiditate ab deserunt magnam veritatis
            rem
          </p>
        </ErrorWrapper>
      )}
    </div>
  )
}
