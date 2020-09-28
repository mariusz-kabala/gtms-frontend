import React, { FC, useRef, useState, useEffect } from 'react'
import styles from './styles.scss'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { PostResponse } from '@gtms/ui/PostSingle/PostResponse'
import { PostCreate } from '@gtms/ui/PostCreate'
import { IComment, IUser, IAccountDetails } from '@gtms/commons/models'
import { SubCommentsList } from '../SubCommentsList'
import { UserAvatarNoImage } from 'enums'
import { openLoginModal } from 'state'
import {
  IPostCommentsListState,
  postCommentsListState,
  postCommentsListState$,
} from './state.query'
import { createNewComment } from '@gtms/state-comment'
import { Spinner } from '@gtms/ui/Spinner'

export const PostCommentsList: FC<{
  isLoading: boolean
  errorOccured: boolean
  total: number
  offset: number
  limit: number
  comments: IComment[]
  postId: string
  user: IAccountDetails | null
}> = ({ isLoading, errorOccured, comments, user, postId }) => {
  const commentForm = useRef<HTMLDivElement>(null)
  const hasNoComments = !Array.isArray(comments) || comments.length === 0
  const [state, setState] = useState<IPostCommentsListState>(
    postCommentsListState()
  )

  useEffect(() => {
    const sub = postCommentsListState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (errorOccured) {
    return (
      <p>
        We can not show comments to the post right now, please refresh or try
        later
      </p>
    )
  }

  return (
    <>
      {hasNoComments && (
        <p className={styles.noComments}>
          No comments, you can add the first one
        </p>
      )}
      {!hasNoComments && (
        <button
          className={styles.respondButton}
          onClick={(e) => {
            e.preventDefault()

            if (!state.isLogged) {
              return openLoginModal()
            }

            if (commentForm.current) {
              window.scrollTo(0, commentForm.current.offsetTop)
            }
          }}
        >
          respond....
        </button>
      )}
      {comments.map((comment) => (
        <div key={`comment-${comment.id}`}>
          <PostResponse
            html={comment.html}
            createdAt={comment.createdAt}
            owner={comment.owner as IUser}
            user={user}
            noImage={UserAvatarNoImage}
          />
          <SubCommentsList
            parentComment={comment.id}
            postId={postId}
            user={user}
            subComments={comment.subComments}
          />
        </div>
      ))}
      <div ref={commentForm}>
        <PostCreate
          onSubmit={(text) => {
            createNewComment({
              post: postId,
              text,
            })
          }}
          fetchTags={findTagsAPI}
          fetchUsers={findbyUsernameAPI}
          user={user}
          noImage={UserAvatarNoImage}
          onLoginRequest={openLoginModal}
        />
      </div>
    </>
  )
}
