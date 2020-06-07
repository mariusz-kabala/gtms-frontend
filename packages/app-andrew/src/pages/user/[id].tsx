import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'

type UserPageProps = {
  namespacesRequired: readonly string[]
}

const UserPage: NextPage<UserPageProps> = () => {
  return <div>USER PAGE</div>
}

UserPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<UserPageProps> => {
  return Promise.resolve({
    namespacesRequired: ['userPage'],
  })
}

export default UserPage
