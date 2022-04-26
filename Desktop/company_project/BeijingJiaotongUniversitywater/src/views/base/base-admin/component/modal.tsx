/* eslint-disable react-hooks/rules-of-hooks */
/**
 * visible 控制弹窗显隐
 * selectKeys 表格中已经选中的弹窗
 * onCancel 弹窗取消的方法
 * onConfime 弹窗确认时的方法
 */
import { FC, useEffect, useMemo, useState } from 'react';
import { Modal, Table } from 'antd';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import { ColumnsType } from 'antd/lib/table';
import {
  apigetGoods,
  apiGetAllCompanys,
  CurrentType,
} from '@views/base/service';
import { apiMnumListALLByDictTypeBatch } from '@/views/emission/service';
import { SearchParams } from '../utils';
import { industryObj } from '@/views/base/base-admin/utils/columns';
import useSyncCallback from '@/utils/useSyncCallback';
export type SexObjType = {
  0?: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7?: string;
  8?: string;
  9?: string;
  10?: string;
  11?: string;
  12?: string;
};
export const modelObj: SexObjType = {
  0: '按时间计费',
  1: '按次计费',
};
interface EmissionModelProps {
  visible: boolean;
  selectKeys?: React.Key[];
  seleckRows?: CurrentType[];
  onCancel: () => void;
  onConfime: (value: React.Key[]) => void;
  currentLabel?: string; // business表示行业标签 labelFactor 因子标签
  onConfimeRow?: (value: CurrentType[]) => void;
}

