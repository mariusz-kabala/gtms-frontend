import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'

/* @todo remove mock */
const mockData = [
  {
    img: 'static/images/temp_images/logo-kreciolatv.png',
  },
  {
    img: 'static/images/temp_images/logo-patrol-1.png',
  },
  {
    img: 'static/images/temp_images/logo-patrol-2.png',
  },
  {
    img: 'static/images/temp_images/avatar-1.png',
  },
  {
    img: 'static/images/temp_images/logo-kreciolatv.png',
  },
  {
    img: 'static/images/temp_images/logo-patrol-1.png',
  },
  {
    img: 'static/images/temp_images/avatar-1.png',
  },
]

export const NavigationDot: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      body { padding-bottom: 70px }
    `,
      }}
    />
    <div className={styles.navigationDot}>
      {children}
      <ul className={styles.row}>
        {/* @todo remove key mock, apply normal key */}
        <li key={23423}>
          <a>
            <div
              className={styles.circle}
              style={{ backgroundImage: `url(${mockData[0].img})` }}
            />
          </a>
        </li>
        {mockData.map((value, index) => (
          <li key={index}>
            <a>
              <div
                className={styles.circle}
                style={{ backgroundImage: `url(${value.img})` }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>
)
