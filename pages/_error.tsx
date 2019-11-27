import React from 'react'
import { NextPage, NextPageContext } from 'next'

export const ErrorPage: NextPage<{ statusCode: number | undefined }> = ({
  statusCode,
}) => {
  return (
    <p>
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

  return Promise.resolve({ statusCode })
}

export default ErrorPage
