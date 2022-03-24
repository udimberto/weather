import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'
import { getFormControlClassNames } from '../Form/FormControl'
import { useSearch } from '../../hooks'

export function HeaderSearch() {
  const router = useRouter()

  /**
   * Context Search
   */
  const {
    error,
    loading,
    results,
    search,
    setInputInFocus,
  } = useSearch()

  /**
   * Local state
   */
  const delayRef                    = useRef<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [typing, setTyping]         = useState(false)

  /**
   * Handle with option selected
   *
   * @param {String} selectedUrl
   */
  const handleSelected = useCallback((selectedUrl: string) => {
    router.push(`/${selectedUrl}`)
    search()
  }, [router, search])

  /**
   * Handle with input changes
   */
  const handleChange = useCallback((event: any) => {
    const newTerm = event.target.value

    setSearchTerm(newTerm)
    setTyping(true)
    clearTimeout(delayRef.current)

    delayRef.current = setTimeout(() => {
      search(newTerm)
      setTyping(false)
    }, 500)
  }, [search])

  /**
   * On Unmount
   */
  useEffect(() => {
    return () => {
      setInputInFocus && setInputInFocus(false)
    }
  }, [setInputInFocus])

  /**
   * Element
   */
  const inputProps = {
    id          : 'search-region',
    type        : 'search',
    autoComplete: 'off',
    placeholder : 'Search for a city',
    className   : 'shadow-sm',
    value       : searchTerm,
    onChange    : handleChange,
    onBlur      : () => setInputInFocus && setInputInFocus(false),
    onFocus     : () => setInputInFocus && setInputInFocus(true),
  }

  return (
    <div
      className="relative"
    >
      <Combobox
        value=""
        onChange={handleSelected}
      >
        <div className="relative">
          <Combobox.Input
            {...inputProps}
            displayValue={() => searchTerm}
            className={classNames(
              inputProps.className,
              getFormControlClassNames({ ...inputProps, hasValue: !!searchTerm }),
            )}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setSearchTerm('')}
        >
          <Combobox.Options
            className={classNames(
              'absolute',
              'z-50',
              'w-full',
              'py-1',
              'mt-1',
              'overflow-auto',
              'text-sm',
              'bg-white',
              'dark:bg-dark-base-background',
              'rounded-md',
              'shadow-lg',
              'max-h-60',
              'ring-1',
              'ring-black',
              'ring-opacity-5',
              'focus:outline-none',
            )}
          >
            {(!!error || loading || typing || (results.length === 0)) ? (
              <div className="cursor-default select-none relative py-2 px-4">
                {(loading || typing) ? `${loading ? 'Searching' : 'Typing'}...` : (
                  error ? (error?.message || JSON.stringify(error)) : (
                    (searchTerm !== '') ? 'Nothing found.' : 'You must type something.'
                  )
                )}
              </div>
            ) : (results.map((foundWeatherLocation, index) => (
              <Combobox.Option
                key={foundWeatherLocation.id}
                value={foundWeatherLocation.url}
                className={({ active }) => classNames(
                  'py-2 px-4',
                  'cursor-pointer',
                  'transition-all',
                  (index !== (results.length - 1) && classNames(
                    'border-b',
                    (active ? 'border-transparent' : 'border-black/20'),
                  )),
                  (active ? classNames(
                    'text-white',
                    'bg-primary-400',
                  ) : classNames(
                    'text-current',
                    'bg-transparent',
                  )),
                )}
              >
                <div id="found-location-name">
                  <strong>
                    {'📍 '}
                    {foundWeatherLocation.name}
                  </strong>
                </div>
                <div id="found-location-coords" title="Latitude & Longitude">
                  {'🧭 '}
                  {foundWeatherLocation.lat}
                  {', '}
                  {foundWeatherLocation.lon}
                </div>
                {foundWeatherLocation.region && (
                  <div id="found-location-region" title="Region">
                    {'🗺 '}
                    {foundWeatherLocation.region}
                  </div>
                )}
                <div id="found-location-country">
                  {'🌏 '}
                  {foundWeatherLocation.country}
                </div>
              </Combobox.Option>
            )))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  )
}