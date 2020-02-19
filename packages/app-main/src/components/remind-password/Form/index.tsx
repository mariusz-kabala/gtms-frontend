import React, { FC, useState } from 'react'
import useForm from 'react-hook-form'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'
import { IRemindPasswordData, remindPaassReq } from '@gtms/api-auth'

export const RemindPasswordForm: FC<{
  onSuccess: () => void
}> = ({ onSuccess }) => {
  const { t } = useTranslation('remindPassword')
  const { register, handleSubmit, errors, setError } = useForm<
    IRemindPasswordData
  >()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const onSubmit = async (data: IRemindPasswordData) => {
    if (!data.email) {
      setError('email', 'required')
      return
    }

    setIsMakingRequest(true)

    try {
      await remindPaassReq(data)
      onSuccess()
    } catch (err) {
      setError('email', 'serverError')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="remind-password-form">
      <Input
        type="email"
        placeholder={t('form.labels.email')}
        name="email"
        reference={register({ required: true })}
      />
      {errors.email && errors.email.type === 'required' && (
        <Error text={t('form.validation.email.isRequired')} />
      )}
      {errors.email && errors.email.type === 'serverError' && (
        <Error text={t('serverError')} />
      )}
      <Button type="submit" disabled={isMakingRequest}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
