import React from 'react'
import { render } from '@testing-library/react'
import { useTranslation } from '@gtms/commons/i18n'
import { UserCard } from './index'

describe('<UserCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <UserCard onClose={jest.fn()} image="/fake/img.png" />
    )

    expect(getByTestId('user-card')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('userCardComponent')
  })
})
