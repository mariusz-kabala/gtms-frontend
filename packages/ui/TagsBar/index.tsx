import React, { FC, useState, useEffect, useRef } from 'react'
import { Spinner } from '../Spinner'
import styles from './styles.scss'
import cx from 'classnames'

export const TagsBar: FC<{
  tags: string[]
  suggestions?: string[]
  editMode?: boolean
  isLoading?: boolean
  isSaving?: boolean
}> = ({
  tags,
  editMode = false,
  isLoading = false,
  isSaving = false,
  suggestions = [],
}) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(editMode)
  const [showSuggestions] = useState<boolean>(suggestions.length > 0)

  return (
    <div className={styles.tagsBar}>
      {isInEditMode && (
        <>
          <div className={styles.inputWrapper}>
            <input type="text" />
            <button type="submit" disabled={isSaving}>
              save
            </button>
            {isSaving && (
              <div className={styles.loader}>
                <Spinner />
              </div>
            )}
            {showSuggestions && !isLoading && (
              <div className={styles.suggestions}>
                {suggestions.map((tag) => (
                  <button
                    className={styles.tag}
                    key={`suggestion-tag-${tag}`}
                    type="button"
                    title="click to add"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className={styles.suggestions}>
                <div className={styles.loader}>
                  <Spinner />
                </div>
              </div>
            )}
          </div>
          <div className={styles.tagsList}>
            {tags.map((tag) => (
              <button
                className={styles.tag}
                key={`tag-${tag}`}
                type="button"
                title="click to remove"
                onClick={() => null}
              >
                #{tag}
              </button>
            ))}
          </div>
        </>
      )}
      {!isInEditMode && tags.length === 0 && (
        <p className={styles.noRecords}>
          No tags have been added{' '}
          <a
            className={styles.actionButton}
            onClick={() => setIsInEditMode(true)}
          >
            Click here to add a new tag
          </a>
        </p>
      )}
      {!isInEditMode && tags.length > 0 && (
        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <button className={styles.tag} key={`tag-${tag}`} type="button">
              #{tag}
            </button>
          ))}
          <a
            className={styles.actionButton}
            onClick={() => setIsInEditMode(true)}
          >
            Click here to edit
          </a>
        </div>
      )}
    </div>
  )
}
