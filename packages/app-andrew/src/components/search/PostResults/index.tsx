import React, { FC } from 'react'
import { UserAvatarNoImage } from '@app/enums'
import { IPost } from '@gtms/commons/models'
// api
import { findTagsAPI } from '@gtms/api-tags'
// state
import { openLoginModal } from '@app/state'
// components
import { PostsList } from '@app/components/post/PostsList'
// ui
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { MockData } from '@gtms/ui/MockData'
import { Pagination } from '@gtms/ui/Pagination'
import { PostSingle } from '@gtms/ui/PostSingle'
// styles
import styles from './styles.scss'

export const PostResults: FC<{
  isLoading: boolean
  isError: boolean
  docs: IPost[]
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
    <div data-testid="search-post-results">
      {isLoading && (
        <div className={styles.noRecords}>
          <MockData />
          <MockData onClick={() => null} text="Searching, please wait..." />
          <MockData numberOfElements={4} />
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <PostsList
            isAdmin={false}
            posts={docs}
            renderPost={(post) => (
              <PostSingle
                {...post}
                additionalStyles={styles.postSingle}
                activeTags={tags}
                allowToRespond={false}
                createComment={() => null}
                fetchTags={findTagsAPI}
                fetchUsers={() => Promise.resolve([])} //{findbyUsernameAPI}
                key={`post-${post.id}`}
                noImage={UserAvatarNoImage}
                onClick={() => null}
                onLoginRequest={openLoginModal}
                onTagClick={() => null}
                user={null}
              />
            )}
          />
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
