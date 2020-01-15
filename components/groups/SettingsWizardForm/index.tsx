import React, { FC } from 'react'
// import styles from './styles.scss'
import useForm from 'react-hook-form'
import { useTranslation } from 'i18n'
import { ILoginData } from 'api/auth'
import { loginUser } from 'state/user'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { TextareaAutosize } from 'components/common/Forms/Textarea'
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

    setIsMakingRequest(true)

    try {
      await loginUser(data)
    } catch (err) {
      setError('email', 'invalid')
    }

    setIsMakingRequest(false)
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

      {/* <TextareaAutosize name="description" reference={register({ required: true })} /> */}
      {/* <Textarea name="description" reference={register({ required: true })} /> */}
      <TextareaAutosize
        className="textarea"
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        id="my-textarea"
        maxLength="3000"
        name="pet[notes]"
        onChange={handleChange}
        placeholder="Enter details here..."
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
