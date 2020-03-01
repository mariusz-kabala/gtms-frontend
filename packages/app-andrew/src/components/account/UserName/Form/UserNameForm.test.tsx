import React from 'react'
import { render, act } from '@testing-library/react'
import { UserNameChangeForm } from './index'
import { useForm } from 'react-hook-form'

// where I should this one below?
import { IUserNameData } from '@gtms/commons/types/userAccount'

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

describe('<UserNameChangeForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(<UserNameChangeForm />)

    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('userNameChangeForm')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(<UserNameChangeForm />)

    expect(getByPlaceholderText('form.labels.name')).toBeInTheDocument()
    expect(getByPlaceholderText('form.labels.surname')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(<UserNameChangeForm />)

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for name and surname', () => {
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        errors: {
          name: {
            type: 'required',
          },
          surname: {
            type: 'required',
          },
        },
        setError: jest.fn(),
      }
    })

    const { getByText } = render(<UserNameChangeForm />)

    expect(getByText('form.validation.name.isRequired')).toBeInTheDocument()
    expect(getByText('form.validation.surname.isRequired')).toBeInTheDocument()
  })

  it('Should set errors when clicking on submit button without filling form', () => {
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IUserNameData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<UserNameChangeForm />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(2)
  })

  it('Should show no errors when data is valid', () => {
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IUserNameData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<UserNameChangeForm />)

      onSubmit({
        name: 'Tester',
        surname: 'Test',
      })
    })

    expect(setError).toBeCalledTimes(0)
  })
})
