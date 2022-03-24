import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { LinkNextProps } from '../Link/link.props'

export type ButtonKindType =
  'transparent'
  | 'black'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'facebook'
  | 'whatsapp'

interface ButtonCommonProps {
  className ?: string
  disabled  ?: boolean
  id        ?: string
  title     ?: string

  isOutlined?: boolean
  cssKind   ?: ButtonKindType

  cssAlignItems  ?: string
  cssBlock       ?: boolean
  cssDisplay     ?: string
  cssPadding     ?: string
  cssJustifyItems?: string
  cssRounded     ?: string
  cssSize        ?: 'xs' | 'sm' | 'md' | 'lg'
  cssWeight      ?: 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold'
  cssTransition  ?: string
  cssRingOffset  ?: string
}

export interface ButtonProps extends ButtonCommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as    ?: any
  href  ?: string
  target?: string
  rel   ?: string
}

export interface ButtonAnchorProps extends ButtonCommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: any
}

export interface ButtonNextLinkProps extends ButtonCommonProps, LinkNextProps {
  children: ReactNode
}
