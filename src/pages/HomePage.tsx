import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileCheck2,
  Globe,
  ArrowRight,
  Quote,
  ChevronDown,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'Do you guarantee university admission?',
      answer:
        'No. While we provide expert guidance to maximize your chances, admission decisions are made solely by the respective universities and colleges based on their entry requirements.',
    },
    {
      question: 'Can you guarantee my student visa approval?',
      answer:
        'No. Student visa decisions are made entirely by the Australian Department of Home Affairs. We provide guidance on the document preparation process, but we cannot guarantee outcomes.',
    },
    {
      question: 'Is the initial consultation free?',
      answer:
        'Yes, your first discovery consultation is free. We use this time to understand your goals, assess your background, and explain how we can support your journey.',
    },
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section Component */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=2000&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 border border-brand-blue/50 text-brand-gold text-sm font-semibold tracking-wide mb-4">
              Discover Your Potential
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Your Future in Australia Starts Here.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              We provide comprehensive support for international students throughout their study journey. From selecting the right university to navigating the admission process and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-brand-gold hover:bg-yellow-500 text-brand-navy font-semibold px-8 py-3.5 rounded-lg text-center transition-colors shadow-lg"
              >
                Book a Free Consultation
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-8 py-3.5 rounded-lg text-center transition-colors backdrop-blur-sm"
              >
                Explore Our Services
              </Link>
            </div>

            {/* Trust Indicators Component */}
            <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">Personalized</span>
                <span className="text-sm text-gray-300">Expert Guidance</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">End-to-End</span>
                <span className="text-sm text-gray-300">Application Support</span>
              </div>
              <div className="flex flex-col hidden md:flex">
                <span className="text-3xl font-bold text-white mb-1">100%</span>
                <span className="text-sm text-gray-300">Student-Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards Component */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">How We Can Help You</h2>
            <p className="text-lg text-brand-slate max-w-2xl mx-auto">
              Comprehensive services tailored to make your Australian education dream a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100 group">
              <div className="h-14 w-14 bg-brand-bg rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors duration-300">
                <Building2 className="h-7 w-7 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">University Selection</h3>
              <p className="text-brand-slate leading-relaxed mb-6">
                Find the perfect institution and course that aligns with your academic background and career goals.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-brand-blue font-medium hover:text-brand-navy group-hover:translate-x-1 transition-transform"
              >
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100 group">
              <div className="h-14 w-14 bg-brand-bg rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors duration-300">
                <FileCheck2 className="h-7 w-7 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Admission Guidance</h3>
              <p className="text-brand-slate leading-relaxed mb-6">
                Expert assistance with your application forms, statement of purpose, and required documentation.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-brand-blue font-medium hover:text-brand-navy group-hover:translate-x-1 transition-transform"
              >
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100 group">
              <div className="h-14 w-14 bg-brand-bg rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors duration-300">
                <Globe className="h-7 w-7 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Visa Process Guidance</h3>
              <p className="text-brand-slate leading-relaxed mb-6">
                Understand the requirements and get help preparing your documents for the student visa application.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-brand-blue font-medium hover:text-brand-navy group-hover:translate-x-1 transition-transform"
              >
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Steps with Badges Component */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                A Simple Path to Your Dream University
              </h2>
              <p className="text-lg text-brand-slate mb-10">
                We simplify the complex process of studying abroad into four clear, manageable steps.
              </p>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white font-bold shadow-md">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">Discover</h4>
                    <p className="text-brand-slate">
                      Meet with our advisors to explore courses, universities, and potential career paths in Australia.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white font-bold shadow-md">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">Prepare</h4>
                    <p className="text-brand-slate">
                      Gather your academic transcripts, English proficiency scores, and prepare your application documents.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white font-bold shadow-md">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">Apply</h4>
                    <p className="text-brand-slate">
                      Submit your applications to chosen institutions and receive guidance on the student visa process.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white font-bold shadow-md">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">Get Ready</h4>
                    <p className="text-brand-slate">
                      Receive pre-departure briefings, accommodation advice, and prepare for your exciting new life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Students studying together"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px] lg:h-[600px]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations / Image Section Component */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Study Destinations</h2>
              <p className="text-gray-300 max-w-2xl">
                Explore Australia's most popular student cities, each offering world-class education and an amazing lifestyle.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Destination 1 */}
            <div className="relative group overflow-hidden rounded-xl aspect-[3/4] bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sydney Opera House"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-brand-gold text-brand-navy text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  Popular
                </span>
                <h3 className="text-2xl font-bold mb-1">Sydney</h3>
                <p className="text-sm text-gray-200">New South Wales</p>
              </div>
            </div>

            {/* Destination 2 */}
            <div className="relative group overflow-hidden rounded-xl aspect-[3/4] bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Melbourne City"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold mb-1">Melbourne</h3>
                <p className="text-sm text-gray-200">Victoria</p>
              </div>
            </div>

            {/* Destination 3 */}
            <div className="relative group overflow-hidden rounded-xl aspect-[3/4] bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Brisbane River"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold mb-1">Brisbane</h3>
                <p className="text-sm text-gray-200">Queensland</p>
              </div>
            </div>

            {/* Destination 4 */}
            <div className="relative group overflow-hidden rounded-xl aspect-[3/4] bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1582236814030-22c6769919f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Perth Skyline"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold mb-1">Perth</h3>
                <p className="text-sm text-gray-200">Western Australia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Panel Component */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Student Experiences</h2>
            <p className="text-lg text-brand-slate max-w-2xl mx-auto">
              Hear from students who have started their journey with our guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-brand-bg opacity-50" />
              <p className="text-brand-slate italic mb-6 relative z-10 leading-relaxed">
                "AussiePath Education made the overwhelming process of applying to universities so much easier. Their counselors were patient and provided clear, step-by-step guidance."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-brand-navy font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy">Sarah A.</h4>
                  <p className="text-sm text-gray-500">Sample Testimonial &bull; Studying in Sydney</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-brand-bg opacity-50" />
              <p className="text-brand-slate italic mb-6 relative z-10 leading-relaxed">
                "I wasn't sure which course would best suit my career goals. The team helped me explore different pathways and I am now happily enrolled in a program I love."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-brand-navy font-bold text-xl mr-4">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy">Rahul M.</h4>
                  <p className="text-sm text-gray-500">Sample Testimonial &bull; Studying in Melbourne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Component */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-5 bg-white hover:bg-brand-bg transition-colors focus:outline-none text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-brand-navy">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-brand-blue transition-transform duration-300 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 bg-white border-t border-gray-100 text-brand-slate leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner Component */}
      <section className="py-16 bg-gradient-to-r from-brand-navy to-brand-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to take the first step?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Book a consultation today and let us guide you towards your educational goals in Australia.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold px-8 py-4 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Book Your Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};
