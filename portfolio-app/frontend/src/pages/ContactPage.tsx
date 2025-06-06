import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserIcon, BuildingOffice2Icon, ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://portfolio-backend-93780733243.us-central1.run.app';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      email: '',
      subject: '',
      message: '',
      wantsReply: false,
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter your name'),
      company: Yup.string(),
      email: Yup.string().email('Please enter a valid email address').when('wantsReply', {
        is: true,
        then: (schema) => schema.required('Email is required if you want a reply'),
        otherwise: (schema) => schema.notRequired()
      }),
      subject: Yup.string().required('Please enter a subject'),
      message: Yup.string()
        .required('Please enter your message')
        .min(10, 'Message should be at least 10 characters'),
      phone: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        const messageData = {
          ...values,
          name: values.name.trim(),
          company: values.company?.trim() || '',
          email: values.email?.trim() || '',
          subject: values.subject.trim(),
          message: values.message.trim(),
          phone: values.phone?.trim() || '',
          recipientEmail: 'bduggirala2@huskers.unl.edu',
        };

        console.log('Submitting form with values:', messageData);

        const response = await fetch(`${API_BASE_URL}/api/contact/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        // Parse response text, handle JSON or plain text
        const raw = await response.text();
        let responseData: any = {};
        try {
          responseData = JSON.parse(raw);
        } catch {
          // response was not valid JSON
        }
        console.log('Server response:', responseData);

        if (!response.ok) {
          // If JSON has error/message use it, otherwise throw the raw text
          throw new Error(responseData.error || responseData.message || raw || 'Failed to send message');
        }

        setSubmitSuccess(true);
        formik.resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Add effect to update message when contact details change
  useEffect(() => {
    if (formik.values.wantsReply) {
      let contactDetails = '\n\nContact Details:';
      if (formik.values.email) {
        contactDetails += `\nEmail: ${formik.values.email}`;
      }
      if (formik.values.phone) {
        contactDetails += `\nPhone: ${formik.values.phone}`;
      }
      
      // Only update if the message doesn't already end with the contact details
      if (!formik.values.message.endsWith(contactDetails)) {
        // Remove any existing contact details section
        let baseMessage = formik.values.message;
        const contactIndex = baseMessage.lastIndexOf('\n\nContact Details:');
        if (contactIndex !== -1) {
          baseMessage = baseMessage.substring(0, contactIndex);
        }
        
        formik.setFieldValue('message', baseMessage + contactDetails);
      }
    } else {
      // Remove contact details section when checkbox is unchecked
      const message = formik.values.message;
      const contactIndex = message.lastIndexOf('\n\nContact Details:');
      if (contactIndex !== -1) {
        formik.setFieldValue('message', message.substring(0, contactIndex));
      }
    }
  }, [formik.values.wantsReply, formik.values.email, formik.values.phone]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 min-h-screen py-16 font-sans animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-4 animate-fadeInUp">
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg">
                Get in Touch
              </h1>
              <motion.span
                className="absolute top-0 left-full ml-6 -translate-y-0 bg-yellow-200 text-gray-900 font-bold text-4xl px-5 py-1 rounded shadow-md whitespace-nowrap"
                initial={{ x: 100, opacity: 0.0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: [-0, -0, -0]
                }}
                transition={{
                  type: 'spring',
                  stiffness: 5,
                  damping: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 0.0
                }}
              >
                Open to Work!
              </motion.span>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp delay-100">
              I'm excited to connect with you! Whether you are a recruiter, have a project in mind, a question, or just want to say hello, please fill out the form below. I'll directly get an email and respond within 24 hours!
            </p>
          </div>


          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-100 animate-fadeInUp delay-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100 flex items-center gap-2">
              <PaperAirplaneIcon className="h-6 w-6 text-blue-500" />
              Send an Email to Bala!
            </h2>
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6 text-center animate-fadeIn">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="font-medium text-lg">Thank you for reaching out!</p>
                <p className="mt-1">Your message has been sent successfully. I'll review it and respond within 24 hours if you requested a reply - Bala Subramanyam Duggirala :)</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={formik.handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <UserIcon className="h-4 w-4 text-blue-400" />
                      Your Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="e.g. Jane Doe"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                        formik.touched.name && formik.errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
                      }`}
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <BuildingOffice2Icon className="h-4 w-4 text-blue-400" />
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      {...formik.getFieldProps('company')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-400" />
                    Subject<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="e.g. Project Collaboration"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formik.touched.subject && formik.errors.subject ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...formik.getFieldProps('subject')}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-400" />
                    Message<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="How can I help you? Please share the details of your request..."
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formik.touched.message && formik.errors.message ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...formik.getFieldProps('message')}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-400"
                      {...formik.getFieldProps('wantsReply')}
                    />
                    <span className="ml-2 text-sm text-gray-700">I'd like Bala to get back to me</span>
                  </label>
                </div>

                {formik.values.wantsReply && (
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 animate-fadeIn space-y-4">
                    <h3 className="font-medium text-blue-800">Contact Details</h3>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                          formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
                        }`}
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="e.g. (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        {...formik.getFieldProps('phone')}
                      />
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 animate-fadeIn">
                    <div className="flex">
                      <svg className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p>{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="text-right">
                  <div className="relative inline-block group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-5 w-5" />
                          Send Email
                        </>
                      )}
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      sends email to <span className="text-blue-400 font-mono">bduggirala2@huskers.unl.edu</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease; }
        .animate-fadeInUp { animation: fadeInUp 1s ease; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default ContactPage; 