/* eslint-disable react-hooks/rules-of-hooks */
/**
 * visible 控制弹窗显隐
 * selectKeys 表格中已经选中的弹窗
 * onCancel 弹窗取消的方法
 * onConfime 弹窗确认时的方法
 */
import { FC, useEffect, useMemo, useState, createRef } from 'react';
import { Modal, Table } from 'antd';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { ColumnsType } from 'antd/lib/table';
import {
  apiListALLByDictTypeBatch,
  apiQsueryListBylableh,
  apiSourceList2,
} from '@/views/data-quality-management/service-old';
import { SearchParams } from '../utils';
import useSyncCallback from '@/utils/useSyncCallback';
import { RcFile } from 'antd/lib/upload/interface';

interface EmissionModelProps {
  visible: boolean;
  selectKeys?: React.Key[];
  onCancel: () => void;
  onConfime: (value: React.Key[]) => void;
  currentLabel?: string; // business表示行业标签 labelFactor 因子标签
  onConfimeRow?: (
    value: {
      id: string;
      sourceType?: string | number | undefined;
      sourceName?: string | undefined;
      dictValue?: string | undefined;
      dictLabel?: string | undefined;
      sourceFileList?: {
        uid: string;
        name: string;
        status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
        url?: string;
        originFileObj?: RcFile;
      }[];
    }[],
  ) => void;
  ref?: any;
}

