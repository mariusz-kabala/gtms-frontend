import React, { FC, useRef, useState, useEffect } from 'react'
import styles from './styles.scss'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { IComment, IUser, IAccountDetails } from '@gtms/commons/models'
import { SubCommentsList } from '../SubCommentsList'
import { UserAvatarNoImage } from '@app/enums'
import { openLoginModal } from '@app/state'
import {
  IPostCommentsListState,
  postCommentsListState,
  postCommentsListState$,
} from './state.query'
import { showUserPreview } from '@app/state/userPreview'
import { createNewComment } from '@gtms/state-comment'
// ui
import { IoMdSend } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { PostResponse } from '@gtms/ui/PostSingle/PostResponse'
import { PostCreate } from '@gtms/ui/PostCreate'
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
  const [value, setValue] = useState<string>('')
  const [showSendButton, setShowSendButton] = useState<boolean>(false)
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
      <ErrorWrapper>
        <h2>
          We can not show comments to the post right now, please refresh or try
          later
        </h2>
      </ErrorWrapper>
    )
  }

  return (
    <>
      <span className={styles.noComments}>
        No comments, you can add the first one
      </span>
      {hasNoComments && (
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
        <div className={styles.postCommentsList} key={`comment-${comment.id}`}>
          <PostResponse
            html={comment.html}
            createdAt={comment.createdAt}
            owner={comment.owner as IUser}
            user={user}
            noImage={UserAvatarNoImage}
            onUserPreviewClick={showUserPreview}
          />
          <SubCommentsList
            parentComment={comment.id}
            postId={postId}
            user={user}
            subComments={comment.subComments}
          />
        </div>
      ))}
      <div ref={commentForm} onClick={() => setShowSendButton(true)}>
        <PostCreate
          fetchTags={findTagsAPI}
          fetchUsers={findbyUsernameAPI}
          noImage={UserAvatarNoImage}
          onLoginRequest={openLoginModal}
          setValue={setValue}
          user={user}
          value={value}
        />
        {showSendButton && (
          <Button
            disabled={value === ''}
            onClick={() => {
              createNewComment({
                post: postId,
                text: value,
              })

              setValue('')
            }}
          >
            send
            <i>
              <IoMdSend />
            </i>
          </Button>
        )}
      </div>
    </>
  )
}
