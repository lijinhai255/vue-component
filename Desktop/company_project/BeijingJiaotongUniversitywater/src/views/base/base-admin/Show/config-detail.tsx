import { FC, useEffect, useState, useMemo, useCallback } from 'react';
// import IconFont from '@components/iconfont';
import { Form, Input, Select, Button, Radio, Checkbox, message } from 'antd';
// import { UploadChangeParam } from 'antd/lib/upload';
// import { UploadFile } from 'antd/lib/upload/interface';
// import { getToken } from '@utils/cookie';
import { Rule } from 'antd/lib/form';
import style from '../index.module.scss';
import { apiConfigDataInfo, apiConfigData } from '@/views/base/service';
import { useHistory } from 'react-router-dom';
import CompanyInfoExamine from '@/views/system/register/component/companyInfoExamine';
import FormWrap from '@/views/system/component/FormWrap';
interface ItemType {
  title: string;
  name: string;
  require: Rule[];
  placeholder: string;
  type: string;
  class?: string;
  buttontext?: string;
  value?: string;
  select_list?: {
    id: string | number;
    reductionType_name: string;
    value?: string;
    checkStatus?: number;
    checkId?: number;
    checkName?: string;
  }[];
  maxLength?: number;
  isNeedButton?: boolean;
  checkStatus?: number;
}

