import React, { FC } from 'react'
import { UserAvatarNoImage } from 'enums'
import { IPost } from '@gtms/commons/models'
// api
import { findTagsAPI } from '@gtms/api-tags'
// state
import { openLoginModal } from 'state'
// components
import { PostsList } from 'components/post/PostsList'
// ui
import { MockData } from '@gtms/ui/MockData'
import { PostSingle } from '@gtms/ui/PostSingle'
import { Pagination } from '@gtms/ui/Pagination'
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
          <MockData theme="dark" />
          <MockData
            theme="dark"
            onClick={() => null}
            text="Searching, please wait..."
          />
          <MockData theme="dark" numberOfElements={4} />
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <PostsList
            posts={docs}
            showGroupPreview={true}
            isAdmin={false}
            onUserPostsClick={() => null}
            renderPost={(post) => (
              <PostSingle
                key={`post-${post.id}`}
                allowToRespond={false}
                onClick={() => null}
                onTagClick={() => null}
                fetchTags={findTagsAPI}
                fetchUsers={() => Promise.resolve([])} //{findbyUsernameAPI}
                createComment={() => null}
                user={null}
                {...post}
                noImage={UserAvatarNoImage}
                onLoginRequest={openLoginModal}
                activeTags={tags}
              />
            )}
          />
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
    </div>
  )
}
