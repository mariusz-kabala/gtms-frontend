import React, { FC, useState, useRef, useCallback } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { createPromotedTag, updatePromotedTag } from '@gtms/state-tag'
import { uploadPromotedTagLogo, uploadTmpPromotedTagLogo } from '@gtms/api-tags'
import { deleteTmpFileAPI } from '@gtms/api-file'
// ui
import { Error } from '@gtms/ui/Forms/Error'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Spinner } from '@gtms/ui'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'

const readFile = (file: File): Promise<string | undefined> =>
  new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      resolve(e.target?.result as string)
    }

    reader.readAsDataURL(file)
  })

export const PromotedTagsForm: FC<{
  description?: string
  groupId: string
  id?: string
  onSuccess: () => unknown
  tag?: string
}> = ({ description, groupId, id, onSuccess, tag }) => {
  const { t } = useTranslation('PromotedTagsForm')
  const [promotedTagId, setPromotedTagId] = useState<string | undefined>(id)
  const [filePreview, setFilePreview] = useState<{
    file: string | null
    id?: string
  }>({ file: null })
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
    (acceptedFiles: File[]) => {
      setUploadStatus({
        isUploading: true,
        isError: false,
      })

      if (promotedTagId) {
        uploadPromotedTagLogo(promotedTagId as string, acceptedFiles[0])
          .then(() => {
            setUploadStatus({
              isUploading: false,
              isError: false,
            })

            readFile(acceptedFiles[0]).then((file) => {
              file && setFilePreview({ file })
            })
          })
          .catch(() => {
            setUploadStatus({
              isUploading: false,
              isError: true,
            })
          })
      } else {
        uploadTmpPromotedTagLogo(acceptedFiles[0])
          .then((res) => {
            setUploadStatus({
              isUploading: false,
              isError: false,
            })

            readFile(acceptedFiles[0]).then((file) => {
              file && setFilePreview({ file, id: res.id })
            })
          })
          .catch(() => {
            setUploadStatus({
              isUploading: false,
              isError: true,
            })
          })
      }
    },
    [promotedTagId, onSuccess]
  )

  return (
    <div className={styles.wrapper} data-testid="promoted-tags-form">
      {filePreview.file === null && (
        <UploadFile
          additionalStyles={styles.uploadArea}
          accept="image/*"
          isLoading={uploadStatus.isUploading}
          isError={uploadStatus.isError}
          onDrop={onDrop}
        />
      )}
      {filePreview.file !== null && (
        <div data-testid="promoted-tag-image-preview-box">
          <img
            src={filePreview.file}
            alt="preview"
            data-testid="promoted-tag-image-preview"
          />
          <p className={styles.uploadAnother}>
            <a
              onClick={() => {
                if (filePreview.id) {
                  deleteTmpFileAPI(filePreview.id)
                }
                setFilePreview({ file: null })
              }}
              data-testid="promoted-tag-image-preview-cancel"
            >
              upload another one
            </a>
          </p>
        </div>
      )}
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
      </div>
      <button
        className={styles.btn}
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
              file: filePreview.id,
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

          onSuccess()
        }}
      >
        {/* @todo add translation */}
        Save
      </button>
      {savingStatus.isSaving && <Spinner />}
    </div>
  )
}
