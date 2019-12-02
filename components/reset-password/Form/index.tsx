import React, { FC, useState } from 'react'
import useForm from 'react-hook-form'
import { Input } from 'components/common/Forms/Input'
import { Button } from 'components/common/Button'
import { useTranslation } from 'i18n'
import { resetPasswordReq } from 'api/auth'
import { Error } from 'components/common/Forms/Error'

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

  const onSubmit = async (data: IResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', 'notEqual')
      return
    }

    setIsMakingRequest(true)

    try {
      resetPasswordReq({
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
