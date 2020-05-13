import React, { FC } from 'react'

export const Picture: FC<{
  jpg?: string
  webp?: string
  additionalStyles?: string
}> = ({ jpg, webp, additionalStyles }) => (
  <picture className={additionalStyles}>
    {webp && <source srcSet={webp} type="image/webp" />}
    <source srcSet={jpg} type="image/jpeg" />
    <img src={jpg} />
  </picture>
)
