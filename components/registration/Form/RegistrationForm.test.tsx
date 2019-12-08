import React from 'react'
import { render, act } from '@testing-library/react'
import { RegistrationForm } from './index'
import useForm from 'react-hook-form'
import { ILoginData } from 'api/auth'
import { FetchMock } from 'jest-fetch-mock'
import { useTranslation } from 'i18n'

const fetchMock = fetch as FetchMock

jest.mock('react-hook-form', () => {
  return jest.fn().mockImplementation(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
    setError: jest.fn(),
  }))
})

describe('<RegistrationForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(<RegistrationForm />)

    expect(getByTestId('registration-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('registration')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(<RegistrationForm />)

    expect(getByPlaceholderText('form.labels.email')).toBeInTheDocument()
    expect(getByPlaceholderText('form.labels.name')).toBeInTheDocument()
    expect(
      getByPlaceholderText('form.labels.passwordConfirmation')
    ).toBeInTheDocument()
    expect(getByPlaceholderText('form.labels.password')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(<RegistrationForm />)

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

    const { getByText } = render(<RegistrationForm />)

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
      render(<RegistrationForm />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(3)
  })

  it('Should make an request to API to register the user', async done => {
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
      render(<RegistrationForm />)
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
})
