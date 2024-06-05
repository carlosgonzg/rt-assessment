import axios, { AxiosInstance } from 'axios';

export class HttpService {
    baseUrl: string;
    instance: AxiosInstance;
    constructor(baseURL = process.env.url as string) {
        this.baseUrl = baseURL;
        this.instance = axios.create({ baseURL: this.baseUrl });
    }
    private get defaultHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }
    private request(method: string, url: string, data = null, customHeaders = {}) {
        const headers = { ...this.defaultHeaders, ...customHeaders };
        const source = axios.CancelToken.source();

        const config: any = {
            method,
            url,
            headers,
            cancelToken: source.token
        };

        if (data) {
            config.data = data;
        }

        return {
            request: this.instance(config),
            cancel: source.cancel
        };
    }
    get(url: string, customHeaders = {}) {
        return this.request('get', url, null, customHeaders);
    }
    put(url: string, body: any, customHeaders = {}) {
        return this.request('put', url, body, customHeaders);
    }
}