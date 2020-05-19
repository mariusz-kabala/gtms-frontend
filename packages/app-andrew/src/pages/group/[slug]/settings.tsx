import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { groupQuery, IGroupStore, getGroup, initGroup } from '@gtms/state-group'
import { GroupDeleteGroup } from '../../../components/groups/GroupDeleteGroup'
import { BasicSettings } from '../../../components/group-settings/Basic'
import { TagsSettings } from '../../../components/group-settings/Tags'
import { ImagesSettings } from '../../../components/group-settings/Images'
import { redirect } from '@gtms/commons/helpers/redirect'
import { GroupType, GroupVisibility } from '@gtms/commons/enums'
import cn from 'classnames'

type GroupSettingsPageProps = {
  namespacesRequired: readonly string[]
  group: IGroupStore
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

export const GroupSettingsPage: NextPage<GroupSettingsPageProps> = (props) => {
  const { t } = useTranslation('groupSettingsPage')
  const [group, setGroup] = useState<IGroupStore>(props.group)
  const [tab, setTab] = useState<Tabs>(Tabs.general)

  useEffect(() => {
    setTab(getInitialTab())
    initGroup(props.group)
    const groupSub = groupQuery.allState$.subscribe((value) => setGroup(value))

    return () => {
      groupSub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="group-settings-page">
      <h2 className={styles.header}>{t('header')}</h2>
      <p>
        Eiusmod anim Lorem fugiat voluptate minim sint id occaecat nostrud
        dolor. Exercitation mollit duis id excepteur tempor. Ut veniam in
        adipisicing laborum Lorem fugiat reprehenderit magna excepteur in labore
        tempor fugiat ad. Lorem irure incididunt esse dolor eu dolore enim Lorem
        dolore. Excepteur irure qui fugiat est ea incididunt enim.
      </p>

      <div>
        <ul>
          <li
            className={cn({
              [styles.current]: tab === Tabs.general,
            })}
          >
            <a href="#general" onClick={() => setTab(Tabs.general)}>
              General Settings
            </a>
          </li>
          <li
            className={cn({
              [styles.current]: tab === Tabs.images,
            })}
          >
            <a onClick={() => setTab(Tabs.images)} href="#images">
              Images
            </a>
          </li>
          <li
            className={cn({
              [styles.current]: tab === Tabs.tags,
            })}
          >
            <a href="#tags" onClick={() => setTab(Tabs.tags)}>
              Tags
            </a>
          </li>
          <li
            className={cn({
              [styles.current]: tab === Tabs.invitations,
            })}
          >
            <a href="#invitations" onClick={() => setTab(Tabs.invitations)}>
              Invitations
            </a>
          </li>
          <li
            className={cn({
              [styles.current]: tab === Tabs.admins,
            })}
          >
            <a href="#admins" onClick={() => setTab(Tabs.admins)}>
              Admins
            </a>
          </li>
          <li
            className={cn({
              [styles.current]: tab === Tabs.members,
            })}
          >
            <a href="#members" onClick={() => setTab(Tabs.members)}>
              Members
            </a>
          </li>
          <li
            className={cn({
              [styles.current]: tab === Tabs.delete,
            })}
          >
            <a href="#delete" onClick={() => setTab(Tabs.delete)}>
              Delete Group
            </a>
          </li>
        </ul>
        <div className={styles.content}>
          {tab === Tabs.general && (
            <BasicSettings
              slug={group.group?.slug || ''}
              name={group.group?.name || ''}
              description={group.group?.description || ''}
              visibility={group.group?.visibility || GroupVisibility.public}
              type={group.group?.type || GroupType.public}
            />
          )}
          {tab === Tabs.tags && (
            <TagsSettings
              id={group.group?.id || ''}
              tags={group.group?.tags || []}
            />
          )}
          {tab === Tabs.delete && (
            <GroupDeleteGroup
              additionalStyles={styles.btn}
              onConfirm={() => null}
            />
          )}
          {tab === Tabs.images && (
            <ImagesSettings avatar={group.group?.avatar} />
          )}
        </div>
      </div>
    </div>
  )
}

GroupSettingsPage.getInitialProps = async (ctx: NextPageContext) => {
  const { slug } = ctx?.query

  await getGroup(slug as string)

  if (!groupQuery.hasAdminRights()) {
    redirect(`/group/${slug}`, ctx)
  }

  return {
    namespacesRequired: ['groupSettingsPage'],
    group: groupQuery.getValue(),
  }
}

export default GroupSettingsPage
