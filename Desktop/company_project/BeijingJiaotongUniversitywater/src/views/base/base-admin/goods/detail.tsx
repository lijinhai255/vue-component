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
import { Button, Table } from 'antd';

import { useHistory } from 'react-router-dom';
import style from '../index.module.scss';
import { apiGoodsInfo } from '../../service';
import { combineClassName } from '@/utils';
import { useProductColumn } from './formColumn';
import { apiMnumListALLByDictTypeBatch } from '../../../data-quality-management/service-old';

const GoodsDetail: FC = () => {
  interface BaseDataProps {
    goodsName: string;
    goodsId: string;
    status: string;
    goodsAttribute: string;
    type: number | string;
    goodsInfo: string;
  }
  interface GoodsProps {
    goodsId: string;
    id: number | string;
    priceType: string;
    realPrice: number | string;
    standPrice: number | string;
    value: number | string;
  }
  const [orderList, setOrderList] = useState([]);
  const [lables, setLables] = useState<string[]>([]);
  const [baseData, setBaseData] = useState<BaseDataProps>();
  const [goodsList, setGoodsList] = useState<GoodsProps[]>();

  const history = useHistory();

  // 获取商品详情
  const getDetail = async (goodsId: string) => {
    try {
      const dics = await apiMnumListALLByDictTypeBatch({
        dictTypes: 'goods_type,goods_attribute',
      });

      const { data } = await apiGoodsInfo({ goodsId });
      const goodsAttribute = dics.data.data.goods_attribute.find(
        (item: any) => item.dictValue === data.data.goodsAttribute,
      ).dictLabel;
      const type = dics.data.data.goods_type.find(
        (item: any) => item.dictValue === String(data.data.type),
      ).dictLabel;
      setOrderList(data.data.productList);
      data.data.labels && setLables(data.data.labels.split(','));
      setGoodsList(data.data.priceList);
      setBaseData({
        goodsName: data.data.goodsName,
        goodsId: data.data.goodsId,
        status: data.data.status,
        goodsAttribute,
        type,
        goodsInfo: data.data.goodsInfo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 基本信息
  const renderBaseForm = () => {
    return (
      <div>
        <div className={combineClassName(style.titleBox)}>
          <p>基本信息</p>
        </div>
        <div className={combineClassName(style.formBox)}>
          <div>
            <span>商品名称：</span>
            <span>{baseData?.goodsName}</span>
          </div>
          <div>
            <span>商品编码：</span>
            <span>{baseData?.goodsId}</span>
          </div>
          <div>
            <span>商品状态：</span>
            <span>{baseData?.status === '1' ? '启用' : '禁用'}</span>
          </div>
          <div>
            <span>商品属性：</span>
            <span>{baseData?.goodsAttribute}</span>
          </div>
          <div>
            <span>商品类型：</span>
            <span>{baseData?.type}</span>
          </div>
          <div>
            <span>商品简介：</span>
            <span>{baseData?.goodsInfo}</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span style={{ width: '80px' }}>商品标签：</span>
            {lables.length ? (
              <ul
                className={combineClassName(
                  `${style.targetFlex} ${style.labels}`,
                )}
              >
                {lables.map((ite, index) => {
                  return <li key={index}>{ite}</li>;
                })}
              </ul>
            ) : (
              <div style={{ marginBottom: '50px' }}>--</div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const orderColumn = useProductColumn<any>({});
  // 订购信息
  const renderOrderInfo = () => {
    return (
      <div>
        <div
          style={{ margin: '0' }}
          className={combineClassName(style.titleBox)}
        >
          <p>订购信息</p>
        </div>
        <Table
          bordered
          columns={orderColumn}
          dataSource={orderList}
          className={style.table}
          pagination={false}
        />
      </div>
    );
  };

  // 商品定价
  const renderGoodsPrice = () => {
    const goodsColumn = [
      {
        dataIndex: 'value',
        title: '有效期',
        render: (text: any, record: GoodsProps) => {
          return <span>{text + record.priceType}</span>;
        },
      },
      {
        dataIndex: 'realPrice',
        title: '现价',
        render: (text: any) => {
          return <span>{text}元</span>;
        },
      },
      {
        dataIndex: 'standPrice',
        title: '标准价',
        render: (text: any) => {
          return <span>{text}元</span>;
        },
      },
    ];
    return (
      <div>
        <div className={combineClassName(style.titleBox)}>
          <p>商品定价</p>
        </div>
        <div style={{ marginBottom: '14px' }}>定价模式：按时间收费</div>
        <Table
          bordered
          columns={goodsColumn}
          dataSource={goodsList}
          className={style.table}
          pagination={false}
        />
      </div>
    );
  };
  useEffect(() => {
    getDetail(history.location.search.split('?')[1]);
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        padding: '20px',
        marginBottom: '40px',
      }}
    >
      {renderBaseForm()}
      {renderOrderInfo()}
      {renderGoodsPrice()}
      <div className={combineClassName(style.bottomBox)}>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </div>
    </div>
  );
};

export default GoodsDetail;
