import NextHead from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useWeather } from '../../hooks'
import { isRobotRequesting } from '../../utils'
import { serviceWeather } from '../../services'
import type { WeatherLocationCurrentType } from '../../types'
import { Container } from '../../components/Container/Container'
import { WeatherLocationDetails } from '../../components/WeatherLocationDetails/WeatherLocationDetails'

export type PageWeatherLocationTypes = {
  dataFromSSR ?: WeatherLocationCurrentType
  errorFromSSR?: Error
}

export default function PageWeatherLocation({
  dataFromSSR,
} : PageWeatherLocationTypes) {
  /**
   * Routing values
   */
  const { query } = useRouter()
  const { weatherLocationUrl } = query

  /**
   * Selected Weather Location values
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
  } = data || {}
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
      <NextHead>
        <title>
            {name || weatherLocationUrl}
            {(region && region !== name) ? ` - ${region}` : ''}
            {` - ${country} | Weather`}
        </title>
      </NextHead>
      <WeatherLocationDetails
        weatherLocationUrl={weatherLocationUrl}
      />
    </>
  )
}

/**
 * Retrieve Weather Location current data,
 * when the request it's originally made by search robots
 *
 * @param context
 *
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const { weatherLocationUrl } = params as any

  try {
    if (!isRobotRequesting(context.req)) {
      return { props: {} }
    }

    const dataFromSSR = await serviceWeather.getCurrent(weatherLocationUrl)

    return { props: { dataFromSSR } }
  } catch (errorFromSSR: any) {
    return { props: { errorFromSSR } }
  }
}
