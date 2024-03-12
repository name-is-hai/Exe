import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('w-full mx-auto max-w-8xl flex-col flex-1 px-8 py-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
