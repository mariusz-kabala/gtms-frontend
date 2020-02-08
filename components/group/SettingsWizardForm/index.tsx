import React, { FC } from 'react'
import styles from './styles.scss'
import useForm from 'react-hook-form'
import { useTranslation } from 'i18n'
import { ILoginData } from 'api/auth'
import { loginUser } from 'state/user'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import Textarea from 'react-expanding-textarea'
// import { Textarea } from 'components/common/Forms/Textarea'
import { Button } from 'components/common/Button'

export const SettingsWizardForm: FC<{}> = () => {
  const { t } = useTranslation('login')
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

    try {
      await loginUser(data)
    } catch (err) {
      setError('email', 'invalid')
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="login-form"
    >
      <Input
        type="email"
        placeholder={t('form.labels.email')}
        name="email"
        reference={register({ required: true })}
      />
      {errors.email && errors.email.type === 'required' && (
        <Error text={t('form.validation.email.isRequired')} />
      )}
      {errors.email && errors.email.type === 'invalid' && (
        <Error text={t('loginFailed')} />
      )}

      <Input
        type="password"
        placeholder={t('form.labels.password')}
        name="password"
        reference={register({ required: true })}
      />
      {errors.password && (
        <Error text={t('form.validation.password.isRequired')} />
      )}

      <Textarea
        className={styles.textarea}
        defaultValue="Lorem ipsum dolor sit amet, ..."
        id="my-textarea"
        maxLength="3000"
        name="pet[notes]"
        // onChange={handleChange}
        placeholder="Enter additional notes..."
        // ref={textareaRef}
      />

      <Button
        type="submit"
        // additionalStyles={styles.btnSubmit}
        // disabled={isMakingRequest}
      >
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
