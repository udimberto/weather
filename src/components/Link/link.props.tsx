import { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { LinkProps as NextLinkProps } from 'next/link'

interface LinkCommonProps {
  env      ?: string
  className?: string
  id       ?: string
  title    ?: string
}

export interface LinkProps extends LinkCommonProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export interface LinkAnchorProps extends LinkCommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {}

export interface LinkNextProps extends LinkCommonProps, NextLinkProps {
  children : ReactNode
  onClick ?: (event: any) => void
  tabIndex?: number
}
