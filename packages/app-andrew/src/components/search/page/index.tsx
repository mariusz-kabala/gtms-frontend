import React, { FC, useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { IPost } from '@gtms/commons/models'
import { generateSearchURL } from 'helpers/url'
import { UserAvatarNoImage } from 'enums'
// state
import { openLoginModal } from 'state'
// api
import { findTagsAPI } from '@gtms/api-tags'
import { findPostsAPI } from '@gtms/api-post'
// components
import { PostsList } from 'components/post/PostsList'
// ui
import { MockData } from '@gtms/ui/MockData'
import { Picture } from '@gtms/ui/Picture'
import { SearchBar } from '@gtms/ui/SearchBar'
import { PostSingle } from '@gtms/ui/PostSingle'
// styles
import styles from './styles.scss'

export const SearchPage: FC<{}> = () => {
  const { t, i18n } = useTranslation('searchPage')
  const [state, setState] = useState<{
    tags: string[]
    users: string[]
    isLoading: boolean
    isError: boolean
    suggestions: {
      isLoading: boolean
      records: string[]
    }
    data: {
      docs: IPost[]
      limit: number
      offset: number
      total: number
    }
  }>({
    tags: [],
    users: [],
    isLoading: false,
    isError: false,
    suggestions: {
      isLoading: false,
      records: [],
    },
    data: {
      docs: [],
      limit: 50,
      offset: 0,
      total: 0,
    },
  })

  useEffect(() => {
    const hasTags = state.tags.length > 0
    const hasUsers = state.users.length > 0
    console.log('use effect', state.tags)
    window.history.pushState(
      null,
      'Search',
      generateSearchURL(`/${i18n.language}/search`, {
        tag: state.tags,
        user: state.users,
      })
    )

    if (!hasTags && !hasUsers) {
      setState((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        data: {
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
      isLoading: true,
      isError: false,
    }))

    findPostsAPI(
      {
        tags: state.tags,
      },
      0,
      50,
      true
    ).then((response) => {
      setState((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        data: response,
      }))
    })
  }, [state.tags, state.users])

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
      tags: [...state.tags, tag],
    }))
  }, [])

  const onTagRemove = useCallback(
    (tag: string) => {
      const tags = state.tags
      const index = state.tags.indexOf(tag)

      if (index > -1) {
        tags.splice(index, 1)

        setState((state) => ({
          ...state,
          tags: [...tags],
        }))
      }
    },
    [state.tags]
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
            tags={state.tags}
          />
        </div>
        {state.isLoading && (
          <div className={styles.noRecords}>
            <MockData theme="dark" />
            <MockData
              theme="dark"
              onClick={() => null}
              text="Searching, please wait..."
            />
            <MockData theme="dark" numberOfElements={4} />
          </div>
        )}
        {!state.isLoading && !state.isError && (
          <PostsList
            posts={state.data.docs}
            isAdmin={false}
            renderPost={(post) => (
              <PostSingle
                key={`post-${post.id}`}
                allowToRespond={false}
                onClick={() => null}
                onTagClick={() => null}
                onUserClick={() => null}
                fetchTags={findTagsAPI}
                fetchUsers={() => Promise.resolve([])} //{findbyUsernameAPI}
                createComment={() => null}
                user={null}
                {...post}
                noImage={UserAvatarNoImage}
                onLoginRequest={openLoginModal}
                activeTags={state.tags}
              />
            )}
          />
        )}
        {!state.isLoading && state.isError && (
          <div>ERROR STATE, SHOW SOMETHING HERE</div>
        )}
      </div>
    </div>
  )
}
