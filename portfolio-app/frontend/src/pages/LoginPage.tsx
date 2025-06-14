import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setLoginError('');
      
      try {
        // For demo purposes, simulate successful login
        if (values.username === 'admin' && values.password === 'admin') {
          setLoginSuccess(true);
          localStorage.setItem('token', 'mock-token-for-admin');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginError('Invalid username or password');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-8 text-center">
            Bala's Login
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
            
            {/* Note about login purpose */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800">
                  I use this to add projects, and make edits to the existing ones.
                </p>
              </div>
            </div>
            
            {loginSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6 text-center">
                <p className="font-medium">Login successful!</p>
                <p>Redirecting to home page...</p>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...formik.getFieldProps('username')}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                  )}
                </div>
                
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                    <p>{loginError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 