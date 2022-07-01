import { TransitionGroup } from 'react-transition-group';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ReactNode, memo } from 'react';
import { connect } from 'react-redux';

import { IconFont } from '@components/IconFont';
import { setTrans, TransAssistantState } from '@store/module/transAssistant';
import { IStoreState } from '@/store/types';

interface TransitionMainProps {
  children: ReactNode;
  isShow: boolean;
  setTransFn: (setTrans: TransAssistantState) => void;
}
const AddProductHelper = [
  {
    type: '可研报告',
    content: '通常是封面项目名称，如：《万州杨家村40MW风电场工程项目》',
  },
  {
    type: '环评批复名称',
    content:
      '红头文件，发文字号下的整段标题，如：《重庆市生态环境局关于万州杨家村40MW风电场工程项目环境影响报告表的批复》',
  },
  {
    type: '环评批复发文字号',
    content: '红头文件下的文字与数字描述，如：渝环发[2022]272号',
  },
  {
    type: '环评报告名称',
    content:
      '通常是封面页项目名称+环境影响报告表，如：《重庆市生态环境局关于万州杨家村40MW风电场工程项目环境影响报告表》',
  },
  {
    type: '核准批复文件名称',
    content:
      '红头文件，发文字号下的整段标题，如：《重庆市发展和改革委员会关于万州杨家村40MW风电场工程项目核准的批复》',
  },
  {
    type: '核准批复发文字号',
    content: '红头文件下的文字与数字描述，如：渝发改新能源[2022]134号',
  },
  {
    type: '并网文件（协议）名称',
    content:
      '通常是并网文件首页中《电网公司+项目公司+并网调度协议》，如：《重庆市电力公司与阿城风电有限公司并网调度协议》',
  },
];
function TransitionMain({ children, isShow, setTransFn }: TransitionMainProps) {
  const history = useHistory();
  const url_60: string[] = [
    '/business-infor/detail',
    '/business-infor/list/detail',
    '/mession-reduction/exam/detail',
    '/mession-reduction/exam/mession-monitor',
    '/business-infor/list/exam',
    '/auth/role/add',
    '/auth/user/add',
    '/auth/org/add',
    '/auth/config/edit',
    '/mession-reduction/monitor/detail',
    '/auth/config/edit',
    '/auth/user/detail',
    '/auth/org/detail',
    '/auth/role/edit',
    '/auth/role/editRole',
    '/mession-monitor/info/detail',
    '/mession-monitor/info/add',
    '/mession-reduction/info/add',
    '/mession-reduction/info/edit',
    '/mession-reduction/info/detail',
    '/mession-reduction/exam/examine-info',
    '/mession-reduction/exam/exam-detail',
    '/mession-reduction/exam/monitor-detail',
  ];
  const url_not_layout__route: string[] = ['/dashborad/intro'];
  return (
    <Route
      render={({ location }) => (
        <div style={isShow ? { display: 'flex' } : {}}>
          <TransitionGroup
            className={
              url_not_layout__route.some(
                item => history.location.pathname.indexOf(item) >= 0,
              )
                ? ''
                : 'layout__route'
            }
            style={{
              marginBottom:
                url_60.filter(
                  (item: string) => item === history.location.pathname,
                ).length > 0
                  ? '60px'
                  : '',
            }}
          >
            {/* <CSSTransition
            key={location.pathname}
            classNames='layout__route'
            timeout={0}
          > */}
            <Switch location={location}>{children as any}</Switch>
            {/* </CSSTransition> */}
          </TransitionGroup>
          {isShow && (
            <div className='assistant_block' style={{ width: '20%' }}>
              <div className='assistant_title'>
                <span className='assistant_title_color' onClick={() => {}}>
                  {' '}
                  <IconFont
                    type='icon-icon-chenxiechushou'
                    style={{ marginRight: '10px' }}
                  />
                  填写助手
                </span>
                <IconFont
                  type='icon-icon-guanbi-2'
                  onClick={() => {
                    setTransFn({
                      isShow: false,
                    });
                  }}
                  style={{
                    display: 'inline-block',
                  }}
                />
              </div>

              {AddProductHelper.map(item => {
                return (
                  <div className='assistant_ul'>
                    <div className='title'>{item.type}</div>
                    <div className='content'>{item.content}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    />
  );
}

export default connect(
  ({ transReducer }: IStoreState) => {
    return { ...transReducer };
  },
  {
    setTransFn: setTrans,
  },
)(memo(TransitionMain));
