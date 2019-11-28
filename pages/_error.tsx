import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { FourHundredFour } from 'components/common/FourHundredFour'

export const ErrorPage: NextPage<{ statusCode: number | undefined }> = ({
  statusCode,
}) => {
  if (statusCode === 404) {
    return <FourHundredFour />
  }

  return (
    <p data-testid="internal-error">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
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
