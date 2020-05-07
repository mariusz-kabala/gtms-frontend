import React from 'react'
import { render } from '@testing-library/react'
import { useTranslation } from '@gtms/commons/i18n'
import { ClickToCopy } from './index'

describe('<ClickToCopy />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<ClickToCopy text='Wejdź na www.jedziemyna.pl' />)

    expect(getByTestId('click-to-copy')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('clickToCopyComponent')
  })
})
