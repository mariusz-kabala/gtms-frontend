import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import {
  loadMyGroups,
  myGroupsQuery,
  addToFavs,
  removeFromFavs,
  hasAuthSessionCookies,
  markMyGroupsAsLoading,
} from '@gtms/state-user'
import {
  myGroupsPageState,
  myGroupsPageState$,
  IMyGroupsPageState,
} from 'queries'
import { redirect } from '@gtms/commons/helpers/redirect'
import { Link } from '@gtms/commons/i18n'
import { IoIosHeartEmpty, IoIosHeart, IoIosSettings } from 'react-icons/io'
import { GroupsList } from '../../components/my-groups/GroupsList'
import { Spinner } from '@gtms/ui/Spinner'
import { useInitState } from '@gtms/commons/hooks'

type MyGroupsPageProps = {
  namespacesRequired: readonly string[]
}

export const MyGroupsPage: NextPage<MyGroupsPageProps> = () => {
  useInitState(markMyGroupsAsLoading)
  const [state, setState] = useState<IMyGroupsPageState>(myGroupsPageState())

  useEffect(() => {
    loadMyGroups(true)
    const sub = myGroupsPageState$.subscribe((value) => setState(value))
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  const { t } = useTranslation('myGroups')
  const [currentTab, setCurrentTab] = useState<
    'owner' | 'admin' | 'member' | 'fav'
  >('member')

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        {state.isLoading && <Spinner additionalStyles={styles.spinner} />}
        {!state.isLoading && state.errorOccurred && (
          <p>Can not fetch list of your groups now. please try again later</p>
        )}
        {!state.isLoading && !state.errorOccurred && (
          <>
            <div className={styles.navigation}>
              <h2>My groups</h2>
              <ul className={styles.items}>
                <li
                  onClick={() => setCurrentTab('owner')}
                  className={cx(styles.item, {
                    [styles.current]: currentTab === 'owner',
                  })}
                >
                  <a>
                    {t('iAmOwner')} ({state.owner.length})
                  </a>
                </li>
                <li
                  onClick={() => setCurrentTab('admin')}
                  className={cx(styles.item, {
                    [styles.current]: currentTab === 'admin',
                  })}
                >
                  <a>
                    {t('iAmAdmin')} ({state.admin.length})
                  </a>
                </li>
                <li
                  onClick={() => setCurrentTab('member')}
                  className={cx(styles.item, {
                    [styles.current]: currentTab === 'member',
                  })}
                >
                  <a>
                    {t('iAmMember')} ({state.member.length})
                  </a>
                </li>
                <li
                  onClick={() => setCurrentTab('fav')}
                  className={cx(styles.item, {
                    [styles.current]: currentTab === 'fav',
                  })}
                >
                  <a>
                    {t('favourites')}{' '}
                    {state.favs.length && `(${state.favs.length})`}
                  </a>
                </li>
              </ul>
            </div>

            <GroupsList
              additionalStyles={cx({
                [styles.currentList]: currentTab === 'owner',
              })}
              groups={state.owner}
              renderFavsIcon={(group) =>
                myGroupsQuery.isInFavs(group) ? (
                  <IoIosHeart />
                ) : (
                  <IoIosHeartEmpty />
                )
              }
              renderGroupMenu={(group) => (
                <div className={styles.groupSettings}>
                  <Link href={`/group/${group.slug}/settings`}>
                    <>
                      <i>
                        <IoIosSettings />
                      </i>
                      {t('settings')}
                    </>
                  </Link>
                </div>
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
              additionalStyles={cx(styles.groupsList, {
                [styles.currentList]: currentTab === 'fav',
              })}
              groups={state.favs}
              renderFavsIcon={() => <IoIosHeart />}
              renderGroupMenu={() => null}
              noRecords={
                <div>
                  <p>You do not have any favs groups</p>
                  <Link href="/search">
                    <a>Find some!</a>
                  </Link>
                </div>
              }
              onFavsClick={(group) => removeFromFavs(group)}
            />

            <GroupsList
              additionalStyles={cx(styles.groupsList, {
                [styles.currentList]: currentTab === 'admin',
              })}
              groups={state.admin}
              renderFavsIcon={(group) =>
                myGroupsQuery.isInFavs(group) ? (
                  <IoIosHeart />
                ) : (
                  <IoIosHeartEmpty />
                )
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
              additionalStyles={cx(styles.groupsList, {
                [styles.currentList]: currentTab === 'member',
              })}
              groups={state.member}
              renderFavsIcon={(group) =>
                myGroupsQuery.isInFavs(group) ? (
                  <IoIosHeart />
                ) : (
                  <IoIosHeartEmpty />
                )
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
          </>
        )}
      </div>
    </div>
  )
}

MyGroupsPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!hasAuthSessionCookies(ctx)) {
    redirect('/login', ctx)
  }

  return {
    namespacesRequired: ['myGroups'],
  }
}

export default MyGroupsPage
