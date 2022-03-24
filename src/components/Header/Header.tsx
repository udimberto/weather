import classNames from 'classnames'
import { AllHTMLAttributes } from 'react'
import { useUI, useSearch } from '../../hooks'

import { Container, ContainerProps } from '../Container/Container'
import { Title, TitleProps } from '../Title/Title'
import { HeaderSearch } from './HeaderSearch'
import { HeaderGeoLocation } from './HeaderGeoLocation'

export interface HeaderProps extends AllHTMLAttributes<HTMLElement> {
  padding       ?: string
  propsContainer?: ContainerProps
  propsTitle    ?: TitleProps
}

export function Header({
  children,
  className,
  padding        = 'py-4',
  propsContainer = {},
  propsTitle     = {},
} : HeaderProps) {
  /**
   * Generic Contexts values
   */
  const { inputInFocus } = useSearch()
  const {
    hasGeoLocationSupport,
    windowXS,
  } = useUI()

  /**
   * Local UI values
   */
  const focusOnlyInSearch = !!(inputInFocus && !!windowXS)
  const shouldDisplay     = !!(children)
  const spacerHeight      = (!shouldDisplay ? 0 : (focusOnlyInSearch ? 76 : 116))
  const titleHeight       = (focusOnlyInSearch ? 0 : (windowXS ? 44 : 48))

  return (
    <>
        <header
          id="header"
          className={classNames(
            'header',
            className,
            'z-50',
            'fixed',
            'top-0',
            'right-0',
            'left-0',
            'backdrop-blur-md',
            'transition-all',
            (!shouldDisplay ? 'p-0 overflow-hidden' : padding),
          )}
          style={{
            height: spacerHeight,
          }}
        >
          {shouldDisplay && (
            <Container {...propsContainer}>
              <div
                className={classNames(
                  'grid grid-cols-4 sm:grid-cols-5',
                  'transition-all',
                  ((focusOnlyInSearch || !hasGeoLocationSupport) ? 'gap-x-0' : 'gap-x-2 sm:gap-x-4'),
                  (focusOnlyInSearch ? 'opacity-0' : 'opacity-100 -mt-1 sm:-mt-2 pb-2'),
                )}
                style={{
                  height: titleHeight,
                }}
              >
                <div
                  className={classNames(
                    'col-span-2 sm:col-span-3',
                  )}
                >
                  <Title {...propsTitle}>
                    {children}
                  </Title>
                </div>
                {hasGeoLocationSupport && (
                  <div
                    className={classNames(
                      'col-span-2',
                      'flex',
                      'align-middle',
                      'items-center',
                    )}
                  >
                    <HeaderGeoLocation />
                  </div>
                )}
              </div>
              <div>
                <HeaderSearch />
              </div>
            </Container>
          )}
        </header>
        <span
          id="header-spacer"
          className={classNames(
            'transition-all',
          )}
          style={{
            height: spacerHeight,
          }}
        />
      </>
  )
}
