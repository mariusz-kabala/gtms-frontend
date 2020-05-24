import React, { FC, useRef } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { useTranslation } from '@gtms/commons/i18n'
import { FileStatus } from '@gtms/commons/enums'
import { UserAvatar } from '../UserAvatar'
import { Spinner } from '../Spinner'

export const PostCreate: FC<{
  additionalStyles?: string
  onSubmit: (text: string) => unknown
  isLoading?: boolean
  user: {
    name?: string
    surname?: string
    avatar: {
      status: FileStatus
      files: {
        '35x35'?: {
          jpg: string
          webp: string
        }
      }
    }
  }
  noImage: { [key: string]: { jpg: string; webp?: string } }
}> = ({ additionalStyles, onSubmit, user, noImage, isLoading = false }) => {
  const { t } = useTranslation('postCreate')
  const dscRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="postCreate"
    >
      <div className={styles.text}>
        {isLoading && <Spinner />}
        <div className={styles.avatar}>
          <UserAvatar
            image={
              user.avatar.status === FileStatus.ready &&
              user.avatar.files['35x35']
                ? user.avatar.files['35x35']
                : noImage['35x35']
            }
            additionalStyles={styles.userAvatar}
          />
          <span>{`${user.name || ''} ${user.surname || ''}`.trim()}</span>
        </div>
        <ExpandingTextarea
          reference={dscRef as any}
          rows={3}
          placeholder={t('yourMessage')}
        />
      </div>
      <Button
        onClick={() => {
          if (!dscRef.current) {
            return
          }
          const dsc = dscRef.current.value

          dsc && onSubmit(dsc)
        }}
        type="submit"
        disabled={false}
        additionalStyles={styles.btn}
      >
        {t('send')}
      </Button>
    </div>
  )
}
