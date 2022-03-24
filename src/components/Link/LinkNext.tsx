/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'
import { LinkNextProps } from './link.props'

export function LinkNext(props : LinkNextProps) {
  const {
    as,
    href,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale,
    ...rest
  } = props

  return (
    <NextLink
      as={as}
      href={href}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
    >
      <a
        {...rest}
      />
    </NextLink>
  )
}
