import React from 'react'
import { GroupCreateForm } from 'components/groups/GroupCreateForm'
import { NextPage } from 'next'
import { useCheckAccess } from 'hooks/access'
import { authOrRedirectToLogin } from 'server/auth'
import { ImageCover } from 'components/common/ImageCover'

const GroupsPage: NextPage<{
  accessToken?: string
  refreshToken?: string
}> = ({ accessToken, refreshToken }) => {
  useCheckAccess({ accessToken, refreshToken })

  return (
    <>
      <h2
        style={{
          position: 'relative',
          zIndex: 99,
          margin: '50px auto',
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '50px',
        }}
      >
        CREATE GROUP
      </h2>
      <section
        style={{
          // @todo remove it soon
          position: 'relative',
          background: 'black',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <GroupCreateForm
        // @todo create on Succes method
        // onSuccess={() =>
        //   Router.push({
        //     pathname: `/${i18n.language}${redirectTo || '/'}`,
        //   })
        // }
        />
      </section>
      <ImageCover />
    </>
  )
}

GroupsPage.getInitialProps = authOrRedirectToLogin

export default GroupsPage
