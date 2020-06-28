import React, { FC, useRef, useEffect, useState, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'
import { useDebounce } from '@gtms/commons/hooks/useDebounce'
import { useExpandingArea } from '@gtms/commons/hooks/expandingArea'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
import { IAccountDetails } from '@gtms/commons/models'
import { UserAvatar } from '../UserAvatar'
import { Spinner } from '../Spinner'
import { IoMdSend } from 'react-icons/io'

export const PostCreate: FC<{
  additionalStyles?: string
  onSubmit: (text: string) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  isLoading?: boolean
  hintMinLenght?: number
  user: IAccountDetails | null
  noImage: { [key: string]: { jpg: string; webp?: string } }
}> = ({
  additionalStyles,
  onSubmit,
  user,
  noImage,
  fetchTags,
  isLoading = false,
  hintMinLenght = 3,
}) => {
  const { t } = useTranslation('postCreate')
  const [value, setValue] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 100)
  const { ref, handleInput } = useExpandingArea(1)
  const tagsSuggestionsAbortController = useRef<AbortController>()
  const [tagsHints, setTagsHints] = useState<{
    isLoading: boolean
    tags: string[]
  }>({
    isLoading: false,
    tags: [],
  })

  const onLoadSuggestion = useCallback(
    (query: string) => {
      setTagsHints({
        isLoading: true,
        tags: [],
      })

      const controller = new AbortController()
      const { signal } = controller

      tagsSuggestionsAbortController.current = controller

      fetchTags(query, signal)
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
                alt={`avatar ${getDisplayName(user as any)}`}
                image={getImage('50x50', user?.avatar, noImage)}
                additionalStyles={styles.userAvatar}
              />
            </div>
          </Link>
        </div>
        <textarea
          className={styles.textarea}
          data-testid="form-expanding-textarea"
          name={name}
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
                '(\\b' + query + '\\b)(?!.*\\b\\1\\b)',
                'i'
              )
              setValue(value.replace(pat, `${tagsHints.tags[0]}`))
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
            const tags = event.target.value.match(/#(\w+)\b/gi)
            if (!Array.isArray(tags)) {
              return
            }

            const lastTag = tags[tags.length - 1]

            if (event.target.value.substr(-lastTag.length) === lastTag) {
              setQuery(lastTag.substr(1))
            }
          }}
          rows={1}
          placeholder={t('yourMessage')}
          ref={ref as any}
        />

        <Button
          onClick={() => {
            onSubmit(value)

            setValue('')
          }}
          type="submit"
          disabled={false}
          additionalStyles={styles.btn}
        >
          {t('send')} <IoMdSend />
        </Button>
      </div>
      {tagsHints.tags.length > 0 && (
        <div className={styles.suggestions}>
          <ul>
            {tagsHints.tags.map((tag) => (
              <li
                onClick={() => {
                  const pat = new RegExp(
                    '(\\b' + query + '\\b)(?!.*\\b\\1\\b)',
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
    </>
  )
}
