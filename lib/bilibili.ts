import Login, { LoginResponse } from './src/passport/login'
import getCaptcha, { Captcha } from './src/passport/getCaptcha'
import { Search, SearchResponse, searchType } from './src/search/base'
import { Bangumi } from './src/bangumi/base'

const login = new Login()
interface Bilibili extends Search {
  user: {
    data: object
    cookie: string
  }
  cookie: string
  load (store: object): void
  login (username: string, password: string): Promise<LoginResponse>
  loginWithCaptcha (username: string, password: string, captcha: string, cookie?: string): Promise<LoginResponse>
  getCaptcha (cookie?: string): Promise<Captcha>
}

class Bilibili implements Bilibili {
  constructor () {
    return this
  }

  load (store: Bilibili['user']) {
    this.user = store
  }

  async login (username: string, password: string) {
    const result = await login.login(username, password)
    if (result.status == 0 && result.data && result.cookie) {
      this.user = {
        cookie: result.cookie,
        data:  result.data
      }
    }
    return result
  }

  async loginWithCaptcha (username: string, password: string, captcha: string, cookie?: string) {
    if (!cookie) {
      cookie = (this.cookie) ? this.cookie : ''
    }
    const result = await login.withCaptcha(username, password, captcha, cookie)
    if (result.status == 0 && result.data && result.cookie) {
      this.user = {
        cookie: result.cookie,
        data:  result.data
      }
    }
    return result
  }

  async getCaptcha(cookie: string = '') {
    const result = await getCaptcha(cookie)
    this.cookie = result.cookie
    return result
  }

  // include Classes
  Search = class extends Search {}

  Bangumi = new Bangumi()

} 

export default Bilibili
