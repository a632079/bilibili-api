import { expect } from 'chai'
import Bilbili from '../core'
const bilibili = new Bilbili()

describe('TestLogin', () => {
  it('Should Be Login Successfully', (done) => {
    bilibili.login('test', 'test')
      .then(result => {
        console.log(result)
        expect(result).to.not.be.empty
        expect(result.status).to.equal(0)
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})
