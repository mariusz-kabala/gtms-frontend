import React from 'react'
import { render } from '@testing-library/react'
import { FourHundredFour } from '@gtms/ui/FourHundredFour'
import { useTranslation } from '@gtms/commons/i18n'

describe('<FourHundredFour />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<FourHundredFour />)

    expect(getByTestId('four-hundred-four')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('page404')
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <FourHundredFour additionalStyles={'cssTest'} />
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
