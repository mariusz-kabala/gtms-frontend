import React, { FC, useState, useCallback } from 'react'
import { TagsBar } from '@gtms/ui/TagsBar'
import { findTagsAPI } from '@gtms/api-tags'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import styles from './styles.scss'

export const TagsSettings: FC<{ tags: string[] }> = (props) => {
  const [tags, setTags] = useState<string[]>(props.tags)
  const [promoted] = useState<any[]>([])
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false)
  const [tagsHints, setTagsHints] = useState<{
    isLoading: boolean
    tags: string[]
  }>({
    isLoading: false,
    tags: [],
  })
  const onLoadTagsHints = useCallback((query: string) => {
    setTagsHints({
      isLoading: true,
      tags: [],
    })

    findTagsAPI(query)
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
  }, [])
  const onTagAdd = useCallback(
    (tag: string) => {
      if (tags.indexOf(tag) === -1) {
        setTags([...tags, tag])
      }
    },
    [tags]
  )
  const onTagRemove = useCallback(
    (tag: string) => {
      const index = tags.indexOf(tag)

      if (index > -1) {
        tags.splice(index, 1)
        setTags([...tags])
      }
    },
    [tags]
  )

  return (
    <div data-testid="group-settings-tags" className={styles.container}>
      <section>
        <h3 className={styles.header}>
          Tags{' '}
          <button
            onClick={() => setIsInEditMode(!isInEditMode)}
            className={styles.btn}
          >
            {isInEditMode ? 'close' : 'edit'}
          </button>
        </h3>

        {!isInEditMode && (
          <>
            <p>Click on tag to add to promoted</p>
            <TagGroup>
              {tags.map((tag) => (
                <Tag label={tag} key={`tag-${tag}`} />
              ))}
            </TagGroup>
          </>
        )}
        {isInEditMode && (
          <TagsBar
            editMode={true}
            tags={tags}
            isSaving={false}
            isLoading={tagsHints.isLoading}
            suggestions={tagsHints.tags}
            onLoadSuggestion={onLoadTagsHints}
            onLoadSuggestionCancel={() => null}
            onTagAdd={onTagAdd}
            onTagRemove={onTagRemove}
            onSave={() => {
              setIsInEditMode(false)
              return Promise.resolve()
            }}
          />
        )}
      </section>
      <section>
        <h3 className={styles.header}>Promoted tags</h3>
        {promoted.length === 0 && (
          <p>Group does not have any promoted tags. You should add some</p>
        )}
      </section>
    </div>
  )
}
