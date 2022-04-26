import { FC } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
interface FooterType {
  examineFn?: () => void;
  dragFn?: () => void;
  saveData?: () => void;
}

const Footer: FC<FooterType> = ({ examineFn, dragFn, saveData }) => {
  const history = useHistory();
  return ['detail'].some(
    item => history.location.pathname.indexOf(item) >= 0,
  ) ? (
    <div
      className='Drawer-Btn-bottom'
      style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #efefef',
      }}
    >
      <Button
        onClick={() => {
          history.go(-1);
        }}
      >
        返回
      </Button>
    </div>
  ) : ['examine', 'exam'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    ) ? (
    <div
      className='Drawer-Btn-bottom'
      style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #efefef',
      }}
    >
      <Button
        type='primary'
        onClick={() => {
          // changeIsModalVisible(true);
          if (examineFn) {
            examineFn();
          }
        }}
      >
        审核
      </Button>
    </div>
  ) : (
    <div
      className='Drawer-Btn-bottom'
      style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #efefef',
      }}
    >
      <Button
        onClick={async () => {
          dragFn && (await dragFn());
        }}
      >
        保存草稿
      </Button>
      <Button
        className='marginLeft20'
        type='primary'
        onClick={async () => {
          saveData && (await saveData());
        }}
      >
        提交送审
      </Button>
    </div>
  );
};

export default Footer;
