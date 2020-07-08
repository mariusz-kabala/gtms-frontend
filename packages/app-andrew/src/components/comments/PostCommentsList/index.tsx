import React, { FC, useRef, useState, useEffect } from 'react'
import { findTagsAPI } from '@gtms/api-tags'
import { PostResponse } from '@gtms/ui/PostSingle/PostResponse'
import { Spinner } from '@gtms/ui/Spinner'
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
import styles from './styles.scss'

export const PostCommentsList: FC<{
  isLoading: boolean
  errorOccured: boolean
  total: number
  offset: number
  limit: number
  comments: IComment[]
  user: IAccountDetails | null
}> = ({ isLoading, errorOccured, comments, user }) => {
  const commentForm = useRef<HTMLDivElement>(null)
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

  if (!Array.isArray(comments) || comments.length === 0) {
    return <p>No comments, you can add the first one</p>
  }

  return (
    <div>
      <div className={styles.respondButton}>
        <button
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
          Respond
        </button>
      </div>
      {comments.map((comment) => (
        <div key={`comment-${comment.id}`}>
          <PostResponse
            text={comment.text}
            createdAt={comment.createdAt}
            owner={comment.owner as IUser}
            user={user}
            noImage={UserAvatarNoImage}
          />
          <SubCommentsList user={user} subComments={comment.subComments} />
        </div>
      ))}
      <div ref={commentForm}>
        <PostCreate
          onSubmit={() => null}
          fetchTags={findTagsAPI}
          user={user}
          noImage={UserAvatarNoImage}
          onLoginRequest={openLoginModal}
        />
      </div>
    </div>
  )
}
