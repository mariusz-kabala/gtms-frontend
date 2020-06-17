import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@gtms/ui/Forms/Input'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'
import { resetPasswordReq } from '@gtms/api-auth'
import { Error } from '@gtms/ui/Forms/Error'
import { validatePassword } from '@gtms/state-user'

export interface IResetPasswordFormData {
  password: string
  confirmPassword: string
}

export const ResetPasswordForm: FC<{
  onSuccess: () => void
  code: string
}> = ({ onSuccess, code }) => {
  const { t } = useTranslation('resetPassword')
  const { register, handleSubmit, errors, setError } = useForm<
    IResetPasswordFormData
  >()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const validate = (data: IResetPasswordFormData): boolean => {
    let hasErrors = false

    if (!data.password) {
      setError('password', 'required')
      hasErrors = true
    }

    if (!data.confirmPassword) {
      setError('confirmPassword', 'required')
      hasErrors = true
    }

    if (!validatePassword(data.password)) {
      setError('password', 'invalidFormat')
      hasErrors = true
    }

    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', 'notEqual')
      hasErrors = true
    }

    return !hasErrors
  }

  const onSubmit = async (data: IResetPasswordFormData) => {
    if (!validate(data)) {
      return
    }

    setIsMakingRequest(true)

    try {
      await resetPasswordReq({
        password: data.password,
        code,
      })
      onSuccess()
    } catch (err) {
      setError('password', 'serverError')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="reset-password-form">
      <Input
        type="password"
        placeholder={t('form.labels.password')}
        name="password"
        reference={register({ required: true })}
      />
      {errors.password && errors.password.type === 'required' && (
        <Error text={t('form.validation.password.isRequired')} />
      )}
      {errors.password && errors.password.type === 'invalidFormat' && (
        <Error text={t('form.validation.password.invalidFormat')} />
      )}
      {errors.password && errors.password.type === 'serverError' && (
        <Error text={t('serverError')} />
      )}

      <Input
        type="password"
        placeholder={t('form.labels.confirmPassword')}
        name="confirmPassword"
        reference={register({ required: true })}
      />
      {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
        <Error text={t('form.validation.confirmPassword.isRequired')} />
      )}
      {errors.confirmPassword && errors.confirmPassword.type === 'notEqual' && (
        <Error text={t('form.validation.confirmPassword.notEqual')} />
      )}

      <Button type="submit" disabled={isMakingRequest}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
