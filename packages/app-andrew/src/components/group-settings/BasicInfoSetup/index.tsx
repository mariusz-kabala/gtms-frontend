import React, { FC, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { updateGroup } from '@gtms/state-group'
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
  const { register, handleSubmit, errors, setError } = useForm<IFormData>()

  const onFormModalClose = useCallback(
    () => setFormState({ isOpen: false, isSaving: false }),
    []
  )

  const onFormModalOpen = useCallback(
    () => setFormState({ isOpen: true, isSaving: false }),
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

  return (
    <div data-testid="group-basic-info-setup" className={styles.wrapper}>
      <div className={styles.imagePreview}>
        <ImageWithLightbox
          additionalStyles={styles.imagePreview}
          src={getImage('200x200', group.avatar, GroupAvatarNoImage)}
        />
        <Button onClick={() => null} additionalStyles={styles.btn}>
          <i>
            <IoIosSettings />
          </i>
        </Button>
      </div>
      <div onClick={onFormModalOpen}>
        <h1>{group.name}</h1>
        <p>{group.description || 'no group description'}</p>
      </div>
      {formState.isOpen && (
        <Modal onClose={onFormModalClose}>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <Input
              type="text"
              name="name"
              defaultValue={group.name}
              placeholder={t('form.labels.name')}
              reference={register}
            />
            {errors.name && (
              <Error text={t('form.validation.name.isRequired')} />
            )}
            <ExpandingTextarea
              placeholder={t('form.labels.description')}
              name="description"
              defaultValue={group.description}
              reference={register({ required: true })}
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
    </div>
  )
}
