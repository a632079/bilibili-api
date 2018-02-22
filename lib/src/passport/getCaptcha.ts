'use strict'
import rq from 'request-promise'
import { QuerySign } from '../../utils'

export interface Captcha {
  captcha: Buffer
  cookie: string
}
async function getCaptcha (cookie: string): Promise<Captcha> {
  const url = 'https://passport.bilibili.com/captcha '
  const jar = rq.jar()
  jar.setCookie(cookie, url)
  const response = await rq.get(url,
    {
      headers: {
        'User-Agent': ''
      },
      resolveWithFullResponse: true,
      jar: jar
    }
  )
  const Cookie = jar.getCookieString(url)
  const captcha = Buffer.from(response.body, 'binary')
  const result = {
    cookie: Cookie,
    captcha
  }
  return result
}

export default getCaptcha
