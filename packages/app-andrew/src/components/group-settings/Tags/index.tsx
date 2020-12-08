import React, { FC, useState, useCallback } from 'react'
import { TagsBar } from '@gtms/ui/TagsBar'
import { findTagsAPI } from '@gtms/api-tags'
import {
  loadGroupPromotedTags,
  promotedTagsQuery,
  deletePromotedTag,
} from '@gtms/state-tag'
import { IPromotedTag } from '@gtms/commons/models'
// ui
import { AiOutlineForm } from 'react-icons/ai'
import { Modal } from '@gtms/ui/Modal'
import { PromotedTagsForm } from '../PromotedTagForm'
import { PromotedTags } from './PromotedTags'
import { TagGroup } from '@gtms/ui/TagGroup'
import { Tag } from '@gtms/ui/Tag'
import styles from './styles.scss'

export const TagsSettings: FC<{ id: string; tags: string[] }> = (props) => {
  const [tags, setTags] = useState<string[]>(props.tags)
  const [promotedTagEditor, setPromotedTagEditor] = useState<{
    description?: string
    id?: string
    isOpen: boolean
    tag: string
  }>({
    isOpen: false,
    tag: '',
  })
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
    <div data-testid="group-settings-tags" className={styles.wrapper}>
      <div>
        <h3 className={styles.header}>
          {/* @todo add translation here */}
          Tags{' '}
          <button
            onClick={() => setIsInEditMode(!isInEditMode)}
            className={styles.btn}
          >
            <i>
              <AiOutlineForm />
            </i>
            {isInEditMode ? 'close' : 'edit'}
          </button>
        </h3>
        {!isInEditMode && (
          <>
            {/* @todo add translation here */}
            <p>Click on tag to add to promoted</p>
            {tags.length > 0 && (
              <TagGroup>
                {tags.map((tag) => (
                  <Tag
                    onClick={() => {
                      if (
                        promotedTagsQuery.hasEntity(
                          (promoted: IPromotedTag) => promoted.tag === tag
                        )
                      ) {
                        // add a message here later
                        return
                      }

                      setPromotedTagEditor({
                        isOpen: true,
                        tag,
                      })
                    }}
                    label={tag}
                    key={`tag-${tag}`}
                  />
                ))}
              </TagGroup>
            )}
            {tags.length === 0 && (
              <div className={styles.noRecords}>
                <p>
                  {/* @todo add translation */}
                  no promoted tags yet, create some
                </p>
              </div>
            )}
          </>
        )}
        {isInEditMode && (
          <TagsBar
            editMode={true}
            isLoading={tagsHints.isLoading}
            isSaving={false}
            onLoadSuggestion={onLoadTagsHints}
            onLoadSuggestionCancel={() => null}
            onSave={() => {
              setIsInEditMode(false)
              return Promise.resolve()
            }}
            onTagAdd={onTagAdd}
            onTagRemove={onTagRemove}
            suggestions={tagsHints.tags}
            tags={tags}
          />
        )}
      </div>
      <div>
        <h3 className={styles.header}>
          {/* @todo add translation */}
          Promoted tags
        </h3>
        <PromotedTags
          id={props.id}
          onDelete={(id) => deletePromotedTag(id)}
          onEdit={(id) => {
            const promotedTag = promotedTagsQuery.getEntity(id)
            setPromotedTagEditor({
              description: promotedTag.description,
              id: promotedTag.id,
              isOpen: true,
              tag: promotedTag.tag,
            })
          }}
        />
      </div>
      {promotedTagEditor.isOpen && (
        <Modal
          onClose={() => {
            setPromotedTagEditor({
              tag: '',
              isOpen: false,
            })
          }}
        >
          <PromotedTagsForm
            onSuccess={() => {
              setPromotedTagEditor({
                tag: '',
                isOpen: false,
              })
              loadGroupPromotedTags(props.id)
            }}
            description={promotedTagEditor.description}
            groupId={props.id}
            id={promotedTagEditor.id}
            tag={promotedTagEditor.tag}
          />
        </Modal>
      )}
    </div>
  )
}
