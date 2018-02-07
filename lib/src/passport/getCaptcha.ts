'use strict'
import qs from 'query-string'
import got, { GotBodyOptions } from 'got'
import Cookie from 'cookie'

export interface Captcha {
  captcha: Buffer
  cookie: string
}
async function getCaptcha (cookie: string): Promise<Captcha | boolean > {
  const config = {
    headers: {
      'Cookie': cookie
    },
    encoding: null
  }
  try {
    const response = await got('https://passport.bilibili.com/captcha', config)
    const JSESSIONID = 'JSESSIONID=' + Cookie.parse(response.headers['set-cookie'][0]).JSESSIONID + ';'
    let retCookie = cookie + ' ' + JSESSIONID
    return {
      captcha: response['body'],
      cookie: retCookie
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export default getCaptcha
