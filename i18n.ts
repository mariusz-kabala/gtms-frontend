import NextI18Next from 'next-i18next'
import { useTranslation as originalUseTranslation } from 'react-i18next'

const nextI18next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['pl', 'de'],
  localeSubpaths: {
    en: 'en',
    pl: 'pl',
    de: 'de',
  },
  localePath: (process as any).browser ? 'locales' : 'public/locales',
})

nextI18next.i18n.languages = ['en', 'pl', 'de']

export type translateFunc = (key: string) => string

export interface IWithTranslations {
  namespacesRequired?: string[]
  t: translateFunc
}

export const fakeTranslateFunc: translateFunc = (key: string) => key

export const {
  withTranslation,
  i18n,
  appWithTranslation,
  Link,
  Router,
} = nextI18next

export const Trans = nextI18next.Trans

export const useTranslation = originalUseTranslation

export default nextI18next
