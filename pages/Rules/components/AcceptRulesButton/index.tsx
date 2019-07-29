import { memo, useContext, useCallback } from "react"
import { useRouter } from "next/router"
import css from "./styles.scss"
import { RulesContext, IRulesContext } from "providers/Rules"
import {
  TranslationsContext,
  ITranslationsContext,
} from "providers/Translations"

export const AcceptRulesButton = memo(() => {
  const { acceptRules, callBackFunc } = useContext<IRulesContext>(RulesContext)
  const { t } = useContext<ITranslationsContext>(TranslationsContext)
  const router = useRouter()

  return (
    <button
      type="button"
      className={css.button}
      onClick={useCallback(() => {
        acceptRules()

        if (typeof callBackFunc === "function") {
          callBackFunc()
        } else {
          router.push("/")
        }
      }, [])}
    >
      {t("AcceptRulesButton.accept")}
    </button>
  )
})

export default AcceptRulesButton
