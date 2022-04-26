/**
 * @file 全局utils
 */
import { ReactNode } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { compact, Dictionary } from 'lodash';
interface QuerystringType {
  id?: string;
  type?: string;
  guideId?: string;
  goodsId?: string | undefined;
  [other: string]: any;
}
export const shakingObj = (obj: Dictionary<any>) => {
  const o: Dictionary<any> = {};
  const keys = Object.keys(obj);
  keys.forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (obj[key]) o[key] = obj[key];
  });
  return o;
};
export function querystringToObject(): QuerystringType {
  const reault: QuerystringType = {};
  const querystring = window.location.href.split('?')[1];

  if (querystring) {
    const reg = /[^?&]+=[^?&]+/g;
    const found = querystring.match(reg);
    if (found) {
      found.forEach(ele => {
        const temp = ele.split('=');
        const key = temp[0];
        const value = temp[1];
        reault[key] = value;
      });
    }
  }

  return reault;
}
export const genFormData = (obj: Dictionary<any>) => {
  const fd = new FormData();
  const keys = Object.keys(obj);
  keys.forEach(key => {
    if (obj[key]) fd.append(key, obj[key]);
  });
  return fd;
};

export const combineClassName = (...classNames: (string | undefined)[]) =>
  compact(classNames).join(' ');

/**
 * 处理数字的保留位数
 * @param num 要处理的数字
 * @param fixNum 保留的小数位数
 */
export const sliceNumberEnd = (num: string | number, fixNum?: number) =>
  (+num).toFixed(fixNum ?? 2);

export const fixTableText = (str?: ReactNode, emptyShow?: ReactNode) =>
  str || emptyShow || '-';
// @ts-ignore
export const fixTableColumnsText = <T = any>(columns: ColumnsType<T>) => {
  return columns.map(column => ({
    ...column,

    render: (text: string, record: T, index: number) =>
      column?.render
        ? column.render(fixTableText(text), record, index)
        : fixTableText(text),
  }));
};

/**
 * 转换图片的 base64 到 blob
 */
export const base64ToBlob = (data: string) => {
  const rImageType = /data:(image\/.+);base64,/;
  let mimeString = '';
  let raw;
  let uInt8Array;
  let i;
  let rawLength: number | Iterable<number> = 0;

  raw = data.replace(rImageType, function (header, imageType: string) {
    mimeString = imageType;

    return '';
  });

  raw = atob(raw);
  rawLength = raw.length;
  uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

  for (i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: mimeString });
};

// 将图片转为file
export const cutFile = (
  file: File,
  options?: { width: number; height: number },
): Promise<null | File> => {
  let sizeRate = 1;
  if (options) {
    sizeRate = options.width / options.height;
  }
  const img = document.createElement('img');
  const url = window.URL.createObjectURL(file);
  img.src = url;
  img.crossOrigin = 'anonymous';
  return new Promise(r => {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    img.onload = () => {
      if (!ctx) {
        r(null);
        return;
      }
      const { width } = img;
      cvs.width = width;
      cvs.height = width / sizeRate;
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height);

      const nameArr = url.split('/');
      const name = nameArr[nameArr.length - 1]?.includes('.')
        ? nameArr[nameArr.length - 1]
        : '1.jpg';

      const base64Data = cvs.toDataURL('image/jpg', 0.9);
      const blob = base64ToBlob(base64Data);
      r(blob && new File([blob], name, { type: 'image/jpg' }));
    };
  });
};

// 脱敏手机号
export const desensitizationPhoneNumber = (phoneNumber: string) =>
  `${phoneNumber.slice(0, 3)}****${phoneNumber.slice(7)}`;
// 手机号校验
export const checkSubmit = (val: string) => {
  const regTel =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return regTel.test(val);
};

export const clearObject = (obj: Dictionary<any>) => {
  Object.keys(obj).forEach(k => {
    if (obj[k] instanceof Object) {
      clearObject(obj[k]);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[k] = undefined;
    }
  });
};
// 对象数组去重
export const removeRepeat = (arr: [], key: string) => {
  const map: Map<string, number> = new Map();
  arr.forEach(item => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });

  return Array.from(map.values());
};
export const unique = <T>(arr: T[]) => {
  const arrMap = new Map();
  arr.forEach((element: T) => {
    if (!arrMap.has(element)) {
      arrMap.set(element, element);
    }
  });
  return arrMap.keys();
};

// 获取后缀名
export const getFileSuffix = (fileName: string) => {
  //获取最后一个.的位置
  let index = fileName.lastIndexOf('.');
  //获取后缀
  let suffix = fileName.substr(index + 1);
  return suffix;
};
export const expectReductionArr = () => {
  let arr = [];
  for (let index = 0; index < 31; index++) {
    arr.push({ dictValue: index, dictLabel: index });
  }
  return arr;
};
export function formatDate(date: any) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}
// 近一个月时间返回
export function month_one_age(date: number) {
  return formatDate(
    new Date(new Date().setMonth(new Date().getMonth() - date)),
  );
}
