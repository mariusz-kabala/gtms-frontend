import React, { useState, useEffect, useCallback, useRef } from 'react'
import { fetchTaggedGroups, IRecentGroupsResponse } from '@gtms/api-group'
import { initGroupsList } from '@gtms/state-group'
import { fetchTaggedUsers, ITagUsersResponse } from '@gtms/api-auth'
import { initUsersList } from '@gtms/state-user'
import {
  ITagPageState,
  tagPageState,
  tagPageState$,
} from 'queries/tagPage.query'
import { useInitState } from '@gtms/commons/hooks'
import { FourHundredFour } from '@gtms/ui/FourHundredFour'
import { NextPage, NextPageContext } from 'next'
import { GroupsList } from 'components/tag/GroupsList'
import { UsersList } from 'components/tag/UsersList'
import { TagsHeader } from '@gtms/ui/TagsHeader'
import { findTagsAPI } from '@gtms/api-tags'
import { useRouter } from 'next/router'

export interface TagPageProps {
  namespacesRequired: readonly string[]
  tags: string[]
  groups: IRecentGroupsResponse | null
  users: ITagUsersResponse | null
}

const TagPage: NextPage<TagPageProps> = ({ groups, users, tags }) => {
  useInitState(() => {
    groups && initGroupsList(groups)
    users && initUsersList(users)
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
      router.push(`/tag/${[...tags, tag].join(',')}`)
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
    <div data-testid="tag-page">
      <TagsHeader
        tags={tags}
        isLoading={tagsHints.isLoading}
        suggestions={tagsHints.tags}
        onLoadSuggestion={onLoadSuggestion}
        onLoadSuggestionCancel={onLoadSuggestionCancel}
        onTagAdd={onTagAdd}
        onTagRemove={onTagRemove}
      />
      <GroupsList
        records={state.groups.docs}
        isLoading={state.groups.isLoading}
      />
      <UsersList records={state.users.docs} isLoading={state.users.isLoading} />
    </div>
  )
}

TagPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<TagPageProps> => {
  const { name } = ctx?.query
  const tags = (name as string)
    .split(',')
    .map((tag) => (tag !== '' ? tag.trim() : null))
    .filter((tag) => tag !== null)
    .slice(0, 9) as string[]

  if (tags.length > 0) {
    return Promise.all([
      fetchTaggedGroups(tags, 0, 25),
      fetchTaggedUsers(tags, 0, 25),
    ]).then((data) => {
      const [groups, users] = data

      return {
        namespacesRequired: ['tagPage'],
        groups,
        users,
        tags,
      }
    })
  }

  return {
    namespacesRequired: ['tagPage'],
    tags,
    groups: null,
    users: null,
  }
}

export default TagPage
