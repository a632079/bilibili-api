import rq from 'request-promise'
import getKey from './getKey'
import { QuerySign } from '../../utils'
import tough from 'tough-cookie'
import crypto from 'crypto'
import { Cookie } from 'request'

export interface Logins {
  login (username: string, password: string): Promise<LoginResponse>
  withCaptcha (username: string, password: string, captcha: string, cookie: string): Promise<LoginResponse>
}
export interface LoginResponse {
  status: number
  message: string
  data?: {
    mid: number
    access_token: string
    refresh_token: string
    expires_in: number
  }
  cookie?: string
  ts: string
}

class Login implements Logins {
  constructor () {
    return this
  }
  async login (username: string, password: string): Promise<LoginResponse> {
    // Bilibili Login
    const keys = await getKey()
    if (typeof keys === 'boolean') {
      throw new Error('Can\'t Get Key')
    }
    // Encrypt password
    password = crypto.publicEncrypt({
      key: keys.key,
      padding: 1
    }, Buffer.from(`${keys.hash}${password}`)).toString('base64')
    const params = QuerySign.generateQuery({ username, password })
    const jar = rq.jar()
    const url = 'https://passport.bilibili.com/api/oauth2/login'
    const response = await rq.post(url, {
      headers: {
        'User-Agent': ''
      },
      form: params,
      jar: jar,
      resolveWithFullResponse: true
    })
    const body = JSON.parse(response.body)
    if (body.code !== 0) {
      const result: LoginResponse = {
        ts: body.ts,
        status: body.code,
        message: body.message
      }
      return result
    }
    const result: LoginResponse = {
      status: 0,
      message: '登入成功',
      data: body.data,
      ts: body.ts
    }
    const cookie = jar.getCookieString(url)
    if (cookie) {
      result.cookie = cookie
    }
    return result
  }

  async withCaptcha (username: string, password: string, captcha: string, cookie: string): Promise<LoginResponse> {
    // Bilibili Login
    const keys = await getKey()
    if (typeof keys === 'boolean') {
      throw new Error('Can\'t Get Key')
    }
    // Encrypt password
    password = crypto.publicEncrypt({
      key: keys.key,
      padding: 1
    }, Buffer.from(`${keys.hash}${password}`)).toString('base64')
    const params = QuerySign.generateQuery({ username, password, captcha })
    const url = 'https://passport.bilibili.com/api/oauth2/login'
    const jar = rq.jar()
    jar.setCookie(cookie, url)
    const response = await rq.post(url, {
      headers: {
        'User-Agent': ''
      },
      form: params,
      jar: jar,
      resolveWithFullResponse: true
    })
    const body = JSON.parse(response.body)
    if (body.code !== 0) {
      const result: LoginResponse = {
        ts: body.ts,
        status: body.code,
        message: body.message
      }
      return result
    }
    const result: LoginResponse = {
      status: 0,
      message: '登入成功',
      data: body.data,
      ts: body.ts
    }
    const cookies = jar.getCookieString(url)
    if (cookies) {
      result.cookie = cookies
    }
    return result
  }
}

export default Login
