import React, { useEffect, useState } from 'react'
import styles from 'components/common/Forms/styles.scss'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { ImageCover } from 'components/common/ImageCover'
import { Logo } from 'components/common/Logo'
import { ResetPasswordForm } from 'components/reset-password/Form'
import { Spinner } from 'components/common/Spinner'
import { useTranslation } from 'i18n'
import { checkCodeReq } from 'api/auth'

export const ResetPasswordPage: NextPage<{}> = () => {
    const { t } = useTranslation('resetPassword')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()
    const code: string = router.query.code as string
    const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false)

    useEffect(() => {
        checkCodeReq({code})
            .then(() => {
                setIsLoading(false)
            })
            .catch(() => {
                router.push({
                    pathname: 'login',
                })
            })
    }, [code])

    return (
        <div data-testid="remind-password-page" className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <AnimatedComponent>
                    <Logo />
                </AnimatedComponent>
                {isLoading && <Spinner />}
                {!isLoading && !isPasswordChanged && <ResetPasswordForm code={code} onSuccess={() => setIsPasswordChanged(true)} />}
                {!isLoading && isPasswordChanged && <p data-testid="reset-password-changed-confirmation">
            {t('passwordHasBeenChanged')}</p>}
            </div>
            <ImageCover />
            <span>
            {/* @todo remove temporary code */}
            {t('subtitle')}
            </span>
        </div>        
    )
}

ResetPasswordPage.getInitialProps = async () => {
    return Promise.resolve({ namespacesRequired: ['resetPassword'] })
  }

export default ResetPasswordPage
