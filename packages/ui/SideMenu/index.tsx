import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { MenuItemProps } from './MenuItem'

import styles from './styles.scss'

export const SideMenu: FC<{
  children: React.ReactElement<MenuItemProps>[]
  isExpanded?: boolean
  onToggleExpand?: (isExpanded: boolean) => void
  additionalStyles?: string
}> = ({ children, isExpanded, onToggleExpand, additionalStyles }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false)

  const toggleMenu = () => {
    onToggleExpand && onToggleExpand(!isMenuExpanded)
    setIsMenuExpanded(!isMenuExpanded)
  }

  useEffect(() => {
    if (isExpanded !== undefined) {
      if (isExpanded === isMenuExpanded) {
        return
      }

      onToggleExpand && onToggleExpand(isExpanded)
      setIsMenuExpanded(isExpanded)
    }
  }, [isExpanded])

  return (
    <div
      className={cx(styles.sideMenu, additionalStyles, {
        [styles.expanded]: isMenuExpanded,
      })}
    >
      <UserAvatar
        image="/images/temp_images/side_bar_logo.png"
        onClick={toggleMenu}
        additionalStyles={styles.avatar}
      />
      <div className={styles.menuItems}>{children}</div>
    </div>
  )
}
