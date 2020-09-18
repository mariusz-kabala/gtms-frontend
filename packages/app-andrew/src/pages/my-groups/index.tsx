import React, { useEffect, useState, useCallback, FC } from 'react'
import { NextPage, NextPageContext } from 'next'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import {
  loadMyGroups,
  updateFavGroupsOrder,
  hasAuthSessionCookies,
  markMyGroupsAsLoading,
  checkGroupsFavStatus,
} from '@gtms/state-user'
import {
  myGroupsPageState,
  myGroupsPageState$,
  IMyGroupsPageState,
} from 'queries'
import { redirect } from '@gtms/commons/helpers/redirect'
import { Link } from '@gtms/commons/i18n'
import { GroupsList } from 'components/my-groups/GroupsList'
import { FavsButton } from 'components/group/FavsButton'
import { FollowButton } from 'components/group/FollowButton'
import { SettingsButton } from 'components/group/SettingsButton'
import { AddFavToMenuButton } from 'components/my-groups/AddFavToMenuButton'
import { useInitState } from '@gtms/commons/hooks'
import { FAVS_GROUPS_MENU_LIMIT } from '@gtms/commons/consts'
// ui
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

type MyGroupsPageProps = {
  namespacesRequired: readonly string[]
}

const GroupMenu: FC<{
  group: IGroup
}> = ({ group, children }) => {
  return (
    <div className={styles.groupMenu}>
      <FavsButton group={group} />
      <SettingsButton group={group} />
      <FollowButton group={group} />
      {children}
    </div>
  )
}

const GroupMenuWithExtraFavs: FC<{
  group: IGroup
  isInMenuFavs: boolean
  onClickAddFavToMenuButton: (group: IGroup) => unknown
}> = ({ group, isInMenuFavs, onClickAddFavToMenuButton }) => {
  return (
    <GroupMenu group={group}>
      <AddFavToMenuButton
        onClick={onClickAddFavToMenuButton}
        isChecked={isInMenuFavs}
        group={group}
      />
    </GroupMenu>
  )
}

export const MyGroupsPage: NextPage<MyGroupsPageProps> = () => {
  useInitState(markMyGroupsAsLoading)
  const [state, setState] = useState<IMyGroupsPageState>(myGroupsPageState())

  const [favsInMenu, setFavsInMenu] = useState<{
    isChanged: boolean
    favs: string[]
    isInitialized: boolean
  }>({
    isChanged: false,
    isInitialized: false,
    favs: [],
  })

  useEffect(() => {
    loadMyGroups(true)
    const sub = myGroupsPageState$.subscribe((value) => setState(value))
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (favsInMenu.isInitialized || state.favs?.offset !== 0) {
      return
    }

    const favs = []

    for (
      let x = 0;
      x < FAVS_GROUPS_MENU_LIMIT && x < state.favs.docs.length;
      x++
    ) {
      favs.push(state.favs.docs[x].id)
    }

    if (favs.length > 0) {
      setFavsInMenu({
        favs,
        isChanged: false,
        isInitialized: true,
      })
    }
  }, [favsInMenu, state])

  useEffect(() => {
    const favsToCheck: string[] = []

    if (Array.isArray(state.admin) && state.admin.length > 0) {
      for (const group of state.admin) {
        if (!favsToCheck.includes(group.id)) {
          favsToCheck.push(group.id)
        }
      }
    }

    if (Array.isArray(state.member) && state.member.length > 0) {
      for (const group of state.member) {
        if (!favsToCheck.includes(group.id)) {
          favsToCheck.push(group.id)
        }
      }
    }

    if (Array.isArray(state.owner) && state.owner.length > 0) {
      for (const group of state.owner) {
        if (!favsToCheck.includes(group.id)) {
          favsToCheck.push(group.id)
        }
      }
    }

    if (Array.isArray(state.favs?.docs) && state.favs.docs.length > 0) {
      for (const group of state.favs.docs) {
        if (!favsToCheck.includes(group.id)) {
          favsToCheck.push(group.id)
        }
      }
    }

    if (favsToCheck.length > 0) {
      checkGroupsFavStatus(favsToCheck)
    }
  }, [state])

  const onAddFavToMenuClick = useCallback(
    (group: IGroup) => {
      const index = favsInMenu.favs.indexOf(group.id)

      if (index === -1) {
        if (favsInMenu.favs.length >= FAVS_GROUPS_MENU_LIMIT) {
          return
        }

        setFavsInMenu((state) => ({
          isInitialized: true,
          isChanged: true,
          favs: [...state.favs, group.id],
        }))
      } else {
        const favs = favsInMenu.favs
        favs.splice(index, 1)

        setFavsInMenu({
          isInitialized: true,
          isChanged: true,
          favs: [...favs],
        })
      }
    },
    [favsInMenu]
  )

  const { t } = useTranslation('myGroups')
  const [currentTab, setCurrentTab] = useState<
    'owner' | 'admin' | 'member' | 'fav'
  >('member')

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        {state.isLoading && <Spinner centered />}
        {!state.isLoading && state.errorOccurred && (
          <ErrorWrapper>
            <h2>
              Can not fetch list of your groups now. please try again later
            </h2>
          </ErrorWrapper>
        )}
        {!state.isLoading && !state.errorOccurred && (
          <>
            <div className={styles.navigation}>
              <h2 className={styles.header}>My groups</h2>
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
                    {t('favourites')} ({state.favs.total})
                  </a>
                </li>
              </ul>
            </div>

            <GroupsList
              additionalStyles={cx({
                [styles.currentList]: currentTab === 'owner',
              })}
              groups={state.owner}
              renderGroupMenu={(group) => <GroupMenu group={group} />}
              noRecords={
                <>
                  <p>You do not own any group, maybe its time to create one?</p>
                  <Link href="/group-create">
                    <a>Create a group!</a>
                  </Link>
                </>
              }
            />

            <GroupsList
              additionalStyles={cx(styles.groupsList, {
                [styles.currentList]: currentTab === 'fav',
              })}
              groups={state.favs.docs}
              renderGroupMenu={(group) => (
                <GroupMenuWithExtraFavs
                  group={group}
                  isInMenuFavs={favsInMenu.favs.includes(group.id)}
                  onClickAddFavToMenuButton={onAddFavToMenuClick}
                />
              )}
              noRecords={
                <div>
                  <p>You do not have any favs groups</p>
                  <Link href="/search">
                    <a>Find some!</a>
                  </Link>
                </div>
              }
            />

            <GroupsList
              additionalStyles={cx(styles.groupsList, {
                [styles.currentList]: currentTab === 'admin',
              })}
              groups={state.admin}
              renderGroupMenu={(group) => <GroupMenu group={group} />}
              noRecords={<p className={styles.noRecords}>No records</p>}
            />

            <GroupsList
              additionalStyles={cx(styles.groupsList, {
                [styles.currentList]: currentTab === 'member',
              })}
              groups={state.member}
              renderGroupMenu={(group) => <GroupMenu group={group} />}
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
            />
          </>
        )}

        {favsInMenu.isChanged && (
          <Button
            additionalStyles={styles.btnSaveChanges}
            onClick={() => {
              updateFavGroupsOrder(favsInMenu.favs)
              setFavsInMenu((value) => ({
                ...value,
                isInitialized: false,
              }))
            }}
          >
            Save changes
          </Button>
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
