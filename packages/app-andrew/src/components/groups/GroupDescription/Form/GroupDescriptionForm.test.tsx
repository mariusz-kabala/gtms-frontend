import React from 'react'
import { render, act } from '@testing-library/react'
import { GroupDescriptionForm } from './index'
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

describe('<GroupDescriptionForm />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GroupDescriptionForm
        text={'example'}
        slug={'slug'}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    )

    expect(getByTestId('group-description-form')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupDescription')
  })

  it('Should have all required fields', () => {
    const { getByPlaceholderText, getByText } = render(
      <GroupDescriptionForm
        text={'example'}
        slug={'slug'}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    )

    expect(getByPlaceholderText('form.labels.description')).toBeInTheDocument()
    expect(getByText('form.submitButton')).toBeInTheDocument()
  })

  it('Should not display any errors when just loaded', () => {
    const { queryByTestId } = render(
      <GroupDescriptionForm
        text={'example'}
        slug={'slug'}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    )

    expect(queryByTestId('form-error')).toBeNull()
  })

  it('Should display validation errors for description', () => {
    ;(useForm as jest.Mock).mockImplementationOnce(() => {
      return {
        register: jest.fn(),
        handleSubmit: jest.fn(),
        errors: {
          description: {
            type: 'required',
          },
        },
        setError: jest.fn(),
      }
    })

    const { getByText } = render(
      <GroupDescriptionForm
        text={'example'}
        slug={'slug'}
        onSuccess={jest.fn()}
        onError={jest.fn()}
      />
    )

    expect(
      getByText('form.validation.description.isRequired')
    ).toBeInTheDocument()
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
      render(
        <GroupDescriptionForm
          onError={jest.fn()}
          text={'example'}
          slug={'slug'}
          onSuccess={jest.fn()}
        />
      )

      onSubmit({})
    })

    expect(setError).toBeCalledTimes(1)
  })
})
