import { memo, ReactNode } from 'react';

interface FormWrapProps {
  children: ReactNode;
  className?: string;
  style?: {};
}

function FormWrap({ children, className, style }: FormWrapProps) {
  return (
    <div
      className={className}
      style={{
        width: '1000px',
        margin: '60px auto 80px',
        padding: '30px',
        background: '#ffffff',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default memo(FormWrap);
