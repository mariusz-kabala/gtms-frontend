import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'

export const PromotedGroups: FC<{
  additionalStyles?: string
}> = ({
  additionalStyles,
}) => {
  const isLoading = false; // @todo remove mock
  const mock = [
    {
      id: 0,
      title: 'Patrol czerwony',
      description: 'Mollit amet sit nulla magna dolor est labore proident ea elit velit.',
      image: '/images/temp_images/logo-patrol-2.png',
    },
    {
      id: 1,
      title: 'Patrol czerwony',
      description: 'Mollit amet sit nulla magna dolor est labore proident ea elit velit.',
      image: '/images/temp_images/logo-patrol-2.png',
    },
    {
      id: 2,
      title: 'Patrol czerwony',
      description: 'Mollit amet sit nulla magna dolor est labore proident ea elit velit.',
      image: '/images/temp_images/logo-patrol-2.png',
    },
    {
      id: 3,
      title: 'Patrol czerwony',
      description: 'Mollit amet sit nulla magna dolor est labore proident ea elit velit.',
      image: '/images/temp_images/logo-patrol-2.png',
    },
    {
      id: 4,
      title: 'Patrol czerwony',
      description: 'Mollit amet sit nulla magna dolor est labore proident ea elit velit.',
      image: '/images/temp_images/logo-patrol-2.png',
    },
    {
      id: 5,
      title: 'Patrol czerwony',
      description: 'Mollit amet sit nulla magna dolor est labore proident ea elit velit.',
      image: '/images/temp_images/logo-patrol-2.png',
    },
  ]

  return (
    <>
      <NavigationTabs />
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
