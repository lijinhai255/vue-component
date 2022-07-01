import { useState, useEffect } from 'react';
import { Form, Button, message, Row, Input, Modal, Col } from 'antd';
import ComStomFrom from '@views/components/From';
import { useHistory } from 'react-router-dom';
import './style.less';
import { PlusOutlined } from '@ant-design/icons';
import Upload from 'antd/lib/upload';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import { ComstomInput } from '@/views/components/Basic';
import {
  apiProcessEdit,
  apiProcessQuery,
  apiProcessAdd,
} from '@/views/data-quality-management/service';
// import { getToken } from '@/utils/cookie';
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export default function ComponentName() {
  const history = useHistory();
  const [form] = Form.useForm();
  // const [file, setFile] = useState<UploadFile[]>([]);
  //   const [formData, changeFormData] = useState<{ [key: string]: any }>({});
  //   console.log(changeFormData, 'changeFormData', formData);
  console.log(form.getFieldsValue(), 'form.getFieldsValue');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = ({
    file: UploadFile,
    fileList: newFileList,
  }) => {
    // console.log(UploadFile, 'UploadFile');
    // console.log(newFileList, 'newFileList');
    setFileList(newFileList);
    form.setFieldsValue({
      flow_chart: UploadFile,
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>
        {fileList.length > 0 ? '重新上传' : '上传图片'}
      </div>
    </div>
  );
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
        'data-quality-management/control/process/edit',
      ) >= 0 ||
      history.location.pathname.indexOf(
        'data-quality-management/control/process/detail',
      ) >= 0
    ) {
      apiProcessQuery({ id }).then((res: any) => {
        if (res.data.code === 200) {
          setFileList([res.data.data.flow_chart]);
          form.setFieldsValue({
            ...res.data.data,
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

  // const onChange = useCallback(({ file }: UploadChangeParam<any>) => {
  //   console.log(file, 'file');

  //   // setFile([file]);
  //   form.setFieldsValue({ flow_chart: file });
  //   // console.log(form.getFieldsValue(), 'form.getFieldsValue');
  // }, []);
  // 保存/更新
  const cSubmit = async (value: any) => {
    console.log(value, 'value');
    const params = {
      ...value,
    };
    let id;
    if (
      history.location.pathname.indexOf(
        'data-quality-management/process/edit',
      ) >= 0
    ) {
      // todo fix search
      // eslint-disable-next-line
      id = history.location.search.split('?')[1];
    } else {
      // eslint-disable-next-line
      params.quality_control_id = history.location.search.split('?')[1];
    }
    console.log(params, 'params');
    const res = id
      ? await apiProcessEdit(params, id)
      : await apiProcessAdd(params);
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
      <ComStomFrom form={form} listArr={[]} fromClassName='process_form'>
        <Row>
          <Col span={8}>
            <Form.Item
              label='生产工艺名称'
              name='name'
              rules={
                !culDisAble()
                  ? [{ required: true, message: '请输入生产工艺名称' }]
                  : []
              }
            >
              <ComstomInput
                placeholder='请输入'
                disabled={culDisAble()}
                maxLength={50}
                className='width_100'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            label='生产工艺流程图'
            name='flow_chart'
            rules={
              !culDisAble()
                ? [{ required: true, message: '请点击上传图片' }]
                : []
            }
          >
            <div className='upload_tips'>
              支持格式：png、jpg、jpeg、gif，上传图片最大支持10M
            </div>
            {/* <Upload
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
              listType='picture-card'
              disabled={culDisAble()}
              maxCount={1}
              onChange={onChange}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload> */}
            <Upload
              name='picture'
              action=''
              listType='picture-card'
              fileList={fileList}
              maxCount={1}
              disabled={culDisAble()}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label='生产工艺流程图'
              name='describe'
              rules={
                !culDisAble()
                  ? [{ required: true, message: '请输入生产工艺流程图' }]
                  : []
              }
            >
              <Input.TextArea
                placeholder='请输入'
                maxLength={2000}
                disabled={culDisAble()}
                showCount
                style={{ height: 120 }}
              />
            </Form.Item>
          </Col>
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
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
