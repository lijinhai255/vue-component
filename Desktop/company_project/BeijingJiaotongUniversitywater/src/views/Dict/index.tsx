/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState } from 'react';
import { IconFont } from '@components/IconFont';
import { Form, Input, message, Modal, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import style from './index.module.scss';
import { Button } from '@/components/Button';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn } from './utils/columns';
import { Searcher } from '@/components/Searcher';
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
  const columns = useDictColumn<SysDictDataResult>({
    onEdit: record => {
      form.setFieldsValue({
        ...record,
      });
      setModalFormVal({ ...record });
    },
    updateStatus: record => updateDict(record),
    history,
  });

  const searchers: {
    key: keyof SearchParams;
    placeholder: string;
  }[] = dictParams.map(({ name, label }) => ({
    key: name,
    placeholder: label,
  }));
  const createDictFields = dictParams;
  const closeCreateDictModal = () => {
    setModalFormVal(undefined);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDicts();
  }, []);

  return (
    <div className={style.dictWrapper}>
      <div className={style.header}>
        {searchers.map(item => (
          <Searcher
            key={item.key}
            className={style.searcher}
            // onChange={ev => {
            //   setSearchParams({ ...searchParams, [item.key]: ev.target.value });
            // }}
            // value={searchParams?.[item.key]}
            placeholder={item.placeholder}
            onSearch={() => getDicts()}
          />
        ))}
        <Select
          className={style.searcher}
          placeholder='状态'
          // onChange={val => {
          //   const newSearchParams = { ...searchParams, status: val };
          //   setSearchParams(newSearchParams);
          //   getDicts(searchParams);
          // }}
          // value={searchParams.is_forbid}
          options={[
            { label: '启用', value: '1' },
            { label: '禁用', value: '2' },
          ]}
        />
        <Button
          onClick={async () => {
            await getDicts();
          }}
          type='primary'
          className={style.searchButton}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            clearObject(searchParams);
            setSearchParams({ ...searchParams });
          }}
          type='default'
        >
          重置
        </Button>
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
          新增数据字典
        </Button>
        <Table
          columns={columns}
          dataSource={dicts?.results}
          className={style.table}
          pagination={{
            pageSize: 10,
            total: dicts?.count || 0,
            current: 1,
          }}
        />
      </div>
      <Modal
        title='新增数据字典'
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
              <Input
                placeholder='请输入'
                disabled={
                  !!(item.name === 'dict_data_value' && modalFormVal?.id)
                }
              />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default Dict;
