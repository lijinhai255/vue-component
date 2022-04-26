import { FC, useState } from 'react';
import { Button, Modal, Form, Radio, Input, Table, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { AuditInfo, apiAuditAdd } from '../../service';
import { apiAuditOrder } from '@/views/base/service';
import style from '../../index.module.scss';
import VerifyUtils, { PersonKeys } from '@/utils/verifty';

interface AuditResultObjType {
  '0': string;
  '1': string;
  '2': string;
}
const auditResultObj: AuditResultObjType = {
  '0': '待审核',
  '1': '审核通过',
  '2': '审核不通过',
}; // 0 待审核 1审核通过 1 审核不通过
interface ExamineProps {
  examinData?: AuditInfo;
  SyncCallApiMarkQueryFn?: () => void;
}

const Examine: FC<ExamineProps> = ({ examinData, SyncCallApiMarkQueryFn }) => {
  const [isModalVisible, changeIsModalVisible] = useState(false);
  const history = useHistory();
  const [examForm] = Form.useForm();

  // 审核 - 判断是否是排放因子详情 和排放因子审核
  const culContent = () => {
    if (
      history.location.pathname.indexOf('emission-factor/myemission/detail') >=
      0
    ) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div>
            审核状态：
            {
              auditResultObj[
                examinData?.auditResult ? examinData?.auditResult : 0
              ]
            }
          </div>
        </div>
      );
    }
    if (
      history.location.pathname.indexOf('emission-factor/examine/examine') >= 0
    ) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div>
            类型：{examinData?.factorIsNew === 'edit' ? '修改因子' : '新增因子'}
          </div>
          <div>
            审核状态：
            {
              auditResultObj[
                examinData?.auditResult ? examinData?.auditResult : 0
              ]
            }
          </div>
          {examinData?.auditResult === '0' && (
            <Button
              type='primary'
              onClick={() => {
                changeIsModalVisible(true);
              }}
            >
              审核
            </Button>
          )}
        </div>
      );
    }
    if (history.location.pathname.indexOf('basic-admin/orders/exam') >= 0) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div>
            审核状态：
            {
              auditResultObj[
                examinData?.auditResult ? examinData?.auditResult : 0
              ]
            }
          </div>
          {
            <Button
              type='primary'
              onClick={() => {
                changeIsModalVisible(true);
              }}
            >
              审核
            </Button>
          }
        </div>
      );
    }
    return '';
  };
  const culModifyRecords = () => {
    if (
      (history.location.pathname.indexOf('emission-factor/myemission/detail') >=
        0 &&
        examinData?.auditResult === '1') ||
      (history.location.pathname.indexOf('emission-factor/examine') >= 0 &&
        examinData?.factorIsNew === 'edit')
    ) {
      return (
        <Input.TextArea
          disabled
          style={{ background: '#fff', cursor: 'pointer', marginTop: 20 }}
          value={examinData?.modifyRecords}
          rows={10}
        />
      );
    }
    return '';
  };
  // 判断是否订单
  const culOrder = () => {
    return history.location.pathname.indexOf('basic-admin/orders') >= 0;
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      render: (t: string, _: any, index: number) => index + 1,
    },
    {
      title: '审核结果',
      dataIndex: culOrder() ? 'auditState' : 'auditResult',
      key: 'auditResult',
      render: (t: keyof AuditResultObjType) => auditResultObj[t],
    },
    {
      title: '备注',
      dataIndex: culOrder() ? 'remark' : 'auditContent',
      key: 'auditContent',
    },
    {
      title: '审核人',
      dataIndex: culOrder() ? 'auditBy' : 'auditUser',
      key: 'auditUser',
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      key: 'auditTime',
    },
  ];
  return (
    <div>
      <div className={style.title}>
        <h2>审核信息</h2>
      </div>
      {culContent()}
      <Table
        dataSource={examinData?.auditList}
        columns={columns}
        pagination={false}
      />
      {culModifyRecords()}
      <Modal
        title='审核'
        visible={isModalVisible}
        onOk={async () => {
          await examForm.validateFields().then(async value => {
            if (value.auditResult === '2' && !value.auditContent) {
              return message.error('请填写审核不通过原因');
            }
            if (value.auditState === '2' && !value.auditRemark) {
              return message.error('请填写审核不通过原因');
            }
            if (culOrder()) {
              await apiAuditOrder({
                // 审核接口
                ...value,
                orderId: history.location.search.split('?')[1],
              }).then(async ({ data }) => {
                if (data.code === 200) {
                  SyncCallApiMarkQueryFn?.(); // 详情接口 数据更新
                  changeIsModalVisible(false);
                  examForm.resetFields();
                  history.go(-1);
                }
                await VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
              });
              return;
            }
            await apiAuditAdd({
              // 审核接口
              ...value,
              factorMarkId: history.location.search.split('?')[1],
            }).then(async ({ data }) => {
              if (data.code === 200) {
                SyncCallApiMarkQueryFn?.(); // 详情接口 数据更新
                changeIsModalVisible(false);
                examForm.resetFields();
                history.go(-1);
              }
              await VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
            });
            return '';
          });
          //   changeIsModalVisible(false);
        }}
        onCancel={() => {
          changeIsModalVisible(false);
          examForm.resetFields();
        }}
      >
        <Form form={examForm} size='middle'>
          <Form.Item
            name={culOrder() ? 'auditState' : 'auditResult'}
            label='审核意见'
            rules={[{ required: true, message: '审核意见不能为空' }]}
          >
            <Radio.Group>
              <Radio value='1'>审核通过</Radio>
              <Radio value='2'>审核不通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='审核说明'
            name={culOrder() ? 'auditRemark' : 'auditContent'}
          >
            <Input.TextArea placeholder='请输入审核说明' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Examine;
