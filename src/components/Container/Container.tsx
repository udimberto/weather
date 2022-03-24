import cn from 'classnames'
import { BaseHTMLAttributes, createElement } from 'react'

const sizesClassNames = {
  xl: 'max-w-[84rem]',
  lg: 'max-w-[66rem]',
  md: 'max-w-[44rem]',
  sm: 'max-w-[28rem]',
  xs: 'max-w-[16rem]',
} as any

export interface ContainerProps extends BaseHTMLAttributes<HTMLDivElement> {
  as       ?: any,
  className?: string
  fluid    ?: boolean
  semiFluid?: boolean
  noPadding?: boolean
  size     ?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}

export function Container({
  as        = 'div',
  children,
  className,
  fluid     = false,
  semiFluid = false,
  noPadding = false,
  size      = 'md',
  ...rest
} : ContainerProps) {

  return createElement(
    as,
    {
      ...rest,
      className: cn(
        'container',
        className,
        'mx-auto',
        'w-full',
        (fluid && 'max-w-fluid'),
        (semiFluid && 'max-w-[1920px]'),
        (!fluid && sizesClassNames[size]),
        (!noPadding && 'px-4'),
      ),
    },
    children
  )
}
