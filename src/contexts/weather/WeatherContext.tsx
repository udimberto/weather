import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'
import { customFetch } from '../../utils'
import {
  WeatherLocationType,
  WeatherLocationCurrentType,
  WeatherLocationCurrentDataType,
} from '../../types'

export type WeatherContextLocationsType = WeatherLocationType[]
export type WeatherContextSelectedType  = {
  data   : WeatherLocationCurrentDataType
  error  : any
  loading: boolean
  success: boolean
}
export type WeatherContextTypes         = {
  locations   ?: WeatherContextLocationsType
  setLocations?: Dispatch<SetStateAction<WeatherContextLocationsType>>
  selectByUrl  : (weatherLocationUrl: string, dataFromSSR?: WeatherLocationCurrentType) => void
  selected     : WeatherContextSelectedType
}

export const weatherLocationExample: WeatherLocationType = {
  id     : 290780,
  country: 'Brazil',
  name   : 'São Paulo',
  url    : 'sao-paulo-sao-paulo-brazil',
  lat    : -23.53,
  lon    : -46.62,
  loading: false,
  success: false,
  error  : null,
  current: null,
}

export const weatherLocationsContextDefaults = {
  locations: [ weatherLocationExample ],
  selected : {
    data   : null,
    error  : null,
    loading: false,
    success: false,
  },
}

export const WeatherContextRef = createContext(weatherLocationsContextDefaults as WeatherContextTypes)

export function useWeather() {
  return useContext(WeatherContextRef)
}

export type WeatherContextProps = {
  children?: ReactNode
}

export function WeatherContext({ children } : WeatherContextProps) {
  const [locations, setLocations] = useState<WeatherContextLocationsType>(weatherLocationsContextDefaults.locations)

  /**
   * Context "selected" values
   */
  const [selected, setSelected]  = useState<WeatherContextSelectedType>(weatherLocationsContextDefaults.selected)

  /**
   * Select and request Weather Location data from API
   *
   * @param {String} weatherLocationUrl
   */
  const selectByUrl = useCallback(async (weatherLocationUrl: string, dataFromSSR?: WeatherLocationCurrentDataType) => {
    const hasDataFromSSR = !!dataFromSSR

    setSelected((previousSelected) => ({
      ...previousSelected,
      data   : dataFromSSR || null,
      error  : null,
      loading: !hasDataFromSSR,
      success: false,
    }))

    if (hasDataFromSSR) return

    try {
      const response = await customFetch(`/api/${weatherLocationUrl}/current`)

      setSelected((previousSelected) => ({
        ...previousSelected,
        data   : response,
        loading: false,
        success: true,
      }))
    } catch (err: any) {
      setSelected((previousSelected) => ({
        ...previousSelected,
        error  : err,
        loading: false,
      }))

      throw err
    }
  }, [])

  return (
    <WeatherContextRef.Provider
      value={{
        locations,
        setLocations,
        selectByUrl,
        selected,
      }}
    >
      {children}
    </WeatherContextRef.Provider>
  )
}