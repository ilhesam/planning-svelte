/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class TargetsService {
  /**
   *
   */
  static search(
    params: {
      /** requestBody */
      body?: SearchTargetRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TargetIListResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/API/Targets/Search';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getById(
    params: {
      /** requestBody */
      body?: IdRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TargetIResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/API/Targets/GetById';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: TargetRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<IResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/API/Targets/Create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static update(
    params: {
      /** requestBody */
      body?: TargetRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<IResult> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/API/Targets/Update';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}

export interface Error {
  /**  */
  code?: string;

  /**  */
  description?: string;
}

export interface IResult {
  /**  */
  errors?: Error[];

  /**  */
  debug?: any | null[];

  /**  */
  traceId?: string;

  /**  */
  sessionId?: string;

  /**  */
  duration?: number;

  /**  */
  code?: number;
}

export interface IdRequest {
  /**  */
  id: string;
}

export interface SearchTargetRequest {
  /**  */
  parents?: boolean;

  /**  */
  parentId?: string;
}

export interface Target {
  /**  */
  id?: string;

  /**  */
  parentId?: string;

  /**  */
  title?: string;

  /**  */
  description?: string;

  /**  */
  timeline?: Timeline;

  /**  */
  priority?: number;

  /**  */
  progress?: number;

  /**  */
  goal?: number;
}

export interface TargetIListResult {
  /**  */
  pageSize?: number;

  /**  */
  totalPages?: number;

  /**  */
  pageNumber?: number;

  /**  */
  totalCount?: number;

  /**  */
  hasPrevious?: boolean;

  /**  */
  hasNext?: boolean;

  /**  */
  data?: Target[];

  /**  */
  errors?: Error[];

  /**  */
  debug?: any | null[];

  /**  */
  traceId?: string;

  /**  */
  sessionId?: string;

  /**  */
  duration?: number;

  /**  */
  code?: number;
}

export interface TargetIResult {
  /**  */
  data?: Target;

  /**  */
  errors?: Error[];

  /**  */
  debug?: any | null[];

  /**  */
  traceId?: string;

  /**  */
  sessionId?: string;

  /**  */
  duration?: number;

  /**  */
  code?: number;
}

export interface TargetRequest {
  /**  */
  id?: string;

  /**  */
  parentId?: string;

  /**  */
  title?: string;

  /**  */
  description?: string;

  /**  */
  timeline?: Timeline;

  /**  */
  priority?: number;

  /**  */
  goal?: number;
}

export interface Timeline {
  /**  */
  from?: Date;

  /**  */
  to?: Date;
}
