import { useMemo, memo } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikActions } from 'formik'
import { IRegisterUserReqPayload, registerUser } from 'api/anonymous'
import Link from 'next/link'
import cx from 'classnames'
import { useTranslation, translateFunc } from 'i18n'
import css from './styles.scss'
import { NFC } from 'types/nfc.d'

const getValidate = (t: translateFunc) => (values: {
  name?: string
  email?: string
  password?: string
  'confirm-password'?: string
}) => {
  const errors: {
    name?: string
    email?: string
    password?: string
    'confirm-password'?: string
  } = {}
  if (!values.email) {
    errors.email = t('RequiredEmail')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = t('InvalidEmail')
  }

  if (!values.password) {
    errors.password = t('RequiredPassword')
  }

  if (!values['confirm-password']) {
    errors['confirm-password'] = t('RequiredPassword')
  }

  if (
    !errors.password &&
    !errors['confirm-password'] &&
    values.password !== values['confirm-password']
  ) {
    errors.password = t('PasswordsAreNotEqual')
  }

  return errors
}

const getOnSubmit = (t: translateFunc) => async (
  values: IRegisterUserReqPayload,
  { setSubmitting, setFieldError }: FormikActions<IRegisterUserReqPayload>
) => {
  setSubmitting(true)

  try {
    await registerUser(values)

    window.location.replace('/')
  } catch (err) {
    if (err.status === 400) {
      const errors = await err.json()
      Object.keys(errors).forEach(field => {
        setFieldError(field, t(`${field}-${errors[field].kind}-error`))
      })
    } else {
      // general error here
    }
  }

  setSubmitting(false)
}

export const RegistrationForm: NFC<{}> = memo(() => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validate={useMemo(() => getValidate(t), [t])}
      onSubmit={useMemo(() => getOnSubmit(t), [t])}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <input
            autoComplete="false"
            name="hidden"
            type="text"
            style={{ display: 'none' }}
          />
          <div
            className={cx({
              [css.errorItem]: errors.name,
              [css.item]: !errors.name,
            })}
          >
            <Field type={'name'} placeholder={t('Fullname')} name={'name'} />
            <ErrorMessage component="div" className={css.error} name="name" />
          </div>
          <div
            className={cx({
              [css.errorItem]: errors.email,
              [css.item]: !errors.email,
            })}
          >
            <Field type={'email'} name={'email'} placeholder={t('Email')} />
            <ErrorMessage component="div" className={css.error} name="email" />
          </div>
          <div
            className={cx({
              [css.errorItem]: errors.password,
              [css.item]: !errors.password,
            })}
          >
            <Field
              type={'password'}
              name={'password'}
              placeholder={t('Password')}
            />
            <ErrorMessage
              component="div"
              className={css.error}
              name="password"
            />
          </div>
          <div
            className={cx({
              [css.errorItem]: errors.confirmPassword,
              [css.item]: !errors.confirmPassword,
            })}
          >
            <Field
              type={'password'}
              name={'confirmPassword'}
              placeholder={t('ConfirmPassword')}
            />
            <ErrorMessage
              component="div"
              className={css.error}
              name="confirmPassword"
            />
          </div>
          <div>
            <label htmlFor="confirmRules">
              <input
                checked={false}
                id="confirmRules"
                type="checkbox"
                name="confirmRules"
                value="1"
                style={{ display: 'inline-block' }}
                onChange={() => null}
              />
              <Link href="/rules">
                <a className={css.link} href="/rules">
                  {t('registrationForm.acceptRules')}
                </a>
              </Link>
            </label>
          </div>
          <div>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {t('registrationForm.submitButton')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
})

export default RegistrationForm
