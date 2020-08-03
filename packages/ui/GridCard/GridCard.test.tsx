import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { GridCard } from './index'

describe('<GridCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GridCard
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis aliqua aliqua ullamco id consequat dolore aliqua laboris culpa."
        name="Johnny Silverhand"
        image={{ jpg: '/fake/img.png' }}
      />
    )

    expect(getByTestId('grid-card')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on card', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <GridCard
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis aliqua aliqua ullamco id consequat dolore aliqua laboris culpa."
        name="Johnny Silverhand"
        image={{ jpg: '/fake/img.png' }}
        onClick={onClick}
      />
    )
    fireEvent.click(getByTestId('grid-card'))

    expect(onClick).toBeCalledTimes(1)
  })
})
