import React, { FC } from 'react'
import { MockData } from '@gtms/ui/MockData'
import styles from './styles.scss'

export const NoRecords: FC<{ text: string }> = ({ text }) => (
  <div
    className={styles.noRecords}
    data-testid="navigation-dots-full-view-no-records"
  >
    <MockData />
    <MockData onClick={() => null} text={text} />
    <MockData numberOfElements={4} />
  </div>
)
