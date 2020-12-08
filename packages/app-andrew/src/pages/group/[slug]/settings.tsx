import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import {
  groupQuery,
  IGroupState,
  getGroup,
  markAsLoading,
} from '@gtms/state-group'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { changePageBackground, clearPageBackground } from 'state'
import { redirect } from '@gtms/commons/helpers/redirect'
import { IGroup } from '@gtms/commons/models'
import { useInitState } from '@gtms/commons/hooks'
// state
import {
  IGroupSettingsPageState,
  groupSettingsPageState,
  groupSettingsPageState$,
} from 'queries/groupSettingsPage.query'
// components
import { GroupHeader } from 'components/group/GroupHeader'
import { PromotedTags } from 'components/group/PromotedTags'
import { GroupDeleteGroup } from 'components/group/GroupDeleteGroup'
import {
  GroupSettingsSidebar,
  Tabs,
} from 'components/group/GroupSettingsSidebar'
import { AdminsSettings } from 'components/group-settings/Admins'
import { BasicSettings } from 'components/group-settings/Basic'
import { GroupBackgroundSettings } from 'components/group-settings/GroupBackground'
import { GroupMembers } from 'components/group/GroupMembers'
// sections
import { InvitationsSettings } from 'components/group-settings/Invitations'
import { MembersSettings } from 'components/group-settings/Members'
import { TagsSettings } from 'components/group-settings/Tags'
// ui
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

type GroupSettingsPageProps = {
  namespacesRequired: readonly string[]
  slug: string
}

const getInitialTab = () => {
  if (typeof window === 'undefined') {
    return Tabs.general
  }
  const urlTab = window.location.hash.substr(1)

  return Object.values(Tabs).includes(urlTab as any)
    ? Tabs[urlTab as Tabs]
    : Tabs.general
}

export const GroupSettingsPage: NextPage<GroupSettingsPageProps> = ({
  slug,
}) => {
  useInitState(markAsLoading)

  const [group, setGroup] = useState<IGroupState>(groupQuery.getValue())
  const [tab, setTab] = useState<Tabs>(Tabs.general)
  const [state, setState] = useState<IGroupSettingsPageState>(
    groupSettingsPageState()
  )

  useEffect(() => {
    setTab(getInitialTab())
    getGroup(slug as string)

    const groupSub = groupQuery.allState$.subscribe((value) => {
      if (!value.isLoading && !groupQuery.hasAdminRights()) {
        return redirect(`/group/${slug}`)
      }

      if (value.group?.bgType) {
        changePageBackground(value.group?.bgType)
      }

      setGroup(value)
    })

    const sub = groupSettingsPageState$.subscribe((value) => {
      setState(value)
    })

    return () => {
      clearPageBackground()
      groupSub && !groupSub.closed && groupSub.unsubscribe()
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (group.notFound) {
    return (
      <ErrorWrapper>
        <h2>Group not found</h2>
      </ErrorWrapper>
    )
  }

  return (
    <div className={styles.pageWrapper} data-testid="group-settings-page">
      <GroupHeader />
      {state.showPromoted && (
        <PromotedTags additionalStyles={styles.tags} onTagClick={() => null} />
      )}
      {state.showUsers && (
        <GroupMembers
          additionalStyles={styles.groupMembers}
          slug={state.groupSlug}
          {...state.members}
        />
      )}
      {group.isLoading && !group.errorOccured && (
        <Spinner additionalStyles={styles.spinner} />
      )}
      {!group.isLoading && group.errorOccured && (
        <ErrorWrapper>
          <h2>Can not fetch group details, try again later</h2>
        </ErrorWrapper>
      )}
      {!group.isLoading && !group.errorOccured && (
        <div className={styles.columns}>
          <GroupSettingsSidebar
            additionalStyles={styles.sidebar}
            tab={tab}
            setTab={setTab}
          />
          <div className={styles.content}>
            {tab === Tabs.general && (
              <>
                {group.group && <GroupBackgroundSettings group={group.group} />}
                {group.group && <BasicSettings group={group.group} />}
                <div className={styles.btnDeleteWrapper}>
                  <GroupDeleteGroup
                    additionalStyles={styles.btnDelete}
                    onConfirm={() => null}
                  />
                </div>
              </>
            )}

            {tab === Tabs.tags && (
              <TagsSettings
                id={group.group?.id || ''}
                tags={group.group?.tags || []}
              />
            )}

            {tab === Tabs.invitations && (
              <InvitationsSettings group={group.group as IGroup} />
            )}

            {tab === Tabs.admins && (
              <AdminsSettings group={group.group as IGroup} />
            )}

            {tab === Tabs.members && (
              <MembersSettings group={group.group as IGroup} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

GroupSettingsPage.getInitialProps = async (ctx: NextPageContext) => {
  const { slug } = ctx?.query

  if (!hasAuthSessionCookies(ctx)) {
    redirect(`/login`, ctx)
  }

  return Promise.resolve({
    namespacesRequired: ['groupSettingsPage'],
    slug: slug as string,
  })
}

export default GroupSettingsPage
