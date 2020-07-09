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
      title: '#berlin2020',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-1.png',
    },
    {
      id: 1,
      title: '#cdp',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-2.png',
    },
    {
      id: 2,
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      title: '#nightCity',
      image: '/images/temp_images/logo-wioska-3.png',
    },
    {
      id: 3,
      title: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: '/images/temp_images/logo-wioska-5.png',
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
