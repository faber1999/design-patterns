class ConfigManager {
  private config: Record<string, string> = {}

  public setConfig(key: string, value: string): void {
    this.config[key] = value
  }

  public getConfig(key: string): string | undefined {
    return this.config[key]
  }

  public getAllConfig(): Record<string, string> {
    return { ...this.config }
  }
}

export const configManager = new ConfigManager()
