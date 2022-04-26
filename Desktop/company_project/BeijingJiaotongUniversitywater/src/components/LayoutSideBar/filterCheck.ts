function findId(
  data: [
    {
      path: string | null;
      key: null | number | string;
      parentId: number | null;
      menuType: string | null;
    },
  ],
  id: number | null,
) {
  let result;
  data.forEach(res => {
    if (res.key === id) {
      if (res.menuType === 'C') {
        result = res;
      } else {
        result = findId(data, res.parentId);
      }
    }
  });
  return result;
}
export const filterChaeck = (
  data: [
    {
      path: string | null;
      key: null | number | string;
      parentId: number | null;
      menuType: string | null;
    },
  ],
) => {
  const pathname =
    // eslint-disable-next-line use-isnan
    // eslint-disable-next-line no-restricted-globals
    isNaN(Number(window.location.pathname.split('/').pop()))
      ? window.location.pathname
      : window.location.pathname.split(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/${window.location.pathname.split('/').pop()}`,
        )[0];
  const check = data.filter((element: { path: string | null }) => {
    if (element.path === pathname) return true;
    return false;
  });
  if (check.length > 0 && check[0].menuType !== 'C') {
    let checkUrl = data.filter(
      (element: {
        path: string | null;
        key: null | number | string;
        menuType: string | null;
        // eslint-disable-next-line array-callback-return
      }) => {
        if (element.key === check[0].parentId && element.menuType === 'C')
          return true;
        return false;
      },
    );
    if (checkUrl.length === 0) {
      // @ts-ignore
      checkUrl = [findId(data, check[0].parentId)];
    }
    return checkUrl.length > 0 && checkUrl[0] !== undefined
      ? checkUrl[0].path
      : check[0].path;
  }
  return check.length > 0 ? check[0].path : pathname;
};
