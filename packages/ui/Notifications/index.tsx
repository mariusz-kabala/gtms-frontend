import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import useKey from 'use-key-hook'
import { Scrollbars } from 'react-custom-scrollbars'
import { IoMdCloseCircle } from 'react-icons/io'

export const Notifications: FC<{
  additionalStyles?: string
  isActive: boolean
  onClose: () => unknown
}> = ({ additionalStyles, isActive, onClose }) => {
  useKey(
    () => {
      onClose()
    },
    {
      detectKeys: [27],
    }
  )

  return (
    <div
      data-testid={'notifications'}
      className={cx(styles.wrapper, additionalStyles, {
        [styles.opened]: isActive,
      })}
    >
      <div className={styles.content}>
        <Scrollbars style={{ height: '300vh' }}>
          <div className={styles.header}>
            <i className={styles.iconClose}>
              <IoMdCloseCircle onClick={() => onClose()} />
            </i>
            <h2>Powiadomienia (nowe: 34)</h2>
          </div>
          <ul>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>3 new users in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>50 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/question-mark.png'}
              />
              <div>
                <p className={styles.desc}>Do you know how to...</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>200 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/question-mark.png'}
              />
              <div>
                <p className={styles.desc}>Do you know how to...</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>200 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/question-mark.png'}
              />
              <div>
                <p className={styles.desc}>Do you know how to...</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>200 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/question-mark.png'}
              />
              <div>
                <p className={styles.desc}>Do you know how to...</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>200 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/question-mark.png'}
              />
              <div>
                <p className={styles.desc}>Do you know how to...</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>200 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/question-mark.png'}
              />
              <div>
                <p className={styles.desc}>Do you know how to...</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
            <li className={styles.notification}>
              <img
                className={styles.icon}
                src={'/images/icons/iconCelebrate.png'}
              />
              <div>
                <p className={styles.desc}>200 posts in your group</p>
              </div>
              <i className={styles.iconClose}>
                <IoMdCloseCircle onClick={() => onClose()} />
              </i>
            </li>
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}
