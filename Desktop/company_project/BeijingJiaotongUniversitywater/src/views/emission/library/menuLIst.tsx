/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState, useMemo } from 'react';
import { IconFont } from '@components/IconFont';
import { Form, Input, message, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import SearchForm, { SearchFormItem } from '@views/components/SearchForm';
import style from './index.module.scss';
import { Button } from '@/components/Button';
import { Table } from '@/components/AutoHeightTable';
import { useDictListColumn } from './utils/columns';

import { dictParams, SearchParams } from './utils';
import { createSysDict, sysDict, sysDictUpdate } from '@/api/industry';
import { clearObject } from '@/utils';
import { SysDictData, SysDictDataResult } from '@/api/industry/index-type';

const Dict: FC = () => {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [dicts, setDicts] = useState<SysDictData>();
  const [form] = Form.useForm<SysDictDataResult>();
  const [modalOkLoading, setModalOkLoading] = useState(false);
  const [modalFormVal, setModalFormVal] =
    useState<Partial<SysDictDataResult>>();
  const getDicts = async (s?: SearchParams) => {
    const searchVal = s || searchParams;
    console.log(searchVal);
    await sysDict().then(({ data }) => {
      const d = data?.data;
      setDicts(d);
    });
  };
  const successFn = () => {
    setModalFormVal(undefined);
    getDicts();
  };
  const updateDict = async (dict: SysDictDataResult) => {
    await sysDictUpdate(dict).then(({ data }) => {
      if (data?.id) {
        message.success('数据更新成功');
        successFn();
      }
    });
  };
  const columns = useDictListColumn<SysDictDataResult>({
    onEdit: record => {
      form.setFieldsValue({
        ...record,
      });
      setModalFormVal({ ...record });
    },
    updateStatus: record => updateDict(record),
    history,
  });

  const createDictFields = dictParams;
  const closeCreateDictModal = () => {
    setModalFormVal(undefined);
  };
  const formList = useMemo<SearchFormItem[]>(
    () => [
      {
        name: 'dict_data_name',
        label: '枚举值',
        type: 'Input',
        placeholder: '请填写枚举值',
        rules: [
          {
            type: 'string',
            max: 50,
            message: '枚举值不能超过50个字符',
          },
        ],
      },
      {
        name: 'dict_data_value',
        label: '枚举值标识',
        type: 'Input',
        placeholder: '请填写枚举值标识',
        rules: [
          {
            type: 'string',
            max: 50,
            message: '枚举值标识不能超过50个字符',
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '标识符只能为大小写字母、数字和下划线',
          },
        ],
      },
      {
        name: 'dict_data_value',
        label: '所属分类',
        type: 'Select',
        placeholder: '请填写所属分类',
        searchOptionData: [
          {
            label: '1',
            value: '1',
          },
        ],
        rules: [
          {
            type: 'string',
            max: 50,
            message: '所属分类不能超过50个字符',
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '标识符只能为大小写字母、数字和下划线',
          },
        ],
      },
    ],
    [],
  );
  const onSearch = (params: SearchParams) => {
    console.log(params, 'paramsparams');
    setSearchParams(params);
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDicts();
  }, []);

  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      <div className={style.header}>
        <SearchForm
          formList={formList}
          onSearch={onSearch}
          onClick={() => {}}
        />
      </div>
      <div className={style.tableWrapper}>
        <Button
          className={style.addDict}
          type='link'
          icon={<IconFont type='icon-icon-tianjia' />}
          onClick={() => {
            const fieldsValues = form.getFieldsValue();
            clearObject(fieldsValues);
            form.setFieldsValue(fieldsValues);
            setModalFormVal({});
          }}
        >
          新增枚举值
        </Button>
        <Table
          columns={columns}
          dataSource={[
            {
              id: 'number',
              dict_data_name: 'string',
              dict_data_value: 'string',
              apply_product: 'string',
              is_forbid: true,
            },
          ]}
          className={style.table}
          pagination={{
            pageSize: 10,
            total: dicts?.count || 0,
            current: 1,
          }}
        />
      </div>
      <Modal
        title='新增枚举值'
        visible={!!modalFormVal}
        onCancel={() => closeCreateDictModal()}
        maskClosable={false}
        width={400}
        className={style.dictModal}
        onOk={async () => {
          setModalOkLoading(true);

          await form
            .validateFields()
            .then(fields => {
              // edit
              if (modalFormVal?.id) {
                return updateDict({ ...modalFormVal, ...fields });
              }
              // create;
              return createSysDict({ ...modalFormVal, ...fields }).then(
                ({ data }) => {
                  if (data?.id) {
                    message.success('创建成功');
                    successFn();
                  }
                },
              );
            })
            .finally(() => {
              setModalOkLoading(false);
            });
        }}
        okButtonProps={{
          loading: modalOkLoading,
        }}
      >
        <Form form={form}>
          {createDictFields.map(item => (
            <Form.Item {...item}>
              <Input placeholder='请输入' />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default Dict;
