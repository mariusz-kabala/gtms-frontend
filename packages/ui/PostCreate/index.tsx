import React, { FC, useRef, useEffect, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'
import { FileStatus } from '@gtms/commons/enums'
import { useDebounce } from '@gtms/commons/hooks/useDebounce'
import { useExpandingArea } from '@gtms/commons/hooks/expandingArea'
import { UserAvatar } from '../UserAvatar'
import { Spinner } from '../Spinner'

export const PostCreate: FC<{
  additionalStyles?: string
  onSubmit: (text: string) => unknown
  onLoadSuggestion: (text: string) => void
  onLoadSuggestionCancel: () => void
  suggestions: string[]
  isLoading?: boolean
  hintMinLenght?: number
  user: {
    name?: string
    surname?: string
    avatar: {
      status: FileStatus
      files: {
        '35x35'?: {
          jpg: string
          webp: string
        }
      }
    }
  }
  noImage: { [key: string]: { jpg: string; webp?: string } }
}> = ({
  additionalStyles,
  onSubmit,
  user,
  noImage,
  onLoadSuggestion,
  suggestions = [],
  isLoading = false,
  hintMinLenght = 3,
}) => {
  const { t } = useTranslation('postCreate')
  const dscRef = useRef<HTMLTextAreaElement | null>(null)
  const [value, setValue] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 500)
  const { ref, handleInput } = useExpandingArea()

  useEffect(() => {
    if (debouncedQuery !== '' && debouncedQuery.length >= hintMinLenght) {
      onLoadSuggestion(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="postCreate"
    >
      <div>
        <div className={styles.text}>
          {isLoading && <Spinner />}
          <div className={styles.avatar}>
            <UserAvatar
              image={
                user.avatar?.status === FileStatus.ready &&
                user.avatar.files['35x35']
                  ? user.avatar.files['35x35']
                  : noImage['35x35']
              }
              additionalStyles={styles.userAvatar}
            />
            <span>{`${user.name || ''} ${user.surname || ''}`.trim()}</span>
          </div>
          <textarea
            data-testid="form-expanding-textarea"
            name={name}
            value={value}
            onInput={handleInput}
            onChange={(event) => {
              setValue(event.target.value)
              const tags = event.target.value.match(/#(\w+)\b/gi)
              if (!Array.isArray(tags)) {
                return
              }

              setQuery(tags[tags.length - 1].substr(1))
            }}
            rows={3}
            placeholder={t('yourMessage')}
            ref={ref as any}
          />
        </div>
        <Button
          onClick={() => {
            if (!dscRef.current) {
              return
            }
            const dsc = dscRef.current.value

            dsc && onSubmit(dsc)
          }}
          type="submit"
          disabled={false}
          additionalStyles={styles.btn}
        >
          {t('send')}
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <ul>
            <li>#woodstock</li>
            <li>#uran</li>
            <li>#czeczeni</li>
          </ul>
        </div>
      )}
    </div>
  )
}
