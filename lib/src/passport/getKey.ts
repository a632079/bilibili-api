import ClientProperties from '../../clientProperties'
import { QuerySign } from '../../utils'
import rq, { RequestPromiseOptions } from 'request-promise'
import qs from 'query-string'

export interface Key {
  hash: string
  key: string
  cookie?: string
}
async function getKey (): Promise<Key | boolean> {
  const params: string = QuerySign.generateQuery()
  // console.log(params)
  const jar = rq.jar()
  const options: RequestPromiseOptions = {
    form: params,
    headers: {
      'User-Agent': ''
    },
    resolveWithFullResponse: true,

  }
  const url = 'https://passport.bilibili.com/api/oauth2/getKey'
  const response = await rq.post(url, options)
  const Body = JSON.parse(response.body)
  // console.log(Body)
  if (Body.code !== 0) {
    return false
  } else {
    const ret: Key = {
      hash: Body.data.hash,
      key: Body.data.key
    }
    const Cookie = jar.getCookieString(url)
    if (Cookie) {
      ret.cookie = Cookie
    }
    return ret
  }

}

export default getKey
