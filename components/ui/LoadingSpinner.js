function LoadingSpinner({ size = 'md', color = 'primary', className = '' }) {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-primary/20 border-t-primary',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-300 border-t-gray-700'
  };

  return (
    <div className={`${className} flex justify-center items-center`} data-id="jj1tevoar" data-path="components/ui/LoadingSpinner.js">
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          rounded-full animate-spin
        `} data-id="4f2bmqo9d" data-path="components/ui/LoadingSpinner.js" />

    </div>);

}