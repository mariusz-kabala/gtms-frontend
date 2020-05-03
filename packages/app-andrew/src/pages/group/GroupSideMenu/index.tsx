import React, { useState } from 'react'
import { SideMenu } from '@gtms/ui/SideMenu'
import { MenuItem } from '@gtms/ui/SideMenu/MenuItem'
import styles from './styles.scss'

import {
  IoIosKeypad,
  IoIosBody,
  IoMdSettings,
  IoMdAdd,
  IoMdBuild,
  IoMdBonfire,
} from 'react-icons/io'

const GROUP_MENU_LOGO_PATH = '/images/temp_images/side_bar_logo.png'

const MenuHeader = () => {
  return (
    <>
      <div className={styles.link}>SzukamAndrzeja.pl</div>
      <div>Festiwalowe spotteed!</div>
    </>
  )
}

export const GroupSideMenu = () => {
  const [isSiteMenuExpanded, toggleSideMenu] = useState<boolean>(false)

  const onToggleSideMenu = (isSideMenuExpanded: boolean) => {
    toggleSideMenu(isSideMenuExpanded)
  }

  return (
    <SideMenu
      isExpanded={isSiteMenuExpanded}
      onToggleExpand={onToggleSideMenu}
      menuLogoPath={GROUP_MENU_LOGO_PATH}
      menuHeader={<MenuHeader />}
      additionalStyles={styles.groupSideMenu}
    >
      <MenuItem
        collapsedContent={
          <IoIosBody
            size={20}
            onClick={() => toggleSideMenu(!isSiteMenuExpanded)}
          />
        }
        expandedContent={<span>Lorem</span>}
      />
      <MenuItem
        collapsedContent={
          <IoIosKeypad size={20} onClick={() => alert('Alert')} />
        }
        expandedContent={
          <div onClick={() => alert('On Item Click')}>
            Posts (alert on click)
          </div>
        }
      />
      <MenuItem
        collapsedContent={<IoIosBody size={20} />}
        expandedContent={<span>Tags</span>}
      />
      <MenuItem
        collapsedContent={<IoMdSettings size={20} />}
        expandedContent={<span>Group Settings</span>}
      />
      <MenuItem
        collapsedContent={<IoMdAdd size={20} />}
        expandedContent={<span>Invite freinds</span>}
      />
      <MenuItem
        collapsedContent={<IoMdBuild size={20} />}
        expandedContent={<span>Lorem ipsum</span>}
      />
      <MenuItem
        collapsedContent={
          <IoMdBonfire
            size={30}
            onClick={() => toggleSideMenu(!isSiteMenuExpanded)}
          />
        }
        expandedContent={
          <div onClick={() => toggleSideMenu(!isSiteMenuExpanded)}>
            Toggle Side Menu from outsite
          </div>
        }
      />
    </SideMenu>
  )
}
