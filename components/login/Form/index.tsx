import React, { FC, useState } from 'react'
import useForm from 'react-hook-form'
import { useTranslation } from 'i18n'
import { ILoginData } from 'api/auth'
import classNames from './styles.scss'
import { loginUser } from 'state/user'
import { Input } from 'components/common/Forms/Input'
import { Button } from 'components/common/Button'

export const LoginForm: FC<{ onSuccess: () => unknown }> = ({ onSuccess }) => {
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

      onSuccess()
    } catch (err) {
      setError('email', 'invalid')
    }

    setIsMakingRequest(false)
  }

  return (
    <div data-testid="login-form">
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
        <div className={classNames.item}>
          <Input
            type="password"
            placeholder={t('form.labels.password')}
            name="password"
            reference={register({ required: true })}
          />
          {errors.password && (
            <span className={classNames.error}>
              {t('form.validation.password.isRequired')}
            </span>
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
