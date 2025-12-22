export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-semibold">
                Your Privacy Matters
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              We are committed to protecting your personal information and being
              transparent about how we collect, use, and safeguard your data.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-purple-100">
              <span>Effective Date: January 1, 2025</span>
              <span>•</span>
              <span>Last Updated: December 22, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Quick Overview */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Privacy at a Glance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-purple-100">Transparent data practices</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">256-bit</div>
              <p className="text-purple-100">SSL encryption security</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">GDPR</div>
              <p className="text-purple-100">Compliant worldwide</p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Jump to Section
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Information We Collect",
                id: "collect",
                color: "purple",
              },
              { title: "How We Use Your Data", id: "use", color: "indigo" },
              { title: "Data Sharing", id: "sharing", color: "blue" },
              { title: "Your Rights", id: "rights", color: "cyan" },
              { title: "Cookies & Tracking", id: "cookies", color: "teal" },
              { title: "Data Security", id: "security", color: "emerald" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`p-4 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-xl hover:shadow-lg transition-all duration-300 border border-${item.color}-200 hover:border-${item.color}-400 group`}
              >
                <span
                  className={`text-gray-800 font-semibold group-hover:text-${item.color}-600 transition-colors`}
                >
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Introduction
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Travel Adventures Co. ("we," "us," or "our"). This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website, use our
                mobile application, or engage with our travel services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We respect your privacy and are committed to protecting your
                personal data. This policy will inform you about how we handle
                your personal information, your privacy rights, and how the law
                protects you.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 rounded-r-xl p-6 mt-6">
                <p className="text-gray-800 font-semibold mb-2">
                  Important Note
                </p>
                <p className="text-gray-700">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. If you do not
                  agree with our policies and practices, please do not use our
                  services.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section
            id="collect"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Information We Collect
                </h2>
                <p className="text-gray-600 mt-2">
                  Understanding what data we gather
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Identity Data
                      </p>
                      <p className="text-gray-600 text-sm">
                        Full name, date of birth, gender, passport information
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Contact Data
                      </p>
                      <p className="text-gray-600 text-sm">
                        Email address, phone number, billing and delivery
                        addresses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Financial Data
                      </p>
                      <p className="text-gray-600 text-sm">
                        Payment card details, bank account information
                        (processed securely)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Travel Preferences
                      </p>
                      <p className="text-gray-600 text-sm">
                        Destination interests, accommodation preferences,
                        dietary requirements
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Automatically Collected Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Technical Data
                      </p>
                      <p className="text-gray-600 text-sm">
                        IP address, browser type, device information, operating
                        system
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Usage Data</p>
                      <p className="text-gray-600 text-sm">
                        Pages visited, time spent, search queries, booking
                        patterns
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Location Data
                      </p>
                      <p className="text-gray-600 text-sm">
                        GPS coordinates, timezone, country/region (with your
                        permission)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section
            id="use"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  How We Use Your Data
                </h2>
                <p className="text-gray-600 mt-2">
                  Putting your information to work for you
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-4">
              <p className="text-gray-700 leading-relaxed mb-6">
                We use your personal information for various purposes, always
                ensuring it's processed lawfully, fairly, and transparently.
                Here's how we use your data:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Service Delivery
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Processing bookings, managing reservations, providing
                    customer support, and delivering travel services
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Communication
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Sending booking confirmations, travel updates, promotional
                    offers, and important service announcements
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Personalization
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Customizing your experience, recommending destinations, and
                    tailoring content to your preferences
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
                  <h4 className="font-bold text-gray-900 mb-2">Analytics</h4>
                  <p className="text-gray-700 text-sm">
                    Improving our services, analyzing trends, understanding user
                    behavior, and optimizing our platform
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-red-50 p-5 rounded-xl border border-rose-200">
                  <h4 className="font-bold text-gray-900 mb-2">Security</h4>
                  <p className="text-gray-700 text-sm">
                    Preventing fraud, protecting against security threats, and
                    ensuring safe transactions
                  </p>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-xl border border-violet-200">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Legal Compliance
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Meeting regulatory requirements, responding to legal
                    requests, and enforcing our terms
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section
            id="sharing"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Data Sharing & Disclosure
                </h2>
                <p className="text-gray-600 mt-2">
                  When and why we share your information
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-6">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                <p className="text-gray-800 font-semibold mb-2">
                  Our Commitment
                </p>
                <p className="text-gray-700">
                  We do not sell, rent, or trade your personal information to
                  third parties for their marketing purposes. We only share data
                  when necessary to provide our services or as required by law.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Service Providers
                  </h4>
                  <p className="text-gray-700">
                    Airlines, hotels, tour operators, payment processors, and
                    other vendors necessary to fulfill your bookings
                  </p>
                </div>

                <div className="border-l-4 border-cyan-500 pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Business Partners
                  </h4>
                  <p className="text-gray-700">
                    Trusted partners who help us operate our services, conduct
                    business, or serve you better
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Legal Requirements
                  </h4>
                  <p className="text-gray-700">
                    Government authorities, law enforcement, or legal entities
                    when required by law or to protect our rights
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Business Transfers
                  </h4>
                  <p className="text-gray-700">
                    In connection with mergers, acquisitions, or asset sales,
                    your data may be transferred to the new entity
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section
            id="rights"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Your Privacy Rights
                </h2>
                <p className="text-gray-600 mt-2">
                  Control over your personal data
                </p>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-gray-700 leading-relaxed mb-6">
                Under data protection laws, you have rights regarding your
                personal information. Here's what you can do:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-2">Right to Access</h4>
                  <p className="text-cyan-50 text-sm">
                    Request a copy of the personal data we hold about you
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-2">
                    Right to Rectification
                  </h4>
                  <p className="text-emerald-50 text-sm">
                    Correct any inaccurate or incomplete information
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-2">Right to Erasure</h4>
                  <p className="text-purple-50 text-sm">
                    Request deletion of your personal data in certain
                    circumstances
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-2">Right to Object</h4>
                  <p className="text-rose-50 text-sm">
                    Object to processing of your data for certain purposes
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-2">
                    Right to Portability
                  </h4>
                  <p className="text-amber-50 text-sm">
                    Receive your data in a machine-readable format
                  </p>
                </div>

                <div className="bg-gradient-to-br from-violet-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-2">Right to Withdraw</h4>
                  <p className="text-violet-50 text-sm">
                    Withdraw consent for data processing at any time
                  </p>
                </div>
              </div>

              <div className="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-6">
                <p className="text-gray-800 font-semibold mb-2">
                  How to Exercise Your Rights
                </p>
                <p className="text-gray-700">
                  To exercise any of these rights, please contact our Data
                  Protection Officer at privacy@travelco.com. We will respond to
                  your request within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section
            id="cookies"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Cookies & Tracking Technologies
                </h2>
                <p className="text-gray-600 mt-2">
                  Understanding how we track your activity
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our service and store certain information. These
                technologies help us provide a better experience and understand
                how our services are being used.
              </p>

              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Types of Cookies We Use
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-teal-100">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Essential Cookies
                      </h4>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        Required
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Necessary for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-teal-100">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Performance Cookies
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        Optional
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Help us understand how visitors interact with our website
                      through analytics.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-teal-100">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Functional Cookies
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        Optional
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Enable personalized features and remember your
                      preferences.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-teal-100">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Marketing Cookies
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        Optional
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Track your browsing to deliver relevant advertisements and
                      measure campaign effectiveness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-100 border-l-4 border-teal-500 p-5 rounded-r-xl">
                <p className="text-gray-800 font-semibold mb-2">
                  Managing Cookies
                </p>
                <p className="text-gray-700">
                  You can control and manage cookies through your browser
                  settings. Note that disabling certain cookies may affect the
                  functionality of our website.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section
            id="security"
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                6
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Data Security
                </h2>
                <p className="text-gray-600 mt-2">
                  How we protect your information
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We implement robust security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="font-bold text-gray-900 mb-2">Encryption</h4>
                  <p className="text-gray-600 text-sm">
                    All data transmitted is encrypted using 256-bit SSL/TLS
                    protocols
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Secure Storage
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Data stored on secure servers with restricted access and
                    regular backups
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="text-3xl mb-3">👁️</div>
                  <h4 className="font-bold text-gray-900 mb-2">Monitoring</h4>
                  <p className="text-gray-600 text-sm">
                    24/7 security monitoring and regular vulnerability
                    assessments
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-emerald-300">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Security Measures Include:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">
                      Firewalls and intrusion detection
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">
                      Regular security audits and testing
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">
                      Access controls and authentication
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">
                      Employee training and confidentiality
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700 text-sm">
                      Secure payment processing (PCI DSS)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                <p className="text-gray-800 font-semibold mb-2">
                  Important Reminder
                </p>
                <p className="text-gray-700">
                  While we implement industry-standard security measures, no
                  method of transmission over the internet is 100% secure. We
                  cannot guarantee absolute security of your data.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                7
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Data Retention
                </h2>
                <p className="text-gray-600 mt-2">
                  How long we keep your information
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We retain your personal data only for as long as necessary to
                fulfill the purposes outlined in this privacy policy and to
                comply with legal obligations.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Retention Periods
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
                    <span className="text-gray-700">Account Information</span>
                    <span className="font-semibold text-amber-700">
                      Until account deletion
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
                    <span className="text-gray-700">Booking Records</span>
                    <span className="font-semibold text-amber-700">
                      7 years (legal requirement)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
                    <span className="text-gray-700">Marketing Preferences</span>
                    <span className="font-semibold text-amber-700">
                      Until withdrawal of consent
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100">
                    <span className="text-gray-700">Analytics Data</span>
                    <span className="font-semibold text-amber-700">
                      26 months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                8
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  International Data Transfers
                </h2>
                <p className="text-gray-600 mt-2">
                  Protecting your data across borders
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers
                comply with applicable data protection laws and that your data
                receives adequate protection.
              </p>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border-l-4 border-rose-500">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Safeguards We Use
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Standard Contractual Clauses approved by the European
                      Commission
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Privacy Shield certification where applicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Adequacy decisions for transfers to approved countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Binding Corporate Rules for intra-group transfers
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                9
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Children's Privacy
                </h2>
                <p className="text-gray-600 mt-2">
                  Special protections for minors
                </p>
              </div>
            </div>

            <div className="ml-16">
              <div className="bg-pink-50 border-2 border-pink-300 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our services are not directed to children under 18 years of
                  age. We do not knowingly collect personal information from
                  children. If you are a parent or guardian and believe your
                  child has provided us with personal information, please
                  contact us immediately.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If we discover that a child under 18 has provided us with
                  personal information, we will delete such information from our
                  systems promptly, unless we are legally obligated to retain
                  it.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                10
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Changes to This Policy
                </h2>
                <p className="text-gray-600 mt-2">
                  Staying informed about updates
                </p>
              </div>
            </div>

            <div className="ml-16">
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or
                other factors. When we make changes, we will update the "Last
                Updated" date at the top of this policy.
              </p>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border-l-4 border-violet-500">
                <h3 className="font-semibold text-gray-900 mb-3">
                  How We'll Notify You
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-start gap-2">
                    <span>•</span>
                    <span>Email notification for significant changes</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span>•</span>
                    <span>Prominent notice on our website</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span>•</span>
                    <span>In-app notifications where applicable</span>
                  </p>
                </div>
                <p className="mt-4 text-sm italic text-gray-600">
                  Your continued use of our services after changes become
                  effective constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Contact Our Privacy Team
              </h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Have questions about our privacy practices? Our dedicated Data
                Protection Officer and privacy team are here to help address
                your concerns.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl mb-3">✉️</div>
                  <p className="text-purple-100 text-sm mb-2">Email Address</p>
                  <a
                    href={`mailto:${import.meta.env.VITE_GMAIL}`}
                    className="font-semibold text-lg hover:underline hover:text-yellow-300 transition"
                  >
                    {import.meta.env.VITE_GMAIL}
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl mb-3">📞</div>
                  <p className="text-purple-100 text-sm mb-2">
                    Privacy Hotline
                  </p>
                  <a
                    href={`tel:+91${import.meta.env.VITE_PHONE}`}
                    className="font-semibold text-lg hover:underline hover:text-yellow-300 transition"
                  >
                    +91 {import.meta.env.VITE_PHONE}
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl mb-3">📍</div>
                  <p className="text-purple-100 text-sm mb-2">
                    Mailing Address
                  </p>
                  <p className="font-semibold text-sm">
                    Data Protection Officer
                    <br />
                    123 Privacy Lane, Suite 400
                  </p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-sm text-purple-100 mb-2">
                  Response Time Commitment
                </p>
                <p className="text-lg font-semibold">
                  We respond to all privacy inquiries within 48 hours
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg">
                  Contact Privacy Team
                </button>
                <button className="bg-purple-500/50 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-3 rounded-xl font-semibold hover:bg-purple-500/70 transition-colors duration-300">
                  Download Policy PDF
                </button>
              </div>
            </div>
          </section>

          {/* Compliance Badges */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Compliance & Certifications
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-blue-600">GDPR</span>
                </div>
                <p className="text-sm text-gray-600">EU Compliant</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-purple-600">
                    CCPA
                  </span>
                </div>
                <p className="text-sm text-gray-600">California Privacy</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-emerald-600">
                    ISO
                  </span>
                </div>
                <p className="text-sm text-gray-600">27001 Certified</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-rose-600">
                    PCI DSS
                  </span>
                </div>
                <p className="text-sm text-gray-600">Payment Security</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-white mb-2">
              Your Privacy, Our Priority
            </p>
            <p className="text-sm text-gray-400">
              © 2025 Travel Adventures Co. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Data Protection
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
