import { expect } from 'chai'
import Bilbili from '../core'
const bilibili = new Bilbili({
  cookie: 'sid=kvz3mnoe',
  data:
    {
      mid: 4716170,
      access_token: 'e05a080c7e4ef3099b098d5819d0e101',
      refresh_token: '9577f92ede1e4287ce312e34a17b7cc9',
      expires_in: 2592000
    }
})

describe('Test Bangumi', () => {
  it('Get Season Info', (done) => {
    bilibili.Bangumi.getInfo(5997)
      .then(_ => {
        // console.log(_)

        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        expect(_.data).not.to.be.empty
        done()
      })
      .catch(e => done(e))
  })

  it('Get Recommend', (done) => {
    bilibili.Bangumi.getRecommend(5997)
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        expect(_.data).not.to.be.empty
        done()
      })
      .catch(e => done(e))
  })

  it('Get Media Info', (done) => {
    bilibili.Bangumi.getMediaInfo(5997)
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        expect(_.data).not.to.be.empty
        done()
      })
      .catch(e => done(e))
  })

  it('Get Media Source', (done) => {
    bilibili.Bangumi.getMediaSource(5997)
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        expect(_.data).not.to.be.empty
        done()
      })
      .catch(e => done(e))
  })
  it('Get PlayURL', (done) => {
    bilibili.Bangumi.getURL(16224328)
      .then(_ => {
        console.log(_)
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        expect(_.data).not.to.be.empty
        done()
      })
      .catch(e => done(e))
  })
})
