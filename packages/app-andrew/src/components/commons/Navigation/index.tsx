import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  INavigationProps,
  baseUIQuery,
  INotificationsSidebarProps,
} from 'queries'
import { toggleSidebarNotifications } from 'state'
import { logoutUser } from '@gtms/state-user'
// ui
import { IoIosAddCircle, IoIosNotifications } from 'react-icons/io'
import { Navigation as NavigationUI } from '@gtms/ui/Navigation'
// import { IoIosSearch } from 'react-icons/io'

const MENU_ITEMS = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <IoIosNotifications />,
    onClick: toggleSidebarNotifications,
  },
  // @todo remove it eventually
  // {
  //   id: 'search',
  //   label: 'Search',
  //   icon: <IoIosSearch />,
  //   url: '/search',
  // },
  {
    id: 'group-create',
    label: 'Create your group',
    icon: <IoIosAddCircle />,
    url: '/group-create',
  },
]

export const Navigation: FC<{}> = () => {
  const [state, setState] = useState<INavigationProps>(baseUIQuery.navigation())
  const [sidebar, setSidebar] = useState<INotificationsSidebarProps>(
    baseUIQuery.notificationsSidebar()
  )
  const router = useRouter()
  const active = [router.route.split('/')[1]]

  if (sidebar.isOpen) {
    active.push('notifications')
  }

  useEffect(() => {
    const sub = baseUIQuery.navigation$.subscribe((values) => setState(values))
    const sideBarSub = baseUIQuery.notificationsSidebar$.subscribe((values) =>
      setSidebar(values)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
      sideBarSub && !sideBarSub.closed && sideBarSub.unsubscribe()
    }
  }, [])

  return (
    <NavigationUI
      active={active}
      avatar={state.userAvatar}
      menu={MENU_ITEMS}
      onLogout={logoutUser}
    />
  )
}
