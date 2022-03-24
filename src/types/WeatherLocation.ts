export type WeatherLocationType = {
  id      : number | string
  country : string
  name    : string
  url     : string
  lat     : number
  lon     : number

  region         ?: string
  tz_id          ?: string,
  localtime_epoch?: number,
  localtime      ?: string

  error  ?: any
  loading?: boolean
  success?: boolean
  current?: any
}
