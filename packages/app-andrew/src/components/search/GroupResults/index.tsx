import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { UserAvatarNoImage } from '@app/enums'
// ui
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { GroupSingle } from '@gtms/ui/GroupSingle'
import { MockData } from '@gtms/ui/MockData'
import { Pagination } from '@gtms/ui/Pagination'
// styles
import styles from './styles.scss'

export const GroupResults: FC<{
  docs: IGroup[]
  getCurrentUrl?: (page: number) => string
  isError: boolean
  isLoading: boolean
  limit: number
  offset: number
  onChangePage: (page: number) => unknown
  tags: string[]
  total: number
}> = ({
  docs,
  getCurrentUrl,
  isError,
  isLoading,
  limit,
  offset,
  onChangePage,
  tags,
  total,
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
              {...group}
              activeTags={tags}
              key={`group-${group.id}`}
              noUserAvatar={UserAvatarNoImage}
            />
          ))}
          <Pagination
            additionalStyles={styles.pagination}
            getCurrentUrl={getCurrentUrl}
            limit={limit}
            offset={offset}
            onClick={onChangePage}
            total={total}
          />
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
