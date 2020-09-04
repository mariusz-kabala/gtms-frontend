import React, { useState, useEffect, useCallback, useRef } from 'react'
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
import { IPost, IUser } from '@gtms/commons/models'
// api
import { fetchPost, Sorting } from '@gtms/api-post'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
// components
import { Favs } from 'components/post/Favs'
import { FavsButton } from 'components/group/FavsButton'
import { FollowButton } from 'components/group/FollowButton'
import { GroupAvatar } from 'components/group/GroupAvatar'
import { GroupCover } from 'components/group/GroupCover'
import { GroupDescription } from 'components/group/GroupDescription'
import { GroupMembers } from 'components/group/GroupMembers'
import { GroupNoAccess } from 'components/group/GroupNoAccess'
import { GroupNotFound } from 'components/group/GroupNotFound'
import { JoinLeaveButton } from 'components/group/JoinLeaveButton'
import { PostCreate } from 'components/post/PostCreate'
import { PostDetails } from 'components/post/PostDetails'
import { PromotedTags } from 'components/group/PromotedTags'
import { SettingsButton } from 'components/group/SettingsButton'
// state
import { openLoginModal } from 'state'
import {
  groupQuery,
  IGroupState,
  getGroup,
  initGroup,
  getGroupMembers,
} from '@gtms/state-group'
import { checkGroupsFavStatus } from '@gtms/state-user'
import {
  promotedTagsQuery,
  loadGroupPromotedTags,
  IPromotedTagsState,
  initPromoted,
} from '@gtms/state-tag'
import {
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
import { changePageBackground } from 'state'
// ui
import { IoMdGrid } from 'react-icons/io'
import { GoDatabase, GoGitCompare, GoRepoForked, GoGift } from 'react-icons/go'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { Pagination } from '@gtms/ui/Pagination'
import { RecentlyAddedPosts } from '@gtms/ui/RecentlyAddedPosts'
import { SearchBar } from '@gtms/ui/SearchBar'
import { Spinner } from '@gtms/ui/Spinner'
import { UserPreview } from '@gtms/ui/UserPreview'
import styles from './styles.scss'

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
  if (group) {
    initGroup(group)

    if (group.group?.bgType) {
      changePageBackground(group.group?.bgType)
    }
  }
  posts && initPostsStore(posts, post)
  promoted && initPromoted(promoted)
  comments && initPostCommentsStore(comments)
}

const parseParams = (params: string[]) => {
  const result: {
    tag: string[]
    post: string[]
    user: string[]
    slug: null | string
    page: string[]
    sort: Sorting[]
  } = {
    tag: [],
    post: [],
    user: [],
    slug: null,
    page: [],
    sort: [],
  }

  let index: 'tag' | 'post' | 'sort' | 'user' | 'page' | null = null

  for (const param of params) {
    if (result.slug === null) {
      result.slug = param
      continue
    }

    if (['tag', 'post', 'sort', 'user', 'page'].includes(param)) {
      index = param as 'tag' | 'post' | 'sort' | 'user' | 'page'
      continue
    }

    if (index !== null) {
      result[index].push(param as any)
    }
  }

  return result
}

const renderFavs = (favs: string[], id: string) => <Favs id={id} favs={favs} />

