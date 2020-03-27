import React, { memo, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { NFC } from '@gtms/commons/types/nfc.d'
import css from './styles.scss'
import { RulesContext, IRulesContext } from '../../../providers/Rules'
import { Trans } from '@gtms/commons/i18n'

export const AcceptRulesButton: NFC<{}> = memo(() => {
  const { acceptRules, callBackFunc } = useContext<IRulesContext>(RulesContext)
  const router = useRouter()

  return (
    <button
      type="button"
      className={css.button}
      onClick={useCallback(() => {
        acceptRules()

        if (typeof callBackFunc === 'function') {
          callBackFunc()
        } else {
          router.push('/')
        }
      }, [acceptRules, callBackFunc, router])}
    >
      <Trans i18nKey="rules:AcceptRulesButton.accept" />
    </button>
  )
})

export default AcceptRulesButton
