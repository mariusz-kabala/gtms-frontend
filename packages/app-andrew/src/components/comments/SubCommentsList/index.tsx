import React, { FC, useState, useRef } from 'react'
import { ISubComment, IUser, IAccountDetails } from '@gtms/commons/models'
import { PostResponse } from '@gtms/ui/PostSingle/PostResponse'
import { PostCreate } from '@gtms/ui/PostCreate'
import { findTagsAPI } from '@gtms/api-tags'
import { UserAvatarNoImage } from 'enums'
import styles from './styles.scss'

export const SubCommentsList: FC<{
  subComments?: ISubComment[]
  user: IAccountDetails | null
}> = ({ subComments, user }) => {
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState<boolean>(false)
  const commentForm = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.wrapper}>
      {Array.isArray(subComments) && subComments.length > 0 && (
        <div>
          {subComments.map((subComment) => (
            <PostResponse
              key={`subComment-${subComment.id}`}
              text={subComment.text}
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
            onSubmit={() => null}
            fetchTags={findTagsAPI}
            user={user}
            noImage={UserAvatarNoImage}
          />
        </div>
      )}
    </div>
  )
}
