import { request } from '../../../api/request';

export interface UpdateUserPwdData {
  password: string;
  mobile: string;
  code: string;
}

export function apiUpdateUserPwd(data: UpdateUserPwdData) {
  return request({
    method: 'PUT',
    url: '/user/pwd',
    data,
  });
}
