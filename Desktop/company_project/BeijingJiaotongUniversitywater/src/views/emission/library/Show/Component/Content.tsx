import { FC, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormInstance } from 'antd/es/form/Form';
import { Button } from 'antd';
import style from '../../index.module.scss';
import { Form } from 'antd';
import { ItemType } from '../type/index';
import { IStoreState } from '@/store/types';
import { setTrans, TransAssistantState } from '@store/module/transAssistant';
interface ContentType {
  renderLeftItem: (LeftItem: ItemType[], className?: string) => JSX.Element;
  metionItemFn: ItemType[];
  culRenderLeftItem: () => JSX.Element;
  form: FormInstance;
  companyItemFn: ItemType[];
  sourceItemFn: ItemType[];
  setTransFn: (setTrans: TransAssistantState) => void;
  isShow: boolean;
}
const Content: FC<ContentType> = ({
  renderLeftItem,
  metionItemFn,
  culRenderLeftItem,
  form,
  companyItemFn,
  sourceItemFn,
  setTransFn,
  isShow,
}) => {
  const history = useHistory();
  const returnContent = () => {
    if (history.location.pathname.indexOf('monitor') >= 0) {
      return (
        <div className={style.left_content}>
          {/* <div className={style.title}>
            <h2>项目基础数据</h2>
          </div>
          <div className={style.content}>
            <Form form={form} size='middle'>
              {renderLeftItem(companyItemFn)}
            </Form>
          </div> */}
          <div className={style.title}>
            <h2>项目数据</h2>
          </div>
          <div className={style.content}>
            <Form form={form} layout='vertical' size='middle'>
              {renderLeftItem(metionItemFn, 'fore')}
            </Form>
          </div>
          {/* <ExamDetail examData={examData}></ExamDetail> */}
        </div>
      );
    }
    return (
      <>
        {' '}
        <div className={style.left_content}>
          <div className={style.content}>
            <div className={style.title}>
              <h2>项目基础数据</h2>
              <Button
                type='link'
                onClick={() => {
                  setTransFn({
                    isShow: !isShow,
                  });
                }}
              >
                填写助手
              </Button>
            </div>
            <div className={style.content}>
              <Form form={form} size='middle'>
                {renderLeftItem(companyItemFn)}
              </Form>
            </div>
          </div>
        </div>
        <div className={style.left_content}>
          <div className={style.title}>
            <h2>项目数据</h2>
          </div>
          <div className={style.content}>
            <Form form={form} layout='vertical' size='middle'>
              {/* 根据 能源类型 和项目类型 来进行判断 */}
              {culRenderLeftItem()}
            </Form>
          </div>
        </div>
        <div className={style.right_content}>
          <div className={style.title} style={{ display: 'block' }}>
            <h2>附件上传</h2>
            <p style={{ marginTop: '10px', color: '#b2a8a8' }}>
              仅支持PDF、JPG、PNG格式的文件，最大10M
            </p>
          </div>
          <div className={style.content}>
            <Form form={form} layout='vertical' size='middle'>
              {/* {renderLeftItem(sourceItemFn, 'noGrid')} */}
              {renderLeftItem(sourceItemFn, 'upload')}
            </Form>
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    return () => {
      setTransFn({
        isShow: false,
      });
    };
  }, []);
  return returnContent();
};

export default connect(
  ({ transReducer }: IStoreState) => {
    return { ...transReducer };
  },
  {
    setTransFn: setTrans,
  },
)(memo(Content));
