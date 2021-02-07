import React, { FC, useState } from 'react'
import cx from 'classnames'
import { getItem, setItem } from '@gtms/commons/helpers/localStorage'
// ui
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCloseCircle,
  IoIosCheckbox,
} from 'react-icons/io'
import { BsArrow90DegUp } from 'react-icons/bs'
import { FaIdCard } from 'react-icons/fa'
import { Scrollbars } from 'react-custom-scrollbars'
import useKey from 'use-key-hook'
import { Button } from '../Button'
import { Overlay } from '@gtms/ui/Overlay'
import { SwitchWrapper } from '@gtms/ui/SwitchWrapper'
// styles
import styles from './styles.scss'

export const CookiePolicy: FC = () => {
  const isCookieAccepted = getItem('isCookieAccepted')
  const [isActive, setIsActive] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHiddenCompletely, setIsHiddenCompletely] = useState(false)

  useKey(() => setIsActive(false), {
    detectKeys: [27],
  })

  if (isCookieAccepted === 'true') {
    return null
  }

  const renderSwitchers = (number: number) => {
    const arr = []

    for (let index = 0; index < number; index++) {
      arr.push(
        <div className={styles.switcherWrapper}>
          <div className={styles.switcher}>
            <SwitchWrapper onChange={() => null} checked={false} />
            <label>Group is public</label>
          </div>
          <span>
            <i>
              <BsArrow90DegUp />
            </i>
            If group is public, anyone can find it, and read its content. If not
            - only members can do that
          </span>
        </div>
      )
    }

    return arr
  }

  return (
    <div
      data-testid="cookie-policy"
      onMouseEnter={() => {
        setIsActive(true)
      }}
      className={cx(styles.gdprWrapper, {
        [styles.active]: isActive,
        [styles.hidden]: isHiddenCompletely,
      })}
    >
      <div className={styles.wrapper}>
        <div className={styles.scrollableWrapper}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={styles.content}>
              <h2 className={styles.header}>
                <span>Festiwale</span>Muzyczne.pl
              </h2>
              <span className={styles.subHeader}>
                FestiwaleMuzyczne.pl prosi Cię o zgodę na wykorzystanie Twoich
                danych osobowych w następujących celach:
              </span>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <i>
                    <FaIdCard />
                  </i>
                  Labore mollit enim qui magna id elit nisi aliqua in.
                </li>
                <li className={styles.item}>
                  <i>
                    <FaIdCard />
                  </i>
                  Labore mollit enim qui magna id elit nisi aliqua in.
                </li>
              </ul>
              <h3
                className={styles.expandingHeader}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                More info
                {isExpanded && (
                  <i>
                    <IoIosArrowDown />
                  </i>
                )}
                {!isExpanded && (
                  <i>
                    <IoIosArrowForward />
                  </i>
                )}
              </h3>
              {isExpanded && (
                <ul className={cx(styles.list, styles.expanding)}>
                  <li className={styles.item}>
                    Do elit proident culpa laboris cillum irure magna veniam.
                  </li>
                  <li className={styles.item}>
                    Do elit proident culpa laboris cillum irure magna veniam.
                  </li>
                  <li className={styles.item}>
                    Do elit proident culpa laboris cillum irure magna veniam.
                  </li>
                  <li className={styles.item}>
                    Do elit proident culpa laboris cillum irure magna veniam.
                  </li>
                </ul>
              )}
              <div className={styles.text}>
                <p>
                  Twoje dane osobowe będą przetwarzane, a informacje z Twojego
                  urządzenia (pliki cookie, unikalne identyfikatory itp.) mogą
                  być wyświetlane i zapisywane przez zewnętrznych dostawców lub
                  im udostępniane. Mogą też być wykorzystywane przez tę witrynę
                  lub aplikację.
                </p>
                <p>
                  Niektórzy dostawcy mogą przetwarzać Twoje dane osobowe na
                  podstawie uzasadnionego interesu. Możesz się na to nie
                  zgodzić, zmieniając opcje poniżej. W każdej chwili możesz
                  wycofać swoją zgodę na naszej stronie z Polityką prywatności.
                </p>
              </div>
              {renderSwitchers(10)}
            </div>
          </Scrollbars>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          additionalStyles={styles.btn}
          onClick={() => {
            setIsHiddenCompletely(true)
            setItem('isCookieAccepted', 'true')
          }}
        >
          <i>
            <IoIosCloseCircle />
          </i>
          Options
        </Button>
        <Button
          testid="cookie-accept-button"
          additionalStyles={styles.btn}
          onClick={() => {
            setIsHiddenCompletely(true)
            setItem('isCookieAccepted', 'true')
          }}
        >
          <i>
            <IoIosCheckbox />
          </i>
          Accept
        </Button>
      </div>
      {isActive && !isHiddenCompletely && (
        <Overlay onClick={() => setIsActive(false)} />
      )}
    </div>
  )
}
