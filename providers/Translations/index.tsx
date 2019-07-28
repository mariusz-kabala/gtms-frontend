import { Component, createContext } from 'react'

const DEFAULT_LANGUAGE = 'en'

export type TranslateFunc = (t: string) => string
export type TranslationsList = {[key: string]: string}

export interface ITranslationsContext {
    t: TranslateFunc
    language: string
    isLoading: boolean
}

interface ITranslationsState {
    isLoading: boolean,
    language: string,
    translations: TranslationsList
}

interface ITranslationsProps {
    lang?: string
    translations: TranslationsList
    children: React.ReactChild
}

export const TranslationsContext = createContext<ITranslationsContext>({
    t: (key) => key,
    language: DEFAULT_LANGUAGE,
    isLoading: false
})

export default class TranslationsProvider extends Component<ITranslationsProps, ITranslationsState> {
    constructor(props: ITranslationsProps) {
        super(props)

        this.state = {
            language: this.getInitialLanguage(props),
            translations: this.getInitialTranslations(props),
            isLoading: false,
        }
    }

    componentDidMount() {
        if (Object.keys(this.state.translations).length === 0) {
            this.fetchTranslations()
        }
    }

    getInitialLanguage(props: ITranslationsProps) {
        if (props.lang) {
            return props.lang
        }

        if (document) {
            return document.documentElement.lang
        }

        return DEFAULT_LANGUAGE
    }

    getInitialTranslations(props: ITranslationsProps) {
        if (props.translations) {
            return props.translations
        }

        return {}
    }

    fetchTranslations(language?: string): void {
        const { isLoading } = this.state

        if (!language) {
            language = this.state.language
        }

        if (!isLoading) {
            this.setState({
                isLoading: true,
            })
        }
        
        // fetch(`${__TRANSLATIONS_URL__}/${language}.json`)
        //     .then((res) => res.json())
        //     .then((translations) =>
        //         this.setState({
        //             translations,
        //             language,
        //             isLoading: false,
        //         })
        //     )
    }

    translate = (key: string): string => {
        const { translations } = this.state

        return translations && translations[key] ? translations[key] : key
    }

    render() {
        const { children } = this.props
        const { language, isLoading } = this.state

        return (
            <TranslationsContext.Provider
                value={{
                    language,
                    isLoading,
                    t: this.translate,
                }}
            >
                {children}
            </TranslationsContext.Provider>
        )
    }
}

export const withTranslations =  <P extends object>(Component: React.ComponentType<P>) => (props: P) => (
    <TranslationsContext.Consumer>
        {(componentProps) => <Component {...componentProps} {...props} />}
    </TranslationsContext.Consumer>
)
