import React, { FC } from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroupCreateData } from '@gtms/api-group'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { Button } from '@gtms/ui/Button'

export const GroupCreateForm: FC<{}> = () => {
  const { t } = useTranslation('groupCreate')
  const { register, handleSubmit, errors, setError } = useForm<
    IGroupCreateData
  >()
  const validate = (data: IGroupCreateData) => {
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
  const onSubmit = async (data: IGroupCreateData) => {
    if (!validate(data)) {
      return
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
      <Input
        type="text"
        placeholder={t('form.labels.description')}
        name="description"
        reference={register({ required: true })}
      />
      {errors.name && errors.name.type === 'required' && (
        <Error text={t('form.validation.description.isRequired')} />
      )}
      <Button type="submit" additionalStyles={styles.btn}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
