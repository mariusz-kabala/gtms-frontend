import React from 'react'
import { SearchPage as SearchPageComponent } from '@app/components/search/page'
import { NextPage } from 'next'

export const SearchPage: NextPage<{}> = () => {
  return <SearchPageComponent />
}

SearchPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
