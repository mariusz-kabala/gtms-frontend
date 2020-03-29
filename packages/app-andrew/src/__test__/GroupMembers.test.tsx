import React from 'react'
import { render } from '@testing-library/react'
import { GroupMembersPage } from '../pages/group-members'
import { useTranslation } from '@gtms/commons/i18n'

describe('<GroupMembersPage />', () => {
  it('Should render group members page', () => {
    const { getByTestId } = render(<GroupMembersPage />)

    expect(getByTestId('group-members-page')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupMembers')
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!GroupMembersPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await GroupMembersPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['groupMembers'])

    done()
  })
})