const GroupPage: NextPage<GroupPageProps> = (props) => {
  useInitState(getInitData(props))

  const { t } = useTranslation('groupPage')
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const [state, setState] = useState<IGroupPageState>(groupPageState())
  const [userPreview, setUserPreview] = useState<IUser | undefined>()
  const [showPromoted, setShowPromoted] = useState<boolean>(false)
  const generateUrl = useCallback(
    ({
      sort,
      post,
      user,
      tag,
      page,
      fillEmptyValues = false,
    }: {
      sort?: Sorting
      post?: string
      user?: string | string[]
      tag?: string | string[]
      page?: string | number
      fillEmptyValues?: boolean
    }) => {
      if (fillEmptyValues) {
        sort = sort || state.postsSorting
        user = user || state.activeUsers
        tag = tag || state.activeTags
      }

      let url = `/group/${state.group?.slug}`

      if (page) {
        url += `/page/${page}`
      }

      if (
        (typeof user === 'string' && user !== '') ||
        (Array.isArray(user) && user.length > 0)
      ) {
        url += `/user/${Array.isArray(user) ? user.join('/') : user}`
      }

      if (sort) {
        url += `/sort/${sort}`
      }

      if (
        (typeof tag === 'string' && tag !== '') ||
        (Array.isArray(tag) && tag.length > 0)
      ) {
        url += `/tag/${Array.isArray(tag) ? tag.join('/') : tag}`
      }

      if (post) {
        url += `/post/${post}`
      }

      return url
    },
    [state]
  )
  const onClick = useCallback(
    ({
      sort,
      post,
      user,
      tag,
      page,
    }: {
      sort?: Sorting
      post?: string
      user?: string
      tag?: string
      page?: string | number
    }) => {
      const tags = Array.isArray(state.activeTags) ? state.activeTags : []

      if (tag) {
        tags.push(tag)
      }

      const url = generateUrl({
        sort,
        post,
        user,
        tag: tags,
        page,
      })

      router.push(url)
    },
    [state]
  )
  const onUserClick = useCallback((user: IUser) => {
    setUserPreview(user)
  }, [])
  const onCloseUserPreview = useCallback(() => {
    setUserPreview(undefined)
  }, [])

  const promotedTagsRef = useRef<HTMLDivElement>(null)
  const groupHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.group) {
      getGroupMembers(state.group.slug, 0, 8)
    }

    const sub = groupPageState$.subscribe((value) => {
      if (value.group && value.user?.id) {
        checkGroupsFavStatus([value.group.id])
      }
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.pageWrapper}>
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
            <div
              className={cx(styles.groupSidebar, {
                [styles.active]: isSidebarOpen,
              })}
              ref={groupHeaderRef}
            >
              <div className={styles.makeItSticky}>
                <div className={styles.avatarNamedDesc}>
                  <div className={styles.avatarName}>
                    <GroupAvatar
                      additionalStyles={styles.groupAvatar}
                      files={groupQuery.getAvatar('50x50', state)}
                      filesStatus={groupQuery.getAvatarFileStatus()}
                      isEditAllowed={groupQuery.hasAdminRights()}
                    />
                    <h2
                      className={styles.header}
                      data-tip={t('click-here-to-edit')}
                      data-type="dark"
                    >
                      {state.group?.name}
                    </h2>
                  </div>
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
                <Button
                  additionalStyles={cx(styles.btnTags, {
                    [styles.active]: showPromoted,
                  })}
                  onClick={() => {
                    if (!showPromoted) {
                      setTimeout(() => {
                        if (
                          !promotedTagsRef.current ||
                          !groupHeaderRef.current
                        ) {
                          return
                        }
                        window.scroll({
                          top:
                            promotedTagsRef.current.offsetTop -
                            groupHeaderRef.current.clientHeight,
                          left: 0,
                          behavior: 'smooth',
                        })
                      }, 200)
                    }
                    setShowPromoted((value) => !value)
                  }}
                >
                  <i>
                    <IoMdGrid />
                  </i>
                  <span>Tags</span>
                </Button>
                <ul className={styles.navmock}>
                  <li className={styles.item}>
                    <i>
                      <GoDatabase />
                    </i>
                    <span>Users</span>
                  </li>
                  <li className={styles.item}>
                    <i>
                      <GoGitCompare />
                    </i>
                    <span>Tags</span>
                  </li>
                  <li className={styles.item}>
                    <i>
                      <GoRepoForked />
                    </i>
                    <span>Settings</span>
                  </li>
                  <li
                    className={styles.item}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <i>
                      <GoGift />
                    </i>
                    <span>Posts</span>
                  </li>
                </ul>
                <GroupMembers
                  additionalStyles={styles.groupMembers}
                  {...state.members}
                />
                <div className={styles.searchInput}>
                  <div className={styles.search}>
                    <SearchBar
                      onTagAdd={() => null}
                      onTagRemove={() => null}
                      onLoadSuggestion={() => null}
                      onQueryChange={() => null}
                      onLoadSuggestionCancel={() => null}
                      tags={state.activeTags || []}
                      users={state.activeUsers}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.groupContent}>
              <GroupCover
                group={state.group}
                isEditAllowed={groupQuery.hasAdminRights()}
              />
              <div className={styles.groupPostsListWrapper}>
                {showPromoted && (
                  <PromotedTags
                    onTagClick={(tag) => onClick({ tag: tag.tag })}
                    ref={promotedTagsRef}
                  />
                )}
                {state && state.posts && state.posts.length === 0 && (
                  <div className={styles.noPostsFound}>
                    <div>
                      <div>
                        <h3 className={styles.header}>
                          <span>Ooops</span>, wygląda na to, że nikt nie dodał
                          jeszcze żadnego posta :( Możesz być pierwszy!
                        </h3>
                        <PostCreate groupId={state.group?.id || ''} />
                      </div>
                    </div>
                  </div>
                )}
                {state && state.posts && state.posts.length > 0 && (
                  <>
                    <NavigationTabs>
                      <h2 className={styles.header}>Posts</h2>
                      <ul>
                        <li
                          onClick={() => onClick({ sort: Sorting.latest })}
                          className={cx({
                            [styles.active]:
                              state.postsSorting === Sorting.latest,
                          })}
                        >
                          latest
                        </li>
                        <li
                          onClick={() => onClick({ sort: Sorting.active })}
                          className={cx({
                            [styles.active]:
                              state.postsSorting === Sorting.active,
                          })}
                        >
                          active
                        </li>
                        <li
                          onClick={() => onClick({ sort: Sorting.popular })}
                          className={cx({
                            [styles.active]:
                              state.postsSorting === Sorting.popular,
                          })}
                        >
                          popular
                        </li>
                        <li className={cx(styles.item)}>my</li>
                      </ul>
                    </NavigationTabs>
                    <div className={styles.posts}>
                      <div>
                        <PostCreate
                          additionalStyles={styles.postCreate}
                          groupId={state.group?.id || ''}
                        />
                        <RecentlyAddedPosts
                          fetchTags={findTagsAPI}
                          fetchUsers={findbyUsernameAPI}
                          onPostClick={(id) => onClick({ post: id })}
                          onTagClick={(tag) => {
                            router.push(
                              `/group/${state.group?.slug}/tag/${tag}`
                            )
                          }}
                          onUserClick={onUserClick}
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
                      {state.activePost && (
                        <PostDetails
                          comments={state.comments}
                          user={state.user}
                          activeTags={state.activeTags || []}
                          post={state.activePost}
                        />
                      )}
                      <Pagination
                        {...state.pagination}
                        onClick={(page: number) => {
                          onClick({ page })
                        }}
                        getCurrentUrl={(page: number) => {
                          return generateUrl({ page, fillEmptyValues: true })
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className={cx(styles.userPreviewWrapper, {
                [styles.active]: userPreview,
              })}
            >
              {userPreview && (
                <UserPreview
                  user={userPreview}
                  noUserAvatar={UserAvatarNoImage}
                  onUserPostsClick={(user) => onClick({ user: user.username })}
                  onClose={onCloseUserPreview}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

GroupPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<GroupPageProps> => {
  const { params } = ctx?.query
  const { slug, tag, post, user, sort, page } = parseParams(params as string[])
  const postId = Array.isArray(post) && post.length > 0 ? post[0] : undefined
  const POSTS_LIMIT = 10
  const postsOffset = (parseInt(page[0] || '1', 10) - 1) * POSTS_LIMIT

  await getGroup(slug as string)

  const id = groupQuery.getId() || ''
  return Promise.all([
    new Promise<any>((resolve) => {
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
    getGroupPosts({
      group: id,
      requestedOffset: postsOffset,
      requestedLimit: POSTS_LIMIT,
      tags: tag,
      users: user,
      sort: sort[0] || Sorting.latest,
    }).catch(() => null),
    loadGroupPromotedTags(id).catch(() => null),
  ]).then(([post]) => {
    const group = groupQuery.getValue()

    return {
      namespacesRequired: ['groupPage', 'postCreate'],
      group,
      posts: postsQuery.getValue(),
      promoted: promotedTagsQuery.getValue(),
      comments: post ? postCommentsQuery.getValue() : undefined,
      post,
    }
  })
}

export default GroupPage
