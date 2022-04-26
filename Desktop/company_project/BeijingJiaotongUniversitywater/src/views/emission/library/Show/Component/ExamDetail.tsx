import { FC } from 'react';
import style from '../../index.module.scss';
import { ExamData, ExamData2 } from '../type/index';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

import { examColumns, examColumns2 } from '../returnArr/returnArr';
interface ExamDetailInterFace {
  examData: ExamData[];
  examData2: ExamData2[];
}
const ExamDetail: FC<ExamDetailInterFace> = ({ examData, examData2 }) => {
  const history = useHistory();

  return history.location.pathname.indexOf('detail') >= 0 ? (
    <>
      <div className={style.title}>
        <h3>审核信息</h3>
      </div>
      <div className={style.content}>
        <Table columns={examColumns} dataSource={examData} pagination={false} />
      </div>
      {history.location.pathname.indexOf('monitor') === -1 ? (
        <>
          {' '}
          <div className={style.title} style={{ marginTop: '22px' }}>
            <h3>抄送信息</h3>
          </div>
          <div className={style.content}>
            <Table
              columns={examColumns2}
              dataSource={examData2}
              pagination={false}
            />
          </div>
        </>
      ) : (
        ''
      )}
    </>
  ) : (
    <></>
  );
};

export default ExamDetail;
