import React, { FC } from 'react'
import cx from 'classnames'
// ui
import { AiOutlineTags } from 'react-icons/ai'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { RiUserStarLine } from 'react-icons/ri'
import { GoSettings } from 'react-icons/go'
// styles
import styles from './styles.scss'

export enum Tabs {
  general = 'general',
  tags = 'tags',
  invitations = 'invitations',
  admins = 'admins',
  members = 'members',
}

export const GroupSettingsSidebar: FC<{
  tab: Tabs
  setTab: (tab: Tabs) => void
}> = ({ tab, setTab }) => {
  return (
    <ul className={styles.navigation}>
      <li
        className={cx(styles.item, {
          [styles.current]: tab === Tabs.general,
        })}
      >
        <a href="#general" onClick={() => setTab(Tabs.general)}>
          <i>
            <GoSettings />
          </i>
          <span>General Settings</span>
        </a>
      </li>
      <li
        className={cx(styles.item, {
          [styles.current]: tab === Tabs.tags,
        })}
      >
        <a href="#tags" onClick={() => setTab(Tabs.tags)}>
          <i>
            <AiOutlineTags />
          </i>
          <span>Tags</span>
        </a>
      </li>
      <li
        className={cx(styles.item, {
          [styles.current]: tab === Tabs.invitations,
        })}
      >
        <a href="#invitations" onClick={() => setTab(Tabs.invitations)}>
          <i>
            <FaEnvelopeOpenText />
          </i>
          <span>Invitations</span>
        </a>
      </li>
      <li
        className={cx(styles.item, {
          [styles.current]: tab === Tabs.admins,
        })}
      >
        <a href="#admins" onClick={() => setTab(Tabs.admins)}>
          <i>
            <RiUserStarLine />
          </i>
          <span>Admins</span>
        </a>
      </li>
      <li
        className={cx(styles.item, {
          [styles.current]: tab === Tabs.members,
        })}
      >
        <a href="#members" onClick={() => setTab(Tabs.members)}>
          <i>
            <FiUsers />
          </i>
          <span>Members</span>
        </a>
      </li>
    </ul>
  )
}
