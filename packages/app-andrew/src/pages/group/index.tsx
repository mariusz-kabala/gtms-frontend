import React, { useState } from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { Button } from '@gtms/ui/Button'
import { useTranslation } from '@gtms/commons/i18n'
import { PostCreate } from '@gtms/ui/PostCreate'
import { PostSingle } from '@gtms/ui/PostSingle'
import { UserCardMini } from '@gtms/ui/UserCardMini'
import { SideMenu, MenuItem } from '@gtms/ui/SideMenu'
import {
  IoMdHome,
  IoIosKeypad,
  IoIosBody,
  IoMdSettings,
  IoMdAdd,
  IoMdBuild,
  IoMdBonfire,
} from 'react-icons/io'

const GroupPage: NextPage<{}> = () => {
  const { t } = useTranslation('groupPage')
  const [isSiteMenuExpanded, toggleSideMenu] = useState<boolean>(false)

  const onToggleSideMenu = (isSideMenuExpanded: boolean) => {
    toggleSideMenu(isSideMenuExpanded)
  }

  return (
    <div className={styles.wrapper}>
      <SideMenu
        isExpanded={isSiteMenuExpanded}
        onToggleExpand={onToggleSideMenu}
      >
        <MenuItem Icon={IoMdHome} Content={<div>Home</div>} />
        {/*<MenuItem
          Icon={IoIosKeypad}
          Content={<div onClick={() => alert('On Item Click')}>Posts</div>}
        />
        <MenuItem Icon={IoIosBody} Content={<div>Tags</div>} />
        <MenuItem Icon={IoMdSettings} Content={<div>Group Settings</div>} />
        <MenuItem Icon={IoMdAdd} Content={<div>Invite freinds</div>} />
        <MenuItem Icon={IoMdBuild} Content={<div>Lorem ipsum</div>} />
        <MenuItem
          Icon={IoMdBonfire}
          Content={
            <div onClick={() => toggleSideMenu(!isSiteMenuExpanded)}>
              Toggle Side Menu from outsite
            </div>
          }
        />*/}
      </SideMenu>

      <div className={styles.content}>
        <div className={styles.banner}>
          <div className={styles.frame}>
            <div className={styles.desc}>
              <h2>{t('header')}</h2>
              <p>
                Elit excepteur id veniam ea consequat eu excepteur exercitation
                ullamco nisi sint elit Lorem irure. Exercitation laborum sit
                proident occaecat dolore pariatur esse tempor fugiat magna
                incididunt aliquip ullamco.
              </p>
              <Button type="submit" additionalStyles={styles.btn}>
                Add Post
              </Button>
              <Button type="submit" additionalStyles={styles.btn}>
                Zaproś znajomych
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <div className={styles.grid}>
                <UserCardMini image={'/images/temp_images/logo-patrol-1.png'} />
                <UserCardMini image={'/images/temp_images/logo-patrol-2.png'} />
                <UserCardMini image={'/images/temp_images/logo-sztab-1.png'} />
                <UserCardMini image={'/images/temp_images/logo-sztab-2.png'} />
              </div>
            </div>
            <div>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <div className={styles.grid}>
                <UserCardMini image={'/images/temp_images/logo-sztab-3.png'} />
                <UserCardMini
                  image={'/images/temp_images/logo-uczymy-ratowac.png'}
                />
                <UserCardMini
                  image={'/images/temp_images/logo-wielki-mecz.png'}
                />
                <UserCardMini image={'/images/temp_images/logo-zbc.png'} />
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <h2 className={styles.header}>Ostatnio dodane posty</h2>
            <PostCreate additionalStyles={styles.postCreate} />
            <PostSingle additionalStyles={styles.post} />
            <PostSingle additionalStyles={styles.post} />
            <PostSingle additionalStyles={styles.post} />
            <PostSingle additionalStyles={styles.post} />
            <PostSingle additionalStyles={styles.post} />
            <PostSingle additionalStyles={styles.post} />
          </div>
        </div>
      </div>
    </div>
  )
}

GroupPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupPage', 'postCreate'] })
}

export default GroupPage
