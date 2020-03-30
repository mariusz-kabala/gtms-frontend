import React from 'react'
import { useForm } from 'react-hook-form'

import { NFC } from '@gtms/commons/types/nfc.d'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

import {
  GroupNameFormProps,
  GroupNameFormData,
  GroupNameData,
} from '../interfaces'

export const GroupNameForm: NFC<GroupNameFormProps> = (props) => {
  const { register, handleSubmit, errors, setError } = useForm<
    GroupNameFormData
  >()
  const { t } = useTranslation('userNameChangeForm')

  const validate = (formData: GroupNameFormData): formData is GroupNameData => {
    let hasErrors = false
    if (!formData.name) {
      setError('name', 'required')
      hasErrors = true
    }

    return !hasErrors
  }

  const onSubmit = async (data: GroupNameFormData) => {
    if (!validate(data)) {
      return
    }

    props.onSubmit(data)
  }

  return (
    <form data-testid="user-name-change-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="name"
        defaultValue={props.formData.name}
        placeholder={t('form.labels.name')}
        reference={register}
      />
      {errors.name && <Error text={t('form.validation.name.isRequired')} />}
      <Button
        type="submit"
        disabled={false}
        additionalStyles={styles.btnSubmit}
      >
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
