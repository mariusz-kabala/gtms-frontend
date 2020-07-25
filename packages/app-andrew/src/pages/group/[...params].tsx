import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { UserAvatarNoImage } from 'enums'
import {
  IGroupPageState,
  groupPageState,
  groupPageState$,
} from 'queries/groupPage.query'
import { useInitState } from '@gtms/commons/hooks'
import { useTranslation } from '@gtms/commons/i18n'
import { IPost } from '@gtms/commons/models'
// api
import { fetchPost } from '@gtms/api-post'
import { findTagsAPI, fetchSuggestedTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
// components
import { FavsButton } from 'components/group/FavsButton'
import { FollowButton } from 'components/group/FollowButton'
import { GroupAvatar } from 'components/group/GroupAvatar'
import { GroupDescription } from 'components/group/GroupDescription'
import { GroupMembers } from 'components/group/GroupMembers'
import { GroupNoAccess } from 'components/group/GroupNoAccess'
import { GroupNotFound } from 'components/group/GroupNotFound'
import { JoinLeaveButton } from 'components/group/JoinLeaveButton'
import { SettingsButton } from 'components/group/SettingsButton'
import { PostDetails } from 'components/post/PostDetails'
import { PromotedTags } from 'components/group/PromotedTags'
import { Favs } from 'components/post/Favs'
// ui
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { Picture } from '@gtms/ui/Picture'
import { PostCreate } from '@gtms/ui/PostCreate'
import { RecentlyAddedPosts } from '@gtms/ui/RecentlyAddedPosts'
import { SearchBar } from '@gtms/ui/SearchBar'
import { Spinner } from '@gtms/ui/Spinner'
import { WelcomeSlider } from '@gtms/ui/WelcomeSlider'
// state
import { openLoginModal } from 'state'
import {
  groupQuery,
  IGroupState,
  getGroup,
  initGroup,
  getGroupMembers,
} from '@gtms/state-group'
import {
  promotedTagsQuery,
  loadGroupPromotedTags,
  IPromotedTagsState,
  initPromoted,
} from '@gtms/state-tag'
import {
  createNewPost,
  createNewComment,
  getGroupPosts,
  postsQuery,
  IPostsState,
  initPostsStore,
} from '@gtms/state-post'
import {
  getPostComments,
  postCommentsQuery,
  IPostCommentsState,
  initPostCommentsStore,
} from '@gtms/state-comment'

type GroupPageProps = {
  namespacesRequired: readonly string[]
  group?: IGroupState
  posts?: IPostsState
  promoted?: IPromotedTagsState
  post?: IPost
  comments?: IPostCommentsState
}

const getInitData = ({
  group,
  posts,
  promoted,
  post,
  comments,
}: GroupPageProps) => () => {
  group && initGroup(group)
  posts && initPostsStore(posts, post)
  promoted && initPromoted(promoted)
  comments && initPostCommentsStore(comments)
}

const parseParams = (params: string[]) => {
  const result: {
    tag: string[]
    post: string[]
    slug: null | string
  } = {
    tag: [],
    post: [],
    slug: null,
  }

  let index: 'tag' | 'post' | null = null

  for (const param of params) {
    if (result.slug === null) {
      result.slug = param
      continue
    }

    if (['tag', 'post'].includes(param)) {
      index = param as 'tag' | 'post'
      continue
    }

    if (index !== null) {
      result[index].push(param)
    }
  }

  return result
}

const renderFavs = (favs: string[], id: string) => <Favs id={id} favs={favs} />

const GroupPage: NextPage<GroupPageProps> = (props) => {
  useInitState(getInitData(props))

  const { t } = useTranslation('groupPage')
  const router = useRouter()
  const [state, setState] = useState<IGroupPageState>(groupPageState())
  const [showPromoted, setShowPromoted] = useState<boolean>(false)
  const onPostClick = useCallback(
    (id) => {
      let url = `/group/${state.group?.slug}`

      if (Array.isArray(state.activeTags) && state.activeTags.length > 0) {
        url += `/tag/${state.activeTags.join('/')}`
      }

      router.push(`${url}/post/${id}`)
    },
    [state]
  )

  useEffect(() => {
    if (state.group) {
      getGroupMembers(state.group.slug, 0, 8)
    }
    const sub = groupPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        {state.isLoading && <Spinner />}

        {state.errorOccured && (
          <ErrorWrapper>
            <h2>ERROR OCCURED</h2>
            <p>
              Create a proper component that can be used here when 500 from BE
            </p>
          </ErrorWrapper>
        )}

        {state.notFound && <GroupNotFound />}

        {state.hasNoAccess && <GroupNoAccess />}

        {state.group && (
          <>
            <div className={styles.groupHeader}>
              <GroupAvatar
                additionalStyles={styles.groupAvatar}
                files={groupQuery.getAvatar('50x50', state)}
                filesStatus={groupQuery.getAvatarFileStatus()}
                isEditAllowed={groupQuery.hasAdminRights()}
              />
              <div className={styles.descWrapper}>
                <h2
                  className={styles.header}
                  data-tip={t('click-here-to-edit')}
                  data-type="dark"
                >
                  {state.group?.name}
                </h2>
                <GroupDescription
                  additionalStyles={styles.desc}
                  isEditAllowed={groupQuery.hasAdminRights()}
                  slug={state.group?.slug || ''}
                  text={
                    !state.group?.description
                      ? groupQuery.hasAdminRights()
                        ? 'you did not add group description yet, click here to change it'
                        : ''
                      : state.group?.description || ''
                  }
                />
              </div>
              <div className={styles.actionButtons}>
                <FavsButton group={state.group} />
                <JoinLeaveButton group={state.group} />
                <SettingsButton group={state.group} />
                <FollowButton group={state.group} />
              </div>
            </div>
            <WelcomeSlider />
            <div className={styles.groupPostsListWrapper}>
              <div className={styles.searchInput}>
                <div className={styles.search}>
                  <Button
                    onClick={() => setShowPromoted((value) => !value)}
                    additionalStyles={cx(styles.btnTags, {
                      [styles.active]: showPromoted,
                    })}
                  >
                    Tags
                  </Button>
                  <SearchBar
                    onTagAdd={() => null}
                    onTagRemove={() => null}
                    onLoadSuggestion={() => null}
                    onQueryChange={() => null}
                    onLoadSuggestionCancel={() => null}
                    tags={state.activeTags || []}
                  />
                </div>
              </div>
              {showPromoted && <PromotedTags />}
              <GroupMembers
                additionalStyles={styles.groupMembers}
                {...state.members}
              />
              <div className={styles.posts}>
                <div>
                  <NavigationTabs>
                    <h2 className={styles.header}>Posts</h2>
                    <ul className={styles.elements}>
                      <li className={cx(styles.item, styles.active)}>latest</li>
                      <li className={styles.item}>popular</li>
                    </ul>
                  </NavigationTabs>
                  <PostCreate
                    fetchTags={findTagsAPI}
                    fetchUsers={findbyUsernameAPI}
                    fetchSuggestedTags={fetchSuggestedTagsAPI}
                    user={state.user}
                    noImage={UserAvatarNoImage}
                    onSubmit={(text: string) => {
                      createNewPost({
                        group: state.group?.id || '',
                        text,
                      })
                    }}
                    additionalStyles={styles.postCreate}
                    onLoginRequest={openLoginModal}
                  />
                  <RecentlyAddedPosts
                    fetchTags={findTagsAPI}
                    fetchUsers={findbyUsernameAPI}
                    onPostClick={onPostClick}
                    onTagClick={(tag) => {
                      router.push(`/group/${state.group?.slug}/tag/${tag}`)
                    }}
                    user={state.user}
                    renderFavs={renderFavs}
                    activePost={state.activePost}
                    createComment={createNewComment}
                    noImage={UserAvatarNoImage}
                    posts={state.posts}
                    onLoginRequest={openLoginModal}
                    activeTags={state.activeTags || []}
                  />
                </div>
                <div>
                  {!state.activePost && (
                    <div className={styles.noPostPicture}>
                      <Picture
                        jpg={
                          '/images/white-theme/icon-click-post-and-read-full-content.png'
                        }
                      />
                      <span>Click post and read full content here </span>
                    </div>
                  )}
                  {state.activePost && (
                    <PostDetails
                      comments={state.comments}
                      user={state.user}
                      activeTags={state.activeTags || []}
                      post={state.activePost}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

GroupPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<GroupPageProps> => {
  const { params } = ctx?.query
  const { slug, tag, post } = parseParams(params as string[])
  const postId = Array.isArray(post) && post.length > 0 ? post[0] : undefined

  await getGroup(slug as string)

  const id = groupQuery.getId() || ''
  return Promise.all([
    new Promise<IPost | undefined>((resolve) => {
      if (!postId) {
        return resolve()
      }

      fetchPost(postId, false)
        .then(resolve)
        .catch(() => resolve())
    }),
    new Promise<undefined>((resolve) => {
      if (!postId) {
        return resolve()
      }

      const callback = () => resolve()

      getPostComments(postId).then(callback).catch(callback)
    }),
    getGroupPosts(id, 0, 50, tag).catch(() => null),
    loadGroupPromotedTags(id).catch(() => null),
  ]).then(([post]) => {
    return {
      namespacesRequired: ['groupPage', 'postCreate'],
      group: groupQuery.getValue(),
      posts: postsQuery.getValue(),
      promoted: promotedTagsQuery.getValue(),
      comments: post ? postCommentsQuery.getValue() : undefined,
      post,
    }
  })
}

export default GroupPage
