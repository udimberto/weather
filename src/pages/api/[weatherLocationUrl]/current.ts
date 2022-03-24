import type { NextApiRequest, NextApiResponse } from 'next'
import type { WeatherLocationType } from '../../../types'
import { serviceWeather } from '../../../services'

export default async function apiGetCurrentWeather(
  req: NextApiRequest,
  res: NextApiResponse<WeatherLocationType|Error>
) {
  try {
    const { query }              = req
    const { weatherLocationUrl } = query

    if (!weatherLocationUrl) {
      res.status(400).json(
        new Error(
          'Missing the API path before "/current". Eg.: "/api/london/current".'
        )
      )

      return
    }

    const currentWeatherData = await serviceWeather.getCurrent(weatherLocationUrl)

    res.status(200).json(currentWeatherData)
  } catch (err: any) {
    const { code, status } = err
    const errorCode        = (code || status || 500)

    console.error('"apiGetCurrentWeather" execution error')
    console.error(err)

    res.status(errorCode).json(err)
  }
}
