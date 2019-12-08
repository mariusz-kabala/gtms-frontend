import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import mockData from './mockData.json'

export const NavigationDot: FC<{ children?: ReactNode }> = ({ children }) => (
  <>
    <style global jsx>{`
      body {
        padding-bottom: 70px;
      }
    `}</style>
    <div className={styles.navigationDot}>
      {children}
      <ul className={styles.row}>
        {/* @todo remove key mock, apply normal key */}
        <li key={23423}>
          <a>
            <div
              className={styles.circle}
              style={{ backgroundImage: `url(${mockData.data[0].img})` }}
            />
          </a>
        </li>
        {mockData.data.map((value, index) => (
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
