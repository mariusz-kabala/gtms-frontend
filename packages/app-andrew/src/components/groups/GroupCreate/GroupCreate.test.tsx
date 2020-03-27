import React from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { render, act } from '@testing-library/react'
import { GroupCreate } from './index'
import { GroupCreateForm } from './Form'

jest.mock('./Form', () => ({
  GroupCreateForm: jest.fn().mockImplementation(() => <></>),
}))

describe('<GroupCreate />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupCreate />)

    expect(getByTestId('group-create')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupCreate')

    expect(GroupCreateForm).toBeCalled()
  })

  it('Should display an error when group creation fails', async () => {
    let onErrorCallback: () => unknown
    ;(GroupCreateForm as jest.Mock).mockImplementation(
      (params: { onError: () => unknown }) => {
        onErrorCallback = params.onError

        return <></>
      }
    )

    const { queryByTestId, getByTestId } = render(<GroupCreate />)

    expect(queryByTestId('group-create-error-indicator')).toBeNull()

    act(() => onErrorCallback())

    expect(getByTestId('group-create-error-indicator')).toBeInTheDocument()
  })
})
