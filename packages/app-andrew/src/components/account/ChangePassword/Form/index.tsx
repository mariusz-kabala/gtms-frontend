import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { Input } from '@gtms/ui/Forms/Input'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'
import { Error } from '@gtms/ui/Forms/Error'
import { Spinner } from '@gtms/ui/Spinner'
import { updateAccountDetails } from '@gtms/state-user'

export interface IChangePasswordFormData {
  password: string
  confirmPassword: string
}

export const ChangePasswordForm: FC<{
  onSuccess: () => void
}> = ({ onSuccess }) => {
  const { t } = useTranslation('userPasswordChangeForm')
  const { register, handleSubmit, errors, setError } = useForm<
    IChangePasswordFormData
  >()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const validate = (data: IChangePasswordFormData): boolean => {
    let hasErrors = false

    if (!data.password) {
      setError('password', 'required')
      hasErrors = true
    }

    if (!data.confirmPassword) {
      setError('confirmPassword', 'required')
      hasErrors = true
    }

    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', 'notEqual')
      hasErrors = true
    }

    return !hasErrors
  }

  const onSubmit = async (data: IChangePasswordFormData) => {
    if (!validate(data)) {
      return
    }

    setIsMakingRequest(true)

    try {
      await updateAccountDetails({
        password: data.password,
      })

      onSuccess()
    } catch (err) {
      setError('password', 'serverError')
    } finally {
      setIsMakingRequest(false)
    }
  }

  if (isMakingRequest) {
    return <Spinner />
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="user-password-change-form"
    >
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

      <Button type="submit" additionalStyles={styles.btnSubmit}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
