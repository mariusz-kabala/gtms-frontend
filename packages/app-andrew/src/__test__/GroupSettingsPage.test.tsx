import React from 'react'
import { render } from '@testing-library/react'
import { GroupSettingsPage } from '../pages/group-settings/index'

describe('<GroupSettings />', () => {
  it('Should render on the page', () => {
    const { getByTestId } = render(<GroupSettingsPage />)
    expect(getByTestId('group-name')).toBeInTheDocument()
    expect(getByTestId('settings-page')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!GroupSettingsPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await GroupSettingsPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['groupSettings'])

    done()
  })
})
