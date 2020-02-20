import React from 'react'
import { render, act } from '@testing-library/react'
import { RemindPasswordForm } from './index'
import { FetchMock } from 'jest-fetch-mock'
import { useForm } from 'react-hook-form'
import { IRemindPasswordData } from '@gtms/api-auth'
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

describe('<RemindPasswordForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(<RemindPasswordForm onSuccess={jest.fn()} />)

    expect(getByTestId('remind-password-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('remindPassword')
  })

  it('Should have email field and submit button', () => {
    const { getByPlaceholderText, getByText } = render(
      <RemindPasswordForm onSuccess={jest.fn()} />
    )

    expect(getByPlaceholderText('form.labels.email')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(
      <RemindPasswordForm onSuccess={jest.fn()} />
    )

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for email field', () => {
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

    const { getByText } = render(<RemindPasswordForm onSuccess={jest.fn()} />)

    expect(getByText('form.validation.email.isRequired')).toBeInTheDocument()
  })

  it('Should display server errors when 500 from API response', () => {
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        errors: {
          email: {
            type: 'serverError',
          },
        },
        setError: jest.fn(),
      }
    })

    const { getByText } = render(<RemindPasswordForm onSuccess={jest.fn()} />)

    expect(getByText('serverError')).toBeInTheDocument()
  })

  it('Should set errors when clicking on submit button without filling form', () => {
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IRemindPasswordData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<RemindPasswordForm onSuccess={jest.fn()} />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(1)
  })

  it('Should make an request to API to login the user', async done => {
    fetchMock.mockResponseOnce('{}')
    // eslint-disable-next-line
    let onSubmit: any
    const onSuccess = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IRemindPasswordData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError: jest.fn(),
      }
    })

    act(() => {
      render(<RemindPasswordForm onSuccess={onSuccess} />)
    })

    await act(async () => {
      await onSubmit({
        email: 'tester@testing.jest',
      })
    })

    expect(onSuccess).toBeCalledTimes(1)
    expect(fetchMock.mock.calls.length).toEqual(1)
    done()
  })

  it('Should set server error message when 500 from API response', async done => {
    fetchMock.mockRejectOnce(new Error('fake error'))
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IRemindPasswordData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    render(<RemindPasswordForm onSuccess={jest.fn()} />)

    await act(async () => {
      await onSubmit({
        email: 'tester@testing.jest',
      })
    })

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(setError).toBeCalledTimes(1)

    done()
  })
})
