import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { CloudIcon } from '@heroicons/react/solid'

export type LayoutProps = {
  children?: ReactNode
}

export function Layout({ children } : LayoutProps) {
  /**
   * Routing values
   */
  const router = useRouter()

  /**
   * Local values
   */
  const [routeLoading, setRouteLoading] = useState(false)

  /**
   *
   */
  const onRouteChangeStart = useCallback(() => {
    setRouteLoading(true)
  }, [])

  /**
   *
   */
  const onRouteChangeComplete = useCallback(() => {
    setRouteLoading(false)
  }, [])

  /**
   * UI values
   */
  const loadingSize = classNames(
    'w-8',
    'h-8',
  )
  const baseColors  = classNames(
    'bg-gradient-to-b',

    'text-base-900',
    'from-base-200',
    'to-base-100',

    'dark:text-base-50',
    'dark:from-base-900',
    'dark:to-base-800',
  )

  /**
   *
   */
  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    router.events.on('routeChangeError', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
      router.events.off('routeChangeError', onRouteChangeComplete)
    }
  }, [onRouteChangeComplete, onRouteChangeStart, router])

  return (
    <div
      id="layout"
      className={classNames(
        'layout',
        baseColors,
      )}
    >
      <>
        {children}
      </>
      <span
        id="layout-route-loading"
        aria-hidden={routeLoading ? 'false' : 'true'}
        className={classNames(
          'z-50',
          'flex',
          'fixed',
          'top-3',
          'left-1/2',
          '-translate-x-1/2',
          'transition-all',
          loadingSize,
          (routeLoading ? classNames(
            'opacity-100',
          ) : classNames(
            'opacity-0',
          ))
        )}
      >
        <span
          className={classNames(
            'relative',
          )}
        >
          <span
            className={classNames(
              'animate-ping',
              'absolute',
              'inline-flex',
              'h-full',
              'w-full',
              'rounded-full',
              'opacity-75',
              'bg-primary-300',
              'dark:bg-primary-500',
            )}
          />
          <span
            className={classNames(
              'relative',
              'inline-flex',
              'rounded-full',
              'bg-primary-400',
              loadingSize,
            )}
          >
            <CloudIcon
              className={classNames(
                '-scale-75',
                'rotate-180',
                'animate-pulse',
                loadingSize,
              )}
            />
          </span>
        </span>
      </span>
    </div>
  )
}
