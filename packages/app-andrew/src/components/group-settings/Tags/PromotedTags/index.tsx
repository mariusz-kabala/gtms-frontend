import React, { FC, useState, useEffect } from 'react'
import { promotedTagsQuery, loadGroupPromotedTags } from '@gtms/state-tag'
import { IPromotedTag, FileStatus } from '@gtms/commons'
import { Spinner } from '@gtms/ui/Spinner'
import { Picture } from '@gtms/ui/Picture'
import { UploadedPicture } from '@gtms/ui/UploadedPicture'
import { PromotedTagNoImage } from '../../../../enums/noImage'
import styles from './styles.scss'
import { IoMdTrash, IoIosHammer } from 'react-icons/io'

export const PromotedTags: FC<{
  id: string
  onEdit: (id: string) => unknown
  onDelete: (id: string) => unknown
}> = ({ id, onEdit, onDelete }) => {
  const [promoted, setPromoted] = useState<IPromotedTag[]>(
    promotedTagsQuery.getAll()
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    loadGroupPromotedTags(id)
    const sub = promotedTagsQuery
      .selectAll()
      .subscribe((value) => setPromoted(value))

    const loadingSub = promotedTagsQuery
      .selectLoading()
      .subscribe((value) => setIsLoading(value))

    return () => {
      sub.unsubscribe()
      loadingSub.unsubscribe()
    }
  }, [])

  return (
    <div data-testid="promoted-tags-settings">
      {isLoading && (
        <p className={styles.loader}>
          <Spinner />
        </p>
      )}

      {promoted.length === 0 && !isLoading && (
        <p className={styles.noRecords}>no promoted tags yet, create some</p>
      )}

      {promoted.length > 0 && (
        <ul className={styles.promotedList}>
          {promoted.map((p) => (
            <li key={`promoted-${p.id}`}>
              {p.logo.status === FileStatus.uploaded && (
                <UploadedPicture
                  additionalStyles={styles.uploadedImage}
                  jpg={p.logo.files[0]}
                />
              )}
              {!p.logo.status && <Picture {...PromotedTagNoImage['50x50']} />}
              {p.logo.status === FileStatus.ready && (
                <Picture {...p.logo.files['50x50']} />
              )}
              <h3>#{p.tag}</h3>
              <p>{p.description}</p>
              <div className={styles.actionButtons}>
                <i
                  onClick={() => {
                    onDelete(p.id)
                  }}
                >
                  <IoMdTrash />
                </i>{' '}
                <i
                  onClick={() => {
                    onEdit(p.id)
                  }}
                >
                  <IoIosHammer />
                </i>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
