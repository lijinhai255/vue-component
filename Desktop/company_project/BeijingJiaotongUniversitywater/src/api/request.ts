/**
 * @file axios base 接口请求封装，通用处理
 */
/* eslint-disable */
import { message, Modal } from 'antd';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
// import { message, Modal } from 'antd';
// import AdminConfig from '../config';
import { getToken } from '../utils/cookie';
import { logout } from '../store/module/user';
import { clearSideBarRoutes } from '../store/module/app';
import store from '../store/index';
import VerifyUtils from '../utils/verifty';
// import { Toast } from '../utils/verifty';
/* eslint-enable */

interface ResponseData<T = any> {
  detail?: string; // 退出才会有
  code: number;
  data: T;
  status: string; // 可能返回error
  msg: string;
}

// 指定 axios 请求类型
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

// 指定请求地址
// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    if (getToken()) {
      const token = `${getToken()}`;
      // eslint-disable-next-line
      config.headers.Authorization = 'JWT ' + token;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    if (response.data.code === 401) {
      Modal.confirm({
        title: '系统提示',
        content: response.data.msg,
        okText: '重新登录',
        onOk() {
          store.dispatch(clearSideBarRoutes());
          store.dispatch(logout());
          window.location.href = `/react-ant-admin/system/login`;
        },
        onCancel() {},
      });
    }
    // 403
    if (response.data.code === 403) {
      Modal.confirm({
        title: '系统提示',
        content: response.data.msg,
        okText: '确定',
        cancelButtonProps: { style: { display: 'none' } },
        onOk() {
          // window.location.href = `/dashborad/intro`;
          // 由于修改个人用户权限点，后端接口处理有问题，临时403让重新登录-22.06.09
          window.location.href = `/system/login`;
        },
        onCancel() {},
      });
    }
    // 403-结束
    if (response.data.status === 'error') {
      VerifyUtils.get_msg(response.data.msg);
      return Promise.reject(response);
    }
    if (response.data.code === 201) {
      message.error(response.data.msg);
      return Promise.reject(response);
    }
    // 退出登录 接口返回的信息比较特殊 根据返回的参数进行拦截跳转
    if (response.data.detail) {
      if (response.data.detail === 'Successfully logged out.') {
        return Promise.resolve(response);
      }
    }
    if (response.data.data === 200) {
      return Promise.resolve(response);
    }
    if (response.data.code === 200) {
      return Promise.resolve(response);
    }
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  error => {
    return Promise.reject(error);
  },
  //   (response: AxiosResponse<ResponseData<any>>) => {
  //     if (!response.data) {
  //       return Promise.resolve(response);
  //     }
  //     // 根据后台的条件新增判断
  //     if (response.status === 200) {
  //       return Promise.resolve(response);
  //     }

  //     // 登录已过期或者未登录
  //     if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
  //       Modal.confirm({
  //         title: '系统提示',
  //         content: response.data.msg,
  //         okText: '重新登录',
  //         onOk() {
  //           store.dispatch(clearSideBarRoutes());
  //           store.dispatch(logout());
  //           window.location.href = `${
  //             window.location.origin
  //           }/react-ant-admin/system/login?redirectURL=${encodeURIComponent(
  //             window.location.href,
  //           )}`;
  //         },
  //         onCancel() {},
  //       });

  //       return Promise.reject(response.data.msg);
  //     }

  //     // 请求成功
  //     if (response.data.code === AdminConfig.SUCCESS_CODE) {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //       return Promise.resolve(response);
  //     }

  //     // 请求成功，状态不为成功时
  //     /* eslint-disable */
  //     if (response.data.msg) message.error(response.data.msg);
  //     return Promise.reject(response);
  //     /* eslint-enable */
  //   },
  //   (error: AxiosError) => {
  //     if (error.message) message.error(error.message);

  //     return Promise.reject(error);
  //   },
);

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>({
    ...options,
    baseURL: `${process.env.REACT_APP_API_LOGIN_URL}/api/v1`,
  });
}
export function Qrequest<T>(options: AxiosRequestConfig) {
  return axios.request<T>({
    ...options,
    baseURL: process.env.REACT_APP_API_URL,
  });
}
