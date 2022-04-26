import { TreeItemType } from '../service';

export interface TreeDetailProps {
  checkTreeDetail: TreeItemType;
}

interface TreeTypeKey {
  [key: string]: string;
}
const treeTypeDetail: TreeTypeKey = {
  P: '产品权限',
  M: '菜单权限',
  B: '按钮权限',
};

function TreeDetail(props: TreeDetailProps) {
  const { checkTreeDetail } = props;
  console.log(checkTreeDetail, 'checkTreeDetail=checkTreeDetail');
  return (
    <>
      <div className='detail-title'>权限详情</div>
      <div className='detail-lable'>
        <div className='detail-lable'>
          <span>权限类型：</span>
          <span className='lable-detail'>
            {checkTreeDetail.type && treeTypeDetail[checkTreeDetail.type]}
          </span>
        </div>
        <span>权限名称：</span>
        <span className='lable-detail'>{checkTreeDetail.permissionName}</span>
      </div>
      <div className='detail-lable'>
        <span>权限标识：</span>
        <span className='lable-detail'>{checkTreeDetail.perms}</span>
      </div>
      <div className='detail-lable'>
        <span>链接地址：</span>
        <span className='lable-detail'>
          {checkTreeDetail.path && checkTreeDetail.path}
        </span>
      </div>
      <div className='detail-lable'>
        <span>图标地址：</span>
        <span className='lable-detail'>
          {checkTreeDetail.icon && checkTreeDetail.icon}
        </span>
      </div>
      <div className='detail-lable'>
        <span>是否链接页面：</span>
        <span className='lable-detail'>
          {Number(checkTreeDetail.isFrame) ? '是' : '否'}
        </span>
      </div>
      <div className='detail-lable'>
        <span>启用/禁用：</span>
        <span className='lable-detail'>
          {Number(checkTreeDetail.status) ? '禁用' : '启用'}
        </span>
      </div>
      <div className='detail-lable'>
        <span>顺序：</span>
        <span className='lable-detail'>{checkTreeDetail.orderNum}</span>
      </div>
      <div className='detail-lable'>
        <span>备注：</span>
        <span className='lable-detail'>
          {checkTreeDetail.remark && checkTreeDetail.remark}
        </span>
      </div>
    </>
  );
}
export default TreeDetail;
