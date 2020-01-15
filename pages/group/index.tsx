import React from 'react'
import styles from './styles.scss'
import { NextPage } from 'next'
import { GroupCreate } from 'components/group/GroupCreate'

const GroupPage: NextPage<{}> = () => {
  return (
    <div
      className={styles.bg}
      style={{ backgroundImage: `url('/images/temp_images/nightcamp.jpg')` }}
    >
      <GroupCreate />
    </div>
  )
}

export default GroupPage
