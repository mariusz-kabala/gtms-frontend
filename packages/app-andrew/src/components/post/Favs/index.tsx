import React, { FC, useState, useEffect } from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import cx from 'classnames'
import { IFavsState, favsState, favsState$ } from './state.query'
import { addPostToFavs, removeFromFavs, getPostFavs } from '@gtms/api-post'
import { getDisplayName } from '@gtms/commons/helpers'
import { openLoginModal } from 'state'
import { addErrorNotification } from '@gtms/state-notification'
import { Tooltip } from 'react-tippy'
import styles from './styles.scss'

export const Favs: FC<{
  favs: string[]
  id: string
}> = ({ favs, id }) => {
  const [state, setState] = useState<IFavsState>(favsState())
  const [isInFavs, setIsInFavs] = useState<boolean>(
    state.isLogged && favs.includes(`${state.account.id}`)
  )
  const [tooltipContent, setTooltipContent] = useState<{
    isLoaded: boolean
    text: string
  }>({
    isLoaded: false,
    text: 'loading...',
  })

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
    <div
      onClick={() => {
        if (!state.isLogged) {
          return openLoginModal()
        }

        const apiMethod = isInFavs ? removeFromFavs : addPostToFavs

        setIsInFavs(!isInFavs)

        apiMethod(id)
          .catch(() => {
            setIsInFavs(isInFavs)

            addErrorNotification('Error occured, try later')
          })
          .final(() =>
            setTooltipContent({
              isLoaded: false,
              text: 'loading...',
            })
          )
      }}
      data-testid="post-favs"
      className={cx(styles.wrapper, {
        [styles.withStars]: favs.length > 0,
      })}
    >
      <Tooltip
        onShow={() => {
          if (tooltipContent.isLoaded) {
            return
          }
          getPostFavs(id)
            .then((result) => {
              setTooltipContent({
                isLoaded: true,
                text:
                  result.length > 0
                    ? result.map((user) => getDisplayName(user)).join(', ')
                    : 'empty favs',
              })
            })
            .catch(() =>
              setTooltipContent({
                isLoaded: false,
                text: 'Can not fetch data now, try later',
              })
            )
        }}
        position={'top'}
        arrow={true}
        title={tooltipContent.text}
      >
        {isInFavs && <IoIosStar />}
        {!isInFavs && <IoIosStarOutline />}
        {favs.length > 0 && <span>{favs.length}</span>}
      </Tooltip>
    </div>
  )
}
