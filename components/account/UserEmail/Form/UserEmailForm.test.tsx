import React from 'react'
import { render, act } from '@testing-library/react'
import { UserEmailChangeForm } from './index'
import useForm from 'react-hook-form'
import { IUserEmailData } from 'userAccount/userEmail'
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

describe('<UserEmailChangeForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(<UserEmailChangeForm />)

    expect(getByTestId('userEmailChangeForm')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('userEmailChangeForm')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(<UserEmailChangeForm />)

    expect(getByPlaceholderText('form.labels.email')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(<UserEmailChangeForm />)

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for email', () => {
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        errors: {
          email: {
            type: 'required',
          },
        },
        setError: jest.fn(),
      }
    })

    const { getByText } = render(<UserEmailChangeForm />)

    expect(getByText('form.validation.email.isRequired')).toBeInTheDocument()
  })

  it('Should set errors when clicking on submit button without filling form', () => {
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IUserEmailData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {
          email: {
            type: 'required',
          },
        },
        setError,
      }
    })

    act(() => {
      render(<UserEmailChangeForm />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(1)
  })
})
