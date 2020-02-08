import React from 'react'
import styles from './styles.scss'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
import { IUserEmailData } from 'api/userAccount/userEmail'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const UserEmailChangeForm: NFC<{}> = () => {
  const { t } = useTranslation('userEmailChangeForm')
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
    <form data-testid="userEmailChangeForm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">{t('form.labels.email')}</label>
      <Input
        type="email"
        name="email"
        placeholder={t('form.labels.email')}
        reference={register({ required: true })}
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
