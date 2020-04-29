import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Error } from '@gtms/ui/Forms/Error'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

interface IFromData {
  description: string
}

export const GroupDescriptionForm: FC<{ onError: () => unknown }> = ({
  onError,
}) => {
  const { t } = useTranslation('groupDescription')
  const { register, handleSubmit, errors, setError } = useForm<IFromData>()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const validate = (data: IFromData) => {
    let hasErrors = false

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
    } catch (err) {
      if (err.status === 400) {
        const errors = await err.json()
        Object.keys(errors).forEach((field) => {
          setError(field as 'description', 'backend', errors[field].message)
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
      data-testid="group-description-form"
    >
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
