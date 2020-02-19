import React, { FC } from 'react'
import styles from './styles.scss'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'

export const PromotedTags: FC<{}> = () => (
  <div className={styles.promotedTags}>
    <TagGroup additionalStyles={styles.promotedTags}>
      {/* @todo remove mock data */}
      <Tag label="Mechanik" />
      <Tag label="Oddam" />
      <Tag label="SerwisRowerowy" />
      <Tag label="Impreza" />
      <Tag label="DzienKobiet" />
      <Tag label="Znaleziono" />
      <Tag label="Polityka" />
    </TagGroup>
  </div>
)
