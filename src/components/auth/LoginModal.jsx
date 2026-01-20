import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PhoneInput } from './PhoneInput';
import { OTPInput } from './OTPInput';
import { Button } from '../ui';
import { cn } from '../../utils';

const STEPS = {
  PHONE: 'phone',
  OTP: 'otp',
};

/**
 * Login Modal with Phone OTP authentication
 */
export function LoginModal({ isOpen, onClose, onSuccess }) {
  const { sendOTP, verifyOTP } = useAuth();

  const [step, setStep] = useState(STEPS.PHONE);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [maskedPhone, setMaskedPhone] = useState('');

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(STEPS.PHONE);
      setPhone('');
      setOtp('');
      setError(null);
      setIsLoading(false);
      setResendTimer(0);
    }
  }, [isOpen]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle send OTP
  const handleSendOTP = useCallback(async () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await sendOTP(phone);
      setMaskedPhone(result.data.phone);
      setStep(STEPS.OTP);
      setResendTimer(30); // 30 second cooldown
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [phone, sendOTP]);

  // Handle verify OTP
  const handleVerifyOTP = useCallback(async (otpValue) => {
    if (otpValue.length !== 6) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await verifyOTP(phone, otpValue);
      onSuccess?.(result.data);
      onClose();
    } catch (err) {
      setError(err.message);
      setOtp(''); // Clear OTP on error
    } finally {
      setIsLoading(false);
    }
  }, [phone, verifyOTP, onSuccess, onClose]);

  // Handle resend OTP
  const handleResendOTP = useCallback(async () => {
    if (resendTimer > 0) return;

    setError(null);
    setIsLoading(true);

    try {
      await sendOTP(phone);
      setResendTimer(30);
      setOtp('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [phone, sendOTP, resendTimer]);

  // Go back to phone step
  const handleBack = () => {
    setStep(STEPS.PHONE);
    setOtp('');
    setError(null);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full max-w-md bg-white rounded-2xl shadow-2xl',
              'overflow-hidden'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cream-200">
              <div className="flex items-center gap-3">
                {step === STEPS.OTP && (
                  <button
                    onClick={handleBack}
                    className="p-1 rounded-full hover:bg-cream-100 transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5 text-charcoal-600" />
                  </button>
                )}
                <h2 className="text-lg font-display font-semibold text-charcoal-900">
                  {step === STEPS.PHONE ? 'Login / Sign Up' : 'Verify Phone'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-cream-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-charcoal-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === STEPS.PHONE ? (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Brand message */}
                    <div className="text-center">
                      <p className="text-charcoal-600">
                        Enter your phone number to continue
                      </p>
                    </div>

                    {/* Phone input */}
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      onSubmit={handleSendOTP}
                      disabled={isLoading}
                      error={error}
                      autoFocus
                    />

                    {/* Submit button */}
                    <Button
                      variant="gold"
                      size="lg"
                      fullWidth
                      onClick={handleSendOTP}
                      disabled={phone.length !== 10 || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Sending OTP...
                        </>
                      ) : (
                        'Get OTP'
                      )}
                    </Button>

                    {/* Terms */}
                    <p className="text-xs text-center text-charcoal-500">
                      By continuing, you agree to our{' '}
                      <a href="/terms" className="text-gold-600 hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" className="text-gold-600 hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Info */}
                    <div className="text-center">
                      <p className="text-charcoal-600">
                        We've sent a 6-digit code to
                      </p>
                      <p className="font-semibold text-charcoal-900 mt-1">
                        {maskedPhone}
                      </p>
                    </div>

                    {/* OTP input */}
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      onComplete={handleVerifyOTP}
                      disabled={isLoading}
                      error={error}
                      autoFocus
                    />

                    {/* Verify button */}
                    <Button
                      variant="gold"
                      size="lg"
                      fullWidth
                      onClick={() => handleVerifyOTP(otp)}
                      disabled={otp.length !== 6 || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        'Verify & Continue'
                      )}
                    </Button>

                    {/* Resend OTP */}
                    <div className="text-center">
                      <p className="text-sm text-charcoal-500">
                        Didn't receive the code?{' '}
                        {resendTimer > 0 ? (
                          <span className="text-charcoal-600">
                            Resend in {resendTimer}s
                          </span>
                        ) : (
                          <button
                            onClick={handleResendOTP}
                            disabled={isLoading}
                            className="text-gold-600 hover:underline font-medium disabled:opacity-50"
                          >
                            Resend OTP
                          </button>
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default LoginModal;
