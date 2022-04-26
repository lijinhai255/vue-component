import { Tree } from 'antd';
import { Key } from 'react';
import { TreeAddForm } from './service';

export interface TreeRouteProps {
  setDefaultCheckedTreeKey?: (keys: string[]) => void;
  setDefaultCheckedTreeIds?: (ids: number[]) => void;
  defaultCheckedTreeIds?: number[];
  defaultCheckedTree?: string[];
  checkVisible?: boolean;
  checkableState?: boolean; // 是否显示可选中
  openTree: Array<string | number>; // 当前打开的tree
  treeList: TreeAddForm;
  checkTree: string | number;
  setCheckTree: (data: string | number) => void;
  setOpenTree: (data: Array<string | number>) => void;
  showCheckButton?: () => void;
  closeCheckButton?: () => void;
}

function TreeRoute(props: TreeRouteProps) {
  const {
    setDefaultCheckedTreeKey,
    setDefaultCheckedTreeIds,
    defaultCheckedTree,
    checkableState,
    treeList,
    checkTree,
    openTree,
    setOpenTree,
    setCheckTree,
    showCheckButton,
    closeCheckButton,
  } = props;
  const onSelect = (selectedKeys: Key[], info: any) => {
    if (selectedKeys.length > 0 && info.node.key !== '0-0' && showCheckButton) {
      showCheckButton();
    } else if (closeCheckButton) {
      closeCheckButton();
    }
    // 将当前选中的key返回出去
    setCheckTree(selectedKeys[0]);
  };
  const onExpand = (expandedKeys: Array<string | number>) => {
    setOpenTree(expandedKeys);
  };
  // 递归当前的树 找到所有符合的Id
  const fromIdBykey = (
    keys: string[],
    tree: TreeAddForm[],
    ids: number[] = [],
  ) => {
    tree.forEach(item => {
      if (keys.includes(item.key)) {
        ids.push(item.id);
      }
      fromIdBykey(keys, item.children, ids);
    });
    return ids;
  };
  // 根据Key获取到所有的Id
  const getIdByKey = (keys: string[] = [], tree: TreeAddForm[]) => {
    const getId = fromIdBykey(keys, tree, []);
    return getId;
  };
  const onCheck = (
    checkedKeys: any,
    info: { checkedNodes: any[]; halfCheckedKeys?: any[] },
  ) => {
    if (setDefaultCheckedTreeKey) {
      setDefaultCheckedTreeKey(checkedKeys);
    }
    if (setDefaultCheckedTreeIds) {
      const getNewIds: number[] = info.checkedNodes.map(
        (item: TreeAddForm) => item.id,
      );
      const ids = [
        ...getNewIds,
        ...getIdByKey(info.halfCheckedKeys, treeList.children),
      ];
      setDefaultCheckedTreeIds(ids);
    }
  };

  return (
    <>
      <Tree
        onCheck={onCheck}
        checkable={checkableState}
        defaultCheckedKeys={['0-0']}
        defaultSelectedKeys={[checkTree]}
        expandedKeys={openTree}
        selectedKeys={[checkTree]}
        checkedKeys={defaultCheckedTree}
        onSelect={onSelect}
        treeData={[treeList]}
        onExpand={onExpand}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      />
    </>
  );
}
export default TreeRoute;
