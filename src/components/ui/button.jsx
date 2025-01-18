// components/ui/Button.jsx
export const Button = ({ children, variant = 'default', className, ...props }) => {
    const baseStyles = 'py-2 px-4 rounded text-sm font-medium focus:outline-none';
    const variants = {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-200',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className || ''}`} {...props}>
            {children}
        </button>
    );
};
