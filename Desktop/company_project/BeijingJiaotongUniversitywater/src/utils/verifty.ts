import { message } from 'antd';
import login from '../styles/toast.module.scss';

function verifyMobile(mobile: string): boolean {
  return /\d{11}/.test(`${mobile}`.trim());
}

function desensitizationPhoneNumber(phoneNumber: string): string {
  return `${phoneNumber.slice(0, 3)}****${phoneNumber.slice(7)}`;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function get_time(text: string): string {
  const time = new Date(text);
  return `${time.toLocaleDateString()} ${time.toLocaleTimeString('chinese', {
    hourCycle: 'h23',
  })}`;
}
type ToastObjType = {
  200: string;
  500: string;
  400: string;
  601: string;
  10003: string;
  success: string;
  warn: string;
  error: string;
  info: string;
};
const ToastObj: ToastObjType = {
  200: 'success',
  500: 'warn',
  400: 'info',
  601: 'warn',
  10003: 'warn',
  success: 'success',
  warn: 'warn',
  error: 'error',
  info: 'info',
};
export type PersonKeys = keyof ToastObjType;
function ToastText(code: PersonKeys, contents: string) {
  if (ToastObj[code] === 'success' && contents) {
    return message.success({
      content: contents,
      className: `${login.toast} ${login.toast_success}`,
    });
  }
  if (ToastObj[code] === 'error' && contents) {
    return message.error({
      content: contents,
      className: `${login.toast} ${login.toast_error}`,
    });
  }
  if (ToastObj[code] === 'warn' && contents) {
    return message.warn({
      content: contents,
      className: `${login.toast} ${login.toast_warn}`,
    });
  }
  if (ToastObj[code] === 'info' && contents) {
    return message.info({
      content: contents,
      // icon:<IconFont type={'icon-'}/>,
      // duration:0,
      className: `${login.toast} ${login.toast_info}`,
    });
  }
}
type ToastType = 'success' | 'error' | 'warn' | 'info';
export function Toast(type: ToastType, contents: string) {
  // eslint-disable-next-line default-case
  return message[type]({
    content: contents,
    className: `${login.toast} ${login[`toast_${type}`]}`,
  });
}
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/naming-convention
function get_msg(data: string | any) {
  if (typeof data === 'string') {
    Toast('warn', data);
  } else {
    let txt = '';
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      txt = data[i];
    }
    Toast('warn', txt);
  }
}
const VerifyUtils = {
  verifyMobile,
  desensitizationPhoneNumber,
  get_time,
  get_msg,
  Toast,
  ToastText,
};

export default VerifyUtils;
