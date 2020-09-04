import React, { FC, useState, useRef, useCallback } from 'react'
import cx from 'classnames'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import Lightbox from 'react-image-lightbox'
// commons
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import {
  IAccountDetails,
  IUser,
  IComment,
  IPostImage,
} from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
// ui
import { DeletePost } from './DeletePost'
import { PostCreate } from '../PostCreate'
import { PostResponse } from './PostResponse'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { Picture } from '../Picture'
import { UserAvatar } from '../UserAvatar'
import styles from './styles.scss'

export const PostSingle: FC<{
  id: string
  html: string
  createdAt: string
  additionalStyles?: string
  firstComments: IComment[]
  owner: IUser
  tags: string[]
  activeTags?: string[]
  images: IPostImage[]
  favs?: string[]
  renderFavs?: (favs: string[], id: string) => JSX.Element
  user: IAccountDetails | null
  allowToRespond?: boolean
  createComment: (payload: { post: string; text: string }) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  fetchUsers: (query: string, signal: AbortSignal) => Promise<string[]>
  noImage: { [key: string]: IImage }
  onUserClick?: (user: IUser) => unknown
  onClick?: (id: string) => unknown
  onTagClick?: (tag: string) => unknown
  onLoginRequest?: () => unknown
}> = ({
  id,
  additionalStyles,
  html,
  createdAt,
  owner,
  noImage,
  tags,
  fetchTags,
  fetchUsers,
  createComment,
  firstComments,
  user,
  onClick,
  onTagClick,
  onUserClick,
  onLoginRequest,
  renderFavs,
  images,
  favs = [],
  allowToRespond = false,
  activeTags = [],
}) => {
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState<boolean>(false)
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean
    current: number
  }>({
    isOpen: false,
    current: -1,
  })
  const commentForm = useRef<HTMLDivElement>(null)
  const onClickCallback = useCallback(() => {
    onClick && onClick(id)
  }, [id, onClick])
  const onUserClickCallback = useCallback(() => {
    onUserClick && onUserClick(owner)
  }, [onUserClick, owner])

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <div className={styles.user}>
          <UserAvatar
            onClick={onUserClickCallback}
            image={getImage('35x35', owner.avatar, noImage)}
            additionalStyles={styles.userAvatar}
          />
          <div>
            <a onClick={onUserClickCallback}>
              <span>{getDisplayName(owner)}</span>
            </a>
            <a onClick={onClickCallback}>
              <span className={styles.date}>
                {formatDistance(new Date(createdAt), new Date(), {
                  locale: pl,
                })}
              </span>
            </a>
          </div>
        </div>
        <div className={styles.actionButtons}>
          {owner.id === user?.id && (
            <DeletePost additionalStyles={styles.deleteBtn} />
          )}
          {renderFavs && renderFavs(favs, id)}
        </div>
      </div>
      <div className={styles.desc}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {images.length > 0 && (
          <div className={styles.images}>
            {images.map((img, index) => (
              <a
                onClick={(e) => {
                  e.preventDefault()

                  setLightboxState({
                    isOpen: true,
                    current: index,
                  })
                }}
                key={`post-img-${index}`}
                href={getImage('1300x1300', img).jpg}
              >
                <Picture {...getImage('200x200', img)} />
              </a>
            ))}
          </div>
        )}
        {tags.length > 0 && (
          <TagGroup additionalStyles={styles.tagGroup}>
            {tags.map((tag) => (
              <Tag
                onClick={() => onTagClick && onTagClick(tag)}
                label={tag}
                additionalStyles={cx({
                  [styles.activeTag]: activeTags.includes(tag),
                })}
                key={`post-tag-${tag}`}
              />
            ))}
          </TagGroup>
        )}
        {Array.isArray(firstComments) && firstComments.length > 0 && (
          <>
            {firstComments.map((comment) => (
              <PostResponse
                key={`comment-${comment.id}`}
                html={comment.html}
                createdAt={comment.createdAt}
                owner={comment.owner as IUser}
                noImage={noImage}
                user={user}
              />
            ))}
          </>
        )}
        {isAnswerFormOpen && allowToRespond && (
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
              fetchUsers={fetchUsers}
              user={user}
              noImage={noImage}
            />
          </div>
        )}
      </div>
      <div className={styles.btns}>
        {allowToRespond && (user || onLoginRequest) && (
          <button
            className={styles.respondBtn}
            onClick={(e) => {
              e.preventDefault()

              if (!user && onLoginRequest) {
                return onLoginRequest()
              }

              setIsAnswerFormOpen(true)
              if (commentForm.current) {
                window.scrollTo(0, commentForm.current.offsetTop)
              }
            }}
          >
            respond...
          </button>
        )}
        <button className={styles.readMoreBtn} onClick={onClickCallback}>
          read more...
        </button>
      </div>
      {lightboxState.isOpen && (
        <Lightbox
          enableZoom={false}
          mainSrc={getImage('1300x1300', images[lightboxState.current]).jpg}
          nextSrc={
            getImage(
              '1300x1300',
              images[(lightboxState.current + 1) % images.length]
            ).jpg
          }
          prevSrc={
            getImage(
              '1300x1300',
              images[
                (lightboxState.current + images.length - 1) % images.length
              ]
            ).jpg
          }
          onCloseRequest={() =>
            setLightboxState({
              isOpen: false,
              current: 0,
            })
          }
          onMovePrevRequest={() =>
            setLightboxState((state) => ({
              isOpen: true,
              current: (state.current + images.length - 1) % images.length,
            }))
          }
          onMoveNextRequest={() =>
            setLightboxState((state) => ({
              isOpen: true,
              current: (state.current + 1) % images.length,
            }))
          }
        />
      )}
    </div>
  )
}
