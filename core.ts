'use strict'

// Require Dependence
import * as Bluebird from 'bluebird'
global.Promise = Bluebird.Promise

// Load Lib
import bilibili from './lib/bilibili'
export default bilibili
