import { ReactNode } from 'react'
import { SearchContext } from './search'
import { WeatherContext } from './weather'
import { UIContext } from './ui'

export type AppContextsTypes = {
  children?: ReactNode
}

export function AppContexts({ children } : AppContextsTypes) {
  return (
    <>
      <UIContext>
        <WeatherContext>
          <SearchContext>
            {children}
          </SearchContext>
        </WeatherContext>
      </UIContext>
    </>
  )
}
