export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your journey starts with trust. Please review our terms before
              booking your next adventure.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-blue-100">
              <span>Last Updated: December 2025</span>
              <span>•</span>
              <span>Version 2.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Navigation
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Booking Policy", id: "booking" },
              { title: "Payment Terms", id: "payment" },
              { title: "Cancellation", id: "cancellation" },
              { title: "Travel Insurance", id: "insurance" },
              { title: "Responsibilities", id: "responsibilities" },
              { title: "Privacy & Data", id: "privacy" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 group"
              >
                <span className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to our travel services platform. By accessing or using our
              services, you agree to be bound by these Terms and Conditions.
              These terms govern your use of our website, mobile applications,
              and all related services provided by our travel company.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to providing you with exceptional travel
              experiences while maintaining transparency in all our dealings.
              Please read these terms carefully before making any bookings or
              using our services.
            </p>
          </section>

          {/* Booking Policy */}
          <section
            id="booking"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Booking Policy
                </h2>
                <p className="text-gray-600 mt-2">
                  Understanding how to book with us
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Reservation Requirements
                </h3>
                <p className="text-gray-700">
                  All bookings must be made through our official website or
                  authorized agents. A valid email address, phone number, and
                  payment method are required to complete your reservation.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-transparent p-6 rounded-xl border-l-4 border-cyan-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Booking Confirmation
                </h3>
                <p className="text-gray-700">
                  Upon successful booking, you will receive a confirmation email
                  within 24 hours. Please verify all details and contact us
                  immediately if you notice any discrepancies.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-transparent p-6 rounded-xl border-l-4 border-amber-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Age Requirements
                </h3>
                <p className="text-gray-700">
                  Travelers must be at least 18 years old to book independently.
                  Minors must be accompanied by a parent or legal guardian and
                  require additional documentation.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section
            id="payment"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Payment Terms
                </h2>
                <p className="text-gray-600 mt-2">
                  Secure and flexible payment options
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-16">
              <p className="text-gray-700 leading-relaxed">
                We accept major credit cards, debit cards, and secure online
                payment methods. All transactions are encrypted and processed
                through secure payment gateways to protect your financial
                information.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Deposit Requirements
                  </h4>
                  <p className="text-gray-700 text-sm">
                    A deposit of 30% is required at booking. Full payment must
                    be received at least 30 days before departure.
                  </p>
                </div>

                <div className="p-5 bg-teal-50 rounded-xl border border-teal-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Currency & Pricing
                  </h4>
                  <p className="text-gray-700 text-sm">
                    All prices are listed in USD. Foreign transaction fees may
                    apply based on your bank's policies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section
            id="cancellation"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Cancellation & Refund Policy
                </h2>
                <p className="text-gray-600 mt-2">
                  Fair policies for unexpected changes
                </p>
              </div>
            </div>

            <div className="ml-16">
              <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Refund Schedule
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">
                      60+ days before departure
                    </span>
                    <span className="font-bold text-green-600">90% refund</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">
                      30-59 days before departure
                    </span>
                    <span className="font-bold text-yellow-600">
                      50% refund
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">
                      15-29 days before departure
                    </span>
                    <span className="font-bold text-orange-600">
                      25% refund
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Less than 15 days</span>
                    <span className="font-bold text-red-600">No refund</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm italic">
                * Cancellation fees may vary for special packages and group
                bookings. Please refer to your specific booking terms.
              </p>
            </div>
          </section>

          {/* Travel Insurance */}
          <section
            id="insurance"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Travel Insurance
                </h2>
                <p className="text-gray-600 mt-2">Protecting your investment</p>
              </div>
            </div>

            <div className="ml-16">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-4">
                <p className="text-gray-800 font-semibold mb-2">
                  Highly Recommended
                </p>
                <p className="text-gray-700">
                  We strongly recommend purchasing comprehensive travel
                  insurance to protect against unforeseen circumstances such as
                  medical emergencies, trip cancellations, lost baggage, and
                  travel delays.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                While we offer travel insurance options through our partners,
                you are free to purchase insurance from any provider of your
                choice. Insurance must be purchased within 14 days of your
                initial trip deposit.
              </p>
            </div>
          </section>

          {/* Responsibilities */}
          <section
            id="responsibilities"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Traveler Responsibilities
                </h2>
                <p className="text-gray-600 mt-2">
                  Your role in ensuring a smooth journey
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-4">
              <div className="p-5 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Valid Documentation
                </h3>
                <p className="text-gray-700">
                  You are responsible for obtaining and maintaining valid
                  passports, visas, health certificates, and all other required
                  travel documents.
                </p>
              </div>

              <div className="p-5 bg-red-50 rounded-xl border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Health & Safety
                </h3>
                <p className="text-gray-700">
                  Inform us of any medical conditions, dietary restrictions, or
                  special requirements at the time of booking. Follow local laws
                  and customs of your destination.
                </p>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border-l-4 border-amber-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Conduct & Behavior
                </h3>
                <p className="text-gray-700">
                  Travelers must conduct themselves appropriately. We reserve
                  the right to terminate services without refund for
                  inappropriate behavior that affects other travelers or staff.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section
            id="privacy"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                6
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Privacy & Data Protection
                </h2>
                <p className="text-gray-600 mt-2">
                  Your data security matters to us
                </p>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect and process personal information necessary to provide
                our travel services. Your data is protected in accordance with
                international data protection regulations including GDPR and
                CCPA.
              </p>

              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  We collect:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>
                      Contact information and identification documents
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Payment and billing information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Travel preferences and special requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Communication history and feedback</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our customer service team is here to help clarify any concerns
                you may have about our terms and conditions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left">
                  <p className="text-blue-100 text-sm mb-1">Email Us</p>
                  <p className="font-semibold">support@travelco.com</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left">
                  <p className="text-blue-100 text-sm mb-1">Call Us</p>
                  <p className="font-semibold">+1 (800) 123-4567</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left">
                  <p className="text-blue-100 text-sm mb-1">Business Hours</p>
                  <p className="font-semibold">Mon-Fri: 9AM - 6PM EST</p>
                </div>
              </div>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
                Contact Support
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-2">
            © 2025 Travel Adventures Co. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            By using our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms & Conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}
