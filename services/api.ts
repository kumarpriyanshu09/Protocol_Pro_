import axios, { AxiosInstance, AxiosError } from 'axios';

// API Configuration
const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.protocolpro.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Create Axios instance
const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from secure storage
    const token = ''; // TODO: Implement secure token storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
    };

    if (error.response) {
      // Server responded with error
      apiError.code = `SERVER_ERROR_${error.response.status}`;
      apiError.message = error.response.data?.message || error.message;
      apiError.details = error.response.data;
    } else if (error.request) {
      // Request made but no response
      apiError.code = 'NETWORK_ERROR';
      apiError.message = 'Network error occurred';
    }

    return Promise.reject(apiError);
  }
);

// Generic API methods
export const api = {
  get: async <T>(url: string, params?: object) => {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },

  post: async <T>(url: string, data?: object) => {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: object) => {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string) => {
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};

export default api; 