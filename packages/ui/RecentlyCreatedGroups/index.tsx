import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { GroupCard } from '@gtms/ui/GroupCard'
import { Modal } from '@gtms/ui/Modal'
import { UserCardMini } from '@gtms/ui/UserCardMini'

export const RecentlyCreatedGroups: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-created-groups"
    >
      {isModalOpen && (
        <Modal
          additionalStyles={styles.modalContent}
          onClose={() => setIsModalOpen(false)}
        >
          <GroupCard />
        </Modal>
      )}
      <UserCardMini
        name="Wioska Andrzeja"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-1.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Kurwa Moje Pole"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-2.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Lecha"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-3.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Onet.pl"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-4.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Zgon Town"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-5.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Ministerstwo Wódki"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-6.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Krishny"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-7.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Playa"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-8.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Allegro"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-9.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Narniostock"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-10.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Kurwa Moje Pole"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wioska-11.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Onet.pl"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-patrol-1.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Krishny"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-patrol-2.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Ministerstwo Wódki"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-sztab-1.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Lecha"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-sztab-2.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Zgon Town"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-sztab-3.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska Allegro"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-uczymy-ratowac.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <UserCardMini
        name="Wioska MAstercard"
        desc=" Cupidatat nisi aliquip culpa enim laborum cupidatat consequat consequat non occaecat sit et. Reprehenderit quis"
        image={'/images/temp_images/logo-wielki-mecz.png'}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
    </div>
  )
}
