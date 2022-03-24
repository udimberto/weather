import { NextApiRequest } from 'next'

/**
 * Request User Agent Robot
 *
 * @returns {boolean}
 */
export function isRobotRequesting(req: NextApiRequest | any) {
  try {
    const bot       = /bot/i
    const crawlers  = /facebookexternalhit|Pinterest|Google.*snippet|WhatsApp/i
    const userAgent = ((!req || !req.headers || !req.headers['user-agent']) ? '' : req.headers['user-agent'])

    return !!(bot.test(userAgent) || crawlers.test(userAgent))
  } catch (error: any) {
    console.error('"isRobotRequesting" execution error')
    console.error(error)

    return false
  }
}
