import React, { FC, useState, useEffect } from 'react'
import { promotedTagsQuery, loadGroupPromotedTags } from '@gtms/state-tag'
import { IPromotedTag, FileStatus } from '@gtms/commons'
import { PromotedTagNoImage } from 'enums/noImage'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import {
  IoIosCloseCircle,
  IoIosCheckbox,
  IoMdTrash,
  IoIosSettings,
} from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
import { UploadedPicture } from '@gtms/ui/UploadedPicture'
import styles from './styles.scss'

export const PromotedTags: FC<{
  id: string
  onEdit: (id: string) => unknown
  onDelete: (id: string) => unknown
}> = ({ id, onEdit, onDelete }) => {
  const [promoted, setPromoted] = useState<IPromotedTag[]>(
    promotedTagsQuery.getAll()
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [
    isDeleteTagConfirmationModalOpen,
    setIsDeleteTagConfirmationModalOpen,
  ] = useState<boolean>(false)
  const { t } = useTranslation('groupSettingsPage')

  useEffect(() => {
    loadGroupPromotedTags(id)
    const sub = promotedTagsQuery
      .selectAll()
      .subscribe((value) => setPromoted(value))

    const loadingSub = promotedTagsQuery
      .selectLoading()
      .subscribe((value) => setIsLoading(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
      loadingSub && !loadingSub.closed && loadingSub.unsubscribe()
    }
  }, [])

  return (
    <div data-testid="promoted-tags-settings">
      {isLoading && <Spinner />}

      {promoted.length === 0 && !isLoading && (
        <div className={styles.noRecords}>
          <p>
            {/* @todo add translation */}
            no promoted tags yet, create some
          </p>
        </div>
      )}

      {promoted.length > 0 && (
        <ul className={styles.promotedList}>
          {promoted.map((p) => (
            <li className={styles.item} key={`promoted-${p.id}`}>
              <div className={styles.imageWrapper}>
                <div className={styles.actionButtons}>
                  {isDeleteTagConfirmationModalOpen && (
                    <Modal
                      additionalStyles={styles.deleteTagModal}
                      onClose={() => setIsDeleteTagConfirmationModalOpen(false)}
                    >
                      <h2 className={styles.header}>{t('areYouSure')}</h2>
                      <p className={styles.desc}>
                        Eteu in occaecat occaecat consectetur et laboris
                        aliquip.
                      </p>
                      <div className={styles.buttons}>
                        <Button
                          additionalStyles={styles.no}
                          onClick={() => {
                            setIsDeleteTagConfirmationModalOpen(false)
                          }}
                        >
                          <i>
                            <IoIosCloseCircle />
                          </i>
                          {t('noBtn')}
                        </Button>
                        <Button
                          onClick={() => {
                            onDelete(p.id)
                            setIsDeleteTagConfirmationModalOpen(false)
                          }}
                        >
                          <i>
                            <IoIosCheckbox />
                          </i>
                          {t('yesBtn')}
                        </Button>
                      </div>
                    </Modal>
                  )}
                  <Button
                    additionalStyles={styles.btn}
                    onClick={() => setIsDeleteTagConfirmationModalOpen(true)}
                  >
                    <i>
                      <IoMdTrash />
                    </i>
                  </Button>
                  <Button
                    additionalStyles={styles.btn}
                    onClick={() => {
                      onEdit(p.id)
                    }}
                  >
                    <i>
                      <IoIosSettings />
                    </i>
                  </Button>
                </div>
                {p.logo.status === FileStatus.uploaded && (
                  <UploadedPicture
                    additionalStyles={styles.uploadedImage}
                    jpg={p.logo.files[0]}
                  />
                )}
                {!p.logo.status && (
                  <Picture {...PromotedTagNoImage['200x200']} />
                )}
                {p.logo.status === FileStatus.ready && (
                  <Picture {...p.logo.files['200x200']} />
                )}
              </div>
              <div className={styles.tagNameDesc}>
                <h3 className={styles.tag}>#{p.tag}</h3>
                <p>{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
