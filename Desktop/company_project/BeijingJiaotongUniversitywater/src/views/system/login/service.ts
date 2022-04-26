import { request } from '@api/request';
import { UserState } from '@store/module/user';

export interface UserLoginData {
  account: string;
  password: string;
}
// 发送
export function apiSendSMS(params: { number: string }) {
  return request<UserState>({
    method: 'get',
    url: '/auth/token/sendSMS',
    params,
  });
}
// 校验验证码
export function apiCheckIdentify(data: { username: string; identify: string }) {
  return request<UserState>({
    method: 'post',
    url: '/auth/token/checkIdentify',
    data,
  });
}
// 登录
export function apiLogin(data: {
  username: string | undefined;
  password?: string | null | undefined;
  identify?: string | null | undefined;
}) {
  return request<UserState>({
    method: 'post',
    url: '/auth/token/login',
    data,
  });
}
// 忘记密码
export function editUser(data: {
  username: string | null;
  oldPassword?: string | null;
  newPassword?: string | null;
  identify: string | null;
  nickName?: string | null;
  id?: string | null;
  type?: string | number;
}) {
  return request<UserState>({
    method: 'post',
    url: '/auth/token/editUser',
    data,
  });
}
// 忘记密码
export function updatePwd(data: {
  oldPassword?: string | null;
  newPassword?: string | null;
}) {
  return request<UserState>({
    method: 'post',
    url: '/system/user/updatePwd',
    data,
  });
}

// 注册
export function apiRegister(data: {
  username: string;
  password?: string | null;
  identify?: string | null;
  nickName?: string | null;
}) {
  return request<UserState>({
    method: 'post',
    url: '/auth/token/register',
    data,
  });
}

interface UserLoginByMobileData {
  mobile: string;
  code: number;
}

export function apiUserLoginByMobile(data: UserLoginByMobileData) {
  return request<UserState>({
    method: 'POST',
    url: '/user/login-mobile',
    data,
  });
}

interface MobileLoginiData {
  mobile: string;
}

export function apiGetVerifyCode(data: MobileLoginiData) {
  return request({
    method: 'POST',
    url: '/sms',
    data,
  });
}
