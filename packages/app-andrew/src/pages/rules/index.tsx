import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
// components
import { AcceptRulesButton } from '@app/components/rules/AcceptRulesButton'
// styles
import styles from './styles.scss'

export const RulesPage: NextPage<{}> = () => {
  const { t } = useTranslation('rulesPage')

  return (
    <div className={styles.pageWrapper} data-testid="rules-page">
      <div className={styles.wrapper}>
        <h2 className={styles.header}>{t('header.subtitle')}</h2>
        <p>
          Lorem et est aliquip nisi et laborum enim proident amet velit esse
          voluptate laboris anim. Nisi ullamco labore tempor esse aliquip ea.
          Cillum ex fugiat sit qui sint nostrud sunt velit elit. Magna minim
          laborum duis ex in do sit adipisicing mollit ullamco ipsum Lorem. Quis
          sunt enim consectetur pariatur laborum nulla eiusmod id dolore
          commodo. Elit Lorem ullamco voluptate voluptate labore commodo aliqua
          ad eu occaecat pariatur.
        </p>
        <p>
          Cupidatat aute dolor pariatur id do incididunt nisi dolor incididunt
          minim do ea veniam. Laboris aute et nisi cillum reprehenderit occaecat
          cupidatat pariatur amet voluptate ea tempor. Laborum eu sit
          reprehenderit ea consequat adipisicing. Nulla incididunt incididunt
          anim pariatur sit ipsum proident minim anim sunt ad minim. Deserunt
          excepteur in excepteur amet aliquip elit qui pariatur est irure et ad
          minim labore.
        </p>
        <p>
          Sit anim magna aute officia amet. Ipsum cillum occaecat pariatur ea
          enim in nostrud. Proident proident est tempor est exercitation ea
          excepteur sunt.
        </p>
        <p>
          Pariatur excepteur et in adipisicing. Nostrud nisi deserunt
          consectetur et dolor culpa culpa proident. Sit commodo sit nulla nisi
          nostrud quis duis magna sint ea sit. Ad minim labore esse magna elit
          commodo proident ea mollit sunt magna esse culpa. Deserunt veniam
          pariatur nostrud fugiat eiusmod incididunt qui fugiat.
        </p>
        <p>
          Voluptate cupidatat laborum aliquip tempor qui officia ea laboris ex
          deserunt veniam laboris Lorem. Cillum ad officia culpa est proident
          elit qui. Dolor esse est nisi non. Fugiat pariatur in cupidatat do
          irure est. Non deserunt velit qui proident labore ullamco non.
        </p>
        <p>
          Exercitation cupidatat in ad non magna quis Lorem. Ut enim adipisicing
          veniam sunt mollit. Aliqua laboris dolore pariatur do laboris ullamco
          proident ullamco aute in. Labore esse adipisicing consectetur sit eu
          pariatur proident culpa nulla id.
        </p>
        <p>
          Tempor qui non et mollit excepteur velit est ad officia. Exercitation
          proident pariatur reprehenderit magna cillum pariatur nulla velit. Ex
          ex labore consequat amet dolor esse dolore. Quis aliquip aute ut
          nostrud aute voluptate voluptate quis velit. Labore mollit sunt
          exercitation officia eu minim commodo ad commodo mollit non tempor.
          Aute pariatur minim mollit minim non ex nisi esse magna ex deserunt
          irure. Sit pariatur aute nisi mollit fugiat sint ullamco fugiat elit
          labore tempor.
        </p>
        <AcceptRulesButton />
      </div>
    </div>
  )
}

RulesPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['rulesPage'] })
}

export default RulesPage
