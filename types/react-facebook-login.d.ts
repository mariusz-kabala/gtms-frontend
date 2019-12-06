import 'react-facebook-login'

declare module 'react-facebook-login' {
  export interface ReactFacebookLoginProps {
    render: (params: {
      onClick?(event: React.MouseEvent<any>): void
      isDisabled?: boolean
      isDisabled
      isDisabled?: boolean
      isSdkLoaded: boolean
    }) => any
  }
}
