import React, { FC, ReactNode } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const WrapperMain: FC<{
  additionalStyles: string
  isActive: boolean
  children: ReactNode
}> = ({ additionalStyles, children }) => {
  // @todo uncomment when Sidebar and Navigation ready
  // const [state, setState] = useState<boolean>(isActive)

  // <Sidebar
  //   isActive={state}
  //   onClose={() => setState(false)}>
  //   <>
  //     <img src={Logo} alt='' style={{ width: '100%' }} />
  //     {/* <Navigation /> */}
  //   </>
  // </Sidebar>

  return (
    <>
      <div className={cx(styles.wrapper, additionalStyles)}>
        <div className={styles.wrapperTwo}>{children}</div>
      </div>
    </>
  )
}
