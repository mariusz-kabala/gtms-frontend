import React, {
  FC,
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import {
  IPostDetailsModalState,
  postDetailsModalState,
  postDetailsModalState$,
} from './state.query'
import { IPost, IComment } from '@gtms/commons/models'
import cx from 'classnames'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { hidePostDetailsModal, Status } from '@app/state/postDetails'
// ui
import { Overlay } from '@gtms/ui/Overlay'
import { PostDetails } from '@app/components/post/PostDetails'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

export const PostDetailsModal: FC<{
  onClose?: () => void
}> = ({ onClose }) => {
  const [state, setState] = useState<IPostDetailsModalState>(
    postDetailsModalState()
  )
  const portalNode = useRef(
    typeof window !== 'undefined' && document.createElement('div')
  )

  const onCloseModalWindow = useCallback(() => {
    hidePostDetailsModal()
    onClose && onClose()
    enableBodyScroll(document.body)
  }, [onClose])

  useLayoutEffect(() => {
    if (document) {
      document.body.appendChild(portalNode.current as HTMLDivElement)
    }
  }, [])

  useEffect(() => {
    const sub = postDetailsModalState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  useKey(onCloseModalWindow, {
    detectKeys: [27],
  })

  if (!state.isOpen) {
    return null
  }

  if (!portalNode.current) {
    return null
  }

  disableBodyScroll(document.body)

  return createPortal(
    <>
      <Overlay />
      <div
        className={cx(styles.wrapper, {
          [styles.loggedIn]: state.user !== null,
        })}
      >
        {state.status === Status.isLoading && <Spinner />}

        {state.status === Status.isError && <div>PROPER ERROR VIEW HERE</div>}

        {state.status === Status.isLoaded && (
          <div className={styles.content}>
            <div className={styles.left}>
              <a onClick={onCloseModalWindow}>CLOSE MODAL BUTTON</a>
            </div>

            <div className={styles.post}>
              <PostDetails
                post={state.post as IPost}
                user={state.user}
                comments={state.comments}
              />
            </div>

            <div className={styles.right}>DIFFERENT SHIT ON THE RIGHT</div>
          </div>
        )}
      </div>
    </>,
    portalNode.current
  )
}
