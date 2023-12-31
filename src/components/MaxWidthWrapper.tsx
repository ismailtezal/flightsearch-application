import { ReactNode } from 'react';

type MaxWidthWrapperProps = {
    children: ReactNode;
    className?: string;
};

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ children, className }) => {
    return (
        <div className={`max-w-full bg-blue-500 h-screen drop-shadow-2xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
