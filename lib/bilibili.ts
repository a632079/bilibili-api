interface Login {
  username: string
  password: string
  captcha?: string
}

interface LoginResponse {
  msg: string
  status: number
  ts: number
}

class Bilibili {
  loginInfo: Login
  constructor (login: Login){
    this.loginInfo = login
    return this
  }
  public async login (): Promise<LoginResponse> {
    const info: Login = this.loginInfo
    return {
      msg: '',
      status: 2,
      ts: 2
    }
  }

}

export = Bilibili
