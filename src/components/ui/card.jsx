// components/ui/Card.jsx
export const Card = ({ children, className }) => (
    <div className={`bg-white shadow rounded-lg p-4 ${className || ''}`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className }) => (
    <div className={`border-b pb-2 mb-4 ${className || ''}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
    <div className={`text-gray-700 ${className || ''}`}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
    <h3 className={`text-lg font-semibold ${className || ''}`}>{children}</h3>
);
