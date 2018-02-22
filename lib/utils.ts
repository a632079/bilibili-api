import crypto from 'crypto'
import qs from 'query-string'
import ClientProperties from './clientProperties'
const clientProperties = new ClientProperties()

interface QuerySignMembers {
  calculateSign (params: object): string
  generateQuery (params: object): string
}

interface NecessnaryParams {
  _device: string
  _hwid: string
  build: string
  mobi_app: string
  platform: string
  scale: string
  src: string
  ts: string
  trace_id: string
  version: string
  appkey: string
}

function getTraceId (now: Date = new Date()): string {
  const date = now
  let month: number | string = date.getMonth() + 1
  let strDate: number | string = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  const result = `${date.getFullYear()}${month}${strDate}${date.getHours()}${date.getMinutes()}000${date.getSeconds()}`
  return result
}

export class QuerySign {
  public static generateQuery (params: object = {}) {
    const now = new Date()
    const base: NecessnaryParams = {
      _device: 'android',
      _hwid: clientProperties.getHardwareId(),
      build: clientProperties.getBuild(),
      mobi_app: 'android',
      platform: 'android',
      scale: clientProperties.getScale(),
      src: 'google',
      ts: now.getTime().toString().slice(0, 10),
      trace_id: getTraceId(now),
      version: clientProperties.getVersion(),
      appkey: clientProperties.getAppKey()
    }
    // MergeParams
    Object.assign(params, base)

    // Get Sign
    const sign = this.calculateSign(params)
    return `${qs.stringify(params)}&sign=${sign}`
  }
  // 排序 params 并计算 sign
  // 传入值为 name1=value1 形式
  private static calculateSign (params: object) {
    const MessageDigest = crypto.createHash('md5')
    MessageDigest.update(qs.stringify(params) + clientProperties.getAppSecret())
    const md5: string = MessageDigest.digest('hex')
    return md5
  }
}