const EmissionModel: FC<EmissionModelProps> = ({
  visible,
  selectKeys,
  seleckRows,
  onCancel,
  onConfime,
  currentLabel,
  onConfimeRow,
}) => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(10);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [currentRow, changeCurrentRow] = useState<CurrentType[]>([]);
  const [selectedResourceRowKeys, setSelectedResourceRowKeys] = useState<
    React.Key[]
  >([]);

  const [menList, getMenuList] = useState([]);
  const [BranchList, getBranchList] = useState<{
    goods_type?: {
      // 因子标签
      dictLabel: string;
      dictSort?: string;
      dictType?: string;
      sourceName: string;
      id: string;
      sourceType?: string;
      dictValue?: string;
    }[];
    goods_attribute?: {
      // 行业标签
      dictLabel: string;
      dictSort?: string;
      dictType?: string;
      sourceName: string;
      id: string;
      sourceType?: string;
      dictValue?: string;
    }[];
  }>({});
  // 分类列表

  // 枚举值
  const apiQsueryListBylablehFn = async () => {
    if (currentLabel === 'organization') {
      await apiGetAllCompanys({
        ...searchParams,
        page: pageNum,
        size: 10000000,
      }).then(({ data }) => {
        if (data.data?.rows) {
          getMenuList([...data.data.rows]);
          setPageCount(data.data.total);
          setPageNum(1);
        } else {
          getMenuList([]);
          setPageCount(0);
          setPageNum(1);
        }
      });
      return;
    }
    await apigetGoods({
      ...searchParams,
      status: `0`,
      page: pageNum,
      size: 10000000,
    }).then(({ data }) => {
      if (data.data?.rows) {
        getMenuList([...data.data.rows]);
        setPageCount(data.data.total);
        setPageNum(1);
      } else {
        getMenuList([]);
        setPageCount(0);
        setPageNum(1);
      }
    });
  };
  // 获取需要的枚举值 行业 数据类型 发布国家组织 来源类别 状态
  const apiMnumListALLByDictTypeBatchFn = async () => {
    await apiMnumListALLByDictTypeBatch({
      dictTypes: `goods_type,goods_attribute`,
    }).then(({ data }) => {
      getBranchList({ ...data.data });
    });
  };
  const useSyncCallbackFn = useSyncCallback(apiQsueryListBylablehFn);
  useEffect(() => {
    apiMnumListALLByDictTypeBatchFn();
    useSyncCallbackFn();
    if (selectKeys && seleckRows) {
      setSelectedResourceRowKeys([...selectKeys]);
      changeCurrentRow([...seleckRows]);
    }
    return () => {
      console.log('zujianxiaoshui');
      getMenuList([]);
      setSelectedResourceRowKeys([]);
      changeCurrentRow([]);
    };
  }, [selectKeys, currentLabel, visible]);
  const columns: ColumnsType<CurrentType> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
      ellipsis: true,
    },
    {
      title: '商品编码',
      dataIndex: 'goodsId',
      ellipsis: true,
      key: 'goodsId',
    },
    {
      title: '商品属性',
      dataIndex: 'goodsAttribute',
      key: 'goodsAttribute',
      ellipsis: true,
      render: (t: string) => {
        const arr = BranchList.goods_type?.filter(item => {
          if (item?.dictValue && `${item?.dictValue}` === `${t}`) {
            return item;
          }
        });
        if (arr && arr?.length > 0) {
          return arr[0].dictLabel;
        }
      },
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      key: 'type',
      render: (t: string) => {
        const arr = BranchList.goods_type?.filter(item => {
          if (item?.dictValue && `${item?.dictValue}` === `${t}`) {
            return item;
          }
        });
        if (arr && arr?.length > 0) {
          return arr[0].dictLabel;
        }
      },
    },
    {
      title: '计费模式',
      dataIndex: 'mode',
      key: 'mode',
      ellipsis: true,
      render: (t: keyof SexObjType) => {
        return modelObj[t];
      },
    },
    {
      title: '商品定价',
      dataIndex: 'goodsPrices',
      key: 'goodsPrices',
      ellipsis: true,
    },
    {
      title: '产品列表',
      dataIndex: 'goodsProducts',
      key: 'goodsProducts',
      ellipsis: true,
    },
  ];
  const newColums: ColumnsType<CurrentType> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: '组织名称',
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
    },
    {
      title: '组织编号',
      dataIndex: 'companyId',
      key: 'companyId',
      ellipsis: true,
    },
    {
      title: '负责人账号',
      dataIndex: 'masterName',
      key: 'masterName',
      ellipsis: true,
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
      render: (t: keyof SexObjType) => {
        return industryObj[t];
      },
    },
    {
      title: '联系人姓名',
      dataIndex: 'linkmanName',
      key: 'linkmanName',
    },
    {
      title: '联系人手机号',
      dataIndex: 'linkmanPhone',
      key: 'linkmanPhone',
    },
  ];
  const formList = useMemo<SearchFormItem[]>(() => {
    if (currentLabel === 'organization') {
      return [
        {
          name: 'companyName',
          placeholder: '组织名称',
          label: '组织名称',
          type: 'Input',
        },
        {
          name: 'companyNum',
          placeholder: '组织编号',
          label: '组织编号',
          type: 'Input',
        },
        {
          name: 'masterName',
          placeholder: '负责人账号',
          label: '负责人账号',
          type: 'Input',
        },
      ];
    }
    return [
      {
        name: 'goodsName',
        placeholder: '商品名称',
        label: '商品名称',
        type: 'Input',
      },
      {
        name: 'goodsId',
        placeholder: '商品编码',
        label: '商品编码',
      },
    ];
  }, [BranchList]);
  const onSearch = (params: SearchParams) => {
    setSearchParams(params);
    useSyncCallbackFn();
  };
  const culColumns = () => {
    if (currentLabel === 'organization') {
      return newColums;
    }
    return columns;
  };
  const filterMultipleFn = () => {
    if (currentLabel === 'organization') {
      return true;
    }
    return false;
  };
  return (
    <Modal
      title={currentLabel === 'organization' ? '选择组织' : '选择商品'}
      visible={visible}
      onOk={() => {
        if (currentLabel === 'source' && onConfimeRow) {
          onConfimeRow(currentRow);
          return;
        }
        onConfimeRow && onConfimeRow(currentRow);
        onConfime([...selectedResourceRowKeys]);
      }}
      onCancel={() => onCancel()}
      width={1000}
    >
      <SearchForm
        visible={visible}
        formList={formList}
        onSearch={onSearch}
        onClick={() => {}}
      />
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
                  console.log(pageNum, 'pageNum=pageNum');
                  setPageNum(pageNum);
                  // useSyncCallbackFn();
                },
              }}
              rowKey={item => `${item.companyNum}`}
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
              rowKey={item =>
                `${item.goodsId ? item.goodsId : item.companyNum}`
              }
              rowSelection={{
                selectedRowKeys: selectedResourceRowKeys,
                onChange: (selectedRowKeys: React.Key[], selectedRows) => {
                  changeCurrentRow([...selectedRows]);
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
