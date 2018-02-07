import { expect } from 'chai'
import mocha from 'mocha'
import signQuery from '../lib/signQuery'
import ClientProperties from '../lib/clientProperties'
import qs from 'query-string'
import axios from 'axios'
const clientProperties = new ClientProperties()

describe('Get Sign', () => {
  const params = {
    appkey: clientProperties.getAppKey(),
    build: clientProperties.getBuild(),
    mobi_app: 'android',
    platform: 'android',
    ts: Date.now().toString().slice(0, 10)
  }
  const ret = signQuery.calculateSign(params)
  console.log('qs:', qs.stringify(params))
  console.log('Sign Value:', ret)
  it('Sign Must be True', () => {
    // tslint:disable-next-line:no-unused-expression
    expect(!!ret).to.be.true
  })
  const post = qs.parse(qs.stringify(params) + '&sign=' + ret)
  console.log(post)
  it('Must Get Data', async () => {
    let res = await axios({
      method: 'post',
      url: 'https://passport.bilibili.com/api/oauth2/getKey',
      data: qs.stringify(post)
    })
    console.log('Res Data:', res)
    // tslint:disable-next-line:no-unused-expression
    expect(res.data.code === 0).to.be.true
  })
})
