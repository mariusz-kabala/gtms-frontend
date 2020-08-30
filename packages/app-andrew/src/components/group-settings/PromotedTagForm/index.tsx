import React, { FC, useState, useRef, useCallback } from 'react'
import cx from 'classnames'
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

enum FormSteps {
  one,
  two,
}

export const PromotedTagsForm: FC<{
  tag?: string
  id?: string
  groupId: string
  description?: string
  onSuccess: () => unknown
}> = ({ onSuccess, tag, groupId, description, id }) => {
  const { t } = useTranslation('PromotedTagsForm')
  const [step, setStep] = useState<FormSteps>(FormSteps.one)
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
      <h2 className={styles.header}>Promoted tag</h2>
      <nav>
        <ul>
          <li
            className={cx({
              [styles.activeTab]: step === FormSteps.one,
            })}
          >
            <a onClick={() => setStep(FormSteps.one)}>Basic info</a>
          </li>
          <li
            className={cx({
              [styles.activeTab]: step === FormSteps.two,
              [styles.disabled]: !promotedTagId,
            })}
          >
            <a
              onClick={() => {
                if (!promotedTagId) {
                  return
                }

                setStep(FormSteps.two)
              }}
            >
              Image
            </a>
          </li>
        </ul>
      </nav>

      {promotedTagId && stateTag.value && (
        <div className={styles.promoted}>
          <TagGroup>
            <Tag label={stateTag.value} />
          </TagGroup>
        </div>
      )}

      {step === FormSteps.one && (
        <div>
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
                  setStep(FormSteps.two)
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
                  setStep(FormSteps.two)
                })
              }
            }}
            className={styles.btn}
          >
            {/* @todo add translation */}
            Save & go to next step
          </button>
          {savingStatus.isSaving && <Spinner />}
        </div>
      )}

      {step === FormSteps.two && (
        <div className={styles.stepTwo}>
          <UploadFile
            onDrop={onDrop}
            accept="image/*"
            isLoading={uploadStatus.isUploading}
            isError={uploadStatus.isError}
            additionalStyles={styles.uploadArea}
          />
          <button onClick={() => setStep(FormSteps.one)} className={styles.btn}>
            {/* @todo add translation */}
            Go back to step one
          </button>
        </div>
      )}
    </div>
  )
}
