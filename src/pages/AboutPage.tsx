import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Target, Eye, Info } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Page Hero Component */}
      <section className="bg-brand-bg py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Component */}
          <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-brand-blue inline-flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-brand-navy font-medium">About Us</span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Guiding Your Journey to Australian Education.
          </h1>
          <p className="text-lg text-brand-slate max-w-3xl">
            Learn about our mission, our values, and how our dedicated team supports international students every step of the way.
          </p>
        </div>
      </section>

      {/* Mission/Vision Section Component */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaborating"
                className="rounded-2xl shadow-lg w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="lg:w-1/2">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-brand-bg text-brand-blue px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <h2 className="text-3xl font-bold text-brand-navy mb-4">
                  Empowering students through education.
                </h2>
                <p className="text-brand-slate leading-relaxed">
                  Our mission is to simplify the complex process of international study, providing transparent, honest, and personalized guidance to help students achieve their academic and career goals in Australia.
                </p>
              </div>

              {/* Divider Component */}
              <div className="w-full h-px bg-gray-200 my-8"></div>

              <div>
                <div className="inline-flex items-center space-x-2 bg-brand-bg text-brand-gold px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  <Eye className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <h2 className="text-3xl font-bold text-brand-navy mb-4">
                  A world of accessible opportunities.
                </h2>
                <p className="text-brand-slate leading-relaxed">
                  We envision a future where every motivated student has access to world-class Australian education, regardless of their background, bridging cultures and fostering global citizenship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Component */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Support Process</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              How we work with you from the first hello to your arrival in Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors pt-10">
              <div className="absolute -top-5 left-6 bg-brand-gold text-brand-navy w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Consultation</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We start with a detailed discussion about your academic background, interests, budget, and long-term career aspirations.
              </p>
            </div>
            {/* Step 2 */}
            <div className="relative bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors pt-10">
              <div className="absolute -top-5 left-6 bg-brand-gold text-brand-navy w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Strategy & Planning</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We provide a curated list of universities and courses, explaining the pros and cons of each pathway to help you decide.
              </p>
            </div>
            {/* Step 3 */}
            <div className="relative bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors pt-10">
              <div className="absolute -top-5 left-6 bg-brand-gold text-brand-navy w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Application</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our team assists with document preparation, reviews your statement of purpose, and handles the application submission.
              </p>
            </div>
            {/* Step 4 */}
            <div className="relative bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors pt-10">
              <div className="absolute -top-5 left-6 bg-brand-gold text-brand-navy w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Pre-Departure</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Once admitted, we guide you through the visa document checklist and provide briefings on living in Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alert/Notice Component */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-brand-blue p-6 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Info className="h-6 w-6 text-brand-blue" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-brand-navy mb-1">
                  Education Counselling vs. Immigration Advice
                </h3>
                <p className="text-sm text-brand-slate leading-relaxed">
                  AussiePath Education provides <strong>education counselling</strong> and administrative support for your university applications. We help you understand the student visa document requirements. However, we are <strong>not registered migration agents</strong> and do not provide official immigration advice. All visa applications are assessed by the Australian Department of Home Affairs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Profile Cards Component */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Meet Our Advisors</h2>
            <p className="text-lg text-brand-slate max-w-2xl mx-auto">
              Our fictional sample team of dedicated education professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Profile Card 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 text-center">
              <div className="h-32 bg-gradient-to-r from-brand-navy to-brand-blue"></div>
              <div className="relative px-6 pb-6">
                <div className="w-24 h-24 mx-auto -mt-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Jane Doe"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Jane Doe</h3>
                <p className="text-brand-blue text-sm font-medium mb-3">Senior Education Advisor</p>
                <p className="text-gray-500 text-sm mb-4">
                  Jane specializes in postgraduate applications and scholarship guidance.
                </p>
                <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                  Placeholder Profile
                </span>
              </div>
            </div>

            {/* Profile Card 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 text-center">
              <div className="h-32 bg-gradient-to-r from-brand-navy to-brand-blue"></div>
              <div className="relative px-6 pb-6">
                <div className="w-24 h-24 mx-auto -mt-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="John Smith"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">John Smith</h3>
                <p className="text-brand-blue text-sm font-medium mb-3">Admissions Specialist</p>
                <p className="text-gray-500 text-sm mb-4">
                  John has over 5 years of experience navigating complex admission processes.
                </p>
                <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                  Placeholder Profile
                </span>
              </div>
            </div>

            {/* Profile Card 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 text-center">
              <div className="h-32 bg-gradient-to-r from-brand-navy to-brand-blue"></div>
              <div className="relative px-6 pb-6">
                <div className="w-24 h-24 mx-auto -mt-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Emily Chen"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">Emily Chen</h3>
                <p className="text-brand-blue text-sm font-medium mb-3">Student Support Coordinator</p>
                <p className="text-gray-500 text-sm mb-4">
                  Emily helps students prepare for their transition to Australian life.
                </p>
                <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                  Placeholder Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
