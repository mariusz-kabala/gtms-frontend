import React from 'react'
import { render, act } from '@testing-library/react'
import { GroupCreateForm } from './index'
import useForm from 'react-hook-form'
import { IGroupCreateData } from 'api/group'
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

describe('<GroupCreateForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupCreateForm />)

    expect(getByTestId('group-create-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupCreate')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(<GroupCreateForm />)

    expect(getByPlaceholderText('form.labels.name')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(<GroupCreateForm />)

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for group name', () => {
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

    const { getByText } = render(<GroupCreateForm />)

    expect(getByText('form.validation.name.isRequired')).toBeInTheDocument()
  })

  it('Should set errors when clicking on submit button without filling form', () => {
    // eslint-disable-next-line
    let onSubmit: any
    const setError = jest.fn()
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: (func: (data: IGroupCreateData) => Promise<void>) => {
          onSubmit = func
        },
        errors: {},
        setError,
      }
    })

    act(() => {
      render(<GroupCreateForm />)

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(1)
  })
})
