import React, { memo, useCallback, useContext } from 'react'
import styles from './styles.scss'
import { useRouter } from 'next/router'
import { NFC } from '@gtms/commons/types/nfc.d'
import { RulesContext, IRulesContext } from '../../../providers/Rules'

export const AcceptRulesButton: NFC<{}> = memo(() => {
  const { acceptRules, callBackFunc } = useContext<IRulesContext>(RulesContext)
  const router = useRouter()

  return (
    <button
      className={styles.btn}
      type="button"
      onClick={useCallback(() => {
        acceptRules()

        if (typeof callBackFunc === 'function') {
          callBackFunc()
        } else {
          router.push('/')
        }
      }, [acceptRules, callBackFunc, router])}
    >
      Accepts buttons
    </button>
  )
})

export default AcceptRulesButton
