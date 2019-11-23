import { useMemo, memo } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikActions } from 'formik'
// import { loginUser } from 'api/anonymous'
import Cookies from 'js-cookie'
import { useTranslation, translateFunc } from 'i18n'
import css from './styles.scss'
import { NFC } from 'types/nfc.d'

interface IFormValues {
  email: string
  password: string
}

const getValidate = (t: translateFunc) => (values: {
  email?: string
  password?: string
}) => {
  const errors: {
    email?: string
    password?: string
  } = {}

  if (!values.email) {
    errors.email = t('RequiredEmail')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = t('InvalidEmail')
  }

  if (!values.password) {
    errors.password = t('RequiredPassword')
  } else if (values.password.length < 8) {
    errors.password = t('InvalidPassword')
  }

  return errors
}

const getOnSubmit = (t: translateFunc) => async (
  values: { email: string; password: string },
  { setSubmitting, setFieldError }: FormikActions<IFormValues>
) => {
  setSubmitting(true)
  console.log(values)
  try {
    const tokens = await Promise.resolve({
      accessToken: '1',
      refreshToken: '2',
    }) //loginUser(values)

    Cookies.set('accessToken', tokens.accessToken)
    Cookies.set('refreshToken', tokens.refreshToken)

    window.location.replace('/')

    // redirect to / in case of successs
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

export const LoginForm: NFC<{}> = memo(() => {
  const { t } = useTranslation()
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={useMemo(() => getValidate(t), [t])}
        onSubmit={useMemo(() => getOnSubmit(t), [t])}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.item}>
              <Field type="email" placeholder={t('Email')} name="email" />
              <ErrorMessage
                component="div"
                className={css.error}
                name="email"
              />
            </div>
            <div className={css.item}>
              <Field
                type="password"
                name="password"
                placeholder={t('Password')}
              />
              <ErrorMessage
                component="div"
                className={css.error}
                name="password"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css.button}
              >
                {t('loginForm.submitButton')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
})

LoginForm.getInitialProps = async () => ({
  namespacesRequired: ['login'],
})

export default LoginForm
