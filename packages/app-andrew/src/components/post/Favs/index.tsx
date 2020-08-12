import React, { FC, useState, useEffect, useCallback } from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import cx from 'classnames'
import { IFavsState, favsState, favsState$ } from './state.query'
import { addPostToFavs, removeFromFavs, getPostFavs } from '@gtms/api-post'
import { getDisplayName } from '@gtms/commons/helpers'
import { openLoginModal } from 'state'
import { addErrorNotification } from '@gtms/state-notification'
import { Tooltip } from 'react-tippy'
// ui
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

export const Favs: FC<{
  favs: string[]
  id: string
}> = ({ favs, id }) => {
  const [state, setState] = useState<IFavsState>(favsState())
  const [favsCounter, setfavsCounter] = useState<number>(favs.length)
  const [isInFavs, setIsInFavs] = useState<boolean>(
    state.isLogged && favs.includes(`${state.account.id}`)
  )
  const [tooltipContent, setTooltipContent] = useState<{
    text: string
    lastCheck: null | number
  }>({
    text: 'loading...',
    lastCheck: null,
  })

  const onTooltipShow = useCallback(() => {
    const now = new Date().getTime()

    if (
      tooltipContent.lastCheck !== null &&
      now - tooltipContent.lastCheck < 120000
    ) {
      // 2min
      return
    }

    getPostFavs(id)
      .then((result) => {
        setTooltipContent({
          lastCheck: now,
          text:
            result.length > 0
              ? result.map((user) => getDisplayName(user)).join(', ')
              : 'empty favs',
        })
      })
      .catch(() => {
        setTooltipContent({
          lastCheck: null,
          text: 'Can not fetch data now, try later',
        })
      })
  }, [tooltipContent])

  useEffect(() => {
    const sub = favsState$.subscribe((value) => {
      setIsInFavs(favs.includes(`${value.account?.id}`))
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <Button
      onClick={() => {
        if (!state.isLogged) {
          return openLoginModal()
        }

        const apiMethod = isInFavs ? removeFromFavs : addPostToFavs

        setIsInFavs(!isInFavs)

        apiMethod(id)
          .then(() => {
            setfavsCounter(!isInFavs ? favsCounter + 1 : favsCounter - 1)
          })
          .catch(() => {
            setIsInFavs(isInFavs)

            addErrorNotification('Error occured, try later')
          })
          .finally(() =>
            setTooltipContent({
              text: 'loading...',
              lastCheck: null,
            })
          )
      }}
      testid="post-favs"
      additionalStyles={cx(styles.btn, {
        [styles.withStars]: favs.length > 0,
      })}
    >
      <Tooltip
        onShow={onTooltipShow}
        position={'top'}
        arrow={true}
        title={tooltipContent.text}
      >
        {isInFavs && (
          <i>
            <IoIosStar />
          </i>
        )}
        {!isInFavs && (
          <i>
            <IoIosStarOutline />
          </i>
        )}
        {favsCounter > 0 && <span>{favsCounter}</span>}
      </Tooltip>
    </Button>
  )
}
