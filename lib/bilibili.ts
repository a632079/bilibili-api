import Login, { LoginResponse } from './src/passport/login'
import getCaptcha, { Captcha } from './src/passport/getCaptcha'
const login = new Login()
interface Bilibili {
  login (username: string, password: string): Promise<LoginResponse>
  loginWithCaptcha (username: string, password: string, captcha: string, cookie: string): Promise<LoginResponse>
  getCaptcha (cookie?: string): Promise<Captcha>
}

class Bilibili implements Bilibili {
  constructor () {
    return this
  }
  async login (username: string, password: string) {
    return login.login(username, password)
  }

  async loginWithCaptcha (username: string, password: string, captcha: string, cookie: string) {
    return login.withCaptcha(username, password, captcha, cookie)
  }

  async getCaptcha(cookie: string = '') {
    return getCaptcha(cookie)
  }
} 

export default Bilibili
