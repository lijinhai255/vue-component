import {
  InputNumber,
  Modal,
  Table,
  Space,
  Button,
  Row,
  Select,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FC } from 'react';
import moment from 'moment';
import { FormikValues } from 'formik';
import { fossilTypeArr, fossilFuelUnitType } from '../CulNumber/index';
import { useHistory } from 'react-router-dom';
interface ProductionModelType {
  isModalVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  productionData: {
    netElecUp?: null | string;
    year?: null | string;
    fossilFuelType?: string | null;
    consumption?: string | null;
    deviceElec?: string | null;
    unitType?: string | null;
  }[];
  productionDataFrom: FormikValues;
  title?: string;
}
const { Option } = Select;
//@ts-ignore
let yearArr: string[] = [];
for (
  let i = Number(moment().format('YYYY'));
  i >= Number(moment().format('YYYY')) - 20;
  i--
) {
  yearArr.push(`${i}`);
}
const ProductionModel: FC<ProductionModelType> = ({
  isModalVisible,
  onOk,
  onCancel,
  productionData,
  productionDataFrom,
  title,
}) => {
  const history = useHistory();

  const culDisAbled = () => {
    return ['detail', 'examine', 'exam'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  const culOptionDisabled = (ite: string) => {
    return productionDataFrom.values.some(
      (item: { year: string }) => `${item.year}` === `${ite}`,
    );
  };
  const columns = [
    {
      title: '年份',
      dataIndex: 'year',
      render: (text: string, __: any, index: number) => (
        <Select
          style={{ width: '100%' }}
          disabled={culDisAbled()}
          placeholder='请选择'
          value={text ? `${text}` : text}
          onChange={e => {
            let arr = productionData;
            productionData[index].year = e;
            productionDataFrom.setValues([...arr]);
          }}
        >
          {
            //@ts-ignore
            yearArr.map(ite => (
              <Option disabled={culOptionDisabled(ite)} key={ite}>
                {ite}
              </Option>
            ))
          }
        </Select>
      ),
    },
    {
      title: '净上网电量（MWh）',
      className: 'netElecUp',
      dataIndex: 'netElecUp',
      render: (text: string, __: any, index: number) => (
        <InputNumber
          style={{ width: '100%' }}
          value={text}
          placeholder='请填写'
          disabled={culDisAbled()}
          min={'0.001'}
          onChange={value => {
            let arr = productionData;
            productionData[index].netElecUp = Number(value).toFixed(4);
            productionDataFrom.setValues([...arr]);
          }}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      render: (text: string, __: any, index: number) => {
        return (
          <Space>
            <Button
              disabled={culDisAbled() || !(index > 0)}
              type='link'
              danger
              onClick={() => {
                if (index === 0) return message.error('至少保留一条数据');
                let arr = productionData.filter((_, ind) => ind !== index);
                productionDataFrom.setValues([...arr]);
              }}
            >
              {'删除'}
            </Button>
          </Space>
        );
      },
    },
  ];

  // 投产前历年数据填写
  const generatorListColumns = [
    {
      title: '年份',
      dataIndex: 'year',
      render: (text: string, __: any, index: number) => (
        <Select
          style={{ width: '100%' }}
          placeholder='请选择'
          value={text ? `${text}` : text}
          disabled={culDisAbled()}
          onChange={e => {
            let arr = productionDataFrom.values;
            arr[index].year = e;
            productionDataFrom.setValues([...arr]);
          }}
        >
          {
            //@ts-ignore
            yearArr.map(ite => (
              <Option disabled={culOptionDisabled(ite)} key={ite}>
                {ite}
              </Option>
            ))
          }
        </Select>
      ),
    },
    {
      title: '主要化石燃料类型',
      dataIndex: 'fossilFuelType',
      render: (text: string, __: any, index: number) => (
        <Select
          style={{ width: '100%' }}
          placeholder='请选择'
          value={text ? `${text}` : text}
          disabled={culDisAbled()}
          onChange={e => {
            let arr = productionDataFrom.values;
            arr[index].fossilFuelType = e;
            arr[index].unitType = e;
            productionDataFrom.setValues([...arr]);
          }}
        >
          {fossilTypeArr.map((item, key) => {
            return (
              <Option key={key} value={item.fossilFuelType}>
                {item.label}
              </Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '化石燃料消耗量',
      className: 'consumption',
      dataIndex: 'consumption',
      render: (text: string, __: any, index: number) => (
        <InputNumber
          style={{ width: '100%' }}
          value={text}
          placeholder='请填写'
          disabled={culDisAbled()}
          onChange={value => {
            let arr = productionDataFrom.values;
            arr[index].consumption = Number(value).toFixed(4);
            productionDataFrom.setValues([...arr]);
          }}
        />
      ),
    },
    {
      title: '单位',
      className: 'unitType',
      dataIndex: 'unitType',
      render: (text: string) => {
        //@ts-ignore
        return fossilFuelUnitType[text];
      },
    },
    {
      title: '投产前自用发电设备发电量（MWh）',
      className: 'deviceElec',
      dataIndex: 'deviceElec',
      render: (text: string, __: any, index: number) => (
        <InputNumber
          style={{ width: '100%' }}
          value={text}
          placeholder='请填写'
          disabled={culDisAbled()}
          onChange={value => {
            let arr = productionDataFrom.values;
            arr[index].deviceElec = Number(value).toFixed(4);
            productionDataFrom.setValues([...arr]);
          }}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'address',
      render: (text: string, __: any, index: number) => {
        return (
          <Space>
            <Button
              disabled={culDisAbled() || !(index > 0)}
              type='link'
              danger
              onClick={() => {
                if (index === 0) return message.error('至少保留一条数据');
                let arr = productionData.filter((_, ind) => ind !== index);
                productionDataFrom.setValues([...arr]);
              }}
            >
              {'删除'}
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Modal
      title={
        title === 'generatorList' ? '投运前历年数据填写' : '投产前历年发电量'
      }
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={title === 'generatorList' ? 1100 : 600}
    >
      <Table
        columns={title === 'generatorList' ? generatorListColumns : columns}
        dataSource={productionData}
        bordered
        pagination={false}
        footer={() =>
          !culDisAbled() && (
            <Row
              justify='center'
              style={{ background: '#fff', margin: '-16px' }}
            >
              <Button
                type='link'
                icon={<PlusOutlined />}
                onClick={() => {
                  let arr = productionData;
                  if (title === 'generatorList') {
                    arr.push({
                      fossilFuelType: null, //化石燃料类型,可用值:1,2,3
                      consumption: null, //消耗量
                      deviceElec: null, // 投运前自用发电设备发电量
                      year: null, //  年份
                      unitType: null, //单位
                    });
                  } else {
                    arr.push({
                      netElecUp: null,
                      year: null,
                    });
                  }

                  productionDataFrom.setValues([...arr]);
                }}
              >
                新增
              </Button>
            </Row>
          )
        }
      />
    </Modal>
  );
};

export default ProductionModel;
