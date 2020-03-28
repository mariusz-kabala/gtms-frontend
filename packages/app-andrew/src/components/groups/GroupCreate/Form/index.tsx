import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { Input } from '@gtms/ui/Forms/Input'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Error } from '@gtms/ui/Forms/Error'
import { Button } from '@gtms/ui/Button'
import { createNewGroup } from '@gtms/state-group'

interface IFromData {
  name: string
  description: string
}

export const GroupCreateForm: FC<{ onError: () => unknown }> = ({
  onError,
}) => {
  const { t } = useTranslation('groupCreate')
  const { register, handleSubmit, errors, setError } = useForm<IFromData>()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const validate = (data: IFromData) => {
    let hasErrors = false

    if (!data.name) {
      setError('name', 'required')
      hasErrors = true
    }

    if (!data.description) {
      setError('description', 'required')
      hasErrors = true
    }

    return !hasErrors
  }
  const onSubmit = async (data: IFromData) => {
    if (!validate(data)) {
      return
    }

    setIsMakingRequest(true)

    try {
      await createNewGroup(data)
    } catch (err) {
      if (err.status === 400) {
        const errors = await err.json()
        Object.keys(errors).forEach((field: string) => {
          setError(field, 'backend', errors[field].message)
        })
      } else {
        onError()
      }
    }
  }

  return (
    <form
      className={styles.form}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="group-create-form"
    >
      <Input
        type="text"
        placeholder={t('form.labels.name')}
        name="name"
        reference={register({ required: true })}
      />
      {errors.name && errors.name.type === 'required' && (
        <Error text={t('form.validation.name.isRequired')} />
      )}
      {errors.name && errors.name.type === 'required' && (
        <Error text={errors.name.message as string} />
      )}
      <ExpandingTextarea
        placeholder={t('form.labels.description')}
        name="description"
        reference={register({ required: true })}
      />
      {errors.description && errors.description.type === 'required' && (
        <Error text={t('form.validation.description.isRequired')} />
      )}
      {errors.description && errors.description.type === 'required' && (
        <Error text={errors.description.message as string} />
      )}
      <Button
        type="submit"
        disabled={isMakingRequest}
        additionalStyles={styles.btn}
      >
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
