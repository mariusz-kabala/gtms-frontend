import React from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { NFC } from '@gtms/commons/types/nfc.d'
import { useTranslation } from '@gtms/commons/i18n'

// where I should this one below?
import { IUserNameData } from '@gtms/commons/types/userAccount'

import { Button } from '@gtms/ui/Button'
import { Error } from '@gtms/ui/Forms/Error'
import { Input } from '@gtms/ui/Forms/Input'

export const UserNameChangeForm: NFC<{}> = () => {
  const { t } = useTranslation('userNameChangeForm')
  const { register, handleSubmit, errors, setError } = useForm<IUserNameData>()

  const validate = (data: IUserNameData): boolean => {
    let hasErrors = false
    if (!data.name) {
      setError('name', 'required')
      hasErrors = true
    }

    if (!data.surname) {
      setError('surname', 'required')
      hasErrors = true
    }

    return !hasErrors
  }
  const onSubmit = async (data: IUserNameData) => {
    if (!validate(data)) {
      return
    }
  }

  return (
    <form data-testid="userNameChangeform" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="name"
        placeholder={t('form.labels.name')}
        reference={register}
      />
      {errors.name && <Error text={t('form.validation.name.isRequired')} />}
      <Input
        type="text"
        name="surname"
        placeholder={t('form.labels.surname')}
        reference={register}
      />
      {errors.surname && (
        <Error text={t('form.validation.surname.isRequired')} />
      )}
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
