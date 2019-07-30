import NextI18Next from "next-i18next"

const nextI18next = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["pl", "de"],
  localeSubpaths: "all",
})

nextI18next.i18n.languages = ["en", "pl", "de"]

export const { withTranslation, i18n, appWithTranslation } = nextI18next

export default nextI18next
