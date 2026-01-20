import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';

/**
 * 6-digit OTP input with individual boxes
 */
export function OTPInput({
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = null,
  autoFocus = false,
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  const digits = value.split('').concat(Array(6 - value.length).fill(''));

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Focus next input when digit entered
  useEffect(() => {
    if (value.length === 6) {
      onComplete?.(value);
    }
  }, [value, onComplete]);

  const handleChange = (index, e) => {
    const inputValue = e.target.value;

    // Handle paste
    if (inputValue.length > 1) {
      const pastedDigits = inputValue.replace(/\D/g, '').slice(0, 6);
      onChange?.(pastedDigits);
      if (pastedDigits.length === 6) {
        inputRefs.current[5]?.focus();
      } else {
        inputRefs.current[pastedDigits.length]?.focus();
      }
      return;
    }

    // Handle single digit
    const digit = inputValue.replace(/\D/g, '');
    if (digit) {
      const newValue = value.slice(0, index) + digit + value.slice(index + 1);
      onChange?.(newValue.slice(0, 6));

      // Move to next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (digits[index]) {
        // Clear current digit
        const newValue = value.slice(0, index) + value.slice(index + 1);
        onChange?.(newValue);
      } else if (index > 0) {
        // Move to previous input and clear
        const newValue = value.slice(0, index - 1) + value.slice(index);
        onChange?.(newValue);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index) => {
    setActiveIndex(index);
    // Select all text in the input
    inputRefs.current[index]?.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedDigits = pastedText.replace(/\D/g, '').slice(0, 6);
    onChange?.(pastedDigits);

    if (pastedDigits.length === 6) {
      inputRefs.current[5]?.focus();
    } else {
      inputRefs.current[pastedDigits.length]?.focus();
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-charcoal-700 mb-2">
        Enter Verification Code
      </label>

      <div className="flex gap-2 sm:gap-3 justify-center">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              'w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold',
              'border rounded-lg transition-all',
              'focus:outline-none focus:ring-2',
              activeIndex === index
                ? 'border-gold-500 ring-2 ring-gold-500/20'
                : 'border-charcoal-200',
              error
                ? 'border-coral-500 ring-2 ring-coral-500/20'
                : '',
              disabled
                ? 'bg-cream-100 opacity-60 cursor-not-allowed'
                : 'bg-white',
              digit ? 'text-charcoal-900' : 'text-charcoal-400'
            )}
            aria-label={`Digit ${index + 1} of 6`}
            aria-invalid={!!error}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-center text-sm text-coral-500 mt-2" role="alert">
          {error}
        </p>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center gap-1 mt-3">
        {digits.map((digit, index) => (
          <div
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              digit ? 'bg-gold-500' : 'bg-charcoal-200'
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default OTPInput;
