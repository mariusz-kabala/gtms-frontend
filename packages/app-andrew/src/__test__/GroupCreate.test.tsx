import React from 'react'
import { render } from '@testing-library/react'
import { GroupCreatePage } from '../pages/group-create'

describe('<GroupCreatePage />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<GroupCreatePage />)

    expect(getByTestId('group-create-page')).toBeInTheDocument()
    expect(getByTestId('group-create')).toBeInTheDocument()
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!GroupCreatePage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await GroupCreatePage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['groupCreate'])

    done()
  })
})
