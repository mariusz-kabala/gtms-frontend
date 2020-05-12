import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

const Ground = () => <svg className={styles.ground} />
const Hills = () => (
  <svg className={styles.hills} width={700} height={170}>
    <path fill="#9b9d57" d="M480 70l50 30 30-10-44-50z" />
    <path fill="#7d8f57" d="M480 70l50 30-118-16z" />
    <path fill="#748857" d="M530 100L412 84l-52 54zM360 138l-120 2 80-58z" />
    <path fill="#88945a" d="M412 84l-52 56-40-58z" />
    <path fill="#597252" d="M320 82l-80 58-30-76z" />
    <path fill="#4f654f" d="M300 78l-200 22-100 4 170-46z" />
    <path fill="#536a50" d="M172 58l-27-18-23 8-56 31-66 25z" />
  </svg>
)
const Trees = ({ cssClass }) => (
  <svg className={cssClass}>
    <g className="prefix__tree">
      <path fill="#3f2145" d="M425 105l2-31-6-10 4-1 5 8 8-8 2 1-9 12-2 29z" />
      <path fill="#812743" d="M429 105l2-29 1-1v29z" />
      <path fill="#282246" d="M402 51l9 12 9-1 7-3 5-6-8 12-13-1z" />
      <path fill="#6a7749" d="M427 59l6-16-15-13 11 2 8 11-5 10z" />
      <path fill="#210f3f" d="M433 53l2 9 10 5 10-10-11 8-7-4z" />
      <path fill="#354346" d="M437 61l1-14h8l4 14z" />
      <path fill="#292941" d="M437 61h13l-5 6z" />
      <path fill="#2b2d42" d="M433 53l4 8 1-14z" />
      <path d="M438 47h8v-6z" />
      <path fill="#5b7049" d="M446 47v-6l8 7z" />
      <path fill="#515d49" d="M444 41l10 7 2 8-6 5z" />
      <path fill="#292e42" d="M411 63l9-1 7-3-12-10z" />
      <path fill="#424f46" d="M427 59l6-16-18 6z" />
      <path fill="#48604a" d="M433 43l-15-13-3 19z" />
      <path fill="#3a5449" d="M418 30l-11 5 8 14z" />
      <path fill="#344847" d="M407 35l-7 13 15 1z" />
      <path fill="#292c4b" d="M400 48l11 15 4-14z" />
      <path fill="#648155" d="M427 104l-54 6-68 2-41 4-7 4 42 2 75-10 58-8z" />
    </g>
  </svg>
)
const Tent1 = ({ cssClass }) => {
  return (
    <svg viewBox="0 0 460 460" className={cssClass}>
      <path
        d="M460 445c0 8.284-6.716 15-15 15H15c-8.284 0-15-6.716-15-15s6.716-15 15-15h2.609L210 102.222l-44.751-76.243C158.5 14.481 166.791 0 180.124 0a17.248 17.248 0 0 1 14.875 8.517L230 68.148l35.001-59.631A17.248 17.248 0 0 1 279.876 0c13.333 0 21.624 14.481 14.875 25.979L250 102.222 442.391 430H445c8.284 0 15 6.716 15 15z"
        fill="#bc3c28"
      />
      <path
        d="M230 460H15c-8.284 0-15-6.716-15-15s6.716-15 15-15h2.609L210 102.222l-44.751-76.243C158.5 14.481 166.791 0 180.124 0a17.248 17.248 0 0 1 14.875 8.517L230 68.148V460z"
        fill="#d4632e"
      />
      <path
        d="M297.93 369.474L310 460H150l12.07-90.526C166.61 335.427 195.652 310 230 310c34.348 0 63.39 25.427 67.93 59.474z"
        fill="#544236"
      />
      <path
        d="M230 460h-80l12.07-90.526C166.61 335.427 195.652 310 230 310v150z"
        fill="#5f4b3d"
      />
    </svg>
  )
}
const Tent2 = ({ cssClass }) => (
  <svg viewBox="0 0 512 512" className={cssClass}>
    <path fill="#da1c4b" d="M256 39.724h123.586v70.621H256z" />
    <g fill="#143441">
      <path d="M17.655 498.759c-4.873 0-8.828-3.955-8.828-8.828v-88.276c0-4.873 3.955-8.828 8.828-8.828s8.828 3.955 8.828 8.828v88.276c0 4.873-3.955 8.828-8.828 8.828zM494.345 498.759c-4.873 0-8.828-3.955-8.828-8.828v-88.276c0-4.873 3.955-8.828 8.828-8.828 4.873 0 8.828 3.955 8.828 8.828v88.276c-.001 4.873-3.955 8.828-8.828 8.828zM256 189.793c-4.873 0-8.828-3.955-8.828-8.828V22.069c0-4.873 3.955-8.828 8.828-8.828s8.828 3.955 8.828 8.828v158.897c0 4.872-3.955 8.827-8.828 8.827z" />
    </g>
    <path fill="#d3843d" d="M512 498.759H0l256-353.104z" />
    <path fill="#995f5b" d="M388.414 498.759H123.586L256 269.241z" />
    <g fill="#ffd782">
      <path d="M256 269.241l-114.759 97.104-17.655 132.414zM256 269.241l114.759 97.104 17.655 132.414z" />
    </g>
  </svg>
)

export const PolAndRock: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="pol-and-rock"
    >
      <section className={styles.stage}>
        <div className={styles.socialMedia}>
          <img src='/images/polandrock/social_media.png' />
        </div>
        <img className={cx(styles.allegro, styles.icon)} src='/images/polandrock/allegro.png' />
        <img className={cx(styles.bankPodrozy, styles.icon)} src='/images/polandrock/bank_podrozy.png' />
        <img className={cx(styles.cocaCola, styles.icon)} src='/images/polandrock/cocacola.png' />
        <img className={cx(styles.kostrzynNadOdra, styles.icon)} src='/images/polandrock/kostrzyn_nad_odra.png' />
        <img className={cx(styles.lidl, styles.icon)} src='/images/polandrock/lidl.png' />
        <img className={cx(styles.logo, styles.icon)} src='/images/polandrock/logo.png' />
        <img className={cx(styles.play, styles.icon)} src='/images/polandrock/play.png' />
        <img className={cx(styles.video, styles.icon)} src='/images/polandrock/video.png' />
        <img className={cx(styles.vlogJurka, styles.icon)} src='/images/polandrock/vlog_jurka.png' />
        <img className={cx(styles.zakonczenie, styles.icon)} src='/images/polandrock/zakonczenie.png' />
        <img className={cx(styles.zarazBedzieCiemno, styles.icon)} src='/images/polandrock/zaraz_bedzie_ciemno.png' />
        <img className={cx(styles.zarazBedzieCzysto, styles.icon)} src='/images/polandrock/zaraz_bedzie_czysto.png' />
        <Tent1 cssClass={cx(styles.tent, styles.one, styles.icon)} />
        <Tent2 cssClass={cx(styles.tent, styles.two, styles.icon)} />
        <Hills />
        <Trees cssClass={cx(styles.trees, styles.one)}/>
        <Trees cssClass={cx(styles.trees, styles.two)}/>
        <Trees cssClass={cx(styles.trees, styles.three)}/>
        <Trees cssClass={cx(styles.trees, styles.four)} />
        <Ground />
        <div className={styles.sky}>
        <div
          className={styles.stars}
          style={{ backgroundImage: `url('/images/polandrock/stars.png')` }} />
          <div
            className={styles.twinkling} 
            style={{ backgroundImage: `url('/images/polandrock/twinkling.png')` }}
          />
        </div>
      </section>
    </div>
  )
}
