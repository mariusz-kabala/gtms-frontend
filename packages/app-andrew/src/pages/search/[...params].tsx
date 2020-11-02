import React from 'react'
import { SearchPage as SearchPageComponent, Tabs } from 'components/search/page'
import { NextPage, NextPageContext } from 'next'

type IParsedParamsResult = {
  tag: string[]
  user: string[]
  page: string[]
  tab: Tabs
}
const parseParams = (
  params: string[] | string | undefined
): IParsedParamsResult => {
  const result: IParsedParamsResult = {
    tag: [],
    user: [],
    tab: Tabs.posts,
    page: [],
  }

  if (!Array.isArray(params)) {
    return result
  }

  type IParam = 'tag' | 'post' | 'user' | 'page' | null

  let index: IParam = null
  const tabsList: string[] = [Tabs.posts, Tabs.groups, Tabs.users]

  for (const param of params) {
    if (tabsList.includes(param)) {
      result.tab = param as Tabs
      continue
    }

    if (['tag', 'user', 'page'].includes(param)) {
      index = param as 'tag' | 'user' | 'page'
      continue
    }

    if (index !== null) {
      result[index].push(param as any)
    }
  }

  return result
}

export const SearchPage: NextPage<{
  initialTab?: Tabs
  tags?: string[]
  namespacesRequired: readonly string[]
}> = (params) => {
  return <SearchPageComponent {...params} />
}

SearchPage.getInitialProps = (ctx: NextPageContext) => {
  const { params } = ctx?.query
  const { tag, tab, user } = parseParams(params)
  return Promise.resolve({
    namespacesRequired: ['searchPage'],
    initialTab: tab,
    tags: tag,
    users: user,
  })
}

export default SearchPage
