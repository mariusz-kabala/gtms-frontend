import React, { FC, useState, useRef } from 'react'
import { ISubComment, IUser, IAccountDetails } from '@gtms/commons/models'
import { createNewComment } from '@gtms/state-comment'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { UserAvatarNoImage } from 'enums'
// ui
import { PostCreate } from '@gtms/ui/PostCreate'
import { PostResponse } from '@gtms/ui/PostSingle/PostResponse'
import styles from './styles.scss'

export const SubCommentsList: FC<{
  parentComment: string
  postId: string
  subComments?: ISubComment[]
  user: IAccountDetails | null
}> = ({ subComments, user, parentComment, postId }) => {
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState<boolean>(false)
  const commentForm = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.wrapper}>
      {Array.isArray(subComments) && subComments.length > 0 && (
        <div>
          {subComments.map((subComment) => (
            <PostResponse
              key={`subComment-${subComment.id}`}
              html={subComment.html}
              createdAt={subComment.createdAt}
              owner={subComment.owner as IUser}
              user={user}
              noImage={UserAvatarNoImage}
            />
          ))}
        </div>
      )}

      {!isAnswerFormOpen && (
        <button
          onClick={(e) => {
            e.preventDefault()

            setIsAnswerFormOpen(true)

            if (commentForm.current) {
              window.scrollTo(0, commentForm.current.offsetTop)
            }
          }}
        >
          Respond
        </button>
      )}

      {isAnswerFormOpen && (
        <div ref={commentForm}>
          <PostCreate
            additionalStyles={styles.postResponseCreate}
            onSubmit={(text) => {
              createNewComment({
                post: postId,
                text,
                parent: parentComment,
              })
            }}
            fetchTags={findTagsAPI}
            fetchUsers={findbyUsernameAPI}
            user={user}
            noImage={UserAvatarNoImage}
          />
        </div>
      )}
    </div>
  )
}
