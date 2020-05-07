import React from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { NFC } from '@gtms/commons/types/nfc'
import { useTranslation } from '@gtms/commons/i18n'
import { IUserEmailData } from '@gtms/commons/types/userAccount'

import { Button } from '@gtms/ui/Button'
import { Error } from '@gtms/ui/Forms/Error'
import { Input } from '@gtms/ui/Forms/Input'

export const EmailChangeForm: NFC<{}> = () => {
  const { t } = useTranslation('EmailChangeForm')
  const { register, handleSubmit, errors, setError } = useForm<IUserEmailData>()
  const validate = (data: IUserEmailData): boolean => {
    let hasErrors = false
    if (!data.email) {
      setError('email', 'required')
      hasErrors = true
    }

    return !hasErrors
  }
  const onSubmit = async (data: IUserEmailData) => {
    if (!validate(data)) {
      return
    }
  }

  return (
    <form data-testid="user-email-change-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="email"
        placeholder={t('form.labels.email')}
        reference={register}
      />
      {errors.email && <Error text={t('form.validation.email.isRequired')} />}
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
