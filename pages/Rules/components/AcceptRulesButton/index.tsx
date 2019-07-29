import { memo, useContext, useCallback } from 'react'
import css from './styles.scss'
import { RulesContext, IRulesContext } from 'providers/Rules'
import { TranslationsContext, ITranslationsContext } from 'providers/Translations'

export const AcceptRulesButton = memo(() => {
    const { acceptRules, callBackFunc } = useContext<IRulesContext>(RulesContext)
    const { t } = useContext<ITranslationsContext>(TranslationsContext)

    return (
        <button
            type='button'
            className={css.button}
            onClick={useCallback(() => {
                acceptRules()

                if (typeof callBackFunc === 'function') {
                    callBackFunc()
                } else {
                    history.push('/')
                }
            }, [])}
        >
            {t('AcceptRulesButton.accept')}
        </button>
    )
})


export default AcceptRulesButton
