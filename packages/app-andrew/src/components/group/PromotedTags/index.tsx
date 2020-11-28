import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import {
  IPromotedTagsState,
  promotedTagsState,
  promotedTagsState$,
} from './state.query'
import { PromotedTagsForm } from 'components/group-settings/PromotedTagForm'
import { PromotedTagNoImage } from 'enums'
import {
  reloadGroupPromotedTagsSilently,
  deletePromotedTag,
} from '@gtms/state-tag'
import { IPromotedTag } from '@gtms/commons/models'
// ui
import { EmptyPromotedTags } from '@gtms/ui/EmptyPromotedTags'
import { Modal } from '@gtms/ui/Modal'
import { PromotedTags as PromotedTagsUI } from '@gtms/ui/PromotedTags'
import styles from './styles.scss'

type Ref = HTMLDivElement
type Props = {
  additionalStyles?: string
  onTagClick?: (tag: IPromotedTag) => unknown
}

export const PromotedTags = forwardRef<Ref, Props>(
  ({ additionalStyles, onTagClick }, ref) => {
    const [state, setState] = useState<IPromotedTagsState>(promotedTagsState())
    const [promotedTagEditor, setPromotedTagEditor] = useState<{
      isOpen: boolean
      id?: string
      description?: string
      tag?: string
    }>({
      isOpen: false,
    })

    const onAddTagClick = useCallback(() => {
      setPromotedTagEditor({
        isOpen: true,
      })
    }, [])

    const onEditTagClick = useCallback((tag: IPromotedTag) => {
      setPromotedTagEditor({
        isOpen: true,
        description: tag.description,
        id: tag.id,
        tag: tag.tag,
      })
    }, [])

    const onDeleteTagClick = useCallback((tag: IPromotedTag) => {
      // todo show confirmation first!
      deletePromotedTag(tag.id)
    }, [])

    useEffect(() => {
      const sub = promotedTagsState$.subscribe((value) => setState(value))

      return () => {
        sub && !sub.closed && sub.unsubscribe()
      }
    }, [])

    return (
      <div className={additionalStyles} ref={ref}>
        {state.isAdmin && !state.isLoading && state.tags.length === 0 && (
          <EmptyPromotedTags onAddClick={onAddTagClick} />
        )}
        {state.isLoading ||
          (state.tags.length > 0 && (
            <PromotedTagsUI
              tags={state.tags}
              activeTags={state.activeTags}
              isLoading={state.isLoading}
              noImage={PromotedTagNoImage}
              isAdmin={state.isAdmin}
              onTagClick={onTagClick}
              onNoRecordsClick={onAddTagClick}
              onEditRecordClick={onEditTagClick}
              onDeleteRecordClick={onDeleteTagClick}
            />
          ))}
        {promotedTagEditor.isOpen && (
          <Modal
            additionalStyles={styles.modalContent}
            onClose={() => {
              setPromotedTagEditor({
                isOpen: false,
              })
            }}
          >
            <PromotedTagsForm
              onSuccess={() => {
                setPromotedTagEditor({
                  isOpen: false,
                })

                setTimeout(
                  () => reloadGroupPromotedTagsSilently(state.id || ''),
                  2000
                )
              }}
              groupId={state.id || ''}
              id={promotedTagEditor.id}
              description={promotedTagEditor.description}
              tag={promotedTagEditor.tag}
            />
          </Modal>
        )}
      </div>
    )
  }
)
