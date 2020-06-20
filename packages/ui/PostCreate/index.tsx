import React, { FC, useRef } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Button } from '@gtms/ui/Button'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { useTranslation } from '@gtms/commons/i18n'
import { FileStatus } from '@gtms/commons/enums'
import { Link } from '@gtms/commons/i18n'
import { UserAvatar } from '../UserAvatar'
import { Spinner } from '../Spinner'
import { IoMdSend } from 'react-icons/io'

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
        '50x50'?: {
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
      data-testid="postCreate">
      <div className={styles.avatar}>
        <Link href={`/user/${user.id}`}>
          <UserAvatar
            image={
              user.avatar.status === FileStatus.ready &&
              user.avatar.files['50x50']
                ? user.avatar.files['50x50']
                : noImage['50x50']
            }
            additionalStyles={styles.userAvatar}
          />
        </Link>
      </div>
      {isLoading && <Spinner />}
      <ExpandingTextarea
        additionalStyles={styles.textarea}
        reference={dscRef as any}
        rows={1}
        placeholder={t('yourMessage')}
      />
      <Button
        type="submit"
        disabled={false}
        additionalStyles={styles.btn}
        onClick={() => {
          if (!dscRef.current) {
            return
          }
          const dsc = dscRef.current.value

          dsc && onSubmit(dsc)
        }}
      >
        <span>{t('send')}</span>
        <i><IoMdSend /></i>
      </Button>
    </div>
  )
}
