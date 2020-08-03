import React, { FC } from 'react'
import cx from 'classnames'
// ui
import { Button } from '@gtms/ui/Button'
import { GridCard } from '@gtms/ui/GridCard'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

export const TagsGrid: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const isLoading = false // @todo remove mock
  const mock = [
    {
      id: 0,
      name: '#berlin2020',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-1.png',
      },
    },
    {
      id: 1,
      name: '#cdp',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-8.png',
      },
    },
    {
      id: 2,
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      name: '#nightCity',
      image: {
        jpg: '/images/temp_images/logo-wioska-3.png',
      },
    },
    {
      id: 3,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-5.png',
      },
    },
    {
      id: 4,
      name: '#cdp',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-6.png',
      },
    },
    {
      id: 5,
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      name: '#nightCity',
      image: {
        jpg: '/images/temp_images/logo-wioska-7.png',
      },
    },
    {
      id: 6,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-8.png',
      },
    },
    {
      id: 7,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-1.png',
      },
    },
    {
      id: 8,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-10.png',
      },
    },
    {
      id: 9,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-3.png',
      },
    },
    {
      id: 10,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-2.png',
      },
    },
    {
      id: 11,
      name: '#metro',
      description:
        'Proident elit excepteur consectetur velit ex incididunt aliqua ullamco',
      image: {
        jpg: '/images/temp_images/logo-wioska-3.png',
      },
    },
  ]

  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {isLoading && <Spinner />}
      {mock.length > 0 && (
        <>
          <ul className={styles.items}>
            {mock.map((item) => (
              <li className={styles.item} key={item.id}>
                <GridCard
                  name={item.name}
                  desc={item.description}
                  image={item.image}
                />
              </li>
            ))}
          </ul>
          <div className={styles.btnWrapper}>
            <Button type="submit" additionalStyles={styles.btn}>
              show more...
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
