import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
import classNames from './styles.scss'

interface IRegistrationPayload {
  email: string
  username?: string
  password: string
  passwordConfirmation: string
}

export const RegistrationForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  const { register, handleSubmit, errors, setError } = useForm()
  const onSubmit = (data: any) => {
    const { password, passwordConfirmation } = data

    if (password !== passwordConfirmation) {
      setError(
        'passwordConfirmation',
        'notMatch',
        t('form.validation.passwordConfirmation.notMatch')
      )
      return
    }

    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit()}>
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
          <label htmlFor="username">{t('form.labels.username')}</label>
          <input type="text" name="username" id="username" ref={register} />
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
        <div className={classNames.item}>
          <label htmlFor="passwordConfirmation">
            {t('form.labels.passwordConfirmation')}
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            ref={register({ required: true })}
          />
          {errors.passwordConfirmation && (
            <span className={classNames.error}>
              {t('form.validation.passwordConfirmation.isRequired')}
            </span>
          )}
        </div>
        <div>
          <button type="submit" disabled={false} className={classNames.button}>
            {t('form.submitButton')}
          </button>
        </div>
      </form>
    </div>
  )
}

RegistrationForm.getInitialProps = async () => ({
  namespacesRequired: ['registration'],
})
