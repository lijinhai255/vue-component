import { useState, useMemo, useEffect } from 'react';
import { Form, Button, Space, message } from 'antd';
import ReturnFrom, { ListArrType } from '@views/components/From';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { returnGoodsArr } from './returnArr/returnArr';

import './style.less';
import { ComstomInput } from '@/views/components/Basic';
import {
  apiProductionAdd,
  apiProductionEdit,
  apiProductionQuery,
} from '../../service';

export default function ComponentName() {
  const history = useHistory();
  const [form] = Form.useForm();
  // 表格数据
  const [tableData, changeTableData] = useState<
    {
      index: number;
      name: string | null;
      category: string | null;
      number: string | null;
      install_location: number | string | null;
      remark?: string;
      userId?: string;
      isEdit?: boolean;
    }[]
  >([]);
  const [formData, changeFormData] = useState<{ [key: string]: any }>({});
  console.log(changeFormData, 'changeFormData', formData);

  const culDisAble = () => {
    return ['detail', 'examine'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  // 获取详情
  const getDetail = (id: string) => {
    console.log(id, 'id');
    if (
      history.location.pathname.indexOf(
        'ata-quality-management/production/edit',
      ) >= 0 ||
      history.location.pathname.indexOf(
        'ata-quality-management/production/detail',
      ) >= 0
    ) {
      // if (id.split('id=').length > 1) {
      //   id = id.split('id=')[1];
      // }
      apiProductionQuery({ id }).then((res: any) => {
        if (res.data.code === 200) {
          console.log(res, 'res');
          form.setFieldsValue({ ...res.data.data });
          changeTableData(res.data.data.equipment);
          console.log(form.getFieldsValue(), 'form.getFieldsValue');
        }
      });
    }
  };
  useEffect(() => {
    if (history.location.search.split('?').length > 0) {
      getDetail(history.location.search.split('?')[1]);
    }
  }, []);
  // 获取分配关系表
  const ApiExecutelistFn = () => {
    // ApiExecutelist({
    //   pageNum: '1',
    //   pageSize: '5000',
    //   targetId:
    //     new URLSearchParams(window.location.search).get('targetId') || '',
    // }).then(({ data }) => {
    //   if (data.code === 200) {
    //     if (data.rows.length > 0) {
    //       changeTableData([...data.rows]);
    //     } else {
    //       if (history.location.pathname.indexOf('show') === -1) {
    changeTableData([
      {
        index: 1,
        category: '',
        number: '',
        name: '',
        install_location: '',
        remark: '',
        isEdit: true,
      },
    ]);
    //     }
    //   }
    // }
    // });
  };
  useEffect(() => {
    ApiExecutelistFn();
  }, []);
  const AllocationArr: ListArrType[] = useMemo(() => {
    return [
      {
        label: '',
        name: '',
        rules: [],
        baseType: 'Table',
        className: 'fromTable',
        baseItem: {
          style: { width: '100%' },
          columns: [
            {
              title: '序号',
              dataIndex: 'id',
              key: 'id',
              width: '100px',
              render: (text, record, index: number) => {
                return index + 1;
              },
            },
            {
              // eslint-disable-next-line react/no-unstable-nested-components
              title: () => (
                <span>
                  {!culDisAble() && <span className='star'>*</span>}设施类别
                </span>
              ),
              dataIndex: 'category',
              key: 'category',
              render: (text: string, record, index: number) => {
                return !culDisAble() ? (
                  <ComstomInput
                    value={text}
                    status={!text ? 'error' : ''}
                    placeholder='请输入'
                    onChange={e => {
                      tableData[index].category = e.target.value;
                      changeTableData([...tableData]);
                    }}
                    maxLength={50}
                  />
                ) : (
                  text
                );
              },
            },
            {
              // eslint-disable-next-line react/no-unstable-nested-components
              title: () => (
                <span>
                  {!culDisAble() && <span className='star'>*</span>}设施编号
                </span>
              ),
              dataIndex: 'number',
              key: 'number',
              render: (text: string, record, index: number) => {
                return !culDisAble() ? (
                  <ComstomInput
                    value={text}
                    status={!text ? 'error' : ''}
                    placeholder='请输入'
                    onChange={e => {
                      tableData.forEach(() => {
                        tableData[index].number = e.target.value;
                        changeTableData([...tableData]);
                      });
                    }}
                    onBlur={e => {
                      tableData.forEach((item, idx) => {
                        if (index !== idx && item.number === e.target.value) {
                          message.error('设施编号不能重复');
                          tableData[index].number = '';
                          changeTableData([...tableData]);
                        }
                      });
                    }}
                    maxLength={50}
                  />
                ) : (
                  text
                );
              },
            },
            {
              // eslint-disable-next-line react/no-unstable-nested-components
              title: () => (
                <span>
                  {!culDisAble() && <span className='star'>*</span>}设施名称
                </span>
              ),
              dataIndex: 'name',
              key: 'name',
              render: (text: string, record, index: number) => {
                return !culDisAble() ? (
                  // <Form.Item
                  //   name='name'
                  //   rules={[{ required: true, message: '请输入设施名称' }]}
                  //   className='form_item'
                  // >
                  <ComstomInput
                    value={text}
                    status={!text ? 'error' : ''}
                    placeholder='请输入'
                    onChange={e => {
                      tableData.forEach(() => {
                        tableData[index].name = e.target.value;
                        changeTableData([...tableData]);
                      });
                    }}
                    onBlur={e => {
                      tableData.forEach((item, idx) => {
                        if (index !== idx && item.name === e.target.value) {
                          message.error('设施名称不能重复');
                          tableData[index].name = '';
                          changeTableData([...tableData]);
                        }
                      });
                    }}
                    maxLength={50}
                  />
                ) : (
                  // </Form.Item>
                  text
                );
              },
            },
            {
              // eslint-disable-next-line react/no-unstable-nested-components
              title: () => (
                <span>
                  {!culDisAble() && <span className='star'>*</span>}设施安装位置
                </span>
              ),
              dataIndex: 'install_location',
              key: 'install_location',
              render: (text: string, record, index: number) => {
                return !culDisAble() ? (
                  <ComstomInput
                    value={text}
                    status={!text ? 'error' : ''}
                    placeholder='请输入'
                    onChange={e => {
                      tableData[index].install_location = e.target.value;
                      changeTableData([...tableData]);
                    }}
                    maxLength={100}
                  />
                ) : (
                  text
                );
              },
            },
            {
              title: '备注说明',
              dataIndex: 'remark',
              key: 'remark',
              render: (text: string, record, index: number) => {
                return !culDisAble() ? (
                  <ComstomInput
                    value={text}
                    placeholder='请输入'
                    onChange={e => {
                      tableData[index].remark = e.target.value;
                      changeTableData([...tableData]);
                    }}
                    maxLength={200}
                  />
                ) : (
                  text
                );
              },
            },
            !culDisAble()
              ? {
                  title: '操作',
                  dataIndex: 'do',
                  key: 'do',
                  render: (text: string, record, index: number) => {
                    return (
                      <Space>
                        {record.exStatus ? (
                          ''
                        ) : tableData.length === 1 ? (
                          '-'
                        ) : (
                          <Button
                            type='link'
                            style={{ color: '#ED5555' }}
                            onClick={() => {
                              tableData.splice(index, 1);
                              changeTableData([...tableData]);
                            }}
                          >
                            删除
                          </Button>
                        )}
                      </Space>
                    );
                  },
                }
              : {},
          ],
          dataSource: tableData,
          pagination: false,
        },
        children: history.location.pathname.indexOf(
          'data-quality-management/production/detail',
        ) < 0 && (
          <div
            className='add-linkman'
            style={{ marginBottom: '30px' }}
            // eslint-disable-next-line consistent-return
            onClick={() => {
              // if (tableData.some(item => item.isEdit === true))
              //   return message.error('数据填写完整');
              if (tableData.length >= 20)
                return message.error('最多可新增20条');
              tableData.push({
                index: 1,
                category: '',
                number: '',
                name: '',
                install_location: '',
                remark: '',
                isEdit: true,
              });
              changeTableData([...tableData]);
            }}
          >
            <Button
              type='link'
              disabled={tableData.length > 19}
              icon={<PlusOutlined />}
            >
              新增
            </Button>
          </div>
        ),
      },
    ];
  }, [tableData, formData]);

  const returnFromFn = useMemo(() => {
    return (
      <ReturnFrom
        form={form}
        style={{ width: '100%' }}
        listArr={[...AllocationArr]}
        fromClassName='fromClassName'
      />
    );
  }, [formData, tableData]);

  // 保存/更新
  const cSubmit = async (value: any) => {
    console.log(tableData, 'tableData');
    console.log(value, 'value');
    const params = {
      ...value,
      equipment: tableData,
    };
    let id;
    if (
      history.location.pathname.indexOf(
        'data-quality-management/production/edit',
      ) >= 0
    ) {
      // todo fix search  use  new URLSearchParams
      // eslint-disable-next-line
      id = history.location.search.split('?')[1];
      params.id = id;
    }
    const res = id
      ? await apiProductionEdit(params)
      : await apiProductionAdd(params);
    console.log(res, 'res');
    if (res.data.code === 200) {
      message.success('保存成功');
      history.goBack();
    } else {
      message.error(res.data.msg);
    }
  };
  return (
    <>
      <h3 className='product_title'>所属组织：北京水务分公司</h3>
      <ReturnFrom
        form={form}
        listArr={returnGoodsArr(() => culDisAble())}
        fromClassName='p_s_m_form'
      />
      <div className='new_equipment'>
        <h5 className='title'>生产/排放设备</h5>
        {returnFromFn}
      </div>
      <div className='DrawerBtn'>
        {culDisAble() ? (
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            返回
          </Button>
        ) : (
          <>
            <Button onClick={() => history.goBack()}>取消</Button>
            <Button
              className='marginLeft20'
              type='primary'
              onClick={async () => {
                await form.validateFields().then(async value => {
                  cSubmit(value);
                });
              }}
            >
              保存
            </Button>
          </>
        )}
      </div>
    </>
  );
}
