import axios from 'axios'
import type{AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
