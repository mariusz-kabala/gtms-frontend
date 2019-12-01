import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
import classNames from './styles.scss'
import { registerUserAccount } from 'state/user'
import { IRegistrationData } from 'api/auth'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'


export const RegistrationForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  const { register, handleSubmit, errors, setError } = useForm<
    IRegistrationData
  >()
  const onSubmit = async (data: IRegistrationData) => {
    const { password, passwordConfirmation } = data

    if (password !== passwordConfirmation) {
      setError(
        'passwordConfirmation',
        'notMatch',
        t('form.validation.passwordConfirmation.notMatch')
      )
      return
    }

    try {
      await registerUserAccount(data)
    } catch (err) {}
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames.item}>
          <label htmlFor='email'>{t('form.labels.email')}</label>
          <Input
            type='email'
            name='email'
            placeholder={t('form.labels.password')}
            ref={register({ required: true })}
          />
          {errors.email && (
            <Error text={t('form.validation.email.isRequired')} />
          )}
        </div>
        <div className={classNames.item}>
          <Input
            type='text'
            name='name'
            placeholder={t('form.labels.name')}
            ref={register} />
        </div>
        <div className={classNames.item}>
          <label htmlFor='password'>{t('form.labels.password')}</label>
          <Input
            type="password"
            placeholder={t('form.labels.password')}
            name='password'
            reference={register({ required: true })}
          />
          {errors.password && (
            <Error text={t('form.validation.password.isRequired')} />
          )}
        </div>
        <div className={classNames.item}>
          <label htmlFor='passwordConfirmation'>
            {t('form.labels.passwordConfirmation')}
          </label>
          <Input
            type="password"
            placeholder={t('form.labels.password')}
            name='passwordConfirmation'
            reference={register({ required: true })}
          />
          {errors.passwordConfirmation && (
            <Error text={t('form.validation.passwordConfirmation.isRequired')} />
          )}
        </div>
        <div>
          <Button
            disabled={false}
            className={classNames.button}>
            {t('form.submitButton')}
          </Button>
        </div>
      </form>
    </div>
  )
}
