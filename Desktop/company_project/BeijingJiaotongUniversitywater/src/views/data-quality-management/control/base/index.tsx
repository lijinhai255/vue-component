/**
 * @file 数据质量控制-列表页
 */

import { FC, useEffect, useState } from 'react';
import { Button, Radio, RadioChangeEvent, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import VerifyUtils from '@utils/verifty';
import style from '../index.module.less';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn } from '../utils/columns';
import { SysDictDataResult } from '@/api/industry/index-type';
import store from '@/store';
import { apiProcessPage } from '../../service';
import useSyncCallback from '@/utils/useSyncCallback';

type TabPosition = 'first' | 'second' | 'third' | 'four' | 'five';
const Dict: FC = () => {
  const history = useHistory();
  const [dataSource, getDataSource] = useState([]);
  const [page, getPage] = useState(1);
  const [size, changeSize] = useState(10);
  const [count, getCount] = useState(10);
  const { user } = store.getState();

  const [tabPosition, setTabPosition] = useState<TabPosition>('first');

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value);
  };

  // 获取列表数据
  const getLists = async () => {
    if (
      history.location.pathname.indexOf(
        '/data-quality-management/control/productionProcess',
      ) >= 0
    ) {
      const id = history.location.search.split('?')[1];
      console.log(history, 'history');
      await apiProcessPage({
        quality_control_id: id,
        page,
        page_size: size,
      }).then(({ data }) => {
        if (data.code === 200) {
          getDataSource(data.data.results);
          getCount(data.data.count);
          return;
        }
        VerifyUtils.Toast('error', data.msg);
      });
    }
  };
  const syncCallbackFn = useSyncCallback(getLists);
  // const formList = useMemo<SearchFormItem[]>(() => {
  //   // 数据质量控制
  //   if (
  //     history.location.pathname.indexOf('/data-quality-management/control') >= 0
  //   ) {
  //     return [
  //       {
  //         name: 'create_org_id',
  //         type: 'Select',
  //         class: '120px',
  //         placeholder: '所属组织',
  //         searchOptionData: mechanism,
  //       },
  //     ];
  //   }

  //   return [];
  // }, [form.getFieldsValue(true), mechanism]);

  // 列表操作事件
  const columns = useDictColumn<SysDictDataResult>({
    // onDelete: async (record: { id: number }): Promise<void> => {
    //   if (
    //     history.location.pathname.indexOf(
    //       '/data-quality-management/standard',
    //     ) >= 0
    //   ) {
    //     await apiStandardDelete({ id: record.id }).then(({ data }) => {
    //       syncCallbackFn();
    //       VerifyUtils.ToastText(data.code as PersonKeys, data.msg);
    //     });
    //     return;
    //   }
    // },
    history,
    orgType: user.orgType,
  });

  // const createDictFields = dictParams;
  // const onSearch = (
  //   params: SearchParams & {
  //     beginTime: [Moment, Moment] | null;
  //   },
  // ) => {
  //   setSearchParams({
  //     ...params,
  //   });
  //   getPage(1);
  //   syncCallbackFn();
  // };

  useEffect(() => {
    syncCallbackFn();
  }, []);
  const returnNavText = () => {
    if (
      history.location.pathname ===
      '/data-quality-management/control/productionProcess'
    ) {
      return '新增';
    }
    return '';
  };
  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      <h3 className={style.h3}>所属组织：北京水务分公司</h3>

      {
        <div className={style.header}>
          {/* <SearchForm
            formList={formList}
            onSearch={onSearch}
            onClick={() => {}}
          /> */}
          <Space>
            <Radio.Group value={tabPosition} onChange={changeTabPosition}>
              <Radio.Button value='first'>生产工艺</Radio.Button>
              <Radio.Button value='second'>核算边界</Radio.Button>
              <Radio.Button value='third'>排放设施</Radio.Button>
              <Radio.Button value='four'>数据确认方式</Radio.Button>
              <Radio.Button value='five'>质量管理规定</Radio.Button>
            </Radio.Group>
          </Space>

          <Button
            className={style.addDict}
            type='primary'
            onClick={() => {
              // 新增用户
              if (
                history.location.pathname.indexOf(
                  'data-quality-management/control/productionProcess',
                ) >= 0
              ) {
                return history.push(
                  `/data-quality-management/control/process/add?${
                    history.location.search.split('?')[1]
                  }`,
                );
              }
              return null;
            }}
          >
            {returnNavText()}
          </Button>
        </div>
      }
      <div>
        {tabPosition === 'first' || tabPosition === 'third' ? (
          <div className={style.tableWrapper}>
            <Table
              columns={columns}
              scroll={{ x: 1000 }}
              dataSource={dataSource}
              className={style.table}
              rowKey={record => record.id}
              pagination={
                ['/mession-reduction/assessment'].indexOf(
                  history.location.pathname,
                ) >= 0
                  ? false
                  : {
                      showSizeChanger: true,
                      pageSize: size,
                      total: count,
                      current: page,
                      onChange: (pageNum, pageSize) => {
                        getPage(pageNum);
                        changeSize(pageSize);
                        syncCallbackFn();
                      },
                    }
              }
            />
          </div>
        ) : tabPosition === 'second' ? (
          <div>2</div>
        ) : tabPosition === 'four' ? (
          <div>4</div>
        ) : tabPosition === 'five' ? (
          <div>5</div>
        ) : null}
      </div>
    </div>
  );
};

export default Dict;
