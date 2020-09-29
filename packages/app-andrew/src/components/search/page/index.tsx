import React, { FC, useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { IPost, IUser, IGroup } from '@gtms/commons/models'
import { generateSearchURL } from 'helpers/url'
// api
import { findTagsAPI } from '@gtms/api-tags'
import { findPostsAPI } from '@gtms/api-post'
// components
import { PostResults } from 
// ui
import { Picture } from '@gtms/ui/Picture'
import { SearchBar } from '@gtms/ui/SearchBar'
// styles
import styles from './styles.scss'

enum Tabs {
  posts,
  groups,
  users,
}

export const SearchPage: FC<{}> = () => {
  const { t, i18n } = useTranslation('searchPage')
  const [state, setState] = useState<{
    search: {
      tags: string[]
      users: string[]
    }
    suggestions: {
      isLoading: boolean
      records: string[]
    }
    posts: {
      isLoading: boolean
      isError: boolean
      docs: IPost[]
      limit: number
      offset: number
      total: number
    }
    groups: {
      isLoading: boolean
      isError: boolean
      docs: IGroup[]
      limit: number
      offset: number
      total: number
    }
    users: {
      isLoading: boolean
      isError: boolean
      docs: IUser[]
      limit: number
      offset: number
      total: number
    }
  }>({
    search: {
      tags: [],
      users: [],
    },
    suggestions: {
      isLoading: false,
      records: [],
    },
    posts: {
      isLoading: false,
      isError: false,
      docs: [],
      limit: 50,
      offset: 0,
      total: 0,
    },
    groups: {
      isLoading: false,
      isError: false,
      docs: [],
      limit: 50,
      offset: 0,
      total: 0,
    },
    users: {
      isLoading: false,
      isError: false,
      docs: [],
      limit: 50,
      offset: 0,
      total: 0,
    },
  })

  useEffect(() => {
    const hasTags = state.search.tags.length > 0
    const hasUsers = state.search.users.length > 0

    window.history.pushState(
      null,
      'Search',
      generateSearchURL(`/${i18n.language}/search`, {
        tag: state.search.tags,
        user: state.search.users,
      })
    )

    if (!hasTags && !hasUsers) {
      setState((state) => ({
        ...state,
        posts: {
          isLoading: false,
          isError: false,
          docs: [],
          limit: 50,
          offset: 0,
          total: 0,
        },
        groups: {
          isLoading: false,
          isError: false,
          docs: [],
          limit: 50,
          offset: 0,
          total: 0,
        },
        users: {
          isLoading: false,
          isError: false,
          docs: [],
          limit: 50,
          offset: 0,
          total: 0,
        },
      }))
      return
    }

    setState((state) => ({
      ...state,
      posts: {
        isLoading: true,
        isError: false,
        docs: [],
        limit: 50,
        offset: 0,
        total: 0,
      },
      groups: {
        isLoading: true,
        isError: false,
        docs: [],
        limit: 50,
        offset: 0,
        total: 0,
      },
      users: {
        isLoading: true,
        isError: false,
        docs: [],
        limit: 50,
        offset: 0,
        total: 0,
      },
    }))

    findPostsAPI(
      {
        tags: state.search.tags,
      },
      0,
      50,
      true
    ).then((response) => {
      setState((state) => ({
        ...state,
        posts: {
          isLoading: false,
          isError: false,
          ...response,
        },
      }))
    })
  }, [state.search])

  const tagsSuggestionsAbortController = useRef<AbortController>()
  const onFindTags = useCallback((text: string) => {
    setState((state) => ({
      ...state,
      suggestions: {
        isLoading: true,
        records: [],
      },
    }))

    const controller = new AbortController()
    const { signal } = controller

    tagsSuggestionsAbortController.current = controller

    findTagsAPI(text, signal).then((records: string[]) => {
      setState((state) => ({
        ...state,
        suggestions: {
          isLoading: false,
          records,
        },
      }))
    })
  }, [])

  const onTagAdd = useCallback((tag: string) => {
    setState((state) => ({
      ...state,
      search: {
        ...state.search,
        tags: [...state.search.tags, tag],
      },
    }))
  }, [])

  const onTagRemove = useCallback(
    (tag: string) => {
      const tags = state.search.tags
      const index = state.search.tags.indexOf(tag)

      if (index > -1) {
        tags.splice(index, 1)

        setState((state) => ({
          ...state,
          search: {
            ...state.search,
            tags: [...tags],
          },
        }))
      }
    },
    [state.search.tags]
  )

  const onLoadSuggestionCancel = useCallback(() => {
    tagsSuggestionsAbortController.current &&
      tagsSuggestionsAbortController.current.abort()
  }, [tagsSuggestionsAbortController])

  return (
    <div className={styles.pageWrapper} data-testid="search-page">
      <div className={styles.wrapper}>
        {/* @todo add text header instead of text on the image below */}
        <div className={styles.coverImage}>
          <Picture
            additionalStyles={styles.coverImage}
            jpg={'/images/white-theme/search-cover-image.png'}
          />
          <h2 className={styles.header}>
            {t('searchHeader1')}
            <span>{t('searchHeader2')}</span>
          </h2>
        </div>
        <div className={styles.searchBarWrapper}>
          <SearchBar
            onTagAdd={onTagAdd}
            onTagRemove={onTagRemove}
            suggestions={state.suggestions.records}
            isLoading={state.suggestions.isLoading}
            onLoadSuggestion={onFindTags}
            onQueryChange={(text) => {
              console.log('onQueryChange', text)
            }}
            onLoadSuggestionCancel={onLoadSuggestionCancel}
            tags={state.search.tags}
          />
        </div>
        <div className={styles.tabs}>
          <ul>
            <li className={styles.active}>
              <a>
                Posts <span>({state.posts.total})</span>
              </a>
            </li>
            <li>
              <a>Groups</a>
            </li>
            <li>
              <a>Users</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}
