import React, { FC, useState, useEffect } from 'react'
import {
  myGroupsQuery,
  addToFavs,
  removeFromFavs,
  userQuery,
} from '@gtms/state-user'
import cx from 'classnames'
import { openLoginModal } from 'state'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import { isGroupInFavsAPI } from '@gtms/api-auth'
//ui
import { Button } from '@gtms/ui/Button'
import { Spinner } from '@gtms/ui/Spinner'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import styles from './styles.scss'

export const FavsButton: FC<{ group: IGroup }> = ({ group }) => {
  const { t } = useTranslation('groupPage')
  const [status, setStatus] = useState<{
    isLoading: boolean
    errorOccurred: boolean
    inFavs: boolean
  }>({
    isLoading: true,
    errorOccurred: false,
    inFavs: false,
  })

  useEffect(() => {
    const statusSub = myGroupsQuery.status$.subscribe((value) => {
      if (value.isLoaded) {
        if (myGroupsQuery.isInFavs(group)) {
          setStatus({
            isLoading: false,
            errorOccurred: false,
            inFavs: true,
          })
        } else {
          isGroupInFavsAPI(group.id)
            .then((inFavs) => {
              setStatus({
                isLoading: false,
                errorOccurred: false,
                inFavs,
              })
            })
            .catch(() => {
              setStatus({
                isLoading: false,
                errorOccurred: true,
                inFavs: false,
              })
            })
        }

        statusSub && !statusSub.closed && statusSub.unsubscribe()
      } else if (value.errorOccurred) {
        setStatus({
          isLoading: false,
          errorOccurred: true,
          inFavs: false,
        })
      }
    })

    return () => {
      statusSub && !statusSub.closed && statusSub.unsubscribe()
    }
  }, [group])

  if (status.errorOccurred) {
    return (
      <button disabled={true} className={styles.btn}>
        {t('error')}
      </button>
    )
  }

  return (
    <Button
      additionalStyles={cx(styles.btn, {
        [styles.isLoading]: status.isLoading,
      })}
      onClick={() => {
        if (!userQuery.isLogged()) {
          return openLoginModal()
        }

        if (status.inFavs) {
          removeFromFavs(group)
        } else {
          addToFavs(group)
        }

        setStatus((status) => ({
          isLoading: false,
          errorOccurred: false,
          inFavs: !status.inFavs,
        }))
      }}
    >
      {status.isLoading && (
        <>
          <span className={styles.loader}>
            <Spinner />
          </span>
          {t('favs')}
        </>
      )}
      {!status.isLoading && !status.inFavs && (
        <>
          <i>
            <IoIosHeartEmpty />
          </i>{' '}
          {t('add-to-favs')}
        </>
      )}
      {!status.isLoading && status.inFavs && (
        <>
          <i>
            <IoIosHeart />
          </i>{' '}
          {t('remove-from-favs')}
        </>
      )}
    </Button>
  )
}
