import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import {
  groupQuery,
  IGroupState,
  getGroup,
  markAsLoading,
} from '@gtms/state-group'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { changePageBackground } from 'state'
import { redirect } from '@gtms/commons/helpers/redirect'
import { IGroup } from '@gtms/commons/models'
import { useInitState } from '@gtms/commons/hooks'
// components
import { Tabs, GroupSettingsSidebar } from 'components/group/Sidebar/content'
import { AdminsSettings } from 'components/group-settings/Admins'
import { BasicSettings } from 'components/group-settings/Basic'
import { GroupDeleteGroup } from 'components/group/GroupDeleteGroup'
import { GroupBackgroundSettings } from 'components/group-settings/GroupBackground'
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

  const { t } = useTranslation('groupSettingsPage')
  const [group, setGroup] = useState<IGroupState>(groupQuery.getValue())
  const [tab, setTab] = useState<Tabs>(Tabs.general)

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

    return () => {
      groupSub && !groupSub.closed && groupSub.unsubscribe()
    }
  }, [])

  if (group.notFound) {
    return (
      // @todo add translation
      <p>Group not found</p>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper} data-testid="group-settings-page">
        {group.isLoading && !group.errorOccured && (
          <Spinner additionalStyles={styles.spinner} />
        )}
        {!group.isLoading && group.errorOccured && (
          <ErrorWrapper>
            <h2>Can not fetch group details, try again later</h2>
          </ErrorWrapper>
        )}
        <GroupSettingsSidebar tab={tab} setTab={setTab} />
        {!group.isLoading && !group.errorOccured && (
          <div className={styles.content}>
            <div className={styles.navigationWrapper}>
              <h2 className={styles.header}>{t('header')}</h2>
            </div>

            {tab === Tabs.general && (
              <>
                {group.group && <GroupBackgroundSettings group={group.group} />}
                {group.group && <BasicSettings group={group.group} />}
                <GroupDeleteGroup
                  additionalStyles={styles.btnDelete}
                  onConfirm={() => null}
                />
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
        )}
      </div>
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
