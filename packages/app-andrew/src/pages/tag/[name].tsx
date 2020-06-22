import React, { useState, useEffect } from 'react'
import { fetchTaggedGroups, IRecentGroupsResponse } from '@gtms/api-group'
import { initGroupsList } from '@gtms/state-group'
import { fetchTaggedUsers, ITagUsersResponse } from '@gtms/api-auth'
import { initUsersList } from '@gtms/state-user'
import {
  ITagPageState,
  tagPageState,
  tagPageState$,
} from 'queries/tagPage.query'
import { useInitState } from '@gtms/commons/hooks'
import { FourHundredFour } from '@gtms/ui/FourHundredFour'
import { NextPage, NextPageContext } from 'next'
import { GroupsList } from 'components/tag/GroupsList'
import { UsersList } from 'components/tag/UsersList'

export interface TagPageProps {
  namespacesRequired: readonly string[]
  groups: IRecentGroupsResponse | null
  users: ITagUsersResponse | null
}

const TagPage: NextPage<TagPageProps> = ({ groups, users }) => {
  useInitState(() => {
    groups && initGroupsList(groups)
    users && initUsersList(users)
  })
  const [state, setState] = useState<ITagPageState>(tagPageState())

  useEffect(() => {
    const sub = tagPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (groups === null) {
    return <FourHundredFour />
  }

  return (
    <div data-testid="tag-page">
      <GroupsList
        records={state.groups.docs}
        isLoading={state.groups.isLoading}
      />
      <UsersList records={state.users.docs} isLoading={state.users.isLoading} />
    </div>
  )
}

TagPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<TagPageProps> => {
  const { name } = ctx?.query
  const tags = (name as string)
    .split(',')
    .map((tag) => (tag !== '' ? tag.trim() : null))
    .filter((tag) => tag !== null)
    .slice(0, 9) as string[]

  if (tags.length > 0) {
    return Promise.all([
      fetchTaggedGroups(tags, 0, 25),
      fetchTaggedUsers(tags, 0, 25),
    ]).then((data) => {
      const [groups, users] = data

      return {
        namespacesRequired: ['tagPage'],
        groups,
        users,
      }
    })
  }

  return {
    namespacesRequired: ['tagPage'],
    groups: null,
    users: null,
  }
}

export default TagPage
