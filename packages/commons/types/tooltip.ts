import * as tippy from 'react-tippy'

declare module 'react-tippy' {
  export interface TooltipProps {
    onShow: () => void
  }
}
