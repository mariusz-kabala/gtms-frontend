import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'

export interface TagPageProps {
  namespacesRequired: readonly string[]
}

const TagPage: NextPage<{}> = () => {
  return <div data-testid="tag-page">TAGS PAGE</div>
}

TagPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<TagPageProps> => {
  const { name } = ctx?.query

  return {
    namespacesRequired: ['tagPage'],
  }
}

export default TagPage
