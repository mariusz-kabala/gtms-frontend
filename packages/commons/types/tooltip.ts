import 'react-tippy'

declare module 'react-tippy' {
  export interface TooltipProps {
    onShow: () => void
  }
}
