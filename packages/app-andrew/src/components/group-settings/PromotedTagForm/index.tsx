import React, { FC, useState, useRef } from 'react'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { useTranslation } from '@gtms/commons/i18n'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import styles from './styles.scss'
import { Spinner } from '@gtms/ui'
import { Error } from '@gtms/ui/Forms/Error'
import { createPromotedTagAPI } from '@gtms/api-tags'

export const PromotedTagsForm: FC<{ tag: string; id: string }> = ({
  tag,
  id,
}) => {
  const { t } = useTranslation('PromotedTagsForm')
  const [savingStatus, setSavingStatus] = useState<{
    isSaving: boolean
    validationError: string
  }>({
    isSaving: false,
    validationError: '',
  })
  const dscRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Promoted tag</h3>
      <div className={styles.promoted}>
        <TagGroup>
          <Tag label={tag} />
        </TagGroup>
      </div>
      <div>
        <ExpandingTextarea
          placeholder="Put a short tag description here"
          name="description"
          defaultValue={''}
          reference={dscRef as any}
        />
        {savingStatus.validationError && (
          <Error text={t(savingStatus.validationError)} />
        )}
      </div>
      <div className={styles.buttons}>
        <button
          disabled={savingStatus.isSaving}
          onClick={() => {
            const dsc = dscRef.current?.value

            if (!dsc) {
              setSavingStatus({
                isSaving: false,
                validationError: 'form.validation.description.isRequired',
              })
              return
            }

            setSavingStatus({
              isSaving: true,
              validationError: '',
            })

            createPromotedTagAPI({
              tag,
              group: id,
              description: dsc,
            }).then(() => {
              setSavingStatus({
                isSaving: false,
                validationError: '',
              })
            })
          }}
          className={styles.btn}
        >
          Save & go to next step
        </button>
        {savingStatus.isSaving && <Spinner />}
      </div>
    </div>
  )
}
