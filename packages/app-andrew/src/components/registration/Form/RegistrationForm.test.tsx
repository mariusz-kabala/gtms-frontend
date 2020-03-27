import React from 'react'
import { render, act } from '@testing-library/react'
import { RegistrationForm } from './index'
import { useForm } from 'react-hook-form'
import { ILoginData } from '@gtms/api-auth'
import { FetchMock } from 'jest-fetch-mock'
import { useTranslation } from '@gtms/commons/i18n'

const fetchMock = fetch as FetchMock

jest.mock('react-hook-form', () => ({
  useForm: jest.fn().mockImplementation(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
    setError: jest.fn(),
  })),
}))

describe('<RegistrationForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(<RegistrationForm onError={jest.fn()} />)

    expect(getByTestId('registration-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('registration')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(
      <RegistrationForm onError={jest.fn()} />
    )

    expect(getByPlaceholderText('form.labels.email')).toBeInTheDocument()
    expect(getByPlaceholderText('form.labels.name')).toBeInTheDocument()
    expect(
      getByPlaceholderText('form.labels.passwordConfirmation')
    ).toBeInTheDocument()
    expect(getByPlaceholderText('form.labels.password')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(<RegistrationForm onError={jest.fn()} />)

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for email and password', () => {
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        errors: {
          email: {
            type: 'required',
          },
          password: {
            type: 'required',
          },
        },
        setError: jest.fn(),
      }
    })

    const { getByText } = render(<RegistrationForm onError={jest.fn()} />)

    expect(getByText('form.validation.email.isRequired')).toBeInTheDocument()
    expect(getByText('form.validation.password.isRequired')).toBeInTheDocument()
  })

  it('Should set errors when clicking on submit button without filling form', () => {
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: ILoginData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<RegistrationForm onError={jest.fn()} />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(3)
  })

  it('Should make an request to API to register the user', async (done) => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: '5ce208055bf8fdcf85ee2d86',
        email: 'tester@testing.jest',
        countryCode: 'PL',
        languageCode: 'pl-PL',
      })
    )
    // eslint-disable-next-line
    let onSubmit: any
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: ILoginData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError: jest.fn(),
      }
    })

    act(() => {
      render(<RegistrationForm onError={jest.fn()} />)
    })

    await act(async () => {
      await onSubmit({
        email: 'tester@testing.jest',
        password: 'loremIpsum',
        passwordConfirmation: 'loremIpsum',
        name: 'Tester',
      })
    })
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/users')
    expect(fetchMock.mock.calls.length).toEqual(1)
    done()
  })

  it('Should display validation errors returned from BE endpoint', async () => {
    fetchMock.mockResponseOnce(() =>
      Promise.resolve({
        status: 400,
        body: JSON.stringify({
          password: {
            message: 'Password is invalid',
          },
          email: {
            message: 'Email already exists',
          },
        }),
      })
    )

    // eslint-disable-next-line
    const setError = jest.fn()
    let onSubmit: any
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: ILoginData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<RegistrationForm onError={jest.fn()} />)
    })

    await act(async () => {
      await onSubmit({
        email: 'tester@testing.jest',
        password: 'loremIpsum',
        passwordConfirmation: 'loremIpsum',
        name: 'Tester',
      })
    })

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(setError).toBeCalledTimes(2)
    expect(setError).toBeCalledWith(
      'password',
      'backend',
      'Password is invalid'
    )
  })

  it('Should trigger onError callback when register endpoint returns 500', async () => {
    fetchMock.mockResponseOnce(() =>
      Promise.resolve({
        status: 500,
        body: '',
      })
    )

    // eslint-disable-next-line
    const onError = jest.fn()
    let onSubmit: any
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: ILoginData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError: jest.fn(),
      }
    })

    act(() => {
      render(<RegistrationForm onError={onError} />)
    })

    await act(async () => {
      await onSubmit({
        email: 'tester@testing.jest',
        password: 'loremIpsum',
        passwordConfirmation: 'loremIpsum',
        name: 'Tester',
      })
    })

    expect(onError).toBeCalledTimes(1)
  })

  it('Should set validation errors when password does not match', async () => {
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: ILoginData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<RegistrationForm onError={jest.fn()} />)
    })

    await act(async () => {
      await onSubmit({
        email: 'tester@testing.jest',
        password: 'loremIpsum',
        passwordConfirmation: 'wrongPass',
        name: 'Tester',
      })
    })

    expect(setError).toBeCalledTimes(1)
  })
})
