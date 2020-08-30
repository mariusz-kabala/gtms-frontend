import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { ILoginData } from '@gtms/api-auth'
import { loginUser } from '@gtms/state-user'
// ui
import { Button } from '@gtms/ui/Button'
import { Error } from '@gtms/ui/Forms/Error'
import { Input } from '@gtms/ui/Forms/Input'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

export const LoginForm: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const { t } = useTranslation('login')
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const { register, handleSubmit, errors, setError } = useForm<ILoginData>()
  const validate = (data: ILoginData): boolean => {
    let hasErrors = false
    if (!data.email) {
      setError('email', 'required')
      hasErrors = true
    }

    if (!data.password) {
      setError('password', 'required')
      hasErrors = true
    }

    return !hasErrors
  }
  const onSubmit = async (data: ILoginData) => {
    if (!validate(data)) {
      return
    }

    setIsMakingRequest(true)

    try {
      await loginUser(data)
    } catch (err) {
      setError('email', 'invalid')
    }

    setIsMakingRequest(false)
  }

  return (
    <form
      className={additionalStyles}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="login-form"
    >
      <Input
        type="email"
        placeholder={t('form.labels.email')}
        name="email"
        reference={register({ required: true })}
      />
      {errors.email && errors.email.type === 'required' && (
        <Error text={t('form.validation.email.isRequired')} />
      )}
      {errors.email && errors.email.type === 'invalid' && (
        <Error text={t('loginFailed')} />
      )}

      <Input
        type="password"
        placeholder={t('form.labels.password')}
        name="password"
        reference={register({ required: true })}
      />
      {errors.password && (
        <Error text={t('form.validation.password.isRequired')} />
      )}

      <Button
        type="submit"
        additionalStyles={styles.btnSubmit}
        disabled={isMakingRequest}
      >
        <Spinner size="sm" type="authentication" />
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
