import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Logo } from 'components/common/Logo'
import commonCss from '../../styles.scss'
import { ImageCover } from 'components/common/ImageCover'
import { useTranslation } from 'i18n'
import { Spinner } from 'components/common/Spinner'
import { checkCodeReq } from 'api/auth'
import { ResetPasswordForm } from 'components/reset-password/Form'

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
        <div data-testid="remind-password-page" className={commonCss.page}>
            <section
                style={{
                // @todo remove it soon
                position: 'relative',
                background: 'black',
                padding: '20px',
                zIndex: 1,
                }}
            >
                <div className={commonCss.header}>
                <p>{t('subtitle')}</p>
                <h1>{t('title')}</h1>
                </div>
                <Logo />
                {isLoading && <Spinner />}
                {!isLoading && !isPasswordChanged && <ResetPasswordForm code={code} onSuccess={() => setIsPasswordChanged(true)} />}
                {!isLoading && isPasswordChanged && <p data-testid="reset-password-changed-confirmation">
            {t('passwordHasBeenChanged')}</p>}
            </section>
            <ImageCover />
        </div>
    )
}

ResetPasswordPage.getInitialProps = async () => {
    return Promise.resolve({ namespacesRequired: ['resetPassword'] })
}

export default ResetPasswordPage
