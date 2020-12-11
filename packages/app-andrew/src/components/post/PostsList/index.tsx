import React, { FC, useCallback, useState } from 'react'
import { IPost, IUser, IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { addErrorNotification } from '@gtms/state-notification'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'
// api
import { createAbuseReportAPI } from '@gtms/api-abuse'
import { fetchGroupMembers } from '@gtms/api-group'
// components
import { PostAdmin } from 'components/post/Admin'
import { Favs } from 'components/post/Favs'
// ui
import { AbuseReportForm, VIEW } from '@gtms/ui/AbuseReportForm'
import { GroupCard } from '@gtms/ui/GroupCard'
import { Modal } from '@gtms/ui/Modal'
import { UserPreview } from '@gtms/ui/UserPreview'

const renderFavs = (favs: string[], id: string) => <Favs id={id} favs={favs} />

export const PostsList: FC<{
  isAdmin: boolean
  posts: IPost[]
  onUserPostsClick: (user: IUser) => unknown
  renderPost: (
    post: IPost & {
      renderMenu: (postId: string) => JSX.Element | null
      renderFavs: (favs: string[], id: string) => JSX.Element
      onUserClick: (user: IUser) => unknown
      onOpenGroupPreview?: (group: IGroup) => unknown
    }
  ) => JSX.Element
  showGroupPreview?: boolean
}> = ({
  renderPost,
  posts,
  isAdmin,
  onUserPostsClick,
  showGroupPreview = false,
}) => {
  const [userPreview, setUserPreview] = useState<IUser | undefined>()
  const [groupPreview, setGroupCard] = useState<{
    isOpen: boolean
    isLoading: boolean
    current?: IGroup
    users: IUser[]
  }>({
    isOpen: false,
    isLoading: false,
    users: [],
  })
  const onOpenGroupPreview = useCallback(async (group: IGroup) => {
    setGroupCard({
      isOpen: true,
      isLoading: true,
      current: group,
      users: [],
    })

    try {
      const { docs } = await fetchGroupMembers(group.slug, 0, 6)

      setGroupCard((state) => ({
        ...state,
        isLoading: false,
        users: docs,
      }))
    } catch {
      setGroupCard((state) => ({
        ...state,
        isLoading: false,
      }))
    }
  }, [])
  const onCloseGroupPreview = useCallback(() => {
    setGroupCard({
      isLoading: false,
      isOpen: false,
      users: [],
      current: undefined,
    })
  }, [])
  const onUserClick = useCallback((user: IUser) => {
    setUserPreview(user)
  }, [])
  const onCloseUserPreview = useCallback(() => {
    setUserPreview(undefined)
  }, [])

  const [abuseReportState, setAbuseReportState] = useState<{
    postId: null | string
    isOpen: boolean
    isMakingRequest: boolean
    view: VIEW
  }>({
    isOpen: false,
    isMakingRequest: false,
    postId: null,
    view: VIEW.form,
  })
  const onCloseReportAbuse = useCallback(
    () =>
      setAbuseReportState({
        isMakingRequest: false,
        isOpen: false,
        view: VIEW.form,
        postId: null,
      }),
    []
  )
  const onReportAbuseClick = useCallback((postId: string) => {
    setAbuseReportState({
      isMakingRequest: false,
      isOpen: true,
      view: VIEW.form,
      postId,
    })
  }, [])
  const renderPostMenu = useCallback(
    (postId: string) => {
      if (!isAdmin) {
        return null
      }

      return (
        <PostAdmin postId={postId} onReportAbuseClick={onReportAbuseClick} />
      )
    },
    [isAdmin]
  )

  const onAbuseReportSubmit = useCallback(
    (data) => {
      setAbuseReportState((state) => ({
        ...state,
        isMakingRequest: true,
      }))
      createAbuseReportAPI({
        ...data,
        post: abuseReportState.postId,
      })
        .then(() => {
          setAbuseReportState({
            isMakingRequest: false,
            isOpen: true,
            view: VIEW.confirmation,
            postId: null,
          })
        })
        .catch(() => {
          setAbuseReportState({
            isMakingRequest: false,
            isOpen: false,
            view: VIEW.form,
            postId: null,
          })
          addErrorNotification('Error occured, try again later')
        })
    },
    [abuseReportState]
  )

  return (
    <div data-testid="posts-list">
      {posts.map((post) =>
        renderPost({
          ...post,
          renderMenu: renderPostMenu,
          renderFavs,
          onUserClick,
          onOpenGroupPreview,
        })
      )}

      {abuseReportState.isOpen && (
        <Modal onClose={onCloseReportAbuse}>
          <AbuseReportForm
            onSubmit={onAbuseReportSubmit}
            view={abuseReportState.view}
            isMakingRequest={abuseReportState.isMakingRequest}
          />
        </Modal>
      )}
      {userPreview && (
        <Modal onClose={onCloseUserPreview}>
          <UserPreview
            noUserAvatar={UserAvatarNoImage}
            onUserPostsClick={onUserPostsClick}
            user={userPreview}
          />
        </Modal>
      )}
      {showGroupPreview && groupPreview.current && (
        <Modal onClose={onCloseGroupPreview}>
          <GroupCard
            description={groupPreview.current.description}
            isLoading={groupPreview.isLoading}
            logo={getImage(
              '200x200',
              groupPreview.current.avatar,
              GroupAvatarNoImage
            )}
            members={groupPreview.users}
            name={groupPreview.current.name}
            noUserAvatar={UserAvatarNoImage}
            slug={groupPreview.current.slug}
            tags={groupPreview.current.tags || []}
          />
        </Modal>
      )}
    </div>
  )
}
