import { NextPage } from "next"
import RegistrationForm from "./components/Form"
import commonCss from "../styles.scss"
import { withTranslation } from "../../i18n"

interface IRegistrationPageProps {
  namespacesRequired?: string[]
  t: (key: string) => string
}

const RegistrationPage: NextPage<IRegistrationPageProps> = ({ t }) => {
  return (
    <div className={commonCss.page}>
      <section className={commonCss.header}>
        <p>{t("subtitle")}</p>
        <h1>{t("header")}</h1>
      </section>

      <RegistrationForm />
    </div>
  )
}

RegistrationPage.getInitialProps = async () => ({
  namespacesRequired: ["registration"],
  t: (key: string) => key,
})

export default withTranslation("registration")(RegistrationPage)
