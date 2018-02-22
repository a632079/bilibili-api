class ClientProperties {
  private appKey = '1d8b6e7d45233436'
  private appSecret = '560c52ccd288fed045859ed18bffd973'
  private hardwareId = 'JxdyESFAJkcjEicQbBBsCTlbal5uX2Y'
  private scale = 'xxhdpi'
  private version = '5.15.0.515000'
  private build = ''
  private buvId = 'JxdyESFAJkcjEicQbBBsCTlbal5uX2Yinfoc'

  constructor () {
    this.generateBuildProperty()
    return this
  }

  public setVersion (version: string): ClientProperties {
    if (version) {
      this.version = version
      this.generateBuildProperty()
      return this
    } else {
      return this
    }
  }

  public setHardwareId (hardwareId: string): ClientProperties {
    this.hardwareId = hardwareId
    return this
  }

  public setScale (scale: string): ClientProperties {
    this.scale = scale
    return this
  }

  public setAppKey (appKey: string): ClientProperties {
    this.appKey = appKey
    return this
  }

  public setAppSecret (appSecret: string): ClientProperties {
    this.appSecret = appSecret
    return this
  }

  public setBuvId (buvId: string): ClientProperties {
    this.buvId = buvId
    return this
  }

  public getAppKey (): string {
    return this.appKey
  }

  public getAppSecret (): string {
    return this.appSecret
  }

  public getHardwareId (): string {
    return this.hardwareId
  }

  public getScale (): string {
    return this.scale
  }

  public getVersion (): string {
    return this.version
  }

  public getBuild (): string {
    return this.build
  }

  public getBuvId (): string {
    return this.buvId
  }

  private generateBuildProperty (): void {
    this.build = this.version.substring(this.version.lastIndexOf('.') + 1)
  }
}

export = ClientProperties
