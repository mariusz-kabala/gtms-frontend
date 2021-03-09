import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import {
  INavigationDotsFullViewState,
  navigationDotsFullViewState,
  navigationDotsFullViewState$,
} from './state.query'
// ui
import { GroupsList } from './GroupsList'
import { IoIosHeart } from 'react-icons/io'
import { FaUsers, FaUserShield, FaIdBadge } from 'react-icons/fa'
import styles from './styles.scss'

enum Tabs {
  favs,
  members,
  owner,
  admin,
}

export const NavigationDotsFullView: FC = () => {
  const [state, setState] = useState<INavigationDotsFullViewState>(
    navigationDotsFullViewState()
  )

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.favs)

  useEffect(() => {
    const sub = navigationDotsFullViewState$.subscribe((value) =>
      setState(value)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="navigation-dots-full-view">
      <div className={styles.navWrapper}>
        <h2 className={styles.header}>All my groups:</h2>
        <ul className={styles.nav}>
          <li
            onClick={() => setCurrentTab(Tabs.favs)}
            className={cx(styles.item, {
              [styles.active]: currentTab == Tabs.favs,
            })}
          >
            <a>
              <i>
                <IoIosHeart />
              </i>
              <span>Favs {state.isLoaded && `(${state.favs.total})`}</span>
            </a>
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.members)}
            className={cx(styles.item, {
              [styles.active]: currentTab == Tabs.members,
            })}
          >
            <a>
              <i>
                <FaUsers />
              </i>
              <span>Member {state.isLoaded && `(${state.member.length})`}</span>
            </a>
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.owner)}
            className={cx(styles.item, {
              [styles.active]: currentTab == Tabs.owner,
            })}
          >
            <a>
              <i>
                <FaUserShield />
              </i>
              <span>
                Owned by me {state.isLoaded && `(${state.owner.length})`}
              </span>
            </a>
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.admin)}
            className={cx(styles.item, {
              [styles.active]: currentTab == Tabs.admin,
            })}
          >
            <a>
              <i>
                <FaIdBadge />
              </i>
              <span>
                Admined by me {state.isLoaded && `(${state.admin.length})`}
              </span>
            </a>
          </li>
        </ul>
      </div>

      {state.errorOccurred && !state.isLoading && (
        <p>Error occured, please try to refresh the page</p>
      )}

      {!state.errorOccurred && (
        <>
          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.favs,
            })}
          >
            <GroupsList
              noRecordsText={'No records, add your first group to favs!'}
              groups={state.favs.docs}
              isLoading={state.isLoading}
            />
          </div>

          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.members,
            })}
          >
            <GroupsList
              noRecordsText={'No records, join some groups first'}
              groups={state.member}
              isLoading={state.isLoading}
            />
          </div>

          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.owner,
            })}
          >
            <GroupsList
              noRecordsText={'No records, create your first group now'}
              groups={state.owner}
              isLoading={state.isLoading}
            />
          </div>

          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.admin,
            })}
          >
            <GroupsList groups={state.admin} noRecordsText={'No records'} />
          </div>
        </>
      )}
    </div>
  )
}
