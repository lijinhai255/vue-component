import { Input, Radio, Modal, Form, FormInstance } from 'antd';
import { FC } from 'react';
interface ExamModelType {
  isModalVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  examForm: FormInstance<any>;
}
const ExamModel: FC<ExamModelType> = ({
  isModalVisible,
  onOk,
  onCancel,
  examForm,
}) => {
  return (
    <Modal
      title='审核'
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={examForm} size='middle'>
        <Form.Item
          name={'auditPass'}
          label='审核意见'
          rules={[{ required: true, message: '审核意见不能为空' }]}
        >
          <Radio.Group>
            <Radio value='1'>审核通过</Radio>
            <Radio value='0'>审核不通过</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='审核说明' name={'auditContent'}>
          <Input.TextArea placeholder='请输入审核说明' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExamModel;
