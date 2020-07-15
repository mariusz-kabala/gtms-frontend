import React, { FC, useState, useRef, useCallback } from 'react'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { useTranslation } from '@gtms/commons/i18n'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import styles from './styles.scss'
import { Spinner } from '@gtms/ui'
import { Error } from '@gtms/ui/Forms/Error'
import { createPromotedTag, updatePromotedTag } from '@gtms/state-tag'
import { uploadPromotedTagLogo } from '@gtms/api-tags'
import { UploadFile } from '@gtms/ui/UploadFile'

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
      <h3 className={styles.header}>Promoted tag</h3>
      {promotedTagId && stateTag.value && (
        <div className={styles.promoted}>
          <TagGroup>
            <Tag label={stateTag.value} />
          </TagGroup>
        </div>
      )}
      {step === FormSteps.one && (
        <section>
          {!tag && !promotedTagId && (
            <div>
              <input
                type="text"
                name="tag"
                value={stateTag.value}
                onChange={(e) => {
                  setStateTag({
                    isError: false,
                    value: e.target.value,
                  })
                }}
                placeholder="Here goes tag name"
              />
              {stateTag.isError && <Error text={'Tag can not be empty'} />}
            </div>
          )}
          <div>
            <ExpandingTextarea
              placeholder="Put a short tag description here"
              name="description"
              defaultValue={description}
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
              Save & go to next step
            </button>
            {savingStatus.isSaving && <Spinner />}
          </div>
        </section>
      )}

      {step === FormSteps.two && (
        <section className={styles.stepTwo}>
          <UploadFile
            onDrop={onDrop}
            isLoading={uploadStatus.isUploading}
            isError={uploadStatus.isError}
            additionalStyles={styles.uploadArea}
          />
          <div className={styles.buttons}>
            <button
              onClick={() => setStep(FormSteps.one)}
              className={styles.btn}
            >
              Go back to step one
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
