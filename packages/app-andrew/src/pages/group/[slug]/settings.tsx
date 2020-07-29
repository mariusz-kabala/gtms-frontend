import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import {
  groupQuery,
  IGroupState,
  getGroup,
  markAsLoading,
} from '@gtms/state-group'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { IGroup } from '@gtms/commons/models'
import { useInitState } from '@gtms/commons/hooks'
//sections
import { AdminsSettings } from 'components/group-settings/Admins'
import { BasicSettings } from 'components/group-settings/Basic'
import { GroupDeleteGroup } from 'components/group/GroupDeleteGroup'
import { GroupAvatarSettings } from 'components/group-settings/GroupAvatar'
import { GroupBackgroundSettings } from 'components/group-settings/GroupBackground'
import { InvitationsSettings } from 'components/group-settings/Invitations'
import { MembersSettings } from 'components/group-settings/Members'
import { TagsSettings } from 'components/group-settings/Tags'
// ui
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

type GroupSettingsPageProps = {
  namespacesRequired: readonly string[]
  slug: string
}

enum Tabs {
  general = 'general',
  tags = 'tags',
  invitations = 'invitations',
  admins = 'admins',
  members = 'members',
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
        {group.isLoading && !group.errorOccured && <Spinner />}
        {!group.isLoading && group.errorOccured && (
          <ErrorWrapper>
            <h2>Can not fetch group details, try again later</h2>
          </ErrorWrapper>
        )}

        {!group.isLoading && !group.errorOccured && (
          <>
            <div className={styles.navigationWrapper}>
              <h2 className={styles.header}>{t('header')}</h2>
              <ul className={styles.navigation}>
                <li
                  className={cx({
                    [styles.current]: tab === Tabs.general,
                  })}
                >
                  <a href="#general" onClick={() => setTab(Tabs.general)}>
                    General Settings
                  </a>
                </li>
                <li
                  className={cx({
                    [styles.current]: tab === Tabs.tags,
                  })}
                >
                  <a href="#tags" onClick={() => setTab(Tabs.tags)}>
                    Tags
                  </a>
                </li>
                <li
                  className={cx({
                    [styles.current]: tab === Tabs.invitations,
                  })}
                >
                  <a
                    href="#invitations"
                    onClick={() => setTab(Tabs.invitations)}
                  >
                    Invitations
                  </a>
                </li>
                <li
                  className={cx({
                    [styles.current]: tab === Tabs.admins,
                  })}
                >
                  <a href="#admins" onClick={() => setTab(Tabs.admins)}>
                    Admins
                  </a>
                </li>
                <li
                  className={cx({
                    [styles.current]: tab === Tabs.members,
                  })}
                >
                  <a href="#members" onClick={() => setTab(Tabs.members)}>
                    Members
                  </a>
                </li>
              </ul>
            </div>

            {tab === Tabs.general && (
              <>
                <GroupAvatarSettings avatar={group.group?.avatar} />
                <GroupBackgroundSettings bg={group.group?.avatar} />
                {group.group && <BasicSettings group={group.group} />}

                <div className={styles.deleteAccount}>
                  <div className={styles.btn}>
                    <h2>Oh no! Do not</h2>
                    <GroupDeleteGroup onConfirm={() => null} />
                  </div>
                  <Picture
                    additionalStyles={styles.ohnoimage}
                    jpg={'/images/white-theme/ohno.png'}
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
          </>
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
