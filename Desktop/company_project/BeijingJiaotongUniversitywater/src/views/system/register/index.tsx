/**
 * @file 注册页
 */
import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '@/store';

import { Tag, Button } from 'antd';
import FormWrap from '../component/FormWrap';
import style from './style.module.scss';
import CompanyInfo from './component/companyInfo';
import CompanyInfoExamine from './component/companyInfoExamine';
import CompanyInfoEdit from './component/companyInfoEdit';
import { apiSystemOrgDetail } from './service';
import VerifyUtils from '@/utils/verifty';
// import { ifError } from 'assert';
// import { apiSystemOrgDetail } from '@/views/system/register/service';
function Register() {
  const history = useHistory();
  const { user } = store.getState();
  const [companyData, setcompanyData] = useState<{
    orgUpdateTime?: string;
    auditContent?: string;
  }>({
    orgUpdateTime: sessionStorage.getItem('userinfo')
      ? JSON.parse(sessionStorage.getItem('userinfo') as string).orgUpdateTime
      : '',
  });
  const resuleStr = new URLSearchParams(location.search).get('resule') || '';
  const apiSystemOrgDetailFn = async () => {};
  useEffect(() => {
    if (history.location.pathname.indexOf('result') >= 0) {
      apiSystemOrgDetailFn();
    }
    if (
      JSON.parse(sessionStorage.getItem('userinfo') as string) &&
      JSON.parse(sessionStorage.getItem('userinfo') as string).orgStatus !==
        null
    ) {
      apiSystemOrgDetail({
        id: JSON.parse(sessionStorage.getItem('userinfo') as string).orgId,
      }).then((res: any) => {
        if (res.data.code == 200) {
          setcompanyData({
            ...companyData,
            auditContent: res.data.data.auditContent || '--',
            orgUpdateTime: res.data.data.updateTime,
          });
        } else {
          VerifyUtils.Toast('info', res.data.msg);
        }
        console.log(res);
      });
    }
  }, []);
  const culCurrentPathName = () => {
    return ['exam', '/business-infor/list/detail'].some(
      item => history.location.pathname.indexOf(item) >= 0,
    );
  };
  const returnContent = () => {
    if (history.location.pathname.indexOf('/system/register') >= 0) {
      return <CompanyInfo />;
    }
    if (culCurrentPathName()) {
      return <CompanyInfoExamine />;
    }
    if (history.location.pathname.indexOf('business-infor/detail') >= 0) {
      return <CompanyInfoEdit />;
    }
    if (Number(resuleStr) === 1) {
      return (
        <>
          <h2 className={style.h2Text}>企业信息审核</h2>
          <h3 className={style.h3Text}>
            {user.orgName === null
              ? JSON.parse(sessionStorage.getItem('userinfo') as string).orgName
              : user.orgName}{' '}
            <Tag color='warning'>审核中</Tag>{' '}
          </h3>
          <p className={style.pText}>
            您已提交企业信息的审核申请，预计在1-2个工作日内完成审核。
          </p>
          <p className={style.pText}>
            提交时间：
            {companyData.orgUpdateTime}
          </p>
        </>
      );
    }
    if (Number(resuleStr) === 2) {
      return (
        <>
          <h2 className={style.h2Text}>企业信息审核</h2>
          <h3 className={style.h3Text}>
            {user.orgName} <Tag color='error'>审核不通过</Tag>{' '}
          </h3>
          <p className={style.pText}>
            您提交的企业信息审核未通过，可以编辑后再次提交审核。
            <span
              className={style.spanGreen}
              onClick={() => {
                history.push(`/system/register?type=edit`);
              }}
            >
              编辑企业信息
            </span>
          </p>
          <p>原因：{companyData.auditContent}</p>
          <p className={style.pText}>
            提交时间：
            {companyData.orgUpdateTime}
          </p>
        </>
      );
    }
    return <CompanyInfo />;
  };
  // if(history.location.pathname.indexOf())
  return (
    <>
      <FormWrap
        style={
          ['exam', 'detail'].some(
            item => history.location.pathname.indexOf(item) >= 0,
          )
            ? {
                width: '100%',
                margin: '0px',
                marginTop: '16px',
                minHeight: '716px',

                padding: '0px',
              }
            : {
                marginTop: '16px',
                minHeight: '685px',
              }
        }
      >
        {/* {JSON.stringify(areaData)}=areaData */}
        {returnContent()}
      </FormWrap>
      {culCurrentPathName() && (
        <div className={style.DraweBtn_fix}>
          {
            <>
              <Button
                onClick={() => {
                  history.go(-1);
                }}
              >
                返回
              </Button>
            </>
          }
        </div>
      )}
    </>
  );
}

export default memo(Register);
