import React, { FC, useState, useEffect, useCallback } from 'react'
import {
  IPromotedTagsState,
  promotedTagsState,
  promotedTagsState$,
} from './state.query'
import { PromotedTagsForm } from 'components/group-settings/PromotedTagForm'
import { PromotedTagNoImage } from 'enums'
import { PromotedTags as PromotedTagsUI } from '@gtms/ui/PromotedTags'
import { EmptyPromotedTags } from '@gtms/ui/EmptyPromotedTags'
import {
  reloadGroupPromotedTagsSilently,
  deletePromotedTag,
} from '@gtms/state-tag'
import { Modal } from '@gtms/ui/Modal'
import { IPromotedTag } from '@gtms/commons/models'

export const PromotedTags: FC<{}> = () => {
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
    <div>
      {!state.isLoading && state.tags.length === 0 && (
        <EmptyPromotedTags onAddClick={onAddTagClick} isAdmin={state.isAdmin} />
      )}
      {state.isLoading ||
        (state.tags.length > 0 && (
          <PromotedTagsUI
            tags={state.tags}
            isLoading={state.isLoading}
            noImage={PromotedTagNoImage}
            isAdmin={state.isAdmin}
            onNoRecordsClick={onAddTagClick}
            onEditRecordClick={onEditTagClick}
            onDeleteRecordClick={onDeleteTagClick}
          />
        ))}
      {promotedTagEditor.isOpen && (
        <Modal
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