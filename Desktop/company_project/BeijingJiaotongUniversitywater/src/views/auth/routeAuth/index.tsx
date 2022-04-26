// import { useMemo, useCallback, useEffect, useState, memo } from 'react'
import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { Card, Button, Modal, message, Spin } from 'antd';
import PageWrap from '../../components/PageWrap';
import TreeRoute from './TreeRotue';
import TreeAdd from './TreeAddOrEdit';
import TreeDetail from './TreeDetail';
import './index.less';
import { ApiTreeResult, TreeAddForm } from './service';
import { apiDeleteTreeList, apiGetTreeList } from '../../../api/api';
import Permission from '@/utils/permission';

const MenuButton = memo(
  ({
    Visible,
    changeAddVisible,
    onButtonClick,
  }: {
    Visible: boolean;
    onButtonClick: (type: string) => void;
    changeAddVisible: (state: boolean) => void;
  }) => (
    <div className='route-setButton'>
      <Permission flag='system:menu:remove'>
        <Button
          disabled={!Visible}
          type='primary'
          style={{ marginRight: '10px' }}
          onClick={() => onButtonClick('remove')}
        >
          删除权限
        </Button>
      </Permission>
      {/* CDEDIT02 */}
      <Permission flag='system:menu:edit'>
        <Button
          disabled={!Visible}
          style={{ marginRight: '10px' }}
          onClick={() => onButtonClick('edit')}
          type='primary'
        >
          编辑权限
        </Button>
      </Permission>
      <Permission flag='system:menu:add'>
        <Button
          onClick={() => {
            onButtonClick('add');
            changeAddVisible(true);
          }}
          type='primary'
        >
          新增权限
        </Button>
      </Permission>
    </div>
  ),
);

