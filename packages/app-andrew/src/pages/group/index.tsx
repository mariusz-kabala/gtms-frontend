import React from 'react'
import { NextPage } from 'next'
import { Navigation } from '@gtms/ui/Navigation'
import { PostSingle } from '@gtms/ui/PostSingle'

const GroupPage: NextPage<{}> = () => {
  return (
    <>
      <PostSingle />
      <Navigation />
    </>
  )
}

export default GroupPage
