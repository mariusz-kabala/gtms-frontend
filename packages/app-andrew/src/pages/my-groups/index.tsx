import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons'
import {
  userQuery,
  loadMyGroups,
  myGroupsQuery,
  initGroups,
  addToFavs,
  removeFromFavs,
} from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { Link } from '@gtms/commons/i18n'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { GroupsList } from '../../components/my-groups/GroupsList'

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
      groupSub && !groupSub.closed && groupSub.unsubscribe()
    }
  }, [])

  const { t } = useTranslation('myGroups')
  const [currentTab, setCurrentTab] = useState<
    'owner' | 'admin' | 'member' | 'fav'
  >(getInitialTab(groups))

  return (
    <div className={styles.wrapper}>
      <div className={styles.notFound}>
        <div className={styles.desc}>
          <h2>{t('header')}</h2>
          <p>
            Nisi officia incididunt adipisicing commodo eiusmod exercitation.
          </p>
        </div>
        <img src="/images/polandrock/camping-image.png" />
      </div>
      <div>
        <nav>
          <ul>
            <li
              onClick={() => setCurrentTab('owner')}
              className={cx({
                [styles.current]: currentTab === 'owner',
              })}
            >
              <a>
                {t('iAmOwner')} ({groups.owner.length})
              </a>
            </li>
            <li
              onClick={() => setCurrentTab('admin')}
              className={cx({
                [styles.current]: currentTab === 'admin',
              })}
            >
              <a>
                {t('iAmAdmin')} ({groups.admin.length})
              </a>
            </li>
            <li
              onClick={() => setCurrentTab('member')}
              className={cx({
                [styles.current]: currentTab === 'member',
              })}
            >
              <a>
                {t('iAmMember')} ({groups.member.length})
              </a>
            </li>
            <li
              onClick={() => setCurrentTab('fav')}
              className={cx({
                [styles.current]: currentTab === 'fav',
              })}
            >
              <a>
                {t('favourites')} ({groups.favs.length})
              </a>
            </li>
          </ul>
        </nav>

        <GroupsList
          additionalStyles={cx({
            [styles.currentList]: currentTab === 'owner',
          })}
          groups={groups.owner}
          renderFavsIcon={(group) =>
            myGroupsQuery.isInFavs(group) ? <IoIosHeart /> : <IoIosHeartEmpty />
          }
          renderGroupMenu={(group) => (
            <ul>
              <li>
                <Link href={`/group/${group.slug}/settings`}>
                  {t('settings')}
                </Link>
              </li>
            </ul>
          )}
          noRecords={
            <div>
              <p>You do not own any group, maybe its time to create one?</p>
              <p>
                <Link href="/group-create">
                  <a>Create a group!</a>
                </Link>
              </p>
            </div>
          }
          onFavsClick={(group) => {
            if (myGroupsQuery.isInFavs(group)) {
              return removeFromFavs(group)
            }

            addToFavs(group)
          }}
        />

        <GroupsList
          additionalStyles={cx({
            [styles.currentList]: currentTab === 'fav',
          })}
          groups={groups.favs}
          renderFavsIcon={() => <IoIosHeart />}
          renderGroupMenu={() => null}
          noRecords={
            <div>
              <p>You do not have any favs groups</p>
              <p>
                <Link href="/search">
                  <a>Find some!</a>
                </Link>
              </p>
            </div>
          }
          onFavsClick={(group) => removeFromFavs(group)}
        />

        <GroupsList
          additionalStyles={cx({
            [styles.currentList]: currentTab === 'admin',
          })}
          groups={groups.admin}
          renderFavsIcon={(group) =>
            myGroupsQuery.isInFavs(group) ? <IoIosHeart /> : <IoIosHeartEmpty />
          }
          renderGroupMenu={() => null}
          noRecords={<p>No records</p>}
          onFavsClick={(group) => {
            if (myGroupsQuery.isInFavs(group)) {
              return removeFromFavs(group)
            }

            addToFavs(group)
          }}
        />
        <GroupsList
          additionalStyles={cx({
            [styles.currentList]: currentTab === 'member',
          })}
          groups={groups.member}
          renderFavsIcon={(group) =>
            myGroupsQuery.isInFavs(group) ? <IoIosHeart /> : <IoIosHeartEmpty />
          }
          renderGroupMenu={() => null}
          noRecords={
            <div>
              <p>You do not belong to any group</p>
              <p>
                <Link href="/search">
                  <a>Find a group and join!</a>
                </Link>
              </p>
            </div>
          }
          onFavsClick={(group) => {
            if (myGroupsQuery.isInFavs(group)) {
              return removeFromFavs(group)
            }

            addToFavs(group)
          }}
        />
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
