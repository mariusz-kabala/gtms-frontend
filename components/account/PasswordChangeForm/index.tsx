import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
// import { changePasswordUserAccount } from 'state/user'
import { IRegistrationData } from 'api/auth'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const PasswordChangeForm: NFC<{}> = () => {
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

    // try {
    //  @todo put here sth like
    // await changePasswordUserAccount(data)
    // } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
