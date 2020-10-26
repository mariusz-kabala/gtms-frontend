import React, { useState } from 'react'
import { NextPage } from 'next'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { IUser, IGroup } from '@gtms/commons/models'
import { getRecentUsers, usersListQuery } from '@gtms/state-user'
import { getRecentGroups, groupsListQuery } from '@gtms/state-group'
// ui
import { Button } from '@gtms/ui/Button'
import { InviteFriends } from '@gtms/ui/InviteFriends'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import { RecentlyCreatedGroups } from 'components/home/RecentlyCreatedGroups'
import { RecentlyRegisteredUsers } from '@gtms/ui/RecentlyRegisteredUsers'
import { SearchBar } from '@gtms/ui/SearchBar'
import styles from './styles.scss'

type HomePageProps = {
  groups: IGroup[]
  namespacesRequired: readonly string[]
  users: IUser[]
}

export const HomePage: NextPage<HomePageProps> = ({ groups, users }) => {
  const { t } = useTranslation('homePage')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <div
        data-testid="home-page"
        className={styles.pageWrapper}
      >
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <InviteFriends />
          </Modal>
        )}
        <div className={styles.welcomeSlider}>
          <Picture jpg={'/images/white-theme/spotted-bg-highschool.png'} />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.sections}>
            <div className={styles.headerWrapper}>
              <h1 className={styles.header}>spotted.pl</h1>
              <p className={styles.desc}>
                Aliquip officia voluptate voluptate nulla lorem ipsum dolor
                officia in incididunt labore.
              </p>
              <SearchBar
                onTagAdd={() => null}
                onTagRemove={() => null}
                onLoadSuggestion={() => null}
                onQueryChange={() => null}
                onLoadSuggestionCancel={() => null}
              />
              <Button
                additionalStyles={styles.btn}
                onClick={() => setIsModalOpen(true)}
                type="submit"
              >
                {t('btn')}
              </Button>
            </div>
            <div className={cx(styles.section, styles.recentlyCreatedGroups)}>
              <RecentlyCreatedGroups
                createYourOwnGroup={true}
                groups={groups}
              />
            </div>
            <div className={cx(styles.section, styles.recentlyRegisteredUsers)}>
              <RecentlyRegisteredUsers users={users} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

HomePage.getInitialProps = async () => {
  const [users, groups] = await Promise.all([
    getRecentUsers(0, 10)
      .then(() => {
        return usersListQuery.getAll()
      })
      .catch(() => {
        return []
      }),
    getRecentGroups(0, 18)
      .then(() => {
        return groupsListQuery.getAll()
      })
      .catch(() => []),
  ])
  return {
    namespacesRequired: ['homePage'],
    users,
    groups,
  }
}

export default HomePage
