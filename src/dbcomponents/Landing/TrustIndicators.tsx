import React from 'react';
import { Star, Users, Award, Verified } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'DeFi Trader',
      avatar: '👩‍💼',
      rating: 5,
      text: 'The AI Insight Score has completely transformed how I approach DeFi. I\'ve increased my yields by 40% while reducing risk.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Crypto Investor',
      avatar: '👨‍💻',
      rating: 5,
      text: 'Finally, a platform that makes DeFi accessible without compromising on sophistication. The UX is incredible.',
    },
    {
      name: 'Elena Volkov',
      role: 'Portfolio Manager',
      avatar: '👩‍🔬',
      rating: 5,
      text: 'The risk analysis and protocol recommendations are spot-on. This is the future of decentralized finance.',
    }
  ];

  const partners = [
    { name: 'Chainlink', logo: '🔗' },
    { name: 'Polygon', logo: '🟣' },
    { name: 'Ethereum', logo: '⟠' },
    { name: 'Arbitrum', logo: '🔵' },
    { name: 'Optimism', logo: '🔴' },
    { name: 'Avalanche', logo: '🔺' }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="gradient-text">DeFi Leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join thousands of users who have already discovered the power of AI-driven DeFi.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#0A0E13]/60 backdrop-blur-xl border border-[#8033ff]/20 rounded-2xl p-6 hover:border-[#8033ff]/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FFD700] fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#8033ff] to-[#00FFE0] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Verified className="w-8 h-8 text-white" />
            </div>
            <div className="text-white font-bold text-lg">Audited</div>
            <div className="text-gray-400 text-sm">Smart Contracts</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00FFE0] to-[#FF00A8] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-white font-bold text-lg">150K+</div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF00A8] to-[#8033ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-white font-bold text-lg">99.9%</div>
            <div className="text-gray-400 text-sm">Uptime SLA</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#8033ff] to-[#FF00A8] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-white font-bold text-lg">4.9/5</div>
            <div className="text-gray-400 text-sm">User Rating</div>
          </div>
        </div>

        {/* Partners */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Powered by Industry Leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;