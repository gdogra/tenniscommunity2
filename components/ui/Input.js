function Input({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error = null,
  className = '',
  helpText = '',
  disabled = false,
  min,
  max,
  step,
  icon = null
}) {
  return (
    <div className={`mb-4 ${className}`} data-id="vs1722r8f" data-path="components/ui/Input.js">
      {label &&
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1" data-id="az3mho0gv" data-path="components/ui/Input.js">

          {label}
          {required && <span className="text-red-500 ml-1" data-id="ymwgwh2tw" data-path="components/ui/Input.js">*</span>}
        </label>
      }
      
      <div className="relative" data-id="xl8og6sxq" data-path="components/ui/Input.js">
        {icon &&
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="d4s0q7pid" data-path="components/ui/Input.js">
            {icon}
          </div>
        }
        
        <input
          id={id}
          name={id}
          type={type}
          className={`
            block w-full rounded-md 
            ${icon ? 'pl-10' : 'pl-4'} 
            py-2 pr-4 
            border ${error ? 'border-red-500' : 'border-gray-300'} 
            focus:outline-none focus:ring-primary focus:border-primary
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'text-red-500' : ''}
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step} data-id="qheftqd7z" data-path="components/ui/Input.js" />

      </div>
      
      {helpText && !error &&
      <p className="mt-1 text-sm text-gray-500" data-id="z3m52xaf9" data-path="components/ui/Input.js">{helpText}</p>
      }
      
      {error &&
      <p className="mt-1 text-sm text-red-500" data-id="i23o866s1" data-path="components/ui/Input.js">{error}</p>
      }
    </div>);

}