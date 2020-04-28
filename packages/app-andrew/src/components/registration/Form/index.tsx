import React, { useState, FC } from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { registerUserAccount } from '@gtms/state-user'
import { IRegistrationData } from '@gtms/api-auth'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { Button } from '@gtms/ui/Button'

const validate = (data: IRegistrationData, setError: any): boolean => {
  let hasErrors = false
  if (!data.email) {
    setError('email', 'required')
    hasErrors = true
  }

  if (!data.password) {
    setError('password', 'required')
    hasErrors = true
  }

  if (!data.passwordConfirmation) {
    setError('passwordConfirmation', 'required')
    hasErrors = true
  }

  if (hasErrors === false && data.password !== data.passwordConfirmation) {
    hasErrors = true
    setError('passwordConfirmation', 'notMatch')
  }

  return !hasErrors
}

export const RegistrationForm: FC<{ onError: () => void }> = ({ onError }) => {
  const { t } = useTranslation('registration')
  const { register, handleSubmit, errors, setError } = useForm<
    IRegistrationData
  >()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)

  const onSubmit = async (data: IRegistrationData) => {
    if (!validate(data, setError)) {
      return
    }

    setIsMakingRequest(true)

    try {
      await registerUserAccount(data)
    } catch (err) {
      if (err.status === 400) {
        const errors = await err.json()
        Object.keys(errors).forEach((field: string) => {
          setError(
            field as 'email' | 'password' | 'passwordConfirmation' | 'username',
            'backend',
            errors[field].message
          )
        })
      } else {
        onError()
      }
    }

    setIsMakingRequest(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="registration-form">
      <Input
        type="email"
        name="email"
        placeholder={t('form.labels.email')}
        reference={register({ required: true })}
      />
      {errors.email && errors.email.type === 'required' && (
        <Error text={t('form.validation.email.isRequired')} />
      )}
      {errors.email && errors.email.type === 'backend' && (
        <Error text={errors.email.message as string} />
      )}

      <Input
        type="text"
        name="name"
        placeholder={t('form.labels.name')}
        reference={register}
      />

      <Input
        type="password"
        placeholder={t('form.labels.password')}
        name="password"
        reference={register({ required: true })}
      />
      {errors.password && errors.password.type === 'required' && (
        <Error text={t('form.validation.password.isRequired')} />
      )}
      {errors.password && errors.password.type === 'backend' && (
        <Error text={errors.password.message as string} />
      )}

      <Input
        type="password"
        placeholder={t('form.labels.passwordConfirmation')}
        name="passwordConfirmation"
        reference={register({ required: true })}
      />

      {errors.passwordConfirmation?.type === 'required' && (
        <Error text={t('form.validation.passwordConfirmation.isRequired')} />
      )}

      {errors.passwordConfirmation?.type === 'notMatch' && (
        <Error text={t('form.validation.passwordConfirmation.notMatch')} />
      )}

      <Button
        type="submit"
        additionalStyles={styles.btnSubmit}
        disabled={isMakingRequest}
      >
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
