import React, { FC, useState } from 'react'
// ui
import { Modal } from '@gtms/ui/Modal'
import { GroupDescriptionForm } from './Form'
import styles from './styles.scss'

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
      <p>{text}</p>
      {isEditModeActive && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() => setIsEditModeActive(false)}
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
        </Modal>
      )}
    </div>
  )
}
