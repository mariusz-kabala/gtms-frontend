import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserCardMini } from '@gtms/ui/UserCardMini'

export const RecentlyCreatedGroups: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-created-groups"
    >
      <UserCardMini
        name="Wioska Andrzeja"
        image={'/images/temp_images/logo-wioska-1.png'}
      />
      <UserCardMini
        name="Kurwa Moje Pole"
        image={'/images/temp_images/logo-wioska-2.png'}
      />
      <UserCardMini
        name="Wioska Lecha"
        image={'/images/temp_images/logo-wioska-3.png'}
      />
      <UserCardMini
        name="Wioska Onet.pl"
        image={'/images/temp_images/logo-wioska-4.png'}
      />
      <UserCardMini
        name="Wioska Zgon Town"
        image={'/images/temp_images/logo-wioska-5.png'}
      />
      <UserCardMini
        name="Ministerstwo Wódki"
        image={'/images/temp_images/logo-wioska-6.png'}
      />
      <UserCardMini
        name="Wioska Krishny"
        image={'/images/temp_images/logo-wioska-7.png'}
      />
      <UserCardMini
        name="Wioska Playa"
        image={'/images/temp_images/logo-wioska-8.png'}
      />
      <UserCardMini
        name="Wioska Allegro"
        image={'/images/temp_images/logo-wioska-9.png'}
      />
      <UserCardMini
        name="Narniostock"
        image={'/images/temp_images/logo-wioska-10.png'}
      />
      <UserCardMini
        name="Kurwa Moje Pole"
        image={'/images/temp_images/logo-wioska-11.png'}
      />
      <UserCardMini
        name="Wioska Onet.pl"
        image={'/images/temp_images/logo-patrol-1.png'}
      />
      <UserCardMini
        name="Wioska Krishny"
        image={'/images/temp_images/logo-patrol-2.png'}
      />
      <UserCardMini
        name="Ministerstwo Wódki"
        image={'/images/temp_images/logo-sztab-1.png'}
      />
      <UserCardMini
        name="Wioska Lecha"
        image={'/images/temp_images/logo-sztab-2.png'}
      />
      <UserCardMini
        name="Wioska Zgon Town"
        image={'/images/temp_images/logo-sztab-3.png'}
      />
      <UserCardMini
        name="Wioska Allegro"
        image={'/images/temp_images/logo-uczymy-ratowac.png'}
      />
      <UserCardMini
        name="Wioska MAstercard"
        image={'/images/temp_images/logo-wielki-mecz.png'}
      />
    </div>
  )
}
