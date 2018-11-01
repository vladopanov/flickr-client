interface IRestService {
  get(props: IRestRequestOptions): Promise<IRestResponse>;
  post(props: IRestRequestOptions): Promise<IRestResponse>;
  delete(props: IRestRequestOptions): Promise<IRestResponse>;
  put(props: IRestRequestOptions): Promise<IRestResponse>;
  patch(props: IRestRequestOptions): Promise<IRestResponse>;
}

interface IRestRequestWrapper {
  request: XMLHttpRequest;
  url: string;
  headers: Record<string, string>;
  data?: any;
}

export interface IRestResponse {
  status: number;
  data?: string;
}

export interface IRestRequestOptions {
  url: string;
  data?: any;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  timeout?: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export class RestService implements IRestService {
  private defaultHeaders: Record<string, string> = {
  };

  constructor() {
  }

  public async get(props: IRestRequestOptions): Promise<IRestResponse> {
    const request = this.createRequest('GET', props);
    return this.sendRequest(request);
  }

  public async post(props: IRestRequestOptions): Promise<IRestResponse> {
    const request = this.createRequest('POST', props);
    return this.sendRequest(request);
  }

  public async put(props: IRestRequestOptions): Promise<IRestResponse> {
    const request = this.createRequest('PUT', props);
    return this.sendRequest(request);
  }

  public async delete(props: IRestRequestOptions): Promise<IRestResponse> {
    const request = this.createRequest('DELETE', props);
    return this.sendRequest(request);
  }

  public async patch(props: IRestRequestOptions): Promise<IRestResponse> {
    const request = this.createRequest('PATCH', props);
    return this.sendRequest(request);
  }

  public createRequest(httpMethod: HttpMethod, props: IRestRequestOptions): IRestRequestWrapper {
    const oldParams: Record<string, string> = {};
    const request = new XMLHttpRequest();
    const formattedHeaders = {};
    Object.keys(props.headers || {}).forEach((key) => {
      formattedHeaders[key.toLocaleLowerCase()] = props.headers[key];
    });
    const headers: Record<string, string> = Object.assign({}, this.defaultHeaders, formattedHeaders);

    if (props.timeout) request.timeout = props.timeout;
    if (props.params && props.url.indexOf('?') > 0) {
      props.url = this.getUrlWithoutParams(props.url, oldParams);
      props.url = this.appendParams(props.url, oldParams, props.params);
    } else if (props.params) {
      props.url = this.appendParams(props.url, oldParams, props.params);
    }

    props.url = encodeURI(props.url);
    request.open(httpMethod, props.url, true);
    // Avoid REST caching to update values in IE11
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.setRequestHeader('Cache-Control', 'no-store');
    request.setRequestHeader('Pragma', 'no-cache');
    request.setRequestHeader('Expires', '0');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');

    Object.keys(headers).forEach((key) => {
      const value = headers[key];
      request.setRequestHeader(key, value);
    });

    return { request, headers, data: props.data, url: props.url };
  }

  private async sendRequest(restRequest: IRestRequestWrapper): Promise<IRestResponse> {
    let request = restRequest.request;
    const data = restRequest.data;

    const requestPromise = new Promise<IRestResponse>((resolve, reject) => {
      request.onreadystatechange = function handleOnReadyStateChange() {
        if (this.readyState !== XMLHttpRequest.DONE) return;

        const response = <IRestResponse> {
          status: this.status,
          data: this.responseText
        };

        if (this.status >= 200 && this.status < 300) resolve(response);

        else reject(response);
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleOnAbort() {
        reject(<IRestResponse> {
          status: this.status,
          data: this.responseText
        });

        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(<IRestResponse> {
          status: this.status,
          data: this.responseText
        });

        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        reject(<IRestResponse> {
          status: this.status,
          data: this.responseText
        });

        request = null;
      };

      request.send(data !== undefined ? data : null);
    });

    return requestPromise;
  }

  private getUrlWithoutParams(url: string, params: Record<string, string>): string {
    const split = url.split('?');
    const paramStr = split[1];
    if (paramStr) {
      const paramsSplit = paramStr.split('&');
      paramsSplit.forEach((keyValuePair) => {
        const keyVal = keyValuePair.split('=');
        params[keyVal[0]] = keyVal[1];
      });
    }

    return split[0];
  }

  private appendParams(
    url: string,
    oldParams: Record<string, string>,
    params: Record<string, string | number | boolean>
  ): string {
    let keys = Object.keys(oldParams);
    const oldLen = keys.length;
    if (oldLen > 0) {
      url += '?';
      keys.forEach((key: string, i: number): void => {
        const val = oldParams[key] || '';
        if (i < oldLen - 1) url += key + '=' + val + '&';
        else url += key + '=' + val;
      });
    }

    keys = Object.keys(params);
    const newLen = keys.length;
    if (newLen > 0) {
      url += oldLen > 0 ? '&' : '?';
      keys.forEach((key: string, i: number): void => {
        let val;
        if (typeof params[key] === 'number' || typeof params[key] === 'boolean') {
          val = params[key];
        } else {
          val = (params[key] || '');
        }
        if (i < newLen - 1) url += key + '=' + val + '&';
        else url += key + '=' + val;
      });
    }

    return url;
  }
}