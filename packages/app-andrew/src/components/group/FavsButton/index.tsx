import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import {
  myGroupsQuery,
  addToFavs,
  removeFromFavs,
  userQuery,
} from '@gtms/state-user'
import { openLoginModal } from 'state'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
//ui
import { Button } from '@gtms/ui/Button'
import { Spinner } from '@gtms/ui/Spinner'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

export const FavsButton: FC<{ group: IGroup }> = ({ group }) => {
  const { t } = useTranslation('groupPage')
  const [status, setStatus] = useState<{
    isLoading: boolean
    errorOccurred: boolean
    inFavs: boolean
  }>({
    ...myGroupsQuery.status(),
    inFavs: myGroupsQuery.isInFavs(group),
  })

  useEffect(() => {
    const statusSub = myGroupsQuery.status$.subscribe((value) =>
      setStatus({
        ...value,
        inFavs: myGroupsQuery.isInFavs(group),
      })
    )

    return () => {
      statusSub && !statusSub.closed && statusSub.unsubscribe()
    }
  }, [group])

  if (status.errorOccurred) {
    return (
      <button disabled={true} className={styles.btn}>
        {t('add-to-favs')}
      </button>
    )
  }

  return (
    <Button
      additionalStyles={styles.btn}
      onClick={() => {
        if (!userQuery.isLogged()) {
          return openLoginModal()
        }
        if (myGroupsQuery.isInFavs(group)) {
          removeFromFavs(group)
        } else {
          addToFavs(group)
        }
      }}
    >
      {status.isLoading && (
        <>
          <Spinner /> {t('favs')}
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
