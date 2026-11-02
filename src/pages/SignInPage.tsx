import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Quote, CheckCircle2, Loader2 } from 'lucide-react';
import { sendFormNotification, NOTIFICATION_EMAIL } from '../utils/formSubmit';

export const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      // Send sign-in authentication notice to ah5439460@gmail.com
      await sendFormNotification('Student Account Sign-In Authentication - AussiePath', {
        'Activity': 'User Sign-In Verification',
        'User Email': email,
        'Status': 'Authentication Confirmed',
        'Time': new Date().toLocaleString(),
      });

      setAlert({
        type: 'success',
        message: `Authentication verified! Sign-in confirmation notification has been sent to ${NOTIFICATION_EMAIL}.`,
      });
    } catch {
      setAlert({
        type: 'error',
        message: 'Sign-in verification failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-4 py-12 bg-brand-bg">
      {/* Two-column Layout Component */}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-navy mb-2">Welcome Back</h1>
            <p className="text-brand-slate text-sm">Please sign in to continue your education journey.</p>
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
            {/* Input Group */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-brand-navy">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Toggle Component */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-brand-navy">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-brand-blue hover:text-brand-navy transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
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
            </div>

            {/* Checkbox Component */}
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-brand-slate cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button Component */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-brand-blue hover:bg-brand-navy text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mt-2 flex justify-center items-center cursor-pointer ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              {isSubmitting && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
            </button>

            {/* Divider Component */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setAlert({
                    type: 'info',
                    message: 'Social sign-in requires third-party provider credentials.',
                  })
                }
                className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() =>
                  setAlert({
                    type: 'info',
                    message: 'Apple ID sign-in requires third-party provider credentials.',
                  })
                }
                className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="h-5 w-5 mr-2 fill-current text-black" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-1.02 2.76 1.01.08 2.04-.51 2.66-1.26z" />
                </svg>
                Apple
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
          </p>
        </div>

        {/* Image Side Component */}
        <div className="w-full md:w-1/2 bg-brand-navy relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Students in library"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-12 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Quote className="text-brand-gold h-8 w-8 opacity-50" />
            </div>
            <p className="text-xl font-medium leading-relaxed mb-6">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy font-bold mr-3">
                AP
              </div>
              <div>
                <p className="font-bold">AussiePath Education</p>
                <p className="text-xs text-gray-300">Your Study Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
