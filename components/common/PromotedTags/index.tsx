import React, { FC } from 'react'
import styles from './styles.scss'
import { Tag } from 'components/common/Tag'
import { TagGroup } from 'components/common/TagGroup'

export const PromotedTags: FC<{}> = () => (
  <div className={styles.promotedTags}>
    <TagGroup additionalStyles={styles.promotedTags}>
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
