import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import axiosInstance from './axios.service'

class RestService {
  private static axios: AxiosInstance = axiosInstance

  public static setHeader = () => {
    const token = localStorage.getItem('token')
    if (token) {
      this.axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      }
    }
  }

  public static get = async <T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<T>> => {
    this.setHeader()
    return this.axios.get(url, config)
  }

  public static post = async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<T>> => {
    this.setHeader()
    return this.axios.post(url, data, config)
  }

  public static put = async <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<T>> => {
    this.setHeader()
    return this.axios.put(url, data, config)
  }

  public static delete = async <T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<T>> => {
    this.setHeader()
    return this.axios.delete(url, config)
  }
}

export default RestService
