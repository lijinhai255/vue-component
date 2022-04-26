import store from '@/store';
import VerifyUtils from '@utils/verifty';
import { apiRegister, apiLogin } from '../service';
import { modify_reset } from '@/api/api';
import Cookies from 'js-cookie';
// const x = useSelector(x => x);

export const userInfo = (e: any, phone: string) => {
  console.log([phone]);
  if (e.accessToken) {
    store.dispatch({
      type: 'SET_USER_INFO',
      payload: e,
    });
    Cookies.set('username', phone);
    sessionStorage.setItem('userinfo', JSON.stringify(e));
    if (e.orgStatus === 0) {
      return (window.location.href = '/dashborad/intro');
    }
    if (e.orgStatus === 1) {
      return (window.location.href = '/system/result?resule=1');
    }
    if (e.orgStatus === 2) {
      return (window.location.href = '/system/result?resule=2');
    }
    window.location.href = '/system/register';
  }
};
const registerPass = async (
  e: {
    phone_number?: string;
    password?: string;
    code?: string;
    new_password?: string;
    username?: string;
    vfcode?: string;
  },
  agreement: boolean,
  type: string,
) => {
  if (type.indexOf('注册') >= 0) {
    await apiRegister({
      password: e.password,
      username: e.phone_number,
      vfcode: e.code,
    }).then(async ({ data }) => {
      if (Number(data.code) === 200) {
        userInfo(data.data, e.phone_number as string);
      } else {
        await VerifyUtils.ToastText('error', data.msg);
      }
    });
  }
  if (type.indexOf('登录') >= 0) {
    await apiLogin({
      password: e.password,
      username: e.phone_number,
      vfcode: e.code,
    }).then(async ({ data }) => {
      if (Number(data.code) === 200) {
        userInfo(data.data, e.phone_number as string);
      } else {
        await VerifyUtils.ToastText('error', data.msg);
      }
    });
  }
  if (type === '忘记密码') {
    delete e.new_password;
    return new Promise(resolve => {
      modify_reset({
        password: e.password,
        username: e.phone_number,
        vfcode: e.code,
      })
        .then(async (res: any) => {
          console.log(res);
          if (Number(res.data.code) !== 200) {
            return VerifyUtils.Toast('info', res.data.msg);
          }
          return resolve('成功');
        })
        .catch(() => {});
    });
  }
  console.log(type, e);
};

export { registerPass };
