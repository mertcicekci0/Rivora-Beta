import React from 'react';
import { Zap, Shield, TrendingUp, Repeat, Brain, Lock } from 'lucide-react';

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized DeFi recommendations with our proprietary Insight Score algorithm.',
      gradient: 'from-[#8033ff] to-[#00FFE0]',
      delay: '0s'
    },
    {
      icon: Repeat,
      title: 'Seamless Swapping',
      description: 'Access the best rates across multiple DEXs with our intelligent routing system.',
      gradient: 'from-[#00FFE0] to-[#FF00A8]',
      delay: '0.2s'
    },
    {
      icon: TrendingUp,
      title: 'Smart Lending',
      description: 'Maximize your yields with risk-adjusted lending protocol recommendations.',
      gradient: 'from-[#FF00A8] to-[#8033ff]',
      delay: '0.4s'
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Your assets are protected by industry-leading security protocols and audits.',
      gradient: 'from-[#8033ff] to-[#FF00A8]',
      delay: '0.6s'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute transactions in milliseconds with our optimized infrastructure.',
      gradient: 'from-[#00FFE0] to-[#8033ff]',
      delay: '0.8s'
    },
    {
      icon: Lock,
      title: 'Non-Custodial',
      description: 'Maintain full control of your assets. We never hold your private keys.',
      gradient: 'from-[#FF00A8] to-[#00FFE0]',
      delay: '1s'
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="gradient-text">1StopInch</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of DeFi with cutting-edge technology, 
            unmatched security, and AI-driven intelligence.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#0A0E13]/60 backdrop-blur-xl border border-[#8033ff]/20 rounded-2xl p-8 hover:border-[#8033ff]/50 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#8033ff] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#8033ff]/30 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;