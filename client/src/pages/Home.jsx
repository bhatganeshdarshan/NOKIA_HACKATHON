import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: 'Log Analysis',
      description: 'Upload and process telecom network logs with advanced pattern recognition and anomaly detection.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/analysis'
    },
    {
      title: 'RCA Prediction',
      description: 'Leverage machine learning to predict root causes of network issues and service disruptions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      link: '/analytics'
    },
    {
      title: 'Performance Analytics',
      description: 'Monitor network performance metrics and generate comprehensive reports for stakeholders.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/analytics'
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Upload Logs',
      description: 'Upload your telecom network logs in various formats (syslog, JSON, CSV)'
    },
    {
      step: 2,
      title: 'Analysis',
      description: 'Our system processes logs using advanced algorithms to identify patterns and anomalies'
    },
    {
      step: 3,
      title: 'RCA Prediction',
      description: 'Machine learning models predict potential root causes of network issues'
    },
    {
      step: 4,
      title: 'Visualization',
      description: 'Interactive dashboards and reports help you understand the insights'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-12 sm:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Telecom Network Log Analysis
            </h1>
            <p className="mt-4 text-xl text-indigo-100">
              Advanced log analysis and RCA prediction for telecom networks
            </p>
            <div className="mt-8">
              <Link
                to="/analysis"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-indigo-600 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link
              to={feature.link}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>

      {/* Workflow Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-between">
            {workflowSteps.map((step) => (
              <div key={step.step} className="flex flex-col items-center">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full">
                  <span className="text-white font-semibold">{step.step}</span>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 max-w-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Start analyzing your telecom network logs and get insights into potential issues.
        </p>
        <Link
          to="/analysis"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Start Analysis Now
        </Link>
      </div>
    </div>
  );
};

export default Home; 