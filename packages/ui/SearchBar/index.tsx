import React, { FC, useState, useEffect, useRef } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const SearchBar: FC<{
  inlineTagsLimit?: number
  isLoading?: boolean
  onLoadSuggestion: (text: string) => void
  onLoadSuggestionCancel: () => void
  onQueryChange: (text: string) => void
  onTagAdd: (tag: string) => void
  onTagRemove: (tag: string) => void
  placeholder?: string
  query?: string
  suggestionMinLength?: number
  suggestions?: string[]
  tags?: string[]
}> = (params) => {
  const {
    inlineTagsLimit = 9999,
    isLoading,
    onLoadSuggestion,
    onLoadSuggestionCancel,
    onQueryChange,
    onTagAdd,
    onTagRemove,
    placeholder,
    query = '',
    suggestionMinLength = 3,
    suggestions = [],
    tags = [],
  } = params
  const [value, setValue] = useState<string>(query)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const noInlineTags = tags.length > inlineTagsLimit
  const inputEl = useRef(null)

  useEffect(() => {
    !showSuggestions && onLoadSuggestionCancel()
  }, [showSuggestions])

  useEffect(() => {
    if (value === query) {
      return
    }

    const values = value.split(' ')
    const last = values[values.length - 1]
    const result =
      last.substr(0, 1) === '#' && last.length > suggestionMinLength

    setShowSuggestions(result)

    result && onLoadSuggestion(last.substr(1))
  }, [value])

  return (
    <>
      <div data-testid="searchBar" className={cx(styles.searchBar)}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputEl}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (![32, 13].includes(e.keyCode)) {
                return
              }

              const toCheck = value.trim().split(' ')

              toCheck.forEach((w, index) => {
                if (w.substr(0, 1) === '#') {
                  onTagAdd(w.substr(1))
                  toCheck.splice(index, 1)
                }
              })

              const newValue = toCheck.length === 0 ? '' : toCheck.join(' ')

              setValue(newValue)
              onQueryChange(newValue)
              setShowSuggestions(false)
            }}
          />
        </div>
        {showSuggestions && (
          <div className={styles.suggestions}>
            {isLoading && <span>loading...</span>}
            {!isLoading &&
              suggestions.map((tag) => (
                <button
                  className={styles.tag}
                  key={`suggestion-tag-${tag}`}
                  type="button"
                  title="click to add"
                  onClick={() => {
                    const values = value.split(' ')
                    values.pop()

                    setValue(values.join(' ').trim())
                    onTagAdd(tag)
                    setShowSuggestions(false)

                    if (inputEl !== null) {
                      ;(inputEl.current as any).focus()
                    }
                  }}
                >
                  #{tag}
                </button>
              ))}
          </div>
        )}
        {query === '' && !noInlineTags && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <button
                className={styles.tag}
                key={`tag-${tag}`}
                type="button"
                title="click to remove"
                onClick={() => onTagRemove(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
        {(query !== '' || noInlineTags) && (
          <div className={cx(styles.tags, styles.independent)}>
            {tags.map((tag) => (
              <button
                className={styles.tag}
                key={`tag-${tag}`}
                type="button"
                title="click to remove"
                onClick={() => onTagRemove(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
