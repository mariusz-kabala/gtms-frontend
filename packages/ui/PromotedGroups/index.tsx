import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'

export const PromotedGroups: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const isLoading = false // @todo remove mock
  const mock = [
    {
      id: 0,
      title: 'Patrol czerwony',
      description:
        'Qui ullamco esse excepteur in incididunt labore dolore. Quis enim eiusmod officia dipisicing.',
      image: '/images/temp_images/logo-wioska-1.png',
    },
    {
      id: 1,
      title: 'Patrol zolty',
      description:
        'Proident elit excepteur consectetur velit ex  laborum exercitation incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-3.png',
    },
    {
      id: 2,
      title: 'Patrol niebieski',
      description:
        'Eroident elit excepteur ncididunt labore dolore. Quis enim eiusmod officia ullamco',
      image: '/images/temp_images/logo-wioska-4.png',
    },
    {
      id: 3,
      title: 'T ine the park',
      description:
        'Proident elit excepteur consectetur velit ex  laborum exercitation incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-5.png',
    },
    {
      id: 4,
      title: 'Rosklide festiwal',
      description:
        'Proident elit excepteur consectetur velit ex  laborum exercitation incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-6.png',
    },
    {
      id: 5,
      title: 'Patrol czerwony',
      description:
        'Proident elit excepteur consectetur velit ex  laborum exercitation incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-7.png',
    },
  ]

  return (
    <>
      <NavigationTabs>
        <h2 className={styles.header}>Promoted groups</h2>
        <ul className={styles.elements}>
          <li className={styles.item}>something</li>
          <li className={styles.item}>item</li>
        </ul>
      </NavigationTabs>
      <div
        className={cx(styles.wrapper, additionalStyles)}
        data-testid="promoted-groups"
      >
        {isLoading && <Spinner />}

        {mock.length > 0 && (
          <ul className={styles.items}>
            {mock.map((item) => (
              <li className={styles.item} key={item.id}>
                <Picture
                  additionalStyles={styles.image}
                  jpg={item.image}
                  maxHeight={200}
                />
                <div className={styles.desc}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
