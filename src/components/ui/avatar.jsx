// components/ui/Avatar.jsx
export const Avatar = ({ src, alt, className, fallback }) => (
    <div className={`flex items-center justify-center rounded-full bg-gray-300 ${className || ''}`} style={{ width: '40px', height: '40px' }}>
        {src ? (
            <img src={src} alt={alt || 'Avatar'} loading='lazy' className="object-cover rounded-full" />
        ) : (
            <span className="text-sm font-medium text-gray-700">{fallback}</span>
        )}
    </div>
);
