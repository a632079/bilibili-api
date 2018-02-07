import { expect } from 'chai'
import mocha from 'mocha'
import signQuery from '../lib/signQuery'
import ClientProperties from '../lib/clientProperties'
import getCaptcha, { Captcha } from '../lib/src/passport/getCaptcha'
import qs from 'query-string'
import got from 'got'
import NodeRSA from 'node-rsa'
import getKey, { Key } from '../lib/src/passport/getKey'
const imaging: any = require('imaging')
import fs from 'fs'
import path from 'path'
import readlineSync from 'readline-sync'
const clientProperties = new ClientProperties()
let cookie: string
describe('Get Sign', () => {
  async function a () {
    const keys: Key | boolean = await getKey()
    if (!keys || keys === true) {
      throw new Error('Can\'t Get Key')
    }
    const sign = new NodeRSA(keys.key, 'public')
    cookie = keys.cookie || ''
    const username: string = 'a632079@gmail.com'
    const password: string = sign.encrypt(keys.hash + 'jr751103q', 'base64')
    // console.log(sign.decryptPublic(password, 'utf8'))
    const params = {
      appkey: clientProperties.getAppKey(),
      build: clientProperties.getBuild(),
      username: username,
      password: password,
      mobi_app: 'android',
      platform: 'android',
      ts: Date.now().toString().slice(0, 10)
    }
    const ret = signQuery.calculateSign(params)
    const post = qs.stringify(params) + '&sign=' + ret
    console.log(post)
    let res
    try {
      res = await got('https://passport.bilibili.com/api/oauth2/login', {
        method: 'post',
        headers: {
          'Cookie': cookie,
          'User-Agent': '',
          'Connection': 'Keep-live'
        },
        body: post
      })
    } catch (e) {
      throw e
    }
    console.log('Res Data:', res.headers, res.body)
    const body = JSON.parse(res.body)
    if (body.code === -105) {
      // Need Captcha
      const captcha: Captcha | boolean = await getCaptcha(cookie)
      if (!captcha || captcha === true) {
        throw new Error('can\'t get captcha')
      }
      cookie = captcha.cookie
      console.log('Cookie:', cookie)
      // Write Pictrue
      // termImg(captcha.captcha, { fallback: () => { console.log('Not Support.') } })
      // console.log(captcha.captcha)
      const Path = path.join(__dirname, '../../img/' + Date.now().toString() + '.jpeg')
      fs.writeFileSync(Path, captcha.captcha, {
        encoding: 'binary'
      })
      const code = readlineSync.question('Open this pictrue: ' + Path + ' . Then, enter the captcha: \n Captcha: ')
      const params = {
        appkey: clientProperties.getAppKey(),
        build: clientProperties.getBuild(),
        username: username,
        password: password,
        mobi_app: 'android',
        platform: 'android',
        ts: Date.now().toString().slice(0, 10),
        captcha: code
      }
      const ret = signQuery.calculateSign(params)
      const post = qs.stringify(params) + '&sign=' + ret
      console.log(post)
      res = await got('https://passport.bilibili.com/api/oauth2/login', {
        method: 'post',
        headers: {
          'Cookie': cookie,
          'User-Agent': ''
        },
        body: post
      })
      const Resbody = JSON.parse(res.body)
      console.log(res.body)
    } else {
      // tslint:disable-next-line:no-unused-expression
      expect(body.code === 0).to.be.true
    }
  }
  a()
})
