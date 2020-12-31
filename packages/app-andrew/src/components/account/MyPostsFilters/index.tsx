import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
// api
import { fetchMyPostDetails, IMyPostsDetailsResponse } from '@gtms/api-post'
// commons
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage } from 'enums'
//state
import { showGroupPreview } from 'state/groupPreview'
// ui
import { Spinner } from '@gtms/ui/Spinner'
import { Picture } from '@gtms/ui/Picture'
// styles
import styles from './styles.scss'

export const MyPostsFilters: FC<{
  onGroupClick: (groupName: string, groupId: string) => void
  active?: string[]
}> = ({ onGroupClick, active = [] }) => {
  const [data, setData] = useState<{
    isLoading: boolean
    errorOccured: boolean
    filters?: IMyPostsDetailsResponse[]
  }>({
    isLoading: true,
    errorOccured: false,
  })

  useEffect(() => {
    fetchMyPostDetails().then((res) => {
      setData({
        isLoading: false,
        errorOccured: false,
        filters: res,
      })
    })
  }, [])

  if (!data.isLoading && !data.errorOccured && data.filters?.length === 0) {
    // in general should not happen, as we should not load this component if user has no posts
    return null
  }

  return (
    <div data-testid="posts-filters">
      {data.isLoading && <Spinner />}
      {!data.isLoading && data.errorOccured && (
        <p>Error occured, please try later</p>
      )}
      {data.filters && (
        <ul className={styles.groupFilter}>
          {data.filters.map((group) => (
            <li
              key={`group-filter-${group.id}`}
              className={cx({
                [styles.active]: active.includes(group.name),
              })}
            >
              <div>
                <a onClick={() => showGroupPreview(group)}>
                  <Picture
                    {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                  />
                </a>
              </div>
              <div>
                <h3>
                  <a onClick={() => onGroupClick(group.name, group.id)}>
                    {group.name}
                  </a>
                </h3>
                <p>
                  <span>{group.count}</span> posts created
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
