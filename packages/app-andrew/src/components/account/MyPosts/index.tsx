import React, { FC, useState, useEffect, useCallback } from 'react'
// commons
import { UserAvatarNoImage } from 'enums'
// api
import { fetchMyPosts, IMyPostsResponse, IMyPostsRequest } from '@gtms/api-post'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
// state
import { createNewComment } from '@gtms/state-post'
import { openLoginModal } from 'state'
import { IMyPostsState, myPostsState, myPostsState$ } from './state.query'
// components
import { PostsList } from 'components/post/PostsList'
import { MyPostsFilters } from 'components/account/MyPostsFilters'
// ui
import { MockData } from '@gtms/ui/MockData'
import { PostSingle } from '@gtms/ui/PostSingle'
import { SearchBar } from '@gtms/ui/SearchBar'
// styles
import styles from './styles.scss'

export const MyPosts: FC = () => {
  const [data, setData] = useState<
    IMyPostsResponse & {
      isLoading: boolean
      errorOccured: boolean
    }
  >({
    isLoading: true,
    errorOccured: false,
    docs: [],
    total: -1,
    limit: 50,
    offset: 0,
  })
  const [state, setState] = useState<IMyPostsState>(myPostsState())
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [search, setSearch] = useState<{
    groups: { id: string; name: string }[]
    tags: string[]
  }>({
    groups: [],
    tags: [],
  })
  const makeSearch = () => {
    setData((state) => ({
      ...state,
      isLoading: true,
      errorOccured: false,
    }))

    const query: IMyPostsRequest = { limit: data.limit, offset: data.offset }

    if (search.groups.length > 0) {
      query.groups = search.groups.map((r) => r.id)
    }

    fetchMyPosts(query)
      .then((result) => {
        setData({
          isLoading: false,
          errorOccured: false,
          ...result,
        })
      })
      .catch(() =>
        setData((state) => ({
          ...state,
          isLoading: false,
          errorOccured: true,
        }))
      )
  }
  const onFilterGroupClick = useCallback(
    (groupName: string, groupId: string) => {
      const index = search.groups.findIndex((r) => r.id === groupId)

      if (index === -1) {
        setSearch((value) => ({
          ...value,
          groups: [
            ...value.groups,
            {
              id: groupId,
              name: groupName,
            },
          ],
        }))
      } else {
        search.groups.splice(index, 1)
        setSearch({ ...search })
      }
    },
    [search]
  )

  const onFilterGroupRemove = useCallback(
    (groupName: string) => {
      const index = search.groups.findIndex((r) => r.name === groupName)
      if (index === -1) {
        return
      }

      search.groups.splice(index, 1)
      setSearch({
        ...search,
      })
    },
    [search]
  )

  useEffect(() => {
    makeSearch()

    const sub = myPostsState$.subscribe((value) => {
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  useEffect(makeSearch, [search])

  const groupNames = search.groups.map((r) => r.name)

  return (
    <div className={styles.userLastPosts}>
      <span>My last posts:</span>
      {data.isLoading && (
        <div className={styles.noRecords}>
          <MockData />
          <MockData onClick={() => null} text="Loading, please wait" />
          <MockData numberOfElements={4} />
        </div>
      )}
      {!data.isLoading && data.docs.length > 0 && !data.errorOccured && (
        <>
          <SearchBar
            additionalStyles={styles.search}
            onTagAdd={() => null}
            onTagRemove={() => null}
            onLoadSuggestion={() => null}
            onQueryChange={() => null}
            onLoadSuggestionCancel={() => null}
            tags={search.tags}
            users={groupNames}
            onUserRemove={onFilterGroupRemove}
          />
          <div className={styles.filters}>
            <a onClick={() => setShowFilters((value) => !value)}>
              {!showFilters ? 'Show filters' : 'Hide filters'}
            </a>
          </div>
          {showFilters && (
            <MyPostsFilters
              active={groupNames}
              onGroupClick={onFilterGroupClick}
            />
          )}
          <PostsList
            posts={data.docs}
            isAdmin={false}
            renderPost={(post) => (
              <PostSingle
                additionalStyles={styles.post}
                activeTags={[]}
                allowToRespond={false}
                createComment={createNewComment}
                fetchTags={findTagsAPI}
                fetchUsers={findbyUsernameAPI}
                key={`post-${post.id}`}
                noImage={UserAvatarNoImage}
                onClick={() => null}
                onLoginRequest={openLoginModal}
                onTagClick={() => null}
                user={state.user}
                {...post}
              />
            )}
          />
        </>
      )}

      {!data.isLoading && data.docs.length === 0 && !data.errorOccured && (
        <p>No records :( Add your first post!</p>
      )}

      {!data.isLoading && data.errorOccured && (
        <p>Error occured, we can not show your posts now. Sorry!</p>
      )}
    </div>
  )
}
