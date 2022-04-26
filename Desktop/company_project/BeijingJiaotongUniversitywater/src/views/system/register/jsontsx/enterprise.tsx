import { IconFont } from '@/components/IconFont';
import { getToken } from '@utils/cookie';
import VerifyUtils from '@/utils/verifty';
import {
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
} from 'antd';
import { Rule } from 'antd/lib/form';
import style from '../style.module.scss';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;
export const dataFilter = (
  CodeList: { code: number; name: string }[],
  code: number[] | [],
) => {
  if (CodeList && CodeList.length > 0) {
    let Provincial = CodeList.filter((item: any) => item.code === code[0]);
    if (Provincial.length > 0) {
      // @ts-ignore
      let urban = Provincial[0].children.filter(
        (item: any) => item.code === code[1],
      );
      let areas: string;
      if (urban.length === 0) {
        areas = '';
      } else {
        areas =
          urban[0].children.filter((item: any) => item.code === code[2])
            .length > 0
            ? urban[0].children.filter((item: any) => item.code === code[2])[0]
                .name
            : '';
      }

      // @ts-ignore
      return `${Provincial[0].name}${
        urban.length === 0 ? '' : urban[0].name
      }${areas}`;
    }
  }
  return '';
};
export interface ItemType {
  title?: string;
  name?: string;
  require?: Rule[];
  placeholder?: string;
  type?: string;
  class?: string;
  buttontext?: string;
  value?: string;
  disabled?: boolean;
  select_list?: {
    dictLabel?: string;
    dictValue?: string;
    id?: string | number;
    name?: string;
  }[];
  maxLength?: number;
  isNeedButton?: boolean;
  defaultValue?: string;
  dataSource?: [];
  modelLabel?: string;
  allowClear?: boolean;
  childLabel?: string;
}

