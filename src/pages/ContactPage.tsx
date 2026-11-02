import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { sendFormNotification, NOTIFICATION_EMAIL } from '../utils/formSubmit';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    studyLevel: '',
    budget: '',
    intake: '',
    field: '',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertState, setAlertState] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    setIsSubmitting(true);
    setAlertState({ type: null, message: '' });

    try {
      // Send form notification to ah5439460@gmail.com
      await sendFormNotification('New Education Consultation Booking - AussiePath', {
        'Applicant Name': formData.fullName,
        'Applicant Email': formData.email,
        'Phone Number': formData.phone,
        'Country of Residence': formData.country,
        'Preferred Study Level': formData.studyLevel || 'Not specified',
        'Estimated Budget': formData.budget || 'Not specified',
        'Intended Start Date': formData.intake || 'Not specified',
        'Preferred Study Field': formData.field || 'Not specified',
        'Applicant Message': formData.message || 'None',
        'Consent Given': formData.consent ? 'Yes' : 'No',
      });

      setAlertState({
        type: 'success',
        message: `Thank you for your inquiry, ${formData.fullName}! Your consultation booking confirmation has been sent to ${NOTIFICATION_EMAIL}. Our team will contact you shortly.`,
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        studyLevel: '',
        budget: '',
        intake: '',
        field: '',
        message: '',
        consent: false,
      });
    } catch {
      setAlertState({
        type: 'error',
        message: 'Oops! There was a problem submitting your form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow bg-brand-bg">
      {/* Contact Page Hero Component */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Book a free consultation or send us your questions. We're here to help you start your Australian education journey.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information Cards */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="bg-brand-bg p-3 rounded-lg shrink-0">
                  <MapPin className="text-brand-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Office Address</h3>
                  <p className="text-brand-slate text-sm">
                    123 Education Boulevard<br />
                    Sydney NSW 2000, Australia
                  </p>
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    Demo Address
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="bg-brand-bg p-3 rounded-lg shrink-0">
                  <Phone className="text-brand-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Telephone</h3>
                  <a href="tel:+61200000000" className="text-brand-slate text-sm hover:text-brand-blue">
                    +61 2 0000 0000
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="bg-brand-bg p-3 rounded-lg shrink-0">
                  <Mail className="text-brand-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Email Us</h3>
                  <a href="mailto:hello@aussiepath-demo.edu.au" className="text-brand-slate text-sm hover:text-brand-blue">
                    hello@aussiepath-demo.edu.au
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="bg-brand-bg p-3 rounded-lg shrink-0">
                  <Clock className="text-brand-blue h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">Availability</h3>
                  <p className="text-brand-slate text-sm">Mon-Fri: 9:00 AM - 6:00 PM (AEST)</p>
                </div>
              </div>
            </div>

            {/* Contact Form Component */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Book a Free Consultation</h2>

                {/* Alert Component for form status */}
                {alertState.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg border font-medium flex items-center ${
                      alertState.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    {alertState.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 mr-2 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 shrink-0 text-red-600" />
                    )}
                    <span>{alertState.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="space-y-2">
                      <label htmlFor="country" className="block text-sm font-medium text-brand-navy">
                        Country of Residence <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="country"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 appearance-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-white"
                        >
                          <option value="" disabled>Select a country...</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="India">India</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <option value="Foundation">Foundation</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelors">Bachelor's Degree</option>
                          <option value="Masters">Master's Degree</option>
                          <option value="PhD">PhD / Doctorate</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget" className="block text-sm font-medium text-brand-navy">
                        Estimated Budget (Annual)
                      </label>
                      <div className="relative">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 appearance-none rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-white"
                        >
                          <option value="">Select budget range...</option>
                          <option value="AUD 20,000 - 30,000">AUD $20,000 - $30,000</option>
                          <option value="AUD 30,000 - 40,000">AUD $30,000 - $40,000</option>
                          <option value="AUD 40,000+">AUD $40,000+</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="intake" className="block text-sm font-medium text-brand-navy">
                        Intended Start Date
                      </label>
                      <input
                        type="month"
                        id="intake"
                        name="intake"
                        value={formData.intake}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="field" className="block text-sm font-medium text-brand-navy">
                        Preferred Study Field
                      </label>
                      <input
                        type="text"
                        id="field"
                        name="field"
                        value={formData.field}
                        onChange={handleChange}
                        placeholder="e.g. Computer Science, Business"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-brand-navy">
                      Your Message or Questions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Checkbox Component */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="font-medium text-brand-slate">
                        I consent to being contacted regarding my education enquiry.
                      </label>
                      <p className="text-gray-500 text-xs mt-1">
                        We respect your privacy. Submitting this form does not guarantee admission or visa approval.
                      </p>
                    </div>
                  </div>

                  {/* Button Component (Submit) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-brand-blue hover:bg-brand-navy text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex justify-center items-center shadow-sm ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                    {isSubmitting && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    <strong>Note:</strong> Do not include sensitive information like passport numbers or passwords in this form.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
