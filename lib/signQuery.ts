import crypto from 'crypto'
import UrlParams from 'query-string'
import ClientProperties from './clientProperties'
import bigInt from 'big-integer'
const clientProperties = new ClientProperties()

class QuerySign {
  // 排序 params 并计算 sign
  // 传入值为 name1=value1 形式
  public static calculateSign (params: object) {
    try {
      const MessageDigest = crypto.createHash('md5')
      MessageDigest.update(this.generateQuery(params) + clientProperties.getAppSecret())
      const md5: string = MessageDigest.digest('hex')
      return md5
    } catch (e) {
      console.log(e)
    }
  }

  private static generateQuery (params: object) {
    return UrlParams.stringify(params)
  }

}

export = QuerySign
