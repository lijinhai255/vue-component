/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState } from 'react';
import { IconFont } from '@components/IconFont';
import { Form, Input, Modal, Select } from 'antd';
import style from './index.module.scss';
import { Button } from '@/components/Button';
import { Table } from '@/components/AutoHeightTable';
import { useDictColumn, dictParams, SearchParams } from '../utils';
import { Searcher } from '@/components/Searcher';
import { sysDictItem } from '@/api/industry';
import { clearObject } from '@/utils';

const EmissionSourceDict: FC = () => {
  const columns = useDictColumn();

  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const getDicts = async (s?: SearchParams) => {
    const searchVal = s || searchParams;
    console.log(searchVal);
    await sysDictItem().then(({ data }) => {
      console.log(data);
    });
  };
  const [isShowDictModal, setIsShowDictModal] = useState(false);
  const searchers: {
    key: keyof SearchParams;
    placeholder: string;
  }[] = dictParams.map(({ name, label }) => ({
    key: name,
    placeholder: label,
  }));
  const createDictFields = dictParams;
  const closeCreateDictModal = () => {
    setIsShowDictModal(false);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    getDicts();
  }, []);

  return (
    <div className={style.dictWrapper}>
      <div className={style.header}>
        {searchers.map(item => (
          <Searcher
            key={item.key}
            className={style.searcher}
            onChange={ev => {
              setSearchParams({ ...searchParams, [item.key]: ev.target.value });
            }}
            value={searchParams?.[item.key]}
            placeholder={item.placeholder}
            onSearch={() => getDicts()}
          />
        ))}
        <Select
          className={style.searcher}
          placeholder='状态'
          onChange={val => {
            const newSearchParams = { ...searchParams, status: val };
            setSearchParams(newSearchParams);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            getDicts(searchParams);
          }}
          value={searchParams.status}
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
          onClick={() => setIsShowDictModal(true)}
        >
          新增数据字典
        </Button>
        <Table columns={columns} className={style.table} />
      </div>
      <Modal
        title='新增数据字典'
        visible={isShowDictModal}
        onCancel={() => closeCreateDictModal()}
        maskClosable={false}
        width={400}
        className={style.dictModal}
        onOk={async () => {
          await form.validateFields().then(fields => {
            console.log(fields);
          });
        }}
        okButtonProps={{
          loading: true,
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

export default EmissionSourceDict;
