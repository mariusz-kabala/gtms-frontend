import React, { FC, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { updateGroup, updateGroupAvatar } from '@gtms/state-group'
import { GroupAvatarNoImage } from 'enums'
import { IoIosSettings } from 'react-icons/io'
// commons
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { UploadFile } from '@gtms/ui/UploadFile'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

interface IFormData {
  name?: string
  description?: string
}

export const BasicInfoSetup: FC<{ group: IGroup }> = ({ group }) => {
  const { t } = useTranslation('groupSettings')
  const [formState, setFormState] = useState<{
    isOpen: boolean
    isSaving: boolean
  }>({
    isOpen: false,
    isSaving: false,
  })
  const [fileUploadState, setFileUploadState] = useState<{
    isOpen: boolean
    isSaving: boolean
    isError: boolean
  }>({
    isOpen: false,
    isError: false,
    isSaving: false,
  })
  const { register, handleSubmit, errors, setError } = useForm<IFormData>()

  const onFormModalClose = useCallback(
    () => setFormState({ isOpen: false, isSaving: false }),
    []
  )

  const onFormModalOpen = useCallback(
    () => setFormState({ isOpen: true, isSaving: false }),
    []
  )

  const onUploadFileModalClose = useCallback(
    () =>
      setFileUploadState({
        isOpen: false,
        isError: false,
        isSaving: false,
      }),
    []
  )

  const onUploadFileModalOpen = useCallback(
    () =>
      setFileUploadState({
        isOpen: true,
        isError: false,
        isSaving: false,
      }),
    []
  )

  const validate = useCallback((data: IFormData) => {
    let hasErrors = false

    if (!data.name) {
      setError('name', 'required')
      hasErrors = true
    }

    return !hasErrors
  }, [])

  const onSubmit = async (data: IFormData) => {
    if (!validate(data)) {
      return
    }

    setFormState({
      isOpen: true,
      isSaving: true,
    })

    try {
      await updateGroup(data, group.slug)
    } finally {
      setFormState({
        isOpen: false,
        isSaving: false,
      })
    }
  }

  const onAvatarDrop = useCallback((acceptedFiles) => {
    setFileUploadState({
      isOpen: true,
      isSaving: true,
      isError: false,
    })

    updateGroupAvatar(acceptedFiles[0])
      .then(() => {
        setFileUploadState({
          isSaving: false,
          isError: false,
          isOpen: false,
        })
      })
      .catch(() => {
        setFileUploadState({
          isOpen: true,
          isSaving: false,
          isError: true,
        })
      })
  }, [])

  return (
    <div data-testid="group-basic-info-setup" className={styles.wrapper}>
      <div className={styles.imagePreview}>
        <ImageWithLightbox
          additionalStyles={styles.imagePreview}
          src={getImage('200x200', group.avatar, GroupAvatarNoImage)}
        />
        <Button onClick={onUploadFileModalOpen} additionalStyles={styles.btn}>
          <i>
            <IoIosSettings />
          </i>
        </Button>
      </div>
      <div onClick={onFormModalOpen}>
        <h2 className={styles.header}>{group.name}</h2>
        <p className={styles.description}>
          {group.description || 'no group description'}
        </p>
      </div>
      {formState.isOpen && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={onFormModalClose}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            data-testid="group-basic-info-setup-form"
          >
            <Input
              type="text"
              name="name"
              defaultValue={group.name}
              placeholder={t('form.labels.name')}
              reference={register({ required: true })}
            />
            {errors.name && (
              <Error text={t('form.validation.name.isRequired')} />
            )}
            <ExpandingTextarea
              placeholder={t('form.labels.description')}
              name="description"
              defaultValue={group.description}
              reference={register({ required: false })}
            />
            {formState.isSaving && <Spinner />}
            <Button
              type="submit"
              disabled={formState.isSaving}
              additionalStyles={styles.btn}
            >
              Save
            </Button>
          </form>
        </Modal>
      )}

      {fileUploadState.isOpen && (
        <Modal onClose={onUploadFileModalClose}>
          <UploadFile
            additionalStyles={styles.uploadFile}
            isError={fileUploadState.isError}
            isLoading={fileUploadState.isSaving}
            onDrop={onAvatarDrop}
          />
        </Modal>
      )}
    </div>
  )
}
