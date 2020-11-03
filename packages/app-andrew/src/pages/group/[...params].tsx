import React, { useState, useEffect, useCallback, useRef } from 'react'
import cx from 'classnames'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { UserAvatarNoImage } from 'enums'
import { getImage, onlyUnique } from '@gtms/commons/helpers'
import { useInitState } from '@gtms/commons/hooks'
import { IPost } from '@gtms/commons/models'
// api
import { fetchPost, Sorting } from '@gtms/api-post'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
// components
import { GroupCover } from 'components/group/GroupCover'
import { GroupNoAccess } from 'components/group/GroupNoAccess'
import { GroupNotFound } from 'components/group/GroupNotFound'
import { PostCreate } from 'components/post/PostCreate'
import { PostDetails } from 'components/post/PostDetails'
import { PromotedTags } from 'components/group/PromotedTags'
import { GroupSidebar } from 'components/group/Sidebar'
import { GroupSidebarContent } from 'components/group/Sidebar/content'
import { PostsList } from 'components/post/PostsList'
// state
import {
  IGroupPageState,
  groupPageState,
  groupPageState$,
} from 'queries/groupPage.query'
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
import { changePageBackground, changePageBackgroundImage } from 'state'
// ui
import { IoMdGrid } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { Pagination } from '@gtms/ui/Pagination'
import { PostSingle } from '@gtms/ui/PostSingle'
import { SearchBar } from '@gtms/ui/SearchBar'
import { Spinner } from '@gtms/ui/Spinner'
// styles
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
      if (group.group?.bgType === 'file') {
        changePageBackgroundImage(getImage('origin', group.group.bg).jpg)
      } else {
        changePageBackground(group.group?.bgType)
      }
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

const GroupPage: NextPage<GroupPageProps> = (props) => {
  useInitState(getInitData(props))

  const router = useRouter()
  const [state, setState] = useState<IGroupPageState>(groupPageState())
  const [showPromoted, setShowPromoted] = useState<boolean>(true)
  const [temp, setTemp] = useState<boolean>(false)
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
        url += `/user/${
          Array.isArray(user) ? user.filter(onlyUnique).join('/') : user
        }`
      }

      if (sort) {
        url += `/sort/${sort}`
      }

      if (
        (typeof tag === 'string' && tag !== '') ||
        (Array.isArray(tag) && tag.length > 0)
      ) {
        url += `/tag/${
          Array.isArray(tag) ? tag.filter(onlyUnique).join('/') : tag
        }`
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

  const onPostClick = useCallback((id: string) => onClick({ post: id }), [
    onClick,
  ])
  const onTagClick = useCallback((tag: string) => onClick({ tag }), [onClick])

  const promotedTagsRef = useRef<HTMLDivElement>(null)

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

      {/* <GroupCover
        group={state.group}
        isEditAllowed={groupQuery.hasAdminRights()}
      /> */}

      {state.group && (
        <div className={styles.wrapper}>
          <GroupSidebar>
            <Button
              onClick={() => {setShowPromoted((value) => !value)}}
              additionalStyles={cx(styles.tagsbutton, {
                [styles.active]: showPromoted,
              })}
            >
              <i>
                <IoMdGrid />
              </i>
              <span>Tags</span>
            </Button>               
            <GroupSidebarContent />
          </GroupSidebar>          
          <div className={styles.content}>
            <SearchBar
              additionalStyles={styles.search}
              onTagAdd={() => null}
              onTagRemove={() => null}
              onLoadSuggestion={() => null}
              onQueryChange={() => null}
              onLoadSuggestionCancel={() => null}
              tags={state.activeTags || []}
              users={state.activeUsers}
            />            
            <div className={styles.leftRight}>
                {showPromoted && (
                  <div onClick={() => setTemp(!temp)}>
                    <PromotedTags
                      additionalStyles={styles.tags}
                      onTagClick={(tag) => onClick({ tag: tag.tag })}
                      ref={promotedTagsRef}
                    />
                  </div>
                )}
              {
                temp && (
                  <div className={cx(styles.column, styles.right)}>
                    {state && state.posts && state.posts.length === 0 && (
                      <div className={styles.noPostsFound}>
                        <div>
                          <div>
                            <h3 className={styles.header}>
                              <span>Ooops</span>, wygląda na to, że nikt nie dodał
                              jeszcze żadnego posta... Możesz być pierwszy!
                            </h3>
                            <PostCreate groupId={state.group?.id || ''} />
                          </div>
                        </div>
                      </div>
                    )}
                    {state && state.posts && state.posts.length > 0 && (
                      <>
                        <div className={styles.posts}>
                          <div>
                            {' '}
                            {/* this div is needed for aligning with display flex */}
                            <NavigationTabs>
                              <h2 className={cx(styles.header, styles.active)}>
                                <i>
                                  <IoMdGrid />
                                </i>
                                Tags
                              </h2>
                              <h2 className={styles.header}>
                                <i>
                                  <IoMdGrid />
                                </i>
                                Users
                              </h2>
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
                            <PostCreate
                              additionalStyles={styles.postCreate}
                              groupId={state.group?.id || ''}
                            />
                            <PostsList
                              posts={state.posts}
                              onUserPostsClick={(user) =>
                                onClick({ user: user.username })
                              }
                              isAdmin={groupQuery.hasAdminRights()}
                              renderPost={(post) => (
                                <PostSingle
                                  key={`post-${post.id}`}
                                  allowToRespond={post.id !== state.activePost?.id}
                                  onClick={onPostClick}
                                  onTagClick={onTagClick}
                                  fetchTags={findTagsAPI}
                                  fetchUsers={findbyUsernameAPI}
                                  createComment={createNewComment}
                                  user={state.user}
                                  additionalStyles={cx(styles.post, {
                                    [styles.active]: state.activePost?.id === post.id,
                                  })}
                                  {...post}
                                  noImage={UserAvatarNoImage}
                                  onLoginRequest={openLoginModal}
                                  activeTags={state.activeTags || []}
                                />
                              )}
                            />
                            <Pagination
                              additionalStyles={styles.pagination}
                              {...state.pagination}
                              onClick={(page: number) => {
                                onClick({ page })
                              }}
                              getCurrentUrl={(page: number) => {
                                return generateUrl({ page, fillEmptyValues: true })
                              }}
                            />
                          </div>
                          {state.activePost && (
                            <PostDetails
                              additionalStyles={stFyles.postDetails}
                              comments={state.comments}
                              user={state.user}
                              activeTags={state.activeTags || []}
                              post={state.activePost}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div> 
                )
              }             
            </div>
          </div>
        </div>
      )}
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
