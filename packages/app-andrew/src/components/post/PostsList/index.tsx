import React, { FC, useCallback, useState } from 'react'
import { IPost } from '@gtms/commons/models'
import { addErrorNotification } from '@gtms/state-notification'
// api
import { createAbuseReportAPI } from '@gtms/api-abuse'
// components
import { PostAdmin } from 'components/post/Admin'
import { Favs } from 'components/post/Favs'
// ui
import { AbuseReportForm, VIEW } from '@gtms/ui/AbuseReportForm'

const renderFavs = (favs: string[], id: string) => <Favs id={id} favs={favs} />

export const PostsList: FC<{
  isAdmin: boolean
  posts: IPost[]
  renderPost: (
    post: IPost & {
      renderMenu: (postId: string) => JSX.Element | null
      renderFavs: (favs: string[], id: string) => JSX.Element
    }
  ) => JSX.Element
}> = ({ renderPost, posts, isAdmin }) => {
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
        })
      )}
      <AbuseReportForm
        onSubmit={onAbuseReportSubmit}
        view={abuseReportState.view}
        isMakingRequest={abuseReportState.isMakingRequest}
        isOpen={abuseReportState.isOpen}
        onClose={onCloseReportAbuse}
      />
    </div>
  )
}
