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
// styles
import styles from './styles.scss'

export const PostResults: FC<{
  isLoading: boolean
  isError: boolean
  docs: IPost[]
  tags: string[]
}> = ({ isLoading, isError, docs, tags }) => {
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
      )}
      {!isLoading && isError && <div>ERROR STATE, SHOW SOMETHING HERE</div>}
    </div>
  )
}
