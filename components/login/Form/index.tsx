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
  const onSubmit = async (data: ILoginData) => {
    setIsMakingRequest(true)

    try {
      await loginUser(data)

      onSuccess()
    } catch (err) {
      setError('email', 'invalid', t('loginFailed'))
    }

    setIsMakingRequest(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames.item}>
          <Input ref={register({ required: true })} />
        </div>
        <div className={classNames.item}>
          <label htmlFor="email">{t('form.labels.email')}</label>
          <input
            type="email"
            name="email"
            id="email"
            ref={register({ required: true })}
          />
          {errors.email && (
            <span className={classNames.error}>
              {t('form.validation.email.isRequired')}
            </span>
          )}
        </div>
        <div className={classNames.item}>
          <label htmlFor="password">{t('form.labels.password')}</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register({ required: true })}
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
