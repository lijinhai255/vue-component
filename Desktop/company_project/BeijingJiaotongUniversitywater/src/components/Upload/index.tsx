/**
 * @file 图片上传组件 目前只支持单张图片上传
 */

import { IconFont } from '@components/IconFont';
import { FC, memo, ReactNode, useMemo, useState } from 'react';
import { Upload as AntUpload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import styles from './index.module.scss';
import { combineClassName } from '@/utils';

export type Props = {
  value?: string | File;
  // 图片大小限制提示
  sizeTip?: string | ReactNode;
  className?: string;
  onChange?: (file: File) => void;
};

export const Upload: FC<Props> = memo(
  ({ value, sizeTip, onChange, children, className }) => {
    const [cover, setCover] = useState<Props['value']>(value);
    const coverUrl = useMemo(() => {
      const img = value ?? cover;
      // File
      if (img instanceof File) return window.URL.createObjectURL(img);
      // base64 & url
      return img;
    }, [cover, value]);
    const onChooseFile = (info: UploadChangeParam<UploadFile<File>>) => {
      const file = info.file as unknown as File;
      setCover(file);
      onChange?.(file);
    };
    const usedSizeTip = sizeTip ?? '图片尺寸为595×842px，大小不超过500k';
    return (
      <div
        className={combineClassName(styles.uplodaContainer, className ?? '')}
      >
        {coverUrl && (
          <>
            <div
              className={combineClassName(
                styles.showUploadWrapper,
                'show-upload-img-wrapper',
              )}
            >
              <img src={coverUrl} alt='封面图' />
            </div>
            <div className={styles.reuploadWrapper}>
              <IconFont type='icon-icon-tongxinshangzhuan-1' />
              <div className={styles.reuploadText}>重新上传</div>
            </div>
          </>
        )}
        <AntUpload
          name='avatar'
          listType='picture-card'
          className={combineClassName(
            styles['avatar-uploader'],
            coverUrl && styles.opacityUpload,
          )}
          showUploadList={false}
          style={{ width: 400 }}
          accept='image/*'
          beforeUpload={() => false}
          onChange={(info: UploadChangeParam<UploadFile<File>>) =>
            onChooseFile(info)
          }
        >
          {children || (
            <div>
              <p>
                <IconFont type='icon-icon-shangzhuantupian' />
              </p>
              <p className='ant-upload-text'>
                拖拽至此或<span style={{ color: '#005BAC' }}>点击上传</span>
              </p>
              <p className='ant-upload-hint'>仅支持jpg/png格式</p>
              <p className='ant-upload-hint'>{usedSizeTip}</p>
            </div>
          )}
        </AntUpload>
      </div>
    );
  },
);
