import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { redirect } from '@gtms/commons/helpers/redirect'
import { useInitState } from '@gtms/commons/hooks'
import { IPromotedTag } from '@gtms/commons/models'
// state
import { hasAuthSessionCookies } from '@gtms/state-user'
import {
  initPromoted,
  loadGroupPromotedTags,
  promotedTagsQuery,
  IPromotedTagsState,
} from '@gtms/state-tag'
// components
import { LoginContent } from '../../../components/login/Content'
// ui
import { TagsGrid } from '@gtms/ui/TagsGrid'
// styles
import styles from './styles.scss'

export const LoginPage: NextPage<{
  promotedTags?: IPromotedTagsState
  registrationLink: string
}> = ({ promotedTags, registrationLink }) => {
  useInitState(() => {
    if (promotedTags) {
      initPromoted(promotedTags)
    }
  })
  const [state, setState] = useState<{
    isLoading: boolean
    errorOccured: boolean
    tags: IPromotedTag[]
  }>({
    isLoading: promotedTagsQuery.getValue().loading || false,
    errorOccured: promotedTagsQuery.getValue().error || false,
    tags: promotedTagsQuery.getAll(),
  })

  useEffect(() => {
    const sub = promotedTagsQuery.select().subscribe((value) => {
      setState({
        isLoading: value.loading || false,
        errorOccured: value.error || false,
        tags: promotedTagsQuery.getAll(),
      })
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <LoginContent registrationLink={registrationLink}>
      {!state.errorOccured && (
        <TagsGrid
          isLoading={state.isLoading}
          tags={state.tags}
          additionalStyles={styles.tagsGrid}
        />
      )}
    </LoginContent>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  const { id, group } = ctx?.query

  await loadGroupPromotedTags(id as string)

  return Promise.resolve({
    namespacesRequired: ['login'],
    promotedTags: promotedTagsQuery.getValue(),
    registrationLink: `/registration/${group}/${id}`,
  })
}

export default LoginPage
