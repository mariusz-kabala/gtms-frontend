import React from 'react'
import {
  SearchPage as SearchPageComponent,
  Tabs,
} from '@app/components/search/page'
import { NextPage, NextPageContext } from 'next'

type IParsedParamsResult = {
  page: string[]
  tab: Tabs
  tag: string[]
  user: string[]
}
const parseParams = (
  params: string[] | string | undefined
): IParsedParamsResult => {
  const result: IParsedParamsResult = {
    page: [],
    tab: Tabs.posts,
    tag: [],
    user: [],
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
  namespacesRequired: readonly string[]
  tags?: string[]
}> = (params) => {
  return <SearchPageComponent {...params} />
}

SearchPage.getInitialProps = (ctx: NextPageContext) => {
  const { params } = ctx?.query
  const { tag, tab, user } = parseParams(params)
  return Promise.resolve({
    initialTab: tab,
    namespacesRequired: ['searchPage'],
    tags: tag,
    users: user,
  })
}

export default SearchPage
