import React, { FC, useState, useEffect, useRef } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IoIosSearch } from 'react-icons/io'

export const SuggestionTypes = Object.freeze({
  tags: '#',
  users: '@',
})

export const SearchBar: FC<{
  tags?: string[]
  users?: string[]
  query?: string
  suggestions?: string[]
  suggestionsType?: keyof typeof SuggestionTypes
  isLoading?: boolean
  suggestionMinLength?: number
  inlineTagsLimit?: number
  onTagAdd: (tag: string) => void
  onTagRemove: (tag: string) => void
  onLoadSuggestion: (text: string, type: keyof typeof SuggestionTypes) => void
  onLoadSuggestionCancel: () => void
  onQueryChange: (text: string) => void
}> = (params) => {
  const {
    tags = [],
    users = [],
    query = '',
    suggestions = [],
    suggestionsType = SuggestionTypes.tags,
    onTagAdd,
    isLoading,
    onQueryChange,
    onTagRemove,
    onLoadSuggestion,
    onLoadSuggestionCancel,
    inlineTagsLimit = 9999,
    suggestionMinLength = 3,
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
    const first = last.substr(0, 1)
    const result =
      Object.values(SuggestionTypes).includes(first) &&
      last.length > suggestionMinLength
    setShowSuggestions(result)

    result &&
      onLoadSuggestion(last.substr(1), first as keyof typeof SuggestionTypes)
  }, [value])

  return (
    <>
      <div data-testid="searchBar" className={cx(styles.searchBar)}>
        {query === '' && !noInlineTags && (
          <>
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <button
                  className={styles.tag}
                  key={`tag-${tag}-${index}`}
                  type="button"
                  title="click to remove"
                  onClick={() => onTagRemove(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
            {users.length > 0 && (
              <div className={styles.tags}>
                {users.map((user: string) => (
                  <button
                    key={`user-${user}`}
                    type="button"
                    title="click to remove"
                  >
                    @{user}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        <div className={styles.inputWrapper}>
          <i>
            <IoIosSearch />
          </i>
          <input
            ref={inputEl}
            type="text"
            placeholder="search..."
            value={value}
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
          {showSuggestions && (
            <div className={styles.suggestions}>
              <ul>
                {isLoading && <li>loading...</li>}
                {!isLoading &&
                  suggestions.map((tag) => (
                    <li key={`suggestion-tag-${tag}`}>
                      <button
                        className={styles.tag}
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
                        {suggestionsType === SuggestionTypes.tags ? '#' : '@'}
                        {tag}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
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
    </>
  )
}
