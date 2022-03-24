/**
 * Custom Fetch
 *
 * Simple treatment to easily use native Fetch API,
 * without using an external package like 'axios'.
 *
 * @param urlOrSettings
 * @param [settings]
 *
 * @returns {Promise<any>}
 */
export function customFetch(
  urlOrSettings: RequestInfo,
  settings    ?: RequestInit,
) : Promise<any> {
  return new Promise<any>((resolve, reject) => {
    fetch(urlOrSettings, settings)
      .then((response) => (
        response.json()
          .then((data) => ({
            data,
            response,
          }))
          .catch(reject)
      ))
      .then(({ data, response } : any) => {
        const { error, status, statusCode } = data || {}
        const hasErrorObj                   = !!error
        const hasErrorStatus                = !!((status && status >= 400) || (statusCode && statusCode >= 400))
        const hasError                      = hasErrorObj || hasErrorStatus

        if (hasError) {
          reject({ ...response, ...error })
        } else {
          resolve(data)
        }
      })
      .catch(reject)
  })
}
