import React, { FC, useState } from 'react'
// ui
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { GroupDescriptionForm } from './Form'

export const GroupDescription: FC<{
  additionalStyles?: string
  text: string
  slug: string
  isEditAllowed: boolean // if its not allowed - cursor != pointer - fix css and remove comment
}> = ({ additionalStyles, text, slug, isEditAllowed }) => {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="group-edit-description"
      onClick={() => {
        if (isEditAllowed && !isEditModeActive) {
          setIsEditModeActive(true)
        }
      }}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        closeOnClickOutsie={true}
        label={text}
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
        <GroupDescriptionForm
          text={text}
          slug={slug}
          onSuccess={() => setIsEditModeActive(false)}
          onError={() => {
            setIsEditModeActive(false)
            // here is place where we should display an error to user - where is global notification system??
          }}
        />
      </ExpandingItem>
    </div>
  )
}