const Orgstaff: FC = () => {
  // const [imageLoading, changeImageLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [formValue, changeFormValue] = useState<{
    orgType?: string;
    bankOrgId?: string;
    id?: string;
    contactEmail?: string;
    contactMobile?: string;
    contactName?: string;
    orgName?: string;
  }>({});
  const [orgTree, getOrgTree] = useState<{ orgName: string }[]>([]);
  const [configData, getConfigData] = useState<
    {
      paramId: number;
      type: number;
      reductionType: number;
      reductionType_name: string;
      reductionParamProject: null;
      reductionParamCheckProject: {
        id: number;
        paramId: number;
        type: number;
        reductionType: number;
        reductionType_name: string;
        checkId: number;
        checkName: string;
        checkType: number;
        checkStatus: 0;
        delFlag: null;
        createBy: number;
        updateBy: number;
        createTime: string;
        updateTime: string;
      }[];
      reductionParamUncheckProject: {
        id: number;
        paramId: number;
        type: number;
        reductionType: number;
        reductionType_name: string;
        checkId: number;
        checkName: string;
        checkType: number;
        checkStatus: 0;
        delFlag: null;
        createBy: number;
        updateBy: number;
        createTime: string;
        updateTime: string;
      }[];
      reductionParamShowProject: {
        id: number;
        paramId: number;
        type: number;
        reductionType: number;
        reductionType_name: string;
        checkId: number;
        checkName: string;
        checkType: number;
        checkStatus: 0;
        delFlag: null;
        createBy: number;
        updateBy: number;
        createTime: string;
        updateTime: string;
      }[];
    }[]
  >([]);
  const [currentIndex, changeCurrentIndex] = useState<number>(0);
  const [reductionType, changeReductionType] = useState<number>(1);
  const culDisAble = () => {
    return ['detail', 'examine'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  useEffect(() => {}, []);
  // 来源信息
  const sourceItemFn = useMemo<ItemType[]>(() => {
    return [
      {
        name: '减排量化标准',
        type: 'RadioGrolp',
        title: 'orgName',
        placeholder: !culDisAble() ? '请输入' : '',
        require: [],
      },
      {
        name: '必选项',
        type: 'CheckBoxGrolp',
        title: 'reductionParamCheckProject',
        placeholder: !culDisAble() ? '请输入' : '',
        require: [],
        select_list: configData[currentIndex]?.reductionParamCheckProject,
      },
      {
        name: '非必选项',
        type: 'CheckBoxGrolp',
        title: 'reductionParamUncheckProject',
        placeholder: !culDisAble() ? '请输入' : '',
        require: [],
        select_list: configData[currentIndex]?.reductionParamUncheckProject,
      },
      {
        name: '展示项',
        type: 'CheckBoxGrolp',
        title: 'reductionParamShowProject',
        placeholder: !culDisAble() ? '请输入' : '',
        require: [],
        select_list: configData[currentIndex]?.reductionParamShowProject,
      },
    ];
  }, [form.getFieldsValue(true), configData, currentIndex]);
  // const culDisAbleItem = (item: { reductionType_name: string }) => {
  //   return false;
  // };
  const renderLeftItem = useCallback(
    (LeftItem: ItemType[]) => {
      return LeftItem.map(item => {
        if (item.type === 'RadioGrolp') {
          return (
            <div
              style={{
                display: 'grid',
                fontSize: '14px',
              }}
            >
              <h3 className={style.configTitle}>减排量化标准</h3>
              {configData &&
                configData?.map(
                  (
                    tem: {
                      paramId: string | number;
                      reductionType_name: string;
                    },
                    index,
                  ) => {
                    console.log(configData, 'configData=configData');
                    return (
                      // @ts-ignore
                      <Radio
                        style={{ marginBottom: '20px' }}
                        value={index}
                        checked={index === currentIndex}
                        key={`radio-${index}`}
                        onChange={() => {
                          changeCurrentIndex(index);
                          changeReductionType(configData[index].reductionType);
                        }}
                        disabled={
                          item.title === 'reductionParamCheckProject'
                            ? true
                            : culDisAble()
                        }

                        // disabled={culDisAbleItem(item)}
                      >
                        {tem.reductionType_name}
                      </Radio>
                    );
                  },
                )}
            </div>
          );
        }
        if (item.type === 'CheckBoxGrolp') {
          return (
            <div style={{ marginBottom: '10px' }}>
              <h3 className={style.configTitle}>{item.name}</h3>
              {item.select_list &&
                item.select_list?.map((tem, index) => {
                  return (
                    // @ts-ignore
                    <Checkbox
                      style={{ marginBottom: '20px' }}
                      // @ts-ignore
                      value={tem.checkId ? tem.checkId : ''}
                      checked={Boolean(tem.checkStatus)}
                      disabled={
                        item.title === 'reductionParamCheckProject'
                          ? true
                          : culDisAble()
                      }
                      onClick={() => {
                        try {
                          let arr = configData;
                          // @ts-ignore
                          arr[currentIndex as number][item.title][
                            index
                          ].checkStatus = Boolean(tem.checkStatus) ? 0 : 1;
                          console.log(
                            arr,
                            'arr-arr',
                            arr[currentIndex as number],
                            // @ts-ignore
                            arr[currentIndex as number][item.title],
                          );
                          getConfigData([...arr]);
                        } catch (error) {
                          console.log(error, 'error');
                        }
                      }}
                    >
                      {/* @ts-ignore */}
                      {tem.checkName}
                    </Checkbox>
                  );
                })}
            </div>
          );
        }
        if (item.type === 'debounceSelect') {
          console.log(orgTree, 'orgTree=orgTree=orgTree=orgTree', getOrgTree);
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign='right'
              rules={item.require}
            >
              <Select
                mode='multiple'
                placeholder={item.placeholder}
                filterOption={false}
                onSearch={() => {}}
                disabled={culDisAble()}
                maxTagCount={1}
                // notFoundContent={fetching ? <Spin size='small' /> : null}
                options={orgTree}
                fieldNames={{
                  label: 'orgName',
                  value: 'id',
                }}
              />
            </Form.Item>
          );
        }
        if (item.type === 'disabledinput') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign='right'
              rules={item.require}
            >
              <Input disabled placeholder={item.placeholder} maxLength={100} />
            </Form.Item>
          );
        }
        if (item.type === 'text') {
          return (
            <Form.Item
              name={item.title}
              label={item.name}
              labelAlign='right'
              rules={item.require}
            >
              <span> {item.value}</span>
            </Form.Item>
          );
        }
        return '';
      });
    },
    [orgTree, formValue, configData, currentIndex],
  );

  // 图片上传
  // 获取组织详情 接口
  const apiSystemOrgDetailFn = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    console.log(id);
    // await apiSystemOrgDetail({ id }).then(({ data }) => {
    //   console.log(data);
    //   const {
    //     bankOrgId,
    //     contactEmail,
    //     contactMobile,
    //     contactName,
    //     orgName,
    //     orgType,
    //     id,
    //   } = data.data;
    //   form.setFieldsValue({
    //     bankOrgId,
    //     contactEmail,
    //     contactMobile,
    //     contactName,
    //     orgName,
    //     orgType,
    //   });
    //   changeFormValue({
    //     bankOrgId,
    //     contactEmail,
    //     contactMobile,
    //     contactName,
    //     orgName,
    //     orgType,
    //     id,
    //   });
    // });
  };
  // 获取参数配置
  const apiConfigDataInfoFn = async () => {
    const id = new URLSearchParams(location.search).get('id') || '';
    const type = new URLSearchParams(location.search).get('type') || '';
    await apiConfigDataInfo({ id, type }).then(({ data }) => {
      console.log(data, changeFormValue);
      if (data.code === 200) {
        getConfigData([...data.data]);
        data.data.forEach((item: { checkStatus: number }, index) => {
          if (item.checkStatus === 1) {
            changeCurrentIndex(index);
          }
        });
      }
    });
  };

  useEffect(() => {
    // console.log(apiFileUploadFn, 'apiFileUploadFn');
    // apiFileUploadFn();
    apiSystemOrgDetailFn();
    apiConfigDataInfoFn();
  }, []);
  const renderContent = () => {
    if (history.location.pathname.indexOf('examine') >= 0) {
      return (
        <FormWrap
          style={
            ['exam', 'detail'].some(
              item => history.location.pathname.indexOf(item) >= 0,
            )
              ? { width: '100%', marginTop: '16px', minHeight: '716px' }
              : {}
          }
        >
          <CompanyInfoExamine />
        </FormWrap>
      );
    }
    const returnItme = () => {
      return sourceItemFn;
    };
    return (
      <>
        <div className={style.company} style={{ height: '100vh' }}>
          {/* {JSON.stringify(configData[currentIndex as number])}=configData */}
          <div className={style.content}>
            <Form
              form={form}
              size='middle'
              layout='vertical'
              className={style.config}
            >
              {renderLeftItem(returnItme())}
            </Form>
          </div>
        </div>
        <div
          className='Drawer-Btn-bottom'
          style={{
            textAlign: 'center',
            padding: '20px',
            borderTop: '1px solid #efefef',
          }}
        >
          {culDisAble() ? (
            <>
              <Button
                onClick={() => {
                  history.go(-1);
                }}
              >
                返回
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  history.go(-1);
                }}
              >
                取消
              </Button>
              <Button
                className='marginLeft20'
                type='primary'
                onClick={async () => {
                  const id =
                    new URLSearchParams(location.search).get('id') || '';
                  const type =
                    new URLSearchParams(location.search).get('type') || '';
                  await apiConfigData({
                    paramId: id,
                    reductionParamProject: [
                      ...configData[currentIndex].reductionParamCheckProject,
                      ...configData[currentIndex]?.reductionParamUncheckProject,
                      ...configData[currentIndex]?.reductionParamShowProject,
                    ],
                    reductionType,
                    type,
                  }).then(({ data }) => {
                    if (data.code === 200) {
                      message.success('编辑配置成功');
                      history.go(-1);
                      return;
                    }
                    message.error(data.msg);
                  });
                  // await form.validateFields().then(async value => {
                  //   console.log(value, 'value');
                  //   // await apiOrgCreateFn(value);
                  // });
                }}
              >
                保存
              </Button>
            </>
          )}
        </div>
      </>
    );
  };
  return renderContent();
};

export default Orgstaff;
