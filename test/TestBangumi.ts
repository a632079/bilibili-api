import { expect } from 'chai'
import Bilbili from '../core'
const bilibili = new Bilbili()

describe('Test Bangumi', () => {
  it('Get Season Info', (done)=>{
    bilibili.Bangumi.getInfo(5997)
      .then(_=>{
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
})
