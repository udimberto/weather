import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
} from 'react'
import { WeatherLocationType } from '../../types'
import { customFetch } from '../../utils'

export type SearchWeatherResultsType = WeatherLocationType[]

export type SearchContextTypes = {
  error           : any
  loading         : boolean
  success         : boolean
  results         : SearchWeatherResultsType
  setResults     ?: Dispatch<SetStateAction<SearchWeatherResultsType>>
  setInputInFocus?: Dispatch<SetStateAction<boolean>>
  inputInFocus    : boolean
  search          : (term?: string) => void
}

export const searchLocationsContextDefaults = {
  error       : null,
  inputInFocus: false,
  loading     : false,
  success     : false,
  search      : (term?: string) => undefined,
  results     : [],
}

export const SearchContextRef = createContext(searchLocationsContextDefaults as SearchContextTypes)

export function useSearch() {
  return useContext(SearchContextRef)
}

export type SearchContextProps = {
  children?: ReactNode
}

export function SearchContext({ children } : SearchContextProps) {
  const abortControllerRef              = useRef<any>(null)
  const [error, setError]               = useState(null)
  const [inputInFocus, setInputInFocus] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [success, setSuccess]           = useState(false)
  const [results, setResults]           = useState<SearchWeatherResultsType>(searchLocationsContextDefaults.results)

  /**
   * Search Weather Locations by term
   *
   * @param {String} term
   */
  const search = useCallback(async (term?: string) => {
    const searchTerm = (term || '').trim()

    setError(null)
    setLoading(true)
    setSuccess(false)
    setResults([])

    if (!searchTerm) {
      setLoading(false)

      return
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    const { signal }           = abortControllerRef.current

    try {
      const newResults = await customFetch(`/api/search/${searchTerm}`, { signal })

      setResults(newResults)
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <SearchContextRef.Provider
      value={{
        error,
        inputInFocus,
        loading,
        success,
        search,
        results,
        setResults,
        setInputInFocus,
      }}
    >
      {children}
    </SearchContextRef.Provider>
  )
}