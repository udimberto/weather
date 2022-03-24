import { createElement } from 'react'
import { LinkNext } from '../Link/LinkNext'
import { getButtonClassNames } from './button.classNames'
import { ButtonAnchorProps, ButtonNextLinkProps, ButtonProps } from './button.props'

export function Button({
  as,
  children,
  className,
  disabled,

  isOutlined,
  cssKind,

  cssAlignItems,
  cssBlock,
  cssDisplay,
  cssJustifyItems,
  cssPadding,
  cssRingOffset,
  cssRounded,
  cssSize,
  cssTransition,
  cssWeight,
  ...rest
} : ButtonProps | ButtonAnchorProps | ButtonNextLinkProps & any) {
  const isNextLink = ['link', 'next'].includes(as)
  const props = {
    ...rest,
    disabled,
    className: getButtonClassNames({
      disabled,

      isOutlined,
      cssKind,

      cssAlignItems,
      className,
      cssBlock,
      cssDisplay,
      cssJustifyItems,
      cssPadding,
      cssRingOffset,
      cssRounded,
      cssSize,
      cssTransition,
      cssWeight,
    }),
  }

  if (isNextLink) {
    return (
      <LinkNext
        {...props}
      >
        {children}
      </LinkNext>
    )
  }

  return createElement(
    as || 'button',
    props,
    children
  )
}
