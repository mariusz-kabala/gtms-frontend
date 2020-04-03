import React from 'react'
import { render } from '@testing-library/react'
import { GroupTagsPage } from '../pages/group-tags'
import { useTranslation } from '@gtms/commons/i18n'

describe('<GroupTagsPage />', () => {
  it('Should render group tags page', () => {
    const { getByTestId } = render(<GroupTagsPage />)

    expect(getByTestId('group-tags-page')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupTags')
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!GroupTagsPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await GroupTagsPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['groupTags'])

    done()
  })
})
