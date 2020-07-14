import React, { FC, useState } from 'react'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { IFavsState, favsState, favsState$ } from './state.query'

export const Favs: FC<{
  favs: string[]
}> = ({ favs }) => {
  const [state, setState] = useState<IFavsState>(favsState())
  return <div data-testid="post-favs"></div>
}
