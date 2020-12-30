import React, { FC, useState, useEffect } from 'react'
// commons
import { UserAvatarNoImage } from 'enums'
// api
import { fetchMyPosts, IMyPostsResponse } from '@gtms/api-post'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
// state
import { createNewComment } from '@gtms/state-post'
import { openLoginModal } from 'state'
import { IMyPostsState, myPostsState, myPostsState$ } from './state.query'
// components
import { PostsList } from 'components/post/PostsList'
// ui
import { MockData } from '@gtms/ui/MockData'
import { PostSingle } from '@gtms/ui/PostSingle'
// styles
import styles from './styles.scss'

export const MyPosts: FC = () => {
  const [data, setData] = useState<
    IMyPostsResponse & {
      isLoading: boolean
      errorOccured: boolean
    }
  >({
    isLoading: true,
    errorOccured: false,
    docs: [],
    total: -1,
    limit: -1,
    offset: -1,
  })
  const [state, setState] = useState<IMyPostsState>(myPostsState())

  useEffect(() => {
    fetchMyPosts({ limit: 50, offset: 0 }).then((result) => {
      setData({
        isLoading: false,
        errorOccured: false,
        ...result,
      })
    })

    const sub = myPostsState$.subscribe((value) => {
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.userLastPosts}>
      <span>My last posts:</span>
      {data.isLoading && (
        <div className={styles.noRecords}>
          <MockData />
          <MockData onClick={() => null} text="Loading, please wait" />
          <MockData numberOfElements={4} />
        </div>
      )}
      {!data.isLoading && data.docs.length > 0 && !data.errorOccured && (
        <PostsList
          posts={data.docs}
          isAdmin={false}
          renderPost={(post) => (
            <PostSingle
              additionalStyles={styles.post}
              activeTags={[]}
              allowToRespond={false}
              createComment={createNewComment}
              fetchTags={findTagsAPI}
              fetchUsers={findbyUsernameAPI}
              key={`post-${post.id}`}
              noImage={UserAvatarNoImage}
              onClick={() => null}
              onLoginRequest={openLoginModal}
              onTagClick={() => null}
              user={state.user}
              {...post}
            />
          )}
        />
      )}

      {!data.isLoading && data.docs.length === 0 && !data.errorOccured && (
        <p>No records :( Add your first post!</p>
      )}

      {!data.isLoading && data.errorOccured && (
        <p>Error occured, we can not show your posts now. Sorry!</p>
      )}
    </div>
  )
}
