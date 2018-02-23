import { expect } from 'chai'
import Bilbili from '../core'
const bilibili = new Bilbili()

describe('Test Search', ()=>{
  
  it('Common Search', (done) => {
    bilibili.Search.keyword('Fate')
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        done()
      })
      .catch(e => done(e))
  })

  it('Type Search, test bangumi', (done) => {
    bilibili.Search.typeSearch('Fate')
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        done()
      })
      .catch(e => done(e))
  })
  it('Suggest Search', (done) => {
    bilibili.Search.suggest('Fate')
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        done()
      })
      .catch(e => done(e))
  })

  it('Get Hot tags', (done) => {
    bilibili.Search.hot()
      .then(_ => {
        expect(_).not.to.be.empty
        expect(_.status).to.be.equal(0)
        done()
      })
      .catch(e => done(e))
  })
})
