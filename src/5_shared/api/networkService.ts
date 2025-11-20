export interface NetworkConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface ApiError extends Error {
  status?: number;
  response?: Response;
  data?: any;
}

export class NetworkService {
  private config: NetworkConfig;

  constructor(config: NetworkConfig = {}) {
    this.config = {
      baseURL: 'http://127.0.0.1:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    const baseURL = this.config.baseURL || '';
    return `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }

  private async createRequest(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<Request> {
    const url = this.buildUrl(endpoint);

    const headers = new Headers({
      ...this.config.headers,
      ...options.headers,
    });

    const requestInit: RequestInit = {
      method,
      headers,
      signal: options.signal,
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      if (data instanceof FormData) {
        // Remove Content-Type for FormData to let browser set it with boundary
        headers.delete('Content-Type');
        requestInit.body = data;
      } else {
        requestInit.body = JSON.stringify(data);
      }
    }

    return new Request(url, requestInit);
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      let errorData: any = null;
      const contentType = response.headers.get('content-type');

      try {
        if (contentType?.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }
      } catch {
        // Ignore parsing errors for error responses
      }

      const error: ApiError = new Error(
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`
      );
      error.status = response.status;
      error.response = response;
      error.data = errorData;

      throw error;
    }

    const contentType = response.headers.get('content-type');
    let data: T;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  private async executeRequest<T>(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const request = await this.createRequest(method, endpoint, data, options);

    // Handle timeout
    const timeout = options.timeout || this.config.timeout || 10000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(request, {
        ...request,
        signal: options.signal || controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError: ApiError = new Error('Request timeout');
        timeoutError.status = 408;
        throw timeoutError;
      }

      throw error;
    }
  }

  async get<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>('GET', endpoint, undefined, options);
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>('POST', endpoint, data, options);
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>('PUT', endpoint, data, options);
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>('PATCH', endpoint, data, options);
  }

  async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.executeRequest<T>('DELETE', endpoint, undefined, options);
  }

  // Convenience method to get just the data
  async getData<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.get<T>(endpoint, options);
    return response.data;
  }

  async postData<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.post<T>(endpoint, data, options);
    return response.data;
  }

  async putData<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.put<T>(endpoint, data, options);
    return response.data;
  }

  async patchData<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.patch<T>(endpoint, data, options);
    return response.data;
  }

  async deleteData<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.delete<T>(endpoint, options);
    return response.data;
  }
}

// Default instance for common usage
export const networkService = new NetworkService({
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
});

// Create custom instances for different APIs
export const createNetworkService = (config: NetworkConfig) =>
  new NetworkService(config);
