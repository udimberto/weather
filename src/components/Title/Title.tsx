import cn from 'classnames'
import { AllHTMLAttributes, createElement } from 'react'

export const titleSizesClassNames = {
  h1: 'text-3xl md:text-4xl font-bold',
  h2: 'text-xl md:text-2xl',
  h3: 'text-lg md:text-xl',
} as any

export interface TitleProps extends AllHTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3'
}

export function Title({
  as = 'h1',
  children,
  className = '',
  ...rest
} : TitleProps) {
  const props = {
    ...rest,
    className: cn(
      'title',
      className,
      titleSizesClassNames[as],
    ),
  }

  return createElement(
    as,
    props,
    children
  )
}
