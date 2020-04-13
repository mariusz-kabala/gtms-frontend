import React from 'react'
import { useForm } from 'react-hook-form'

import { NFC } from '@gtms/commons/types/nfc.d'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

import {
  ChangeGroupNameFormProps,
  ChangeGroupNameFormData,
  ChangeGroupNameData,
} from '../interfaces'

export const GroupNameForm: NFC<ChangeGroupNameFormProps> = (props) => {
  const { register, handleSubmit, errors, setError } = useForm<
    ChangeGroupNameFormData
  >()
  const { t } = useTranslation('userNameChangeForm')

  const isFormValid = (
    formData: ChangeGroupNameFormData
  ): formData is ChangeGroupNameData => {
    if (!formData.name) {
      setError('name', 'required')
      return false
    }

    return true
  }

  const onSubmit = async (data: ChangeGroupNameFormData) => {
    if (!isFormValid(data)) {
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
        atributes={{ autoFocus: true }}
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