function RouteAuth() {
  const [checkVisible, setCheckVisible] = useState<boolean>(false);
  // 新增权限的表单
  const [addVisible, seAddVisible] = useState<boolean>(false);
  // 详情权限的表单
  const [detaileVisible, setDetaileVisible] = useState<boolean>(true);
  // 编辑权限的表单
  const [editVisible, setEditVisible] = useState<boolean>(false);
  // 当前选中的值
  const [checkTree, setCheckTree] = useState<string | number>('0-0');
  // 新增后要默认打开指定tree
  const [openTree, setOpenTree] = useState<Array<string | number>>(['0-0']);
  // 全局的loading
  const [loading, setLoading] = useState<boolean>(false);
  // tree的数据
  const [treeList, setTreeList] = useState<TreeAddForm>({
    id: 0,
    menuId: 0,
    value: 0,
    menuType: 'M',
    component_path: '67676',
    is_link: 'false',
    hidden: 'false',
    isFrame: 'false',
    visible: 'false',
    title: '企业碳减排账户管理系统',
    kind: 0,
    ident: '1',
    orderNum: 1,
    status: 'true',
    name: '企业碳减排账户管理系统',
    key: '0-0',
    children: [],
  });
  // 当前选中的tree
  const [checkTreeDetail, setCheckTreeDetail] = useState<TreeAddForm>(treeList);
  // 新增状态的回调
  const changeAddVisible = useCallback(
    (state: boolean) => {
      // 关闭详情显示
      setDetaileVisible(false);
      seAddVisible(state);
    },
    [seAddVisible],
  );
  // 详情的状态回调
  const changeDeatilVisible = useCallback(
    (state: boolean) => {
      setDetaileVisible(state);
    },
    [setDetaileVisible],
  );

  // 编辑状态下提交和取消都回到查看状态

  const showCheckButton = useCallback(() => {
    setCheckVisible(true);
  }, [setCheckVisible]);

  const closeCheckButton = useCallback(() => {
    setCheckVisible(false);
  }, [setCheckVisible]);

  const addTreeList = useCallback(
    (data: TreeAddForm) => {
      setTreeList(data);
    },
    [treeList],
  );

  // 根据返回的key 找到返回的那条树 给到查看详情组件
  const getTreeByKey = (key: string | number, tree: TreeAddForm) => {
    let backTree = tree;
    if (tree.key === `${key}`) {
      backTree = tree;
    } else {
      for (let i = 0; i < tree.children.length; i += 1) {
        if (backTree.key === key) {
          break;
        }
        backTree = getTreeByKey(key, tree.children[i]);
      }
    }
    return backTree;
  };

  // 根据返回的key 找到返回的那条树 给到查看详情组件
  const checkTreeFn = useCallback(
    (key: string | number) => {
      changeAddVisible(false);
      if (treeList) {
        const getTree: TreeAddForm = getTreeByKey(key, treeList);
        console.log(getTree, 'getTree=getTree');
        setCheckTreeDetail(getTree);
      }
      if (key) {
        seAddVisible(false);
        setEditVisible(false);
        changeDeatilVisible(true);
      } else {
        changeDeatilVisible(false);
      }
      setCheckTree(key);
    },
    [treeList],
  );

  // 根据生成的children树递归将key值填充进去
  const formatToTreeKey = (treeData: TreeAddForm[], parentTreekey: string) => {
    const toKeyTree = treeData;
    toKeyTree.forEach((keyTree, _index) => {
      const tree = keyTree;
      tree.status = `${tree.status ? tree.status : 0}`;
      tree.is_link = `${tree.is_link}`;
      tree.hidden = `${tree.hidden}`;
      tree.isFrame = `${tree.isFrame}`;
      tree.visible = `${tree.visible}`;
      if (!tree.key && parentTreekey) {
        tree.key = `${parentTreekey}-${_index + 1}`;
      }
      // console.log(tree, 'tree');
      if (tree.children) {
        formatToTreeKey(tree.children, tree.key);
      }
    });
  };

  const sortTreeByOrder = (arr: Array<TreeAddForm>) => {
    if (arr.length > 0) {
      arr.sort((obj1: TreeAddForm, obj2: TreeAddForm) => {
        const val = obj1.orderNum - obj2.orderNum;
        return val;
      });
    }
  };

  const formatToTree = (treeData: TreeAddForm[], key?: number | string) => {
    return treeData
      .filter(item => {
        const backF = item;
        if (!backF.parentId) {
          backF.parentId = 0;
        }
        return !key ? backF.parentId === 0 : backF.parentId === key;
      })
      .map(item => {
        const back = item;
        back.children = formatToTree(treeData, item.key);
        sortTreeByOrder(back.children);
        return back;
      });
  };
  // 根据后台接口参数，结构化当前的目录结构
  const initTreeStructure = (treeData: TreeAddForm[]) => {
    return formatToTree(treeData);
  };

  const initList = useCallback(async () => {
    const auth: TreeAddForm = {
      id: 0,
      menuId: 0,
      menuType: 'M',
      value: 0,
      component_path: '',
      is_link: 'false',
      hidden: 'false',
      isFrame: 'false',
      visible: 'false',
      title: '企业碳减排账户管理系统',
      kind: 0,
      ident: '1',
      orderNum: 1,
      status: 'true',
      name: '企业碳减排账户管理系统',
      key: '0-0',
      children: [],
    };
    setLoading(true);
    try {
      const data = await apiGetTreeList<ApiTreeResult>({ status: '' });
      auth.children = initTreeStructure(data.data.data);
      sortTreeByOrder(auth.children);
      // 将每条数据加上0-0-x..的关系
      formatToTreeKey(auth.children, '0');
    } catch (err) {
      message.error('初始化失败，接口返回异常');
    } finally {
      setLoading(false);
    }
    setTreeList(auth);
  }, [setTreeList]);

  const onRemove = () => {
    Modal.confirm({
      title: '系统提示',
      content:
        checkTreeDetail.children.length > 0
          ? '此操作将永久删除该权限,同时也删除下级权限, 是否继续?'
          : '此操作将永久删除该权限, 是否继续?',
      async onOk() {
        try {
          const { data } = await apiDeleteTreeList({
            key: checkTreeDetail.key,
          });
          if (data.code === 500) {
            message.error(data.msg);
          } else {
            message.success('删除成功！');
          }

          initList();
          setCheckTree('0-0');
        } catch (err) {
          message.error('删除失败，接口返回异常');
        }
      },
    });
  };

  const onButtonClick = (type: string) => {
    if (type === 'remove') {
      onRemove();
    } else if (type === 'edit') {
      setDetaileVisible(false);
      seAddVisible(false);
      setEditVisible(true);
    } else {
      setDetaileVisible(false);
      seAddVisible(true);
      setEditVisible(false);
    }
  };

  const getAddOrEditTeml = useMemo(() => {
    if (addVisible || editVisible) {
      return true;
    }
    return false;
  }, [addVisible, editVisible]);
  const changeFindState = useCallback(() => {
    seAddVisible(false);
    setEditVisible(false);
    changeDeatilVisible(true);
    initList();
  }, []);
  const addCanCelFn = () => {
    seAddVisible(false);
    setEditVisible(false);
    changeDeatilVisible(true);
    initList();
    // setDetaileVisible(false);
  };
  useEffect(() => {
    initList();
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '10px',
        display: 'flex',
        flex: '1',
      }}
    >
      <PageWrap>
        <Spin spinning={loading}>
          <div className='route-admin-main'>
            <div className='route-admin-tree'>
              <MenuButton
                Visible={checkVisible}
                changeAddVisible={changeAddVisible}
                onButtonClick={onButtonClick}
              />
              <div className='route-admin-tree-card'>
                <Card>
                  <TreeRoute
                    treeList={treeList}
                    openTree={openTree}
                    setOpenTree={setOpenTree}
                    checkTree={checkTree}
                    setCheckTree={checkTreeFn}
                    checkVisible={checkVisible}
                    showCheckButton={showCheckButton}
                    closeCheckButton={closeCheckButton}
                  />
                </Card>
              </div>
            </div>
            <div className='route-admin-detail'>
              {/* {JSON.stringify(getAddOrEditTeml)}=getAddOrEditTeml */}
              {getAddOrEditTeml && (
                <TreeAdd
                  checkTree={checkTree}
                  showCheckButton={showCheckButton}
                  setOpenTree={setOpenTree}
                  setCheckTree={checkTreeFn}
                  changeFindState={changeFindState}
                  editVisible={editVisible}
                  checkTreeDetail={checkTreeDetail}
                  addVisible={addVisible}
                  treeList={treeList}
                  addTreeList={addTreeList}
                  addCanCelFn={addCanCelFn}
                />
              )}
              {detaileVisible && (
                <TreeDetail checkTreeDetail={checkTreeDetail} />
              )}
            </div>
          </div>
        </Spin>
      </PageWrap>
    </div>
  );
}
export default RouteAuth;
