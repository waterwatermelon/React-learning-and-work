import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
const instance = axios.create({
  baseURL: 'http://10.27.106.208',
});
AxiosLogger.setGlobalConfig({
  prefixText: 'Network-tools-axios',
  dateFormat: 'HH:MM:ss',
  params: true,
})
instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

export { instance as axiosRequest };