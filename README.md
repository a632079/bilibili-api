# bilibili-api
Node.js Promised Bilibili Android API

本项目是基于 [Java](http://github.com/czp3009/bilibili-api/) 项目的子项目.

> 由于开学在即，所以目前只提供 登入 接口， 欢迎一起来开发。

## 使用

Typescript:
```typescript
import Bilibili from 'bilibili-api'
const bilibili = new Bilibili()
asycn function test() {
    const result = await bilibili.login(username, password)
}
```

CommonJS:
```javascript
const Bilibili = require('bilibili-api')
const bilibili = new Bilibili()
asycn function test() {
    const result = await bilibili.login(username, password)
}
```

## 接口

* `login` 参数: `username: string` `password: string`
* `loginWithCaptcha` 参数: `username: string` `password: string` `captcha: string` `cookie:string`
* `getCaptcha` 参数: `cookie?: string`
  * `cookie` 为 `request.jar.getCookieString()` 所返回的字符串

## 测试
克隆项目到本地， 执行: `pnpm i` 或 `yarn`
对 `test` 目录下的测试文件进行测试，然后执行: `pnpm run dev` 或 `yarn dev`
进行 单元测试: `pnpm run test` 或 `yarn test`
