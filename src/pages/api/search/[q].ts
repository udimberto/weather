import type { NextApiRequest, NextApiResponse } from 'next'
import type { WeatherLocationType } from '../../../types'
import { serviceWeather } from '../../../services'

export default async function apiSearchWeatherLocations(
  req: NextApiRequest,
  res: NextApiResponse<WeatherLocationType|Error>
) {
  try {
    const { query } = req
    const { q }     = query

    const results = await serviceWeather.search(String(q))

    res.status(200).json(results)
  } catch (err: any) {
    console.error('"apiSearchWeatherLocations" execution error')
    console.error(err)

    res.status(500).json(err)
  }
}
