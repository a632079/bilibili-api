
import rq from 'request-promise'
import { QuerySign } from '../../utils'
export interface Search{
  keyword(keyword: string, page: number, limit: number): Promise<SearchResponse>
  typeSearch(keyword: string, type: searchType, page: number, limit: number): Promise<SearchResponse>
  hot(): Promise<SearchResponse>
  suggest(keyword: string): Promise<SearchResponse>
}

interface keywordParams {
  duration: number
  from_source: string
  pn: number
  ps: number
  keyword: string
  highlight: number
}
export interface SearchResponse {
  status: number
  message: string
  data?: object
}

export class Search implements Search {
  static async keyword(keyword: string, page = 1, limit = 20) {
    /**
     * 搜索，顾名思义
     * @param {string} keyword
     * @param {number} page
     * @param {number} limit
     * @returns {Promise<any>}
     */
    const params: keywordParams = {
      duration: 0,
      from_source: 'app_search',
      pn: page,
      ps: limit,
      keyword: keyword,
      highlight: 1
    }
    const qs = QuerySign.generateQuery(params)
    const responseBody = await rq.get(`https://app.bilibili.com/x/v2/search?${qs}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
      },
      qs: qs,
      json: true
    })
    const ret: SearchResponse = {
      status: responseBody.code,
      message: responseBody.message
    }
    if (responseBody.code === 0) {
      ret.data = responseBody.data
    }
    return ret
  }
  static async typeSearch(keyword: string, type: searchType = 7, page: number = 1, limit: number = 20) {
    /**
     * 种类搜索, 不得不吐槽 B 站的 API
     * @param {string} keyword
     * @param {SearchType} type
     * @param {number} page
     * @param {number} limit
     * @returns {Promise<any>}
     */
    let params = {
      pn: page,
      ps: limit,
      type: type,
      keyword
    }
    switch (type) {
      case 7: // Bangumi
        // do nothing
        break
      case 2: // User
        Object.assign(params, {
          user_type: 0,
          order: 'totalrank',
          highlight: 1
        })
        break
      case 8: // movie
        // do nothing
        break
      case 6: // 专栏搜索
        Object.assign(params, {
          categroy_id: 0,
          highlight: 1,
        })
      default:
        // Bangumi
        params.type = 7
        break
    }
    // Make Request
    const qs = QuerySign.generateQuery(params)
    const responseBody = await rq.get(`https://app.bilibili.com/x/v2/search/type?${qs}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
      },
      json: true
    })
    const ret: SearchResponse = {
      status: responseBody.code,
      message: responseBody.message
    }
    if (responseBody.code === 0) {
      ret.data = responseBody.data
    }
    return ret
  }
  static async suggest(keyword: string) {
    const params = {
      keyword,
      type: 'accurate'
    }
    const qs = QuerySign.generateQuery(params)
    const responseBody = await rq.get(`https://app.bilibili.com/x/v2/search/suggest?${qs}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
      },
      json: true
    })
    const ret: SearchResponse = {
      status: responseBody.code,
      message: responseBody.message
    }
    if (responseBody.code === 0) {
      ret.data = responseBody.data
    }
    return ret
  }

  static async hot() {
    const qs = QuerySign.generateQuery({ limit: 50 })
    const responseBody = await rq.get(`https://app.bilibili.com/x/v2/search/hot?${qs}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 BiliDroid/5.15.0 (bbcallen@gmail.com)'
      },
      json: true
    })
    const ret: SearchResponse = {
      status: responseBody.code,
      message: responseBody.message
    }
    if (responseBody.code === 0) {
      ret.data = responseBody.data
    }
    return ret
  }
}
export enum searchType {
  bangumi = 7,
  user = 2,
  movie = 8,
  read = 6 // 专栏搜索
}
