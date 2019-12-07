import React from 'react'
import { render } from '@testing-library/react'
import { FourHundredFour } from 'components/common/FourHundredFour'
import { useTranslation } from 'i18n'

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
