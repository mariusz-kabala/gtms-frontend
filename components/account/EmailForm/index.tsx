import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
// import { registerUserAccount } from 'state/user'
import { IRegistrationData } from 'api/auth'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const EmailForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  // const { register, handleSubmit, errors, setError } = useForm<
  const { register, handleSubmit, errors } = useForm<IRegistrationData>()
  const onSubmit = async () => {
    alert('submit')
    // const { password, passwordConfirmation } = data

    // if (password !== passwordConfirmation) {
    //   setError(
    //     'passwordConfirmation',
    //     'notMatch',
    //     t('form.validation.passwordConfirmation.notMatch')
    //   )
    //   return
    // }

    // try {
    //   await registerUserAccount(data)
    // } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">{t('form.labels.email')}</label>
      <Input
        type="email"
        name="email"
        placeholder={t('form.labels.email')}
        reference={register({ required: true })}
      />
      {errors.email && <Error text={t('form.validation.email.isRequired')} />}

      <Button type="submit" disabled={false}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
