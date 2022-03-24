import { createContext, useContext, useEffect, useState } from 'react'

export type UIBrowserTypes = {
  browserLanguage      : string
  hasGeoLocationSupport: boolean
  isBrowserChrome      : boolean
  isBrowserFirefox     : boolean
  isBrowserSafari      : boolean
  isBrowserOther       : boolean
}

export const uiBrowsersDefault = {
  browserLanguage      : 'en-GB',
  hasGeoLocationSupport: true,
  isBrowserChrome      : false,
  isBrowserFirefox     : false,
  isBrowserSafari      : false,
  isBrowserOther       : true,
}

export const uiContextDefault = {
  windowWidth : 320,
  windowHeight: 568,
  windowXS    : true,
  windowSM    : false,
  ...uiBrowsersDefault,
}

export type UIContextTypes = UIBrowserTypes & {
  windowHeight: number
  windowWidth : number
  windowXS    : boolean
  windowSM    : boolean
}

export const UIContextRef = createContext(uiContextDefault as UIContextTypes)

export function useUI() {
  return useContext(UIContextRef)
}

export function UIContext({ children } : any) {
  const [browserProps, setBrowserProps] = useState<UIBrowserTypes>(uiBrowsersDefault)
  const [windowHeight, setWindowHeight] = useState<number>(uiContextDefault.windowHeight)
  const [windowWidth, setWindowWidth]   = useState<number>(uiContextDefault.windowWidth)

  /**
   * Listener to deal with Window sizes
   */
  useEffect(() => {
    function windowSizes() {
      if (!window?.innerWidth) return

      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    windowSizes()

    window?.addEventListener('resize', windowSizes)

    return () => {
      window?.removeEventListener('resize', windowSizes)
    }
  }, [])

  /**
   * Browser values as global values
   */
  useEffect(() => {
    const browserLanguage       = navigator.language
    const hasGeoLocationSupport = !!window.navigator?.geolocation?.getCurrentPosition
    const isBrowserFirefox      = !!(navigator.userAgent.includes('Firefox'))
    const isBrowserChrome       = !!(!isBrowserFirefox && navigator.userAgent.includes('Chrome'))
    const isBrowserSafari       = !!(!isBrowserFirefox && !isBrowserChrome && navigator.userAgent.includes('Safari'))
    const isBrowserOther        = !!(!isBrowserChrome && !isBrowserFirefox && !isBrowserSafari)

    setBrowserProps({
      browserLanguage,
      hasGeoLocationSupport,
      isBrowserChrome,
      isBrowserFirefox,
      isBrowserSafari,
      isBrowserOther,
    })
  }, [])

  return (
    <UIContextRef.Provider
      value={{
        ...browserProps,
        windowHeight,
        windowWidth,
        windowXS: windowWidth < 768,
        windowSM: windowWidth < 940,
      }}
    >
      {children}
    </UIContextRef.Provider>
  )
}
