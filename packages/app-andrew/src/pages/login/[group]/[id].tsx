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
import { LoginContent } from '@app/components/login/Content'
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
    errorOccured: boolean
    isLoading: boolean
    tags: IPromotedTag[]
  }>({
    errorOccured: promotedTagsQuery.getValue().error || false,
    isLoading: promotedTagsQuery.getValue().loading || false,
    tags: promotedTagsQuery.getAll(),
  })

  useEffect(() => {
    const sub = promotedTagsQuery.select().subscribe((value) => {
      setState({
        errorOccured: value.error || false,
        isLoading: value.loading || false,
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
          additionalStyles={styles.tagsGrid}
          isLoading={state.isLoading}
          tags={state.tags}
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
