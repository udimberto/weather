import classNames from 'classnames'
import { useEffect } from 'react'
import { useWeather } from '../../hooks'
import type { WeatherLocationCurrentType } from '../../types'
import { Button } from '../Button/Button'
import { Container } from '../Container/Container'

export type WeatherLocationDetailsProps = {
  dataFromSSR       ?: WeatherLocationCurrentType
  weatherLocationUrl?: string | string[]
}

export function WeatherLocationDetails({
  dataFromSSR,
  weatherLocationUrl,
} : WeatherLocationDetailsProps) {
  /**
   * Weather Location values
   */
  const {
    selected,
    selectByUrl,
  } = useWeather()
  const {
    data,
    error,
    loading,
  } = selected || {}
  const {
    current,
    location,
  } = dataFromSSR || data || {}
  const {
    country,
    name,
    region,
  } = location || {}
  const {
    temp_c,
    temp_f,
  } = current || {}

  /**
   * Trigger the request for weather location current information
   */
   useEffect(() => {
    if (!weatherLocationUrl) return

    selectByUrl(String(weatherLocationUrl), dataFromSSR)
  }, [dataFromSSR, selectByUrl, weatherLocationUrl])

  return (
    <>
      <nav
        className={classNames(
          'py-4',
        )}
      >
        <Container>
          <div
            className={classNames(
              'grid',
              'grid-cols-2',
            )}
          >
            <div>
              <Button
                as="next"
                href="/"
                cssSize="xs"
                className="w-1/2 sm:w-1/3"
              >
                Cancel
              </Button>
            </div>
            <div className="text-right">
              <Button
                cssKind="primary"
                cssSize="xs"
                className="w-1/2 sm:w-1/3"
              >
                Add
              </Button>
            </div>
          </div>
        </Container>
      </nav>
      <main id="weather-location-details">
        <Container>
          <address>
            {name || weatherLocationUrl}
            <br />
            {region || 'region...'}
            <br />
            {country || 'country...'}
          </address>
        </Container>
        <article>
          <Container>
            Cº {temp_c}
          </Container>
        </article>
        <article>
          <Container>
            Fº {temp_f}
          </Container>
        </article>
      </main>
    </>
  )
}
