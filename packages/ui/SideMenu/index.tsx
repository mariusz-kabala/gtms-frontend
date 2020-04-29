import React, { FC, ReactNode, useState, useEffect } from 'react'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { IconType } from 'react-icons/lib/cjs/iconBase'
import cx from 'classnames'
import styles from './styles.scss'

interface MenuItemProps {
  Icon: IconType
  Content: ReactNode
  isExpanded?: boolean
}

export const MenuItem: FC<MenuItemProps> = ({ Icon, Content }) => {
  return (
    <div className={styles.sideMenuItem}>
      <div className={styles.icon}>
        <Icon size={20} />
      </div>

      <div className={styles.link}>{Content}</div>
    </div>
  )
}

export const SideMenu: FC<{
  children: React.ReactElement<MenuItemProps>[]
  isExpanded?: boolean
  onToggleExpand?: (isExpanded: boolean) => void
}> = ({ children, isExpanded, onToggleExpand }) => {
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

  // const childrenWithProps = React.Children.map(children, (child) =>
  //   React.cloneElement(child, {
  //     toggleMenu: (isMenuExpanded: boolean) =>
  //       setIsMenuExpanded(!isMenuExpanded),
  //   })
  // )

  return (
    <div className={cx(styles.sideMenu, { [styles.expanded]: isMenuExpanded })}>
      <UserAvatar
        image="/images/temp_images/side_bar_logo.png"
        onClick={toggleMenu}
        additionalStyles={styles.avatar}
      />
      <div className={styles.menuItems}>{children}</div>
    </div>
  )
}
