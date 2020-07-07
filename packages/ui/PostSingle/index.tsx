import React, { FC, useState, useRef, useCallback } from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
// ui
import { DeletePost } from './DeletePost'
import { PostResponse } from './PostResponse'
import { PostCreate } from '../PostCreate'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { UserAvatar } from '../UserAvatar'
// commons
import { IComment } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { IAccountDetails, IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { Link } from '@gtms/commons/i18n'
import { IImage } from '@gtms/commons/types/image'
// style
import styles from './styles.scss'

export const PostSingle: FC<{
  id: string
  text: string
  createdAt: string
  additionalStyles?: string
  firstComments: IComment[]
  owner: IUser
  tags: string[]
  user: IAccountDetails | null
  createComment: (payload: { post: string; text: string }) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  noImage: { [key: string]: IImage }
  onClick?: (id: string) => unknown
}> = ({
  id,
  additionalStyles,
  text,
  createdAt,
  owner,
  noImage,
  tags,
  fetchTags,
  createComment,
  firstComments,
  user,
  onClick,
}) => {
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState<boolean>(false)
  const commentForm = useRef<HTMLDivElement>(null)
  const onClickCallback = useCallback(() => {
    onClick && onClick(id)
  }, [id, onClick])

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <div className={styles.user}>
          <Link href={`/user/${owner.id}`}>
            <>
              <UserAvatar
                image={
                  owner.avatar?.status === FileStatus.ready
                    ? (owner.avatar.files['35x35'] as IImage)
                    : noImage['35x35']
                }
                additionalStyles={styles.userAvatar}
              />
            </>
          </Link>
          <div>
            <Link href={`/user/${owner.id}`}>
              <span>{getDisplayName(owner)}</span>
            </Link>
            <a onClick={onClickCallback}>
              <span className={styles.date}>
                {formatDistance(new Date(createdAt), new Date(), {
                  locale: pl,
                })}
              </span>
            </a>
          </div>
        </div>

        {owner.id === user?.id && (
          <DeletePost additionalStyles={styles.deleteBtn} />
        )}
      </div>
      <div className={styles.desc}>
        <div onClick={onClickCallback}>
          <ReactMarkdown className={styles.text} source={text} />
        </div>
        {tags.length > 0 && (
          <TagGroup additionalStyles={styles.tagGroup}>
            {tags.map((tag) => (
              <Tag label={tag} key={`post-tag-${tag}`} />
            ))}
          </TagGroup>
        )}

        <button
          className={styles.respondBtn}
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
        {Array.isArray(firstComments) && firstComments.length > 0 && (
          <div>
            {firstComments.map((comment) => (
              <PostResponse
                key={`comment-${comment.id}`}
                text={comment.text}
                createdAt={comment.createdAt}
                owner={getDisplayName(comment.owner as IUser)}
                image={getImage('35x35', comment.owner.avatar, noImage)}
              />
            ))}
          </div>
        )}
        {isAnswerFormOpen && (
          <div ref={commentForm}>
            <PostCreate
              additionalStyles={styles.postResponseCreate}
              onSubmit={(text) => {
                createComment({
                  text,
                  post: id,
                })
              }}
              fetchTags={fetchTags}
              user={user}
              noImage={noImage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
