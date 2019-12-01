import React, { FC, useState } from 'react'
import useForm from 'react-hook-form'
import { Input } from 'components/common/Forms/Input'
import { Button } from 'components/common/Button'
import { useTranslation } from 'i18n'
import { IRemindPasswordData, remindPaassReq } from 'api/auth'
import classNames from './styles.scss'

export const RemindPasswordForm: FC<{}> = () => {
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
    } catch (err) {
      setError('email', 'serverError')
    }
  }

  return (
    <div data-testid="remind-password-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames.item}>
          <Input
            type="email"
            placeholder={t('form.labels.email')}
            name="email"
            reference={register({ required: true })}
          />
          {errors.email && errors.email.type === 'required' && (
            <span className={classNames.error}>
              {t('form.validation.email.isRequired')}
            </span>
          )}
          {errors.email && errors.email.type === 'invalid' && (
            <span className={classNames.error}>{t('loginFailed')}</span>
          )}
        </div>
        <div>
          <Button
            additionalStyles={classNames.button}
            type="submit"
            disabled={isMakingRequest}
          >
            {t('form.submitButton')}
          </Button>
        </div>
      </form>
    </div>
  )
}
