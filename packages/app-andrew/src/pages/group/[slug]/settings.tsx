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
import { GroupDeleteGroup } from 'components/group/GroupDeleteGroup'
import { BasicSettings } from 'components/group-settings/Basic'
import { TagsSettings } from 'components/group-settings/Tags'
import { ImagesSettings } from 'components/group-settings/Images'
import { AdminsSettings } from 'components/group-settings/Admins'
import { MembersSettings } from 'components/group-settings/Members'
import { InvitationsSettings } from 'components/group-settings/Invitations'
import { redirect } from '@gtms/commons/helpers/redirect'
import { GroupType, GroupVisibility } from '@gtms/commons/enums'
import { IGroup } from '@gtms/commons/models'
import { useInitState } from '@gtms/commons/hooks'
// ui
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

type GroupSettingsPageProps = {
  namespacesRequired: readonly string[]
  slug: string
}

enum Tabs {
  general = 'general',
  images = 'images',
  tags = 'tags',
  invitations = 'invitations',
  admins = 'admins',
  members = 'members',
  delete = 'delete',
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
          <p>Can not fetch group details, try again later</p>
        )}

        {!group.isLoading && !group.errorOccured && (
          <>
            <div className={styles.navigation}>
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
                    [styles.current]: tab === Tabs.images,
                  })}
                >
                  <a onClick={() => setTab(Tabs.images)} href="#images">
                    Images
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
                <li
                  className={cx({
                    [styles.current]: tab === Tabs.delete,
                  })}
                >
                  <a href="#delete" onClick={() => setTab(Tabs.delete)}>
                    Delete Group
                  </a>
                </li>
              </ul>
            </div>

            {tab === Tabs.general && (
              <BasicSettings
                slug={group.group?.slug || ''}
                name={group.group?.name || ''}
                description={group.group?.description || ''}
                visibility={group.group?.visibility || GroupVisibility.public}
                type={group.group?.type || GroupType.public}
              />
            )}

            {tab === Tabs.images && (
              <ImagesSettings avatar={group.group?.avatar} />
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

            {tab === Tabs.delete && (
              <GroupDeleteGroup
                additionalStyles={styles.btn}
                onConfirm={() => null}
              />
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
