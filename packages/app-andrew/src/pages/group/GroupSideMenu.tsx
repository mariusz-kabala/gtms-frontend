import React, { useState } from 'react'
import { SideMenu } from '@gtms/ui/SideMenu'
import { MenuItem } from '@gtms/ui/SideMenu/MenuItem'

import {
  IoIosKeypad,
  IoIosBody,
  IoMdSettings,
  IoMdAdd,
  IoMdBuild,
  IoMdBonfire,
} from 'react-icons/io'

export const GroupSideMenu = () => {
  const [isSiteMenuExpanded, toggleSideMenu] = useState<boolean>(false)

  const onToggleSideMenu = (isSideMenuExpanded: boolean) => {
    toggleSideMenu(isSideMenuExpanded)
  }

  return (
    <SideMenu isExpanded={isSiteMenuExpanded} onToggleExpand={onToggleSideMenu}>
      <MenuItem
        CollapsedContent={<IoIosBody size={20} />}
        ExpandedContent={<div>Lorem</div>}
      />
      <MenuItem
        CollapsedContent={<IoIosKeypad size={20} />}
        ExpandedContent={
          <div onClick={() => alert('On Item Click')}>
            Posts (alert on click)
          </div>
        }
      />
      <MenuItem
        CollapsedContent={<IoIosBody size={20} />}
        ExpandedContent={<div>Tags</div>}
      />
      <MenuItem
        CollapsedContent={<IoMdSettings size={20} />}
        ExpandedContent={<div>Group Settings</div>}
      />
      <MenuItem
        CollapsedContent={<IoMdAdd size={20} />}
        ExpandedContent={<div>Invite freinds</div>}
      />
      <MenuItem
        CollapsedContent={<IoMdBuild size={20} />}
        ExpandedContent={<div>Lorem ipsum</div>}
      />
      <MenuItem
        CollapsedContent={
          <IoMdBonfire
            size={30}
            onClick={() => toggleSideMenu(!isSiteMenuExpanded)}
          />
        }
        ExpandedContent={
          <div onClick={() => toggleSideMenu(!isSiteMenuExpanded)}>
            Toggle Side Menu from outsite
          </div>
        }
      />
    </SideMenu>
  )
}
