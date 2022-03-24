import classNames from 'classnames'
import NextLink from 'next/link'
import { useSearch, useWeather } from '../hooks'
import type { CustomNextPageProps } from '../types'
import { Title } from '../components/Title/Title'
import { Container } from '../components/Container/Container'

const Home: CustomNextPageProps = () => {
  /**
   * Generic Context values
   */
  const { inputInFocus } = useSearch()

  /**
   * Weather Context values
   */
  const { locations } = useWeather()

  return (
    <>
      <section>
        <Container>
          {(locations || []).map((weatherLocation) => (
            <NextLink
              key={weatherLocation.id}
              href={`/${weatherLocation.url}`}
              passHref
            >
              <a
                className={classNames(
                  'weather-location',
                  'p-4',
                  'rounded-md',
                  'flex',
                  'flex-1',
                  'flex-col',
                  'border',
                  'border-primary-900/10',
                  'transition-all',
                  (inputInFocus ? 'opacity-50' : 'opacity-100'),
                )}
              >
                <Title as="h2">
                  {weatherLocation.name}
                </Title>
                {weatherLocation.lat}
                {' '}
                {weatherLocation.lon}
              </a>
            </NextLink>
          ))}
        </Container>
      </section>
    </>
  )
}

Home.pageTitle = 'Weather'

export default Home
