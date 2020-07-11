import React, { useState, useEffect, useCallback, useRef } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
//commons
import { useInitState } from '@gtms/commons/hooks'
// api
import { fetchTaggedGroups, IRecentGroupsResponse } from '@gtms/api-group'
import { fetchTaggedUsers, ITagUsersResponse } from '@gtms/api-auth'
import { findTagsAPI } from '@gtms/api-tags'
import { findPostsAPI, IFindPostsResponse } from '@gtms/api-post'
// state
import { initGroupsList } from '@gtms/state-group'
import { initUsersList } from '@gtms/state-user'
import { initPostsSearchStore } from '@gtms/state-post'
import {
  ITagPageState,
  tagPageState,
  tagPageState$,
} from 'queries/tagPage.query'
// ui
import { GroupsList } from 'components/tag/GroupsList'
import { UsersList } from 'components/tag/UsersList'
import { PostsList } from 'components/tag/PostsList'
import { TagsHeader } from '@gtms/ui/TagsHeader'
import { FourHundredFour } from '@gtms/ui/FourHundredFour'
// styles
import styles from './styles.scss'

export interface TagPageProps {
  namespacesRequired: readonly string[]
  tags: string[]
  groups: IRecentGroupsResponse | null
  users: ITagUsersResponse | null
  posts: IFindPostsResponse | null
}

const TagPage: NextPage<TagPageProps> = ({ groups, users, tags, posts }) => {
  useInitState(() => {
    groups && initGroupsList(groups)
    users && initUsersList(users)
    posts && initPostsSearchStore(posts)
  })
  const [state, setState] = useState<ITagPageState>(tagPageState())
  const [tagsHints, setTagsHints] = useState<{
    isLoading: boolean
    tags: string[]
  }>({
    isLoading: false,
    tags: [],
  })

  useEffect(() => {
    const sub = tagPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  const router = useRouter()
  const tagsSuggestionsAbortController = useRef<AbortController>()

  const onLoadSuggestion = useCallback(
    (query: string) => {
      setTagsHints({
        isLoading: true,
        tags: [],
      })

      const controller = new AbortController()
      const { signal } = controller

      tagsSuggestionsAbortController.current = controller

      findTagsAPI(query, signal)
        .then((tags: string[]) => {
          setTagsHints({
            isLoading: false,
            tags,
          })
        })
        .catch(() => {
          setTagsHints({
            isLoading: false,
            tags: [],
          })
        })
    },
    [tagsSuggestionsAbortController]
  )

  const onLoadSuggestionCancel = useCallback(() => {
    tagsSuggestionsAbortController.current &&
      tagsSuggestionsAbortController.current.abort()
  }, [tagsSuggestionsAbortController])

  const onTagAdd = useCallback(
    (tag: string) => {
      setTagsHints({
        isLoading: false,
        tags: [],
      })
      router.push(`/tag/${[...tags, tag].join('/')}`)
    },
    [tags]
  )

  const onTagRemove = useCallback(() => {
    // todo UI needs to be implemented
  }, [])

  if (groups === null) {
    return <FourHundredFour />
  }

  return (
    <div data-testid="tag-page" className={styles.wrapper}>
      <TagsHeader
        tags={tags}
        isLoading={tagsHints.isLoading}
        suggestions={tagsHints.tags}
        onLoadSuggestion={onLoadSuggestion}
        onLoadSuggestionCancel={onLoadSuggestionCancel}
        onTagAdd={onTagAdd}
        onTagRemove={onTagRemove}
      />

      <div className={styles.content}>
        <div className={styles.column}>
          <GroupsList
            records={state.groups.docs}
            isLoading={state.groups.isLoading}
          />
        </div>

        <div className={styles.column}>
          <UsersList
            records={state.users.docs}
            isLoading={state.users.isLoading}
          />
        </div>

        <div className={styles.column}>
          {state.posts && (
            <PostsList
              user={null}
              records={state.posts.docs}
              isLoading={state.posts.isLoading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

TagPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<TagPageProps> => {
  const tags = (ctx?.query.tags as string[])
    .map((tag) => (tag !== '' ? tag.trim() : null))
    .filter((tag) => tag !== null)
    .slice(0, 9) as string[]

  if (tags.length > 0) {
    return Promise.all([
      fetchTaggedGroups(tags, 0, 25).catch(() => null),
      fetchTaggedUsers(tags, 0, 25).catch(() => null),
      findPostsAPI({ tags }, 0, 25).catch(() => null),
    ]).then((data) => {
      const [groups, users, posts] = data

      return {
        namespacesRequired: ['tagPage'],
        groups,
        users,
        tags,
        posts,
      }
    })
  }

  return {
    namespacesRequired: ['tagPage'],
    tags,
    groups: null,
    users: null,
    posts: null,
  }
}

export default TagPage
