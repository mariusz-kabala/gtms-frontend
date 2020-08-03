import React, { FC, useState, useEffect } from 'react'
import { useDebounce } from '@gtms/commons/hooks/useDebounce'
// ui
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import styles from './styles.scss'

export const TagsHeader: FC<{
  tags: string[]
  suggestions?: string[]
  isLoading: boolean
  hintMinLenght?: number
  onLoadSuggestion: (text: string) => void
  onLoadSuggestionCancel: () => void
  onTagAdd: (tag: string) => void
  onTagRemove: (tag: string) => void
}> = ({
  tags,
  isLoading,
  onLoadSuggestion,
  onLoadSuggestionCancel,
  onTagAdd,
  suggestions = [],
  hintMinLenght = 3,
}) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery !== '' && debouncedQuery.length >= hintMinLenght) {
      onLoadSuggestion(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <div data-testid="tags-header" className={styles.wrapper}>
      <h2 className={styles.header}>
        {tags.map((tag) => `#${tag}`).join(', ')}
      </h2>
      {!isInEditMode && <a onClick={() => setIsInEditMode(true)}>+</a>}
      {isInEditMode && (
        <input
          className={styles.inputWrapper}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim().replace('#', ''))}
          onKeyDown={(e) => {
            if ([32, 13].includes(e.keyCode)) {
              const tag = query.trim()

              onTagAdd(tag)
              setQuery('')
              onLoadSuggestionCancel()
            }
          }}
        />
      )}
      <div className={styles.suggestions}>
        {isLoading && query !== '' && (
          <Spinner additionalStyles={styles.spinner} />
        )}
        {!isLoading && suggestions.length > 0 && (
          <TagGroup>
            {suggestions.map((tag) => (
              <Tag
                onClick={() => {
                  onTagAdd(tag)
                  setQuery('')
                  setIsInEditMode(false)
                }}
                key={`suggestion-${tag}`}
                label={tag}
              />
            ))}
          </TagGroup>
        )}
      </div>
    </div>
  )
}
