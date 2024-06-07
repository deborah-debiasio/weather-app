
import Axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import BuildConfig from 'react-native-build-config';

export abstract class APIBaseService {
	private static timeout: number = 20000;
	private static loggingEnabled: boolean = true;
	protected static apikey: string = BuildConfig.APIKEY;

	protected static async getAxiosInstance(config: { headers: any, baseURL?: string }): Promise<any> {
		const defaultConfig: AxiosRequestConfig = {
			timeout: this.timeout,
			...config,
		};
		return Axios.create(defaultConfig);
	}

	static async performAxiosRequest(method: Method, url: string, body?: any, qs?: Array<string>,): Promise<AxiosResponse> {
		const timestamp = new Date().toISOString();
		try {

			const defaultHeaders = {
				'x-api-key': this.apikey,
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			};

			const headers = { ...defaultHeaders };
			const instance = await this.getAxiosInstance({ headers });
			const fullPath = `${url}${qs && qs.length ? `?${qs.join('&')}` : ''}`;

			if (this.loggingEnabled) {
				console.debug(`${timestamp} Request (${method})`, fullPath);
				console.debug(`${timestamp} Headers`, headers);
				console.debug(`${timestamp} Body`, JSON.stringify(body));
			}

			const response = await instance.request({ method, url: fullPath, data: body });

			if (this.loggingEnabled && response) {
				console.debug(`${timestamp} Response`, `${JSON.stringify(response.data)}\n---`);
			}

			return response;
		} catch (error: any) {
			console.log('Error  Im on error ', url, error);
			throw { code: error?.response?.status, message: error?.response?.data?.message, ...error?.response?.data };
		}
	}

}
