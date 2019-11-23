import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
import classNames from './styles.scss'

export const RegistrationForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames.item}>
          <label htmlFor="email">{t('form.email')}</label>
          <input
            type="email"
            name="email"
            id="email"
            ref={register({ required: true })}
          />
          {errors.email && <span>{t('emailIsRequired')}</span>}
        </div>
        <div className={classNames.item}>
          <label htmlFor="username">{t('form.username')}</label>
          <input type="text" name="username" id="username" ref={register} />
          {errors.email && <span>{t('emailIsRequired')}</span>}
        </div>
        <div className={classNames.item}>
          <label htmlFor="password">{t('form.password')}</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register({ required: true })}
          />
          {errors.password && <span>{t('passwordIsRequired')}</span>}
        </div>
        <div className={classNames.item}>
          <label htmlFor="passwordConfirmation">
            {t('form.passwordConfirmation')}
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            ref={register({ required: true })}
          />
          {errors.passwordConfirmation && (
            <span>{t('passwordConfirmationIsRequired')}</span>
          )}
        </div>
        <div>
          <button type="submit" disabled={false} className={classNames.button}>
            {t('submitButton')}
          </button>
        </div>
      </form>
    </div>
  )
}

RegistrationForm.getInitialProps = async () => ({
  namespacesRequired: ['registration'],
})
