import React, { FC, useState, useEffect, ReactNode } from 'react'
import cx from 'classnames'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { MenuItemProps } from './MenuItem'

import styles from './styles.scss'

export const SideMenu: FC<{
  children: React.ReactElement<MenuItemProps>[]
  menuLogoPath: string
  menuHeader: ReactNode
  isExpanded?: boolean
  onToggleExpand?: (isExpanded: boolean) => void
  additionalStyles?: string
}> = ({
  children,
  menuHeader,
  isExpanded,
  onToggleExpand,
  additionalStyles,
  menuLogoPath,
}) => {
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
      <div className={styles.menuItems}>
        <div className={cx(styles.sideMenuItem, styles.menuLogo)}>
          <div className={styles.icon}>
            <UserAvatar
              image={menuLogoPath}
              onClick={toggleMenu}
              additionalStyles={styles.avatar}
            />
          </div>
          <div className={styles.link}>{menuHeader}</div>
        </div>
        {children}
      </div>
    </div>
  )
}
