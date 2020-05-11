import React from 'react'
import { render, act } from '@testing-library/react'
import { GroupCreateForm } from './index'
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

describe('<GroupCreateForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GroupCreateForm onError={jest.fn()} onSuccess={jest.fn()} />
    )

    expect(getByTestId('group-create-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupCreate')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(
      <GroupCreateForm onError={jest.fn()} onSuccess={jest.fn()} />
    )

    expect(getByPlaceholderText('form.labels.name')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(
      <GroupCreateForm onError={jest.fn()} onSuccess={jest.fn()} />
    )

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for name', () => {
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        errors: {
          name: {
            type: 'required',
          },
        },
        setError: jest.fn(),
      }
    })

    const { getByText } = render(
      <GroupCreateForm onError={jest.fn()} onSuccess={jest.fn()} />
    )

    expect(getByText('form.validation.name.isRequired')).toBeInTheDocument()
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
      render(<GroupCreateForm onError={jest.fn()} onSuccess={jest.fn()} />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(1)
  })

  it('Should display validation errors returned from BE endpoint', async () => {
    fetchMock.mockResponseOnce(() =>
      Promise.resolve({
        status: 400,
        body: JSON.stringify({
          name: {
            message: 'Name already exists',
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

    render(<GroupCreateForm onError={jest.fn()} onSuccess={jest.fn()} />)

    await act(async () => {
      await onSubmit({
        name: 'test',
      })
    })

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(setError).toBeCalledTimes(1)
  })

  it('Should trigger onError callback when create group endpoint returns 500', async () => {
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

    render(<GroupCreateForm onError={onError} onSuccess={jest.fn()} />)

    await act(async () => {
      await onSubmit({
        name: 'test',
      })
    })

    expect(onError).toBeCalledTimes(1)
  })
})
