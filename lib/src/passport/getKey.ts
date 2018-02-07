import ClientProperties from '../../clientProperties'
import getSign from '../../signQuery'
import got from 'got'
import qs from 'query-string'
import Cookie from 'cookie'
import tunnel from 'tunnel'
interface Params {
  appkey: string
  build: string
  mobi_app: string
  platform: string
  sign?: string
  ts: string
}

export interface Key {
  hash: string
  key: string
  cookie?: string
}
const clientProperties = new ClientProperties()
async function getKey(): Promise<Key | boolean> {
  const params: Params = {
    appkey: clientProperties.getAppKey(),
    build: clientProperties.getBuild(),
    mobi_app: 'android',
    platform: 'android',
    ts: Date.now().toString().slice(0, 10)
  }
  params.sign = getSign.calculateSign(params)
  const options = {
    body: qs.stringify(params),
    agent: tunnel.httpOverHttp({
      proxy: {
        host: '127.0.0.1',
        port: 8888,
        headers: { }
      }
    })
  }
  try {
    const response = await got.post('https://passport.bilibili.com/api/oauth2/getKey', options)
    const Body = JSON.parse(response.body)
    if (Body.code !== 0) {
      console.log(response.body)
      return false
    } else {
      const ret: Key = {
        hash: Body.data.hash,
        key: Body.data.key,
        cookie: (response.headers['set-cookie']) ? response.headers['set-cookie'][0] : ''
      }
      if (!ret.cookie) {
        delete ret.cookie
      } else {
        ret.cookie = Cookie.serialize('sid', (Cookie.parse(ret.cookie).sid)) + ';'
      }
      return ret
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

export default getKey
