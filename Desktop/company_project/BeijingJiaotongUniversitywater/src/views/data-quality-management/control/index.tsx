/**
 * @file 数据质量管理列表页
 */

import { FC, useEffect, useState, useMemo } from 'react';
import { Form, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { Moment } from 'moment';
import VerifyUtils from '@utils/verifty';
import style from '../index.module.less';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn } from '../utils/columns';
import { SearchParams } from '../utils';
import { SysDictDataResult } from '@/api/industry/index-type';
import store from '@/store';
import { apiOrganizationPage, apiQualityControlPage } from '../service';
import useSyncCallback from '@/utils/useSyncCallback';

const Dict: FC = () => {
  interface GoodsProps {
    goodsId?: string;
    goodsName?: string;
    status?: string;
  }
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<SearchParams & GoodsProps>(
    {},
  );
  const [form] = Form.useForm<SysDictDataResult>();
  const [dataSource, getDataSource] = useState([]);
  const [mechanism, setmechanism] = useState<any>([]);
  const [page, getPage] = useState(1);
  const [size, changeSize] = useState(10);
  const [count, getCount] = useState(10);
  const { user } = store.getState();

  // 获取列表数据
  const getLists = async () => {
    if (
      history.location.pathname.indexOf('/data-quality-management/control') >= 0
    ) {
      console.log(searchParams, 'searchParams');
      await apiQualityControlPage({
        ...searchParams,
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
  const formList = useMemo<SearchFormItem[]>(() => {
    // 数据质量控制
    if (
      history.location.pathname.indexOf('/data-quality-management/control') >= 0
    ) {
      return [
        {
          name: 'create_org_id',
          type: 'Select',
          class: '120px',
          placeholder: '所属组织',
          searchOptionData: mechanism,
        },
      ];
    }

    return [];
  }, [form.getFieldsValue(true), mechanism]);

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
  const onSearch = (
    params: SearchParams & {
      beginTime: [Moment, Moment] | null;
    },
  ) => {
    setSearchParams({
      ...params,
    });
    getPage(1);
    syncCallbackFn();
  };
  // 获取所属组织
  const apiOrgTreeFn = async () => {
    await apiOrganizationPage({
      page: 1,
      page_size: 100,
    }).then(({ data }) => {
      console.log(data, 'data=data');
      if (data.code !== 200) VerifyUtils.Toast('info', data.msg);
      if (data?.data) {
        data.data.results.forEach((item: any) => {
          item.label = item.name;
          item.value = item.id;
        });
        setmechanism(data.data.results);
      } else {
        setmechanism([]);
      }
    });
  };
  useEffect(() => {
    if (
      history.location.pathname.indexOf('/data-quality-management/control') >= 0
    ) {
      apiOrgTreeFn();
    }
  }, []);

  useEffect(() => {
    syncCallbackFn();
  }, []);
  const returnNavText = () => {
    if (history.location.pathname === '/auth/role') {
      return '新增';
    }
    return '';
  };
  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      {!(
        ['/basic-admin/nav', '/mession-reduction/assessment'].indexOf(
          history.location.pathname,
        ) >= 0
      ) && (
        <div className={style.header}>
          <SearchForm
            formList={formList}
            onSearch={onSearch}
            onClick={() => {}}
          />

          <Button
            className={style.addDict}
            type='primary'
            style={{ marginBottom: '20px' }}
            onClick={() => {
              // 新增用户
              if (history.location.pathname.indexOf('/auth/role') >= 0) {
                return history.push(`/auth/role/add`);
              }
              return null;
            }}
          >
            {returnNavText()}
          </Button>
        </div>
      )}
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
    </div>
  );
};

export default Dict;
