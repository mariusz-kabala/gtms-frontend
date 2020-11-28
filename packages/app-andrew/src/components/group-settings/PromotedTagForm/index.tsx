import React, { FC, useState, useRef, useCallback } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { createPromotedTag, updatePromotedTag } from '@gtms/state-tag'
import { uploadPromotedTagLogo } from '@gtms/api-tags'
// ui
import { Error } from '@gtms/ui/Forms/Error'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Spinner } from '@gtms/ui'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'

export const PromotedTagsForm: FC<{
  tag?: string
  id?: string
  groupId: string
  description?: string
  onSuccess: () => unknown
}> = ({ onSuccess, tag, groupId, description, id }) => {
  const { t } = useTranslation('PromotedTagsForm')
  const [promotedTagId, setPromotedTagId] = useState<string | undefined>(id)
  const [savingStatus, setSavingStatus] = useState<{
    isSaving: boolean
    validationError: string
  }>({
    isSaving: false,
    validationError: '',
  })
  const dscRef = useRef<HTMLTextAreaElement | null>(null)
  const [uploadStatus, setUploadStatus] = useState<{
    isUploading: boolean
    isError: boolean
  }>({
    isError: false,
    isUploading: false,
  })
  const [stateTag, setStateTag] = useState<{
    value: string
    isError: boolean
  }>({
    value: tag || '',
    isError: false,
  })

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (promotedTagId === null) {
        return
      }

      setUploadStatus({
        isUploading: true,
        isError: false,
      })

      uploadPromotedTagLogo(promotedTagId as string, acceptedFiles[0])
        .then(() => {
          setUploadStatus({
            isUploading: false,
            isError: false,
          })

          onSuccess()
        })
        .catch(() => {
          setUploadStatus({
            isUploading: false,
            isError: true,
          })
        })
    },
    [promotedTagId, onSuccess]
  )

  return (
    <div className={styles.wrapper}>
      <UploadFile
        additionalStyles={styles.uploadArea}
        accept="image/*"
        isLoading={uploadStatus.isUploading}
        isError={uploadStatus.isError}
        onDrop={onDrop}
      />
      <div>
        {/* @question - can we remove that? */}
        {promotedTagId && stateTag.value && (
          <div className={styles.promoted}>
            <TagGroup>
              <Tag label={stateTag.value} />
            </TagGroup>
          </div>
        )}

        {!tag && !promotedTagId && (
          <div>
            <input
              className={styles.input}
              type="text"
              name="tag"
              value={stateTag.value}
              onChange={(e) => {
                let value = e.target.value.trim()

                if (value.length > 1 && value.charAt(0) === '#') {
                  value = value.substr(1)
                }

                setStateTag({
                  isError: false,
                  value,
                })
              }}
              placeholder="Here goes tag name"
            />
            {stateTag.isError && <Error text={'Tag can not be empty'} />}
          </div>
        )}
        <ExpandingTextarea
          additionalStyles={styles.textarea}
          placeholder="Put a short tag description here"
          name="description"
          defaultValue={description}
          reference={dscRef as any}
        />
        {savingStatus.validationError && (
          <Error text={t(savingStatus.validationError)} />
        )}
        <button
          disabled={savingStatus.isSaving}
          onClick={() => {
            const dsc = dscRef.current?.value
            let errors = false

            if (!dsc) {
              setSavingStatus({
                isSaving: false,
                validationError: 'form.validation.description.isRequired',
              })
              errors = true
            }

            if (!stateTag.value) {
              setStateTag((value) => ({
                ...value,
                isError: true,
              }))
              errors = true
            }

            if (errors) {
              return
            }

            setSavingStatus({
              isSaving: true,
              validationError: '',
            })

            if (promotedTagId) {
              updatePromotedTag(promotedTagId, {
                description: dsc as string,
              }).then(() => {
                setSavingStatus({
                  isSaving: false,
                  validationError: '',
                })
              })
            } else {
              createPromotedTag({
                tag: stateTag.value,
                group: groupId,
                description: dsc as string,
              }).then((result) => {
                if (result) {
                  setPromotedTagId(result.id)
                }
                setSavingStatus({
                  isSaving: false,
                  validationError: '',
                })
              })
            }
          }}
          className={styles.btn}
        >
          {/* @todo add translation */}
          Save
        </button>
        {savingStatus.isSaving && <Spinner />}
      </div>
    </div>
  )
}
