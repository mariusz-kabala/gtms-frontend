import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
// commons
import { useTranslation } from '@gtms/commons/i18n'
import { useDebounce } from '@gtms/commons/hooks/useDebounce'
import { useExpandingArea } from '@gtms/commons/hooks/expandingArea'
import { getImage, getDisplayName } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
import { Link } from '@gtms/commons/i18n'
import { IAccountDetails, IUser } from '@gtms/commons/models'
// ui
import { Button } from '../Button'
import { UserAvatar } from '../UserAvatar'
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { UploadFile } from '../UploadFile'
import { IoMdSend } from 'react-icons/io'

export const PostCreate: FC<{
  additionalStyles?: string
  onSubmit: (text: string) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  fetchUsers: (query: string, signal: AbortSignal) => Promise<string[]>
  fetchSuggestedTags?: (tags: string[]) => Promise<string[]>
  isLoading?: boolean
  hintMinLenght?: number
  user: IAccountDetails | null
  noImage: { [key: string]: IImage }
  onLoginRequest?: () => unknown
}> = ({
  additionalStyles,
  onSubmit,
  user,
  noImage,
  fetchTags,
  fetchUsers,
  fetchSuggestedTags,
  onLoginRequest,
  isLoading = false,
  hintMinLenght = 3,
}) => {
  const { t } = useTranslation('postCreate')
  const [value, setValue] = useState<string>('')
  const [query, setQuery] = useState<{ type: 'tag' | 'user'; value: string }>({
    value: '',
    type: 'tag',
  })
  const [isFileUploadAreaVisible, setIsFileUploadAreaVisible] = useState<
    boolean
  >(false)
  const [suggestedTags, setSuggestedTags] = useState<{
    isLoading: boolean
    tags: string[]
  }>({
    isLoading: false,
    tags: [],
  })
  const debouncedQuery = useDebounce(query.value, 100)
  const { ref, handleInput } = useExpandingArea(1)
  const tagsSuggestionsAbortController = useRef<AbortController>()
  const [tagsHints, setTagsHints] = useState<{
    isLoading: boolean
    tags: string[] | IUser[]
  }>({
    isLoading: false,
    tags: [],
  })
  const suggestionsTimeout = useRef<NodeJS.Timeout>()

  const loadSuggestedTags = useCallback(() => {
    if (!fetchSuggestedTags) {
      return
    }
    const tags = value.match(/#(\w+)\b/gi)

    if (!Array.isArray(tags)) {
      return
    }

    setSuggestedTags({
      isLoading: true,
      tags: [],
    })

    fetchSuggestedTags(tags.map((tag) => tag.substr(1)))
      .then((suggested) => {
        setSuggestedTags({
          isLoading: false,
          tags: suggested,
        })
      })
      .catch(() =>
        setSuggestedTags({
          isLoading: false,
          tags: [],
        })
      )
  }, [value])

  const addSuggestedTag = useCallback((tag: string) => {
    setValue((value) => `${value} #${tag}`)
    setSuggestedTags((state) => {
      const suggested = state.tags
      const index = suggested.indexOf(tag)

      if (index > -1) {
        suggested.splice(index, 1)
      }

      return {
        isLoading: false,
        tags: [...suggested],
      }
    })
  }, [])

  const addAllSuggestedTags = useCallback(() => {
    setValue(
      (value) =>
        `${value} ${suggestedTags.tags.map((tag) => `#${tag}`).join(' ')}`
    )
    setSuggestedTags({
      isLoading: false,
      tags: [],
    })
  }, [suggestedTags])

  const onLoadSuggestion = useCallback(
    (queryToFind: string) => {
      setTagsHints({
        isLoading: true,
        tags: [],
      })

      const controller = new AbortController()
      const { signal } = controller

      tagsSuggestionsAbortController.current = controller

      const method = query.type === 'user' ? fetchUsers : fetchTags

      method(queryToFind, signal)
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
    [tagsSuggestionsAbortController, query]
  )

  const onLoadSuggestionCancel = useCallback(() => {
    tagsSuggestionsAbortController.current &&
      tagsSuggestionsAbortController.current.abort()
  }, [tagsSuggestionsAbortController])

  useEffect(() => {
    if (debouncedQuery !== '' && debouncedQuery.length >= hintMinLenght) {
      onLoadSuggestionCancel()
      onLoadSuggestion(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <>
      <div
        className={cx(styles.wrapper, additionalStyles)}
        data-testid="postCreate"
      >
        {isLoading && <Spinner />}
        <div className={styles.user}>
          <Link href={`/user/${user?.id}`}>
            <div>
              <UserAvatar
                image={getImage('50x50', user?.avatar, noImage)}
                additionalStyles={styles.userAvatar}
              />
            </div>
          </Link>
        </div>
        <textarea
          onFocus={() => {
            if (!user && onLoginRequest) {
              onLoginRequest()
              return
            }

            setIsFileUploadAreaVisible(true)
          }}
          className={styles.textarea}
          data-testid="form-expanding-textarea"
          value={value}
          onInput={handleInput}
          onKeyDown={(e) => {
            if (
              e.keyCode === 9 &&
              !tagsHints.isLoading &&
              tagsHints.tags.length > 0
            ) {
              e.preventDefault()
              const pat = new RegExp(
                '(\\b' + query.value + '\\b)(?!.*\\b\\1\\b)',
                'i'
              )
              const replaced =
                query.type === 'tag'
                  ? `${tagsHints.tags[0]}`
                  : `${(tagsHints.tags[0] as IUser).username}`
              setValue(value.replace(pat, replaced))
              setTagsHints({
                isLoading: false,
                tags: [],
              })
            }

            if ([32, 13, 27].includes(e.keyCode)) {
              // esc
              setTagsHints({
                isLoading: false,
                tags: [],
              })
            }
          }}
          onChange={(event) => {
            setValue(event.target.value)

            if (typeof suggestionsTimeout.current !== 'undefined') {
              clearTimeout(suggestionsTimeout.current)
            }

            if (typeof fetchSuggestedTags === 'function') {
              suggestionsTimeout.current = setTimeout(loadSuggestedTags, 750)
            }

            const tags = event.target.value.match(/[#@](\w+)\b/gi)
            if (!Array.isArray(tags)) {
              return
            }

            const lastTag = tags[tags.length - 1]

            if (event.target.value.substr(-lastTag.length) === lastTag) {
              setQuery({
                type: lastTag.charAt(0) === '@' ? 'user' : 'tag',
                value: lastTag.substr(1),
              })
            }
          }}
          rows={1}
          placeholder={t('yourMessage')}
          ref={ref as any}
        />
        <Button
          additionalStyles={styles.btn}
          disabled={false}
          onClick={() => {
            if (!user) {
              if (onLoginRequest) {
                onLoginRequest()
              }

              return
            }
            onSubmit(value)
            setValue('')
          }}
          type="submit"
        >
          {t('send')}{' '}
          <i>
            <IoMdSend />
          </i>
        </Button>
      </div>
      {tagsHints.tags.length > 0 && query.type === 'tag' && (
        <div className={styles.suggestions}>
          <ul>
            {(tagsHints.tags as string[]).map((tag: string) => (
              <li
                onClick={() => {
                  const pat = new RegExp(
                    '(\\b' + query.value + '\\b)(?!.*\\b\\1\\b)',
                    'i'
                  )
                  setValue(value.replace(pat, `${tag}`))
                  setTagsHints({
                    isLoading: false,
                    tags: [],
                  })
                  ref.current?.focus()
                }}
                key={`suggested-${tag}`}
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      )}
      {tagsHints.tags.length > 0 && query.type === 'user' && (
        <div className={styles.suggestions}>
          <ul>
            {(tagsHints.tags as IUser[]).map((tag: IUser) => (
              <li
                onClick={() => {
                  const pat = new RegExp(
                    '(\\b' + query.value + '\\b)(?!.*\\b\\1\\b)',
                    'i'
                  )
                  setValue(value.replace(pat, `${tag.username}`))
                  setTagsHints({
                    isLoading: false,
                    tags: [],
                  })
                  ref.current?.focus()
                }}
                key={`suggested-user-${tag.id}`}
              >
                {getDisplayName(tag)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!suggestedTags.isLoading && suggestedTags.tags.length > 0 && (
        <div>
          <h3>Suggested tags:</h3>
          <TagGroup>
            {suggestedTags.tags.map((tag) => (
              <Tag
                onClick={() => addSuggestedTag(tag)}
                label={tag}
                key={`suggested-tag-${tag}`}
              />
            ))}
            <button onClick={addAllSuggestedTags}>Add all suggestions</button>
          </TagGroup>
        </div>
      )}
      {isFileUploadAreaVisible && (
        <div>
          <UploadFile
            placeholder="uploadPostImages"
            onDrop={() => null}
            isLoading={false}
            isError={false}
          />
        </div>
      )}
    </>
  )
}
