/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */
import { FC, useEffect, useState } from 'react';
// import IconFont from '@components/iconfont';
import { Dictionary } from 'lodash';
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Row,
  Table,
  Tree,
  message,
} from 'antd';
import { apiMnumListALLByDictTypeBatch } from '../../../emission/service';

import { Option } from 'antd/es/mentions';
// import { UploadChangeParam } from 'antd/lib/upload';
// import { UploadFile } from 'antd/lib/upload/interface';
// import { getToken } from '@utils/cookie';
import { ColumnsType } from 'antd/lib/table';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import style from '../index.module.scss';
import { combineClassName } from '@/utils';
import { apiGetCompanyInfo } from '../../service';
import { ColumnType } from 'antd/es/table';

const OrgDetail: FC = () => {
  // const [imageLoading, changeImageLoading] = useState(false);
  const [infoData, setInfoData] = useState<any>({}); // 编辑 和保存功能
  const history = useHistory();
  const [tableData, setTableData] = useState<any[]>([]);
  interface TableItem {
    [key: string]: any;
  }
  const scalearr = [
    '--',
    '1-10',
    '10-100',
    '100-200',
    '200-500',
    '500-1000',
    '1000-5000',
    '5000-10000',
    '10000+',
  ];
  const [form] = Form.useForm();
  const infoForm: {
    title: string;
    child: { name: string; label: string; value?: string }[];
  }[] = [
    {
      title: '基本信息',
      child: [
        {
          name: 'companyName',
          label: '组织名称：',
        },
        {
          name: 'companyNum',
          label: '组织编号：',
        },
        {
          name: 'industry',
          label: '所属行业：',
        },
        {
          name: 'scale',
          label: '组织规模：',
        },
        {
          name: 'masterName',
          label: '负责人账号：',
        },
        {
          name: 'status', //0正常，1禁用
          label: '状态：',
        },
        {
          name: 'createTime',
          label: '创建时间：',
        },
      ],
    },
    {
      title: '联系信息',
      child: [
        {
          name: 'linkmanName',
          label: '联系人姓名：',
          value: '1',
        },
        {
          name: 'linkmanPhone',
          label: '联系人手机：',
          value: '1',
        },
        {
          name: 'landline',
          label: '固定电话：',
        },
        {
          name: 'linkmanEmail',
          label: '联系人邮箱：',
        },
        {
          name: 'postcode',
          label: '邮编：',
        },
        {
          name: 'detailedAddr',
          label: '联系地址：',
        },
      ],
    },
  ];
  // interface ColumnProps<T> {
  //   [key: String]: any;
  // }
  const columnFn = <T extends Dictionary<any>>({}): ColumnType<T>[] => {
    return [
      {
        dataIndex: 'index',
        title: '序号',
        render: (t: string, record: TableItem, index: number) => index + 1,
      },
      {
        dataIndex: 'productName',
        title: '产品名称',
      },
      {
        dataIndex: 'productId',
        title: '产品ID',
      },
      {
        dataIndex: 'expireTime',
        title: '有效期至',
      },
      {
        dataIndex: 'createTime',
        title: '创建时间',
      },
      {
        dataIndex: 'updateTime',
        title: '更新时间',
      },
    ];
  };
  const columns = columnFn<any>({});
  const industryObj = [
    '--',
    '钢铁',
    '石化',
    '化工',
    '建材',
    '有色',
    '造纸',
    '电力',
    '航空',
    '科技',
    '金融',
    '消费',
    '其他',
  ];

  const getData = async () => {
    let dics = await apiMnumListALLByDictTypeBatch({
      dictTypes: 'business',
    });

    let { data } = await apiGetCompanyInfo({
      companyId: history.location.search.split('?')[1],
    });
    const company: any = data.data.company;
    const status = company.status ? '禁用' : '启用';
    // const industry = dics.data.data.business.find(
    //   (item: any) => item.dictValue === company.industry,
    // )?.dictLabel;

    const industry = industryObj[company.industry];
    const scale = scalearr[company.scale];
    setInfoData({ ...company, status, scale, industry });
    setTableData([...data.data.companyProducts]);
    // form.setFieldsValue({ ...data.data.company });
    console.log(form.getFieldsValue(true));
  };
  const renderBaseInfo = () => {
    return (
      <div>
        {infoForm.map(item => {
          return (
            <div key={item.title}>
              <div className={combineClassName(style.titleBox)}>
                <p>{item.title}</p>
              </div>
              <Form form={form} labelCol={{ span: 2, offset: 0 }}>
                {item.child.map(formItem => {
                  return (
                    <Form.Item key={formItem.name} label={formItem.label}>
                      {infoData[formItem.name] || '--'}
                    </Form.Item>
                  );
                })}
              </Form>
            </div>
          );
        })}
      </div>
    );
  };
  const goService = () => {
    history.push(`/basic-admin/orga/openService?${infoData.companyNum}`);
  };
  const renderList = () => {
    return (
      <>
        <div
          className={combineClassName(style.titleBox)}
          style={{ marginBottom: '10px' }}
        >
          <p>订购信息</p>
          <Button type='primary' onClick={() => goService()}>
            开通服务
          </Button>
        </div>
        <Table bordered dataSource={tableData} columns={columns} />
      </>
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        padding: '20px',
        marginBottom: '40px',
      }}
    >
      {renderBaseInfo()}
      {renderList()}
      <div className={combineClassName(style.bottomBox)}>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </div>
    </div>
  );
};

export default OrgDetail;
