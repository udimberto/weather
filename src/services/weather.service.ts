import { customFetch } from '../utils'

export const serviceWeather = {
  /**
   * Get Current Weather from some Location
   *
   * @param {string|string[]} weatherLocationUrl
   *
   * @returns {WeatherLocationCurrentType}
   */
  getCurrent: async (weatherLocationUrl: string | string[]) => {
    try {
      const weatherLocationUrlStringified = String(weatherLocationUrl)
      const weatherLocationUrlIsValid     = !!(
        !!weatherLocationUrl &&
        ![undefined, 'undefined'].includes(weatherLocationUrlStringified)
      )

      if (!weatherLocationUrlIsValid) {
        throw new Error('Invalid param "weatherLocationUrl"')
      }

      const data = await customFetch(
        `${process.env.WEATHER_API_URL_CURRENT}q=${weatherLocationUrlStringified}`
      )

      return data
    } catch (error: any) {
      throw error
    }
  },
  /**
   * Search for Weather Locations
   *
   * @param {string} q
   *
   * @returns {WeatherLocationType[]}
   */
  search: async (q: string) => {
    try {
      if (!q) {
        throw new Error('Invalid param "q"')
      }

      const data = await customFetch(
        `${process.env.WEATHER_API_URL_SEARCH}q=${q}`
      )

      return data
    } catch (error: any) {
      throw error
    }
  }
}
