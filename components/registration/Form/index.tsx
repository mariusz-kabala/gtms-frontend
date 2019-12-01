import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
import { registerUserAccount } from 'state/user'
import { IRegistrationData } from 'api/auth'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const RegistrationForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  const { register, handleSubmit, errors, setError } = useForm<
    IRegistrationData
  >()
  const onSubmit = async (data: IRegistrationData) => {
    const { password, passwordConfirmation } = data

    if (password !== passwordConfirmation) {
      setError(
        'passwordConfirmation',
        'notMatch',
        t('form.validation.passwordConfirmation.notMatch')
      )
      return
    }

    try {
      await registerUserAccount(data)
    } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">{t('form.labels.email')}</label>
      <Input
        type="email"
        name="email"
        placeholder={t('form.labels.password')}
        reference={register({ required: true })}
      />
      {errors.email && <Error text={t('form.validation.email.isRequired')} />}

      <Input
        type="text"
        name="name"
        placeholder={t('form.labels.name')}
        reference={register}
      />

      <label htmlFor="password">{t('form.labels.password')}</label>
      <Input
        type="password"
        placeholder={t('form.labels.password')}
        name="password"
        reference={register({ required: true })}
      />
      {errors.password && (
        <Error text={t('form.validation.password.isRequired')} />
      )}

      <label htmlFor="passwordConfirmation">
        {t('form.labels.passwordConfirmation')}
      </label>
      <Input
        type="password"
        placeholder={t('form.labels.password')}
        name="passwordConfirmation"
        reference={register({ required: true })}
      />
      {errors.passwordConfirmation && (
        <Error text={t('form.validation.passwordConfirmation.isRequired')} />
      )}

      <Button type="submit" disabled={false}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
