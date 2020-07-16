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
import { loadGroupPromotedTags } from '@gtms/state-tag'
import { Modal } from '@gtms/ui/Modal'

export const PromotedTags: FC<{}> = () => {
  const [state, setState] = useState<IPromotedTagsState>(promotedTagsState())
  const [promotedTagEditor, setPromotedTagEditor] = useState<{
    isOpen: boolean
    id?: string
    description?: string
  }>({
    isOpen: false,
  })

  const onAddTagClick = useCallback(() => {
    setPromotedTagEditor({
      isOpen: true,
    })
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

              setTimeout(() => loadGroupPromotedTags(state.id || ''), 2000)
            }}
            groupId={state.id || ''}
            id={promotedTagEditor.id}
            description={promotedTagEditor.description}
          />
        </Modal>
      )}
    </div>
  )
}
