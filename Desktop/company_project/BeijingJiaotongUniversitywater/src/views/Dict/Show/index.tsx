/**
 * @file 数据字典配置
 */

import { FC, useState } from 'react';
import { IconFont } from '@components/IconFont';
import { Form, Input, Modal, Select } from 'antd';
import { useParams } from 'react-router-dom';
import style from '../index.module.scss';
import { Button } from '@/components/Button';
import { Table } from '@/components/AutoHeightTable';
import { useDictDetailColumns } from '../utils/columns';
import { Searcher } from '@/components/Searcher';
import { dictParams, DatasItemSearchParams } from '../utils';
import { clearObject } from '@/utils';

const DictShow: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const columns = useDictDetailColumns();
  const { id } = useParams<{ id?: string }>();
  console.log(id);
  const [searchParams, setSearchParams] = useState<DatasItemSearchParams>({});
  const getDicts = async (s?: DatasItemSearchParams) => {
    const searchVal = s || searchParams;
    console.log(searchVal);
    await Promise.resolve();
  };
  const [isShowDictModal, setIsShowDictModal] = useState(false);
  // @ts-ignore
  const searchers: {
    key: keyof DatasItemSearchParams;
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
          onChange={val => {
            console.log(val);
            const newSearchParams = {
              ...searchParams,
              // is_forbid: val > 0 ? true : false,
            };
            setSearchParams(newSearchParams);
            getDicts(searchParams);
          }}
          value={
            typeof searchParams.is_forbid === 'boolean'
              ? +searchParams.is_forbid
              : undefined
          }
          options={[
            { label: '启用', value: 0 },
            { label: '禁用', value: 1 },
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

export default DictShow;
