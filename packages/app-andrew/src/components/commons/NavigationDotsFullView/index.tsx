import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import {
  INavigationDotsFullViewState,
  navigationDotsFullViewState,
  navigationDotsFullViewState$,
} from './state.query'
import { Link } from '@gtms/commons/i18n'
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage } from 'enums'
import { Spinner } from '@gtms/ui/Spinner'
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

enum Tabs {
  favs,
  members,
  owner,
  admin,
}

export const NavigationDotsFullView: FC<{}> = () => {
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
    <div data-testid="navigation-dots-full-view">
      <nav className={styles.nav}>
        <ul>
          <li
            onClick={() => setCurrentTab(Tabs.favs)}
            className={cx({
              [styles.current]: currentTab == Tabs.favs,
            })}
          >
            <a>Favs {state.isLoaded && `(${state.favs.total})`}</a>
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.members)}
            className={cx({
              [styles.current]: currentTab == Tabs.members,
            })}
          >
            <a>Member {state.isLoaded && `(${state.member.length})`}</a>
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.owner)}
            className={cx({
              [styles.current]: currentTab == Tabs.owner,
            })}
          >
            <a>Owned by me {state.isLoaded && `(${state.owner.length})`}</a>
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.admin)}
            className={cx({
              [styles.current]: currentTab == Tabs.admin,
            })}
          >
            <a>Admined by me {state.isLoaded && `(${state.admin.length})`}</a>
          </li>
          <li>
            <Link href={'/my-groups'}>
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      </nav>

      {state.errorOccurred && !state.isLoading && (
        <p>Error occured, please try to refresh the page</p>
      )}

      {!state.errorOccurred && (
        <>
          <div
            className={cx(styles.content, {
              [styles.show]: currentTab == Tabs.favs,
            })}
          >
            {state.isLoading && <Spinner />}
            {!state.isLoading && state.favs.docs.length === 0 && (
              <p className={styles.noRecords}>
                No records, try to add some groups to your favs first
              </p>
            )}
            {!state.isLoading && state.favs.docs.length > 0 && (
              <ul>
                {state.favs.docs.map((group) => (
                  <li key={`fav-group-${group.id}`}>
                    <Link href={`/group/${group.slug}`}>
                      <Picture
                        {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cx(styles.content, {
              [styles.show]: currentTab == Tabs.members,
            })}
          >
            {!state.isLoaded && state.isLoading && <Spinner />}
            {state.isLoaded && state.member.length === 0 && (
              <p className={styles.noRecords}>
                No records, you need to join some groups first
              </p>
            )}
            {state.isLoaded && state.member.length > 0 && (
              <ul>
                {state.member.map((group) => (
                  <li key={`member-group-${group.id}`}>
                    <Link href={`/group/${group.slug}`}>
                      <Picture
                        {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cx(styles.content, {
              [styles.show]: currentTab == Tabs.owner,
            })}
          >
            {!state.isLoaded && state.isLoading && <Spinner />}
            {state.isLoaded && state.owner.length === 0 && (
              <p className={styles.noRecords}>
                No records, create your first group now
              </p>
            )}
            {state.isLoaded && state.owner.length > 0 && (
              <ul>
                {state.owner.map((group) => (
                  <li key={`owner-group-${group.id}`}>
                    <Link href={`/group/${group.slug}`}>
                      <Picture
                        {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cx(styles.content, {
              [styles.show]: currentTab == Tabs.admin,
            })}
          >
            {!state.isLoaded && state.isLoading && <Spinner />}
            {state.isLoaded && state.admin.length === 0 && (
              <p className={styles.noRecords}>No records</p>
            )}
            {state.isLoaded && state.admin.length > 0 && (
              <ul>
                {state.admin.map((group) => (
                  <li key={`admin-group-${group.id}`}>
                    <Link href={`/group/${group.slug}`}>
                      <Picture
                        {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}
