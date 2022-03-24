import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useUI } from '../../hooks'
import { Button } from '../Button/Button'

export function HeaderGeoLocation() {
  /**
   * Router values
   */
  const router = useRouter()

  /**
   * Context values
   */
  const { hasGeoLocationSupport, windowXS } = useUI()

  /**
   * Local values
   */
  const [error, setError]     = useState<any>(null)
  const [getting, setGetting] = useState(false)

  /**
   * Callback for Geographic Location success:
   * Redirect user for Weather Location page
   *
   * @param {Object} position
   */
  const getCurrentPositionSuccessCallback = useCallback((position: GeolocationPosition) => {
    const { coords } = position
    const { latitude, longitude } = coords

    setGetting(false)
    router.push(`/${latitude},${longitude}`)
  }, [router])

  /**
   * Callback for Geographic Location error:
   *
   * @param {Object} error
   */
  const getCurrentPositionErrorCallback = useCallback((error) => {
    setError(error)
    setGetting(false)
    console.error('Header Geo Location error', error)
  }, [])

  /**
   * Trigger the Browser Geo Location API
   */
  const getBrowserGeoLocation = useCallback(() => {
    if (!hasGeoLocationSupport) return

    setGetting(true)

    window.navigator.geolocation.getCurrentPosition(
      getCurrentPositionSuccessCallback,
      getCurrentPositionErrorCallback,
    )
  }, [getCurrentPositionErrorCallback, getCurrentPositionSuccessCallback, hasGeoLocationSupport])

  return (
    <>
      <Button
        type="button"
        disabled={!!error || getting}
        title={error?.message}
        onClick={() => getBrowserGeoLocation()}
        cssBlock
        cssSize={windowXS ? 'xs' : 'sm'}
        className={classNames(
          'whitespace-nowrap',
          'break-all',
          'text-ellipsis',
        )}
      >
        {!!error ? 'get position error' : (
          getting ? 'getting coords' : 'use my position'
        )}
      </Button>
    </>
  )
}
