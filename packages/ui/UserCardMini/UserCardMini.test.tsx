import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { useTranslation } from '@gtms/commons/i18n'
import { UserCardMini } from './index'

describe('<UserCardMini />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <UserCardMini
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis aliqua aliqua ullamco id consequat dolore aliqua laboris culpa."
        name="Johnny Silverhand"
        image="/fake/img.png"
      />
    )

    expect(getByTestId('user-card-mini')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('userCardMiniComponent')
  })

  it('Should trigger onClick callback when clicking on card', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <UserCardMini
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis aliqua aliqua ullamco id consequat dolore aliqua laboris culpa."
        name="Johnny Silverhand"
        image="/fake/img.png"
        onClick={onClick}
      />
    )
    fireEvent.click(getByTestId('user-card-mini'))

    expect(onClick).toBeCalledTimes(1)
  })
})
