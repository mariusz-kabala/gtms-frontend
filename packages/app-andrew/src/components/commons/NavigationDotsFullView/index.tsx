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
// ui
import { IoIosHeart, IoIosSettings } from 'react-icons/io'
import { FaUsers, FaUserShield, FaIdBadge } from 'react-icons/fa'
import { MockData } from '@gtms/ui/MockData'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
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
          <li className={styles.item}>
            <Link href={'/my-groups'}>
              <a>
                <i>
                  <IoIosSettings />
                </i>
                <span>Settings</span>
              </a>
            </Link>
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
            {state.isLoading && <Spinner />}
            {!state.isLoading && state.favs.docs.length === 0 && (
              <div className={styles.noRecords}>
                <MockData />
                <MockData
                  onClick={() => null}
                  text="No records, create your first group now"
                />
                <MockData numberOfElements={4} />
              </div>
            )}
            {!state.isLoading && state.favs.docs.length > 0 && (
              <ul className={styles.list}>
                {state.favs.docs.map((group) => (
                  <li key={`fav-group-${group.id}`} className={styles.item}>
                    <Link href={`/group/${group.slug}`}>
                      <Picture
                        {...getImage('50x50', group.avatar, GroupAvatarNoImage)}
                      />
                      <div className={styles.desc}>
                        <h2>Polacy w Berlinie</h2>
                        <p>
                          Sit ea elit qui velit ullamco nostrud nisi amodo irure
                          proident eiusmod cillum.
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.members,
            })}
          >
            {!state.isLoaded && state.isLoading && <Spinner />}
            {state.isLoaded && state.member.length === 0 && (
              <div className={styles.noRecords}>
                <MockData />
                <MockData
                  onClick={() => null}
                  text="No records, create your first group now"
                />
                <MockData numberOfElements={4} />
              </div>
            )}
            {state.isLoaded && state.member.length > 0 && (
              <ul className={styles.list}>
                {state.member.map((group) => (
                  <li key={`member-group-${group.id}`} className={styles.item}>
                    <Link href={`/group/${group.slug}`}>
                      <>
                        <Picture
                          {...getImage(
                            '50x50',
                            group.avatar,
                            GroupAvatarNoImage
                          )}
                        />
                        <div className={styles.desc}>
                          <h2>Polacy w Berlinie</h2>
                          <p>
                            Sit ea elit qui velit ullamco nostrud nisi amodo
                            irure proident eiusmod cillum.
                          </p>
                        </div>
                      </>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.owner,
            })}
          >
            {!state.isLoaded && state.isLoading && <Spinner />}
            {state.isLoaded && state.owner.length === 0 && (
              <div className={styles.noRecords}>
                <MockData />
                <MockData
                  onClick={() => null}
                  text="No records, create your first group now"
                />
                <MockData numberOfElements={4} />
              </div>
            )}
            {state.isLoaded && state.owner.length > 0 && (
              <ul className={styles.list}>
                {state.owner.map((group) => (
                  <li key={`owner-group-${group.id}`} className={styles.item}>
                    <Link href={`/group/${group.slug}`}>
                      <>
                        <Picture
                          {...getImage(
                            '50x50',
                            group.avatar,
                            GroupAvatarNoImage
                          )}
                        />
                        <div className={styles.desc}>
                          <h2>Polacy w Berlinie</h2>
                          <p>
                            Sit ea elit qui velit ullamco nostrud nisi amodo
                            irure proident eiusmod cillum.
                          </p>
                        </div>
                      </>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={cx(styles.content, {
              [styles.active]: currentTab == Tabs.admin,
            })}
          >
            {!state.isLoaded && state.isLoading && <Spinner />}
            {state.isLoaded && state.admin.length === 0 && (
              <div className={styles.noRecords}>
                <MockData />
                <MockData
                  onClick={() => null}
                  text="No records, create your first group now"
                />
                <MockData numberOfElements={4} />
              </div>
            )}
            {state.isLoaded && state.admin.length > 0 && (
              <ul className={styles.list}>
                {state.admin.map((group) => (
                  <li key={`admin-group-${group.id}`} className={styles.item}>
                    <Link href={`/group/${group.slug}`}>
                      <>
                        <Picture
                          {...getImage(
                            '50x50',
                            group.avatar,
                            GroupAvatarNoImage
                          )}
                        />
                        <div className={styles.desc}>
                          <h2>Polacy w Berlinie</h2>
                          <p>
                            Sit ea elit qui velit ullamco nostrud nisi amodo
                            irure proident eiusmod cillum.
                          </p>
                        </div>
                      </>
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
