import { useState, useEffect, useCallback } from 'react';
import { Form, Button, message, Row, Input } from 'antd';
import ComStomFrom from '@views/components/From';
import { useHistory } from 'react-router-dom';
import './style.less';
import {
  CloudUploadOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import Upload, { UploadChangeParam } from 'antd/lib/upload';
import moment from 'moment';
import { UploadFile } from 'antd/lib/upload/interface';
import { ComstomInput } from '@/views/components/Basic';
import {
  apiStandardAdd,
  apiStandardEdit,
  apiStandardQuery,
} from '@/views/data-quality-management/service';
import { returnStandardList } from './component/FormList';
// import { getToken } from '@/utils/cookie';

export default function ComponentName() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [file, setFile] = useState<UploadFile[]>([]);
  const [isRemoveFlag, setIsRemoveFlag] = useState<boolean>(false);
  //   const [formData, changeFormData] = useState<{ [key: string]: any }>({});
  //   console.log(changeFormData, 'changeFormData', formData);
  console.log(form.getFieldsValue(), 'form.getFieldsValue');
  const culDisAble = () => {
    return ['detail', 'examine'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };

  // 获取详情
  const getDetail = (id: string) => {
    console.log(id, 'id');
    if (
      history.location.pathname.indexOf(
        'ata-quality-management/standard/edit',
      ) >= 0 ||
      history.location.pathname.indexOf(
        'ata-quality-management/standard/detail',
      ) >= 0
    ) {
      apiStandardQuery({ id }).then((res: any) => {
        if (res.data.code === 200) {
          const { release_time, implement_time } = res.data.data;
          //   console.log(res, 'res', moment(release_time));
          setFile([
            {
              uid: res.data.data.document,
              name: 'file',
              status: 'done',
              url: res.data.data.document,
              thumbUrl: res.data.data.document,
            },
          ]);
          form.setFieldsValue({
            ...res.data.data,
            release_time: moment(release_time),
            implement_time: moment(implement_time),
          });
          console.log(form.getFieldsValue(), 'form.getFieldsValue');
        } else {
          message.error(res.data.msg);
        }
      });
    }
  };
  useEffect(() => {
    if (history.location.search.split('?').length > 0) {
      getDetail(history.location.search.split('?')[1]);
    }
  }, []);

  const onRemove = (file: any) => {
    console.log(file, 'onRemove-file');
    setIsRemoveFlag(true);
    form.setFieldsValue({ document: undefined });
  };
  const onChange = useCallback(
    ({ file }: UploadChangeParam<any>) => {
      console.log(file, 'file');
      if (!isRemoveFlag) {
        setFile([file]);
        form.setFieldsValue({ document: file });
      }
      // console.log(form.getFieldsValue(), 'form.getFieldsValue');
    },
    [isRemoveFlag],
  );
  const onDownload = (file: any) => {
    console.log(file, 'onDownload-file');
    const downloadElement = document.createElement('a');
    downloadElement.style.display = 'none';
    downloadElement.href = file;
    downloadElement.download = 'file'; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
  };
  // 保存/更新
  const cSubmit = async (value: any) => {
    console.log(value, 'value');
    const params = {
      ...value,
      release_time: moment(value.release_time).format('YYYY-MM-DD'),
      implement_time: moment(value.implement_time).format('YYYY-MM-DD'),
    };
    let id;
    if (
      history.location.pathname.indexOf(
        'data-quality-management/standard/edit',
      ) >= 0
    ) {
      // todo 修改取值方式  new URLSearchParams
      // eslint-disable-next-line prefer-destructuring
      id = history.location.search.split('?')[1];
    }
    const res = id
      ? await apiStandardEdit(params, id)
      : await apiStandardAdd(params);
    console.log(res, 'res');
    if (res.data.code === 200) {
      message.success('保存成功');
      history.goBack();
    } else {
      message.error(res.data.msg);
    }
  };

  return (
    <>
      {/* <h3 className='product_title'>所属组织：北京水务分公司</h3> */}
      <ComStomFrom
        form={form}
        listArr={returnStandardList(() => culDisAble())}
        fromClassName='p_s_m_form'
      >
        {/* <div className='new_equipment'>
        <h5 className='title'>生产/排放设备</h5>
      </div> */}
        <Row>
          <Form.Item
            label='标准文件'
            name='document'
            rules={
              !culDisAble()
                ? [{ required: true, message: '请点击上传文件' }]
                : []
            }
          >
            <div className='upload_tips'>
              支持文件格式：rar、zip、doc、docx、pdf、jpg、jpeg、png、gif，最大支持上传10M文件
            </div>
            <Upload
              name='file'
              action=''
              fileList={[...file]}
              showUploadList={{
                showDownloadIcon: true,
                downloadIcon: (
                  <VerticalAlignBottomOutlined
                    onClick={e => console.log(e, 'custom removeIcon event')}
                  />
                ),
              }}
              onDownload={() => onDownload(file[0].url)}
              listType='picture'
              disabled={culDisAble()}
              maxCount={1}
              onChange={onChange}
              onRemove={onRemove}
              beforeUpload={() => false}
            >
              <Button icon={<CloudUploadOutlined />}> 上传文件</Button>
            </Upload>
          </Form.Item>
        </Row>
        <Row />
        <Row />
        <Row>
          <Form.Item label='链接地址' name='link_address'>
            <ComstomInput
              placeholder='请输入'
              disabled={culDisAble()}
              maxLength={500}
            />
          </Form.Item>
        </Row>
        <Row />
        <Row />
        <Row>
          <Form.Item label='备注' name='remark'>
            <Input.TextArea
              placeholder='请输入'
              maxLength={500}
              disabled={culDisAble()}
              showCount
              style={{ height: 120 }}
            />
          </Form.Item>
        </Row>
      </ComStomFrom>
      <div className='DrawerBtn'>
        {culDisAble() ? (
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
        ) : (
          <>
            <Button onClick={() => history.goBack()}>取消</Button>
            <Button
              className='marginLeft20'
              type='primary'
              onClick={async () => {
                await form.validateFields().then(async value => {
                  cSubmit(value);
                });
              }}
            >
              保存
            </Button>
          </>
        )}
      </div>
    </>
  );
}