// 币种
export const getCurrency = [
  {
    id: 1,
    name: '人民币',
  },
  {
    id: 2,
    name: '美元',
  },
  {
    id: 3,
    name: '欧元',
  },
  {
    id: 4,
    name: '日元',
  },
  {
    id: 5,
    name: '韩元',
  },
  {
    id: 6,
    name: '英镑',
  },
  {
    id: 7,
    name: '卢布',
  },
];
export const EnterpriseContentList = (
  disabled: boolean,
  mag: boolean,
  pickstyle: string,
  areaData: any[],
  fileList: any,
  showDate: any,
  previewVisible: boolean,
  removetem: (e: string) => void,
  uploadImage?: (e: any) => void,
  getDate?: (e: any) => void,
  setDate?: (e: any) => void,
  showdetail?: string,
  setarea?: (e: any, b: any) => void,
) => {
  console.log(showDate, '8888');
  let spanRe: any;
  if (!showdetail)
    spanRe = (
      <span
        style={{
          color: '#ED5555',
          marginRight: '5px',
        }}
      >
        *
      </span>
    );
  return [
    {
      name: <span>{spanRe} 企业名称</span>,
      type: 'input',
      title: 'orgName',
      classNames: 'oneName',
      disabled: true,
      placeholder: '请输入',
      require: [
        { required: true, message: '请输入企业名称' },
        { max: 200, message: '最多可输入200个字符' },
      ],
      label: (
        <Input disabled={disabled} placeholder='企业名称' maxLength={200} />
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          企业性质（营业执照）
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'enterpriseCharacter',
      disabled: true,
      placeholder: '请输入',
      require: [
        { required: true, message: '请输入企业性质（营业执照）' },
        { max: 100, message: '最多可输入100个字符' },
      ],
      label: (
        <Input
          disabled={disabled}
          placeholder='企业性质（营业执照）'
          maxLength={100}
        />
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          所属行业
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'industry',
      disabled: true,
      placeholder: '请输入',
      require: [
        { required: true, message: '请输入所属行业' },
        { max: 100, message: '最多可输入100个字符' },
      ],
      label: (
        <Input disabled={disabled} placeholder='所属行业' maxLength={100} />
      ),
    },

    {
      name: (
        <span>
          {spanRe}
          统一社会信用代码
        </span>
      ),
      type: 'input',
      title: 'creditCode',
      disabled: true,
      placeholder: '请输入',
      label: (
        <Input
          disabled={disabled}
          placeholder='统一社会信用代码'
          maxLength={18}
          minLength={15}
        />
      ),
      classNames: 'oneName',
      require: [
        { required: true, message: '请输入统一社会信用代码' },
        {
          pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/,
          message: '请输入统一社会信用代码',
        },
      ],
    },
    {
      name: (
        <span>
          {spanRe}
          注册资本币种
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'registeredCapitalCurrency',
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请选择注册资本币种' }],
      label: (
        <Select disabled={disabled} placeholder='注册资本币种'>
          {getCurrency.map((item: any, index: number) => {
            return (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          注册资本（万元）
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'registeredCapital',
      disabled: true,
      placeholder: '请输入',
      require: [
        { required: true, message: '请输入注册资本' },
        //@ts-ignore
        () => ({
          //@ts-ignore
          validator(_, value) {
            if (Number(value) > Number(999999999999999.9999) === false) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('最大可输入999999999999999!'));
          },
        }),
      ],
      label: (
        <Input
          disabled={disabled}
          type={'number'}
          min={1}
          max={999999999999999.9999}
          placeholder='注册资本（万元）'
        />
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          成立日期
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'foundDate',
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请选择成立日期' }],
      label: (
        <DatePicker
          disabled={disabled}
          placeholder='成立日期'
          className={style.datepicker}
        />
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          经营期限
        </span>
      ),
      type: 'input',
      title: 'operationPeriodType',
      disabled: true,
      placeholder: '请输入',
      classNames: 'twoName',
      require: mag ? [] : [{ required: true, message: '请选择经营期限' }],
      label: (
        <div className={style.management}>
          <Form.Item
            name='operationPeriod'
            className={style.pickstyleComon}
            style={{
              display: 'inline-block',
              marginBottom: '0px',
            }}
          >
            <DatePicker
              disabled={
                disabled ? disabled : showDate === '禁用' ? true : false
              }
              format={'YYYY-MM-DD'}
              placeholder='经营期限'
              onChange={(e, b) => {
                if (getDate) getDate(b);
              }}
            />
          </Form.Item>
          <Form.Item className={style.check}>
            <Checkbox
              disabled={disabled}
              checked={mag}
              onChange={e => {
                if (setDate) {
                  setDate(e.target.checked);
                }
              }}
            >
              无固定期限
            </Checkbox>
          </Form.Item>
        </div>
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          经营范围
        </span>
      ),
      type: 'input',
      title: 'businessScope',
      disabled: true,
      placeholder: '请输入',
      classNames: 'threeName',
      require: [
        { required: true, message: '请输入经营范围' },
        { max: 1000, message: '最多可输入1000个字符' },
      ],
      label: (
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          disabled={disabled}
          placeholder='经营范围'
          maxLength={1000}
        />
      ),
    },
    {
      name: (
        <span>
          {spanRe}
          注册地址
        </span>
      ),
      type: 'select',
      title: 'regAreaCode',
      classNames:
        window.location.pathname === '/business-infor/list/detail' ||
        window.location.pathname === '/auth/org/detail'
          ? 'threeName'
          : 'oneName',
      label: (
        <Cascader
          disabled={disabled}
          placeholder='注册地址'
          options={areaData}
          fieldNames={{
            value: 'code',
            label: 'name',
            children: 'children',
          }}
          onChange={(e: any) => {
            if (setarea) {
              console.log(e.length);
              setarea('regAreaCode', e.length < 3 ? [] : e);
            }
          }}
          // changeOnSelect
          // showSearch={false}
        />
      ),
      disabled: true,
      placeholder: '所在地区',
      require: [{ required: true, message: '请选择所属地区' }],
      childLabel: 'regAddress',
    },
    {
      name: ' ',
      type: 'input',
      title: 'regAddress',
      label: (
        <Input disabled={disabled} placeholder='详细地址' maxLength={100} />
      ),
      disabled: true,
      classNames: 'twoName',
      placeholder: '请输入',
      require: [{ required: true, message: '请输入详细地址' }],
    },
    {
      name: (
        <span>
          {spanRe}
          通讯地址
        </span>
      ),
      type: 'select',
      title: 'produceAreaCode',
      classNames:
        window.location.pathname === '/business-infor/list/detail' ||
        window.location.pathname === '/auth/org/detail'
          ? 'threeName'
          : 'oneName',
      label: (
        <Cascader
          disabled={disabled}
          placeholder='通讯地址'
          options={areaData}
          fieldNames={{
            value: 'code',
            label: 'name',
            children: 'children',
          }}
          onChange={(e: any) => {
            if (setarea) {
              setarea('produceAreaCode', e.length < 3 ? [] : e);
            }
          }}
          // changeOnSelect
          // showSearch={false}
        />
      ),
      disabled: true,
      placeholder: '通讯地址',
      require: [{ required: true, message: '请选择所属地区' }],
      childLabel: 'regAddress',
    },
    {
      name: ' ',
      type: 'input',
      title: 'produceAddress',
      label: (
        <Input disabled={disabled} placeholder='详细地址' maxLength={100} />
      ),
      disabled: true,
      classNames: 'twoName',
      placeholder: '请输入',
      require: [{ required: true, message: '请输入详细地址' }],
    },
    {
      name: (
        <span>
          {spanRe}
          法定代表人姓名
        </span>
      ),
      type: 'input',
      classNames: 'oneName',
      title: 'legalRepresentative',
      label: (
        <Input
          disabled={disabled}
          placeholder='法定代表人姓名'
          maxLength={50}
        />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请输入法定代表人' }],
    },
    {
      name: (
        <span>
          {spanRe}
          法人证件类型
        </span>
      ),
      type: 'input',
      title: 'legalRepresentativeIdType',
      label: (
        <Select disabled={disabled} placeholder='法人证件类型'>
          <Option value={1}>身份证</Option>
          <Option value={2}>护照</Option>
        </Select>
      ),
      disabled: true,
      classNames: 'oneName',
      placeholder: '请输入',
      require: [{ required: true, message: '请选择法人证件类型' }],
    },
    {
      name: (
        <span>
          {spanRe}
          法人证件号码
        </span>
      ),
      type: 'input',
      title: 'legalRepresentativeIdNo',
      label: (
        <Input disabled={disabled} placeholder='法人证件号码' maxLength={50} />
      ),
      disabled: true,
      placeholder: '请输入',
      classNames: 'oneName',
      require: [{ required: true, message: '请输入法人证件号码' }],
    },
    {
      name: (
        <span>
          {spanRe}
          登记机关
        </span>
      ),
      type: 'input',
      title: 'registrationAuthority',
      classNames: 'oneName',
      label: (
        <Input disabled={disabled} placeholder='登记机关' maxLength={100} />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请输入登记机关' }],
    },
    {
      name: (
        <span>
          {spanRe}
          开户行
        </span>
      ),
      type: 'input',
      title: 'depositBank',
      classNames: 'oneName',
      label: <Input disabled={disabled} placeholder='开户行' maxLength={100} />,
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请输入开户行' }],
    },
    {
      name: (
        <span>
          {spanRe}
          开户账号
        </span>
      ),
      type: 'input',
      title: 'bankAccount',
      classNames: 'oneName',
      label: (
        <Input disabled={disabled} placeholder='开户账号' maxLength={50} />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请输入开户账号' }],
    },
    {
      name: (
        <span>
          {spanRe}
          开户省市
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'depositBankAreaCode',
      label: (
        <Cascader
          disabled={disabled}
          placeholder='开户省市'
          options={areaData}
          fieldNames={{
            value: 'code',
            label: 'name',
            children: 'children',
          }}
          onChange={(e: any) => {
            if (setarea) {
              setarea('depositBankAreaCode', e.length < 3 ? [] : e);
            }
          }}
          // changeOnSelect
          // showSearch={false}
        />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请选择开户省市' }],
    },
    {
      name: (
        <span>
          {spanRe}
          开户行地址
        </span>
      ),
      type: 'input',
      title: 'depositBankAddress',
      label: (
        <Input disabled={disabled} placeholder='开户行地址' maxLength={100} />
      ),
      disabled: true,
      classNames: 'twoName',
      placeholder: '请输入',
      require: [{ required: true, message: '请输入开户行地址' }],
    },
    {
      name: (
        <span>
          {spanRe}
          联系人
        </span>
      ),
      type: 'input',
      title: 'contactName',
      classNames: 'oneName',
      disabled: true,
      placeholder: '请输入',
      label: <Input disabled={disabled} placeholder='联系人' maxLength={50} />,
      require: [
        { required: true, message: '请输入联系人' },
        { max: 50, message: '最多可输入50个字符' },
      ],
    },
    {
      name: (
        <span>
          {spanRe}
          联系电话
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'contactMobile',
      disabled: true,
      placeholder: '请输入',
      maxLength: 11,
      minLength: 0,
      label: (
        <Input
          disabled={disabled}
          placeholder='联系电话'
          maxLength={13}
          minLength={5}
        />
      ),
      require: [
        { required: true, message: '请输入联系电话' },
        {
          min: 5,
          message: `联系电话格式不正确`,
        },
      ],
    },
    {
      name: (
        <span>
          {spanRe}
          电子邮箱
        </span>
      ),
      classNames: 'oneName',
      type: 'input',
      title: 'contactEmail',
      label: (
        <Input type={'email'} disabled={disabled} placeholder='联系电话' />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [
        { required: true, message: '请输入电子邮箱' },
        {
          type: 'email',
          message: '电子邮箱不正确',
        },
      ],
    },
    {
      name: (
        <span>
          {spanRe}
          联系人联系地址
        </span>
      ),
      type: 'input',
      title: 'contactAreaCode',
      classNames:
        window.location.pathname === '/business-infor/list/detail' ||
        window.location.pathname === '/auth/org/detail'
          ? 'threeName'
          : 'oneName',
      label: (
        <Cascader
          disabled={disabled}
          placeholder='联系人联系地址'
          options={areaData}
          fieldNames={{
            value: 'code',
            label: 'name',
            children: 'children',
          }}
          onChange={(e: any) => {
            if (setarea) {
              setarea('contactAreaCode', e.length < 3 ? [] : e);
            }
          }}
          // changeOnSelect
          // showSearch={false}
        />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [{ required: true, message: '请选择所属地区' }],
    },
    {
      name: ' ',
      type: 'input',
      title: 'contactAddress',
      label: (
        <Input disabled={disabled} placeholder='详细地址' maxLength={100} />
      ),
      disabled: true,
      classNames: 'twoName',
      placeholder: '请输入',
      require: [{ required: true, message: '请输入详细地址' }],
    },
    {
      name: (
        <span>
          {spanRe}
          企业特征
        </span>
      ),
      require: [{ required: true, message: '请输入企业特征' }],
      type: 'input',
      title: 'enterpriseCharacteristic',
      classNames: 'oneName',
      label: (
        <Input disabled={disabled} placeholder='企业特征' maxLength={100} />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '从业人数',
      type: 'input',
      classNames: 'oneName',
      title: 'employeeNumber',
      label: (
        <Input
          type={'number'}
          max={9999999}
          min={1}
          disabled={disabled}
          placeholder='从业人数'
        />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '实际控制人',
      type: 'input',
      classNames: 'oneName',
      title: 'actualController',
      label: (
        <Input disabled={disabled} placeholder='实际控制人' maxLength={50} />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '核准日期（核准设立）',
      type: 'input',
      title: 'approvalDate',
      classNames: 'oneName',
      label: (
        <DatePicker
          disabled={disabled}
          placeholder='核准日期（核准设立）'
          className={style.datepicker}
        />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '传真/电话',
      type: 'input',
      classNames: 'oneName',
      title: 'fax',
      label: (
        <Input
          disabled={disabled}
          placeholder='传真/电话'
          minLength={5}
          maxLength={13}
        />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '企业邮箱',
      type: 'input',
      title: 'enterpriseEmail',
      classNames: 'oneName',
      label: (
        <Input disabled={disabled} placeholder='企业邮箱' type={'email'} />
      ),
      disabled: true,
      placeholder: '请输入',
      require: [
        { required: false, message: '请输入企业邮箱' },
        {
          type: 'email',
          message: '企业邮箱不正确',
        },
      ],
    },
    {
      name: '企业网址',
      type: 'input',
      title: 'enterpriseWebsite',
      classNames: 'threeName',
      label: (
        <Input disabled={disabled} placeholder='企业网址' maxLength={100} />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '主要产品或服务内容',
      type: 'input',
      title: 'mainProduct',
      classNames: 'threeName',
      label: (
        <Input
          disabled={disabled}
          placeholder='主要产品或服务内容'
          maxLength={500}
        />
      ),
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: '备注',
      type: 'input',
      title: 'remark',
      classNames: 'threeName',
      label: <Input disabled={disabled} placeholder='备注' maxLength={200} />,
      disabled: true,
      placeholder: '请输入',
    },
    {
      name: <span>{spanRe} 经营执照</span>,
      type: 'upload',
      title: 'businessLicense',
      classNames: 'twoName',
      require: [{ required: true, message: '请上传经营执照' }],
      label: (
        <div>
          <div className={style.pic}>
            <Upload
              disabled={disabled}
              className={style.picturecard}
              action={`${
                process?.env?.REACT_APP_API_URL
                  ? process.env.REACT_APP_API_URL
                  : ''
              }/file/system/file/uploadImg`}
              headers={{
                Authorization: getToken(),
              }}
              listType='picture-card'
              showUploadList={false}
              accept='image/*'
              maxCount={1}
              beforeUpload={(e: any) => {
                const reg = /\.(png|jpeg|jpg|PNG|JPEG|JPG)$/;
                const maxSize = 5 * 1024 * 1024;
                console.log(maxSize, e.size / 1024, 'e.size / 1024');
                if (e.size > maxSize && !reg.test(e.name)) {
                  VerifyUtils.Toast(
                    'info',
                    '上传仅支持 JPG、PNG格式，且不超过5M',
                  );
                  return false;
                }
                return true;
              }}
              onPreview={async file => {
                let src = file.url;
                if (!src) {
                  src = await new Promise(resolve => {
                    const reader = new FileReader();
                    // @ts-ignore
                    reader.readAsDataURL(file.originFileObj);
                    // @ts-ignore
                    reader.onload = () => resolve(reader.result);
                  });
                }
                if (removetem) removetem('查看');
              }}
              onRemove={e => {
                console.log(e);
                if (removetem) removetem('删除');
              }}
              onChange={uploadImage}
            >
              {fileList.length > 0 && fileList[0].url !== undefined ? (
                <div className={style.uploadimgpic}>
                  <img
                    src={fileList[0].url}
                    style={{ width: '138px', height: '80px' }}
                    className={style.picuplod}
                  ></img>
                  <div className={style.centericon}>
                    <div>
                      <IconFont
                        type='icon-icon-xianzhi'
                        style={{ marginRight: '32px', fontSize: '18px' }}
                        onClick={e => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          if (removetem) removetem('查看');
                        }}
                      />{' '}
                      <IconFont
                        type='icon-icon-shanshu-2'
                        style={{ fontSize: '18px' }}
                        onClick={e => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          if (removetem) removetem('删除');
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={style.picturecardant}>
                  <IconFont
                    type={'icon-icon-tianjia-1'}
                    style={{ fontSize: '18px', color: '#999999' }}
                  />
                  <div>上传图片</div>
                </div>
              )}
            </Upload>
            <span className={style.spanText}>
              支持.jpg、jpeg、.png格式，最大5M
            </span>
          </div>
          <Modal
            visible={previewVisible}
            title={'查看'}
            footer={null}
            onCancel={() => {
              if (removetem) removetem('查看');
            }}
          >
            {fileList.length > 0 ? (
              <img
                alt='example'
                style={{ width: '100%' }}
                src={fileList[0].url}
              />
            ) : (
              ''
            )}
          </Modal>
        </div>
      ),
      disabled: true,

      // require: [{ required: true, message: '经营执照不能为空' }],
    },
  ];
};
