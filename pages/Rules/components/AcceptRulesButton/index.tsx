import { memo, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { NFC } from 'types/nfc.d'
import css from './styles.scss'
import { RulesContext, IRulesContext } from 'providers/Rules'
import { Trans } from 'i18n'

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
      }, [])}
    >
      <Trans i18nKey="rules:AcceptRulesButton.accept" />
    </button>
  )
})

export default AcceptRulesButton
