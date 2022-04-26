import { FC, ReactFragment } from 'react';
import { useHistory } from 'react-router-dom';

interface ReturnUploadType {
  children?: ReactFragment;
}
const ReturnUpload: FC<ReturnUploadType> = ({ children }) => {
  const history = useHistory();
  const returnChildFn = () => {
    if (history.location.pathname.indexOf('monitor') >= 0) {
      return <>{children}</>;
    }

    return <div>{children}</div>;
  };
  return returnChildFn();
};

export default ReturnUpload;
