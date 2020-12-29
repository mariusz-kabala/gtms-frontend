import React from 'react'
import { NextPage, NextPageContext } from 'next'
// ui
import { InternalError } from '@gtms/ui/InternalError'
import { FourHundredFour } from '@gtms/ui/FourHundredFour'

export const ErrorPage: NextPage<{ statusCode: number | undefined }> = ({
  statusCode,
}) => {
  if (statusCode === 404) {
    return <InternalError statusCode={statusCode} />
    return <FourHundredFour />
  }

  return <InternalError statusCode={statusCode} />
}

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  const payload = await ctx

  const statusCode = payload.res
    ? payload.res.statusCode
    : payload.err
    ? payload.err.statusCode
    : 404

  return Promise.resolve({ statusCode, namespacesRequired: ['page404'] })
}

export default ErrorPage
