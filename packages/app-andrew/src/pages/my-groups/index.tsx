import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup, FileStatus } from '@gtms/commons'
import {
  userQuery,
  loadMyGroups,
  myGroupsQuery,
  initGroups,
  addToFavs,
  removeFromFavs,
} from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import styles from './styles.scss'
import cn from 'classnames'
import { Picture } from '@gtms/ui/Picture'
import { Link } from '@gtms/commons/i18n'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

type MyGroupsPageProps = {
  namespacesRequired: readonly string[]
  groups: {
    admin: IGroup[]
    member: IGroup[]
    owner: IGroup[]
    favs: IGroup[]
  }
}

const getInitialTab = (groups: {
  admin: IGroup[]
  member: IGroup[]
  owner: IGroup[]
  favs: IGroup[]
}): 'owner' | 'admin' | 'member' => {
  if (groups.owner.length > 0) {
    return 'owner'
  }

  if (groups.admin.length > 0) {
    return 'admin'
  }

  return 'member'
}

export const MyGroupsPage: NextPage<MyGroupsPageProps> = (props) => {
  const [groups, setGroups] = useState<{
    admin: IGroup[]
    member: IGroup[]
    owner: IGroup[]
    favs: IGroup[]
  }>(props.groups)
  useEffect(() => {
    initGroups(props.groups)
  }, [props.groups])

  useEffect(() => {
    const groupSub = myGroupsQuery.groups$.subscribe((value) =>
      setGroups(value)
    )
    return () => {
      groupSub.unsubscribe()
    }
  }, [])

  const { t } = useTranslation('myGroups')
  const [currentTab, setCurrentTab] = useState<
    'owner' | 'admin' | 'member' | 'fav'
  >(getInitialTab(groups))

  return (
    <div className={styles.container}>
      <h1>{t('header')}</h1>
      <div>
        <nav>
          <ul>
            <li
              onClick={() => setCurrentTab('owner')}
              className={cn({
                [styles.current]: currentTab === 'owner',
              })}
            >
              <a>
                {t('iAmOwner')} ({groups.owner.length})
              </a>
            </li>
            <li
              onClick={() => setCurrentTab('admin')}
              className={cn({
                [styles.current]: currentTab === 'admin',
              })}
            >
              <a>
                {t('iAmAdmin')} ({groups.admin.length})
              </a>
            </li>
            <li
              onClick={() => setCurrentTab('member')}
              className={cn({
                [styles.current]: currentTab === 'member',
              })}
            >
              <a>
                {t('iAmMember')} ({groups.member.length})
              </a>
            </li>
            <li
              onClick={() => setCurrentTab('fav')}
              className={cn({
                [styles.current]: currentTab === 'fav',
              })}
            >
              <a>
                {t('favourites')} ({groups.favs.length})
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={cn(styles.content, {
            [styles.current]: currentTab === 'owner',
          })}
        >
          {groups.owner.length === 0 && <p>No records</p>}
          {groups.owner.length > 0 && (
            <ul>
              {groups.owner.map((group) => (
                <li key={`owner-${group.id}`}>
                  <i
                    onClick={() => {
                      if (myGroupsQuery.isInFavs(group)) {
                        return removeFromFavs(group)
                      }

                      addToFavs(group)
                    }}
                  >
                    {myGroupsQuery.isInFavs(group) ? (
                      <IoIosHeart />
                    ) : (
                      <IoIosHeartEmpty />
                    )}
                  </i>
                  <Link href={`/group/${group.slug}`}>
                    <a>
                      {group.avatar &&
                      group.avatar.status === FileStatus.ready &&
                      group.avatar.files['50x50'] ? (
                        <Picture {...group.avatar.files['200x200']} />
                      ) : (
                        <img src="http://via.placeholder.com/200x200" />
                      )}
                      <p>{group.name}</p>
                    </a>
                  </Link>
                  <ul>
                    <li>
                      <Link href={`/group/${group.slug}/settings`}>
                        {t('settings')}
                      </Link>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={cn(styles.content, {
            [styles.current]: currentTab === 'fav',
          })}
        >
          {groups.favs.length === 0 && <p>No records</p>}
          {groups.favs.length > 0 && (
            <ul>
              {groups.favs.map((group) => (
                <li key={`favs-${group.id}`}>
                  <i onClick={() => removeFromFavs(group)}>
                    <IoIosHeart />
                  </i>
                  <Link href={`/group/${group.slug}`}>
                    <a>
                      {group.avatar &&
                      group.avatar.status === FileStatus.ready &&
                      group.avatar.files['50x50'] ? (
                        <Picture {...group.avatar.files['200x200']} />
                      ) : (
                        <img src="http://via.placeholder.com/200x200" />
                      )}
                      <p>{group.name}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

MyGroupsPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!userQuery.isLogged()) {
    redirect('/login', ctx)
  }

  await loadMyGroups()

  return {
    namespacesRequired: ['myGroups'],
    groups: myGroupsQuery.groups(),
  }
}

export default MyGroupsPage
