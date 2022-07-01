/**
 * @file 数据字典配置
 */

import { FC, useEffect, useState } from 'react';
import { IconFont } from '@components/IconFont';
import { Form, Input, message, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import style from './index.module.scss';
import { Button } from '@/components/Button';
import { Table } from '@/components/AutoHeightTable';
import { useDictListColumn } from './utils/columns';

import { dictListParams } from './utils';
import { createSysDict, sysDictUpdate } from '@/api/industry';
import { clearObject } from '@/utils';
import { SysDictData, SysDictDataResult } from '@/api/industry/index-type';

const Dict: FC = () => {
  const history = useHistory();
  const [dicts] = useState<SysDictData>();
  const [form] = Form.useForm<SysDictDataResult>();
  const [modalOkLoading, setModalOkLoading] = useState(false);
  const [modalFormVal, setModalFormVal] =
    useState<Partial<SysDictDataResult>>();
  const successFn = () => {
    setModalFormVal(undefined);
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

  const createDictFields = dictListParams;
  const closeCreateDictModal = () => {
    setModalFormVal(undefined);
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
  }, []);

  return (
    <div className={style.dictWrapper} style={{ flex: '1' }}>
      <div className={style.header}>
        {/* <SearchForm
          formList={formList}
          onSearch={onSearch}
          onClick={() => {}}
        /> */}
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
          新增分类
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
        title='新增分类'
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