const EmissionModel: FC<EmissionModelProps> = ({
  visible,
  selectKeys,
  onCancel,
  onConfime,
  currentLabel,
  onConfimeRow,
}) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(10);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [currentRow, changeCurrentRow] = useState<
    {
      id: string;
      sourceType?: string | number | undefined;
      sourceName?: string | undefined;
      dictValue?: string | undefined;
      dictLabel?: string | undefined;
      sourceFileList?:
        | {
            uid: string;
            name: string;
            status?: 'done' | 'error' | 'success' | 'uploading' | 'removed';
            url?: string;
            originFileObj?: RcFile;
          }[];
    }[]
  >([]);
  const [selectedResourceRowKeys, setSelectedResourceRowKeys] = useState<
    React.Key[]
  >([]);
  const [menList, getMenuList] = useState([]);
  const [BranchList, getBranchList] = useState<{
    factorLabel?: {
      // 因子标签
      dictLabel: string;
      dictSort?: string;
      dictType?: string;
      sourceName: string;
      id: string;
      sourceType?: string;
    }[];
    business?: {
      // 行业标签
      dictLabel: string;
      dictSort?: string;
      dictType?: string;
      sourceName: string;
      id: string;
      sourceType?: string;
    }[];
  }>({});
  // 分类列表

  const apiListALLByDictTypeBatchFn = async () => {
    await apiListALLByDictTypeBatch({
      dictTypes: currentLabel || 'factorLabel',
    }).then(({ data }) => {
      getBranchList({ ...data.data });
    });
  };
  // 枚举值
  const apiQsueryListBylablehFn = async () => {
    if (currentLabel === 'source') {
      await apiSourceList2({ ...searchParams, pageNum, pageSize }).then(
        ({ data }) => {
          if (data.code === 200) {
            getMenuList([...data?.rows]);
            setPageCount(data?.total);
          }
        },
      );
      return;
    }
    await apiQsueryListBylableh({
      dictType: currentLabel || 'factorLabel',
      ...searchParams,
      pageNum,
      pageSize,
    }).then(({ data }) => {
      if (data.code === 200) {
        getMenuList([...data.rows]);
        setPageCount(data.total);
      }
    });
  };
  const useSyncCallbackFn = useSyncCallback(apiQsueryListBylablehFn);
  const searchFromRef = createRef();
  useEffect(() => {
    apiListALLByDictTypeBatchFn();
    useSyncCallbackFn();
    if (selectKeys) {
      setSelectedResourceRowKeys([...selectKeys]);
    }
    return () => {
      console.log('zujianxiaoshui');
      getMenuList([]);
      setSelectedResourceRowKeys([]);
    };
  }, [selectKeys, currentLabel, visible]);
  // console.log(setPageCount, setPageNum, 'setPageCount=setPageCount');
  const columns: ColumnsType<{
    id: string;
    sourceType?: string | number;
    sourceName?: string;
    dictValue?: string;
    dictLabel?: string;
  }> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (t: string, _, index) => index + 1,
    },
    {
      title: currentLabel === 'business' ? '行业' : '标签名称',
      dataIndex: 'dictLabel',
      key: 'dictLabel',
    },
    {
      title: currentLabel === 'business' ? '行业门类' : '标签分类',
      dataIndex: 'sourceName',
      key: 'sourceName',
    },
  ];
  const newColums: ColumnsType<{
    id: string;
    sourceType?: string | number;
    sourceName?: string;
    dictValue?: string;
    dictLabel?: string;
  }> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (t: string, _, index) => index + 1,
    },
    {
      title: '发布机构（全称）',
      dataIndex: 'institution',
      key: 'institution',
    },
    {
      title: '发布结构（简称）',
      dataIndex: 'institutionShort',
      key: 'institutionShort',
    },
    {
      title: '源文件名称',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '来源类别',
      dataIndex: 'sourceLevellable',
      key: 'sourceLevellable',
    },
    {
      title: '发布年份',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '发布国家/组织',
      dataIndex: 'countriesLable',
      key: 'countriesLable',
    },
    {
      title: '发布地区',
      dataIndex: 'areaLable',
      key: 'areaLable',
    },
  ];
  const formList = useMemo<SearchFormItem[]>(() => {
    if (currentLabel === 'business') {
      return [
        {
          name: 'dictLabel',
          placeholder: '行业',
          label: '行业',
          type: 'Input',
        },
        {
          name: 'dictValue',
          placeholder: '行业门类',
          label: '行业门类',
          type: 'Select',
          searchOptionData: BranchList.business,
        },
      ];
    }
    if (currentLabel === 'factorLabel') {
      return [
        {
          name: 'dictLabel',
          placeholder: '标签名称',
          label: '标签名称',
          type: 'Input',
        },
        {
          name: 'dictValue',
          placeholder: '标签分类',
          label: '标签分类',
          type: 'Select',
          searchOptionData: BranchList.factorLabel,
        },
      ];
    }
    if (currentLabel === 'source') {
      return [
        {
          name: 'institution',
          placeholder: '发布机构',
          label: '发布机构',
          type: 'Input',
        },
        {
          name: 'source',
          placeholder: '源文件名称',
          label: '源文件名称',
          type: 'Input',
        },
      ];
    }
    return [
      {
        name: 'dictLabel',
        placeholder: '标签名称',
        label: '标签名称',
        type: 'Input',
      },
      {
        name: 'dictValue',
        placeholder: '标签分类',
        label: '标签分类',
        type: 'Select',
        searchOptionData: BranchList.factorLabel,
      },
    ];
  }, [BranchList]);
  const onSearch = (params: SearchParams) => {
    setSearchParams(params);
    useSyncCallbackFn();
  };
  const culColumns = () => {
    if (currentLabel === 'source') {
      return newColums;
    }
    return columns;
  };
  const filterMultipleFn = () => {
    if (currentLabel === 'source') {
      return true;
    }
    return false;
  };
  return (
    <Modal
      title={
        currentLabel === 'business'
          ? '选择行业'
          : currentLabel === 'source'
          ? '选择来源'
          : '选择标签'
      }
      visible={visible}
      onOk={() => {
        if (currentLabel === 'source' && onConfimeRow) {
          onConfimeRow(currentRow);
          return;
        }
        onConfime([...selectedResourceRowKeys]);
      }}
      onCancel={() => {
        onCancel();
        // console.log(searchFromRef, 'searchFromRef=searchFromRef', onCancel);
      }}
      width={1000}
    >
      {visible ? (
        <SearchForm
          ref={searchFromRef}
          visible={visible}
          formList={formList}
          onSearch={onSearch}
          onClick={() => {}}
        />
      ) : (
        ''
      )}
      {filterMultipleFn()
        ? visible &&
          menList.length > 0 && (
            <Table
              columns={culColumns()}
              dataSource={menList}
              pagination={{
                pageSize,
                total: pageCount,
                current: pageNum,
                onChange: pageNum => {
                  setPageNum(pageNum);
                  // useSyncCallbackFn();
                },
              }}
              rowKey={item => `${item.id}`}
              rowSelection={{
                selectedRowKeys: selectedResourceRowKeys,
                onChange: (selectedRowKeys: React.Key[], selectedRows) => {
                  setSelectedResourceRowKeys([...selectedRowKeys]);
                  changeCurrentRow([...selectedRows]);
                },
                type: 'radio',
              }}
            />
          )
        : visible &&
          menList.length > 0 && (
            <Table
              columns={culColumns()}
              dataSource={menList}
              pagination={{
                pageSize,
                total: pageCount,
                current: pageNum,
                onChange: pageNum => {
                  setPageNum(pageNum);
                  // useSyncCallbackFn();
                },
              }}
              rowKey={item => `${item.dictValue ? item.dictValue : 0}`}
              rowSelection={{
                selectedRowKeys: selectedResourceRowKeys,
                onChange: (selectedRowKeys: React.Key[]) => {
                  setSelectedResourceRowKeys([...selectedRowKeys]);
                },
                type: 'checkbox',
              }}
            />
          )}
    </Modal>
  );
};

export default EmissionModel;
