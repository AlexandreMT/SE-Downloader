import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { GITHUB_API_BASE_URL, SE_GITHUB_RELEASE_DOWNLOAD } from '../config/environment/Env'
import { sleep } from '../config/Consts'

class GitHubLib {
  private api: AxiosInstance
  private downloadUrl: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: GITHUB_API_BASE_URL
    })

    this.downloadUrl = axios.create({
      baseURL: SE_GITHUB_RELEASE_DOWNLOAD
    })
  }

  private async get(path: string, query = ''): Promise<AxiosResponse> {
    try {
      return await this.api.get(`${path}?${query}`)
    } catch (error) {
      console.log('Something went bad. Closing in 10 seconds.')
      await sleep(10000)
      process.exit(1)
    }
  }

  private async download(path: string): Promise<AxiosResponse> {
    try {
      return await this.downloadUrl.get(path, {
        responseType: 'stream'
      })
    } catch (error) {
      console.log('Something went bad. Closing in 10 seconds.')
      await sleep(10000)
      process.exit(1)
    }
  }

  public async fetchLatestRelease(): Promise<any> {
    return (await this.get('/repos/SubtitleEdit/subtitleedit/releases/latest')).data
  }

  public async downloadSelectedAsset(releaseTag: string, selectedAsset: string): Promise<any> {
    return (await this.download(`/${releaseTag}/${selectedAsset}`)).data
  }
}

export default new GitHubLib()
