import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronDown, ShieldCheck, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { sendFormNotification, NOTIFICATION_EMAIL } from '../utils/formSubmit';

export const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    studyLevel: '',
    studyField: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { percent: 0, text: 'At least 8 characters', color: 'bg-gray-200', textColor: 'text-gray-500' };
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[a-z]/.test(pwd)) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;

    if (score <= 25) {
      return { percent: 25, text: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
    } else if (score <= 50) {
      return { percent: 50, text: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    } else if (score <= 75) {
      return { percent: 75, text: 'Good', color: 'bg-blue-500', textColor: 'text-blue-500' };
    } else {
      return { percent: 100, text: 'Strong', color: 'bg-green-500', textColor: 'text-green-500' };
    }
  };

  const strength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.confirmPassword.length === 0 ||
    formData.password === formData.confirmPassword;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Passwords do not match. Please correct the errors before submitting.',
      });
      return;
    }

    if (formData.password.length < 8) {
      setAlert({
        type: 'error',
        message: 'Password must be at least 8 characters long.',
      });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      // Send sign-up notification to ah5439460@gmail.com
      await sendFormNotification('New Student Account Registration - AussiePath Education', {
        'Account Type': 'Student Applicant',
        'Full Name': formData.fullName,
        'Email Address': formData.email,
        'Phone Number': formData.phone,
        'Country of Residence': formData.country || 'Not specified',
        'Preferred Study Level': formData.studyLevel || 'Not specified',
        'Intended Study Field': formData.studyField || 'Not specified',
        'Terms Accepted': formData.terms ? 'Agreed' : 'No',
        'Status': 'Account Created / Confirmation Sent',
      });

      setAlert({
        type: 'success',
        message: `Account created successfully! A confirmation notice has been delivered to ${NOTIFICATION_EMAIL}. You can now sign in.`,
      });

      // Clear sensitive fields
      setFormData((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
    } catch {
      setAlert({
        type: 'error',
        message: 'Error processing registration. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-brand-bg">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-navy mb-2">
              Start Your Australian Education Journey
            </h1>
            <p className="text-brand-slate text-sm">
              Create an account to save your preferences and track your applications.
            </p>
          </div>

          {/* Alert Component */}
          {alert && (
            <div
              className={`mb-6 p-4 rounded-lg border text-sm flex items-start ${
                alert.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : alert.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              {alert.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 mr-2 shrink-0 mt-0.5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
              )}
              <span>{alert.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-brand-navy">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-brand-navy">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-brand-navy">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="country" className="block text-sm font-medium text-brand-navy">
                  Country of Residence
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 appearance-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-white"
                  >
                    <option value="">Select country...</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="studyLevel" className="block text-sm font-medium text-brand-navy">
                  Preferred Study Level
                </label>
                <div className="relative">
                  <select
                    id="studyLevel"
                    name="studyLevel"
                    value={formData.studyLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 appearance-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-white"
                  >
                    <option value="">Select level...</option>
                    <option value="Bachelors">Bachelor's</option>
                    <option value="Masters">Master's</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="studyField" className="block text-sm font-medium text-brand-navy">
                Intended Study Field
              </label>
              <div className="relative">
                <select
                  id="studyField"
                  name="studyField"
                  value={formData.studyField}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 appearance-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-white"
                >
                  <option value="">Select field...</option>
                  <option value="IT">IT & Computer Science</option>
                  <option value="Business">Business & Management</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Health">Health & Medicine</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-brand-navy">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-brand-blue focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {/* Password Strength Indicator Component */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  ></div>
                </div>
                <p className={`text-xs mt-1 ${strength.textColor}`}>{strength.text}</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-navy">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-brand-blue ${
                    formData.confirmPassword.length > 0
                      ? passwordsMatch
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-brand-blue'
                  }`}
                />
                {!passwordsMatch && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-brand-slate">
                  I agree to the{' '}
                  <a href="#" className="text-brand-blue hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-brand-blue hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-brand-blue hover:bg-brand-navy text-white font-bold py-3.5 px-4 rounded-lg transition-colors shadow-md mt-6 cursor-pointer flex items-center justify-center ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              {isSubmitting && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
            </button>
          </form>

          <div className="mt-6 text-center sm:hidden">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-brand-blue hover:text-brand-navy">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-center space-x-6">
          <p className="text-sm text-gray-500 font-medium">Secure registration via</p>
          <div className="flex space-x-4">
            <ShieldCheck className="h-6 w-6 text-green-500" />
            <Lock className="h-6 w-6 text-brand-navy" />
          </div>
        </div>
      </div>
    </main>
  );
};
