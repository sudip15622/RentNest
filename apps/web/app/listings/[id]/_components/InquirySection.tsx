"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaWhatsapp, FaEnvelope, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";

interface InquirySectionProps {
  listingId: string;
  ownerName: string;
  ownerPhone: string;
  monthlyRent: number;
}

export default function InquirySection({ 
  listingId, 
  ownerName, 
  ownerPhone, 
  monthlyRent 
}: InquirySectionProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = () => {
    const message = `Hi ${ownerName}, I'm interested in your room listing (ID: ${listingId}) with rent ${formatPrice(monthlyRent)}/month. Could you please provide more details?`;
    const whatsappNumber = ownerPhone.replace(/\D/g, ''); // Remove non-digits
    const whatsappUrl = `https://wa.me/977${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitInquiry = async (data: any) => {
    setIsSubmitting(true);
    
    // TODO: Implement inquiry submission to backend
    console.log('Inquiry data:', { ...data, listingId });
    
    // For now, just simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowInquiryForm(false);
      reset();
      alert('Your inquiry has been sent successfully!');
    }, 1000);
  };

  const openInquiryDialog = () => {
    setShowInquiryForm(true);
  };

  const closeInquiryDialog = () => {
    setShowInquiryForm(false);
    reset();
  };

  return (
    <>
      {/* Desktop/Tablet Version - Sidebar */}
      <div className="hidden lg:block bg-gradient-to-br from-white to-[var(--background)]/30 rounded-xl shadow-lg p-6 border border-[var(--border)] backdrop-blur-sm">
        {/* Price Section */}
        <div className="text-center mb-6 p-4 bg-white rounded-xl border border-[var(--border)] shadow-sm">
          <div className="text-2xl font-extrabold text-[var(--primary)] mb-1">
            {formatPrice(monthlyRent)}
            <span className="text-base text-[var(--foreground-sec)] font-normal">/month</span>
          </div>
          <p className="text-[var(--foreground-sec)] text-sm">Monthly Rent</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 bg-[var(--primary-light)] text-[var(--primary-dark)] rounded-full text-xs font-medium">
            💡 Negotiable
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaWhatsapp className="w-5 h-5 mr-2" />
            Message on WhatsApp
          </button>

          <button
            onClick={openInquiryDialog}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaEnvelope className="w-5 h-5 mr-2" />
            Send Inquiry
          </button>
        </div>

        {/* Safety Notice */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <FaExclamationTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-amber-800">
              <p className="font-semibold mb-2 text-sm">🔒 Safety First</p>
              <ul className="text-xs space-y-1.5 leading-relaxed">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Always visit the property before making any payment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Verify owner identity and property documents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Avoid advance payments to unverified parties</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Sticky Bottom Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--border)] shadow-lg backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4 py-3">
          {/* Price Display */}
          <div className="text-center mb-3">
            <span className="text-lg font-bold text-[var(--primary)]">
              {formatPrice(monthlyRent)}<span className="text-sm text-[var(--foreground-sec)] font-normal">/month</span>
            </span>
          </div>
          
          {/* Compact Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-3 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <FaWhatsapp className="w-4 h-4 mr-1.5" />
              <span className="text-sm">WhatsApp</span>
            </button>

            <button
              onClick={openInquiryDialog}
              className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-medium py-2.5 px-3 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <FaEnvelope className="w-4 h-4 mr-1.5" />
              <span className="text-sm">Inquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry Dialog/Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h4 className="text-xl font-semibold text-[var(--foreground)]">Send an Inquiry</h4>
              <button
                onClick={closeInquiryDialog}
                className="text-[var(--foreground-sec)] hover:text-[var(--foreground)] transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit(handleSubmitInquiry)} className="space-y-4">
                <div className="mb-6">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <Input
                        field={field}
                        error={errors.name}
                        label="Your Name"
                        type="text"
                      />
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <Input
                        field={field}
                        error={errors.phone}
                        label="Your Phone Number"
                        type="tel"
                      />
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field }) => (
                      <Input
                        field={field}
                        error={errors.email}
                        label="Your Email"
                        type="email"
                      />
                    )}
                  />
                </div>
                
                <div className="mb-8">
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        field={field}
                        error={errors.message}
                        label="Your message or questions..."
                      />
                    )}
                  />
                </div>
                
                {/* Dialog Actions */}
                <div className="flex space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={closeInquiryDialog}
                    className="w-full px-4 py-3 border border-[var(--border)] text-[var(--foreground-sec)] rounded-lg hover:bg-[var(--background)] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
